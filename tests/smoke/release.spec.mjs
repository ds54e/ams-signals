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
  await expect(page.locator('.site-header nav a')).toHaveCount(2);
  await expect(page.getByRole('link', { name: 'Analysis', exact: true })).toHaveCount(0);

  await expect(page.locator('[data-activity-matrix-surface]')).toBeVisible();
  await expect(page.locator('.desktop-timeline')).toHaveCount(0);
  await expect(page.locator('[data-detail]')).toHaveCount(1);
  await expect(page.locator('[data-group="both"] [data-matrix-row]:visible').first())
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

test('nearby-Event bundles retain direct Event interaction and reduce cleanly under filtering', async ({ page }) => {
  const bundledIds = [
    'analog-devices-2016-automatic-real-number-abstraction',
    'analog-devices-2016-sv-rnm-model-validation',
  ];
  await page.goto('./');
  await expectExplorerReady(page);

  const bundle = page.locator(
    `[data-group="both"] [data-matrix-row][data-entity-id="analog-devices"] [data-matrix-bundle][data-bundle-event-ids*="${bundledIds[0]}"][data-bundle-event-ids*="${bundledIds[1]}"]`,
  );
  await expect(bundle).toBeVisible();
  expect(JSON.parse(await bundle.getAttribute('data-bundle-event-ids'))).toEqual(bundledIds);
  expect(JSON.parse(await bundle.getAttribute('data-visible-event-ids'))).toEqual(bundledIds);
  await expect(bundle).toHaveAttribute('data-bundle-member-count', '2');
  await expect(bundle.locator('[data-bundle-member]')).toHaveCount(2);
  await expect(page.locator('[data-cluster-count], [data-detail-cluster], .is-cluster, .is-mixed')).toHaveCount(0);
  await expect(bundle.locator('[data-bundle-member].event-kind-technical')).toHaveCount(2);
  const bundleKindShapes = await page.locator('[data-group="both"]').evaluate((group) => {
    const technical = group.querySelector('[data-bundle-member].event-kind-technical .activity-glyph');
    const organizational = group.querySelector('[data-bundle-member].event-kind-organizational .activity-glyph');
    return {
      technicalRadius: getComputedStyle(technical).borderRadius,
      organizationalRadius: getComputedStyle(organizational).borderRadius,
    };
  });
  expect(bundleKindShapes.technicalRadius).not.toBe(bundleKindShapes.organizationalRadius);

  for (const id of bundledIds) {
    const member = bundle.locator(`[data-bundle-member][data-event-id="${id}"]`);
    await member.click();
    await expect(member).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-detail-event]')).toHaveAttribute('href', `${basePath}events/${id}/`);
  }

  const immutableGeometry = await bundle.evaluate((node) => ({
    eventIds: node.getAttribute('data-bundle-event-ids'),
    x: node.getAttribute('data-bundle-x'),
    slot: node.getAttribute('data-collision-slot'),
    style: node.getAttribute('style'),
  }));
  await page.locator('[data-search]').fill('automatic real-number abstraction');
  await expect.poll(async () => JSON.parse(await bundle.getAttribute('data-visible-event-ids'))).toEqual([bundledIds[0]]);
  await expect(bundle).toHaveAttribute('data-visible-member-count', '1');
  await expect(bundle.locator('[data-bundle-member]:visible')).toHaveCount(1);
  expect(await bundle.evaluate((node) => ({
    eventIds: node.getAttribute('data-bundle-event-ids'),
    x: node.getAttribute('data-bundle-x'),
    slot: node.getAttribute('data-collision-slot'),
    style: node.getAttribute('style'),
  }))).toEqual(immutableGeometry);
  const centeredSingle = await bundle.evaluate((node) => {
    const bundleBounds = node.getBoundingClientRect();
    const memberBounds = node.querySelector('[data-bundle-member]:not([hidden])').getBoundingClientRect();
    return Math.abs((bundleBounds.left + bundleBounds.width / 2) - (memberBounds.left + memberBounds.width / 2));
  });
  expect(centeredSingle).toBeLessThanOrEqual(1);

  await page.locator('[data-search]').fill('PLL');
  await expect.poll(async () => JSON.parse(await bundle.getAttribute('data-visible-event-ids'))).toEqual([]);
  await expect(bundle).toHaveAttribute('data-visible-member-count', '0');
  await expect(bundle).toBeHidden();

  await page.locator('[data-reset]').click();
  const sharedEventId = 'cadence-2012-real-valued-systemverilog-coverage';
  const sharedBundle = page.locator(
    `[data-group="both"] [data-matrix-row][data-entity-id="cadence"] [data-matrix-bundle][data-bundle-event-ids*="${sharedEventId}"][data-bundle-event-ids*="maxim-2012-uvm-ms-mixed-signal-soc-verification"]`,
  );
  expect(JSON.parse(await sharedBundle.getAttribute('data-bundle-event-ids'))).toContain(sharedEventId);
  await sharedBundle.locator(`[data-bundle-member][data-event-id="${sharedEventId}"]`).click();
  const containingMarks = page.locator(`[data-matrix-mark][data-event-id="${sharedEventId}"]:visible`);
  expect(await containingMarks.count()).toBeGreaterThan(1);
  await expect.poll(() => containingMarks.evaluateAll((marks) => marks.every((mark) => mark.getAttribute('aria-pressed') === 'true')))
    .toBe(true);

  const independentKindShapes = await bundle.evaluate((node) => {
    const members = [...node.querySelectorAll('[data-bundle-member]')];
    members[1].classList.remove('event-kind-technical');
    members[1].classList.add('event-kind-organizational');
    return members.map((member) => {
      const glyphStyle = getComputedStyle(member.querySelector('.activity-glyph'));
      return {
        borderRadius: glyphStyle.borderRadius,
        background: glyphStyle.backgroundColor,
      };
    });
  });
  expect(independentKindShapes[0]).not.toEqual(independentKindShapes[1]);
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
  await expect(page.locator('[data-event-result]').first().getByRole('link', { name: 'Event', exact: true })).toBeVisible();

  await page.locator('[data-search]').fill('PLL');
  await expect(page.locator('[data-event-result]:visible').first().locator('[data-result-match]')).toContainText('Matched in');
});

