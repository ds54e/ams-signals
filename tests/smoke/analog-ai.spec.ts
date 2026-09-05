import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';

// Derive the catalog inventory from authored data, independently of the page and its helpers.
const directory = new URL('../../src/content/analog-ai/', import.meta.url);
const files = (await readdir(directory)).filter((file) => file.endsWith('.md'));
const projects = await Promise.all(files.map(async (file) => {
  const { frontmatter } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return { id: file.slice(0, -3), name: frontmatter.name as string, roles: frontmatter.roles as string[], reviewedAt: frontmatter.reviewedAt as string };
}));
const total = projects.length;
const updates = JSON.parse(await readFile(new URL('../../src/data/analog-ai-updates.json', import.meta.url), 'utf8'));
const roleIds = ['benchmark', 'agent', 'eda-tool', 'dataset-environment'];
const idsForRole = (role: string) => projects.filter((project) => project.roles.includes(role)).map((project) => project.id).sort();
const rows = (page: Page) => page.locator('[data-catalog-project]');
const visible = (page: Page) => page.locator('[data-catalog-project]:visible');
const visibleIds = (page: Page) => visible(page).evaluateAll((elements) => elements.map((element) => element.id));
const search = (page: Page) => page.getByRole('searchbox', { name: 'Search', exact: true });
const category = (page: Page) => page.getByRole('combobox', { name: 'Category', exact: true });
const count = (page: Page) => page.locator('[data-catalog-count]');
async function expectCount(page: Page, expected?: number) {
  if (expected !== undefined) await expect(visible(page)).toHaveCount(expected);
  await expect(count(page)).toHaveText(`Showing ${expected ?? await visible(page).count()} of ${total} projects`);
}
async function open(page: Page, suffix = '') {
  await page.goto(`./analog-ai/${suffix}`);
  await expect(search(page)).toBeVisible();
}

