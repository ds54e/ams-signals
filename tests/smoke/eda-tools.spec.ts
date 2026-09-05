import { expect, test, type Page } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';

const directory = new URL('../../src/content/eda-tools/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => ({
  id: file.slice(0, -3), ...parseFrontmatter(await readFile(new URL(file, directory), 'utf8')).frontmatter,
})));
const activity = JSON.parse(await readFile(new URL('../../src/data/eda-tools-activity.json', import.meta.url), 'utf8'));
const date = (id: string) => activity.projects[id].lastCommitAt ?? activity.projects[id].lastPublicUpdateAt;
const key = (value: string) => value.normalize('NFKC').toLowerCase().trim();
const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
const ordered = [...projects].sort((a, b) => compare(date(b.id), date(a.id)) || compare(key(a.name), key(b.name)) || compare(a.id, b.id));
const areas = ['simulation', 'frontend-synthesis', 'formal-verification', 'debug-waveform', 'flow-physical'];
const roles = { agent: 'Agent', benchmark: 'Benchmark', 'eda-tool': 'EDA Tool', 'dataset-environment': 'Dataset & Environment' };
const sourceLabels = { official: 'Website', paper: 'Paper', code: 'Code', results: 'Results' };
const rows = (page: Page) => page.locator('[data-eda-project]');
const open = (page: Page, hash = '') => page.goto(`./eda-tools/${hash}`);
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


test('EDA navigation, sparse English presentation and authored project rows render without duplicate details', async ({ page }) => {
  const response = await open(page);
  expect(response!.ok()).toBe(true);
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await expect(nav.getByRole('link')).toHaveText(['Timeline', 'Events', 'Articles', 'Analog', 'Digital']);
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Digital');
  await expect(nav.getByRole('link', { name: 'Digital', exact: true })).toHaveAttribute('href', '/ams-signals/eda-tools/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveClass('visually-hidden');
  await expect(h1).toHaveText('Digital / RTL');
  await expect(page).toHaveTitle('Digital / RTL · AMS Signals');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RTL\/digital tools and agents/);
  expect((await h1.boundingBox())!.width).toBeLessThanOrEqual(1);
  expect(await page.locator('[data-eda-tools]').textContent()).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  await expect(page.locator('[data-eda-tools] input, [data-eda-tools] button, [data-eda-tools] select, [data-eda-tools] details, [data-eda-tools] summary, [data-eda-tools] form')).toHaveCount(0);
  expect(await page.locator('[data-eda-tools]').evaluate((el) => el.children[1].className)).toBe('eda-landscape');
  expect(await page.locator('[id="eda:index"]').evaluate((el) => el.firstElementChild?.className)).toBe('eda-columns');
  await expect(page.locator('.eda-columns span')).toHaveText(['Project', 'Keywords', 'Activity', 'Type / Links']);
  expect(await page.locator('[data-eda-tools] ol, [data-eda-tools] ul').evaluateAll((lists) => lists.every((el) => getComputedStyle(el).listStyleType === 'none'))).toBe(true);
  for (const forbidden of ['Traditional', 'AI-enabled', 'Design Agent', 'Reviewed ', 'Recent additions', 'Methodology', 'freshness cutoff', 'AI-assisted', 'AI-native', 'What it does', 'Primary sources', 'A–Z']) {
    expect(await page.locator('[data-eda-tools]').textContent()).not.toContain(forbidden);
  }
  const rendered = await rows(page).evaluateAll((nodes) => nodes.map((el) => ({
    id: el.id,
    name: el.querySelector('h2')!.textContent,
    description: el.querySelector('.eda-description')!.textContent,
    descriptions: el.querySelectorAll('.eda-description').length,
    keywords: [...el.querySelectorAll('.eda-keywords li')].map((x) => x.textContent),
    type: el.querySelector('.eda-type')!.textContent,
    links: [...el.querySelectorAll<HTMLAnchorElement>('.eda-quicklinks a')].map((x) => ({ label: x.textContent, href: x.getAttribute('href') })),
    linkCount: el.querySelectorAll('a').length,
  })));
  expect(rendered).toEqual(ordered.map((p) => {
    const links = p.sources.filter((s: any) => s.purpose).sort((a: any, b: any) => Object.keys(sourceLabels).indexOf(a.purpose) - Object.keys(sourceLabels).indexOf(b.purpose))
      .map((s: any) => ({ label: sourceLabels[s.purpose as keyof typeof sourceLabels], href: s.url }));
    return { id: p.id, name: `${p.name} #`, description: p.description, descriptions: 1, keywords: p.keywords,
      type: p.roles.map((role: keyof typeof roles) => roles[role]).join(' + ') + (p.ai === 'ai-built' ? ' · AI-built' : ''),
      links, linkCount: 1 + links.length + (activity.projects[p.id].kind === 'github' ? 1 : 0) };
  }));
  await nav.getByRole('link', { name: 'Analog', exact: true }).click();
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Analog');
  await expect(page.locator('[data-analog-ai]')).toBeVisible();
  await expect(page.locator('[data-eda-tools]')).toHaveCount(0);
});

