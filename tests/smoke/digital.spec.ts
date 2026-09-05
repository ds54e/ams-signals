import { expect, test, type Page } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { expectIndexColumns, expectScopeCircles, expectActivityBands, expectTitleAndIndexGeometry } from './catalog-presentation';

const directory = new URL('../../src/content/digital/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => ({
  id: file.slice(0, -3), ...parseFrontmatter(await readFile(new URL(file, directory), 'utf8')).frontmatter,
})));
const activity = JSON.parse(await readFile(new URL('../../src/data/digital-activity.json', import.meta.url), 'utf8'));
const date = (id: string) => activity.projects[id].lastCommitAt ?? activity.projects[id].lastPublicUpdateAt;
const key = (value: string) => value.normalize('NFKC').toLowerCase().trim();
const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
const ordered = [...projects].sort((a, b) => compare(date(b.id), date(a.id)) || compare(key(a.name), key(b.name)) || compare(a.id, b.id));
const areas = ['simulation', 'frontend-synthesis', 'formal-verification', 'debug-waveform', 'flow-physical'];
const roles = { agent: 'Agent', benchmark: 'Benchmark', 'eda-tool': 'EDA Tool', 'dataset-environment': 'Dataset & Environment' };
const sourceLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };
const rows = (page: Page) => page.locator('[data-digital-project]');
const open = (page: Page, hash = '') => page.goto(`./digital/${hash}`);
const noOverflow = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
async function settleScroll(page: Page) {
  await page.evaluate(() => new Promise<void>((resolve, reject) => {
    let previous = scrollY, stableFrames = 0;
    const timeout = setTimeout(() => reject(new Error('Native scroll did not settle')), 5000);
    const frame = () => {
      stableFrames = scrollY === previous ? stableFrames + 1 : 0;
      previous = scrollY;
      if (stableFrames >= 12) { clearTimeout(timeout); resolve(); }
      else requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }));
}


test('Digital navigation, sparse English presentation and authored project rows render without duplicate details', async ({ page }) => {
  const response = await open(page);
  expect(response!.ok()).toBe(true);
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await expect(nav.getByRole('link')).toHaveText(['Timeline', 'Events', 'Articles', 'Analog', 'Digital']);
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Digital');
  await expect(nav.getByRole('link', { name: 'Digital', exact: true })).toHaveAttribute('href', '/ams-signals/digital/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveClass('visually-hidden');
  await expect(h1).toHaveText('Digital');
  await expect(page).toHaveTitle('Digital · AMS Signals');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RTL\/digital tools and agents/);
  expect((await h1.boundingBox())!.width).toBeLessThanOrEqual(1);
  expect(await page.locator('[data-digital]').textContent()).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  await expect(page.locator('[data-digital] input, [data-digital] button, [data-digital] select, [data-digital] details, [data-digital] summary, [data-digital] form')).toHaveCount(0);
  expect(await page.locator('[data-digital]').evaluate((el) => el.children[1].className)).toBe('digital-landscape');
  expect(await page.locator('[id="digital:index"]').evaluate((el) => el.firstElementChild?.className)).toBe('digital-columns');
  await expectIndexColumns(page.locator('.digital-columns'));
  expect(await page.locator('[data-digital] ol, [data-digital] ul').evaluateAll((lists) => lists.every((el) => getComputedStyle(el).listStyleType === 'none'))).toBe(true);
  for (const forbidden of ['Type / Links', 'Traditional', 'AI-enabled', 'Design Agent', 'Reviewed ', 'Recent additions', 'Methodology', 'freshness cutoff', 'AI-assisted', 'AI-native', 'What it does', 'Primary sources', 'A–Z']) {
    expect(await page.locator('[data-digital]').textContent()).not.toContain(forbidden);
  }
  const rendered = await rows(page).evaluateAll((nodes) => nodes.map((el) => ({
    id: el.id,
    name: el.querySelector('h2')!.textContent,
    description: el.querySelector('.digital-description')!.textContent,
    descriptions: el.querySelectorAll('.digital-description').length,
    tags: [...el.querySelectorAll('.digital-keywords li')].map((x) => ({ kind: x.getAttribute('data-tag-kind'), label: x.textContent })),
    links: [...el.querySelectorAll<HTMLAnchorElement>('.digital-title .digital-quicklinks a')].map((x) => ({ label: x.textContent, href: x.getAttribute('href') })),
    linkCount: el.querySelectorAll('a').length,
  })));
  expect(rendered).toEqual(ordered.map((p) => {
    const links = p.sources.filter((s: any) => s.purpose).sort((a: any, b: any) => Object.keys(sourceLabels).indexOf(a.purpose) - Object.keys(sourceLabels).indexOf(b.purpose))
      .map((s: any) => ({ label: sourceLabels[s.purpose as keyof typeof sourceLabels], href: s.url }));
    return { id: p.id, name: p.name, description: p.description, descriptions: 1,
      tags: [...p.roles.map((role: keyof typeof roles) => ({ kind: 'role', label: roles[role] })),
        ...(p.ai === 'ai-built' ? [{ kind: 'ai', label: 'AI-built' }] : []),
        ...p.keywords.map((label: string) => ({ kind: 'keyword', label }))],
      links, linkCount: 1 + links.length };
  }));
  await nav.getByRole('link', { name: 'Analog', exact: true }).click();
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Analog');
  await expect(page.locator('[data-analog]')).toBeVisible();
  await expect(page.locator('[data-digital]')).toHaveCount(0);
});

test('five-axis matrix has the exact authored scopes, matches list order and immediately precedes its legend', async ({ page }) => {
  await open(page);
  const table = page.getByRole('table', { name: 'Digital scope by project' });
  await expect(table.locator('thead th')).toHaveText(['Project', 'Simulation', 'Frontend / Synth', 'Formal / Verify', 'Debug / Wave', 'Flow / Physical']);
  const rendered = await table.locator('tbody tr').evaluateAll((nodes) => nodes.map((el) => ({
    id: el.getAttribute('data-digital-landscape-project'),
    name: el.querySelector('th')!.textContent,
    scope: el.querySelector('th')!.getAttribute('scope'),
    cells: [...el.querySelectorAll('td')].map((cell) => ({ area: cell.getAttribute('data-area'), state: cell.getAttribute('data-scope'), marks: cell.querySelectorAll('.digital-scope-mark').length })),
  })));
  expect(rendered).toEqual(ordered.map((p) => ({ id: p.id, name: p.name, scope: 'row', cells: areas.map((area) => ({
    area, state: p.areas[area] ?? '', marks: p.areas[area] ? 1 : 0,
  })) })));
  expect(await rows(page).evaluateAll((nodes) => nodes.map((el) => el.id))).toEqual(rendered.map((p) => p.id));
  await expectScopeCircles(table);
  await expect(page.locator('[id="digital:legend"] > span')).toHaveText(['● core', '○ supporting']);
  expect(await page.locator('.digital-landscape-scroll').evaluate((el) => el.nextElementSibling?.id)).toBe('digital:legend');
  const audit = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    const anchors = [...document.querySelectorAll<HTMLAnchorElement>('[data-digital] a')].filter((a) => a.origin === location.origin && a.hash);
    return { duplicates: ids.filter((id, i) => ids.indexOf(id) !== i), missing: anchors.filter((a) => !document.getElementById(a.hash.slice(1))).map((a) => a.hash) };
  });
  expect(audit).toEqual({ duplicates: [], missing: [] });
});

