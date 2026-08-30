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
  await expect(page.locator('h1.visually-hidden')).toHaveText('AMS Signals Timeline');
  await expect(page.locator('main > .intro')).toHaveCount(0);
  await expect(page.getByText('FACTUAL PUBLIC TIMELINE', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Public signals in RNM & mixed-signal verification', { exact: true })).toHaveCount(0);
  await expect(page.locator('a.brand')).toHaveAttribute('href', basePath);
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('href', `${basePath}events/`);
  await expect(page.getByRole('link', { name: 'Analysis', exact: true })).toHaveAttribute('href', `${basePath}analysis/`);

  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-detail]')).toHaveCount(1);
  await expect(page.locator('.result-section')).toHaveCount(0);
  await expect(page.locator('.company-records')).toHaveCount(0);
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
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Chronological factual Events/i);
  await expect(page.locator('h1.visually-hidden')).toHaveText('AMS Signals Events');
  await expect(page.locator('main > .intro')).toHaveCount(0);
  await expect(page.getByText('FACTUAL CHRONOLOGICAL RECORD', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Read the indexed public Events', { exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.desktop-timeline')).toHaveCount(0);
  await expect(page.locator('[data-detail]')).toHaveCount(0);
  await expect(page.locator('.company-records')).toHaveCount(0);
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

test('Company Focus exposes immediate All companies and Clear all actions', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';
    await page.goto(path);
    await expectExplorerReady(page, surface);

    await page.locator('[data-search]').fill('RNM');
    await page.locator('[data-kind]').selectOption('publication');
    await page.locator('[data-view]').selectOption('both');
    await page.locator('[data-company-picker] summary').click();

    const checks = page.locator('[data-company-options] input');
    const checked = page.locator('[data-company-options] input:checked');
    const totalCompanies = await checks.count();
    await expect(page.getByRole('button', { name: 'All companies', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await expect(checked).toHaveCount(0);
    await expect(page.locator('[data-status]')).toHaveText('0 of 43 unique public events shown');
    expect(new URL(page.url()).searchParams.get('companies')).toBe('none');
    if (surface === 'timeline') {
      await expect(page.locator('[data-event-mark]:visible')).toHaveCount(0);
    } else {
      await expect(page.locator('[data-event-result]:visible')).toHaveCount(0);
      await expect(page.locator('[data-filtered-empty]')).toBeVisible();
    }

    await page.getByRole('button', { name: 'All companies', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-status]')).not.toHaveText('0 of 43 unique public events shown');
    expect(new URL(page.url()).searchParams.has('companies')).toBe(false);

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await page.locator('[data-company-picker] summary').click();
    await page.locator('[data-reset]').click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-search]')).toHaveValue('');
    await expect(page.locator('[data-kind]')).toHaveValue('all');
    await expect(page.locator('[data-view]')).toHaveValue('companies');
    expect(new URL(page.url()).search).toBe('');
  }
});

test('full-corpus company discovery order is shared and never changes while filtering', async ({ page }) => {
  const expectedActive = [
    { id: 'apple', name: 'Apple', count: '9 events' },
    { id: 'analog-devices', name: 'Analog Devices', count: '6 events' },
    { id: 'renesas', name: 'Renesas Electronics', count: '6 events' },
    { id: 'nxp', name: 'NXP Semiconductors', count: '5 events' },
    { id: 'texas-instruments', name: 'Texas Instruments', count: '5 events' },
    { id: 'cadence', name: 'Cadence Design Systems', count: '4 events' },
    { id: 'siemens-eda', name: 'Siemens EDA', count: '4 events' },
    { id: 'microchip', name: 'Microchip Technology', count: '3 events' },
    { id: 'skyworks', name: 'Skyworks Solutions', count: '3 events' },
    { id: 'synopsys', name: 'Synopsys', count: '3 events' },
    { id: 'broadcom', name: 'Broadcom', count: '2 events' },
    { id: 'qualcomm', name: 'Qualcomm', count: '2 events' },
    { id: 'sitime', name: 'SiTime', count: '2 events' },
    { id: 'mediatek', name: 'MediaTek', count: '1 event' },
    { id: 'nvidia', name: 'NVIDIA', count: '1 event' },
  ];

  const pickerOrder = () => page.locator('[data-company-options] label').evaluateAll((labels) => labels.map((label) => ({
    id: label.querySelector('input')?.value,
    name: label.querySelector('span')?.textContent?.trim(),
    count: label.querySelector('small')?.textContent?.trim(),
  })));

  for (const path of ['./', './events/']) {
    await page.goto(path);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    expect(await pickerOrder()).toEqual(expectedActive);
    await expect(page.locator('.company-records')).toHaveCount(0);

    await page.locator('[data-search]').fill('RNM');
    await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('RNM');
    expect(await pickerOrder()).toEqual(expectedActive);
  }

  await page.goto('./');
  await expectExplorerReady(page);
  const lanes = await page.locator('[data-group="companies"] [data-lane]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-entity-id')));
  expect(lanes).toEqual(expectedActive.map(({ id }) => id));
});

