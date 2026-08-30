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
    [...new Set(marks.flatMap((mark) => {
      if (!mark.hasAttribute('data-matrix-mark')) return [mark.getAttribute('data-event-id')].filter(Boolean);
      try {
        return JSON.parse(mark.getAttribute('data-visible-event-ids') || '[]');
      } catch {
        return [];
      }
    }))].sort()
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
  await expect(page.locator('.site-header nav a')).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Analysis', exact: true })).toHaveCount(0);

  await expect(page.locator('[data-activity-matrix-surface]')).toBeVisible();
  await expect(page.locator('.desktop-timeline')).toHaveCount(0);
  await expect(page.locator('[data-detail]')).toHaveCount(1);
  await expect(page.locator('[data-group="companies"] [data-matrix-row]:visible').first())
    .toHaveAttribute('data-entity-id', 'apple');
  await expect(page.locator('[data-detail-title]')).toContainText('cross-team AMS simulation methodology');
  await expect(page.locator('.result-section')).toHaveCount(0);
  await expect(page.locator('.company-records')).toHaveCount(0);
  await expect(page.getByText('Visible events', { exact: true })).toHaveCount(0);
  await expect(page.getByText('CHRONOLOGICAL RECORD', { exact: true })).toHaveCount(0);

  const internalHrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors
    .map((anchor) => anchor.getAttribute('href'))
    .filter((href) => href?.startsWith('/')));
  expect(internalHrefs.every((href) => href.startsWith(basePath))).toBe(true);
});

test('Analysis routes and stale internal links are absent', async ({ page }) => {
  for (const path of ['./', './events/']) {
    await page.goto(path);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    await expect(page.locator('a[href*="/analysis/"]')).toHaveCount(0);
    await expect(page.locator('.site-header nav a')).toHaveText(['Timeline', 'Events']);
  }

  const indexResponse = await page.request.get('./analysis/');
  const articleResponse = await page.request.get('./analysis/from-behavioral-models-to-managed-verification-assets/');
  expect(indexResponse.status()).toBe(404);
  expect(articleResponse.status()).toBe(404);
});