test('reviewed GitHub and GitLab histories share compact binary activity bands', async ({ page }) => {
  await open(page);
  await expectActivityBands(rows(page), '.digital-activity', activity);
  const surfer = page.locator('#surfer .digital-activity');
  expect(activity.projects.surfer.kind).toBe('repository');
  expect(activity.projects.surfer.repository).toBe('https://gitlab.com/surfer-project/surfer');
  await expect(surfer.locator('ul > li')).toHaveCount(12);
  await expect(surfer.locator('time')).toHaveAttribute('datetime', '2026-09-04');
  await expect(surfer.locator('.digital-activity-summary')).toHaveText('12/12 months');
  expect(await surfer.innerText()).not.toContain('gitlab.com');
});

test('native project hashes survive direct load, reload and browser back/forward', async ({ page }) => {
  const middle = ordered[Math.floor(ordered.length / 2)]; const last = ordered.at(-1)!;
  await open(page, `#${middle.id}`);
  await expect(page.locator(`#${middle.id} h2`)).toBeInViewport();
  await settleScroll(page);
  await page.reload();
  await expect(page.locator(`#${middle.id} .digital-description`)).toBeInViewport();
  await settleScroll(page);
  const next = page.locator('.digital-landscape-table').getByRole('link', { name: last.name, exact: true });
  await next.scrollIntoViewIfNeeded();
  await settleScroll(page);
  const previousY = await page.evaluate(() => scrollY);
  await next.click();
  await expect(page).toHaveURL(new RegExp(`#${last.id}$`));
  await expect(page.locator(`#${last.id} h2`)).toBeInViewport();
  await settleScroll(page);
  await page.goBack(); await expect(page).toHaveURL(new RegExp(`#${middle.id}$`));
  // Native history restores where the reader was browsing before following the link.
  await expect.poll(() => page.evaluate((y) => Math.abs(scrollY - y), previousY)).toBeLessThan(3);
  await page.goForward(); await expect(page).toHaveURL(new RegExp(`#${last.id}$`));
  await expect(page.locator(`#${last.id} h2`)).toBeInViewport();
});