test('global Timeline Event sets remain subsets of the complete Events record', async ({ page }) => {
  const lenses = [
    '',
    '?kind=technical',
    '?kind=organizational',
    '?view=companies',
    '?view=people',
  ];

  for (const lens of lenses) {
    await page.goto(`./${lens}`);
    await expectExplorerReady(page);
    const timelineIds = await visibleTimelineEventIds(page);

    await page.goto(`./events/${lens}`);
    await expectExplorerReady(page, 'events');
    const listedIds = await visibleListedEventIds(page);

    expect(timelineIds.length, `non-empty Timeline set for ${lens || 'default'}`).toBeGreaterThan(0);
    expect(listedIds.length, `non-empty Events set for ${lens || 'default'}`).toBeGreaterThan(0);
    expect(
      timelineIds.every((id) => listedIds.includes(id)),
      `Timeline set is contained by Events for ${lens || 'default'}`,
    ).toBe(true);
    if (lens === '') expect(timelineIds.length).toBeLessThan(listedIds.length);
  }
});

test('explicit Search and Company Focus discovery preserve complete matching Event access', async ({ page }) => {
  const lenses = [
    '?q=Google',
    '?q=Gautham%20Sathyan',
    '?companies=google',
    '?companies=cirrus-logic',
  ];

  for (const lens of lenses) {
    await page.goto(`./${lens}`);
    await expectExplorerReady(page);
    const timelineIds = await visibleTimelineEventIds(page);

    await page.goto(`./events/${lens}`);
    await expectExplorerReady(page, 'events');
    const listedIds = await visibleListedEventIds(page);

    expect(timelineIds, `explicit Timeline set for ${lens}`).toEqual(listedIds);
    expect(timelineIds.length, `explicit non-empty set for ${lens}`).toBeGreaterThan(0);
  }
});

