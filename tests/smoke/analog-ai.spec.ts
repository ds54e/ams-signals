import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';

// Authored inventory and snapshot are independent expectations, not a fixed initial-project list.
const directory = new URL('../../src/content/analog-ai/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return {
    id: file.slice(0, -3), ...frontmatter,
    // Existing authored headings are plain English; retain their published Markdown slugs.
    detailIds: [...content.matchAll(/^### (.+)$/gm)].map(([, title]) => title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-')),
  };
}));
const total = projects.length;
const activity = JSON.parse(await readFile(new URL('../../src/data/analog-ai-activity.json', import.meta.url), 'utf8'));
const roles = { benchmark: 'Benchmark', agent: 'Design Agent', 'eda-tool': 'EDA Tool', 'dataset-environment': 'Dataset & Environment' };
const stages = ['reasoning', 'generate-edit', 'simulate-measure', 'optimize', 'eda-integration', 'physical'];
const sourceLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };
const rows = (page: Page) => page.locator('[data-catalog-project]');
const ordered = [...projects].sort((a, b) => {
  const date = (p: typeof a) => {
    const record = activity.projects[p.id];
    return record.kind === 'github' ? record.lastCommitAt : record.lastPublicUpdateAt ?? '';
  };
  if (date(a) !== date(b)) return date(a) > date(b) ? -1 : 1;
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
  const response = await page.request.get('./analog-ai/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  for (const { id } of projects) expect(html.split(`id="${id}"`).length - 1).toBe(1);
  await open(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(await page.locator('[data-analog-ai]').textContent()).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  expect(await rows(page).evaluateAll((elements) => elements.map((el) => el.id))).toEqual(ordered.map((p) => p.id));
  await expect(page.locator('[data-analog-ai] details, [data-analog-ai] summary')).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 1 })).toHaveClass('visually-hidden');
  await expect(page.getByRole('heading', { level: 2 })).toHaveText(ordered.map((p) => `${p.name} #`));
  await expect(page.locator('.catalog-columns span')).toHaveText(['Project', 'Keywords', 'Activity', 'Links']);
  await expect(page.locator('.catalog-header, .catalog-updates, .catalog-reviewed, .catalog-publication-note, .catalog-section-heading, .catalog-sources, .catalog-detail, .catalog-summary')).toHaveCount(0);
  const text = await page.locator('[data-analog-ai]').textContent();
  for (const removed of ['Benchmarks, agents, and tools for analog/RF/AMS design.', 'Reviewed from primary public sources', 'Recent additions', 'Public repository activity snapshot:', 'A–Z', 'Public repository activity is a visibility signal', 'Current month is partial', 'Activity method.', 'no independent reproduction', 'Landscape', 'Projects ↓', 'What it does', 'Primary sources', 'Scroll horizontally to see all scopes.']) {
    expect(text).not.toContain(removed);
  }
  await expect(page.locator('[data-analog-ai] input, [data-analog-ai] select, [data-analog-ai] button, [data-analog-ai] form')).toHaveCount(0);
  for (const project of projects) {
    const row = page.locator(`#${project.id}`);
    await expect(row.locator('h2')).toHaveText(`${project.name} #`);
    await expect(row.locator('.catalog-description')).toHaveText(project.description);
    await expect(row.locator('.catalog-description')).toBeVisible();
    expect((await row.textContent())!.split(project.description).length - 1).toBe(1);
    expect(await row.textContent()).not.toContain(project.summary);
    await expect(row.locator('.catalog-overview .catalog-roles')).toHaveCount(0);
    await expect(row.locator('.catalog-links .catalog-roles li')).toHaveText(project.roles.map((role: keyof typeof roles) => roles[role]));
    await expect(row.locator('.catalog-keywords li')).toHaveText(project.keywords);
    const primarySources = project.sources.filter((s: { purpose?: string }) => s.purpose);
    await expect(row.locator('.catalog-links a')).toHaveCount(primarySources.length);
    for (const source of primarySources) {
      const link = row.locator('.catalog-links .catalog-quicklinks').getByRole('link', { name: sourceLabels[source.purpose as keyof typeof sourceLabels], exact: true });
      await expect(link).toHaveAttribute('href', source.url);
      await expect(link).toBeVisible();
      await expect(row.locator(`[id="${project.id}--source-${source.id}"] a`)).toHaveAttribute('href', source.url);
    }
    // Only primary-purpose links and the commit-history link are exposed, with no bibliography.
    await expect(row.locator('a')).toHaveCount(1 + primarySources.length + (activity.projects[project.id].kind === 'github' ? 1 : 0));
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
      await expect(cell.locator('.scope-mark')).toHaveText(scope === 'core' ? '●' : scope === 'supporting' ? '◐' : '');
      await expect(cell.locator('.visually-hidden')).toHaveText(scope === 'core' ? 'Core scope' : scope === 'supporting' ? 'Supporting scope' : 'Not specified');
    }
  }
  await expect(page.locator('[id="catalog:legend"] span')).toHaveText(['● core', '◐ supporting']);
  expect(await page.locator('.landscape-scroll').evaluate((el) => el.nextElementSibling?.id)).toBe('catalog:legend');
  expect(await page.locator('[id="catalog:landscape"]').evaluate((el) => el.firstElementChild?.className)).toBe('landscape-scroll');
  expect(await page.locator('[id="catalog:index"]').evaluate((el) => el.firstElementChild?.className)).toBe('catalog-columns');
  await table.getByRole('link', { name: ordered.at(-1)!.name, exact: true }).click();
  await expect(page.locator(`#${ordered.at(-1)!.id} h2`)).toBeInViewport();
  expect(new URL(page.url()).hash).toBe(`#${ordered.at(-1)!.id}`);
});

