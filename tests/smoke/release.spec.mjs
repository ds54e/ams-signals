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

async function expectExplorerReady(page, surface = 'timeline') {
  const explorer = page.locator('[data-event-explorer-root]');
  await expect(explorer).toHaveAttribute('data-initialized', 'true');
  await expect(explorer).toHaveAttribute('data-surface', surface);
  await expect(page.locator('[data-status]')).toContainText('unique public');
}

async function visibleTimelineEventIds(page) {
  return page.locator('[data-event-mark]:visible').evaluateAll((marks) => (
    [...new Set(marks.map((mark) => mark.getAttribute('data-event-id')).filter(Boolean))].sort()
  ));
}

async function visibleListedEventIds(page) {
  return page.locator('[data-event-result]:visible').evaluateAll((events) => (
    events.map((event) => event.getAttribute('data-event-id')).filter(Boolean).sort()
  ));
}

function queryState(url) {
  return Object.fromEntries([...new URL(url).searchParams.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

test('Timeline is the temporal view with filters and one Evidence Inspector', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  expect(new URL(page.url()).pathname).toBe(basePath);
  await expect(page).toHaveTitle('AMS Signals');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RNM|mixed-signal/i);
  await expect(page.locator('a.brand')).toHaveAttribute('href', basePath);
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('href', `${basePath}events/`);
  await expect(page.getByRole('link', { name: 'Analysis', exact: true })).toHaveAttribute('href', `${basePath}analysis/`);

  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-detail]')).toHaveCount(1);
  await expect(page.locator('.result-section')).toHaveCount(0);
  await expect(page.getByText('Visible events', { exact: true })).toHaveCount(0);
  await expect(page.getByText('CHRONOLOGICAL RECORD', { exact: true })).toHaveCount(0);

  const internalHrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors
    .map((anchor) => anchor.getAttribute('href'))
    .filter((href) => href?.startsWith('/')));
  expect(internalHrefs.every((href) => href.startsWith(basePath))).toBe(true);
});

test('selecting a Timeline mark updates the Evidence Inspector', async ({ page }) => {
  const eventId = 'renesas-2023-automated-pll-model-testbench';
  await page.goto('./?q=PLL');
  await expectExplorerReady(page);

  const mark = page.locator(`[data-event-mark][data-event-id="${eventId}"]:visible`).first();
  await expect(mark).toBeVisible();
  await mark.click();

  await expect(mark).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-detail-title]')).toContainText('PLL abstractions');
  await expect(page.locator('[data-detail-fact]')).toContainText('model-versus-schematic');
  await expect(page.locator('[data-detail-event]')).toHaveAttribute('href', `${basePath}events/${eventId}/`);
});