test('zero-Event researched Company pages still build without primary Timeline links', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);
  await expect(page.locator('a[href$="/companies/omnivision/"]')).toHaveCount(0);
  await expect(page.locator('a[href$="/companies/sony-semiconductor-solutions/"]')).toHaveCount(0);

  for (const company of [
    { id: 'omnivision', name: 'OMNIVISION' },
    { id: 'sony-semiconductor-solutions', name: 'Sony Semiconductor Solutions' },
  ]) {
    await page.goto(`./companies/${company.id}/`);
    await expect(page).toHaveTitle(`${company.name} · AMS Signals`);
    await expect(page.getByRole('heading', { name: company.name, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No Golden events are currently indexed' })).toBeVisible();
  }
});

test('Timeline uses fixed density-adjusted segments and one-row shared Event slots', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  const segments = await page.locator('[data-timeline-segment]').evaluateAll((nodes) => nodes.map((node) => ({
    label: node.getAttribute('data-segment-label'),
    key: node.getAttribute('data-segment-key'),
    count: Number(node.getAttribute('data-event-count')),
    width: Number(node.getAttribute('data-segment-width')),
  })));
  expect(segments.map(({ label }) => label)).toEqual(['≤2020', '2021', '2022', '2023', '2024', '2025', '2026']);
  expect(segments.map(({ count }) => count)).toEqual([13, 2, 2, 4, 3, 4, 15]);
  expect(segments.filter(({ key }) => key === 'through-2020')).toHaveLength(1);
  expect(segments.some(({ label }) => /^20(?:1[2-9]|20)$/.test(label))).toBe(false);
  expect(segments.find(({ label }) => label === '2026').width)
    .toBeGreaterThan(segments.find(({ label }) => label === '2021').width * 3);
  const historicalWidth = segments.find(({ label }) => label === '≤2020').width;
  const latestWidth = segments.find(({ label }) => label === '2026').width;
  expect(historicalWidth).toBeGreaterThanOrEqual(300);
  expect(historicalWidth).toBeLessThanOrEqual(330);
  expect(latestWidth).toBeGreaterThanOrEqual(550);
  expect(latestWidth).toBeLessThanOrEqual(570);
  expect(historicalWidth).toBeLessThan(latestWidth * 0.6);

  const lanes = await page.locator('[data-group="companies"] [data-lane]').evaluateAll((nodes) => nodes.map((lane) => ({
    entity: lane.getAttribute('data-entity-id'),
    height: lane.getBoundingClientRect().height,
    inlineStyle: lane.getAttribute('style') || '',
  })));
  expect(new Set(lanes.map(({ height }) => height))).toEqual(new Set([46]));
  expect(lanes.every(({ inlineStyle }) => !inlineStyle.includes('lane-rows'))).toBe(true);
  expect(lanes.find(({ entity }) => entity === 'apple').height)
    .toBe(lanes.find(({ entity }) => entity === 'nvidia').height);

  const sharedMarks = page.locator('[data-group="companies"] [data-event-mark][data-event-id="ecosystem-2025-02-uvm-ms-1-standard"]');
  expect(await sharedMarks.count()).toBeGreaterThan(1);
  const sharedPositions = await sharedMarks.evaluateAll((nodes) => nodes.map((node) => ({
    x: node.getAttribute('data-event-x'),
    offsetLeft: node.offsetLeft,
  })));
  expect(new Set(sharedPositions.map(({ x }) => x)).size).toBe(1);
  expect(new Set(sharedPositions.map(({ offsetLeft }) => offsetLeft)).size).toBe(1);

  const orderedSlots = await page.locator('[data-event-mark]').evaluateAll((nodes) => {
    const unique = new Map();
    nodes.forEach((node) => {
      const id = node.getAttribute('data-event-id');
      if (!unique.has(id)) {
        unique.set(id, {
          id,
          date: node.getAttribute('data-event-date'),
          segment: node.getAttribute('data-segment-key'),
          x: Number(node.getAttribute('data-event-x')),
        });
      }
    });
    return [...unique.values()];
  });
  expect(orderedSlots).toHaveLength(43);
  const historicalSlots = orderedSlots
    .filter((entry) => entry.segment === 'through-2020')
    .sort((left, right) => left.x - right.x);
  const historicalGaps = historicalSlots.slice(1).map((entry, index) => entry.x - historicalSlots[index].x);
  expect(historicalSlots).toHaveLength(13);
  expect(Math.min(...historicalGaps)).toBeGreaterThanOrEqual(20);
  for (const segment of segments) {
    const entries = orderedSlots.filter((entry) => entry.segment === segment.key);
    const chronologicalIds = entries.slice().sort((left, right) => (
      left.date.localeCompare(right.date) || left.id.localeCompare(right.id)
    )).map(({ id }) => id);
    const positionedIds = entries.slice().sort((left, right) => left.x - right.x).map(({ id }) => id);
    expect(positionedIds, `slot order in ${segment.label}`).toEqual(chronologicalIds);
  }
});

