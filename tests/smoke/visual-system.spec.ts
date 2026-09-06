import { expect, test, type Page } from '@playwright/test';
import { readdir } from 'node:fs/promises';

const articleCount = (await readdir(new URL('../../src/content/articles/', import.meta.url))).filter((file) => file.endsWith('.md')).length;

const viewports = [
  { width: 1440, height: 900 }, { width: 1280, height: 800 },
  { width: 1024, height: 768 }, { width: 390, height: 844 }, { width: 320, height: 568 },
];
const indexes = ['analog', 'digital', 'articles', 'events'];

async function open(page: Page, surface: string) {
  expect((await page.goto(`./${surface ? `${surface}/` : ''}`))!.ok()).toBe(true);
  await page.evaluate(() => document.fonts.ready);
  if (surface === 'events' || surface === '') await expect(page.locator('[data-status]')).toContainText('events');
}

async function expectToolbarReadingOrder(page: Page) {
  const toolbar = page.locator('.filter-toolbar');
  const geometry = await toolbar.evaluate((el) => {
    const box = (node: Element) => {
      const r = node.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
    };
    const controls = [...el.querySelectorAll('[data-catalog-search], [data-catalog-scope], [data-search], [data-kind], [data-company-picker] > summary')];
    const count = el.querySelector('.index-count')!;
    const legend = el.querySelector('.kind-legend');
    const summary = el.querySelector('.event-filter-summary');
    const s = getComputedStyle(el);
    return { toolbar: box(el), lastControl: box(controls.at(-1)!), count: box(count), legend: legend ? box(legend) : null,
      borders: [s.borderTopWidth, s.borderBottomWidth],
      countMargin: getComputedStyle(count).marginLeft, summaryMargin: summary ? getComputedStyle(summary).marginLeft : '0px' };
  });
  expect(geometry.borders).toEqual(['0px', '0px']);
  expect(geometry.countMargin).toBe('0px'); expect(geometry.summaryMargin).toBe('0px');
  const { count, lastControl, legend } = geometry;
  if (count.top < lastControl.bottom) {
    expect(count.left - lastControl.right).toBeCloseTo(12, 1);
  } else {
    expect(count.left).toBeCloseTo(geometry.toolbar.left, 1);
  }
  if (legend) {
    if (legend.top < count.bottom) expect(legend.left).toBeGreaterThan(count.right);
    else expect(legend.left).toBeCloseTo(count.left, 1);
    expect(legend.right).toBeLessThanOrEqual(geometry.toolbar.right + 1);
  }
  expect(count.right).toBeLessThanOrEqual(geometry.toolbar.right);
}

async function indexStyles(page: Page) {
  return page.locator('.index-row').first().evaluate((row) => {
    const style = (selector: string) => {
      const s = getComputedStyle(row.querySelector(selector)!);
      return { size: parseFloat(s.fontSize), weight: s.fontWeight, line: parseFloat(s.lineHeight),
        color: s.color, font: s.fontFamily, tracking: s.letterSpacing, margin: parseFloat(s.marginTop) };
    };
    const s = getComputedStyle(row);
    const separator = getComputedStyle(row.nextElementSibling!);
    return {
      title: style('.index-title'), summary: style('.index-summary'), date: style('.index-date'),
      padding: [parseFloat(s.paddingTop), parseFloat(s.paddingBottom)],
      separator: [separator.borderTopWidth, separator.borderTopColor],
      border: [s.borderTopWidth, s.borderTopColor], background: s.backgroundColor, radius: s.borderRadius,
      copyWidth: row.querySelector('.index-summary')!.getBoundingClientRect().width,
    };
  });
}