test('Events is the chronological textual view without a Timeline or inspector', async ({ page }) => {
  await page.goto('./events/');
  await expectExplorerReady(page, 'events');

  expect(new URL(page.url()).pathname).toBe(`${basePath}events/`);
  await expect(page).toHaveTitle('Events · AMS Signals');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.desktop-timeline')).toHaveCount(0);
  await expect(page.locator('[data-detail]')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Visible events' })).toBeVisible();
  await expect(page.locator('.result-section')).toBeVisible();

  const ids = await page.locator('[data-event-result]').evaluateAll((events) => events.map((event) => event.getAttribute('data-event-id')));
  expect(ids.length).toBeGreaterThan(0);
  expect(new Set(ids).size).toBe(ids.length);
  await expect(page.locator('[data-event-result]').first().locator('time')).toBeVisible();
  await expect(page.locator('[data-event-result]').first().locator('.kind-badge')).toBeVisible();
  await expect(page.locator('[data-event-result]').first().locator('.result-fact')).toBeVisible();
  await expect(page.locator('[data-event-result]').first().getByRole('link', { name: 'Event record' })).toBeVisible();

  await page.locator('[data-search]').fill('PLL');
  await expect(page.locator('[data-event-result]:visible').first().locator('[data-result-match]')).toContainText('Matched in');
});

test('Timeline and Events return identical Event sets for shared filters', async ({ page }) => {
  const lenses = [
    '?q=RNM',
    '?q=PLL',
    '?q=model%20validation',
    '?companies=apple,renesas',
  ];

  for (const lens of lenses) {
    await page.goto(`./${lens}`);
    await expectExplorerReady(page);
    const timelineIds = await visibleTimelineEventIds(page);

    await page.goto(`./events/${lens}`);
    await expectExplorerReady(page, 'events');
    const listedIds = await visibleListedEventIds(page);

    expect(listedIds, `Event set for ${lens}`).toEqual(timelineIds);
    expect(listedIds.length, `non-empty Event set for ${lens}`).toBeGreaterThan(0);
  }
});

test('Timeline and Events navigation preserves the current query lens', async ({ page }) => {
  const expected = {
    companies: 'apple,renesas',
    kind: 'publication',
    q: 'PLL',
    view: 'both',
  };
  await page.goto('./?companies=apple,renesas&kind=publication&q=PLL&view=both');
  await expectExplorerReady(page);
  expect(queryState(page.url())).toEqual(expected);
  const timelineIds = await visibleTimelineEventIds(page);

  await page.getByRole('link', { name: 'Events', exact: true }).click();
  await expectExplorerReady(page, 'events');
  expect(new URL(page.url()).pathname).toBe(`${basePath}events/`);
  expect(queryState(page.url())).toEqual(expected);
  expect(await visibleListedEventIds(page)).toEqual(timelineIds);

  await page.getByRole('link', { name: 'Timeline', exact: true }).click();
  await expectExplorerReady(page);
  expect(new URL(page.url()).pathname).toBe(basePath);
  expect(queryState(page.url())).toEqual(expected);
  expect(await visibleTimelineEventIds(page)).toEqual(timelineIds);
});

test('full-corpus company discovery order is shared and never changes while filtering', async ({ page }) => {
  const expectedRecords = [
    { id: 'apple', name: 'Apple', count: '9 events' },
    { id: 'analog-devices', name: 'Analog Devices', count: '5 events' },
    { id: 'renesas', name: 'Renesas Electronics', count: '5 events' },
    { id: 'nxp', name: 'NXP Semiconductors', count: '3 events' },
    { id: 'siemens-eda', name: 'Siemens EDA', count: '3 events' },
    { id: 'skyworks', name: 'Skyworks Solutions', count: '3 events' },
    { id: 'texas-instruments', name: 'Texas Instruments', count: '3 events' },
    { id: 'broadcom', name: 'Broadcom', count: '2 events' },
    { id: 'cadence', name: 'Cadence Design Systems', count: '2 events' },
    { id: 'sitime', name: 'SiTime', count: '2 events' },
    { id: 'synopsys', name: 'Synopsys', count: '2 events' },
    { id: 'mediatek', name: 'MediaTek', count: '1 event' },
    { id: 'microchip', name: 'Microchip Technology', count: '1 event' },
    { id: 'nvidia', name: 'NVIDIA', count: '1 event' },
    { id: 'qualcomm', name: 'Qualcomm', count: '1 event' },
    { id: 'omnivision', name: 'OMNIVISION', count: 'No Golden events currently indexed' },
    { id: 'sony-semiconductor-solutions', name: 'Sony Semiconductor Solutions', count: 'No Golden events currently indexed' },
  ];
  const expectedActive = expectedRecords.slice(0, -2);

  const pickerOrder = () => page.locator('[data-company-options] label').evaluateAll((labels) => labels.map((label) => ({
    id: label.querySelector('input')?.value,
    name: label.querySelector('span')?.textContent?.trim(),
    count: label.querySelector('small')?.textContent?.trim(),
  })));
  const recordOrder = () => page.locator('.company-records li').evaluateAll((rows) => rows.map((row) => {
    const link = row.querySelector('a');
    return {
      id: link?.getAttribute('href')?.match(/companies\/([^/]+)\//)?.[1],
      name: link?.textContent?.trim(),
      count: row.querySelector('span')?.textContent?.trim(),
    };
  }));

  for (const path of ['./', './events/']) {
    await page.goto(path);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    expect(await pickerOrder()).toEqual(expectedActive);
    expect(await recordOrder()).toEqual(expectedRecords);

    await page.locator('[data-search]').fill('RNM');
    await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('RNM');
    expect(await pickerOrder()).toEqual(expectedActive);
    expect(await recordOrder()).toEqual(expectedRecords);
  }

  await page.goto('./');
  await expectExplorerReady(page);
  const lanes = await page.locator('[data-group="companies"] [data-lane]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-entity-id')));
  expect(lanes).toEqual(expectedActive.map(({ id }) => id));
});

