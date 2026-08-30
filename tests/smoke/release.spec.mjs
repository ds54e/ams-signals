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
  await expect(page.locator('[data-status]')).toHaveText(/\d+ of \d+ events?/);
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
  await expect(page.locator('[data-detail-title]')).toContainText("MediaTek's careers site");
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
  await expect(page.getByText('CHRONOLOGICAL RECORD', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Visible events', { exact: true })).toHaveCount(0);
  await expect(page.locator('.result-heading')).toHaveCount(0);
  const resultSection = page.locator('.result-section[aria-label="Events"]');
  await expect(resultSection).toBeVisible();
  await expect(resultSection.locator(':scope > :first-child')).toHaveClass('result-list');
  expect(await resultSection.evaluate((section) => section.previousElementSibling?.classList.contains('event-filter-summary'))).toBe(true);
  await expect(page.locator('[data-status]')).toHaveText('43 of 43 events');
  await expect(page.locator('.event-filter-summary')).toContainText('Newest first');

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
    kind: 'technical',
    q: 'PLL',
    view: 'companies',
  };
  await page.goto('./?companies=apple,renesas&kind=technical&q=PLL&view=companies');
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
    await page.locator('[data-kind]').selectOption('technical');
    await page.locator('[data-view]').selectOption('both');
    await page.locator('[data-company-picker] summary').click();

    const checks = page.locator('[data-company-options] input');
    const checked = page.locator('[data-company-options] input:checked');
    const totalCompanies = await checks.count();
    await expect(page.getByRole('button', { name: 'All companies', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await expect(checked).toHaveCount(0);
    await expect(page.locator('[data-status]')).toHaveText('0 of 43 events');
    expect(new URL(page.url()).searchParams.get('companies')).toBe('none');
    if (surface === 'timeline') {
      await expect(page.locator('[data-event-mark]:visible')).toHaveCount(0);
    } else {
      await expect(page.locator('[data-event-result]:visible')).toHaveCount(0);
      await expect(page.locator('[data-filtered-empty]')).toBeVisible();
    }

    await page.getByRole('button', { name: 'All companies', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-status]')).not.toHaveText('0 of 43 events');
    expect(new URL(page.url()).searchParams.has('companies')).toBe(false);

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await page.locator('[data-company-picker] summary').click();
    await page.locator('[data-reset]').click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-search]')).toHaveValue('');
    await expect(page.locator('[data-kind]')).toHaveValue('all');
    await expect(page.locator('[data-view]')).toHaveValue('both');
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

test('Timeline uses newest-first chronological packing with immutable shared Event positions', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  const timelineWidth = Number(await page.locator('.desktop-timeline').getAttribute('data-timeline-width'));
  const segments = await page.locator('[data-timeline-segment]').evaluateAll((nodes) => nodes.map((node) => ({
    label: node.getAttribute('data-segment-label'),
    key: node.getAttribute('data-segment-key'),
    count: Number(node.getAttribute('data-event-count')),
    width: Number(node.getAttribute('data-segment-width')),
  })));
  expect(segments.map(({ label }) => label)).toEqual(['2026', '2025', '2024', '2023', '2022', '2021', '≤2020']);
  expect(segments.map(({ count }) => count)).toEqual([15, 4, 3, 4, 2, 2, 13]);
  expect(segments.filter(({ key }) => key === 'through-2020')).toHaveLength(1);
  expect(segments.at(-1).key).toBe('through-2020');
  expect(segments.some(({ label }) => /^20(?:1[2-9]|20)$/.test(label))).toBe(false);

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
          band: Number(node.getAttribute('data-band')),
          microSlot: Number(node.getAttribute('data-micro-slot')),
        });
      }
    });
    return [...unique.values()];
  });
  expect(orderedSlots).toHaveLength(43);
  expect(new Set(orderedSlots.map(({ x }) => x)).size, 'different Event IDs have unique x positions').toBe(43);
  expect(timelineWidth, 'packed track is narrower than one 34px slot per Event').toBeLessThan(orderedSlots.length * 34);
  for (const segment of segments) {
    const entries = orderedSlots.filter((entry) => entry.segment === segment.key);
    const chronologicalIds = entries.slice().sort((left, right) => (
      right.date.localeCompare(left.date) || left.id.localeCompare(right.id)
    )).map(({ id }) => id);
    const positionedIds = entries.slice().sort((left, right) => left.x - right.x).map(({ id }) => id);
    expect(positionedIds, `newest-first packed order in ${segment.label}`).toEqual(chronologicalIds);
  }

  const lanePacking = await page.locator('[data-lane]').evaluateAll((laneNodes) => laneNodes.map((lane) => {
    const marks = [...lane.querySelectorAll('[data-event-mark]')].map((mark) => ({
      id: mark.getAttribute('data-event-id'),
      segment: mark.getAttribute('data-segment-key'),
      band: mark.getAttribute('data-band'),
      left: mark.getBoundingClientRect().left,
      right: mark.getBoundingClientRect().right,
    }));
    return {
      lane: `${lane.getAttribute('data-lane-type')}:${lane.getAttribute('data-entity-id')}`,
      marks,
    };
  }));
  for (const lane of lanePacking) {
    for (const segment of segments) {
      const marks = lane.marks.filter((mark) => mark.segment === segment.key);
      expect(new Set(marks.map(({ band }) => band)).size, `${lane.lane} has one Event per packed band`)
        .toBe(marks.length);
      const positioned = marks.slice().sort((left, right) => left.left - right.left);
      for (let index = 1; index < positioned.length; index += 1) {
        expect(positioned[index].left, `${lane.lane} marks do not overlap`).toBeGreaterThanOrEqual(positioned[index - 1].right);
      }
    }
  }

  const firstCompanyLaneIds = await page.locator('[data-group="companies"] [data-lane]').first()
    .locator('[data-event-mark]').evaluateAll((marks) => marks.map((mark) => ({
      id: mark.getAttribute('data-event-id'),
      date: mark.getAttribute('data-event-date'),
    })));
  expect(firstCompanyLaneIds).toEqual(firstCompanyLaneIds.slice().sort((left, right) => (
    right.date.localeCompare(left.date) || left.id.localeCompare(right.id)
  )));
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
      band: mark.getAttribute('data-band'),
      microSlot: mark.getAttribute('data-micro-slot'),
    })),
  }));
  const initial = await geometry();

  await page.locator('[data-search]').fill('RNM');
  expect(await geometry()).toEqual(initial);
  await page.locator('[data-search]').fill('PLL');
  expect(await geometry()).toEqual(initial);

  await page.locator('[data-kind]').selectOption('technical');
  expect(await geometry()).toEqual(initial);

  await page.locator('[data-company-picker] summary').click();
  await page.locator('[data-company-options] input[value="apple"]').uncheck();
  expect(await geometry()).toEqual(initial);

  await page.locator('[data-view]').selectOption('people');
  expect(await geometry()).toEqual(initial);
  await page.locator('[data-view]').selectOption('both');
  expect(await geometry()).toEqual(initial);
});

