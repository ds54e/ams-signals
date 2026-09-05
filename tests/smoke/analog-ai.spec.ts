import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const names = [
  'AMSbench', 'Analog Design Bench', 'AnalogCoder-Pro', 'AnalogForge Agent',
  'AnalogGym', 'CircuitRubric', 'EvoLDO-Bench', 'Razavi-Bench',
  'virtuoso-agent', 'virtuoso-bridge-lite',
];
const rows = (page: Page) => page.locator('[data-catalog-project]');
const visible = (page: Page) => page.locator('[data-catalog-project]:visible');
const search = (page: Page) => page.getByRole('searchbox', { name: 'Search', exact: true });
const category = (page: Page) => page.getByRole('combobox', { name: 'Category', exact: true });
const count = (page: Page) => page.locator('[data-catalog-count]');
async function open(page: Page, suffix = '') {
  await page.goto(`./analog-ai/${suffix}`);
  await expect(search(page)).toBeVisible();
}

test('all ten projects appear once in name order with useful summaries and primary links', async ({ page }) => {
  const response = await page.request.get('./analog-ai/');
  const html = await response.text();
  for (const name of names) expect(html).toContain(name);
  expect(html).toContain('PVT');
  expect(html).toContain('https://github.com/levantlabs/circuitrubric-bench');
  await open(page);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Analog AI benchmarks and tools');
  expect(await page.locator('[data-analog-ai]').textContent()).not.toMatch(/[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u);
  await expect(rows(page).locator('h2')).toHaveText(names);
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  await expect(page.locator('.catalog-updates')).toHaveCount(0);
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
  for (const row of await rows(page).all()) {
    await expect(row.locator('.catalog-summary')).toBeVisible();
    await expect(row.locator('.catalog-meta').last()).toContainText('Access & environment');
    expect(await row.locator('.catalog-links a').count()).toBeGreaterThanOrEqual(2);
  }
});

test('multi-role projects appear in either category and filtering preserves order', async ({ page }) => {
  await open(page);
  for (const type of ['benchmark', 'agent']) {
    await category(page).selectOption(type);
    await expect(page.locator('#analogcoder-pro')).toBeVisible();
    const filteredNames = await visible(page).locator('h2').allTextContents();
    expect(filteredNames).toEqual(names.filter((name) => filteredNames.includes(name)));
  }
  await category(page).selectOption('dataset-environment');
  await expect(visible(page).locator('h2')).toHaveText(['AMSbench', 'AnalogGym']);
  await category(page).selectOption('');
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  await expect(page.locator('#analogcoder-pro')).toHaveCount(1);
});

test('LDO ngspice uses AND and combines with the category using AND', async ({ page }) => {
  await open(page);
  await search(page).fill('LDO ngspice');
  await expect(visible(page).locator('h2')).toHaveText(['Analog Design Bench', 'AnalogForge Agent', 'AnalogGym', 'EvoLDO-Bench']);
  await category(page).selectOption('benchmark');
  await expect(visible(page).locator('h2')).toHaveText(['Analog Design Bench', 'AnalogGym', 'EvoLDO-Bench']);
  await category(page).selectOption('agent');
  await expect(visible(page).locator('h2')).toHaveText(['AnalogForge Agent']);
});

test('aliases, NFKC, case and rendered detail prose are searchable; metadata and URLs are not', async ({ page }) => {
  await open(page);
  for (const q of ['VirtuosoBridgeLite', 'virtuosobridgelite', 'ＶｉｒｔｕｏｓｏＢｒｉｄｇｅＬｉｔｅ']) {
    await search(page).fill(q);
    await expect(visible(page).locator('h2')).toHaveText(['virtuoso-bridge-lite']);
  }
  await search(page).fill('ＢＥＮＣＨＭＡＲＫ');
  await expect(page.locator('#circuitrubric')).toBeVisible();
  await search(page).fill('drain');
  await expect(visible(page).locator('h2')).toHaveText(['CircuitRubric']);
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
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  expect(page.url()).toBe(originalUrl);
  await expect(search(page)).toBeFocused();
  await search(page).evaluate((input: HTMLInputElement) => {
    input.value = 'ＣＩＲＣＵＩＴＲＵＢＲＩＣ';
    input.dispatchEvent(new CompositionEvent('compositionend', { bubbles: true, data: 'ＣＩＲＣＵＩＴＲＵＢＲＩＣ' }));
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
  });
  await expect(visible(page).locator('h2')).toHaveText(['CircuitRubric']);
  await expect(search(page)).toBeFocused();
});

test('zero results preserve controls, focus and the query, with one reset action', async ({ page }) => {
  await open(page);
  await category(page).selectOption('eda-tool');
  await search(page).fill('unmatched query');
  await expect(count(page)).toHaveText('Showing 0 of 10 projects');
  await expect(page.locator('[data-catalog-empty]')).toBeVisible();
  await expect(search(page)).toHaveValue('unmatched query');
  await expect(search(page)).toBeFocused();
  await expect(category(page)).toHaveValue('eda-tool');
  await expect(page.getByRole('button', { name: 'Reset filters' })).toHaveCount(1);
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  await expect(search(page)).toHaveValue('');
  await expect(category(page)).toHaveValue('');
  expect(new URL(page.url()).search).toBe('');
});

test('q/type survive reload and browser back/forward; no catalog storage is written', async ({ page }) => {
  await open(page, '?q=LDO');
  await page.evaluate(() => localStorage.setItem('unrelated', 'keep'));
  await category(page).selectOption('benchmark');
  await category(page).selectOption('agent');
  await expect(visible(page).locator('h2')).toHaveText(['AnalogForge Agent']);
  await page.reload();
  await expect(search(page)).toHaveValue('LDO');
  await expect(category(page)).toHaveValue('agent');
  await page.goBack();
  await expect(category(page)).toHaveValue('benchmark');
  await expect(visible(page)).toHaveCount(3);
  await page.goForward();
  await expect(category(page)).toHaveValue('agent');
  await expect(visible(page)).toHaveCount(1);
  expect(await page.evaluate(() => Object.entries(localStorage))).toEqual([['unrelated', 'keep']]);
});

test('typing creates one history entry per edit session, not one per keystroke', async ({ page }) => {
  await open(page);
  const before = await page.evaluate(() => history.length);
  await search(page).pressSequentially('ngspice');
  expect(await page.evaluate(() => history.length)).toBe(before + 1);
  await page.goBack();
  await expect(search(page)).toHaveValue('');
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  await page.goForward();
  await expect(search(page)).toHaveValue('ngspice');
});

test('a compatible hash opens its project and keeps filters through history navigation', async ({ page }) => {
  await open(page, '?q=ldo&type=benchmark#evo-ldo-bench');
  await expect(search(page)).toHaveValue('ldo');
  await expect(category(page)).toHaveValue('benchmark');
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
  await expect(count(page)).toHaveText('Showing 3 of 10 projects');
  await search(page).fill('CircuitRubric');
  expect(new URL(page.url()).hash).toBe('');
  await page.goBack();
  await expect(search(page)).toHaveValue('ldo');
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
  await page.goForward();
  await expect(search(page)).toHaveValue('CircuitRubric');
  await expect(visible(page).locator('h2')).toHaveText(['CircuitRubric']);
});

test('a conflicting hash clears filters and keeps consistent counts and URL', async ({ page }) => {
  await open(page, '?q=CircuitRubric&type=eda-tool#evo-ldo-bench');
  await expect(search(page)).toHaveValue('');
  await expect(category(page)).toHaveValue('');
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  await expect(page.locator('[data-catalog-notice]')).toBeVisible();
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
  expect(new URL(page.url()).search).toBe('');
  expect(new URL(page.url()).hash).toBe('#evo-ldo-bench');
  await expect.poll(() => page.locator('#evo-ldo-bench').evaluate((element) => Math.abs(element.getBoundingClientRect().top - 24))).toBeLessThan(3);
  await category(page).selectOption('eda-tool');
  expect(new URL(page.url()).hash).toBe('');
  await expect(visible(page).locator('h2')).toHaveText(['virtuoso-bridge-lite']);
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
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  await expect(page.locator('#evo-ldo-bench details')).toHaveAttribute('open', '');
});

test('unknown types/hashes and special query strings are handled as text', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await open(page, '?type=__proto__#unknown-project');
  await expect(category(page)).toHaveValue('');
  await expect(count(page)).toHaveText('Showing 10 of 10 projects');
  expect(new URL(page.url()).hash).toBe('#unknown-project');
  await expect(rows(page).locator('details[open]')).toHaveCount(0);
  const q = '<img src=x onerror=alert(1)> & "日本語"';
  await open(page, `?q=${encodeURIComponent(q)}&type=nonsense#%E0%A4%A`);
  await expect(search(page)).toHaveValue(q);
  await expect(count(page)).toHaveText('Showing 0 of 10 projects');
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

test('no-JavaScript HTML exposes all text, native details and source links with filters hidden', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto('./analog-ai/?q=unknown&type=agent#evo-ldo-bench');
  await expect(visible(page)).toHaveCount(10);
  await expect(rows(page).locator('details[open]')).toHaveCount(10);
  await expect(page.locator('[data-catalog-controls]')).toBeHidden();
  await expect(page.locator('.catalog-sources')).toHaveCount(10);
  await expect(page.locator('#circuitrubric .catalog-detail')).toBeVisible();
  await expect(page.locator('#circuitrubric .catalog-sources a').first()).toBeVisible();
  // Let the browser finish the native smooth-scroll arrival before clicking.
  await expect.poll(async () => Math.abs((await page.locator('#evo-ldo-bench').boundingBox())!.y - 24)).toBeLessThan(1);
  await page.locator('#circuitrubric summary').click();
  await expect(page.locator('#circuitrubric .catalog-detail')).toBeHidden();
  await page.locator('#circuitrubric summary').click();
  await expect(page.locator('#circuitrubric .catalog-detail')).toBeVisible();
  await context.close();
});

test('keyboard navigation reaches search, category, disclosures and links without focus theft', async ({ page }) => {
  await open(page);
  for (let i = 0; i < 6; i += 1) await page.keyboard.press('Tab');
  await expect(search(page)).toBeFocused();
  await page.keyboard.type('AnalogCoderPro');
  await expect(visible(page)).toHaveCount(1);
  await expect(search(page)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(category(page)).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(category(page)).toHaveValue('benchmark');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Reset filters' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#analogcoder-pro .catalog-links a').first()).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
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
