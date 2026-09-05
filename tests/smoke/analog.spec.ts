import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { expectIndexColumns, expectScopeCircles, expectActivityBands, expectTitleAndIndexGeometry } from './catalog-presentation';

// Authored inventory and snapshot are independent expectations, not a fixed initial-project list.
const directory = new URL('../../src/content/analog/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return {
    id: file.slice(0, -3), ...frontmatter,
    // Existing authored headings are plain English; retain their published Markdown slugs.
    detailIds: [...content.matchAll(/^### (.+)$/gm)].map(([, title]) => title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-')),
  };
}));
const total = projects.length;
const activity = JSON.parse(await readFile(new URL('../../src/data/analog-activity.json', import.meta.url), 'utf8'));
const roles = { benchmark: 'Benchmark', agent: 'Agent', 'eda-tool': 'EDA Tool', 'dataset-environment': 'Dataset & Environment' };
const stages = ['reasoning', 'generate-edit', 'simulate-measure', 'optimize', 'eda-integration', 'physical'];
const sourceLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };
const rows = (page: Page) => page.locator('[data-catalog-project]');
const ordered = [...projects].sort((a, b) => {
  const date = (p: typeof a) => {
    const record = activity.projects[p.id];
    return ['github', 'repository'].includes(record.kind) ? record.lastCommitAt : record.lastPublicUpdateAt ?? '';
  };
  if (date(a) !== date(b)) return date(a) > date(b) ? -1 : 1;
  const key = (p: typeof a) => `${p.name.normalize('NFKC').toLowerCase().trim()}\0${p.id}`;
  return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
});
async function open(page: Page, suffix = '') {
  await page.goto(`./analog/${suffix}`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Analog');
}
async function noOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}
async function atAnchor(page: Page, id: string) {
  const target = page.locator(`[id="${id}"]`);
  await expect(target).toBeInViewport();
  // Wait for native smooth scrolling; near the bottom, the document limits positioning.
  await expect.poll(() => target.evaluate((el) => {
    const targetY = el.getBoundingClientRect().top + scrollY;
    const maximum = document.documentElement.scrollHeight - innerHeight;
    const expected = Math.max(0, Math.min(maximum, targetY - parseFloat(getComputedStyle(el).scrollMarginTop)));
    return Math.abs(scrollY - expected);
  })).toBeLessThan(3);
}