test('shared Events remain one list record and one inspector record', async ({ page }) => {
  const uvmEventId = 'ecosystem-2025-02-uvm-ms-1-standard';
  await page.goto('./events/?q=UVM-MS');
  await expectExplorerReady(page, 'events');
  await expect(page.locator(`[data-event-result][data-event-id="${uvmEventId}"]:visible`)).toHaveCount(1);

  const businessEventId = 'sitime-2026-07-renesas-timing-acquisition';
  await page.goto('./events/?companies=renesas,sitime&q=acquisition');
  await expectExplorerReady(page, 'events');
  await expect(page.locator(`[data-event-result][data-event-id="${businessEventId}"]:visible`)).toHaveCount(1);

  await page.goto('./?q=UVM-MS');
  await expectExplorerReady(page);
  const marks = page.locator(`[data-event-mark][data-event-id="${uvmEventId}"]:visible`);
  expect(await marks.count()).toBeGreaterThan(1);
  await marks.first().click();
  await expect.poll(() => marks.evaluateAll((nodes) => nodes.every((node) => node.getAttribute('aria-pressed') === 'true'))).toBe(true);
  await expect(page.locator('[data-detail-shared]')).toContainText('One factual Event');
  await expect(page.locator('[data-detail-event]')).toHaveAttribute('href', `${basePath}events/${uvmEventId}/`);
});

test('unavailable originals remain labels and Event permalinks remain live', async ({ page }) => {
  const eventId = 'apple-2026-04-pmu-dms';
  await page.goto('./events/?q=PMU');
  await expectExplorerReady(page, 'events');
  const row = page.locator(`[data-event-result][data-event-id="${eventId}"]`);
  await expect(row).toBeVisible();
  await expect(row.locator('.inline-source-unavailable')).toBeVisible();
  await expect(row.locator('.inline-source-unavailable').locator('a')).toHaveCount(0);
  await expect(row.locator('.result-body h3 a')).toHaveAttribute('href', `${basePath}events/${eventId}/`);
  await expect(row.getByRole('link', { name: 'Event record' })).toHaveAttribute('href', `${basePath}events/${eventId}/`);

  await row.locator('.result-body h3 a').click();
  await expect(page.locator('.record-fact')).toBeVisible();
  const cards = page.locator('.source-card');
  expect(await cards.count()).toBeGreaterThan(1);
  await expect(cards.first().locator('.unavailable-source-title')).toBeVisible();
  await expect(cards.first().locator('h3 a')).toHaveCount(0);
  await expect(cards.nth(1).locator('h3 a')).toHaveAttribute('href', /^https:\/\//);
});

test('Company-first, People-first, and Analysis-to-Event behavior remains intact', async ({ page }) => {
  await page.goto('./companies/apple/');
  await expectExplorerReady(page);
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-context', 'company');
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'companies');
  await expect(page.locator('[data-group="companies"]')).toBeVisible();
  await expect(page.locator('[data-group="people"]')).toBeHidden();
  await expect(page.locator('.result-section')).toHaveCount(0);

  await page.goto('./people/toshi-kawashima/');
  await expectExplorerReady(page);
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-context', 'person');
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'people');
  await expect(page.locator('[data-group="people"]')).toBeVisible();
  await expect(page.locator('[data-group="companies"]')).toBeHidden();

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

test('search controls are compact and aligned on Timeline and Events', async ({ page }) => {
  const removedCopy = 'Lexical search across events, evidence, companies, and people.';

  for (const path of ['./', './events/']) {
    await page.goto(`${path}?companies=apple,renesas&kind=publication&q=PLL&view=both`);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    await expect(page.getByText(removedCopy, { exact: true })).toHaveCount(0);

    const searchBox = await page.locator('[data-search]').boundingBox();
    const kindBox = await page.locator('[data-kind]').boundingBox();
    const viewBox = await page.locator('[data-view]').boundingBox();
    expect(searchBox).not.toBeNull();
    expect(kindBox).not.toBeNull();
    expect(viewBox).not.toBeNull();
    expect(Math.abs(searchBox.y - kindBox.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(searchBox.y - viewBox.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(searchBox.height - kindBox.height)).toBeLessThanOrEqual(1);

    await page.locator('[data-reset]').click();
    expect(new URL(page.url()).search).toBe('');
    await expect(page.locator('[data-search]')).toHaveValue('');
    await expect(page.locator('[data-kind]')).toHaveValue('all');
    await expect(page.locator('[data-view]')).toHaveValue('companies');
    await expect(page.locator('[data-company-options] input:checked')).toHaveCount(await page.locator('[data-company-options] input').count());
  }
});

test('narrow viewports retain basic access without a mobile chronology fallback', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./?companies=apple,renesas&q=PLL');
  await expectExplorerReady(page);
  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-detail]')).toBeVisible();
  await expect(page.locator('.result-section')).toHaveCount(0);
  const timelineWidths = await page.locator('.timeline-visual').evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(timelineWidths.scrollWidth).toBeGreaterThan(timelineWidths.clientWidth);

  await page.goto('./events/?companies=apple,renesas&q=PLL');
  await expectExplorerReady(page, 'events');
  await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Analysis', exact: true })).toBeVisible();
});