for (const viewport of viewports) {
  test(`shared index hierarchy and functional widths at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const reports = [];
    const edges = [];
    const counts = [];
    for (const surface of indexes) {
      await open(page, surface);
      const nav = page.getByRole('navigation', { name: 'Primary' });
      await expect(nav.getByRole('link')).toHaveText(['Timeline', 'Events', 'Analog', 'Digital', 'Articles']);
      await expect(nav.locator('[aria-current="page"]')).toHaveText(surface[0].toUpperCase() + surface.slice(1));
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
      const report = await indexStyles(page);
      reports.push(report);
      expect(report.title.size).toBe(17); expect(report.title.weight).toBe('700');
      expect(report.title.line).toBeCloseTo(17 * 1.35, 1);
      expect(report.summary.size).toBe(15); expect(report.summary.weight).toBe('400');
      expect(report.summary.line).toBeCloseTo(15 * 1.65, 1);
      expect(report.summary.margin).toBe(9);
      expect(report.date.size).toBe(12); expect(report.date.weight).toBe('400');
      expect(report.date.font).toContain('monospace');
      expect(report.title.font).toContain('system-ui'); expect(report.title.font).not.toContain('Inter');
      expect(report.padding).toEqual([22, 24]); expect(report.border[0]).toBe('0px');
      expect(report.radius).toBe('0px'); expect(report.background).toBe('rgba(0, 0, 0, 0)');
      if (surface === 'articles') {
        expect(parseFloat(report.title.tracking) || 0).toBe(0);
        await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
        expect(await page.locator('.index-title').first().innerText()).toMatch(/[\p{Script=Hiragana}\p{Script=Han}]/u);
        await expect(page.locator('.article-index > .index-count')).toHaveText(`${articleCount} articles`);
        await expect(page.locator('.article-index > .index-count + .article-list')).toHaveCount(1);
        await expect(page.locator('.article-list > li')).toHaveCount(articleCount);
      } else await expectToolbarReadingOrder(page);
      counts.push(await page.locator('.index-count').evaluate((el) => {
        const s = getComputedStyle(el);
        return { size: s.fontSize, weight: s.fontWeight, color: s.color, line: s.lineHeight, numeric: s.fontVariantNumeric };
      }));
      const content = page.locator(surface === 'analog' || surface === 'digital' ? '.catalog' : surface === 'articles' ? '.listing-page' : '[data-event-explorer-root]');
      const max = 920;
      const box = (await content.boundingBox())!;
      edges.push({ x: box.x, width: box.width });
      expect(box.width).toBeLessThanOrEqual(max);
      expect(box.x).toBeCloseTo((viewport.width - box.width) / 2, 1);
      if (viewport.width >= 1280) expect(box.width).toBe(max);
      const navLines = await nav.getByRole('link').evaluateAll((links) => links.map((link) => Math.round(link.getBoundingClientRect().top)));
      expect(new Set(navLines).size).toBe(1);
    }
    // All four listing surfaces now share outer edges as well as typography.
    expect(new Set(reports.map((r) => r.summary.color)).size).toBe(1);
    expect(new Set(reports.map((r) => r.title.color)).size).toBe(1);
    expect(new Set(reports.map((r) => r.date.color)).size).toBe(1);
    expect(new Set(reports.map((r) => r.separator.join('/'))).size).toBe(1);
    expect(reports[0].separator[0]).toBe('1px');
    expect(new Set(edges.map((r) => JSON.stringify(r))).size).toBe(1);
    expect(new Set(counts.map((r) => JSON.stringify(r))).size).toBe(1);
    expect(counts[0]).toMatchObject({ size: '13px', weight: '400', numeric: 'tabular-nums' });
    expect(reports[0]).toEqual(reports[1]); // One Catalog presentation path.
    if (viewport.width >= 1280) {
      expect(reports[0].copyWidth).toBe(786);
      expect(reports[2].copyWidth).toBe(790);
    }

    await open(page, '');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
    expect(await page.locator('.page-shell').evaluate((el) => getComputedStyle(el).maxWidth)).toBe('1360px');
    await expect(page.locator('[data-activity-matrix-surface]')).toBeVisible();
    await expectToolbarReadingOrder(page);
  });
}

function contrast(a: number[], b: number[]) {
  const luminance = (rgb: number[]) => rgb.slice(0, 3).map((n) => n / 255)
    .map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)
    .reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0);
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

function hue(rgb: number[]) {
  const [r, g, b] = rgb.map((n) => n / 255);
  const high = Math.max(r, g, b), low = Math.min(r, g, b), span = high - low;
  if (!span) return NaN; // A gray palette must not pass category-separation checks.
  const sector = high === r ? (g - b) / span : high === g ? (b - r) / span + 2 : (r - g) / span + 4;
  return (sector * 60 + 360) % 360;
}

for (const colorScheme of ['light', 'dark'] as const) {
  test(`Catalog and Events share uppercase badge typography with distinct Scope colors in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    const badgeStyles = async (selector: string) => page.locator(selector).evaluateAll((nodes) => nodes.map((el) => {
      const s = getComputedStyle(el);
      return {
        typography: { family: s.fontFamily, size: s.fontSize, weight: s.fontWeight, tracking: s.letterSpacing,
          line: s.lineHeight, padding: s.padding, radius: s.borderRadius },
        transform: s.textTransform,
      };
    }));
    await open(page, 'events');
    const events = await badgeStyles('[data-event-result] .category-label');
    expect(events.length).toBeGreaterThan(0);
    expect(events[0].typography).toMatchObject({ size: '10px', weight: '600', line: '14px', tracking: '0.25px', padding: '3px 5px', radius: '3px' });
    for (const badge of events) {
      expect(badge.typography).toEqual(events[0].typography);
      expect(badge.transform).toBe('uppercase');
    }
    const palettes: Record<string, Record<string, number[]>> = {};
    for (const surface of ['analog', 'digital']) {
      await open(page, surface);
      const scope = await badgeStyles('.catalog-scope .category-label');
      expect(scope.length).toBeGreaterThan(0);
      for (const badge of scope) {
        expect(badge.typography).toEqual(events[0].typography);
        expect(badge.transform).toBe('uppercase');
      }
      const palette = await page.locator('.catalog').evaluate((el, stage) => {
        const rgb = (selector: string) => {
          const node = el.querySelector(selector);
          return node ? getComputedStyle(node).backgroundColor.match(/[\d.]+/g)!.slice(0, 3).map(Number) : null;
        };
        return Object.fromEntries(Object.entries({ design: rgb('.scope-design'), blue: rgb(`.scope-${stage}`),
          synthesis: rgb('.scope-synthesis'), layout: rgb('.scope-layout'), aiBuilt: rgb('.scope-ai-built') }).filter(([, value]) => value));
      }, surface === 'analog' ? 'simulation' : 'verification') as Record<string, number[]>;
      palettes[surface] = palette;
      // Review the full system: teal, blue, yellow-olive, copper and crimson.
      // Broad hue families allow tuning without allowing the warm categories to merge.
      const families = { design: [145, 180], blue: [195, 220], synthesis: [43, 65], layout: [10, 30], aiBuilt: [330, 355] };
      for (const [stage, color] of Object.entries(palette)) {
        const h = hue(color), [min, max] = families[stage as keyof typeof families];
        expect(h, `${surface} ${stage} hue`).toBeGreaterThanOrEqual(min);
        expect(h, `${surface} ${stage} hue`).toBeLessThanOrEqual(max);
      }
      const hues = Object.values(palette).map(hue);
      for (let i = 0; i < hues.length; i++) for (let j = i + 1; j < hues.length; j++) {
        const distance = Math.abs(hues[i] - hues[j]);
        expect(Math.min(distance, 360 - distance), 'Scope hue separation').toBeGreaterThanOrEqual(24);
      }
    }
    // Equivalent stages use the same palette, including Analog Simulation and Digital Verification.
    for (const [stage, color] of Object.entries(palettes.analog)) expect(color).toEqual(palettes.digital[stage]);
  });

  test(`text hierarchy and quiet activity retain contrast in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    for (const surface of indexes) {
      await open(page, surface);
      const palette = await page.evaluate(() => {
        const ctx = document.createElement('canvas').getContext('2d')!;
        const rgb = (color: string) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = color; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data]; };
        const color = (selector: string, property: 'color' | 'borderColor' = 'color') => {
          const node = document.querySelector(selector);
          return node ? rgb(getComputedStyle(node)[property]) : null;
        };
        return { bg: rgb(getComputedStyle(document.documentElement).backgroundColor),
          title: color('.index-title'), summary: color('.index-summary'), date: color('.index-date'),
          links: color('.index-links a'),
          active: color('.activity-strip li.active', 'borderColor'), inactive: color('.activity-strip li:not(.active)', 'borderColor') };
      });
      for (const [key, value] of Object.entries(palette)) {
        if (!value || key === 'bg') continue;
        expect(contrast(value, palette.bg), `${surface} ${key} contrast`).toBeGreaterThanOrEqual(['active', 'inactive'].includes(key) ? 3 : 4.5);
      }
      if (surface === 'analog' || surface === 'digital') {
        const styles = await page.locator('.catalog-project').first().evaluate((row) => {
          const size = (selector: string) => getComputedStyle(row.querySelector(selector)!).fontSize;
          const cells = [...row.querySelectorAll('.activity-strip li')].map((el) => {
            const r = el.getBoundingClientRect(); return { month: el.getAttribute('data-month'), x: r.x, width: r.width, height: r.height };
          });
          return { links: size('.catalog-quicklinks'), scope: size('.scope-label'), cells };
        });
        expect(styles.links).toBe('13px'); expect(styles.scope).toBe('10px');
        const badges = await page.locator('.scope-label').evaluateAll((nodes) => nodes.map((el) => {
          const s = getComputedStyle(el), rgb = (color: string) => color.match(/[\d.]+/g)!.map(Number);
          return { label: el.textContent, color: rgb(s.color), fill: rgb(s.backgroundColor) };
        }));
        for (const badge of badges) expect(contrast(badge.color, badge.fill), `${surface} ${badge.label} badge contrast`).toBeGreaterThanOrEqual(4.5);
        expect(styles.cells).toHaveLength(12);
        expect(styles.cells.map((c) => c.month)).toEqual(styles.cells.map((c) => c.month).sort().reverse());
        for (let i = 0; i < 12; i++) {
          expect(styles.cells[i].width).toBe(5); expect(styles.cells[i].height).toBe(10);
          if (i) expect(styles.cells[i].x - styles.cells[i - 1].x).toBe(7);
        }
      }
    }
  });
}

test('Events toolbar is flat while its controls and company popover remain usable', async ({ page }) => {
  await open(page, 'events');
  const utility = page.locator('.event-filter-utility');
  const style = await utility.evaluate((el) => {
    const s = getComputedStyle(el); return { background: s.backgroundColor, shadow: s.boxShadow, radius: s.borderRadius, top: s.borderTopWidth, side: s.borderLeftWidth };
  });
  expect(style).toEqual({ background: 'rgba(0, 0, 0, 0)', shadow: 'none', radius: '0px', top: '0px', side: '0px' });
  for (const selector of ['[data-search]', '[data-kind]', '.company-picker summary']) {
    const control = utility.locator(selector);
    expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(40);
    expect(await control.evaluate((el) => getComputedStyle(el).fontSize)).toBe('14px');
  }
  await page.locator('[data-search]').fill('PLL');
  await page.locator('[data-kind]').selectOption('technical');
  await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
  await expect(page).toHaveURL(/q=PLL/);
  const summary = page.locator('.company-picker summary');
  await summary.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('.company-picker-panel')).toBeVisible();
  expect(await page.locator('.company-picker-panel').evaluate((el) => getComputedStyle(el).boxShadow)).not.toBe('none');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle)).not.toBe('none');
});

test('Japanese reading measure and prose stay comfortable on desktop and mobile', async ({ page }) => {
  for (const viewport of [viewports[0], viewports[3], viewports[4]]) {
    await page.setViewportSize(viewport); await open(page, 'articles');
    await page.locator('.article-list h2 a').first().click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    const styles = await page.locator('.article-body').evaluate((el) => {
      const s = getComputedStyle(el);
      return { size: parseFloat(s.fontSize), line: parseFloat(s.lineHeight), width: el.getBoundingClientRect().width, breaking: s.lineBreak, tracking: getComputedStyle(document.querySelector('h1')!).letterSpacing };
    });
    expect(styles.size).toBe(17); expect(styles.line).toBeCloseTo(17 * 1.85, 1);
    expect(styles.width).toBeLessThanOrEqual(800); expect(styles.breaking).toBe('strict');
    expect(parseFloat(styles.tracking) || 0).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(viewport.width);
  }
});