test('every authored project appears once in deterministic name order with summaries, review dates and links', async ({ page }) => {
  const response = await page.request.get('./analog-ai/');
  const html = await response.text();
  for (const { id } of projects) expect(html).toContain(`id="${id}"`);
  expect(html).toContain('PVT');
  expect(html).toContain('https://github.com/levantlabs/circuitrubric-bench');
  await open(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Analog AI benchmarks and tools');
  expect(await page.locator('[data-analog-ai]').textContent()).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  const ids = await visibleIds(page);
  expect([...ids].sort()).toEqual(projects.map((project) => project.id).sort());
  const ordered = ids.map((id) => projects.find((project) => project.id === id)!);
  await expect(rows(page).locator('h2')).toHaveText(ordered.map((project) => project.name));
  const keys = ordered.map((project) => `${project.name.normalize('NFKC').toLowerCase().trim()}\0${project.id}`);
  expect(keys).toEqual([...keys].sort());
  await expectCount(page, total);
  await expect(page.locator('.catalog-updates')).toHaveCount(updates.length ? 1 : 0);
  await expect(page.locator('.catalog-updates li')).toHaveCount(updates.length);
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
  for (const row of await rows(page).all()) {
    const id = await row.getAttribute('id');
    const project = projects.find((project) => project.id === id)!;
    await expect(row.locator('.catalog-reviewed')).toHaveText(`Reviewed ${project.reviewedAt}`);
    await expect(row.locator('.catalog-reviewed time')).toBeVisible();
    await expect(row.locator('.catalog-reviewed time')).toHaveAttribute('datetime', project.reviewedAt);
    await expect(row.locator('.catalog-summary')).toBeVisible();
    await expect(row.locator('.catalog-meta').last()).toContainText('Access & environment');
    expect(await row.locator('.catalog-links a').count()).toBeGreaterThanOrEqual(2);
  }
});

test('multi-role projects appear in either category and filtering preserves order', async ({ page }) => {
  await open(page);
  const originalOrder = await visibleIds(page);
  for (const type of roleIds) {
    await category(page).selectOption(type);
    const expected = idsForRole(type);
    expect(await visibleIds(page)).toEqual(originalOrder.filter((id) => expected.includes(id)));
    await expectCount(page, expected.length);
    if (['benchmark', 'agent'].includes(type)) await expect(page.locator('#analogcoder-pro')).toBeVisible();
  }
  await category(page).selectOption('');
  await expectCount(page, total);
  await expect(page.locator('#analogcoder-pro')).toHaveCount(1);
});

test('LDO ngspice uses AND and combines with the category using AND', async ({ page }) => {
  await open(page);
  await search(page).fill('LDO');
  const ldo = await visibleIds(page);
  await search(page).fill('ngspice');
  const ngspice = await visibleIds(page);
  await search(page).fill('LDO ngspice');
  const intersection = ldo.filter((id) => ngspice.includes(id));
  expect(await visibleIds(page)).toEqual(intersection);
  await expect(page.locator('#analog-design-bench')).toBeVisible();
  await expect(page.locator('#evo-ldo-bench')).toBeVisible();
  await expect(page.locator('#circuitrubric')).toBeHidden();
  for (const role of roleIds) {
    await category(page).selectOption(role);
    const expected = intersection.filter((id) => idsForRole(role).includes(id));
    expect(await visibleIds(page)).toEqual(expected);
    await expectCount(page, expected.length);
  }
});

test('aliases, NFKC, case and rendered detail prose are searchable; metadata and URLs are not', async ({ page }) => {
  await open(page);
  let aliasMatches: string[] | undefined;
  for (const q of ['VirtuosoBridgeLite', 'virtuosobridgelite', 'ＶｉｒｔｕｏｓｏＢｒｉｄｇｅＬｉｔｅ']) {
    await search(page).fill(q);
    await expect(page.locator('#virtuoso-bridge-lite')).toBeVisible();
    await expect(page.locator('#circuitrubric')).toBeHidden();
    aliasMatches ??= await visibleIds(page);
    expect(await visibleIds(page)).toEqual(aliasMatches);
  }
  await search(page).fill('ＢＥＮＣＨＭＡＲＫ');
  for (const id of idsForRole('benchmark')) await expect(page.locator(`#${id}`)).toBeVisible();
  await search(page).fill('drain');
  await expect(page.locator('#circuitrubric')).toBeVisible();
  for (const q of ['reviewedAt', 'dataset-environment', 'raw.githubusercontent.com', 'github.com', '<h3']) {
    await search(page).fill(q);
    await expect(visible(page)).toHaveCount(0);
  }
});

test('Japanese IME composition does not filter intermediate text or change URL and focus', async ({ page }) => {
  await open(page);
  await search(page).focus();
  const originalUrl = page.url();
  await search(page).evaluate((input: HTMLInputElement) => {
    input.dispatchEvent(new CompositionEvent('compositionstart', { bubbles: true }));
    input.value = '変換途中';
    input.dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }));
  });
  await expectCount(page, total);
  expect(page.url()).toBe(originalUrl);
  await expect(search(page)).toBeFocused();
  await search(page).evaluate((input: HTMLInputElement) => {
    input.value = 'ＣＩＲＣＵＩＴＲＵＢＲＩＣ';
    input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: 'ＣＩＲＣＵＩＴＲＵＢＲＩＣ' }));
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
  });
  await expect(page.locator('#circuitrubric')).toBeVisible();
  await expect(page.locator('#evo-ldo-bench')).toBeHidden();
  await expect(search(page)).toBeFocused();
});

test('zero results preserve controls, focus and the query, with one reset action', async ({ page }) => {
  await open(page);
  await category(page).selectOption('eda-tool');
  await search(page).fill('catalog-no-such-project-9b43');
  await expectCount(page, 0);
  await expect(page.locator('[data-catalog-empty]')).toBeVisible();
  await expect(search(page)).toHaveValue('catalog-no-such-project-9b43');
  await expect(search(page)).toBeFocused();
  await expect(category(page)).toHaveValue('eda-tool');
  await expect(page.getByRole('button', { name: 'Reset filters' })).toHaveCount(1);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expectCount(page, total);
  await expect(search(page)).toHaveValue('');
  await expect(category(page)).toHaveValue('');
  expect(new URL(page.url()).search).toBe('');
});

