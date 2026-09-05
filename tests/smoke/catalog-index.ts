import { expect, test, type Page } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { expectIndexColumns, expectScopeCircles, expectActivityBands, expectTitleAndIndexGeometry } from './catalog-presentation';

const linkLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };
export async function catalogFixture(domain: 'analog' | 'digital') {
  const directory = new URL(`../../src/content/${domain}/`, import.meta.url);
  const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => ({
    id: file.slice(0, -3), ...parseFrontmatter(await readFile(new URL(file, directory), 'utf8')).frontmatter,
  })));
  const activity = JSON.parse(await readFile(new URL(`../../src/data/${domain}-activity.json`, import.meta.url), 'utf8'));
  const date = (id: string) => activity.projects[id].lastCommitAt ?? activity.projects[id].lastPublicUpdateAt;
  const key = (name: string) => name.normalize('NFKC').toLowerCase().trim();
  const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  const ordered = [...projects].sort((a, b) => compare(date(b.id), date(a.id)) || compare(key(a.name), key(b.name)) || compare(a.id, b.id));
  const prefix = domain === 'analog' ? 'catalog' : 'digital';
  const attribute = `data-${prefix}-project`;
  return { domain, prefix, attribute, projects, ordered, activity,
    rows: (page: Page) => page.locator(`[${attribute}]`),
    row: (page: Page, id: string) => page.locator(`[${attribute}="${id}"]`),
  };
}

