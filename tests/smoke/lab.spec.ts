import { expect, test } from '@playwright/test';
import { catalogFixture, catalogSearchRegression } from './catalog-index';
import { basePath, installBrowserErrorGuards } from './release-helpers.mjs';

installBrowserErrorGuards(test);
const fixture = await catalogFixture('lab');
catalogSearchRegression(fixture, {
  'ＶＮＡ': ['librevna'],
  'ADALM2000': ['libm2k', 'scopy'],
  'wafer map': ['tsmap'],
  'Allan deviation': ['allantools'],
  'Test Automation': ['openhtf', 'opentap', 'pymeasure'],
  'KiCad automation': ['kibot'],
});

for (const width of [1440, 390, 320]) {
  test(`Lab navigation, anchors, activity and filtering work at ${width}px`, { tag: width !== 320 ? '@core-lab' : [] }, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    const recent = page.locator('[data-updated-projects="lab"] a');
    const href = (await recent.first().getAttribute('href'))!;
    expect(href).toBe(`${basePath}lab/#${fixture.ordered[0].id}--name`);
    await recent.first().click();
    expect(new URL(page.url()).hash).toBe(`#${fixture.ordered[0].id}--name`);
    await expect(page.locator(':target')).toHaveText(fixture.ordered[0].name);
    await expect(page).toHaveTitle('Lab: Board, Test & Measurement · AMS Signals');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Lab', exact: true })).toHaveAttribute('aria-current', 'page');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    await expect(fixture.rows(page)).toHaveCount(fixture.projects.length);
    await expect(fixture.rows(page).first().locator('.activity-strip > li')).toHaveCount(12);
    const scope = page.getByRole('combobox', { name: 'Scope' });
    await expect(scope.locator('option')).toHaveText(['All scopes', 'Board & Fixture', 'Control', 'Acquisition', 'Analysis', 'Test Automation']);
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    await search.fill('Standard Test Data Format');
    await scope.selectOption('analysis');
    await expect(fixture.row(page, 'stdf-viewer')).toBeVisible();
    await expect(fixture.row(page, 'rust-stdf')).toBeVisible();
    await scope.selectOption('acquisition');
    await expect(page.getByText('No projects match.', { exact: true })).toBeVisible();
    await expect(page.getByRole('status')).toHaveText(`0 of ${fixture.projects.length} projects`);
  });
}
test('Lab sources and project descriptions remain readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const base = test.info().project.use.baseURL!;
  await page.goto(new URL('lab/', base).href);
  await expect(page.getByRole('search')).toBeHidden();
  await expect(fixture.rows(page)).toHaveCount(fixture.projects.length);
  const board = fixture.row(page, 'diode-pcb');
  await expect(board.getByRole('link', { name: 'Code', exact: true })).toBeVisible();
  await expect(board.getByText('Development provenance', { exact: true })).toBeVisible();
  await context.close();
});