test('singleton Companies and People are browse-suppressed but deliberately discoverable', async ({ page }) => {
  const payload = await (await page.request.get('./export.json')).json();
  const companyTotals = new Map(payload.companies.map((company) => [
    company.id,
    payload.events.filter((event) => event.companies.includes(company.id)).length,
  ]));
  const peopleTotals = new Map(payload.people.map((person) => [
    person.id,
    payload.events.filter((event) => event.people.includes(person.id)).length,
  ]));
  const activeCompanyIds = [...companyTotals].filter(([, total]) => total > 0).map(([id]) => id);
  const singletonCompanyIds = [...companyTotals].filter(([, total]) => total === 1).map(([id]) => id);
  const activePersonIds = [...peopleTotals].filter(([, total]) => total > 0).map(([id]) => id);
  const singletonPersonIds = [...peopleTotals].filter(([, total]) => total === 1).map(([id]) => id);
  expect(activeCompanyIds).toHaveLength(41);
  expect(singletonCompanyIds).toHaveLength(20);
  expect(activePersonIds).toHaveLength(18);
  expect(singletonPersonIds).toHaveLength(6);

  const singletonCompany = payload.companies.find(({ id }) => id === 'google');
  const singletonPerson = payload.people.find(({ id }) => id === 'gautham-sathyan');
  expect(companyTotals.get(singletonCompany.id)).toBe(1);
  expect(peopleTotals.get(singletonPerson.id)).toBe(1);
  const companyEvent = payload.events.find((event) => event.companies.includes(singletonCompany.id));
  const personEvent = payload.events.find((event) => event.people.includes(singletonPerson.id));

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  await expect(page.locator(`[data-event-result][data-event-id="${companyEvent.id}"]`)).toBeVisible();
  await expect(page.locator(`[data-event-result][data-event-id="${personEvent.id}"]`)).toBeVisible();
  expect((await page.request.get(`./companies/${singletonCompany.id}/`)).status()).toBe(200);
  expect((await page.request.get(`./people/${singletonPerson.id}/`)).status()).toBe(200);

  await page.goto('./');
  await expectExplorerReady(page);
  const combinedCompanyRow = page.locator(
    `[data-group="both"] [data-matrix-row][data-entity-type="company"][data-entity-id="${singletonCompany.id}"]`,
  );
  const combinedPersonRow = page.locator(
    `[data-group="both"] [data-matrix-row][data-entity-type="person"][data-entity-id="${singletonPerson.id}"]`,
  );
  await expect(combinedCompanyRow).toBeHidden();
  await expect(combinedPersonRow).toBeHidden();
  const singletonPickerOption = page.locator(`[data-company-options] input[value="${singletonCompany.id}"]`);
  await expect(singletonPickerOption).toBeAttached();
  await expect(singletonPickerOption.locator('xpath=..').locator('small')).toHaveText('1 event');

  await page.locator('[data-view]').selectOption('companies');
  await expect(page.locator(
    `[data-group="companies"] [data-matrix-row][data-entity-id="${singletonCompany.id}"]`,
  )).toBeHidden();
  await page.locator('[data-view]').selectOption('both');

  await page.locator('[data-search]').fill(singletonCompany.name);
  await expect(combinedCompanyRow).toBeVisible();
  await expect(page.locator(`[data-matrix-mark][data-event-id="${companyEvent.id}"]:visible`).first()).toBeVisible();
  await page.locator('[data-search]').fill('');
  await expect(combinedCompanyRow).toBeHidden();

  await page.locator('[data-view]').selectOption('people');
  const peoplePersonRow = page.locator(
    `[data-group="people"] [data-matrix-row][data-entity-id="${singletonPerson.id}"]`,
  );
  await expect(peoplePersonRow).toBeHidden();
  await page.locator('[data-search]').fill(singletonPerson.name);
  await expect(peoplePersonRow).toBeVisible();
  await page.locator('[data-search]').fill('');
  await expect(peoplePersonRow).toBeHidden();

  await page.locator('[data-reset]').click();
  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await singletonPickerOption.check();
  await expect(combinedCompanyRow).toBeVisible();
  expect(new URL(page.url()).searchParams.get('companies')).toBe(singletonCompany.id);

  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await page.locator('[data-company-options] input[value="cirrus-logic"]').check();
  await expect(combinedPersonRow).toBeVisible();

  await page.locator('[data-reset]').click();
  await expect(page.locator('[data-view]')).toHaveValue('both');
  await expect(page.locator('[data-company-options] input:checked')).toHaveCount(41);
  await expect(combinedCompanyRow).toBeHidden();
  await expect(combinedPersonRow).toBeHidden();
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

test('Company filter exposes immediate Select all and Clear all actions', async ({ page }) => {
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
    expect(totalCompanies).toBe(41);
    await expect(page.getByRole('button', { name: 'Select all', exact: true })).toBeVisible();
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

    await page.getByRole('button', { name: 'Select all', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-status]')).not.toHaveText('0 of 90 events');
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

test('full-corpus recent-activity ordering is shared and filter-stable', async ({ page }) => {
  const payload = await (await page.request.get('./export.json')).json();
  const latestYear = Math.max(...payload.events.map((event) => Number(event.when.start.slice(0, 4))));
  const startTimestamp = (value) => {
    const [year, month = '01', day = '01'] = value.split('-').map(Number);
    return Date.UTC(year, month - 1, day);
  };
  const compareActivity = (left, right) => (
    right.recent3 - left.recent3
    || right.recent5 - left.recent5
    || right.latestTimestamp - left.latestTimestamp
    || right.total - left.total
    || left.name.localeCompare(right.name, 'en')
    || left.id.localeCompare(right.id, 'en')
    || left.entityType.localeCompare(right.entityType, 'en')
  );
  const expectedCompanies = payload.companies.map((company) => {
    const linked = payload.events.filter((event) => event.companies.includes(company.id)).sort((left, right) => (
      startTimestamp(right.when.start) - startTimestamp(left.when.start) || left.id.localeCompare(right.id, 'en')
    ));
    return {
      id: company.id,
      name: company.name,
      entityType: 'company',
      count: `${linked.length} ${linked.length === 1 ? 'event' : 'events'}`,
      recent3: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 2).length,
      recent5: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 4).length,
      latest: linked[0]?.when.start ?? '',
      latestTimestamp: linked[0] ? startTimestamp(linked[0].when.start) : Number.NEGATIVE_INFINITY,
      total: linked.length,
    };
  }).filter(({ total }) => total > 0).sort(compareActivity);
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
      entityType: 'person',
      recent3: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 2).length,
      recent5: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 4).length,
      latest: linked[0]?.when.start ?? '',
      latestTimestamp: linked[0] ? startTimestamp(linked[0].when.start) : Number.NEGATIVE_INFINITY,
      total: linked.length,
    };
  }).filter(({ total }) => total > 0).sort(compareActivity);
  const expectedCombined = [...expectedCompanies, ...expectedPeople].sort(compareActivity);
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

  const combinedRows = page.locator('[data-group="both"] [data-matrix-row]');
  const combinedRowData = await combinedRows.evaluateAll((nodes) => nodes.map((node) => ({
    id: node.getAttribute('data-entity-id'),
    entityType: node.getAttribute('data-entity-type'),
    recent3: Number(node.getAttribute('data-recent3')),
    recent5: Number(node.getAttribute('data-recent5')),
    latest: node.getAttribute('data-latest-start'),
    total: Number(node.getAttribute('data-total-events')),
  })));
  expect(combinedRowData).toEqual(expectedCombined.map(({
    id, entityType, recent3, recent5, latest, total,
  }) => ({ id, entityType, recent3, recent5, latest, total })));
  expect(new Set(combinedRowData.map(({ entityType }) => entityType))).toEqual(new Set(['company', 'person']));

  const expectedRecurringCombinedKeys = expectedCombined
    .filter(({ total }) => total >= 2)
    .map(({ entityType, id }) => `${entityType}:${id}`);
  const defaultVisibleCombinedKeys = await page.locator('[data-group="both"] [data-matrix-row]:visible')
    .evaluateAll((nodes) => nodes.map((node) => (
      `${node.getAttribute('data-entity-type')}:${node.getAttribute('data-entity-id')}`
    )));
  expect(defaultVisibleCombinedKeys).toEqual(expectedRecurringCombinedKeys);
  expect(defaultVisibleCombinedKeys).toHaveLength(33);

  await page.locator('[data-search]').fill('RNM');
  const visibleAfterSearch = await page.locator('[data-group="both"] [data-matrix-row]:visible')
    .evaluateAll((nodes) => nodes.map((node) => (
      `${node.getAttribute('data-entity-type')}:${node.getAttribute('data-entity-id')}`
    )));
  const expectedCombinedKeys = expectedCombined.map(({ entityType, id }) => `${entityType}:${id}`);
  expect(visibleAfterSearch).toEqual(expectedCombinedKeys.filter((key) => visibleAfterSearch.includes(key)));

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
  await expect(page.locator('a[href$="/companies/sony-semiconductor-solutions/"]:visible')).toHaveCount(1);

  for (const company of [
    { id: 'omnivision', name: 'OMNIVISION' },
  ]) {
    await page.goto(`./companies/${company.id}/`);
    await expect(page).toHaveTitle(`${company.name} · AMS Signals`);
    await expect(page.getByRole('heading', { name: company.name, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No events are currently indexed' })).toBeVisible();
  }
});

test('global Activity Matrix preserves precise Event x metadata in deterministic proximity bundles', async ({ page }) => {
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
    id: node.getAttribute('data-event-id'),
    originalX: Number(node.getAttribute('data-original-event-x')),
    bundleX: Number(node.getAttribute('data-event-x')),
    bundleIndex: Number(node.getAttribute('data-bundle-index')),
    lane: `${node.closest('[data-lane]').getAttribute('data-lane-type')}:${node.closest('[data-lane]').getAttribute('data-entity-id')}`,
  })));
  expect(new Set(marks.map(({ id }) => id))).toEqual(new Set(serialized.map(({ id }) => id)));
  for (const mark of marks) {
    expect(mark.originalX, `${mark.id} retains its precision midpoint`).toBeCloseTo(expectedX(eventById.get(mark.id)), 10);
  }

  const xByEvent = new Map();
  marks.forEach(({ id, originalX }) => {
    const positions = xByEvent.get(id) ?? [];
    positions.push(originalX);
    xByEvent.set(id, positions);
  });
  for (const [id, positions] of xByEvent) {
    expect(new Set(positions).size, `${id} retains one precise x across rows`).toBe(1);
  }
  expect(xByEvent.get('apple-2026-08-cad-ams-simulation-methodology')[0])
    .toBeLessThan(xByEvent.get('freescale-2010-trace-generated-ams-models')[0]);

  const proximityPx = Number(await page.locator('.activity-matrix-shell').getAttribute('data-bundle-proximity-px'));
  expect(proximityPx).toBe(32);
  const normalizedWindow = (proximityPx / 620) * 100;
  const rows = await page.locator('[data-matrix-row]').evaluateAll((nodes) => nodes.map((node) => ({
    lane: `${node.getAttribute('data-lane-type')}:${node.getAttribute('data-entity-id')}`,
    slotCount: Number(node.getAttribute('data-collision-slots')),
    height: node.getBoundingClientRect().height,
    bundles: [...node.querySelectorAll('[data-matrix-bundle]')].map((bundle) => ({
      ids: JSON.parse(bundle.getAttribute('data-bundle-event-ids')),
      x: Number(bundle.getAttribute('data-bundle-x')),
      minX: Number(bundle.getAttribute('data-min-original-event-x')),
      maxX: Number(bundle.getAttribute('data-max-original-event-x')),
      maxDisplacement: Number(bundle.getAttribute('data-max-original-displacement')),
      slot: Number(bundle.getAttribute('data-collision-slot')),
      members: [...bundle.querySelectorAll('[data-bundle-member]')].map((member) => ({
        id: member.getAttribute('data-event-id'),
        x: Number(member.getAttribute('data-original-event-x')),
      })),
    })),
    borderBottom: getComputedStyle(node).borderBottomWidth,
    baselineContent: getComputedStyle(node.querySelector('[data-matrix-track]'), '::before').content,
  })));
  expect(rows.some(({ slotCount }) => slotCount > 1)).toBe(true);
  expect(rows.some(({ height }) => height === 28)).toBe(true);
  expect(rows.some(({ height }) => height > 28)).toBe(true);
  expect(Math.max(...rows.flatMap(({ bundles }) => bundles.map(({ ids }) => ids.length)))).toBe(5);
  for (const row of rows) {
    expect(row.borderBottom, `${row.lane} has no row rule`).toBe('0px');
    expect(row.baselineContent, `${row.lane} has no permanent baseline`).toBe('none');

    const orderedMembers = row.bundles.flatMap(({ members }) => members)
      .slice().sort((left, right) => left.x - right.x || left.id.localeCompare(right.id, 'en'));
    const expectedBundles = [];
    for (const member of orderedMembers) {
      const current = expectedBundles.at(-1);
      if (!current || member.x - current[0].x > normalizedWindow) expectedBundles.push([member]);
      else current.push(member);
    }
    expect(row.bundles.map(({ ids }) => ids), `${row.lane} fixed-window membership`)
      .toEqual(expectedBundles.map((members) => members.map(({ id }) => id)));

    for (const bundle of row.bundles) {
      expect(bundle.maxX - bundle.minX, `${row.lane} bounded member span`).toBeLessThanOrEqual(normalizedWindow + 1e-10);
      expect(bundle.x, `${row.lane} bundle mean`).toBeCloseTo(
        bundle.members.reduce((sum, member) => sum + member.x, 0) / bundle.members.length,
        10,
      );
      expect(bundle.maxDisplacement, `${row.lane} bounded visual displacement`)
        .toBeLessThanOrEqual(normalizedWindow + 1e-10);
    }
  }

  const visualOverlaps = await page.locator('[data-group="both"] [data-matrix-row]:visible').evaluateAll((nodes) => (
    nodes.flatMap((row) => {
      const bundles = [...row.querySelectorAll('[data-matrix-bundle]:not([hidden])')]
        .map((bundle) => bundle.getBoundingClientRect());
      const overlaps = [];
      for (let left = 0; left < bundles.length; left += 1) {
        for (let right = left + 1; right < bundles.length; right += 1) {
          if (bundles[left].left < bundles[right].right - 0.5
            && bundles[left].right > bundles[right].left + 0.5
            && bundles[left].top < bundles[right].bottom - 0.5
            && bundles[left].bottom > bundles[right].top + 0.5) {
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
  const representedIds = await visibleTimelineEventIds(page);
  expect(representedIds).toHaveLength(78);
  await expect(summary.locator(':scope > .event-filter-status')).toHaveText('78 of 90 events');
  await expect(summary.locator(':scope > .kind-legend')).toContainText('Technical');
  await expect(summary.locator(':scope > .kind-legend')).toContainText('Organizational');
  await expect(summary.locator(':scope > .activity-order-note')).toHaveText(
    'Timeline emphasizes recurring public signals. Events contains the complete record.',
  );
  await expect(summary.locator(':scope > .activity-order-note')).toHaveAttribute(
    'title',
    'Rows are ordered by public Events in the latest 3 years, then latest 5 years, then latest Event. Nearby Events may be grouped visually for readability; exact dates remain available in the Inspector and Events view.',
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
    bundles: [...root.querySelectorAll('[data-matrix-bundle]')].map((bundle) => ({
      lane: bundle.closest('[data-lane]')?.getAttribute('data-entity-id'),
      ids: bundle.getAttribute('data-bundle-event-ids'),
      x: bundle.getAttribute('data-bundle-x'),
      slot: bundle.getAttribute('data-collision-slot'),
      top: bundle.getAttribute('data-bundle-top'),
      height: getComputedStyle(bundle).getPropertyValue('--bundle-height'),
      members: [...bundle.querySelectorAll('[data-bundle-member]')].map((member) => (
        `${member.getAttribute('data-event-id')}:${member.getAttribute('data-original-event-x')}`
      )),
    })),
  }));
  const initial = await geometry();
  const fullCombinedOrder = await page.locator('[data-group="both"] [data-matrix-row]')
    .evaluateAll((rows) => rows.map((row) => (
      `${row.getAttribute('data-entity-type')}:${row.getAttribute('data-entity-id')}`
    )));
  const expectStableCombinedSurvivors = async () => {
    const visible = await page.locator('[data-group="both"] [data-matrix-row]:visible')
      .evaluateAll((rows) => rows.map((row) => (
        `${row.getAttribute('data-entity-type')}:${row.getAttribute('data-entity-id')}`
      )));
    expect(visible).toEqual(fullCombinedOrder.filter((key) => visible.includes(key)));
  };

  await page.locator('[data-search]').fill('RNM');
  expect(await geometry()).toEqual(initial);
  await expectStableCombinedSurvivors();
  await page.locator('[data-search]').fill('PLL');
  expect(await geometry()).toEqual(initial);
  await expectStableCombinedSurvivors();

  await page.locator('[data-kind]').selectOption('technical');
  expect(await geometry()).toEqual(initial);
  await expectStableCombinedSurvivors();

  await page.locator('[data-company-picker] summary').click();
  await page.locator('[data-company-options] input[value="apple"]').uncheck();
  expect(await geometry()).toEqual(initial);
  await expectStableCombinedSurvivors();

  await page.locator('[data-view]').selectOption('people');
  expect(await geometry()).toEqual(initial);
  await page.locator('[data-view]').selectOption('companies');
  expect(await geometry()).toEqual(initial);
  await page.locator('[data-view]').selectOption('both');
  expect(await geometry()).toEqual(initial);
  await expectStableCombinedSurvivors();
});

test('Activity Matrix axis and rows share temporal-track geometry at every responsive width', async ({ page }) => {
  const measure = () => page.locator('.activity-matrix-shell').evaluate((shell) => {
    const axisTrack = shell.querySelector('.activity-axis-track').getBoundingClientRect();
    const row = shell.querySelector('[data-group="both"] [data-matrix-row]:not([hidden])');
    const rowTrack = row.querySelector('[data-matrix-track]').getBoundingClientRect();
    const label = row.querySelector('.matrix-entity-label').getBoundingClientRect();
    const newestTick = shell.querySelector('[data-activity-tick][data-tick-year="2026"]').getBoundingClientRect();
    const axisGuides = [...shell.querySelectorAll('.activity-axis-track .activity-guides span')]
      .map((guide) => guide.getBoundingClientRect().left);
    const rowGuides = [...row.querySelectorAll('.activity-guides span')]
      .map((guide) => guide.getBoundingClientRect().left);
    return {
      axisLeft: axisTrack.left,
      axisWidth: axisTrack.width,
      rowLeft: rowTrack.left,
      rowWidth: rowTrack.width,
      labelRight: label.right,
      newestTickLeft: newestTick.left,
      axisGuides,
      rowGuides,
      documentClientWidth: document.documentElement.clientWidth,
      documentScrollWidth: document.documentElement.scrollWidth,
    };
  });
  const expectAligned = (geometry, label) => {
    expect(Math.abs(geometry.axisLeft - geometry.rowLeft), `${label} track left`).toBeLessThanOrEqual(1);
    expect(Math.abs(geometry.axisWidth - geometry.rowWidth), `${label} track width`).toBeLessThanOrEqual(1);
    expect(geometry.axisGuides).toHaveLength(geometry.rowGuides.length);
    geometry.axisGuides.forEach((axisGuide, index) => {
      expect(Math.abs(axisGuide - geometry.rowGuides[index]), `${label} guide ${index}`).toBeLessThanOrEqual(1);
    });
    expect(geometry.documentScrollWidth, `${label} page overflow`).toBe(geometry.documentClientWidth);
  };
  let referenceBundles;

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1280, height: 800 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('./');
    await expectExplorerReady(page);
    const bundles = await page.locator('[data-group="both"] [data-matrix-bundle]').evaluateAll((nodes) => (
      nodes.map((bundle) => ({
        entity: bundle.closest('[data-matrix-row]').getAttribute('data-entity-id'),
        eventIds: bundle.getAttribute('data-bundle-event-ids'),
        x: bundle.getAttribute('data-bundle-x'),
        slot: bundle.getAttribute('data-collision-slot'),
      }))
    ));
    if (!referenceBundles) referenceBundles = bundles;
    else expect(bundles, `${viewport.width}px bundle geometry`).toEqual(referenceBundles);
    const initial = await measure();
    expectAligned(initial, `${viewport.width}px initial`);
    expect(initial.newestTickLeft, `${viewport.width}px 2026 tick clears label column`)
      .toBeGreaterThanOrEqual(initial.labelRight - 1);

    if (viewport.width === 390) {
      const overlappingControls = await page.locator('[data-group="both"] [data-matrix-bundle]:visible')
        .evaluateAll((bundleNodes) => bundleNodes.flatMap((bundle) => {
          const controls = [...bundle.querySelectorAll('[data-bundle-member]:not([hidden])')]
            .map((member) => member.getBoundingClientRect());
          const overlaps = [];
          for (let left = 0; left < controls.length; left += 1) {
            for (let right = left + 1; right < controls.length; right += 1) {
              if (controls[left].left < controls[right].right
                && controls[left].right > controls[right].left
                && controls[left].top < controls[right].bottom
                && controls[left].bottom > controls[right].top) overlaps.push(bundle.getAttribute('data-bundle-key'));
            }
          }
          return overlaps;
        }));
      expect(overlappingControls).toEqual([]);
      await page.locator('[data-timeline-scroll]').evaluate((scroller) => {
        scroller.scrollLeft = 200;
        scroller.dispatchEvent(new Event('scroll'));
      });
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => resolve())));
      expectAligned(await measure(), '390px scrolled');
    }
  }
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
  const label = page.locator('[data-group="both"] [data-matrix-row]:visible').first().locator('.matrix-entity-label');
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

test('global Matrix defaults to an accessible interleaved view with restrained entity colors', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'both');
  await expect(page.locator('[data-view]')).toHaveValue('both');
  await expect(page.locator('[data-view] option')).toHaveText(['All types', 'Companies', 'People']);
  await expect(page.locator('[data-group="both"]')).toBeVisible();
  await expect(page.locator('[data-group="companies"]')).toBeHidden();
  await expect(page.locator('[data-group="people"]')).toBeHidden();
  await expect(page.locator('.lane-group-row, .lane-group-label, [data-group-label]')).toHaveCount(0);
  const visualGrammar = await page.locator('[data-group="both"] [data-matrix-row]:visible').first().evaluate((row) => {
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
  expect(visualGrammar.hitWidth).toBeLessThanOrEqual(18);
  expect(visualGrammar.glyphWidth).toBeLessThanOrEqual(14);
  const longLabel = page.locator('[data-group="both"] [data-matrix-row][data-entity-id="cadence"] .matrix-entity-label');
  await expect(longLabel).toHaveText('Cadence Design Systems');
  await expect(longLabel).toHaveAttribute('title', 'Cadence Design Systems');

  const companyLabel = page.locator('[data-group="both"] [data-matrix-row][data-entity-type="company"]:visible')
    .first().locator('.matrix-entity-label');
  const personLabel = page.locator('[data-group="both"] [data-matrix-row][data-entity-type="person"]:visible')
    .first().locator('.matrix-entity-label');
  await expect(companyLabel).toHaveAttribute('data-entity-type', 'company');
  await expect(companyLabel).toHaveAttribute('aria-label', /^Company: /);
  await expect(companyLabel).toHaveAttribute('href', /\/companies\//);
  await expect(personLabel).toHaveAttribute('data-entity-type', 'person');
  await expect(personLabel).toHaveAttribute('aria-label', /^Person: /);
  await expect(personLabel).toHaveAttribute('href', /\/people\//);

  for (const colorScheme of ['light', 'dark']) {
    await page.emulateMedia({ colorScheme });
    const colors = await page.locator('[data-group="both"]').evaluate((group) => {
      const company = group.querySelector('[data-matrix-row][data-entity-type="company"]:not([hidden]) .matrix-entity-label');
      const person = group.querySelector('[data-matrix-row][data-entity-type="person"]:not([hidden]) .matrix-entity-label');
      const technical = document.querySelector('.legend-mark.event-kind-technical');
      const organizational = document.querySelector('.legend-mark.event-kind-organizational');
      const parse = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
      const luminance = (value) => {
        const channels = parse(value).map((channel) => {
          const normalized = channel / 255;
          return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
      };
      const personColor = getComputedStyle(person).color;
      const personBackground = getComputedStyle(person).backgroundColor;
      const foreground = luminance(personColor);
      const background = luminance(personBackground);
      return {
        company: getComputedStyle(company).color,
        person: personColor,
        technical: getComputedStyle(technical).backgroundColor,
        organizational: getComputedStyle(organizational).backgroundColor,
        contrast: (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
      };
    });
    expect(colors.person, `${colorScheme} Person versus Company`).not.toBe(colors.company);
    expect(colors.person, `${colorScheme} Person versus Technical`).not.toBe(colors.technical);
    expect(colors.person, `${colorScheme} Person versus Organizational`).not.toBe(colors.organizational);
    expect(colors.contrast, `${colorScheme} Person label contrast`).toBeGreaterThanOrEqual(4.5);
  }
});

test('global explorer defaults and resets to Companies + People with explicit alternate views', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';

    await page.goto(path);
    await expectExplorerReady(page, surface);
    await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-default-view', 'both');
    await expect(page.locator('[data-view]')).toHaveValue('both');
    expect(new URL(page.url()).searchParams.has('view')).toBe(false);

    for (const viewValue of ['companies', 'people', 'both']) {
      await page.goto(`${path}?view=${viewValue}`);
      await expectExplorerReady(page, surface);
      await expect(page.locator('[data-view]')).toHaveValue(viewValue);
      if (viewValue === 'both') expect(new URL(page.url()).searchParams.has('view')).toBe(false);
      else expect(new URL(page.url()).searchParams.get('view')).toBe(viewValue);

      if (surface === 'timeline') {
        const expectedVisibleGroup = viewValue;
        for (const group of ['both', 'companies', 'people']) {
          if (group === expectedVisibleGroup) await expect(page.locator(`[data-group="${group}"]`)).toBeVisible();
          else await expect(page.locator(`[data-group="${group}"]`)).toBeHidden();
        }
        if (viewValue === 'people') {
          await expect(page.locator('[data-group="people"] [data-matrix-row]:visible').first())
            .toHaveAttribute('data-entity-id', 'peter-grove');
          await expect(page.locator('[data-detail-event]')).toHaveAttribute(
            'href',
            `${basePath}events/ecosystem-2025-02-uvm-ms-1-standard/`,
          );
        } else {
          await expect(page.locator(`[data-group="${viewValue}"] [data-matrix-row]:visible`).first())
            .toHaveAttribute('data-entity-id', 'apple');
        }
      }
    }

    await page.locator('[data-search]').fill('PLL');
    await page.locator('[data-view]').selectOption('people');
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
  expect(options).toEqual(['All types', 'Technical', 'Organizational']);
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
  await expect(page.locator('[data-status]')).toHaveText('56 of 90 events');
  const recurringBroadcom = page.locator('[data-group="both"] [data-matrix-row][data-entity-id="broadcom"]');
  await expect(recurringBroadcom).toBeVisible();
  await expect(recurringBroadcom.locator('[data-matrix-mark]:visible')).toHaveCount(1);
  await page.locator('[data-kind]').selectOption('organizational');
  await expect(page.locator('[data-status]')).toHaveText('22 of 90 events');
  await expect(page.locator('[data-group="both"] [data-matrix-row][data-entity-id="google"]')).toBeHidden();
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
  await expect(row.getByRole('link', { name: 'Event', exact: true })).toHaveAttribute('href', `${basePath}events/${eventId}/`);

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

test('Timeline and Events controls use normalized public terminology and stay aligned', async ({ page }) => {
  const removedCopy = 'Lexical search across events, evidence, companies, and people.';

  for (const path of ['./', './events/']) {
    await page.goto(`${path}?companies=apple,renesas&kind=technical&q=PLL&view=people`);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    await expect(page.getByText(removedCopy, { exact: true })).toHaveCount(0);
    await expect(page.locator('.search-control > span')).toHaveText('Search events');
    await expect(page.locator('label:has([data-view]) > span')).toHaveText('Entity type');
    await expect(page.locator('[data-view] option')).toHaveText(['All types', 'Companies', 'People']);
    await expect(page.locator('label:has([data-kind]) > span')).toHaveText('Signal type');
    await expect(page.locator('[data-kind] option')).toHaveText(['All types', 'Technical', 'Organizational']);
    await expect(page.locator('[data-company-picker] summary > span')).toHaveText('Company filter');
    await expect(page.locator('[data-company-summary]')).toHaveText('Apple + Renesas Electronics');
    await expect(page.locator('.event-filters').getByText('Search the factual record', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('View', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('All signals', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('Company focus', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText(/active companies/i)).toHaveCount(0);

    await page.locator('[data-company-picker] summary').click();
    await expect(page.getByRole('button', { name: 'Select all', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible();
    await page.locator('[data-company-picker] summary').click();

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
    await expect(page.locator('[data-company-summary]')).toHaveText('All 41 with events');
  }
});

test('Inspector and context pages use Event, Evidence, and Entity terminology', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);
  await expect(page.locator('[data-detail-placeholder] h2')).toHaveText('Select an event');
  await expect(page.locator('[data-detail-placeholder] > p:last-child'))
    .toHaveText('Choose a Timeline mark to inspect the event and its evidence.');
  await expect(page.locator('[data-detail-event]')).toHaveText('Open event →');
  await expect(page.locator('[data-detail-cluster], [data-detail-cluster-select]')).toHaveCount(0);

  await page.goto('./companies/omnivision/');
  const sparseState = page.locator('.sparse-state');
  await expect(sparseState.getByRole('heading')).toHaveText('No events are currently indexed');
  await expect(sparseState).toContainText('did not produce an event for the Timeline');
  await expect(sparseState.getByRole('link', { name: 'Return to Timeline →' })).toHaveAttribute('href', basePath);
  await expect(sparseState.getByText(/Golden|milestone/i)).toHaveCount(0);

  await page.goto('./people/toshi-kawashima/');
  await expect(page.getByText('PERSON TIMELINE', { exact: true })).toBeVisible();
  await expect(page.getByText('PEOPLE TIMELINE', { exact: true })).toHaveCount(0);
  await expect(page.locator('.intro .lede')).toHaveText('Public technical and organizational events indexed by this site.');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Public technical and organizational Events linked to Toshi Kawashima.',
  );

  const eventId = 'apple-2026-04-pmu-dms';
  await page.goto(`./events/${eventId}/`);
  await expect(page.getByRole('heading', { name: 'Evidence', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sources', exact: true })).toHaveCount(0);
  await expect(page.locator('.record-context')).toHaveAttribute('aria-label', 'Linked entities');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Factual public Event and supporting evidence for /);
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

  await page.goto('./?q=Google');
  await expectExplorerReady(page);
  await expect(page.locator(
    '[data-group="both"] [data-matrix-row][data-entity-type="company"][data-entity-id="google"]',
  )).toBeVisible();
  const narrowDocumentWidth = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(narrowDocumentWidth.scrollWidth).toBe(narrowDocumentWidth.clientWidth);

  await page.goto('./events/?companies=apple,renesas&q=PLL');
  await expectExplorerReady(page, 'events');
  await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toBeVisible();
  await expect(page.locator('.site-header nav a')).toHaveCount(2);
});