test('search and Company Focus filtering never change Timeline geometry', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  const geometry = () => page.locator('[data-timeline-root]').evaluate((root) => ({
    width: root.querySelector('.desktop-timeline')?.getAttribute('data-timeline-width'),
    segments: [...root.querySelectorAll('[data-timeline-segment]')].map((segment) => ({
      key: segment.getAttribute('data-segment-key'),
      width: segment.getAttribute('data-segment-width'),
    })),
    lanes: [...root.querySelectorAll('[data-lane]')].map((lane) => `${lane.getAttribute('data-lane-type')}:${lane.getAttribute('data-entity-id')}`),
    marks: [...root.querySelectorAll('[data-event-mark]')].map((mark) => ({
      lane: mark.closest('[data-lane]')?.getAttribute('data-entity-id'),
      id: mark.getAttribute('data-event-id'),
      x: mark.getAttribute('data-event-x'),
      segment: mark.getAttribute('data-segment-key'),
      slot: mark.getAttribute('data-slot'),
    })),
  }));
  const initial = await geometry();

  await page.locator('[data-search]').fill('RNM');
  expect(await geometry()).toEqual(initial);
  await page.locator('[data-search]').fill('PLL');
  expect(await geometry()).toEqual(initial);

  await page.locator('[data-company-picker] summary').click();
  await page.locator('[data-company-options] input[value="apple"]').uncheck();
  expect(await geometry()).toEqual(initial);
});

test('Timeline scrolling is local, opens on recent Events, and preserves user position', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  const scroller = page.locator('[data-timeline-scroll]');
  await expect(scroller).toHaveAttribute('data-initial-scroll', 'complete');
  const initial = await scroller.evaluate((node) => ({
    clientWidth: node.clientWidth,
    scrollWidth: node.scrollWidth,
    scrollLeft: node.scrollLeft,
  }));
  expect(initial.scrollWidth).toBeGreaterThan(initial.clientWidth);
  expect(initial.scrollLeft).toBeGreaterThan(0);
  expect(Math.abs(initial.scrollLeft - (initial.scrollWidth - initial.clientWidth))).toBeLessThanOrEqual(1);
  const recentVisibility = await page.locator('[data-timeline-scroll]').evaluate((node) => {
    const scroller = node.getBoundingClientRect();
    return ['2025', '2026'].map((label) => {
      const segment = node.querySelector(`[data-segment-label="${label}"]`)?.getBoundingClientRect();
      return Boolean(segment && segment.right > scroller.left && segment.left < scroller.right);
    });
  });
  expect(recentVisibility).toEqual([true, true]);
  expect(await page.locator('[data-timeline-scroll] [data-detail]').count()).toBe(0);
  await expect(page.locator('[data-detail]')).toBeVisible();

  const label = page.locator('[data-lane][data-entity-id="apple"] .lane-label');
  const labelLeft = (await label.boundingBox()).x;
  await scroller.evaluate((node) => { node.scrollLeft = 400; });
  expect(Math.abs((await label.boundingBox()).x - labelLeft)).toBeLessThanOrEqual(1);
  await page.locator('[data-search]').fill('RNM');
  const afterFilter = await scroller.evaluate((node) => node.scrollLeft);
  expect(Math.abs(afterFilter - 400)).toBeLessThanOrEqual(1);

  const documentWidth = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(documentWidth.scrollWidth).toBe(documentWidth.clientWidth);

  await page.locator('[data-view]').selectOption('people');
  await expect(page.locator('[data-group="people"]')).toBeVisible();
  const peopleHeights = await page.locator('[data-group="people"] [data-lane]:visible').evaluateAll((nodes) => (
    nodes.map((node) => node.getBoundingClientRect().height)
  ));
  expect(peopleHeights.length).toBeGreaterThan(0);
  expect(new Set(peopleHeights)).toEqual(new Set([46]));
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
  const timelineWidths = await page.locator('[data-timeline-scroll]').evaluate((element) => ({
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