test('each authored project renders once, newest activity first, with a concise English dashboard and direct sources', async ({ page }) => {
  const response = await page.request.get('./analog/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  for (const { id } of projects) expect(html.split(`id="${id}"`).length - 1).toBe(1);
  await open(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Analog · AMS Signals');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Analog\/RF\/AMS tools, agents, benchmarks/);
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await expect(nav.getByRole('link')).toHaveText(['Timeline', 'Events', 'Articles', 'Analog', 'Digital']);
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Analog');
  await expect(nav.getByRole('link', { name: 'Analog', exact: true })).toHaveAttribute('href', '/ams-signals/analog/');
  expect(await page.locator('[data-analog]').textContent()).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  expect(await rows(page).evaluateAll((elements) => elements.map((el) => el.id))).toEqual(ordered.map((p) => p.id));
  await expect(page.locator('[data-analog] details, [data-analog] summary')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveClass('visually-hidden');
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(ordered.map((p) => p.name));
  await expectIndexColumns(page.locator('.catalog-columns'));
  await expect(page.locator('.catalog-header, .catalog-updates, .catalog-reviewed, .catalog-publication-note, .catalog-section-heading, .catalog-sources, .catalog-detail, .catalog-summary')).toHaveCount(0);
  const text = await page.locator('[data-analog]').textContent();
  for (const removed of ['Type / Links', 'Traditional', 'AI-enabled', 'Design Agent', 'Benchmarks, agents, and tools for analog/RF/AMS design.', 'Reviewed from primary public sources', 'Recent additions', 'Public repository activity snapshot:', 'A–Z', 'Public repository activity is a visibility signal', 'Current month is partial', 'Activity method.', 'no independent reproduction', 'Landscape', 'Projects ↓', 'What it does', 'Primary sources', 'Scroll horizontally to see all scopes.']) {
    expect(text).not.toContain(removed);
  }
  await expect(page.locator('[data-analog] input, [data-analog] select, [data-analog] button, [data-analog] form')).toHaveCount(0);
  for (const project of projects) {
    const row = page.locator(`#${project.id}`);
    await expect(row.locator('h2')).toHaveText(project.name);
    await expect(row.locator('.catalog-description')).toHaveText(project.description);
    await expect(row.locator('.catalog-description')).toBeVisible();
    expect((await row.textContent())!.split(project.description).length - 1).toBe(1);
    expect(await row.textContent()).not.toContain(project.summary);
    await expect(row.locator('.catalog-type, .catalog-links')).toHaveCount(0);
    expect(await row.locator('.catalog-keywords li').evaluateAll((tags) => tags.map((tag) => ({ kind: tag.getAttribute('data-tag-kind'), label: tag.textContent })))).toEqual([
      ...project.roles.map((role: keyof typeof roles) => ({ kind: 'role', label: roles[role] })),
      ...(project.aiBuilt ? [{ kind: 'ai', label: 'AI-built' }] : []),
      ...project.keywords.map((label: string) => ({ kind: 'keyword', label })),
    ]);
    const primarySources = project.sources.filter((s: { purpose?: string }) => s.purpose).sort((a: any, b: any) => Object.keys(sourceLabels).indexOf(a.purpose) - Object.keys(sourceLabels).indexOf(b.purpose));
    await expect(row.locator('.catalog-title .catalog-quicklinks a')).toHaveCount(primarySources.length);
    for (const source of primarySources) {
      const link = row.locator('.catalog-title .catalog-quicklinks').getByRole('link', { name: sourceLabels[source.purpose as keyof typeof sourceLabels], exact: true });
      await expect(link).toHaveAttribute('href', source.url);
      await expect(link).toBeVisible();
      await expect(row.locator(`[id="${project.id}--source-${source.id}"] a`)).toHaveAttribute('href', source.url);
    }
    await expect(row.locator('.catalog-title .catalog-quicklinks a')).toHaveText(primarySources.map((source: any) => sourceLabels[source.purpose as keyof typeof sourceLabels]));
    // Every authored primary link remains directly beside the title; no bibliography or duplicate repository link.
    await expect(row.locator('a')).toHaveCount(1 + primarySources.length);
  }
});

test('Landscape contains every project with the authored state in each of the six columns', async ({ page }) => {
  await open(page);
  const table = page.getByRole('table', { name: 'Workflow scope by project' });
  await expect(table.locator('tbody tr')).toHaveCount(total);
  await expect(table.locator('thead th')).toHaveText(['Project', 'Reasoning', 'Generate / Edit', 'Simulate / Measure', 'Optimize', 'EDA Integration', 'Physical']);
  await expect(table.locator('tbody th')).toHaveText(ordered.map((p) => p.name));
  for (const project of projects) {
    const row = table.locator(`[data-landscape-project="${project.id}"]`);
    await expect(row.locator('th')).toHaveAttribute('scope', 'row');
    for (const stage of stages) {
      const cell = row.locator(`[data-workflow="${stage}"]`);
      const scope = project.workflow[stage];
      await expect(cell).toHaveAttribute('data-scope', scope ?? '');
      await expect(cell.locator('.scope-mark')).toHaveCount(scope ? 1 : 0);
    }
  }
  await expectScopeCircles(table);
  await expect(page.locator('[id="catalog:legend"] > span')).toHaveText(['● core', '○ supporting']);
  expect(await page.locator('.landscape-scroll').evaluate((el) => el.nextElementSibling?.id)).toBe('catalog:legend');
  expect(await page.locator('[id="catalog:landscape"]').evaluate((el) => el.firstElementChild?.className)).toBe('landscape-scroll');
  expect(await page.locator('[id="catalog:index"]').evaluate((el) => el.firstElementChild?.className)).toBe('catalog-columns');
  await table.getByRole('link', { name: ordered.at(-1)!.name, exact: true }).click();
  await expect(page.locator(`#${ordered.at(-1)!.id} h2`)).toBeInViewport();
  expect(new URL(page.url()).hash).toBe(`#${ordered.at(-1)!.id}`);
});

test('domain membership and approved AI-built provenance stay distinct across both catalogs', async ({ page }) => {
  await open(page);
  const moved = 'ngspice-openvaf-enhancements';
  const types = (selector: string) => page.locator(selector).evaluateAll((elements) => elements
    .filter((el) => el.textContent?.includes('AI-built')).map((el) => el.closest('li[id]')!.id).sort());
  expect(await types('.catalog-keywords [data-tag-kind="ai"]')).toEqual([moved]);
  await expect(page.locator(`#${moved} .catalog-keywords [data-tag-kind]:not([data-tag-kind="keyword"])`)).toHaveText(['EDA Tool', 'AI-built']);
  await expect(page.locator(`#${moved} .catalog-permalink`)).toHaveAttribute('href', `/ams-signals/analog/#${moved}`);
  const baselineIds = ['ngspice', 'xyce', 'xschem', 'openvaf-reloaded', 'klayout', 'magic', 'align'];
  for (const id of baselineIds) {
    await expect(page.locator(`[data-catalog-project][id="${id}"]`)).toHaveCount(1);
    await expect(page.locator(`[data-landscape-project="${id}"]`)).toHaveCount(1);
    await expect(page.locator(`#${id} .catalog-keywords [data-tag-kind="role"]`)).toHaveText('EDA Tool');
  }
  await expect(page.locator('#ngspice .activity-strip > li')).toHaveCount(12);
  await expect(page.locator('#ngspice [data-commits], #ngspice .activity-repository')).toHaveCount(0);
  await expect(page.locator('#ngspice .catalog-quicklinks').getByRole('link', { name: 'Code', exact: true })).toHaveAttribute('href', /^https:\/\/sourceforge\.net\//);
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Digital', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Digital');
  await expect(page.locator(`[data-digital-project][id="${moved}"], [data-digital-landscape-project="${moved}"]`)).toHaveCount(0);
  expect(await types('.digital-keywords [data-tag-kind="ai"]')).toEqual(['iverilog-uvm', 'uhdm2rtlil', 'vitamin', 'vivado-mcp', 'what', 'xezim']);
  for (const id of ['dr-rtl', 'verifyrtl', 'haven', 'ucagent', 'spec2cov', 'coresmith']) {
    await expect(page.locator(`#${id} .digital-keywords [data-tag-kind="role"]`)).toHaveText('Agent');
  }
  await expect(page.locator('#verilator .digital-keywords [data-tag-kind="role"], #openroad-mcp .digital-keywords [data-tag-kind="role"]')).toHaveText(['EDA Tool', 'EDA Tool']);
});

test('every project stacks its public date, twelve binary signal cells and month summary', async ({ page }) => {
  await open(page);
  await expectActivityBands(rows(page), '.catalog-activity', activity);
});

test('ATLAS and ngspice map reviewed point signals to their month without fabricated repository history', async ({ page }) => {
  await open(page);
  for (const [id, date, month, type, label] of [
    ['atlas', 'Jul 15', '2026-07', 'paper', 'paper publication'],
    ['ngspice', 'Aug 11', '2026-08', 'release', 'release'],
  ]) {
    const row = page.locator(`#${id}`);
    await expect(row.locator('.activity-strip > li')).toHaveCount(12);
    await expect(row.locator('.activity-latest')).toHaveText(date);
    await expect(row.locator('.activity-summary')).toHaveText('1/12 months');
    await expect(row.locator('.activity-strip .active')).toHaveCount(1);
    await expect(row.locator('.activity-strip .active')).toHaveAttribute('data-month', month);
    await expect(row.locator('.activity-strip .active')).toHaveAttribute('data-signal', type);
    await expect(row.locator('.activity-strip .active')).toHaveAttribute('title', new RegExp(label + '$'));
    await expect(row.locator('[data-commits], .activity-repository')).toHaveCount(0);
    await expect(row.locator('.activity-strip li:not(.active)')).toHaveCount(11);
    expect(await row.locator('.activity-strip li:not(.active)').first().getAttribute('title')).toContain('no reviewed public activity signal');
    await expect(row.locator('.activity-latest time')).toHaveAttribute('title', new RegExp('^' + label + ':'));
    await expect(row.locator('.activity-latest a')).toHaveCount(0);
    await expect(row.locator('.catalog-quicklinks a')).not.toHaveCount(0);
  }
});

test('all published detail and source IDs remain unique native targets without a hidden bibliography', async ({ page }) => {
  await open(page);
  for (const project of projects) {
    const row = page.locator(`#${project.id}`);
    await expect(row.locator('.catalog-prerequisites, .activity-caveat, .catalog-review')).toHaveCount(0);
    const aliases = [
      ...project.detailIds.map((id) => `${project.id}--${id}`), `${project.id}--sources`,
      ...project.sources.filter((s: { purpose?: string }) => !s.purpose).map((s: { id: string }) => `${project.id}--source-${s.id}`),
    ];
    expect(await row.locator('.catalog-anchor').evaluateAll((nodes) => nodes.map((el) => el.id))).toEqual(aliases);
    expect(await row.locator('.catalog-anchor').allTextContents()).toEqual(aliases.map(() => ''));
  }
  const audit = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    const targets = [...document.querySelectorAll<HTMLAnchorElement>('[data-analog] a[href]')]
      .filter((a) => a.hash && a.origin === location.origin && a.pathname === location.pathname)
      .map((a) => decodeURIComponent(a.hash.slice(1)));
    return { duplicates: ids.filter((id, i) => ids.indexOf(id) !== i), missing: targets.filter((id) => !document.getElementById(id)) };
  });
  expect(audit).toEqual({ duplicates: [], missing: [] });
});

test('plain permalinks reach visible descriptions on direct navigation, reload and repeat activation', async ({ page }) => {
  await open(page, '#evo-ldo-bench');
  const row = page.locator('#evo-ldo-bench');
  await expect(row.locator('h2')).toBeInViewport();
  await expect(row.locator('.catalog-description')).toBeInViewport();
  const link = row.locator('.catalog-permalink');
  const url = new URL((await link.getAttribute('href'))!, page.url());
  expect(url.pathname).toMatch(/\/ams-signals\/analog\/$/);
  expect(url.search).toBe('');
  expect(url.hash).toBe('#evo-ldo-bench');
  await page.reload();
  await expect(row.locator('h2')).toBeInViewport();
  await link.click();
  await expect(row.locator('.catalog-description')).toBeInViewport();
});

for (const anchor of ['circuitrubric--source-code', 'circuitrubric--source-method', 'circuitrubric--evaluation']) {
  test(`descendant ${anchor} reaches its native target on direct load and reload`, async ({ page }) => {
    await open(page, `#${anchor}`);
    for (const reload of [false, true]) {
      if (reload) await page.reload();
      await atAnchor(page, anchor);
      expect(new URL(page.url()).hash).toBe(`#${anchor}`);
    }
  });
}

test('native hash navigation and back/forward preserve the actual target', async ({ page }) => {
  await open(page, '#circuitrubric--source-method');
  await page.locator('.landscape-table a[href$="#analoggym"]').click();
  await expect(page.locator('#analoggym h2')).toBeInViewport();
  expect(new URL(page.url()).hash).toBe('#analoggym');
  await page.goBack();
  await expect(page.locator('#circuitrubric--source-method')).toBeInViewport();
  expect(new URL(page.url()).hash).toBe('#circuitrubric--source-method');
  await page.goForward();
  await expect(page.locator('#analoggym h2')).toBeInViewport();
  expect(new URL(page.url()).hash).toBe('#analoggym');
});

test('unknown or malformed descendants do not guess an owner or throw', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const hash of ['unknown-project', 'circuitrubric--missing', 'circuitrubric-extra--evaluation', '%E0%A4%A']) {
    await open(page, `#${hash}`);
    await expect(rows(page).locator('.catalog-description')).toHaveCount(total);
    await expect(rows(page)).toHaveCount(total);
    expect(new URL(page.url()).hash).toBe(`#${hash}`);
  }
  expect(errors).toEqual([]);
});