test('q/type survive reload and browser back/forward; no catalog storage is written', async ({ page }) => {
  await open(page, '?q=LDO');
  await page.evaluate(() => localStorage.setItem('unrelated', 'keep'));
  await category(page).selectOption('benchmark');
  const benchmarkMatches = await visibleIds(page);
  await category(page).selectOption('agent');
  const agentMatches = await visibleIds(page);
  await expect(page.locator('#analogforge-agent')).toBeVisible();
  await page.reload();
  await expect(search(page)).toHaveValue('LDO');
  await expect(category(page)).toHaveValue('agent');
  expect(await visibleIds(page)).toEqual(agentMatches);
  await page.goBack();
  await expect(category(page)).toHaveValue('benchmark');
  expect(await visibleIds(page)).toEqual(benchmarkMatches);
  await page.goForward();
  await expect(category(page)).toHaveValue('agent');
  expect(await visibleIds(page)).toEqual(agentMatches);
  expect(await page.evaluate(() => Object.entries(localStorage))).toEqual([['unrelated', 'keep']]);
});

test('typing creates one history entry per edit session, not one per keystroke', async ({ page }) => {
  await open(page);
  const before = await page.evaluate(() => history.length);
  await search(page).pressSequentially('ngspice');
  expect(await page.evaluate(() => history.length)).toBe(before + 1);
  await page.goBack();
  await expect(search(page)).toHaveValue('');
  await expectCount(page, total);
  await page.goForward();
  await expect(search(page)).toHaveValue('ngspice');
});

test('a compatible hash opens its project and keeps filters through history navigation', async ({ page }) => {
  await open(page, '?q=ldo&type=benchmark#evo-ldo-bench');
  await expect(search(page)).toHaveValue('ldo');
  await expect(category(page)).toHaveValue('benchmark');
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
  await expectCount(page);
  const linkedMatches = await visibleIds(page);
  await search(page).fill('CircuitRubric');
  expect(new URL(page.url()).hash).toBe('');
  await page.goBack();
  await expect(search(page)).toHaveValue('ldo');
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
  expect(await visibleIds(page)).toEqual(linkedMatches);
  await page.goForward();
  await expect(search(page)).toHaveValue('CircuitRubric');
  await expect(page.locator('#circuitrubric')).toBeVisible();
  await expect(page.locator('#evo-ldo-bench')).toBeHidden();
});

test('a conflicting hash clears filters and keeps consistent counts and URL', async ({ page }) => {
  await open(page, '?q=CircuitRubric&type=eda-tool#evo-ldo-bench');
  await expect(search(page)).toHaveValue('');
  await expect(category(page)).toHaveValue('');
  await expectCount(page, total);
  await expect(page.locator('[data-catalog-notice]')).toBeVisible();
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
  expect(new URL(page.url()).search).toBe('');
  expect(new URL(page.url()).hash).toBe('#evo-ldo-bench');
  await expect.poll(() => page.locator('#evo-ldo-bench').evaluate((element) => Math.abs(element.getBoundingClientRect().top - 24))).toBeLessThan(3);
  await category(page).selectOption('eda-tool');
  expect(new URL(page.url()).hash).toBe('');
  expect((await visibleIds(page)).sort()).toEqual(idsForRole('eda-tool'));
});

test('hashchange opens a linked project without reloading and share links omit q/type', async ({ page }) => {
  await open(page, '?q=LDO&type=benchmark');
  await page.evaluate(() => { location.hash = 'evo-ldo-bench'; });
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
  const share = page.locator('#evo-ldo-bench .catalog-permalink');
  const url = new URL((await share.getAttribute('href'))!, page.url());
  expect(url.search).toBe('');
  expect(url.pathname).toMatch(/\/ams-signals\/analog-ai\/$/);
  expect(url.hash).toBe('#evo-ldo-bench');
  await share.click();
  await expectCount(page, total);
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
});

test('unknown types/hashes and special query strings are handled as text', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await open(page, '?type=__proto__#unknown-project');
  await expect(category(page)).toHaveValue('');
  await expectCount(page, total);
  expect(new URL(page.url()).hash).toBe('#unknown-project');
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
  const q = '<img src=x onerror=alert(1)> & "日本語"';
  await open(page, `?q=${encodeURIComponent(q)}&type=nonsense#%E0%A4%A`);
  await expect(search(page)).toHaveValue(q);
  await expectCount(page, 0);
  await expect(page.locator('[data-analog-ai] img')).toHaveCount(0);
  expect(new URL(page.url()).hash).toBe('#%E0%A4%A');
  expect(errors).toEqual([]);
});