test('five-axis matrix has the exact authored scopes, matches list order and immediately precedes its legend', async ({ page }) => {
  await open(page);
  const table = page.getByRole('table', { name: 'EDA scope by project' });
  await expect(table.locator('thead th')).toHaveText(['Project', 'Simulation', 'Frontend / Synth', 'Formal / Verify', 'Debug / Wave', 'Flow / Physical']);
  const rendered = await table.locator('tbody tr').evaluateAll((nodes) => nodes.map((el) => ({
    id: el.getAttribute('data-eda-landscape-project'),
    name: el.querySelector('th')!.textContent,
    scope: el.querySelector('th')!.getAttribute('scope'),
    cells: [...el.querySelectorAll('td')].map((cell) => ({ area: cell.getAttribute('data-area'), state: cell.getAttribute('data-scope'), mark: cell.querySelector('[aria-hidden]')!.textContent, meaning: cell.querySelector('.visually-hidden')!.textContent })),
  })));
  expect(rendered).toEqual(ordered.map((p) => ({ id: p.id, name: p.name, scope: 'row', cells: areas.map((area) => ({
    area, state: p.areas[area] ?? '', mark: p.areas[area] === 'core' ? '●' : p.areas[area] === 'supporting' ? '◐' : '',
    meaning: p.areas[area] === 'core' ? 'Core scope' : p.areas[area] === 'supporting' ? 'Supporting scope' : 'No primary reviewed scope identified',
  })) })));
  expect(await rows(page).evaluateAll((nodes) => nodes.map((el) => el.id))).toEqual(rendered.map((p) => p.id));
  await expect(page.locator('[id="eda:legend"] span')).toHaveText(['● core', '◐ supporting']);
  expect(await page.locator('.eda-landscape-scroll').evaluate((el) => el.nextElementSibling?.id)).toBe('eda:legend');
  const audit = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
    const anchors = [...document.querySelectorAll<HTMLAnchorElement>('[data-eda-tools] a')].filter((a) => a.origin === location.origin && a.hash);
    return { duplicates: ids.filter((id, i) => ids.indexOf(id) !== i), missing: anchors.filter((a) => !document.getElementById(a.hash.slice(1))).map((a) => a.hash) };
  });
  expect(audit).toEqual({ duplicates: [], missing: [] });
});

