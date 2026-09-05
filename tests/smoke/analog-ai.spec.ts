import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';

// Authored inventory and snapshot are independent expectations, not a fixed initial-project list.
const directory = new URL('../../src/content/analog-ai/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => ({
  id: file.slice(0, -3), ...parseFrontmatter(await readFile(new URL(file, directory), 'utf8')).frontmatter,
})));
const total = projects.length;
const activity = JSON.parse(await readFile(new URL('../../src/data/analog-ai-activity.json', import.meta.url), 'utf8'));
const updates = JSON.parse(await readFile(new URL('../../src/data/analog-ai-updates.json', import.meta.url), 'utf8'));
const roles = { benchmark: 'Benchmark', agent: 'Design Agent', 'eda-tool': 'EDA Tool', 'dataset-environment': 'Dataset & Environment' };
const stages = ['reasoning', 'generate-edit', 'simulate-measure', 'optimize', 'eda-integration', 'physical'];
const sourceLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };
const rows = (page: Page) => page.locator('[data-catalog-project]');
const ordered = [...projects].sort((a, b) => {
  const key = (p: typeof a) => `${p.name.normalize('NFKC').toLowerCase().trim()}\0${p.id}`;
  return key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
});
async function open(page: Page, suffix = '') {
  await page.goto(`./analog-ai/${suffix}`);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Analog AI');
}
async function noOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}

test('each authored project renders once in the index, in A–Z order, with concise English metadata and direct sources', async ({ page }) => {
  const response = await page.request.get('./analog-ai/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  for (const { id } of projects) expect(html.split(`id="${id}"`).length - 1).toBe(1);
  await open(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.locator('[data-analog-ai]').textContent()).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  expect(await rows(page).evaluateAll((elements) => elements.map((el) => el.id))).toEqual(ordered.map((p) => p.id));
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
  await expect(page.locator('.catalog-header')).toContainText(`${total} projects`);
  await expect(page.locator('.catalog-updates a')).toHaveCount(updates.length);
  await expect(page.locator('[data-analog-ai] input, [data-analog-ai] select, [data-analog-ai] button, [data-analog-ai] form')).toHaveCount(0);
  for (const project of projects) {
    const row = page.locator(`#${project.id}`);
    await expect(row.locator('h3')).toHaveText(`${project.name} #`);
    await expect(row.locator('.catalog-summary')).toHaveText(project.summary);
    await expect(row.locator('.catalog-summary')).toBeVisible();
    await expect(row.locator('.catalog-reviewed time')).toHaveAttribute('datetime', project.reviewedAt);
    await expect(row.locator('.catalog-reviewed')).toHaveText(`Reviewed ${project.reviewedAt}`);
    await expect(row.locator('.catalog-roles li')).toHaveText(project.roles.map((role: keyof typeof roles) => roles[role]));
    await expect(row.locator('.catalog-keywords li')).toHaveText(project.keywords);
    for (const source of project.sources.filter((s: { purpose?: string }) => s.purpose)) {
      const link = row.locator('.catalog-quicklinks').getByRole('link', { name: sourceLabels[source.purpose as keyof typeof sourceLabels], exact: true });
      await expect(link).toHaveAttribute('href', source.url);
      await expect(link).toBeVisible();
    }
  }
});

test('Landscape contains every project with the authored state in each of the six columns', async ({ page }) => {
  await open(page);
  const table = page.getByRole('table', { name: 'Reviewed workflow scope by project' });
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
      await expect(cell.locator('.scope-mark')).toHaveText(scope === 'core' ? '●' : scope === 'supporting' ? '◐' : '');
      await expect(cell.locator('.visually-hidden')).toContainText(scope === 'core' ? 'Core reviewed scope' : scope === 'supporting' ? 'Supporting / constrained' : 'not a claim of inability');
    }
  }
  await expect(page.locator('[id="catalog:scope-note"]')).toContainText('not maturity or independently verified capability');
  await table.getByRole('link', { name: ordered.at(-1)!.name, exact: true }).click();
  await expect(page.locator(`#${ordered.at(-1)!.id} details`)).toHaveAttribute('open', '');
});