test('Timeline starts at newest-left, reveals an initial older match once, and preserves user scroll', async ({ page }) => {
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
  expect(initial.scrollLeft).toBe(0);
  const recentVisibility = await page.locator('[data-timeline-scroll]').evaluate((node) => {
    const scroller = node.getBoundingClientRect();
    return ['2026'].map((label) => {
      const segment = node.querySelector(`[data-segment-label="${label}"]`)?.getBoundingClientRect();
      return Boolean(segment && segment.right > scroller.left && segment.left < scroller.right);
    });
  });
  expect(recentVisibility).toEqual([true]);
  expect(await page.locator('[data-timeline-scroll] [data-detail]').count()).toBe(0);
  await expect(page.locator('[data-detail]')).toBeVisible();

  const label = page.locator('[data-lane][data-entity-id="apple"] .lane-label');
  const labelLeft = (await label.boundingBox()).x;
  const userPosition = await scroller.evaluate((node) => {
    const position = Math.max((node.scrollWidth - node.clientWidth) / 2, 1);
    node.scrollLeft = position;
    return node.scrollLeft;
  });
  expect(userPosition).toBeGreaterThan(0);
  expect(Math.abs((await label.boundingBox()).x - labelLeft)).toBeLessThanOrEqual(1);
  await page.locator('[data-search]').fill('RNM');
  const afterFilter = await scroller.evaluate((node) => node.scrollLeft);
  expect(Math.abs(afterFilter - userPosition)).toBeLessThanOrEqual(1);
  await page.locator('[data-kind]').selectOption('technical');
  expect(Math.abs(await scroller.evaluate((node) => node.scrollLeft) - userPosition)).toBeLessThanOrEqual(1);
  await page.locator('[data-company-picker] summary').click();
  await page.locator('[data-company-options] input[value="apple"]').uncheck();
  expect(Math.abs(await scroller.evaluate((node) => node.scrollLeft) - userPosition)).toBeLessThanOrEqual(1);
  await page.locator('[data-view]').selectOption('people');
  expect(Math.abs(await scroller.evaluate((node) => node.scrollLeft) - userPosition)).toBeLessThanOrEqual(1);

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

  await page.goto('./?q=floating-point');
  await expectExplorerReady(page);
  await expect(page.locator('[data-timeline-scroll]')).toHaveAttribute(
    'data-initial-reveal',
    'cadence-2012-real-valued-systemverilog-coverage',
  );
  expect(await page.locator('[data-timeline-scroll]').evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
});

test('Timeline defaults to a continuous Company and People lane stack with centered baselines', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'both');
  await expect(page.locator('[data-view]')).toHaveValue('both');
  await expect(page.locator('[data-group="companies"]')).toBeVisible();
  await expect(page.locator('[data-group="people"]')).toBeVisible();
  await expect(page.locator('.lane-group-row, .lane-group-label, [data-group-label]')).toHaveCount(0);
  await expect(page.locator('.timeline-axis .axis-label')).toHaveText('');
  await expect(page.getByText('Record', { exact: true })).toHaveCount(0);
  const guides = await page.locator('[data-lane-type="company"]:visible, [data-lane-type="person"]:visible').evaluateAll((lanes) => (
    ['company', 'person'].map((laneType) => {
      const lane = lanes.find((candidate) => candidate.dataset.laneType === laneType);
      const laneStyle = getComputedStyle(lane);
      const baselineStyle = getComputedStyle(lane.querySelector('.lane-track'), '::before');
      const segmentStyle = getComputedStyle(lane.querySelector('.timeline-segment-grid span'));
      return {
        laneType,
        laneBorderWidth: laneStyle.borderBottomWidth,
        laneBorderStyle: laneStyle.borderBottomStyle,
        baselineContent: baselineStyle.content,
        baselineTop: baselineStyle.top,
        baselineBorderWidth: baselineStyle.borderTopWidth,
        baselineBorderStyle: baselineStyle.borderTopStyle,
        baselineBorderColor: baselineStyle.borderTopColor,
        segmentBorderWidth: segmentStyle.borderRightWidth,
        segmentBorderStyle: segmentStyle.borderRightStyle,
      };
    })
  ));
  for (const guide of guides) {
    expect(guide.laneBorderWidth, `${guide.laneType} lane bottom border`).toBe('0px');
    expect(guide.laneBorderStyle, `${guide.laneType} lane bottom border`).toBe('none');
    expect(guide.baselineContent, `${guide.laneType} lane baseline content`).toBe('""');
    expect(guide.baselineTop, `${guide.laneType} lane baseline position`).toBe('23px');
    expect(guide.baselineBorderWidth, `${guide.laneType} lane baseline width`).toBe('1px');
    expect(guide.baselineBorderStyle, `${guide.laneType} lane baseline style`).toBe('solid');
    expect(guide.baselineBorderColor, `${guide.laneType} lane baseline color`).not.toBe('rgba(0, 0, 0, 0)');
    expect(guide.segmentBorderWidth, `${guide.laneType} segment guide width`).toBe('1px');
    expect(guide.segmentBorderStyle, `${guide.laneType} segment guide style`).toBe('solid');
  }

  const peopleGroup = page.locator('[data-group="people"]');
  await expect(peopleGroup).not.toHaveClass(/has-group-gap/);
  await expect(peopleGroup).toHaveCSS('padding-top', '0px');
  const groupGap = await page.evaluate(() => {
    const companyLanes = [...document.querySelectorAll('[data-group="companies"] [data-lane]:not([hidden])')];
    const personLane = document.querySelector('[data-group="people"] [data-lane]:not([hidden])');
    return personLane.getBoundingClientRect().top - companyLanes.at(-1).getBoundingClientRect().bottom;
  });
  expect(Math.abs(groupGap)).toBeLessThanOrEqual(1);
});