test('keyboard activation reaches the project and advances naturally to its primary links', async ({ page }) => {
  await open(page);
  const region = page.getByRole('region', { name: 'Digital matrix; scroll horizontally for all scopes' });
  for (let i = 0; i < 20 && !await region.evaluate((el) => el === document.activeElement); i++) await page.keyboard.press('Tab');
  await expect(region).toBeFocused();
  await page.keyboard.press('Tab'); await expect(page.locator('.digital-landscape-table tbody a').first()).toBeFocused();
  await page.keyboard.press('Enter');
  const row = page.locator(`#${ordered[0].id}`);
  await expect(row).toBeFocused();
  await expect(row.locator('h2')).toBeInViewport({ ratio: 1 });
  await expect(row.locator('.digital-description')).toBeInViewport({ ratio: 1 });
  await page.keyboard.press('Tab'); await expect(row.locator('.digital-permalink')).toBeFocused();
  await page.keyboard.press('Tab'); await expect(row.locator('.digital-quicklinks a').first()).toBeFocused();
});

test('all Digital content and native hashes work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await open(page);
  await expect(rows(page)).toHaveCount(projects.length);
  await expect(page.locator('.digital-landscape-table tbody tr')).toHaveCount(projects.length);
  await expect(rows(page).locator('.digital-description')).toHaveText(ordered.map((p) => p.description));
  await expect(rows(page).locator('.digital-activity')).toHaveCount(projects.length);
  await expectActivityBands(rows(page), '.digital-activity', activity);
  await page.locator('.digital-landscape-table tbody a').last().click();
  await expect(page.locator(`#${ordered.at(-1)!.id} h2`)).toBeInViewport();
  await page.reload(); await expect(page.locator(`#${ordered.at(-1)!.id} h2`)).toBeInViewport();
  await expect(page.locator(`#${ordered.at(-1)!.id} .digital-quicklinks a`).first()).toBeVisible();
  await context.close();
});

for (const width of [1440, 390, 320]) {
  test(`Digital matrix and compact index fit ${width}px with sticky names and no page overflow`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 }); await open(page); await noOverflow(page);
    await page.screenshot({ path: info.outputPath(`digital-matrix-${width}.png`) });
    if (width < 760) {
      const scroll = page.locator('.digital-landscape-scroll');
      expect(await scroll.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
      await scroll.evaluate((el) => { el.scrollLeft = el.scrollWidth; });
      const left = await scroll.evaluate((el) => ({ container: el.getBoundingClientRect().left, name: el.querySelector('tbody th')!.getBoundingClientRect().left, scrolled: el.scrollLeft }));
      expect(left.scrolled).toBeGreaterThan(0); expect(Math.abs(left.name - left.container)).toBeLessThan(2);
      await page.screenshot({ path: info.outputPath(`digital-matrix-${width}-scrolled.png`) });
    }
    await page.locator('[id="digital:index"]').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
    await expectTitleAndIndexGeometry(rows(page), 'digital', width);
    await expectActivityBands(rows(page), '.digital-activity', activity);
    if (width === 1440) {
      expect(await rows(page).evaluateAll((nodes) => nodes.filter((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length)).toBeGreaterThanOrEqual(4);
    } else {
      await expect(page.locator('.digital-columns')).not.toBeVisible();
    }
    await page.screenshot({ path: info.outputPath(`digital-index-${width}.png`) });
    const nonGitHub = projects.filter((p) => activity.projects[p.id].kind !== 'github');
    for (const p of [ordered[0], ordered[Math.floor(projects.length / 2)], ordered.at(-1)!, ...nonGitHub, ...['xezim', 'haven', 'verilator', 'pono', 'iverilog-uvm'].map((id) => projects.find((p) => p.id === id)!)]) {
      await page.locator(`#${p.id}`).evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
      await noOverflow(page);
      await page.screenshot({ path: info.outputPath(`digital-row-${width}-${p.id}.png`) });
    }
  });
}

test('Digital has no runtime requests or viewer state and navigation preserves Timeline/Events isolation', async ({ page }) => {
  await page.goto('./events/?q=PLL&kind=organizational&companies=apple');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  const link = nav.getByRole('link', { name: 'Digital', exact: true });
  await expect(link).not.toHaveAttribute('data-filter-view-link');
  await expect(link).not.toHaveAttribute('data-filter-surface');
  const before = await page.evaluate(() => Object.entries(localStorage));
  const requests: string[] = [];
  page.on('request', (request) => { if (new URL(request.url()).origin !== new URL(page.url()).origin) requests.push(request.url()); });
  await link.click(); await expect(rows(page)).toHaveCount(projects.length);
  await page.locator('.digital-permalink').first().click();
  expect(await page.evaluate(() => Object.entries(localStorage))).toEqual(before);
  expect(requests).toEqual([]);
  for (const name of ['Timeline', 'Events', 'Articles']) {
    await nav.getByRole('link', { name, exact: true }).click();
    await expect(nav.locator('[aria-current="page"]')).toHaveText(name);
    expect(new URL(page.url()).search).toBe('');
    if (name !== 'Articles') await expect(page.locator('[data-search]')).toHaveValue('');
    await page.goBack(); await expect(rows(page)).toHaveCount(projects.length);
  }
});

test('scope circles and binary activity stay distinct in forced-color mode', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await open(page);
  await expectScopeCircles(page.locator('.digital-landscape-table'));
  await expectActivityBands(rows(page), '.digital-activity', activity);
});