test('public repository activity renders exactly twelve binary months, explicit repositories and latest dates', async ({ page }) => {
  await open(page);
  await expect(page.locator('.catalog-header')).toContainText(`Public repository activity snapshot: ${activity.reviewedAt}`);
  for (const project of projects) {
    const record = activity.projects[project.id];
    const row = page.locator(`#${project.id} .catalog-activity`);
    await expect(row).toHaveAttribute('data-activity-kind', record.kind);
    if (record.kind !== 'github') continue;
    await expect(row.locator('.activity-repository')).toHaveText(record.repository);
    await expect(row.locator('.activity-repository')).toHaveAttribute('href', `https://github.com/${record.repository}/commits/${encodeURIComponent(record.defaultBranch)}/`);
    await expect(row.locator('.activity-strip li')).toHaveCount(12);
    for (let i = 0; i < 12; i += 1) {
      const month = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${activity.months[i]}-01T00:00:00Z`));
      const bucket = row.locator('.activity-strip li').nth(i);
      await expect(bucket).toHaveAttribute('title', `${month} · ${record.commits[i]} default-branch commits`);
      await expect(bucket.locator('[aria-hidden]')).toHaveText(record.commits[i] > 0 ? '●' : '·');
      await expect(bucket.locator('.visually-hidden')).toHaveText(`${month} · ${record.commits[i]} default-branch commits`);
    }
    await expect(row.locator('.activity-summary')).toContainText(`${record.commits.filter((n: number) => n > 0).length}/12 active months`);
    await expect(row.locator('time')).toHaveAttribute('datetime', record.lastCommitAt);
  }
  await expect(page.locator('.activity-intro')).toContainText('not a measure of quality, maturity, or total development effort');
});

test('projects without a verified repository show a neutral sourced date, with no invented activity strip', async ({ page }) => {
  await open(page);
  const paperProjects = projects.filter((p) => activity.projects[p.id].kind === 'no-public-repo');
  expect(paperProjects.length).toBeGreaterThan(0);
  for (const p of paperProjects) {
    const row = page.locator(`#${p.id}`);
    await expect(row.locator('.activity-no-repo')).toHaveText('No verified public repository');
    await expect(row.locator('.activity-strip')).toHaveCount(0);
    await expect(row.locator('.catalog-quicklinks a')).toBeVisible();
    await expect(row.locator('.catalog-activity time')).toHaveAttribute('datetime', activity.projects[p.id].lastPublicUpdateAt);
  }
});

test('Notes are independently native and retain prerequisites, research, sources, and valid unique anchors', async ({ page }) => {
  await open(page);
  await page.locator('#circuitrubric summary').click();
  await page.locator('#analoggym summary').click();
  await expect(rows(page).locator('details[open]')).toHaveCount(2);
  await expect(page.locator('#circuitrubric .catalog-detail')).toContainText('Strict grading distinguishes MOS drain and source');
  await expect(page.locator('#analoggym .catalog-prerequisites')).toContainText('Access & environment');
  const audit = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    const targets = [...document.querySelectorAll<HTMLAnchorElement>('.catalog-detail a[href^="#"]')].map((a) => decodeURIComponent(a.hash.slice(1)));
    return { duplicates: ids.filter((id, i) => ids.indexOf(id) !== i), missing: targets.filter((id) => !document.getElementById(id)) };
  });
  expect(audit).toEqual({ duplicates: [], missing: [] });
  await page.locator('#circuitrubric summary').click();
  await expect(page.locator('#analoggym details')).toHaveAttribute('open', '');
  await page.reload();
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
});

test('plain permalinks open Notes on direct navigation and repeat activation without custom history', async ({ page }) => {
  await open(page, '#evo-ldo-bench');
  const row = page.locator('#evo-ldo-bench');
  await expect(row.locator('details')).toHaveAttribute('open', '');
  await expect(row.locator('h3')).toBeInViewport();
  const link = row.locator('.catalog-permalink');
  const url = new URL((await link.getAttribute('href'))!, page.url());
  expect(url.pathname).toMatch(/\/ams-signals\/analog-ai\/$/);
  expect(url.search).toBe('');
  expect(url.hash).toBe('#evo-ldo-bench');
  await row.locator('summary').click();
  await link.click();
  await expect(row.locator('details')).toHaveAttribute('open', '');
});

for (const anchor of ['circuitrubric--source-method', 'circuitrubric--evaluation']) {
  test(`descendant ${anchor} opens its owning Notes on direct load and reload`, async ({ page }) => {
    await open(page, `#${anchor}`);
    for (const reload of [false, true]) {
      if (reload) await page.reload();
      await expect(page.locator('#circuitrubric details')).toHaveAttribute('open', '');
      await expect(page.locator(`#${anchor}`)).toBeInViewport();
      expect(new URL(page.url()).hash).toBe(`#${anchor}`);
      await expect.poll(() => page.locator(`#${anchor}`).evaluate((el) => Math.abs(el.getBoundingClientRect().top - parseFloat(getComputedStyle(el).scrollMarginTop)))).toBeLessThan(3);
    }
  });
}