test('global explorer supports every explicit view and resets to both', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';

    await page.goto(path);
    await expectExplorerReady(page, surface);
    await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'both');
    await expect(page.locator('[data-view]')).toHaveValue('both');
    expect(new URL(page.url()).searchParams.has('view')).toBe(false);

    for (const view of ['companies', 'people', 'both']) {
      await page.goto(`${path}?view=${view}`);
      await expectExplorerReady(page, surface);
      await expect(page.locator('[data-view]')).toHaveValue(view);

      if (surface === 'timeline') {
        if (view === 'people') await expect(page.locator('[data-group="companies"]')).toBeHidden();
        else await expect(page.locator('[data-group="companies"]')).toBeVisible();

        if (view === 'companies') await expect(page.locator('[data-group="people"]')).toBeHidden();
        else await expect(page.locator('[data-group="people"]')).toBeVisible();
      }
    }

    await page.locator('[data-search]').fill('PLL');
    await page.locator('[data-view]').selectOption('companies');
    await page.locator('[data-reset]').click();
    await expect(page.locator('[data-view]')).toHaveValue('both');
    expect(new URL(page.url()).search).toBe('');
  }
});

test('Company Focus panel owns overlapping pixels above every Timeline stacking context', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  await page.locator('[data-company-picker] summary').click();
  const panel = page.locator('.company-picker-panel');
  await expect(panel).toBeVisible();
  await expect(page.getByText('Select companies to focus. Shared Events remain one factual record.', { exact: true })).toHaveCount(0);

  const overlap = await page.evaluate(() => {
    const pickerPanel = document.querySelector('.company-picker-panel');
    const timeline = document.querySelector('.timeline-scroll');
    const panelRect = pickerPanel.getBoundingClientRect();
    const timelineRect = timeline.getBoundingClientRect();
    const left = Math.max(panelRect.left, timelineRect.left);
    const right = Math.min(panelRect.right, timelineRect.right);
    const top = Math.max(panelRect.top, timelineRect.top);
    const bottom = Math.min(panelRect.bottom, timelineRect.bottom);
    const x = left + Math.min(24, Math.max((right - left) / 2, 1));
    const y = top + Math.min(24, Math.max((bottom - top) / 2, 1));
    const topElement = document.elementFromPoint(x, y);
    return {
      hasOverlap: right > left && bottom > top,
      x,
      y,
      topElement: topElement?.tagName,
      insidePanel: Boolean(topElement?.closest('.company-picker-panel')),
    };
  });
  expect(overlap.hasOverlap).toBe(true);
  expect(overlap.insidePanel, `elementFromPoint(${overlap.x}, ${overlap.y}) was ${overlap.topElement}`).toBe(true);
});