test('without JavaScript, all descriptions, matrix, activity, links and native hashes remain usable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await open(page);
  await expect(rows(page)).toHaveCount(total);
  await expect(page.locator('.landscape-table tbody tr')).toHaveCount(total);
  await expect(rows(page).locator('.catalog-description')).toHaveCount(total);
  await expect(rows(page).locator('.catalog-activity')).toHaveCount(total);
  await expectActivityBands(rows(page), '.catalog-activity', activity);
  await expect(page.locator('#circuitrubric .catalog-quicklinks')).toBeVisible();
  for (const project of projects) await expect(page.locator(`#${project.id} .catalog-description`)).toBeVisible();
  await page.locator('#circuitrubric .catalog-permalink').click();
  await expect(page.locator('#circuitrubric h2')).toBeInViewport();
  await open(page, '#circuitrubric--source-method');
  await expect(page.locator('#circuitrubric--source-method')).toBeInViewport();
  await page.reload();
  await expect(page.locator('#circuitrubric--source-method')).toBeInViewport();
  await context.close();
});

test('keyboard navigation reaches the scroll region, project links and primary links without disclosure stops', async ({ page }) => {
  await open(page);
  const region = page.getByRole('region', { name: 'Landscape matrix; scroll horizontally for all scopes' });
  for (let i = 0; i < 30 && !await region.evaluate((el) => el === document.activeElement); i += 1) await page.keyboard.press('Tab');
  await expect(region).toBeFocused();
  await page.keyboard.press('Tab');
  const firstLink = page.locator('.landscape-table tbody a').first();
  await expect(firstLink).toBeFocused();
  // Activate immediately, including while Tab's native focus scroll is settling.
  await page.keyboard.press('Enter');
  const row = page.locator(`#${ordered[0].id}`);
  await expect(page).toHaveURL(new RegExp(`#${ordered[0].id}$`));
  await expect(row).toBeFocused();
  // Native focus may center the row instead of aligning its top edge.
  await expect(row.locator('h2')).toBeInViewport({ ratio: 1 });
  await expect(row.locator('.catalog-description')).toBeInViewport({ ratio: 1 });
  await page.keyboard.press('Tab');
  await expect(row.locator('.catalog-permalink')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(row.locator('.catalog-quicklinks a').first()).toBeFocused();
  for (let i = 0; i < await row.locator('.catalog-quicklinks a').count(); i += 1) await page.keyboard.press('Tab');
  await expect(page.locator(`#${ordered[1].id} .catalog-permalink`)).toBeFocused();
});

for (const width of [1440, 390, 320]) {
  test(`matrix and compact first/middle/last rows fit ${width}px, including source reload`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await open(page);
    await noOverflow(page);
    await page.screenshot({ path: info.outputPath(`landscape-${width}.png`), fullPage: false });
    if (width < 760) {
      const scroll = page.locator('.landscape-scroll');
      await scroll.evaluate((el) => { el.scrollLeft = el.scrollWidth; });
      const positions = await scroll.evaluate((el) => ({ left: el.getBoundingClientRect().left, name: el.querySelector('tbody th')!.getBoundingClientRect().left }));
      expect(Math.abs(positions.left - positions.name)).toBeLessThan(2);
      await page.screenshot({ path: info.outputPath(`landscape-${width}-scrolled.png`) });
    }
    await page.locator('[id="catalog:index"]').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
    await expectTitleAndIndexGeometry(rows(page), 'catalog', width);
    await expectActivityBands(rows(page), '.catalog-activity', activity);
    if (width === 1440) {
      const completeRows = await rows(page).evaluateAll((elements) => elements.filter((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length);
      expect(completeRows).toBeGreaterThanOrEqual(4);
      await page.screenshot({ path: info.outputPath('index-1440.png') });
    } else {
      await expect(page.locator('.catalog-columns')).not.toBeVisible();
    }
    for (const project of [ordered[0], ordered[Math.floor(total / 2)], ordered.at(-1)!, ...['panda', 'autosizer', 'ngspice-openvaf-enhancements', 'xschem'].map((id) => projects.find((p) => p.id === id)!)]) {
      await page.locator(`#${project.id}`).evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
      await noOverflow(page);
      await page.screenshot({ path: info.outputPath(`project-${width}-${project.id}.png`) });
    }
    await page.locator('#ngspice').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
    await noOverflow(page);
    await page.screenshot({ path: info.outputPath(`ngspice-${width}.png`) });
    await page.locator('#atlas').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
    await page.screenshot({ path: info.outputPath(`paper-only-${width}.png`) });
    await open(page, '#circuitrubric');
    await atAnchor(page, 'circuitrubric');
    await page.screenshot({ path: info.outputPath(`permalink-${width}.png`) });
    await open(page, '#circuitrubric--source-method');
    await page.reload();
    await atAnchor(page, 'circuitrubric--source-method');
    await noOverflow(page);
    await page.screenshot({ path: info.outputPath(`source-reload-${width}.png`) });
  });
}

test('catalog has no storage or runtime external requests and remains isolated from Timeline/Events state', async ({ page }) => {
  await page.goto('./events/?q=PLL&kind=organizational&companies=apple');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  const link = nav.getByRole('link', { name: 'Analog', exact: true });
  await expect(link).not.toHaveAttribute('data-filter-view-link');
  await expect(link).not.toHaveAttribute('data-filter-surface');
  const before = await page.evaluate(() => Object.entries(localStorage));
  const external: string[] = [];
  page.on('request', (request) => { if (new URL(request.url()).origin !== new URL(page.url()).origin) external.push(request.url()); });
  await link.click();
  await expect(rows(page)).toHaveCount(total);
  await page.locator('#circuitrubric .catalog-permalink').click();
  expect(await page.evaluate(() => Object.entries(localStorage))).toEqual(before);
  expect(external).toEqual([]);
  for (const label of ['Timeline', 'Events']) {
    await nav.getByRole('link', { name: label, exact: true }).click();
    expect(new URL(page.url()).search).toBe('');
    await expect(page.locator('[data-search]')).toHaveValue('');
    await page.goBack();
    await expect(rows(page)).toHaveCount(total);
  }
});

test('scope circles and binary activity stay distinct in forced-color mode', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await open(page);
  await expectScopeCircles(page.locator('.landscape-table'));
  await expectActivityBands(rows(page), '.catalog-activity', activity);
});