test('GitHub strips show twelve correct binary months, dates and repositories; non-GitHub updates remain neutral', async ({ page }) => {
  await open(page);
  const rendered = await rows(page).evaluateAll((nodes) => nodes.map((el) => ({
    id: el.id, kind: el.querySelector('.eda-activity')!.getAttribute('data-activity-kind'),
    date: el.querySelector('time')!.getAttribute('datetime'),
    repository: el.querySelector('.eda-activity-repository')?.textContent ?? null,
    repositoryHref: el.querySelector('.eda-activity-repository')?.getAttribute('href') ?? null,
    summary: el.querySelector('.eda-activity-summary')?.textContent ?? null,
    months: [...el.querySelectorAll('.eda-activity-strip li')].map((li) => ({ mark: li.querySelector('[aria-hidden]')!.textContent, title: li.getAttribute('title'), accessible: li.querySelector('.visually-hidden')!.textContent })),
    weight: Number(getComputedStyle(el.querySelector('time')!).fontWeight),
  })));
  for (const item of rendered) {
    const record = activity.projects[item.id];
    expect(item.kind).toBe(record.kind);
    expect(item.date).toBe(date(item.id));
    expect(item.weight).toBeGreaterThanOrEqual(600);
    if (record.kind === 'public-update') {
      expect(item.months).toEqual([]); expect(item.repository).toBeNull(); expect(item.summary).toBeNull();
    } else {
      expect(item.repository).toBe(record.repository);
      expect(item.repositoryHref).toBe(`https://github.com/${record.repository}/commits/${encodeURIComponent(record.defaultBranch)}/`);
      expect(item.summary).toBe(`${record.commits.filter((n: number) => n > 0).length}/12 active months`);
      expect(item.months).toEqual(activity.months.map((month: string, index: number) => {
        const label = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${month}-01T00:00:00Z`));
        const title = `${label} · ${record.commits[index]} default-branch commits`;
        return { mark: record.commits[index] > 0 ? '●' : '·', title, accessible: title };
      }));
    }
  }
  expect(rendered.some((item) => item.kind === 'public-update')).toBe(true);
});

test('native project hashes survive direct load, reload and browser back/forward', async ({ page }) => {
  const middle = ordered[Math.floor(ordered.length / 2)]; const last = ordered.at(-1)!;
  await open(page, `#${middle.id}`);
  await expect(page.locator(`#${middle.id} h2`)).toBeInViewport();
  await settleScroll(page);
  await page.reload();
  await expect(page.locator(`#${middle.id} .eda-description`)).toBeInViewport();
  await settleScroll(page);
  const next = page.locator('.eda-landscape-table').getByRole('link', { name: last.name, exact: true });
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
  const region = page.getByRole('region', { name: 'EDA matrix; scroll horizontally for all scopes' });
  for (let i = 0; i < 20 && !await region.evaluate((el) => el === document.activeElement); i++) await page.keyboard.press('Tab');
  await expect(region).toBeFocused();
  await page.keyboard.press('Tab'); await expect(page.locator('.eda-landscape-table tbody a').first()).toBeFocused();
  await page.keyboard.press('Enter');
  const row = page.locator(`#${ordered[0].id}`);
  await expect(row).toBeFocused();
  await expect(row.locator('h2')).toBeInViewport({ ratio: 1 });
  await expect(row.locator('.eda-description')).toBeInViewport({ ratio: 1 });
  await page.keyboard.press('Tab'); await expect(row.locator('.eda-permalink')).toBeFocused();
  if (activity.projects[ordered[0].id].kind === 'github') {
    await page.keyboard.press('Tab'); await expect(row.locator('.eda-activity-repository')).toBeFocused();
  }
  await page.keyboard.press('Tab'); await expect(row.locator('.eda-quicklinks a').first()).toBeFocused();
});

test('all EDA content and native hashes work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await open(page);
  await expect(rows(page)).toHaveCount(projects.length);
  await expect(page.locator('.eda-landscape-table tbody tr')).toHaveCount(projects.length);
  await expect(rows(page).locator('.eda-description')).toHaveText(ordered.map((p) => p.description));
  await expect(rows(page).locator('.eda-activity')).toHaveCount(projects.length);
  await page.locator('.eda-landscape-table tbody a').last().click();
  await expect(page.locator(`#${ordered.at(-1)!.id} h2`)).toBeInViewport();
  await page.reload(); await expect(page.locator(`#${ordered.at(-1)!.id} h2`)).toBeInViewport();
  await expect(page.locator(`#${ordered.at(-1)!.id} .eda-quicklinks a`).first()).toBeVisible();
  await context.close();
});

for (const width of [1440, 390, 320]) {
  test(`EDA matrix and compact index fit ${width}px with sticky names and no page overflow`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 }); await open(page); await noOverflow(page);
    await page.screenshot({ path: info.outputPath(`eda-matrix-${width}.png`) });
    if (width < 760) {
      const scroll = page.locator('.eda-landscape-scroll');
      expect(await scroll.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
      await scroll.evaluate((el) => { el.scrollLeft = el.scrollWidth; });
      const left = await scroll.evaluate((el) => ({ container: el.getBoundingClientRect().left, name: el.querySelector('tbody th')!.getBoundingClientRect().left, scrolled: el.scrollLeft }));
      expect(left.scrolled).toBeGreaterThan(0); expect(Math.abs(left.name - left.container)).toBeLessThan(2);
      await page.screenshot({ path: info.outputPath(`eda-matrix-${width}-scrolled.png`) });
    }
    await page.locator('[id="eda:index"]').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
    const boxes = await rows(page).first().locator('article').evaluate((el) => [...el.children].map((child) => { const r = child.getBoundingClientRect(); return { width: r.width, left: r.left, top: r.top }; }));
    expect(boxes).toHaveLength(4);
    if (width === 1440) {
      expect(boxes[0].width).toBeGreaterThan(boxes[3].width * 3);
      expect(boxes[3].width).toBeLessThan(boxes[1].width);
      expect(await rows(page).evaluateAll((nodes) => nodes.filter((el) => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }).length)).toBeGreaterThanOrEqual(4);
    } else {
      expect(new Set(boxes.map((r) => r.left)).size).toBe(1);
      expect(boxes.map((r) => r.top)).toEqual(boxes.map((r) => r.top).sort((a, b) => a - b));
    }
    await page.screenshot({ path: info.outputPath(`eda-index-${width}.png`) });
    const manual = projects.find((p) => activity.projects[p.id].kind === 'public-update')!;
    for (const p of [ordered[0], ordered[Math.floor(projects.length / 2)], ordered.at(-1)!, manual]) {
      await page.locator(`#${p.id}`).evaluate((el) => el.scrollIntoView({ behavior: 'instant' }));
      await noOverflow(page);
      await page.screenshot({ path: info.outputPath(`eda-row-${width}-${p.id}.png`) });
    }
  });
}

test('EDA has no runtime requests or viewer state and navigation preserves Timeline/Events isolation', async ({ page }) => {
  await page.goto('./events/?q=PLL&kind=organizational&companies=apple');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  const link = nav.getByRole('link', { name: 'Digital', exact: true });
  await expect(link).not.toHaveAttribute('data-filter-view-link');
  await expect(link).not.toHaveAttribute('data-filter-surface');
  const before = await page.evaluate(() => Object.entries(localStorage));
  const requests: string[] = [];
  page.on('request', (request) => { if (new URL(request.url()).origin !== new URL(page.url()).origin) requests.push(request.url()); });
  await link.click(); await expect(rows(page)).toHaveCount(projects.length);
  await page.locator('.eda-permalink').first().click();
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