test('details expand independently; heading IDs and local source links are unique and valid', async ({ page }) => {
  await open(page);
  await page.locator('#circuitrubric summary').click();
  await page.locator('#analoggym summary').click();
  await expect(rows(page).locator('details[open]')).toHaveCount(2);
  const audit = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
    const targets = [...document.querySelectorAll<HTMLAnchorElement>('.catalog-detail a[href^="#"]')]
      .map((link) => decodeURIComponent(link.hash.slice(1)));
    return { duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index), missing: targets.filter((id) => !document.getElementById(id)) };
  });
  expect(audit).toEqual({ duplicateIds: [], missing: [] });
  await page.reload();
  await expect(search(page)).toBeVisible();
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
});

for (const anchor of ['circuitrubric--source-method', 'circuitrubric--evaluation']) {
  test(`descendant anchor ${anchor} opens on direct load and reload`, async ({ page }) => {
    await open(page, `#${anchor}`);
    for (const reload of [false, true]) {
      if (reload) await page.reload();
      await expect(page.locator('#circuitrubric details')).toHaveAttribute('open', '');
      await expect(page.locator(`#${anchor}`)).toBeInViewport();
      expect(new URL(page.url()).hash).toBe(`#${anchor}`);
      await expect.poll(() => page.locator(`#${anchor}`).evaluate((element) =>
        Math.abs(element.getBoundingClientRect().top - (parseFloat(getComputedStyle(element).scrollMarginTop) || 0)),
      )).toBeLessThan(3);
    }
  });
}

test('descendant anchors preserve compatible filters and their complete target through history', async ({ page }) => {
  const hash = '#circuitrubric--source-method';
  await open(page, `?q=CircuitRubric&type=benchmark${hash}`);
  await expect(search(page)).toHaveValue('CircuitRubric');
  await expect(category(page)).toHaveValue('benchmark');
  await expect(page.locator(hash)).toBeInViewport();
  await expect(page.locator('[data-catalog-notice]')).toBeHidden();
  await expectCount(page);
  const linkedMatches = await visibleIds(page);
  await search(page).fill('LDO');
  expect(new URL(page.url()).hash).toBe('');
  await page.goBack();
  await expect(search(page)).toHaveValue('CircuitRubric');
  expect(await visibleIds(page)).toEqual(linkedMatches);
  expect(new URL(page.url()).hash).toBe(hash);
  await expect(page.locator(hash)).toBeInViewport();
  await page.goForward();
  await expect(search(page)).toHaveValue('LDO');
  expect(new URL(page.url()).hash).toBe('');
  await expect(page.locator('#circuitrubric')).toBeHidden();
});

test('descendant anchors clear conflicting filters on arrival and hashchange; unknown descendants do not guess an owner', async ({ page }) => {
  const hash = '#circuitrubric--source-method';
  await open(page, `?q=LDO&type=eda-tool${hash}`);
  await expectCount(page, total);
  await expect(search(page)).toHaveValue('');
  await expect(category(page)).toHaveValue('');
  await expect(page.locator('[data-catalog-notice]')).toBeVisible();
  await expect(page.locator(hash)).toBeInViewport();
  expect(new URL(page.url()).search).toBe('');
  expect(new URL(page.url()).hash).toBe(hash);
  await open(page, '?q=LDO&type=agent#circuitrubric--missing');
  await expect(search(page)).toHaveValue('LDO');
  await expect(category(page)).toHaveValue('agent');
  await expect(page.locator('#circuitrubric details')).not.toHaveAttribute('open');
  await expect(page.locator('[data-catalog-notice]')).toBeHidden();
  await expectCount(page);
  await page.evaluate((value) => { location.hash = value; }, hash);
  await expectCount(page, total);
  await expect(search(page)).toHaveValue('');
  await expect(category(page)).toHaveValue('');
  await expect(page.locator('#circuitrubric details')).toHaveAttribute('open', '');
  await expect(page.locator(hash)).toBeInViewport();
});