test('Signal type taxonomy is binary, shape-distinct, canonical, and legacy-query compatible', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  await expect(page.getByText('fixed while filtering', { exact: true })).toHaveCount(0);
  const options = await page.locator('[data-kind] option').allTextContents();
  expect(options).toEqual(['All signals', 'Technical', 'Organizational']);
  const serializedKinds = await page.locator('[data-events-json]').evaluate((node) => (
    JSON.parse(node.textContent).map((event) => event.kind)
  ));
  expect(serializedKinds).toHaveLength(43);
  expect(new Set(serializedKinds)).toEqual(new Set(['technical', 'organizational']));
  expect(serializedKinds.filter((kind) => kind === 'technical')).toHaveLength(23);
  expect(serializedKinds.filter((kind) => kind === 'organizational')).toHaveLength(20);

  const legend = page.locator('.kind-legend');
  await expect(legend.locator('span')).toHaveCount(2);
  expect(await legend.locator('span').allTextContents()).toEqual(['Technical', 'Organizational']);
  const shapes = await legend.locator('.legend-mark').evaluateAll((marks) => marks.map((mark) => ({
    kind: mark.classList.contains('event-kind-technical') ? 'technical' : 'organizational',
    borderRadius: getComputedStyle(mark).borderRadius,
    backgroundColor: getComputedStyle(mark).backgroundColor,
  })));
  expect(shapes[0].borderRadius).not.toBe(shapes[1].borderRadius);
  expect(shapes[0].backgroundColor).not.toBe(shapes[1].backgroundColor);

  await page.locator('[data-kind]').selectOption('technical');
  await expect(page.locator('[data-status]')).toHaveText('23 of 43 events');
  await page.locator('[data-kind]').selectOption('organizational');
  await expect(page.locator('[data-status]')).toHaveText('20 of 43 events');
  const organizationalMark = page.locator('[data-event-mark].event-kind-organizational:visible').first();
  await organizationalMark.click();
  await expect(page.locator('[data-detail-meta]')).toContainText('Organizational');

  const aliases = new Map([
    ['publication', 'technical'],
    ['conference', 'technical'],
    ['hiring', 'organizational'],
    ['affiliation_change', 'organizational'],
    ['organization', 'organizational'],
    ['business', 'organizational'],
  ]);
  for (const [legacy, canonical] of aliases) {
    await page.goto(`./?kind=${legacy}`);
    await expectExplorerReady(page);
    await expect(page.locator('[data-kind]')).toHaveValue(canonical);
    expect(new URL(page.url()).searchParams.get('kind')).toBe(canonical);
  }

  await page.goto('./?kind=other');
  await expectExplorerReady(page);
  await expect(page.locator('[data-kind]')).toHaveValue('all');
  expect(new URL(page.url()).searchParams.has('kind')).toBe(false);

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  expect(new Set(await page.locator('.kind-badge').allTextContents())).toEqual(new Set(['Technical', 'Organizational']));
  await page.goto('./events/ecosystem-2025-02-uvm-ms-1-standard/');
  await expect(page.locator('.event-meta')).toContainText('Technical');
  await page.goto('./events/sitime-2026-07-renesas-timing-acquisition/');
  await expect(page.locator('.event-meta')).toContainText('Organizational');
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
  const contextGeometry = () => page.locator('[data-timeline-root]').evaluate((root) => ({
    width: root.querySelector('.desktop-timeline')?.getAttribute('data-timeline-width'),
    segments: [...root.querySelectorAll('[data-timeline-segment]')].map((segment) => (
      `${segment.getAttribute('data-segment-key')}:${segment.getAttribute('data-segment-width')}`
    )),
    marks: [...root.querySelectorAll('[data-event-mark]')].map((mark) => (
      `${mark.getAttribute('data-event-id')}:${mark.getAttribute('data-event-x')}:${mark.getAttribute('data-band')}:${mark.getAttribute('data-micro-slot')}`
    )),
  }));

  await page.goto('./companies/apple/');
  await expectExplorerReady(page);
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-context', 'company');
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'companies');
  await expect(page.locator('[data-group="companies"]')).toBeVisible();
  await expect(page.locator('[data-group="people"]')).toBeHidden();
  await expect(page.locator('.result-section')).toHaveCount(0);
  const appleGeometry = await contextGeometry();
  await page.locator('[data-search]').fill('PMU');
  await page.locator('[data-kind]').selectOption('organizational');
  expect(await contextGeometry()).toEqual(appleGeometry);

  await page.goto('./people/toshi-kawashima/');
  await expectExplorerReady(page);
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-context', 'person');
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'people');
  await expect(page.locator('[data-group="people"]')).toBeVisible();
  await expect(page.locator('[data-group="companies"]')).toBeHidden();

  await page.goto('./people/prabal-bhattacharya/');
  await expectExplorerReady(page);
  const prabalGeometry = await contextGeometry();
  await page.locator('[data-search]').fill('Skyworks');
  expect(await contextGeometry()).toEqual(prabalGeometry);

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
    await page.goto(`${path}?companies=apple,renesas&kind=technical&q=PLL&view=both`);
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
    await expect(page.locator('[data-view]')).toHaveValue('both');
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