export function catalogIndexTests(fixture: Awaited<ReturnType<typeof catalogFixture>>, scopeStageLabels: Record<string, string>, inspect: string[]) {
  const { domain, prefix, attribute, projects, ordered, activity, rows, row } = fixture;
  const label = domain === 'analog' ? 'Analog' : 'Digital';
  const open = (page: Page) => page.goto(`./${domain}/`);
  const noOverflow = async (page: Page) => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  test(`${label} starts with one sparse, activity-ordered project index`, async ({ page }) => {
    expect((await open(page))!.ok()).toBe(true);
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link')).toHaveText(['Timeline', 'Events', 'Analog', 'Digital', 'Articles']);
    await expect(nav.locator('[aria-current="page"]')).toHaveText(label);
    for (const [text, route] of [['Analog', 'analog'], ['Digital', 'digital']]) {
      await expect(nav.getByRole('link', { name: text, exact: true })).toHaveAttribute('href', `/ams-signals/${route}/`);
    }
    await expect(page).toHaveTitle(`${label} · AMS Signals`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveText(label); await expect(h1).toHaveClass('visually-hidden');
    expect((await h1.boundingBox())!.width).toBeLessThanOrEqual(1);
    const catalog = page.locator(`[data-${domain}]`);
    expect(await catalog.evaluate((el) => [...el.children].map((x) => x.tagName))).toEqual(['H1', 'SECTION']);
    expect(await catalog.locator('section').evaluate((el) => el.firstElementChild?.className)).toBe(`${prefix}-columns`);
    await expectIndexColumns(page.locator(`.${prefix}-columns`));
    await expect(catalog.locator('table, input, select, button, form, details, summary, [role="region"], [tabindex]')).toHaveCount(0);
    const text = await catalog.textContent();
    expect(text).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
    for (const forbidden of ['Flow', 'AI Build', 'AI Development', 'AI Runtime', 'AI-powered', 'Keywords', 'Type / Links', 'Traditional', 'AI-enabled', 'Design Agent', 'Landscape', 'Recent additions', 'Methodology', 'What it does', 'Primary sources', 'A–Z', '◐']) expect(text).not.toContain(forbidden);
    await expect(catalog.locator('[data-tag-kind], [class$="-metadata"]')).toHaveCount(0);
    const rendered = await rows(page).evaluateAll((nodes, { prefix, attribute }) => nodes.map((el) => ({
      id: el.getAttribute(attribute), rowId: el.id,
      name: el.querySelector('h2')!.textContent, nameLinks: el.querySelectorAll('h2 a').length,
      description: el.querySelector(`.${prefix}-description`)!.textContent,
      descriptions: el.querySelectorAll(`.${prefix}-description`).length,
      title: el.querySelector<HTMLElement>(`.${prefix}-title`)!.innerText.replace(/\s+/g, ' ').trim(),
      titleChildren: [...el.querySelector(`.${prefix}-title`)!.children].map((x) => x.tagName),
      links: [...el.querySelectorAll<HTMLAnchorElement>(`.${prefix}-title .${prefix}-quicklinks a`)].map((x) => ({ label: x.textContent, href: x.getAttribute('href') })),
      linkCount: el.querySelectorAll('a').length,
    })), { prefix, attribute });
    expect(rendered).toEqual(ordered.map((p) => {
      const links = p.sources.filter((s: any) => s.purpose).sort((a: any, b: any) => Object.keys(linkLabels).indexOf(a.purpose) - Object.keys(linkLabels).indexOf(b.purpose))
        .map((s: any) => ({ label: linkLabels[s.purpose as keyof typeof linkLabels], href: s.url }));
      return { id: p.id, rowId: '', name: p.name, nameLinks: 0, description: p.description, descriptions: 1,
        title: [p.name, ...links.map((link: { label: string }) => link.label)].join(' '), titleChildren: ['H2', 'UL'],
        links, linkCount: links.length };
    }));
    const ids = await page.locator('[id]').evaluateAll((nodes) => nodes.map((el) => el.id));
    expect(new Set(ids).size).toBe(ids.length);
    await expect(catalog.locator('a[href^="#"], a[href*="/analog/#"], a[href*="/digital/#"]')).toHaveCount(0);
    expect(await catalog.locator('ol, ul').evaluateAll((nodes) => nodes.every((el) => getComputedStyle(el).listStyleType === 'none'))).toBe(true);
  });

  test(`${label} vertical Scope preserves every authored stage and its accessible meaning`, async ({ page }) => {
    await open(page);
    for (const p of projects) {
      const scope = row(page, p.id).getByRole('list', { name: `${p.name} Scope`, exact: true });
      const cells = await scope.locator('li').evaluateAll((nodes) => nodes.map((el) => ({
        stage: el.getAttribute('data-scope-item'), level: el.getAttribute('data-level'), ai: el.getAttribute('data-ai'),
        title: el.getAttribute('title'), text: el.textContent?.trim(),
      })));
      const expected: { stage: string; level: string; ai: string | null; title: string; text: string }[] = Object.entries(scopeStageLabels).filter(([stage]) => p.scope[stage]).map(([stage, label]) => {
        const { level, ai } = p.scope[stage];
        const text = `${ai ? 'AI ' : ''}${label}: ${level === 'core' ? 'Core' : 'Supporting'} scope`;
        return { stage, level, ai: String(ai), title: text, text };
      });
      if (p.scope.aiBuilt) {
        const meaning = p.scope.aiBuilt === 'core' ? 'Defining AI development provenance' : 'Partial or secondary AI development provenance';
        const text = `AI-built: ${meaning}`;
        expected.push({ stage: 'aiBuilt', level: p.scope.aiBuilt, ai: null, title: text, text });
      }
      expect(cells).toEqual(expected);
      expect(new Set(cells.map((cell) => cell.stage)).size).toBe(cells.length);
      expect(cells.length).toBeGreaterThan(0);
    }
    await expectScopeCircles(page.locator(`.${prefix}-scope`));
  });

  test(`${label} every row retains the reviewed twelve-month activity band`, async ({ page }) => {
    await open(page); await expectActivityBands(rows(page), `.${prefix}-activity`, activity);
  });

  test(`${label} keyboard navigation reaches only useful external actions after the site navigation`, async ({ page }) => {
    await open(page);
    const first = rows(page).first().locator(`.${prefix}-quicklinks a`).first();
    for (let i = 0; i < 10 && !await first.evaluate((el) => el === document.activeElement); i++) await page.keyboard.press('Tab');
    await expect(first).toBeFocused();
    const allLinks = rows(page).locator(`.${prefix}-quicklinks a`);
    await page.keyboard.press('Tab'); await expect(allLinks.nth(1)).toBeFocused();
    const href = (await first.getAttribute('href'))!;
    await page.route(href, (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Primary source destination</h1>' }));
    await page.keyboard.press('Shift+Tab'); await page.keyboard.press('Enter');
    await expect(page).toHaveURL(href);
    await page.goBack(); await expect(rows(page)).toHaveCount(projects.length);
  });

  test(`${label} descriptions, Scope, activity and external links work without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage(); await open(page);
    await expect(rows(page)).toHaveCount(projects.length);
    await expect(rows(page).locator(`.${prefix}-description`)).toHaveText(ordered.map((p) => p.description));
    await expectScopeCircles(page.locator(`.${prefix}-scope`));
    await expectActivityBands(rows(page), `.${prefix}-activity`, activity);
    const last = rows(page).last().locator(`.${prefix}-quicklinks a`).first();
    await last.scrollIntoViewIfNeeded(); await expect(last).toBeInViewport();
    const href = (await last.getAttribute('href'))!;
    await page.route(href, (route) => route.fulfill({ contentType: 'text/html', body: '<h1>Primary source destination</h1>' }));
    await last.click(); await expect(page).toHaveURL(href);
    await page.goBack(); await page.reload(); await expect(rows(page)).toHaveCount(projects.length);
    await context.close();
  });

  for (const width of [1440, 1280, 1024, 390, 320]) {
    test(`${label} compact index fits ${width}px without overflow or overlapping content`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 900 }); await open(page); await noOverflow(page);
      await expectTitleAndIndexGeometry(rows(page), prefix, width);
      await expectActivityBands(rows(page), `.${prefix}-activity`, activity);
      if (width >= 1024) {
        await expect(page.locator(`.${prefix}-columns`)).toBeVisible();
        expect(await rows(page).evaluateAll((nodes) => nodes.filter((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length)).toBeGreaterThanOrEqual(4);
      } else await expect(page.locator(`.${prefix}-columns`)).not.toBeVisible();
      await page.screenshot({ path: info.outputPath(`${domain}-index-${width}.png`) });
      const selected = new Set([ordered[0].id, ordered[Math.floor(projects.length / 2)].id, ordered.at(-1)!.id, ...inspect]);
      for (const id of selected) {
        await row(page, id).evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
        await noOverflow(page);
        await page.screenshot({ path: info.outputPath(`${domain}-row-${width}-${id}.png`) });
      }
    });
  }

  test(`${label} introduces no storage or external requests and preserves viewer/navigation isolation`, async ({ page }) => {
    await page.goto('./events/?q=PLL&kind=organizational&companies=apple');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    const link = nav.getByRole('link', { name: label, exact: true });
    await expect(link).not.toHaveAttribute('data-filter-view-link');
    await expect(link).not.toHaveAttribute('data-filter-surface');
    const before = await page.evaluate(() => Object.entries(localStorage));
    const external: string[] = [];
    page.on('request', (request) => { if (new URL(request.url()).origin !== new URL(page.url()).origin) external.push(request.url()); });
    await link.click(); await expect(rows(page)).toHaveCount(projects.length);
    await rows(page).last().scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => Object.entries(localStorage))).toEqual(before);
    expect(external).toEqual([]);
    for (const name of ['Timeline', 'Events', 'Articles']) {
      await nav.getByRole('link', { name, exact: true }).click();
      await expect(nav.locator('[aria-current="page"]')).toHaveText(name);
      expect(new URL(page.url()).search).toBe('');
      if (name !== 'Articles') await expect(page.locator('[data-search]')).toHaveValue('');
      await page.goBack(); await expect(rows(page)).toHaveCount(projects.length);
    }
  });

  test(`${label} Scope and binary activity remain distinct in forced colors`, async ({ page }) => {
    await page.emulateMedia({ forcedColors: 'active' }); await open(page);
    await expectScopeCircles(page.locator(`.${prefix}-scope`));
    await expectActivityBands(rows(page), `.${prefix}-activity`, activity);
  });
}
