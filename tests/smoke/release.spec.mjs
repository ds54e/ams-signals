import { expect, test } from '@playwright/test';

const basePath = '/ams-signals/';
const browserErrors = new WeakMap();

test.beforeEach(async ({ page }) => {
  const errors = [];
  browserErrors.set(page, errors);
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page), 'browser console and page errors').toEqual([]);
});

async function expectTimelineReady(page) {
  await expect(page.locator('[data-timeline-root]')).toHaveAttribute('data-initialized', 'true');
  await expect(page.locator('[data-status]')).toContainText('unique public');
}

test('global Timeline loads at the repository base with release metadata', async ({ page }) => {
  await page.goto('./');
  await expectTimelineReady(page);

  expect(new URL(page.url()).pathname).toBe(basePath);
  await expect(page).toHaveTitle('AMS Signals');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RNM|mixed-signal/i);
  await expect(page.locator('a.brand')).toHaveAttribute('href', basePath);
  await expect(page.getByRole('link', { name: 'Analysis', exact: true })).toHaveAttribute('href', `${basePath}analysis/`);

  const internalHrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors
    .map((anchor) => anchor.getAttribute('href'))
    .filter((href) => href?.startsWith('/')));
  expect(internalHrefs.every((href) => href.startsWith(basePath))).toBe(true);
});

test('company focus and lexical searches survive URL reload', async ({ page }) => {
  await page.goto('./?companies=apple,sitime,skyworks&q=RNM');
  await expectTimelineReady(page);
  await expect(page.locator('[data-search]')).toHaveValue('RNM');

  const selectedCompanies = await page.locator('[data-company-options] input:checked').evaluateAll((inputs) => inputs.map((input) => input.value).sort());
  expect(selectedCompanies).toEqual(['apple', 'sitime', 'skyworks']);
  await page.reload();
  await expectTimelineReady(page);
  await expect(page.locator('[data-search]')).toHaveValue('RNM');
  const reloadedCompanies = await page.locator('[data-company-options] input:checked').evaluateAll((inputs) => inputs.map((input) => input.value).sort());
  expect(reloadedCompanies).toEqual(['apple', 'sitime', 'skyworks']);

  for (const query of ['RNM', 'model validation', 'PLL']) {
    await page.locator('[data-search]').fill(query);
    await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
    expect(new URL(page.url()).searchParams.get('q')).toBe(query);
  }
});

test('the UVM-MS shared Event remains one record across multiple lanes', async ({ page }) => {
  const eventId = 'ecosystem-2025-02-uvm-ms-1-standard';
  await page.goto('./?q=UVM-MS');
  await expectTimelineReady(page);

  await expect(page.locator(`[data-event-result][data-event-id="${eventId}"]`)).toHaveCount(1);
  const marks = page.locator(`[data-event-mark][data-event-id="${eventId}"]`);
  expect(await marks.count()).toBeGreaterThan(1);
  await marks.first().click();
  await expect.poll(() => marks.evaluateAll((nodes) => nodes.every((node) => node.getAttribute('aria-pressed') === 'true'))).toBe(true);
  await expect(page.locator('[data-detail-shared]')).toContainText('One factual Event');
  await expect(page.locator('[data-detail-event]')).toHaveAttribute('href', `${basePath}events/${eventId}/`);
});

test('the SiTime and Renesas business Event selects as one shared record', async ({ page }) => {
  const eventId = 'sitime-2026-07-renesas-timing-acquisition';
  await page.goto('./?companies=renesas,sitime&q=acquisition');
  await expectTimelineReady(page);

  await expect(page.locator(`[data-event-result][data-event-id="${eventId}"]`)).toHaveCount(1);
  const marks = page.locator(`[data-event-mark][data-event-id="${eventId}"]`);
  expect(await marks.count()).toBeGreaterThan(1);
  await marks.last().click();
  await expect.poll(() => marks.evaluateAll((nodes) => nodes.every((node) => node.getAttribute('aria-pressed') === 'true'))).toBe(true);
  await expect(page.locator('[data-detail-context]')).toContainText('Renesas');
  await expect(page.locator('[data-detail-context]')).toContainText('SiTime');
});

test('sparse Company and People-first records remain explicit', async ({ page }) => {
  await page.goto('./companies/sony-semiconductor-solutions/');
  await expect(page.getByRole('heading', { name: 'No Golden events are currently indexed' })).toBeVisible();
  await expect(page.locator('.sparse-state')).toContainText('does not imply');

  await page.goto('./people/toshi-kawashima/');
  await expectTimelineReady(page);
  await expect(page.locator('[data-timeline-root]')).toHaveAttribute('data-context', 'person');
  await expect(page.locator('[data-timeline-root]')).toHaveAttribute('data-default-view', 'people');
  await expect(page.locator('[data-group="people"]')).toBeVisible();
  await expect(page.locator('[data-group="companies"]')).toBeHidden();
});

test('unavailable originals are labels while recovery and multi-source links stay live', async ({ page }) => {
  await page.goto('./events/apple-2026-04-pmu-dms/');
  const cards = page.locator('.source-card');
  expect(await cards.count()).toBeGreaterThan(1);
  await expect(cards.first().locator('.unavailable-source-title')).toBeVisible();
  await expect(cards.first().locator('h3 a')).toHaveCount(0);
  await expect(cards.nth(1).locator('h3 a')).toHaveAttribute('href', /^https:\/\//);

  await page.goto('./events/analog-devices-2014-metric-driven-mixed-signal-verification/');
  const paperCards = page.locator('.source-card');
  expect(await paperCards.count()).toBeGreaterThan(1);
  await expect(paperCards.locator('h3 a')).toHaveCount(await paperCards.count());
});

test('Analysis navigation reaches an article, a Golden Event, and original evidence', async ({ page }) => {
  await page.goto('./analysis/');
  await page.getByRole('link', { name: 'From Behavioral Models to Managed Verification Assets?' }).click();
  await expect(page.locator('.analysis-boundary')).toContainText('interpretation and inference');

  const eventLink = page.locator('.analysis-prose a[href*="events/"]').first();
  await expect(eventLink).toBeVisible();
  await eventLink.click();
  expect(new URL(page.url()).pathname).toMatch(/^\/ams-signals\/events\/[^/]+\/$/);
  await expect(page.locator('.record-fact')).toBeVisible();
  await expect(page.locator('.source-card h3 a').first()).toHaveAttribute('href', /^https:\/\//);
});

test('mobile chronology has no document overflow and light/dark modes remain distinct', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('./?companies=apple,sitime,skyworks&q=RNM');
  await expectTimelineReady(page);
  await expect(page.locator('.result-section')).toBeVisible();

  const lightBackground = await page.locator('html').evaluate((html) => getComputedStyle(html).backgroundColor);
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);

  await page.emulateMedia({ colorScheme: 'dark' });
  await expect.poll(() => page.locator('html').evaluate((html) => getComputedStyle(html).backgroundColor)).not.toBe(lightBackground);
});