test('canonical JSON export contains the complete factual corpus', async ({ page }) => {
  const response = await page.request.get('./export.json');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const payload = await response.json();
  expect(Object.keys(payload)).toEqual(['schemaVersion', 'project', 'companies', 'people', 'events']);
  expect(payload.schemaVersion).toBe(1);
  expect(payload.project).toEqual({
    name: 'AMS Signals',
    scope: 'Public factual signals in RNM and mixed-signal verification.',
    notes: expect.any(Array),
  });
  expect(payload.project.notes).toHaveLength(4);
  expect(payload).not.toHaveProperty('analysis');
  expect(payload.companies).toHaveLength(42);
  expect(payload.people).toHaveLength(18);
  expect(payload.events).toHaveLength(90);

  expect(payload.companies.map(({ name }) => name)).toEqual(
    payload.companies.map(({ name }) => name).slice().sort((left, right) => left.localeCompare(right, 'en')),
  );
  expect(payload.people.map(({ name }) => name)).toEqual(
    payload.people.map(({ name }) => name).slice().sort((left, right) => left.localeCompare(right, 'en')),
  );
  expect(payload.events.map(({ id }) => id)).toEqual(payload.events.slice().sort((left, right) => (
    right.when.start.localeCompare(left.when.start) || left.id.localeCompare(right.id, 'en')
  )).map(({ id }) => id));

  expect(payload.events.filter(({ kind }) => kind === 'technical')).toHaveLength(65);
  expect(payload.events.filter(({ kind }) => kind === 'organizational')).toHaveLength(25);
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining([
    'bosch-sensortec',
    'cirrus-logic',
    'dialog-semiconductor',
    'hitachi',
    'kioxia',
    'rohm',
    'toppan',
  ]));
  expect(payload.people.map(({ id }) => id)).toEqual(expect.arrayContaining([
    'carsten-wegener',
    'felix-assmann',
    'gautham-sathyan',
    'keiichi-kajino',
    'selcuk-talay',
    'tomokatsu-mizukusa',
  ]));
  const japanWaveEventIds = [
    'sony-semiconductor-solutions-2022-cis-rnm-spec-verification',
    'sony-semiconductor-solutions-2024-automotive-cis-analog-fault-verification',
    'kioxia-2025-flash-memory-ams-cosim-verification',
    'toppan-2025-cis-full-chip-mixed-signal-verification',
    'hitachi-2015-rnm-full-chip-mixed-signal-verification',
    'renesas-2023-sv-udn-rnm-power-switched-capacitor-modeling',
    'rohm-2022-model-based-mixed-signal-ic-verification',
    'sitime-2023-keiichi-kajino-japan-verification-manager',
    'renesas-2011-2014-mizukusa-wreal-uvm-ams-verification',
  ];
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(japanWaveEventIds));
  const overseasPeopleWaveEventIds = [
    'apple-2026-pmu-ams-design-verification-team-hiring',
    'bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification',
    'bosch-sensortec-2026-agentic-ai-mixed-signal-verification-hiring',
    'cirrus-logic-2026-top-down-mixed-signal-verification',
    'dialog-semiconductor-2014-selcuk-talay-ams-top-level-dv-lead',
    'dialog-semiconductor-2016-mixed-signal-model-validation',
  ];
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(overseasPeopleWaveEventIds));
  const overseasPeopleWaveEvents = new Map(payload.events
    .filter(({ id }) => overseasPeopleWaveEventIds.includes(id))
    .map((event) => [event.id, event]));
  expect(overseasPeopleWaveEvents.size).toBe(6);
  expect(overseasPeopleWaveEvents.get('cirrus-logic-2026-top-down-mixed-signal-verification')).toEqual(
    expect.objectContaining({ companies: ['cirrus-logic'], people: ['gautham-sathyan'] }),
  );
  expect(overseasPeopleWaveEvents.get('dialog-semiconductor-2014-selcuk-talay-ams-top-level-dv-lead')).toEqual(
    expect.objectContaining({ companies: ['dialog-semiconductor'], people: ['selcuk-talay'] }),
  );
  expect(overseasPeopleWaveEvents.get('apple-2026-pmu-ams-design-verification-team-hiring')).toEqual(
    expect.objectContaining({ companies: ['apple'], people: ['selcuk-talay'] }),
  );
  expect(overseasPeopleWaveEvents.get('bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification')).toEqual(
    expect.objectContaining({ companies: ['bosch-sensortec', 'cadence'], people: ['felix-assmann'] }),
  );
  expect(overseasPeopleWaveEvents.get('bosch-sensortec-2026-agentic-ai-mixed-signal-verification-hiring')).toEqual(
    expect.objectContaining({ companies: ['bosch-sensortec'], people: [] }),
  );
  expect(overseasPeopleWaveEvents.get('dialog-semiconductor-2016-mixed-signal-model-validation')).toEqual(
    expect.objectContaining({ companies: ['dialog-semiconductor'], people: ['carsten-wegener'] }),
  );
  expect([...overseasPeopleWaveEvents.values()].every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  expect(payload.events.filter(({ people }) => people.includes('felix-assmann')).map(({ id }) => id))
    .toEqual(['bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification']);

  const globalWaveCompanyIds = [
    'ams-osram',
    'freescale-semiconductor',
    'google',
    'hewlett-packard',
    'ibm',
    'infineon',
    'intel',
    'lsi',
    'mathworks',
    'maxim-integrated',
    'medtronic',
    'mentor-graphics',
    'meta',
    'roche-sequencing-solutions',
    'samsung',
    'stmicroelectronics',
    'toshiba-electronic-devices-storage',
    'xilinx',
  ];
  const globalWavePeopleIds = [
    'neyaz-khan',
    'scott-little',
    'sebastian-simon',
    'vijay-kumar',
  ];
  const globalWaveEventIds = [
    'freescale-2010-trace-generated-ams-models',
    'freescale-2011-realtime-ams-assertions',
    'medtronic-2011-metric-driven-mixed-signal-verification',
    'lsi-2011-2012-hdd-preamplifier-rnm-verification',
    'maxim-2012-uvm-ms-mixed-signal-soc-verification',
    'ibm-2013-wreal-rnm-mixed-signal-verification',
    'infineon-2014-analog-uvm-model-validation',
    'stmicroelectronics-2014-analog-model-equivalence-validation',
    'texas-instruments-2014-specification-driven-ams-testbench-automation',
    'infineon-2014-upf-power-aware-mixed-signal-verification',
    'texas-instruments-2014-ams-interface-automation',
    'xilinx-2015-octave-rnm-uvm-verification',
    'hewlett-packard-2015-digital-centric-serdes-ams-verification',
    'analog-devices-2016-automatic-real-number-abstraction',
    'infineon-2016-automotive-uvm-ams-verification',
    'texas-instruments-2016-cpf-ams-power-verification',
    'infineon-2018-automated-rnm-generation-validation',
    'texas-instruments-2019-eenet-loading-verification',
    'roche-2019-complex-udn-mixed-signal-verification',
    'dialog-semiconductor-2020-chip-level-analog-regressions',
    'dialog-semiconductor-2020-unified-rtl-dms-ams-testbench',
    'analog-devices-2021-upf-dms-low-power-verification',
    'toshiba-2021-accu-rom-automotive-verification',
    'samsung-2022-ssd-pmic-sv-rnm-verification',
    'samsung-2023-oled-pmic-uvm-mixed-signal-verification',
    'meta-2024-dv-uvm-ams-co-simulation',
    'analog-devices-2024-ai-assisted-ams-verification',
    'samsung-2024-display-pmic-uvm-ams-spice-verification',
    'samsung-2024-sv-udt-eenet-pmic-verification',
    'ams-osram-2025-ams-dms-functional-coverage',
    'cirrus-logic-2025-system-model-reuse-mixed-signal-verification',
    'google-2026-high-speed-phy-rnm-verification-hiring',
    'nxp-2026-advanced-power-ams-verification-lead-hiring',
  ];
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining(globalWaveCompanyIds));
  expect(payload.people.map(({ id }) => id)).toEqual(expect.arrayContaining(globalWavePeopleIds));
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(globalWaveEventIds));

  const globalWaveEvents = payload.events.filter(({ id }) => globalWaveEventIds.includes(id));
  expect(globalWaveEvents).toHaveLength(33);
  expect(globalWaveEvents.filter(({ kind }) => kind === 'technical')).toHaveLength(31);
  expect(globalWaveEvents.filter(({ kind }) => kind === 'organizational')).toHaveLength(2);
  expect(globalWaveEvents.every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  expect(globalWaveEvents.flatMap(({ sources }) => sources).every(({ checkedAt }) => checkedAt === '2026-08-30')).toBe(true);
  expect(payload.events.find(({ id }) => id === 'cadence-2012-real-valued-systemverilog-coverage')).toEqual(
    expect.objectContaining({
      companies: ['cadence', 'intel'],
      people: ['prabal-bhattacharya', 'scott-little'],
    }),
  );
  expect(new Set(payload.events.filter(({ people }) => people.includes('neyaz-khan')).map(({ id }) => id))).toEqual(
    new Set([
      'lsi-2011-2012-hdd-preamplifier-rnm-verification',
      'maxim-2012-uvm-ms-mixed-signal-soc-verification',
    ]),
  );
  expect(new Set(payload.events.filter(({ people }) => people.includes('sebastian-simon')).map(({ id }) => id))).toEqual(
    new Set([
      'infineon-2014-analog-uvm-model-validation',
      'infineon-2018-automated-rnm-generation-validation',
    ]),
  );
  expect(new Set(payload.events.filter(({ people }) => people.includes('vijay-kumar')).map(({ id }) => id))).toEqual(
    new Set([
      'samsung-2022-ssd-pmic-sv-rnm-verification',
      'samsung-2023-oled-pmic-uvm-mixed-signal-verification',
      'samsung-2024-sv-udt-eenet-pmic-verification',
    ]),
  );

  expect(payload.events.map(({ id }) => id)).not.toContain('sitime-2026-07-renesas-timing-acquisition');
  for (const event of payload.events) {
    expect(event).toEqual(expect.objectContaining({
      id: expect.any(String),
      when: expect.any(Object),
      kind: expect.stringMatching(/^(technical|organizational)$/),
      companies: expect.any(Array),
      people: expect.any(Array),
      headline: expect.any(String),
      fact: expect.any(String),
      sources: expect.any(Array),
      recordUrl: `https://ds54e.github.io${basePath}events/${event.id}/`,
    }));
    expect(event.sources.length).toBeGreaterThan(0);
    for (const source of event.sources) {
      expect(source).toEqual(expect.objectContaining({
        title: expect.any(String),
        url: expect.stringMatching(/^https?:\/\//),
        checkedAt: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        summary: expect.any(String),
        status: expect.stringMatching(/^(available|unavailable)$/),
      }));
      expect(Object.hasOwn(source, 'archiveUrl')).toBe(true);
      expect(source.archiveUrl === null || /^https?:\/\//.test(source.archiveUrl)).toBe(true);
    }
  }
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

test('exact-anchor clusters expose independent Events and reduce correctly under filtering', async ({ page }) => {
  const clusterIds = [
    'analog-devices-2016-automatic-real-number-abstraction',
    'analog-devices-2016-sv-rnm-model-validation',
  ];
  await page.goto('./');
  await expectExplorerReady(page);

  const cluster = page.locator(
    `[data-matrix-row][data-entity-id="analog-devices"] [data-matrix-mark][data-event-ids*="${clusterIds[0]}"][data-event-ids*="${clusterIds[1]}"]`,
  );
  await expect(cluster).toBeVisible();
  expect(JSON.parse(await cluster.getAttribute('data-event-ids'))).toEqual(clusterIds);
  expect(JSON.parse(await cluster.getAttribute('data-visible-event-ids'))).toEqual(clusterIds);
  await expect(cluster).toHaveClass(/is-cluster/);
  await expect(cluster).toHaveClass(/event-kind-technical/);
  await expect(cluster).not.toHaveClass(/is-mixed/);

  await cluster.click();
  const clusterControl = page.locator('[data-detail-cluster]');
  await expect(clusterControl).toBeVisible();
  await expect(clusterControl.locator('[data-detail-cluster-count]')).toHaveText('2');
  await expect(clusterControl.locator('option')).toHaveCount(2);
  for (const id of clusterIds) {
    await clusterControl.locator('select').selectOption(id);
    await expect(page.locator('[data-detail-event]')).toHaveAttribute('href', `${basePath}events/${id}/`);
  }

  await page.locator('[data-search]').fill('automatic real-number abstraction');
  await expect.poll(async () => JSON.parse(await cluster.getAttribute('data-visible-event-ids'))).toEqual([clusterIds[0]]);
  await expect(cluster).toHaveClass(/is-single/);
  await expect(cluster).not.toHaveClass(/is-cluster/);
  await expect(cluster.locator('[data-cluster-count]')).toBeHidden();
  await expect(clusterControl).toBeHidden();

  await page.locator('[data-search]').fill('PLL');
  await expect.poll(async () => JSON.parse(await cluster.getAttribute('data-visible-event-ids'))).toEqual([]);
  await expect(cluster).toBeHidden();

  await page.locator('[data-reset]').click();
  const sharedEventId = 'cadence-2012-real-valued-systemverilog-coverage';
  const sharedCluster = page.locator(
    `[data-matrix-row][data-entity-id="cadence"] [data-matrix-mark][data-event-ids*="${sharedEventId}"][data-event-ids*="maxim-2012-uvm-ms-mixed-signal-soc-verification"]`,
  );
  expect(JSON.parse(await sharedCluster.getAttribute('data-event-ids'))).toContain(sharedEventId);
  await sharedCluster.click();
  await page.locator('[data-detail-cluster-select]').selectOption(sharedEventId);
  const containingMarks = page.locator(`[data-matrix-mark][data-event-ids*="${sharedEventId}"]:visible`);
  expect(await containingMarks.count()).toBeGreaterThan(1);
  await expect.poll(() => containingMarks.evaluateAll((marks) => marks.every((mark) => mark.getAttribute('aria-pressed') === 'true')))
    .toBe(true);
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
  await expect(page.locator('[data-status]')).toHaveText('90 of 90 events');
  await expect(page.locator('.event-filter-summary')).toHaveText('90 of 90 events');
  await expect(page.locator('.event-filter-summary > *')).toHaveCount(1);
  await expect(page.locator('.event-filter-summary .kind-legend')).toHaveCount(0);
  await expect(page.getByText('Newest first', { exact: true })).toHaveCount(0);

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
    '?view=people&companies=apple',
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
    await page.locator('[data-view]').selectOption('companies');
    await page.locator('[data-company-picker] summary').click();

    const checks = page.locator('[data-company-options] input');
    const checked = page.locator('[data-company-options] input:checked');
    const totalCompanies = await checks.count();
    await expect(page.getByRole('button', { name: 'All companies', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await expect(checked).toHaveCount(0);
    await expect(page.locator('[data-status]')).toHaveText('0 of 90 events');
    expect(new URL(page.url()).searchParams.get('companies')).toBe('none');
    if (surface === 'timeline') {
      await expect(page.locator('[data-event-mark]:visible')).toHaveCount(0);
    } else {
      await expect(page.locator('[data-event-result]:visible')).toHaveCount(0);
      await expect(page.locator('[data-filtered-empty]')).toBeVisible();
    }

    await page.getByRole('button', { name: 'All companies', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-status]')).not.toHaveText('0 of 90 events');
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

test('full-corpus recent-activity ordering is shared and filter-stable', async ({ page }) => {
  const payload = await (await page.request.get('./export.json')).json();
  const latestYear = Math.max(...payload.events.map((event) => Number(event.when.start.slice(0, 4))));
  const startTimestamp = (value) => {
    const [year, month = '01', day = '01'] = value.split('-').map(Number);
    return Date.UTC(year, month - 1, day);
  };
  const expectedCompanies = payload.companies.map((company) => {
    const linked = payload.events.filter((event) => event.companies.includes(company.id)).sort((left, right) => (
      startTimestamp(right.when.start) - startTimestamp(left.when.start) || left.id.localeCompare(right.id, 'en')
    ));
    return {
      id: company.id,
      name: company.name,
      count: `${linked.length} ${linked.length === 1 ? 'event' : 'events'}`,
      recent3: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 2).length,
      recent5: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 4).length,
      latest: linked[0]?.when.start ?? '',
      latestTimestamp: linked[0] ? startTimestamp(linked[0].when.start) : Number.NEGATIVE_INFINITY,
      total: linked.length,
    };
  }).filter(({ total }) => total > 0).sort((left, right) => (
    right.recent3 - left.recent3
    || right.recent5 - left.recent5
    || right.latestTimestamp - left.latestTimestamp
    || right.total - left.total
    || left.name.localeCompare(right.name, 'en')
    || left.id.localeCompare(right.id, 'en')
  ));
  const expectedPicker = expectedCompanies.map(({ id, name, count }) => ({ id, name, count }));
  const expectedIds = expectedCompanies.map(({ id }) => id);
  expect(expectedIds.slice(0, 10)).toEqual([
    'apple',
    'renesas',
    'siemens-eda',
    'nxp',
    'skyworks',
    'samsung',
    'synopsys',
    'analog-devices',
    'cirrus-logic',
    'cadence',
  ]);
  const expectedPeople = payload.people.map((person) => {
    const linked = payload.events.filter((event) => event.people.includes(person.id)).sort((left, right) => (
      startTimestamp(right.when.start) - startTimestamp(left.when.start) || left.id.localeCompare(right.id, 'en')
    ));
    return {
      id: person.id,
      name: person.name,
      recent3: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 2).length,
      recent5: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 4).length,
      latest: linked[0]?.when.start ?? '',
      latestTimestamp: linked[0] ? startTimestamp(linked[0].when.start) : Number.NEGATIVE_INFINITY,
      total: linked.length,
    };
  }).filter(({ total }) => total > 0).sort((left, right) => (
    right.recent3 - left.recent3
    || right.recent5 - left.recent5
    || right.latestTimestamp - left.latestTimestamp
    || right.total - left.total
    || left.name.localeCompare(right.name, 'en')
    || left.id.localeCompare(right.id, 'en')
  ));
  expect(expectedPeople.map(({ id }) => id).slice(0, 10)).toEqual([
    'peter-grove',
    'vijay-kumar',
    'prabal-bhattacharya',
    'selcuk-talay',
    'gautham-sathyan',
    'marcel-oosterhuis',
    'keiichi-kajino',
    'chuck-mcclish',
    'jun-yan',
    'jakub-dudek',
  ]);

  const pickerOrder = () => page.locator('[data-company-options] label').evaluateAll((labels) => labels.map((label) => ({
    id: label.querySelector('input')?.value,
    name: label.querySelector('span')?.textContent?.trim(),
    count: label.querySelector('small')?.textContent?.trim(),
  })));

  for (const path of ['./', './events/']) {
    await page.goto(path);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    expect(await pickerOrder()).toEqual(expectedPicker);
    await expect(page.locator('.company-records')).toHaveCount(0);

    await page.locator('[data-search]').fill('RNM');
    await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('RNM');
    expect(await pickerOrder()).toEqual(expectedPicker);
  }

  await page.goto('./');
  await expectExplorerReady(page);
  const rows = page.locator('[data-group="companies"] [data-matrix-row]');
  expect(await rows.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-entity-id')))).toEqual(expectedIds);
  expect(await rows.evaluateAll((nodes) => nodes.map((node) => ({
    id: node.getAttribute('data-entity-id'),
    recent3: Number(node.getAttribute('data-recent3')),
    recent5: Number(node.getAttribute('data-recent5')),
    latest: node.getAttribute('data-latest-start'),
    total: Number(node.getAttribute('data-total-events')),
  })))).toEqual(expectedCompanies.map(({ id, recent3, recent5, latest, total }) => ({
    id, recent3, recent5, latest, total,
  })));

  await page.locator('[data-search]').fill('RNM');
  const visibleAfterSearch = await page.locator('[data-group="companies"] [data-matrix-row]:visible')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-entity-id')));
  expect(visibleAfterSearch).toEqual(expectedIds.filter((id) => visibleAfterSearch.includes(id)));

  await page.locator('[data-reset]').click();
  await page.locator('[data-view]').selectOption('people');
  const peopleRows = page.locator('[data-group="people"] [data-matrix-row]');
  expect(await peopleRows.evaluateAll((nodes) => nodes.map((node) => ({
    id: node.getAttribute('data-entity-id'),
    recent3: Number(node.getAttribute('data-recent3')),
    recent5: Number(node.getAttribute('data-recent5')),
    latest: node.getAttribute('data-latest-start'),
    total: Number(node.getAttribute('data-total-events')),
  })))).toEqual(expectedPeople.map(({ id, recent3, recent5, latest, total }) => ({
    id, recent3, recent5, latest, total,
  })));
  await page.locator('[data-search]').fill('verification');
  const visiblePeople = await page.locator('[data-group="people"] [data-matrix-row]:visible')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-entity-id')));
  expect(visiblePeople).toEqual(expectedPeople.map(({ id }) => id).filter((id) => visiblePeople.includes(id)));
});

test('zero-Event researched Company pages still build without primary Timeline links', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);
  await expect(page.locator('a[href$="/companies/omnivision/"]')).toHaveCount(0);
  await expect(page.locator('a[href$="/companies/sony-semiconductor-solutions/"]')).toHaveCount(1);

  for (const company of [
    { id: 'omnivision', name: 'OMNIVISION' },
  ]) {
    await page.goto(`./companies/${company.id}/`);
    await expect(page).toHaveTitle(`${company.name} · AMS Signals`);
    await expect(page.getByRole('heading', { name: company.name, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No Golden events are currently indexed' })).toBeVisible();
  }
});

test('global Activity Matrix uses linear midpoint geometry, sparse ticks, and deterministic collision packing', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  const matrix = page.locator('[data-activity-matrix-surface]');
  await expect(matrix).toHaveAttribute('data-domain-oldest-year', '2010');
  await expect(matrix).toHaveAttribute('data-domain-latest-year', '2026');
  await expect(page.locator('[data-timeline-segment]')).toHaveCount(0);
  const ticks = await page.locator('[data-activity-tick]').evaluateAll((nodes) => nodes.map((node) => ({
    year: Number(node.getAttribute('data-tick-year')),
    x: Number(node.getAttribute('data-tick-x')),
  })));
  expect(ticks.map(({ year }) => year)).toEqual([2026, 2024, 2022, 2020, 2015, 2010]);
  expect(ticks.map(({ x }) => x)).toEqual(ticks.map(({ x }) => x).slice().sort((left, right) => left - right));

  const serialized = await page.locator('[data-events-json]').evaluate((node) => JSON.parse(node.textContent));
  const eventById = new Map(serialized.map((event) => [event.id, event]));
  const domainStart = Date.UTC(2010, 0, 1);
  const domainEnd = Date.UTC(2027, 0, 1);
  const visualTimestamp = (event) => {
    const [year, month = 1, day = 1] = event.start.split('-').map(Number);
    if (event.precision === 'day') return Date.UTC(year, month - 1, day, 12);
    if (event.precision === 'month') {
      const start = Date.UTC(year, month - 1, 1);
      const end = Date.UTC(year, month, 1);
      return start + ((end - start) / 2);
    }
    const start = Date.UTC(year, 0, 1);
    const end = Date.UTC(year + 1, 0, 1);
    return start + ((end - start) / 2);
  };
  const expectedX = (event) => ((domainEnd - visualTimestamp(event)) / (domainEnd - domainStart)) * 100;
  const marks = await page.locator('[data-matrix-mark]').evaluateAll((nodes) => nodes.map((node) => ({
    ids: JSON.parse(node.getAttribute('data-event-ids')),
    x: Number(node.getAttribute('data-event-x')),
    anchor: node.getAttribute('data-anchor-key'),
    slot: Number(node.getAttribute('data-collision-slot')),
    style: node.getAttribute('style'),
    lane: `${node.closest('[data-lane]').getAttribute('data-lane-type')}:${node.closest('[data-lane]').getAttribute('data-entity-id')}`,
  })));
  expect(new Set(marks.flatMap(({ ids }) => ids))).toEqual(new Set(serialized.map(({ id }) => id)));
  for (const mark of marks) {
    expect(mark.style).toContain('--event-x:');
    expect(mark.style).toContain('%');
    expect(mark.style).not.toMatch(/--event-x:[^;]*px/);
    for (const id of mark.ids) {
      expect(mark.x, `${id} uses its precision midpoint`).toBeCloseTo(expectedX(eventById.get(id)), 10);
      expect(mark.anchor).toBe(`${eventById.get(id).precision}:${eventById.get(id).start}`);
    }
  }

  const xByEvent = new Map();
  marks.forEach(({ ids, x }) => ids.forEach((id) => {
    const positions = xByEvent.get(id) ?? [];
    positions.push(x);
    xByEvent.set(id, positions);
  }));
  for (const [id, positions] of xByEvent) {
    expect(new Set(positions).size, `${id} aligns at one date-derived x across rows`).toBe(1);
  }
  expect(xByEvent.get('apple-2026-08-cad-ams-simulation-methodology')[0])
    .toBeLessThan(xByEvent.get('freescale-2010-trace-generated-ams-models')[0]);

  const rows = await page.locator('[data-matrix-row]').evaluateAll((nodes) => nodes.map((node) => ({
    lane: `${node.getAttribute('data-lane-type')}:${node.getAttribute('data-entity-id')}`,
    slotCount: Number(node.getAttribute('data-collision-slots')),
    height: Number.parseFloat(getComputedStyle(node).getPropertyValue('--matrix-row-height')),
    marks: [...node.querySelectorAll('[data-matrix-mark]')].map((mark) => ({
      x: Number(mark.getAttribute('data-event-x')),
      slot: Number(mark.getAttribute('data-collision-slot')),
    })),
    borderBottom: getComputedStyle(node).borderBottomWidth,
    baselineContent: getComputedStyle(node.querySelector('[data-matrix-track]'), '::before').content,
  })));
  expect(rows.some(({ slotCount }) => slotCount > 1)).toBe(true);
  expect(rows.some(({ slotCount, height }) => slotCount === 1 && height === 28)).toBe(true);
  for (const row of rows) {
    expect(row.height, `${row.lane} dynamic height`).toBe(28 + ((row.slotCount - 1) * 14));
    expect(row.borderBottom, `${row.lane} has no row rule`).toBe('0px');
    expect(row.baselineContent, `${row.lane} has no permanent baseline`).toBe('none');
    const lastXBySlot = [];
    for (const mark of row.marks.slice().sort((left, right) => left.x - right.x)) {
      let expectedSlot = lastXBySlot.findIndex((lastX) => mark.x - lastX >= (18 / 620) * 100);
      if (expectedSlot === -1) expectedSlot = lastXBySlot.length;
      expect(mark.slot, `${row.lane} greedy collision slot`).toBe(expectedSlot);
      lastXBySlot[expectedSlot] = mark.x;
    }
  }
  const visualOverlaps = await page.locator('[data-group="companies"] [data-matrix-row]:visible').evaluateAll((nodes) => (
    nodes.flatMap((row) => {
      const glyphs = [...row.querySelectorAll('[data-matrix-mark]:not([hidden]) .activity-glyph')]
        .map((glyph) => glyph.getBoundingClientRect());
      const overlaps = [];
      for (let left = 0; left < glyphs.length; left += 1) {
        for (let right = left + 1; right < glyphs.length; right += 1) {
          if (glyphs[left].left < glyphs[right].right
            && glyphs[left].right > glyphs[right].left
            && glyphs[left].top < glyphs[right].bottom
            && glyphs[left].bottom > glyphs[right].top) {
            overlaps.push(row.getAttribute('data-entity-id'));
          }
        }
      }
      return overlaps;
    })
  ));
  expect(visualOverlaps).toEqual([]);
});

test('global Matrix uses the corpus domain while context Timelines retain derived historical ranges', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);
  await expect(page.locator('[data-activity-matrix-surface]')).toHaveAttribute('data-domain-oldest-year', '2010');
  await expect(page.locator('[data-activity-tick]')).toHaveText(['2026', '2024', '2022', '2020', '2015', '2010']);

  await page.goto('./companies/apple/');
  await expectExplorerReady(page);
  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-activity-matrix-surface]')).toHaveCount(0);
  await expect(page.locator('[data-timeline-segment][data-segment-key="through-2020"]'))
    .toHaveAttribute('data-segment-label', '2020–2018');
});

test('Timeline summary keeps count and legend compact and left aligned', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  const summary = page.locator('.event-filter-summary');
  await expect(summary.locator(':scope > .event-filter-status')).toHaveText('90 of 90 events');
  await expect(summary.locator(':scope > .kind-legend')).toContainText('Technical');
  await expect(summary.locator(':scope > .kind-legend')).toContainText('Organizational');
  await expect(summary.locator(':scope > .activity-order-note')).toHaveText('Rows prioritize recent public records.');
  await expect(summary.locator(':scope > .activity-order-note')).toHaveAttribute(
    'title',
    'Ordered by records in the latest 3 years, then latest 5 years, then latest record.',
  );
  await expect(summary.locator(':scope > *')).toHaveCount(3);
  await expect(page.locator('.axis-note, .timeline-summary-detail')).toHaveCount(0);
  await expect(page.getByText('Newest first', { exact: true })).toHaveCount(0);
  await expect(page.getByText(/density-adjusted/i)).toHaveCount(0);

  const layout = await summary.evaluate((node) => {
    const style = getComputedStyle(node);
    const status = node.querySelector('[data-status]').getBoundingClientRect();
    const legend = node.querySelector('.kind-legend').getBoundingClientRect();
    const note = node.querySelector('.activity-order-note').getBoundingClientRect();
    return {
      justifyContent: style.justifyContent,
      flexWrap: style.flexWrap,
      statusLeft: status.left,
      statusRight: status.right,
      statusTop: status.top,
      legendLeft: legend.left,
      legendTop: legend.top,
      noteLeft: note.left,
      noteTop: note.top,
    };
  });
  expect(layout.justifyContent).toBe('flex-start');
  expect(layout.flexWrap).toBe('wrap');
  expect(layout.legendLeft).toBeGreaterThan(layout.statusRight);
  expect(Math.abs(layout.legendTop - layout.statusTop)).toBeLessThanOrEqual(1);
  expect(layout.noteLeft).toBeGreaterThan(layout.legendLeft);
  expect(Math.abs(layout.noteTop - layout.statusTop)).toBeLessThanOrEqual(1);
});

test('search, Signal type, Company Focus, and View never change Matrix geometry or row order', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  const geometry = () => page.locator('[data-timeline-root]').evaluate((root) => ({
    domain: [
      root.querySelector('[data-activity-matrix-surface]')?.getAttribute('data-domain-latest-year'),
      root.querySelector('[data-activity-matrix-surface]')?.getAttribute('data-domain-oldest-year'),
    ],
    ticks: [...root.querySelectorAll('[data-activity-tick]')].map((tick) => (
      `${tick.getAttribute('data-tick-year')}:${tick.getAttribute('data-tick-x')}`
    )),
    lanes: [...root.querySelectorAll('[data-lane]')].map((lane) => ({
      key: `${lane.getAttribute('data-lane-type')}:${lane.getAttribute('data-entity-id')}`,
      order: lane.getAttribute('data-row-order'),
      slots: lane.getAttribute('data-collision-slots'),
      style: lane.getAttribute('style'),
    })),
    marks: [...root.querySelectorAll('[data-matrix-mark]')].map((mark) => ({
      lane: mark.closest('[data-lane]')?.getAttribute('data-entity-id'),
      ids: mark.getAttribute('data-event-ids'),
      x: mark.getAttribute('data-event-x'),
      anchor: mark.getAttribute('data-anchor-key'),
      slot: mark.getAttribute('data-collision-slot'),
      style: mark.getAttribute('style'),
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
  await page.locator('[data-view]').selectOption('companies');
  expect(await geometry()).toEqual(initial);
});

test('Matrix fills desktop width, scrolls locally when narrow, and preserves initial-lens reveal behavior', async ({ page }) => {
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
  expect(Math.abs(initial.scrollWidth - initial.clientWidth)).toBeLessThanOrEqual(1);
  expect(initial.scrollLeft).toBe(0);
  const tickVisibility = await page.locator('.activity-matrix-shell').evaluate((node) => {
    const scroller = node.getBoundingClientRect();
    return [...node.querySelectorAll('[data-activity-tick]')].map((tick) => {
      const bounds = tick.getBoundingClientRect();
      return bounds.left >= scroller.left && bounds.right <= scroller.right;
    });
  });
  expect(tickVisibility.every(Boolean)).toBe(true);
  expect(await page.locator('[data-timeline-scroll] [data-detail]').count()).toBe(0);
  await expect(page.locator('[data-detail]')).toBeVisible();

  const documentWidth = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(documentWidth.scrollWidth).toBe(documentWidth.clientWidth);

  await page.evaluate(() => scrollTo(0, 800));
  const stickyAxis = await page.locator('.activity-matrix-axis-viewport').evaluate((node) => ({
    position: getComputedStyle(node).position,
    top: node.getBoundingClientRect().top,
  }));
  expect(stickyAxis.position).toBe('sticky');
  expect(Math.abs(stickyAxis.top)).toBeLessThanOrEqual(1);
  await page.evaluate(() => scrollTo(0, 0));

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('./');
  await expectExplorerReady(page);
  expect(await scroller.evaluate((node) => Math.abs(node.scrollWidth - node.clientWidth))).toBeLessThanOrEqual(1);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await expectExplorerReady(page);
  const narrow = await scroller.evaluate((node) => ({ clientWidth: node.clientWidth, scrollWidth: node.scrollWidth }));
  expect(narrow.scrollWidth).toBeGreaterThan(narrow.clientWidth);
  const label = page.locator('[data-group="companies"] [data-matrix-row]:visible').first().locator('.matrix-entity-label');
  const labelLeft = (await label.boundingBox()).x;
  const userPosition = await scroller.evaluate((node) => {
    node.scrollLeft = Math.max((node.scrollWidth - node.clientWidth) / 2, 1);
    return node.scrollLeft;
  });
  expect(userPosition).toBeGreaterThan(0);
  expect(Math.abs((await label.boundingBox()).x - labelLeft)).toBeLessThanOrEqual(1);
  await page.locator('[data-search]').fill('RNM');
  expect(Math.abs(await scroller.evaluate((node) => node.scrollLeft) - userPosition)).toBeLessThanOrEqual(1);
  await page.locator('[data-kind]').selectOption('technical');
  expect(Math.abs(await scroller.evaluate((node) => node.scrollLeft) - userPosition)).toBeLessThanOrEqual(1);
  await page.locator('[data-view]').selectOption('people');
  expect(Math.abs(await scroller.evaluate((node) => node.scrollLeft) - userPosition)).toBeLessThanOrEqual(1);

  await page.goto('./?q=floating-point');
  await expectExplorerReady(page);
  await expect(page.locator('[data-timeline-scroll]')).toHaveAttribute(
    'data-initial-reveal',
    'cadence-2012-real-valued-systemverilog-coverage',
  );
  expect(await page.locator('[data-timeline-scroll]').evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
});

test('global Matrix defaults to compact Company rows without baselines or table rules', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'companies');
  await expect(page.locator('[data-view]')).toHaveValue('companies');
  await expect(page.locator('[data-view] option')).toHaveText(['Companies', 'People']);
  await expect(page.locator('[data-group="companies"]')).toBeVisible();
  await expect(page.locator('[data-group="people"]')).toBeHidden();
  await expect(page.locator('.lane-group-row, .lane-group-label, [data-group-label]')).toHaveCount(0);
  const visualGrammar = await page.locator('[data-group="companies"] [data-matrix-row]:visible').first().evaluate((row) => {
    const rowStyle = getComputedStyle(row);
    const trackStyle = getComputedStyle(row.querySelector('[data-matrix-track]'), '::before');
    const guideStyle = getComputedStyle(row.querySelector('.activity-guides span'));
    const labelStyle = getComputedStyle(row.querySelector('.matrix-entity-label'));
    const mark = row.querySelector('[data-matrix-mark]');
    const glyph = mark.querySelector('.activity-glyph');
    return {
      rowHeight: row.getBoundingClientRect().height,
      rowBorder: rowStyle.borderBottomWidth,
      baselineContent: trackStyle.content,
      guideBorder: guideStyle.borderLeftWidth,
      guideStyle: guideStyle.borderLeftStyle,
      labelWhiteSpace: labelStyle.whiteSpace,
      labelOverflow: labelStyle.overflow,
      labelTextOverflow: labelStyle.textOverflow,
      hitWidth: mark.getBoundingClientRect().width,
      glyphWidth: glyph.getBoundingClientRect().width,
    };
  });
  expect(visualGrammar.rowHeight).toBeGreaterThanOrEqual(28);
  expect(visualGrammar.rowBorder).toBe('0px');
  expect(visualGrammar.baselineContent).toBe('none');
  expect(visualGrammar.guideBorder).toBe('1px');
  expect(visualGrammar.guideStyle).toBe('solid');
  expect(visualGrammar.labelWhiteSpace).toBe('nowrap');
  expect(visualGrammar.labelOverflow).toBe('hidden');
  expect(visualGrammar.labelTextOverflow).toBe('ellipsis');
  expect(visualGrammar.hitWidth).toBeGreaterThanOrEqual(14);
  expect(visualGrammar.glyphWidth).toBeLessThanOrEqual(14);
  const longLabel = page.locator('[data-matrix-row][data-entity-id="cadence"] .matrix-entity-label');
  await expect(longLabel).toHaveText('Cadence Design Systems');
  await expect(longLabel).toHaveAttribute('title', 'Cadence Design Systems');
});

test('global explorer supports Companies and People, maps legacy both to Companies, and resets to Companies', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';

    await page.goto(path);
    await expectExplorerReady(page, surface);
    await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'companies');
    await expect(page.locator('[data-view]')).toHaveValue('companies');
    expect(new URL(page.url()).searchParams.has('view')).toBe(false);

    for (const view of ['companies', 'people']) {
      await page.goto(`${path}?view=${view}`);
      await expectExplorerReady(page, surface);
      await expect(page.locator('[data-view]')).toHaveValue(view);

      if (surface === 'timeline') {
        if (view === 'people') await expect(page.locator('[data-group="companies"]')).toBeHidden();
        else await expect(page.locator('[data-group="companies"]')).toBeVisible();

        if (view === 'companies') await expect(page.locator('[data-group="people"]')).toBeHidden();
        else await expect(page.locator('[data-group="people"]')).toBeVisible();
        if (view === 'people') {
          await expect(page.locator('[data-group="people"] [data-matrix-row]:visible').first())
            .toHaveAttribute('data-entity-id', 'peter-grove');
          await expect(page.locator('[data-detail-event]')).toHaveAttribute(
            'href',
            `${basePath}events/ecosystem-2025-02-uvm-ms-1-standard/`,
          );
        }
      }
    }

    await page.goto(`${path}?view=both`);
    await expectExplorerReady(page, surface);
    await expect(page.locator('[data-view]')).toHaveValue('companies');
    expect(new URL(page.url()).searchParams.has('view')).toBe(false);
    if (surface === 'timeline') {
      await expect(page.locator('[data-group="companies"]')).toBeVisible();
      await expect(page.locator('[data-group="people"]')).toBeHidden();
    }

    await page.locator('[data-search]').fill('PLL');
    await page.locator('[data-view]').selectOption('people');
    await page.locator('[data-reset]').click();
    await expect(page.locator('[data-view]')).toHaveValue('companies');
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
    const timeline = document.querySelector('.activity-matrix-scroll');
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
  expect(serializedKinds).toHaveLength(90);
  expect(new Set(serializedKinds)).toEqual(new Set(['technical', 'organizational']));
  expect(serializedKinds.filter((kind) => kind === 'technical')).toHaveLength(65);
  expect(serializedKinds.filter((kind) => kind === 'organizational')).toHaveLength(25);

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
  await expect(page.locator('[data-status]')).toHaveText('65 of 90 events');
  await page.locator('[data-kind]').selectOption('organizational');
  await expect(page.locator('[data-status]')).toHaveText('25 of 90 events');
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
  await page.goto('./events/sitime-2023-keiichi-kajino-japan-verification-manager/');
  await expect(page.locator('.event-meta')).toContainText('Organizational');
});

test('shared Events remain one list record and one inspector record', async ({ page }) => {
  const uvmEventId = 'ecosystem-2025-02-uvm-ms-1-standard';
  await page.goto('./events/?q=UVM-MS');
  await expectExplorerReady(page, 'events');
  await expect(page.locator(`[data-event-result][data-event-id="${uvmEventId}"]:visible`)).toHaveCount(1);

  const vendorCustomerEventId = 'hitachi-2015-rnm-full-chip-mixed-signal-verification';
  await page.goto('./events/?companies=cadence,hitachi&q=backplane');
  await expectExplorerReady(page, 'events');
  await expect(page.locator(`[data-event-result][data-event-id="${vendorCustomerEventId}"]:visible`)).toHaveCount(1);

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

test('Company-first and People-first behavior remains intact', async ({ page }) => {
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
  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-activity-matrix-surface]')).toHaveCount(0);
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
  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-activity-matrix-surface]')).toHaveCount(0);
  await expect(page.locator('[data-group="people"]')).toBeVisible();
  await expect(page.locator('[data-group="companies"]')).toBeHidden();

  await page.goto('./people/prabal-bhattacharya/');
  await expectExplorerReady(page);
  const prabalGeometry = await contextGeometry();
  await page.locator('[data-search]').fill('Skyworks');
  expect(await contextGeometry()).toEqual(prabalGeometry);
});

test('search controls are compact and aligned on Timeline and Events', async ({ page }) => {
  const removedCopy = 'Lexical search across events, evidence, companies, and people.';

  for (const path of ['./', './events/']) {
    await page.goto(`${path}?companies=apple,renesas&kind=technical&q=PLL&view=people`);
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
  await expect(page.locator('[data-activity-matrix-surface]')).toBeVisible();
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
  await expect(page.locator('.site-header nav a')).toHaveCount(2);
});