test('no-JavaScript HTML exposes all text, native details and source links with filters hidden', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('./analog-ai/?q=unknown&type=agent#evo-ldo-bench');
  await expect(visible(page)).toHaveCount(total);
  await expect(rows(page).locator('details[open]')).toHaveCount(total);
  await expect(page.locator('[data-catalog-controls]')).toBeHidden();
  await expect(page.locator('.catalog-sources')).toHaveCount(total);
  await expect(page.locator('#circuitrubric .catalog-detail')).toBeVisible();
  await expect(page.locator('#circuitrubric .catalog-sources a').first()).toBeVisible();
  // Let the browser finish the native smooth-scroll arrival before clicking.
  await expect.poll(async () => Math.abs((await page.locator('#evo-ldo-bench').boundingBox())!.y - 24)).toBeLessThan(1);
  await page.locator('#circuitrubric summary').click();
  await expect(page.locator('#circuitrubric .catalog-detail')).toBeHidden();
  await page.locator('#circuitrubric summary').click();
  await expect(page.locator('#circuitrubric .catalog-detail')).toBeVisible();
  await page.goto('./analog-ai/#circuitrubric--source-method');
  await expect(page.locator('#circuitrubric--source-method')).toBeInViewport();
  await context.close();
});

test('keyboard navigation reaches search, category, disclosures and links without focus theft', async ({ page }) => {
  await open(page);
  const focusable = await page.locator('a:visible, button:visible, input:visible, select:visible, summary:visible').count();
  for (let i = 0; i < focusable && !await search(page).evaluate((element) => element === document.activeElement); i += 1) {
    await page.keyboard.press('Tab');
  }
  await expect(search(page)).toBeFocused();
  await page.keyboard.type('AnalogCoderPro');
  await expect(page.locator('#analogcoder-pro')).toBeVisible();
  await expect(page.locator('#amsbench')).toBeHidden();
  await expect(search(page)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(category(page)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(category(page)).toHaveValue('benchmark');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Reset filters' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#analogcoder-pro .catalog-links a').first()).toBeFocused();
  const links = await page.locator('#analogcoder-pro .catalog-links a').count();
  for (let i = 0; i < links; i += 1) await page.keyboard.press('Tab');
  await expect(page.locator('#analogcoder-pro summary')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#analogcoder-pro details')).toHaveAttribute('open', '');
});

for (const width of [1440, 390, 320]) {
  test(`catalog layout and expanded details fit a ${width}px viewport`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 950 });
    await open(page);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await page.screenshot({ path: info.outputPath(`catalog-${width}.png`), fullPage: false });
    await page.locator('#analogforge-agent summary').click();
    await page.locator('#analogforge-agent').scrollIntoViewIfNeeded();
    await expect(page.locator('#analogforge-agent .catalog-sources')).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    await page.screenshot({ path: info.outputPath(`catalog-${width}-expanded.png`), fullPage: false });
    await page.locator('#analogforge-agent h2').evaluate((element) => { element.textContent = 'LongProjectName'.repeat(30); });
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}

test('Analog AI navigation and filter state never leak into Timeline or Events', async ({ page }) => {
  await page.goto('./events/?q=PLL&kind=organizational&companies=apple');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  const link = nav.getByRole('link', { name: 'Analog AI', exact: true });
  await expect(link).not.toHaveAttribute('data-filter-view-link');
  await expect(link).not.toHaveAttribute('data-filter-surface');
  await link.click();
  await expect(search(page)).toHaveValue('');
  await expect(category(page)).toHaveValue('');
  await search(page).fill('LDO');
  await category(page).selectOption('agent');
  for (const label of ['Timeline', 'Events']) {
    const href = new URL((await nav.getByRole('link', { name: label, exact: true }).getAttribute('href'))!, page.url());
    expect(href.search).toBe('');
  }
  await nav.getByRole('link', { name: 'Timeline', exact: true }).click();
  expect(new URL(page.url()).search).toBe('');
  await expect(page.locator('[data-search]')).toHaveValue('');
  await page.goBack();
  await expect(search(page)).toHaveValue('LDO');
  await expect(category(page)).toHaveValue('agent');
  await nav.getByRole('link', { name: 'Events', exact: true }).click();
  expect(new URL(page.url()).search).toBe('');
  await expect(page.locator('[data-search]')).toHaveValue('');
});