test('native hash navigation and back/forward reach the actual target without closing other Notes', async ({ page }) => {
  await open(page, '#circuitrubric--source-method');
  await page.locator('.landscape-table a[href$="#analoggym"]').click();
  await expect(page.locator('#analoggym details')).toHaveAttribute('open', '');
  await page.goBack();
  await expect(page.locator('#circuitrubric--source-method')).toBeInViewport();
  await expect(page.locator('#analoggym details')).toHaveAttribute('open', '');
  await page.goForward();
  await expect(page.locator('#analoggym h3')).toBeInViewport();
});

test('unknown or malformed descendants do not guess an owner or throw', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const hash of ['unknown-project', 'circuitrubric--missing', 'circuitrubric-extra--evaluation', '%E0%A4%A']) {
    await open(page, `#${hash}`);
    await expect(rows(page).locator('details[open]')).toHaveCount(0);
    await expect(rows(page)).toHaveCount(total);
    expect(new URL(page.url()).hash).toBe(`#${hash}`);
  }
  expect(errors).toEqual([]);
});

test('without JavaScript, all core information, primary links, and native Notes remain usable', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await open(page);
  await expect(rows(page)).toHaveCount(total);
  await expect(page.locator('.landscape-table tbody tr')).toHaveCount(total);
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
  await expect(rows(page).locator('.catalog-summary')).toHaveCount(total);
  await expect(rows(page).locator('.catalog-activity')).toHaveCount(total);
  await expect(page.locator('#circuitrubric .catalog-quicklinks')).toBeVisible();
  await page.locator('#circuitrubric summary').click();
  await expect(page.locator('#circuitrubric .catalog-detail')).toBeVisible();
  await expect(page.locator('#circuitrubric .catalog-sources')).toBeVisible();
  await page.locator('#analoggym summary').click();
  await expect(rows(page).locator('details[open]')).toHaveCount(2);
  await context.close();
});

test('keyboard navigation reaches the scroll region, matrix links, primary sources and Notes', async ({ page }) => {
  await open(page);
  const region = page.getByRole('region', { name: 'Landscape matrix; scroll horizontally for all scopes' });
  for (let i = 0; i < 30 && !await region.evaluate((el) => el === document.activeElement); i += 1) await page.keyboard.press('Tab');
  await expect(region).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('.landscape-table tbody a').first()).toBeFocused();
  await page.keyboard.press('Enter');
  const row = page.locator(`#${ordered[0].id}`);
  await expect(row.locator('details')).toHaveAttribute('open', '');
  await row.locator('.catalog-quicklinks a').first().focus();
  for (let i = 0; i < await row.locator('.catalog-quicklinks a').count(); i += 1) await page.keyboard.press('Tab');
  await expect(row.locator('summary')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(row.locator('details')).not.toHaveAttribute('open');
  await page.keyboard.press('Space');
  await expect(row.locator('details')).toHaveAttribute('open', '');
});

for (const width of [1440, 390, 320]) {
  test(`Landscape and first/middle/last entries fit ${width}px, including Notes and source reload`, async ({ page }, info) => {
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
    if (width === 1440) {
      const completeRows = await rows(page).evaluateAll((elements) => elements.filter((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length);
      expect(completeRows).toBeGreaterThanOrEqual(4);
      await page.screenshot({ path: info.outputPath('index-1440.png') });
    }
    for (const project of [ordered[0], ordered[Math.floor(total / 2)], ordered.at(-1)!]) {
      await page.locator(`#${project.id}`).evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
      await noOverflow(page);
      await page.screenshot({ path: info.outputPath(`project-${width}-${project.id}.png`) });
    }
    await page.locator('#atlas').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
    await page.screenshot({ path: info.outputPath(`paper-only-${width}.png`) });
    await open(page, '#circuitrubric');
    await page.screenshot({ path: info.outputPath(`notes-${width}.png`) });
    await open(page, '#circuitrubric--source-method');
    await page.reload();
    await expect(page.locator('#circuitrubric--source-method')).toBeInViewport();
    await noOverflow(page);
    await page.screenshot({ path: info.outputPath(`source-reload-${width}.png`) });
  });
}

test('catalog has no storage or runtime external requests and remains isolated from Timeline/Events state', async ({ page }) => {
  await page.goto('./events/?q=PLL&kind=organizational&companies=apple');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  const link = nav.getByRole('link', { name: 'Analog AI', exact: true });
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