test('public repository activity renders exactly twelve binary months, explicit repositories and latest dates', async ({ page }) => {
  await open(page);
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
    await expect(row.locator('.activity-latest')).toContainText('Latest');
    expect(await row.locator('time').evaluate((el) => Number(getComputedStyle(el).fontWeight))).toBeGreaterThanOrEqual(600);
    const positions = await row.evaluate((el) => ({ date: el.querySelector('time')!.getBoundingClientRect().top, strip: el.querySelector('.activity-strip')!.getBoundingClientRect().top }));
    expect(positions.date).toBeLessThan(positions.strip);
  }
});

test('projects without a verified repository show a neutral sourced date, with no invented activity strip', async ({ page }) => {
  await open(page);
  const paperProjects = projects.filter((p) => activity.projects[p.id].kind === 'no-public-repo');
  expect(paperProjects.length).toBeGreaterThan(0);
  for (const p of paperProjects) {
    const row = page.locator(`#${p.id}`);
    await expect(row.locator('.activity-strip')).toHaveCount(0);
    await expect(row.locator('.catalog-activity time')).toHaveAttribute('datetime', activity.projects[p.id].lastPublicUpdateAt);
    await expect(row.locator('.activity-latest a')).toHaveCount(0);
    const source = p.sources.find((s: { id: string }) => s.id === activity.projects[p.id].lastPublicUpdateSource);
    await expect(row.locator('.activity-latest')).toContainText(source.purpose === 'paper' ? 'Paper' : 'Update');
    await expect(row.locator('.catalog-quicklinks').getByRole('link', { name: sourceLabels[source.purpose as keyof typeof sourceLabels], exact: true })).toHaveAttribute('href', source.url);
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
    const targets = [...document.querySelectorAll<HTMLAnchorElement>('[data-analog-ai] a[href]')]
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
  expect(url.pathname).toMatch(/\/ams-signals\/analog-ai\/$/);
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
  await expect(page.locator('.landscape-table tbody a').first()).toBeFocused();
  await page.keyboard.press('Enter');
  const row = page.locator(`#${ordered[0].id}`);
  await expect(row.locator('h2')).toBeInViewport();
  await row.locator('.catalog-permalink').focus();
  if (activity.projects[ordered[0].id].kind === 'github') {
    await page.keyboard.press('Tab');
    await expect(row.locator('.activity-repository')).toBeFocused();
  }
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
    if (width === 1440) {
      const columns = await rows(page).first().locator('article').evaluate((el) => [...el.children].map((column) => column.getBoundingClientRect().width));
      expect(columns).toHaveLength(4);
      expect(columns[0]).toBeGreaterThan(columns[3] * 3);
      expect(columns[0]).toBeGreaterThan(columns[1] * 1.5);
      expect(columns[3]).toBeLessThan(columns[1]);
      const completeRows = await rows(page).evaluateAll((elements) => elements.filter((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length);
      expect(completeRows).toBeGreaterThanOrEqual(4);
      await page.screenshot({ path: info.outputPath('index-1440.png') });
    } else {
      const areas = await rows(page).first().locator('article').evaluate((el) => [...el.children].map((column) => { const r = column.getBoundingClientRect(); return { top: r.top, left: r.left }; }));
      expect(areas.map((a) => a.top)).toEqual(areas.map((a) => a.top).sort((a, b) => a - b));
      expect(new Set(areas.map((a) => a.left)).size).toBe(1);
    }
    for (const project of [ordered[0], ordered[Math.floor(total / 2)], ordered.at(-1)!]) {
      await page.locator(`#${project.id}`).evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
      await noOverflow(page);
      await page.screenshot({ path: info.outputPath(`project-${width}-${project.id}.png`) });
    }
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
