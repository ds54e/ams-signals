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
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RNM|mixed-signal/i);
  await expect(page.locator('h1.visually-hidden')).toHaveText('AMS Signals Timeline');
  await expect(page.locator('main > .intro')).toHaveCount(0);
  await expect(page.getByText('FACTUAL PUBLIC TIMELINE', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Public signals in RNM & mixed-signal verification', { exact: true })).toHaveCount(0);
  await expect(page.locator('a.brand')).toHaveAttribute('href', basePath);
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('href', `${basePath}events/`);
  await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveAttribute('href', `${basePath}articles/`);
  await expect(page.locator('.site-header nav a')).toHaveText(['Timeline', 'Events', 'Articles']);
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

test('Articles publishes every authored document and keeps editorial links separate', async ({ page }) => {
  for (const path of ['./', './events/']) {
    await page.goto(path);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    await expect(page.locator('a[href*="/analysis/"]')).toHaveCount(0);
    await expect(page.locator('.site-header nav a')).toHaveText(['Timeline', 'Events', 'Articles']);
  }

  const indexResponse = await page.request.get('./analysis/');
  const articleResponse = await page.request.get('./analysis/from-behavioral-models-to-managed-verification-assets/');
  expect(indexResponse.status()).toBe(404);
  expect(articleResponse.status()).toBe(404);

  await page.goto('./?q=PLL&companies=apple');
  await expectExplorerReady(page);
  const articlesLink = page.getByRole('link', { name: 'Articles', exact: true });
  await expect(articlesLink).toHaveAttribute('href', `${basePath}articles/`);
  await expect(articlesLink).not.toHaveAttribute('data-filter-view-link', '');
  await articlesLink.click();

  expect(new URL(page.url()).pathname).toBe(`${basePath}articles/`);
  expect(new URL(page.url()).search).toBe('');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await expect(page).toHaveTitle('Articles · AMS Signals');
  await expect(page.locator('h1#articles-heading')).toHaveText('Articles');
  await expect(page.locator('h1#articles-heading')).toHaveClass(/visually-hidden/);
  await expect(page.locator('.article-index .eyebrow, .article-index-header')).toHaveCount(0);
  await expect(page.getByText('No articles yet.', { exact: true })).toHaveCount(0);
  const articleLinks = page.locator('.article-list > li h2 a');
  const indexUrl = page.url();
  const articleEntries = await articleLinks.evaluateAll((links) => links.map((link) => ({
    title: link.textContent?.trim() ?? '',
    href: link.getAttribute('href') ?? '',
  })));
  expect(articleEntries.length, 'Articles index should publish at least one Article').toBeGreaterThan(0);

  const articles = articleEntries.map(({ title, href }) => ({
    title,
    href: new URL(href, indexUrl).href,
  }));
  for (const [index, article] of articles.entries()) {
    await expect(articleLinks.nth(index)).toBeVisible();
    expect(article.title, `Article title for ${article.href}`).not.toBe('');
    const articleUrl = new URL(article.href);
    expect(articleUrl.origin).toBe(new URL(indexUrl).origin);
    expect(articleUrl.pathname).toMatch(new RegExp(`^${basePath}articles/[^/]+/$`));
  }
  expect(new Set(articles.map(({ href }) => href)).size).toBe(articles.length);
  await expect(page.locator('.article-list > li > p')).toHaveCount(0);
  const indexLayout = await page.locator('.article-index').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      left: rect.left,
      right: document.documentElement.clientWidth - rect.right,
    };
  });
  expect(indexLayout.width).toBeLessThanOrEqual(920);
  expect(Math.abs(indexLayout.left - indexLayout.right)).toBeLessThanOrEqual(1);
  await expect(page.locator('main article')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).not.toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).not.toHaveAttribute('aria-current', 'page');
  expect((await page.request.get('./articles/__nonexistent-smoke-route__/')).status()).toBe(404);

  for (const article of articles) {
    const errorCountBeforeNavigation = browserErrors.get(page).length;
    const response = await page.goto(article.href);
    expect(response?.status(), `HTTP status for ${article.href}`).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    await expect(page.getByRole('heading', { name: article.title, exact: true, level: 1 })).toBeVisible();
    await expect(page.locator('.article-page > .back-link, .article-header .eyebrow')).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', { name: 'Timeline', exact: true })).not.toHaveAttribute('aria-current', 'page');
    await expect(page.getByRole('link', { name: 'Events', exact: true })).not.toHaveAttribute('aria-current', 'page');

    const articleLayout = await page.locator('.article-page').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const title = element.querySelector('h1');
      return {
        width: rect.width,
        left: rect.left,
        right: document.documentElement.clientWidth - rect.right,
        titleFontSize: Number.parseFloat(getComputedStyle(title).fontSize),
      };
    });
    expect(articleLayout.width).toBeLessThanOrEqual(800);
    expect(Math.abs(articleLayout.left - articleLayout.right)).toBeLessThanOrEqual(1);
    expect(articleLayout.titleFontSize).toBeLessThanOrEqual(44);

    const sourceSection = page.locator('.article-sources');
    const sourceRows = sourceSection.locator(':scope > ol > li');
    const sourceSectionCount = await sourceSection.count();
    expect(sourceSectionCount, `Sources section count for ${article.href}`).toBeLessThanOrEqual(1);
    const citationHrefs = await page.locator('.article-body a[href^="#source-"]').evaluateAll((links) => (
      links.map((link) => link.getAttribute('href') ?? '')
    ));
    await expect(page.locator('.article-body a[href^="http://"], .article-body a[href^="https://"]'))
      .toHaveCount(0);

    if (sourceSectionCount === 0) {
      expect(citationHrefs).toEqual([]);
    } else {
      await expect(sourceSection.getByRole('heading', { name: 'Sources', exact: true, level: 2 })).toBeVisible();
      const sources = await sourceRows.evaluateAll((rows) => rows.map((row) => ({
        id: row.id,
        number: row.querySelector('.article-source-number')?.textContent?.trim() ?? '',
        href: row.querySelector('a')?.href ?? '',
      })));
      expect(sources.length, `Source rows for ${article.href}`).toBeGreaterThan(0);
      expect(sources.map(({ id }) => id)).toEqual(sources.map((_, index) => `source-${index + 1}`));
      expect(sources.map(({ number }) => number)).toEqual(sources.map((_, index) => `[${index + 1}]`));
      expect(new Set(sources.map(({ id }) => id)).size).toBe(sources.length);
      expect(new Set(sources.map(({ href }) => href)).size).toBe(sources.length);

      for (const source of sources) {
        const sourceUrl = new URL(source.href);
        expect(['http:', 'https:']).toContain(sourceUrl.protocol);
        expect(sourceUrl.origin).not.toBe(new URL(article.href).origin);
        expect([...sourceUrl.searchParams.keys()].some((key) => key.toLowerCase().startsWith('utm_'))).toBe(false);
        expect(citationHrefs).toContain(`#${source.id}`);
      }
      for (const citationHref of citationHrefs) {
        expect(sources.map(({ id }) => `#${id}`)).toContain(citationHref);
        await expect(page.locator(citationHref)).toHaveCount(1);
      }
      if (citationHrefs.length > 0) {
        await page.locator(`.article-body a[href="${citationHrefs[0]}"]`).first().click();
        expect(new URL(page.url()).hash).toBe(citationHrefs[0]);
        await expect(page.locator(citationHrefs[0])).toBeInViewport();
      }
    }

    const relatedSection = page.locator('.article-related');
    const relatedSectionCount = await relatedSection.count();
    expect(relatedSectionCount, `Related events section count for ${article.href}`).toBeLessThanOrEqual(1);
    const relatedEventHrefs = await relatedSection.locator('a[href]').evaluateAll((links) => (
      links.map((link) => link.getAttribute('href') ?? '')
    ));

    if (relatedSectionCount === 0) {
      expect(relatedEventHrefs).toEqual([]);
    } else {
      await expect(relatedSection.getByRole('heading', { name: 'Related events', exact: true, level: 2 }))
        .toBeVisible();
      expect(relatedEventHrefs.length, `Related Event links for ${article.href}`).toBeGreaterThan(0);
    }

    const normalizedEventHrefs = relatedEventHrefs.map((href) => new URL(href, article.href).href);
    expect(new Set(normalizedEventHrefs).size, `Unique Related Event links for ${article.href}`)
      .toBe(normalizedEventHrefs.length);
    for (const eventHref of normalizedEventHrefs) {
      const eventUrl = new URL(eventHref);
      expect(eventUrl.origin).toBe(new URL(article.href).origin);
      expect(eventUrl.pathname).toMatch(new RegExp(`^${basePath}events/[^/]+/$`));
      expect((await page.request.get(eventHref)).status()).toBe(200);
    }

    if (sourceSectionCount > 0 && relatedSectionCount > 0) {
      const terminalOrder = await page.locator('.article-page > section').evaluateAll((sections) => (
        sections.map((section) => section.classList.contains('article-sources')
          ? 'sources'
          : section.classList.contains('article-related') ? 'related' : 'other')
      ));
      expect(terminalOrder.indexOf('sources')).toBeLessThan(terminalOrder.indexOf('related'));
    }

    expect(
      browserErrors.get(page).slice(errorCountBeforeNavigation),
      `browser console and page errors for ${article.href}`,
    ).toEqual([]);
  }
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
  expect(payload.companies).toHaveLength(44);
  expect(payload.people).toHaveLength(25);
  expect(payload.events).toHaveLength(121);

  expect(payload.companies.map(({ name }) => name)).toEqual(
    payload.companies.map(({ name }) => name).slice().sort((left, right) => left.localeCompare(right, 'en')),
  );
  expect(payload.people.map(({ name }) => name)).toEqual(
    payload.people.map(({ name }) => name).slice().sort((left, right) => left.localeCompare(right, 'en')),
  );
  expect(payload.events.map(({ id }) => id)).toEqual(payload.events.slice().sort((left, right) => (
    right.when.start.localeCompare(left.when.start) || left.id.localeCompare(right.id, 'en')
  )).map(({ id }) => id));

  expect(payload.events.filter(({ kind }) => kind === 'technical')).toHaveLength(89);
  expect(payload.events.filter(({ kind }) => kind === 'organizational')).toHaveLength(32);
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining([
    'bosch-sensortec',
    'cirrus-logic',
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
    expect.objectContaining({ companies: ['renesas'], people: ['selcuk-talay'] }),
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
    expect.objectContaining({ companies: ['renesas'], people: ['carsten-wegener'] }),
  );
  expect([...overseasPeopleWaveEvents.values()].every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  expect(payload.events.filter(({ people }) => people.includes('felix-assmann')).map(({ id }) => id))
    .toEqual(['bosch-sensortec-2015-uvm-wreal-full-chip-mixed-signal-verification']);

  const globalWaveCompanyIds = [
    'ams-osram',
    'google',
    'hewlett-packard',
    'ibm',
    'infineon',
    'intel',
    'mathworks',
    'medtronic',
    'meta',
    'roche-sequencing-solutions',
    'samsung',
    'stmicroelectronics',
    'toshiba-electronic-devices-storage',
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

  const leadingSignalsCompanyIds = [
    'amd',
    'coseda-technologies',
    'designers-guide-consulting',
    'innophase',
    'micron',
    'microsoft',
    'thine-electronics',
    'ulkasemi',
  ];
  const leadingSignalsPeopleIds = [
    'aadhar-sharma',
    'guha-lakshmanan',
    'henry-chang',
    'simul-barua',
    'stijn-ringeling',
    'thilo-voertler',
    'venkateswaran-padmanabhan',
  ];
  const leadingSignalsEventIds = [
    'amd-2026-pll-ams-verification-lead-hiring',
    'ams-osram-2025-early-power-dms-modeling',
    'analog-devices-2026-ai-ml-ams-verification-hiring',
    'apple-2026-london-ams-dv-team-hiring',
    'cadence-2026-generative-ai-rnm-internship',
    'cadence-2026-metamorphic-testing-rnm',
    'coseda-2022-systemc-ams-abv-library',
    'coseda-2025-systemc-ams-assertion-library',
    'innophase-2024-uvm-testbench-automation-ams',
    'microchip-2026-selective-spice-digital-top-verification',
    'micron-2026-ams-verification-ai-assisted-coding-hiring',
    'microsoft-2025-additive-ai-bandgap-verification',
    'nxp-2025-gyroscope-uvm-ms-modeling',
    'nxp-2025-sigma-delta-model-evaluation-acceleration',
    'nxp-2026-ai-high-sigma-analog-verification',
    'samsung-2026-ams-verification-hiring',
    'stijn-ringeling-2026-ml-sigma-delta-evaluation',
    'stmicroelectronics-2025-ai-high-sigma-analog-verification',
    'stmicroelectronics-2025-full-chip-spice-verification',
    'stmicroelectronics-2025-upf-rnm-sram-verification',
    'synopsys-2026-serdes-ams-verification-manager-hiring',
    'texas-instruments-2023-ml-waveform-prediction',
    'texas-instruments-2024-adaptive-ams-glitch-checkers',
    'texas-instruments-2025-analog-assertion-coverage-toolbox',
    'texas-instruments-2025-eenet-analog-test-bus',
    'texas-instruments-2025-patent-ml-rnm-generation',
    'texas-instruments-2026-ana-modelgen-ams-model-generation',
    'texas-instruments-2026-uvm-ms-analog-vip',
    'thine-electronics-2025-ai-phase-interpolator-verification',
    'ulkasemi-2024-full-chip-uvm-analog-verification',
    'ulkasemi-2025-amsv-uvm-utility',
  ];
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.arrayContaining(leadingSignalsCompanyIds));
  expect(payload.people.map(({ id }) => id)).toEqual(expect.arrayContaining(leadingSignalsPeopleIds));
  expect(payload.events.map(({ id }) => id)).toEqual(expect.arrayContaining(leadingSignalsEventIds));
  const leadingSignalsEvents = payload.events.filter(({ id }) => leadingSignalsEventIds.includes(id));
  expect(leadingSignalsEvents).toHaveLength(31);
  expect(leadingSignalsEvents.filter(({ kind }) => kind === 'technical')).toHaveLength(24);
  expect(leadingSignalsEvents.filter(({ kind }) => kind === 'organizational')).toHaveLength(7);
  expect(leadingSignalsEvents.every((event) => !Object.hasOwn(event, 'affiliationChange'))).toBe(true);
  expect(leadingSignalsEvents.flatMap(({ sources }) => sources)
    .every(({ checkedAt }) => checkedAt === '2026-08-31')).toBe(true);
  expect(payload.events.find(({ id }) => id === 'stijn-ringeling-2026-ml-sigma-delta-evaluation')).toEqual(
    expect.objectContaining({ companies: [], people: ['stijn-ringeling'] }),
  );

  const canonicalCompanyCounts = new Map(payload.companies.map(({ id }) => [
    id,
    payload.events.filter((event) => event.companies.includes(id)).length,
  ]));
  expect(Object.fromEntries([
    'siemens-eda', 'nxp', 'renesas', 'analog-devices', 'amd', 'broadcom',
  ].map((id) => [id, canonicalCompanyCounts.get(id)]))).toEqual({
    'siemens-eda': 11,
    nxp: 11,
    renesas: 11,
    'analog-devices': 11,
    amd: 2,
    broadcom: 3,
  });
  const legacyCompanyIds = [
    'mentor-graphics',
    'freescale-semiconductor',
    'dialog-semiconductor',
    'maxim-integrated',
    'xilinx',
    'lsi',
  ];
  expect(payload.companies.map(({ id }) => id)).toEqual(expect.not.arrayContaining(legacyCompanyIds));
  expect(payload.events.flatMap(({ companies }) => companies)).toEqual(expect.not.arrayContaining(legacyCompanyIds));
  expect(Object.fromEntries(payload.companies
    .filter(({ id }) => [
      'analog-devices', 'cadence', 'coseda-technologies', 'designers-guide-consulting',
      'hewlett-packard', 'infineon', 'microchip', 'micron', 'nxp', 'renesas',
      'roche-sequencing-solutions', 'skyworks', 'sony-semiconductor-solutions',
      'stmicroelectronics', 'texas-instruments', 'thine-electronics',
      'toshiba-electronic-devices-storage',
    ].includes(id))
    .map(({ id, name }) => [id, name]))).toEqual({
    'analog-devices': 'Analog Devices',
    cadence: 'Cadence',
    'coseda-technologies': 'COSEDA',
    'designers-guide-consulting': "Designer's Guide",
    'hewlett-packard': 'HP',
    infineon: 'Infineon',
    microchip: 'Microchip',
    micron: 'Micron',
    nxp: 'NXP',
    renesas: 'Renesas',
    'roche-sequencing-solutions': 'Roche Sequencing',
    skyworks: 'Skyworks',
    'sony-semiconductor-solutions': 'Sony Semiconductor',
    stmicroelectronics: 'STMicroelectronics',
    'texas-instruments': 'Texas Instruments',
    'thine-electronics': 'THine',
    'toshiba-electronic-devices-storage': 'Toshiba',
  });

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

test('historical predecessor searches resolve through canonical Company groups', async ({ page }) => {
  for (const migration of [
    { term: 'Mentor', legacy: 'mentor-graphics', target: 'siemens-eda', targetName: 'Siemens EDA' },
    { term: 'Freescale', legacy: 'freescale-semiconductor', target: 'nxp', targetName: 'NXP' },
  ]) {
    await page.goto(`./?q=${migration.term}`);
    await expectExplorerReady(page);
    await expect(page.locator(`[data-matrix-row][data-entity-type="company"][data-entity-id="${migration.legacy}"]`))
      .toHaveCount(0);
    const canonicalRow = page.locator(
      `[data-matrix-row][data-entity-type="company"][data-entity-id="${migration.target}"]`,
    );
    await expect(canonicalRow).toBeVisible();
    await expect(canonicalRow.locator('[data-matrix-mark]:visible').first()).toBeVisible();
    await page.locator('[data-company-picker] summary').click();
    await expect(page.locator(`[data-company-options] input[value="${migration.legacy}"]`)).toHaveCount(0);
    await expect(page.locator(`[data-company-options] input[value="${migration.target}"]`)).toBeAttached();

    await page.goto(`./events/?q=${migration.term}`);
    await expectExplorerReady(page, 'events');
    await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
    await expect(page.locator('[data-event-result]:visible .result-context').getByRole(
      'link', { name: migration.targetName, exact: true },
    ).first()).toBeVisible();
    expect((await page.request.get(`./companies/${migration.legacy}/`)).status()).toBe(404);
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

test('Event bundles retain direct Event interaction and reduce cleanly under filtering', async ({ page }) => {
  const bundledIds = [
    'analog-devices-2019-power-aware-rnm-verification',
    'analog-devices-2017-rf-transceiver-soc-verification',
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
  await expect(bundle).toHaveAttribute('data-bundle-member-count', '4');
  await expect(bundle).toHaveAttribute('data-bundle-columns', '3');
  await expect(bundle).toHaveAttribute('data-bundle-rows', '2');
  await expect(bundle).toHaveAttribute('data-bundle-width-px', '52');
  await expect(bundle).toHaveAttribute('data-bundle-mode', 'period');
  await expect(bundle).toHaveAttribute('data-time-band', 'years-2015-2019');
  await expect(bundle).not.toHaveAttribute('data-bundle-window');
  await expect(bundle).not.toHaveAttribute('data-bundle-window-px');
  await expect(bundle.locator('[data-bundle-member]')).toHaveCount(4);
  await expect(page.locator('[data-cluster-count], [data-detail-cluster], .is-cluster, .is-mixed')).toHaveCount(0);
  await expect(bundle.locator('[data-bundle-member].event-kind-technical')).toHaveCount(4);
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
    top: node.getAttribute('data-bundle-top'),
    height: getComputedStyle(node).getPropertyValue('--bundle-height'),
    width: node.getAttribute('data-bundle-width-px'),
    columns: node.getAttribute('data-bundle-columns'),
    rows: node.getAttribute('data-bundle-rows'),
  }));
  await page.locator('[data-search]').fill('automatic real-number abstraction');
  await expect.poll(async () => JSON.parse(await bundle.getAttribute('data-visible-event-ids'))).toEqual([bundledIds[2]]);
  await expect(bundle).toHaveAttribute('data-visible-member-count', '1');
  await expect(bundle.locator('[data-bundle-member]:visible')).toHaveCount(1);
  expect(await bundle.evaluate((node) => ({
    eventIds: node.getAttribute('data-bundle-event-ids'),
    x: node.getAttribute('data-bundle-x'),
    slot: node.getAttribute('data-collision-slot'),
    top: node.getAttribute('data-bundle-top'),
    height: getComputedStyle(node).getPropertyValue('--bundle-height'),
    width: node.getAttribute('data-bundle-width-px'),
    columns: node.getAttribute('data-bundle-columns'),
    rows: node.getAttribute('data-bundle-rows'),
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

  await page.locator('[data-search]').fill('');
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
  expect(await resultSection.evaluate((section) => section.previousElementSibling?.classList.contains('event-filter-utility'))).toBe(true);
  await expect(page.locator('[data-status]')).toHaveText('121 of 121 events');
  await expect(page.locator('.event-filter-utility > .event-filter-summary')).toHaveText('121 of 121 events');
  await expect(page.locator('.event-filter-utility > .event-filter-summary > *')).toHaveCount(1);
  await expect(page.locator('.event-filter-utility .event-filter-summary .kind-legend')).toHaveCount(0);
  await expect(page.getByText('Newest first', { exact: true })).toHaveCount(0);
  await expect(page.locator(
    '[data-event-result][data-event-id="stijn-ringeling-2026-ml-sigma-delta-evaluation"]',
  )).toBeVisible();

  const ids = await page.locator('[data-event-result]').evaluateAll((events) => events.map((event) => event.getAttribute('data-event-id')));
  expect(ids.length).toBeGreaterThan(0);
  expect(new Set(ids).size).toBe(ids.length);
  await expect(page.locator('[data-event-result]').first().locator('time')).toBeVisible();
  await expect(page.locator('[data-event-result]').first().locator('.kind-badge')).toBeVisible();
  await expect(page.locator('[data-event-result]').first().locator('.result-fact')).toBeVisible();
  await expect(page.locator('[data-event-result]').first().locator('.result-body h3 a')).toBeVisible();
  await expect(page.locator('.result-links, [data-event-result] a[href^="http"]')).toHaveCount(0);

  const eventsLayout = await page.locator('[data-event-explorer-root]').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      left: rect.left,
      right: document.documentElement.clientWidth - rect.right,
    };
  });
  expect(eventsLayout.width).toBeLessThanOrEqual(920);
  expect(Math.abs(eventsLayout.left - eventsLayout.right)).toBeLessThanOrEqual(1);

  await page.locator('[data-search]').fill('PLL');
  await expect(page.locator('[data-event-result]:visible').first().locator('[data-result-match]')).toContainText('Matched in');

  await page.locator('[data-search]').fill('Recovery copy of Apple role 200659736');
  const evidenceMatch = page.locator('[data-event-result][data-event-id="apple-2026-04-pmu-dms"]');
  await expect(evidenceMatch).toBeVisible();
  await expect(evidenceMatch.locator('[data-result-match]')).toContainText('source summary');
});

test('Event detail is a centered factual document with Evidence and no editorial reverse links', async ({ page }) => {
  const eventId = 'apple-2026-pmu-ams-design-verification-team-hiring';
  const response = await page.goto(`./events/${eventId}/`);
  expect(response?.status()).toBe(200);

  const record = page.locator('.record-page');
  const layout = await record.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const title = element.querySelector('h1');
    return {
      width: rect.width,
      left: rect.left,
      right: document.documentElement.clientWidth - rect.right,
      titleFontSize: Number.parseFloat(getComputedStyle(title).fontSize),
    };
  });
  expect(layout.width).toBeLessThanOrEqual(800);
  expect(Math.abs(layout.left - layout.right)).toBeLessThanOrEqual(1);
  expect(layout.titleFontSize).toBeLessThanOrEqual(44);
  await expect(record.locator('.back-link')).toHaveCount(0);
  await expect(record.locator('.event-meta')).toContainText('Organizational');
  await expect(record.locator('.record-fact')).toBeVisible();
  await expect(record.getByRole('heading', { name: 'Evidence', exact: true, level: 2 })).toBeVisible();
  await expect(record.locator('.source-card')).not.toHaveCount(0);
  await expect(record.locator('.source-card').first().locator('a[href^="http"]')).toBeVisible();
  await expect(record.locator('.record-context a[href$="/companies/apple/"]')).toBeVisible();
  await expect(record.locator('.record-context a[href$="/people/selcuk-talay/"]')).toBeVisible();
  await expect(record.locator('.related-articles')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('aria-current', 'page');
});

test('People-only Events remain in the unfiltered corpus and obey narrowed Company filters', async ({ page }) => {
  const thesisEventId = 'stijn-ringeling-2026-ml-sigma-delta-evaluation';
  const nxpEventId = 'nxp-2025-sigma-delta-model-evaluation-acceleration';

  const payload = await (await page.request.get('./export.json')).json();
  expect(payload.events.find(({ id }) => id === thesisEventId)).toEqual(
    expect.objectContaining({ companies: [], people: ['stijn-ringeling'] }),
  );

  await page.goto('./');
  await expectExplorerReady(page);
  const stijnRow = page.locator(
    '[data-group="both"] [data-matrix-row][data-entity-type="person"][data-entity-id="stijn-ringeling"]',
  );
  const thesisMark = stijnRow.locator(`[data-matrix-mark][data-event-id="${thesisEventId}"]`);
  const nxpMark = stijnRow.locator(`[data-matrix-mark][data-event-id="${nxpEventId}"]`);
  await expect(stijnRow).toBeVisible();
  await expect(thesisMark).toBeVisible();

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  const thesisResult = page.locator(`[data-event-result][data-event-id="${thesisEventId}"]`);
  const nxpResult = page.locator(`[data-event-result][data-event-id="${nxpEventId}"]`);
  await expect(thesisResult).toBeVisible();
  await expect(nxpResult).toBeVisible();

  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await page.locator('[data-company-options] input[value="nxp"]').check();
  await expect.poll(() => new URL(page.url()).searchParams.get('companies')).toBe('nxp');
  await expect(thesisResult).toBeHidden();
  await expect(nxpResult).toBeVisible();

  await page.getByRole('button', { name: 'Select all', exact: true }).click();
  await expect(thesisResult).toBeVisible();
  expect(new URL(page.url()).searchParams.has('companies')).toBe(false);
  await page.locator('[data-search]').fill('transfer learning transistor-level');
  await expect(thesisResult).toBeVisible();

  await page.goto('./?companies=nxp');
  await expectExplorerReady(page);
  await expect(stijnRow).toBeVisible();
  await expect(thesisMark).toBeHidden();
  await expect(nxpMark).toBeVisible();
  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Select all', exact: true }).click();
  await expect(thesisMark).toBeVisible();
});

test('global Timeline Event sets remain subsets of the complete Events record', async ({ page }) => {
  const lenses = [
    '',
    '?q=PLL',
    '?companies=apple,renesas',
    '?companies=cirrus-logic&q=verification',
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
  expect(activeCompanyIds).toHaveLength(43);
  expect(singletonCompanyIds).toHaveLength(19);
  expect(activePersonIds).toHaveLength(25);
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
  await expect(singletonPickerOption.locator('xpath=..').locator('small')).toHaveText('1');

  await page.locator('[data-search]').fill(singletonCompany.name);
  await expect(combinedCompanyRow).toBeVisible();
  await expect(page.locator(`[data-matrix-mark][data-event-id="${companyEvent.id}"]:visible`).first()).toBeVisible();
  await page.locator('[data-search]').fill('');
  await expect(combinedCompanyRow).toBeHidden();

  await page.locator('[data-search]').fill(singletonPerson.name);
  await expect(combinedPersonRow).toBeVisible();
  await page.locator('[data-search]').fill('');
  await expect(combinedPersonRow).toBeHidden();

  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await singletonPickerOption.check();
  await expect(combinedCompanyRow).toBeVisible();
  expect(new URL(page.url()).searchParams.get('companies')).toBe(singletonCompany.id);

  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await page.locator('[data-company-options] input[value="cirrus-logic"]').check();
  await expect(combinedPersonRow).toBeVisible();

  await page.getByRole('button', { name: 'Select all', exact: true }).click();
  await expect(page.locator('[data-company-options] input:checked')).toHaveCount(43);
  await expect(combinedCompanyRow).toBeHidden();
  await expect(combinedPersonRow).toBeHidden();
});

test('Timeline and Events navigation preserves shared state without carrying hidden filters', async ({ page }) => {
  await page.goto('./events/?q=PLL&kind=organizational&companies=apple&view=people');
  await expectExplorerReady(page, 'events');
  expect(queryState(page.url())).toEqual({
    companies: 'apple',
    kind: 'organizational',
    q: 'PLL',
  });
  await expect(page.locator('[data-kind]')).toHaveValue('organizational');

  await page.getByRole('link', { name: 'Timeline', exact: true }).click();
  await expectExplorerReady(page);
  expect(new URL(page.url()).pathname).toBe(basePath);
  expect(queryState(page.url())).toEqual({ companies: 'apple', q: 'PLL' });
  await expect(page.locator('[data-kind], [data-view]')).toHaveCount(0);

  await page.getByRole('link', { name: 'Events', exact: true }).click();
  await expectExplorerReady(page, 'events');
  expect(new URL(page.url()).pathname).toBe(`${basePath}events/`);
  expect(queryState(page.url())).toEqual({ companies: 'apple', q: 'PLL' });
  await expect(page.locator('[data-kind]')).toHaveValue('all');
});

test('Company picker is readable, searchable, and independently clearable', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';
    await page.goto(path);
    await expectExplorerReady(page, surface);

    await page.locator('[data-search]').fill('RNM');
    if (surface === 'events') await page.locator('[data-kind]').selectOption('technical');
    await page.locator('[data-company-picker] summary').click();

    const checks = page.locator('[data-company-options] input');
    const checked = page.locator('[data-company-options] input:checked');
    const totalCompanies = await checks.count();
    expect(totalCompanies).toBe(43);
    await expect(page.getByRole('button', { name: 'Select all', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible();
    const pickerLayout = await page.locator('.company-picker-panel').evaluate((panel) => {
      const options = panel.querySelector('[data-company-options]');
      return {
        width: panel.getBoundingClientRect().width,
        height: panel.getBoundingClientRect().height,
        optionColumns: getComputedStyle(options).gridTemplateColumns,
        optionsClientHeight: options.clientHeight,
        optionsScrollHeight: options.scrollHeight,
      };
    });
    expect(pickerLayout.width).toBeGreaterThanOrEqual(340);
    expect(pickerLayout.width).toBeLessThanOrEqual(380);
    expect(pickerLayout.height).toBeGreaterThanOrEqual(400);
    expect(pickerLayout.height).toBeLessThanOrEqual(440);
    expect(pickerLayout.optionColumns).toMatch(/^\d+(?:\.\d+)?px$/);
    expect(pickerLayout.optionsScrollHeight).toBeGreaterThan(pickerLayout.optionsClientHeight);
    await expect(page.locator('[data-reset]')).toHaveCount(0);

    const optionNames = await page.locator('[data-company-option] > span').allTextContents();
    expect(optionNames).toEqual([...optionNames].sort((left, right) => left.localeCompare(right, 'en')));
    const eventFilterUrl = page.url();
    const checkedBeforePickerSearch = await checked.count();
    await page.locator('[data-company-search]').fill('sony');
    await expect(page.locator('[data-company-option]:visible')).toHaveCount(1);
    await expect(page.locator('[data-company-option]:visible > span')).toHaveText(['Sony Semiconductor']);
    expect(page.url()).toBe(eventFilterUrl);
    await expect(checked).toHaveCount(checkedBeforePickerSearch);
    await page.locator('[data-company-search]').fill('apple');
    await page.locator('[data-company-options] input[value="apple"]').uncheck();
    await page.locator('[data-company-search]').fill('sony');
    await page.locator('[data-company-search]').fill('apple');
    await expect(page.locator('[data-company-options] input[value="apple"]')).not.toBeChecked();
    await page.locator('[data-company-search]').fill('does-not-exist');
    await expect(page.locator('[data-company-options-empty]')).toBeVisible();
    await page.locator('[data-company-search]').fill('');
    await page.getByRole('button', { name: 'Select all', exact: true }).click();

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await expect(checked).toHaveCount(0);
    await expect(page.locator('[data-status]')).toHaveText('0 of 121 events');
    expect(new URL(page.url()).searchParams.get('companies')).toBe('none');
    if (surface === 'timeline') {
      await expect(page.locator('[data-event-mark]:visible')).toHaveCount(0);
    } else {
      await expect(page.locator('[data-event-result]:visible')).toHaveCount(0);
      await expect(page.locator('[data-filtered-empty]')).toBeVisible();
    }

    await page.getByRole('button', { name: 'Select all', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await expect(page.locator('[data-status]')).not.toHaveText('0 of 121 events');
    expect(new URL(page.url()).searchParams.has('companies')).toBe(false);

    await page.getByRole('button', { name: 'Clear all', exact: true }).click();
    await page.getByRole('button', { name: 'Select all', exact: true }).click();
    await expect(checked).toHaveCount(totalCompanies);
    await page.locator('[data-search]').fill('');
    if (surface === 'events') await page.locator('[data-kind]').selectOption('all');
    else await expect(page.locator('[data-kind]')).toHaveCount(0);
    expect(new URL(page.url()).search).toBe('');
  }
});

test('recent-activity row ordering and alphabetical Company picker stay filter-stable', async ({ page }) => {
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
      count: String(linked.length),
      recent3: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 2).length,
      recent5: linked.filter((event) => Number(event.when.start.slice(0, 4)) >= latestYear - 4).length,
      latest: linked[0]?.when.start ?? '',
      latestTimestamp: linked[0] ? startTimestamp(linked[0].when.start) : Number.NEGATIVE_INFINITY,
      total: linked.length,
    };
  }).filter(({ total }) => total > 0).sort(compareActivity);
  const expectedPicker = expectedCompanies
    .map(({ id, name, count }) => ({ id, name, count }))
    .sort((left, right) => left.name.localeCompare(right.name, 'en') || left.id.localeCompare(right.id, 'en'));
  const expectedIds = expectedCompanies.map(({ id }) => id);
  expect(expectedIds.slice(0, 10)).toEqual([
    'apple',
    'siemens-eda',
    'texas-instruments',
    'nxp',
    'cadence',
    'renesas',
    'synopsys',
    'samsung',
    'analog-devices',
    'skyworks',
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
    'aadhar-sharma',
    'henry-chang',
    'stijn-ringeling',
    'simul-barua',
    'peter-grove',
    'vijay-kumar',
    'thilo-voertler',
    'guha-lakshmanan',
    'venkateswaran-padmanabhan',
    'prabal-bhattacharya',
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
  expect(combinedRowData.filter(({ entityType }) => entityType === 'company').map(({ id }) => id)).toEqual(expectedIds);
  expect(combinedRowData.filter(({ entityType }) => entityType === 'person').map(({ id }) => id))
    .toEqual(expectedPeople.map(({ id }) => id));

  const expectedRecurringCombinedKeys = expectedCombined
    .filter(({ total }) => total >= 2)
    .map(({ entityType, id }) => `${entityType}:${id}`);
  const defaultVisibleCombinedKeys = await page.locator('[data-group="both"] [data-matrix-row]:visible')
    .evaluateAll((nodes) => nodes.map((node) => (
      `${node.getAttribute('data-entity-type')}:${node.getAttribute('data-entity-id')}`
    )));
  expect(defaultVisibleCombinedKeys).toEqual(expectedRecurringCombinedKeys);
  expect(defaultVisibleCombinedKeys).toHaveLength(43);

  await page.locator('[data-search]').fill('RNM');
  const visibleAfterSearch = await page.locator('[data-group="both"] [data-matrix-row]:visible')
    .evaluateAll((nodes) => nodes.map((node) => (
      `${node.getAttribute('data-entity-type')}:${node.getAttribute('data-entity-id')}`
    )));
  const expectedCombinedKeys = expectedCombined.map(({ entityType, id }) => `${entityType}:${id}`);
  expect(visibleAfterSearch).toEqual(expectedCombinedKeys.filter((key) => visibleAfterSearch.includes(key)));

  await page.locator('[data-search]').fill('');
  await page.locator('[data-search]').fill('verification');
  const visiblePeople = await page.locator('[data-group="both"] [data-matrix-row][data-entity-type="person"]:visible')
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
    await expect(page.locator('.entity-header h1')).toHaveText(company.name);
    await expect(page.locator('.entity-meta')).toContainText('0 indexed events');
    const emptyState = page.locator('.entity-empty-state');
    await expect(emptyState.getByRole('heading', { name: 'No events are currently indexed' })).toBeVisible();
    await expect(emptyState).toContainText('does not imply');
    await expect(page.getByText('RESEARCHED SPARSE RECORD', { exact: true })).toHaveCount(0);
    await expect(page.locator('.site-header nav [aria-current="page"]')).toHaveCount(0);
  }
});

test('global Activity Matrix uses progressive time bands and deterministic bundle modes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  const matrix = page.locator('[data-activity-matrix-surface]');
  await expect(matrix).toHaveAttribute('data-domain-oldest-year', '2010');
  await expect(matrix).toHaveAttribute('data-domain-latest-year', '2026');
  await expect(matrix).toHaveAttribute('data-track-width', '672');
  await expect(matrix).toHaveAttribute('data-time-band-count', '8');
  await expect(page.locator('[data-timeline-segment]')).toHaveCount(0);
  const bands = await page.locator('[data-activity-time-band]').evaluateAll((nodes) => nodes.map((node) => ({
    key: node.getAttribute('data-time-band'),
    label: node.getAttribute('data-band-label'),
    ariaLabel: node.getAttribute('data-band-aria-label'),
    startYear: node.hasAttribute('data-band-start-year')
      ? Number(node.getAttribute('data-band-start-year'))
      : undefined,
    endYear: Number(node.getAttribute('data-band-end-year')),
    widthPx: Number(node.getAttribute('data-band-width-px')),
    maxEventsPerRow: Number(node.getAttribute('data-band-max-events-per-row')),
    startPx: Number(node.getAttribute('data-band-start-px')),
    endPx: Number(node.getAttribute('data-band-end-px')),
    zone: node.getAttribute('data-time-zone'),
    resolution: node.getAttribute('data-time-resolution'),
  })));
  expect(bands).toEqual([
    { key: 'year-2026', label: '2026', ariaLabel: '2026', startYear: 2026, endYear: 2026, widthPx: 134, maxEventsPerRow: 6, startPx: 0, endPx: 134, zone: 'recent', resolution: 'continuous' },
    { key: 'year-2025', label: '2025', ariaLabel: '2025', startYear: 2025, endYear: 2025, widthPx: 114, maxEventsPerRow: 4, startPx: 134, endPx: 248, zone: 'recent', resolution: 'continuous' },
    { key: 'year-2024', label: '2024', ariaLabel: '2024', startYear: 2024, endYear: 2024, widthPx: 100, maxEventsPerRow: 2, startPx: 248, endPx: 348, zone: 'recent', resolution: 'continuous' },
    { key: 'year-2023', label: '2023', ariaLabel: '2023', startYear: 2023, endYear: 2023, widthPx: 52, maxEventsPerRow: 2, startPx: 348, endPx: 400, zone: 'earlier', resolution: 'bucket' },
    { key: 'year-2022', label: '2022', ariaLabel: '2022', startYear: 2022, endYear: 2022, widthPx: 52, maxEventsPerRow: 1, startPx: 400, endPx: 452, zone: 'earlier', resolution: 'bucket' },
    { key: 'years-2020-2021', label: '2020–2021', ariaLabel: '2020–2021', startYear: 2020, endYear: 2021, widthPx: 76, maxEventsPerRow: 2, startPx: 452, endPx: 528, zone: 'earlier', resolution: 'bucket' },
    { key: 'years-2015-2019', label: '2015–2019', ariaLabel: '2015–2019', startYear: 2015, endYear: 2019, widthPx: 76, maxEventsPerRow: 4, startPx: 528, endPx: 604, zone: 'earlier', resolution: 'bucket' },
    { key: 'through-2014', label: '≤2014', ariaLabel: '2014 and earlier', startYear: undefined, endYear: 2014, widthPx: 68, maxEventsPerRow: 5, startPx: 604, endPx: 672, zone: 'earlier', resolution: 'bucket' },
  ]);
  expect(bands.filter(({ resolution }) => resolution === 'continuous')).toHaveLength(3);
  expect(bands.filter(({ resolution }) => resolution === 'bucket')).toHaveLength(5);
  expect(bands.reduce((sum, { widthPx }) => sum + widthPx, 0)).toBe(672);
  await expect(page.locator('.activity-axis-track .activity-guides span')).toHaveCount(7);
  await expect(page.locator('.activity-axis-track .activity-guides .is-zone-boundary')).toHaveCount(0);
  await expect(page.locator('.activity-zone-label')).toHaveCount(0);
  await expect(page.locator('.activity-axis-track')).toHaveAttribute(
    'aria-label',
    'Activity Matrix time bands: 2026, 2025, 2024, 2023, 2022, 2020–2021, 2015–2019, 2014 and earlier. Newest is left.',
  );

  const serialized = await page.locator('[data-events-json]').evaluate((node) => JSON.parse(node.textContent));
  const eventById = new Map(serialized.map((event) => [event.id, event]));
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
  const bandForYear = (year) => bands.find((band) => (
    band.startYear === undefined
      ? year <= band.endYear
      : year >= band.startYear && year <= band.endYear
  ));
  const expectedX = (event) => {
    const timestamp = visualTimestamp(event);
    const year = new Date(timestamp).getUTCFullYear();
    const band = bandForYear(year);
    let xPx = band.startPx + (band.widthPx / 2);
    if (band.resolution === 'continuous') {
      const start = Date.UTC(year, 0, 1);
      const end = Date.UTC(year + 1, 0, 1);
      xPx = band.startPx + ((1 - ((timestamp - start) / (end - start))) * band.widthPx);
    }
    return (xPx / 672) * 100;
  };
  const marks = await page.locator('[data-matrix-mark]').evaluateAll((nodes) => nodes.map((node) => ({
    id: node.getAttribute('data-event-id'),
    originalX: Number(node.getAttribute('data-original-event-x')),
    bundleX: Number(node.getAttribute('data-event-x')),
    bundleIndex: Number(node.getAttribute('data-bundle-index')),
    placementTimestamp: Number(node.getAttribute('data-original-placement-timestamp')),
    timeBand: node.getAttribute('data-time-band'),
    timeZone: node.getAttribute('data-time-zone'),
    timeResolution: node.getAttribute('data-time-resolution'),
    bundleMode: node.getAttribute('data-bundle-mode'),
    lane: `${node.closest('[data-lane]').getAttribute('data-lane-type')}:${node.closest('[data-lane]').getAttribute('data-entity-id')}`,
  })));
  expect(new Set(marks.map(({ id }) => id))).toEqual(new Set(serialized.map(({ id }) => id)));
  for (const mark of marks) {
    const event = eventById.get(mark.id);
    const expectedBand = bandForYear(Number(event.start.slice(0, 4)));
    expect(mark.originalX, `${mark.id} uses its progressive projection`).toBeCloseTo(expectedX(event), 10);
    expect(mark.placementTimestamp, `${mark.id} retains exact placement timestamp`).toBe(visualTimestamp(event));
    expect(mark.timeBand).toBe(expectedBand.key);
    expect(mark.timeZone).toBe(expectedBand.zone);
    expect(mark.timeResolution).toBe(expectedBand.resolution);
    expect(mark.bundleMode).toBe(expectedBand.zone === 'recent' ? 'proximity' : 'period');
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
  expect(xByEvent.get('apple-2024-12-mixed-signal-behavioral-modeling')[0])
    .toBeLessThan(xByEvent.get('samsung-2024-sv-udt-eenet-pmic-verification')[0]);
  expect(xByEvent.get('analog-devices-2019-power-aware-rnm-verification')[0])
    .toBe(xByEvent.get('analog-devices-2016-sv-rnm-model-validation')[0]);
  expect(xByEvent.get('texas-instruments-2023-ml-waveform-prediction')[0])
    .not.toBe(xByEvent.get('texas-instruments-2021-ate-analog-fault-simulation')[0]);

  const proximityPx = Number(await page.locator('.activity-matrix-shell').getAttribute('data-bundle-proximity-px'));
  expect(proximityPx).toBe(32);
  const normalizedWindow = (proximityPx / 672) * 100;
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
      columns: Number(bundle.getAttribute('data-bundle-columns')),
      rowCount: Number(bundle.getAttribute('data-bundle-rows')),
      bundleWidthPx: Number(bundle.getAttribute('data-bundle-width-px')),
      collisionWidthPx: Number(bundle.getAttribute('data-collision-width-px')),
      slot: Number(bundle.getAttribute('data-collision-slot')),
      mode: bundle.getAttribute('data-bundle-mode'),
      zone: bundle.getAttribute('data-time-zone'),
      resolution: bundle.getAttribute('data-time-resolution'),
      bandKeys: JSON.parse(bundle.getAttribute('data-time-band-keys')),
      window: bundle.hasAttribute('data-bundle-window')
        ? Number(bundle.getAttribute('data-bundle-window'))
        : null,
      windowPx: bundle.hasAttribute('data-bundle-window-px')
        ? Number(bundle.getAttribute('data-bundle-window-px'))
        : null,
      members: [...bundle.querySelectorAll('[data-bundle-member]')].map((member) => ({
        id: member.getAttribute('data-event-id'),
        x: Number(member.getAttribute('data-original-event-x')),
        timestamp: Number(member.getAttribute('data-original-placement-timestamp')),
        band: member.getAttribute('data-time-band'),
        zone: member.getAttribute('data-time-zone'),
      })),
    })),
    borderBottom: getComputedStyle(node).borderBottomWidth,
    baselineContent: getComputedStyle(node.querySelector('[data-matrix-track]'), '::before').content,
  })));
  expect(rows.every(({ slotCount }) => slotCount >= 1)).toBe(true);
  expect(rows.some(({ height }) => height === 28)).toBe(true);
  expect(rows.some(({ height }) => height > 28)).toBe(true);
  expect(Math.max(...rows.flatMap(({ bundles }) => bundles.map(({ ids }) => ids.length)))).toBeGreaterThanOrEqual(4);
  expect(Math.max(...rows.flatMap(({ bundles }) => bundles.map(({ rowCount }) => rowCount)))).toBe(2);
  const slotsByLane = Object.fromEntries(rows.map(({ lane, slotCount }) => [lane, slotCount]));
  expect(Object.fromEntries([
    'apple', 'siemens-eda', 'nxp', 'analog-devices', 'stmicroelectronics', 'ams-osram',
  ].map((id) => [id, slotsByLane[`company:${id}`]]))).toEqual({
    apple: 2,
    'siemens-eda': 1,
    nxp: 1,
    'analog-devices': 1,
    stmicroelectronics: 1,
    'ams-osram': 1,
  });
  expect(rows.filter(({ slotCount }) => slotCount > 1).map(({ lane }) => lane)).toEqual(['company:apple']);
  for (const row of rows) {
    expect(row.borderBottom, `${row.lane} has no row rule`).toBe('0px');
    expect(row.baselineContent, `${row.lane} has no permanent baseline`).toBe('none');

    const allMembers = row.bundles.flatMap(({ members }) => members);
    const recentMembers = allMembers.filter(({ zone }) => zone === 'recent')
      .slice().sort((left, right) => left.x - right.x || left.id.localeCompare(right.id, 'en'));
    const expectedRecentGroups = [];
    for (const member of recentMembers) {
      const current = expectedRecentGroups.at(-1);
      if (!current || member.x - current[0].x > normalizedWindow) expectedRecentGroups.push([member]);
      else current.push(member);
    }
    const expectedGroups = [
      ...expectedRecentGroups.map((members) => ({ mode: 'proximity', members })),
      ...bands.filter(({ zone }) => zone === 'earlier').flatMap((band) => {
        const members = allMembers.filter((member) => member.band === band.key);
        return members.length ? [{ mode: 'period', members }] : [];
      }),
    ].map(({ mode, members }) => {
      const ordered = members.slice().sort((left, right) => (
        right.timestamp - left.timestamp || left.id.localeCompare(right.id, 'en')
      ));
      return {
        mode,
        ids: ordered.map(({ id }) => id),
        x: ordered.reduce((sum, member) => sum + member.x, 0) / ordered.length,
      };
    }).sort((left, right) => left.x - right.x || left.ids.join('|').localeCompare(right.ids.join('|'), 'en'));
    expect(row.bundles.map(({ mode, ids }) => ({ mode, ids })), `${row.lane} deterministic membership`)
      .toEqual(expectedGroups.map(({ mode, ids }) => ({ mode, ids })));

    for (const bundle of row.bundles) {
      expect(bundle.columns).toBe(Math.min(bundle.ids.length, 3));
      expect(bundle.rowCount).toBe(Math.ceil(bundle.ids.length / bundle.columns));
      expect(bundle.bundleWidthPx).toBe((bundle.columns * 16) + ((bundle.columns - 1) * 2));
      expect(bundle.collisionWidthPx).toBe(bundle.bundleWidthPx);
      expect(bundle.x, `${row.lane} bundle mean`).toBeCloseTo(
        bundle.members.reduce((sum, member) => sum + member.x, 0) / bundle.members.length,
        10,
      );
      expect(bundle.members.map(({ id }) => id)).toEqual(bundle.ids);
      expect(bundle.members).toEqual(bundle.members.slice().sort((left, right) => (
        right.timestamp - left.timestamp || left.id.localeCompare(right.id, 'en')
      )));
      if (bundle.mode === 'proximity') {
        expect(bundle.zone).toBe('recent');
        expect(bundle.resolution).toBe('continuous');
        expect(bundle.window).toBeCloseTo(normalizedWindow, 10);
        expect(bundle.windowPx).toBe(32);
        expect(bundle.maxX - bundle.minX, `${row.lane} bounded recent span`)
          .toBeLessThanOrEqual(normalizedWindow + 1e-10);
        expect(bundle.maxDisplacement, `${row.lane} bounded recent displacement`)
          .toBeLessThanOrEqual(normalizedWindow + 1e-10);
      } else {
        expect(bundle.zone).toBe('earlier');
        expect(bundle.resolution).toBe('bucket');
        expect(bundle.bandKeys).toHaveLength(1);
        expect(bundle.window).toBeNull();
        expect(bundle.windowPx).toBeNull();
        expect(new Set(bundle.members.map(({ band }) => band)).size).toBe(1);
        expect(new Set(bundle.members.map(({ x }) => x)).size).toBe(1);
        expect(bundle.maxDisplacement).toBe(0);
      }
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
  await expect(page.locator('[data-activity-time-band]')).toHaveText([
    '2026', '2025', '2024', '2023', '2022', '2020–2021', '2015–2019', '≤2014',
  ]);

  await page.goto('./companies/apple/');
  await expectExplorerReady(page);
  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-activity-matrix-surface]')).toHaveCount(0);
  await expect(page.locator('[data-timeline-segment][data-segment-key="through-2020"]'))
    .toHaveAttribute('data-segment-label', '2020–2018');
});

test('Timeline utility bar places count and legend beside the compact controls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  const utility = page.locator('.event-filter-utility');
  const summary = utility.locator(':scope > .event-filter-summary');
  const representedIds = await visibleTimelineEventIds(page);
  expect(representedIds).toHaveLength(110);
  await expect(summary.locator(':scope > .event-filter-status')).toHaveText('110 of 121 events');
  await expect(summary.locator(':scope > .kind-legend')).toContainText('Technical');
  await expect(summary.locator(':scope > .kind-legend')).toContainText('Organizational');
  await expect(summary.locator(':scope > .activity-order-note')).toHaveCount(0);
  await expect(summary.locator(':scope > *')).toHaveCount(2);
  await expect(page.locator('.event-explorer > .event-filter-summary')).toHaveCount(0);
  await expect(utility.locator(':scope + .timeline-workspace')).toHaveCount(1);
  await expect(page.locator('.axis-note, .timeline-summary-detail')).toHaveCount(0);
  await expect(page.getByText('Newest first', { exact: true })).toHaveCount(0);
  await expect(page.getByText(/density-adjusted/i)).toHaveCount(0);

  const layout = await utility.evaluate((node) => {
    const box = (element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, width: rect.width };
    };
    const search = box(node.querySelector('[data-search]'));
    const company = box(node.querySelector('[data-company-picker] summary'));
    const summaryBox = box(node.querySelector('.event-filter-summary'));
    const status = node.querySelector('[data-status]').getBoundingClientRect();
    const legend = node.querySelector('.kind-legend').getBoundingClientRect();
    return {
      search,
      company,
      summary: summaryBox,
      statusLeft: status.left,
      statusRight: status.right,
      statusTop: status.top,
      legendLeft: legend.left,
      legendTop: legend.top,
    };
  });
  expect(layout.search.width).toBeGreaterThanOrEqual(220);
  expect(layout.search.width).toBeLessThanOrEqual(340);
  expect(layout.company.left).toBeGreaterThan(layout.search.right);
  expect(layout.summary.left).toBeGreaterThan(layout.company.right + 100);
  expect(Math.abs(layout.search.top - layout.company.top)).toBeLessThanOrEqual(1);
  expect(Math.abs(layout.summary.top - layout.company.top)).toBeLessThanOrEqual(1);
  expect(layout.legendLeft).toBeGreaterThan(layout.statusRight);
  expect(Math.abs(layout.legendTop - layout.statusTop)).toBeLessThanOrEqual(1);
});

test('Search and Company filter never change Matrix geometry or row order', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  const geometry = () => page.locator('[data-timeline-root]').evaluate((root) => ({
    trackWidth: root.querySelector('[data-activity-matrix-surface]')?.getAttribute('data-track-width'),
    domain: [
      root.querySelector('[data-activity-matrix-surface]')?.getAttribute('data-domain-latest-year'),
      root.querySelector('[data-activity-matrix-surface]')?.getAttribute('data-domain-oldest-year'),
    ],
    bands: [...root.querySelectorAll('[data-activity-time-band]')].map((band) => (
      `${band.getAttribute('data-time-band')}:${band.getAttribute('data-band-start-px')}:${band.getAttribute('data-band-end-px')}`
    )),
    boundaries: [...root.querySelectorAll('.activity-axis-track .activity-guides span')]
      .map((boundary) => boundary.getAttribute('style')),
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
      width: bundle.getAttribute('data-bundle-width-px'),
      columns: bundle.getAttribute('data-bundle-columns'),
      rows: bundle.getAttribute('data-bundle-rows'),
      collisionWidth: bundle.getAttribute('data-collision-width-px'),
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

  await page.locator('[data-company-picker] summary').click();
  await page.locator('[data-company-options] input[value="apple"]').uncheck();
  expect(await geometry()).toEqual(initial);
  await expectStableCombinedSurvivors();
});

test('Activity Matrix axis and rows share temporal-track geometry at every responsive width', async ({ page }) => {
  const measure = () => page.locator('.activity-matrix-shell').evaluate((shell) => {
    const axisTrack = shell.querySelector('.activity-axis-track').getBoundingClientRect();
    const row = shell.querySelector('[data-group="both"] [data-matrix-row]:not([hidden])');
    const rowTrack = row.querySelector('[data-matrix-track]').getBoundingClientRect();
    const label = row.querySelector('.matrix-entity-label').getBoundingClientRect();
    const newestBand = shell.querySelector('[data-activity-time-band][data-time-band="year-2026"]').getBoundingClientRect();
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
      newestBandLeft: newestBand.left,
      axisHeight: axisTrack.height,
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
    expect(initial.newestBandLeft, `${viewport.width}px 2026 band clears label column`)
      .toBeGreaterThanOrEqual(initial.labelRight - 1);
    expect(initial.axisHeight, `${viewport.width}px compact axis height`).toBeGreaterThanOrEqual(30);
    expect(initial.axisHeight, `${viewport.width}px compact axis height`).toBeLessThanOrEqual(34);

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
  const bandVisibility = await page.locator('.activity-matrix-shell').evaluate((node) => {
    const scroller = node.getBoundingClientRect();
    return [...node.querySelectorAll('[data-activity-time-band]')].map((band) => {
      const bounds = band.getBoundingClientRect();
      return bounds.left >= scroller.left && bounds.right <= scroller.right;
    });
  });
  expect(bandVisibility.every(Boolean)).toBe(true);
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
  await page.locator('[data-company-picker] summary').click();
  await page.locator('[data-company-options] input[value="apple"]').uncheck();
  expect(Math.abs(await scroller.evaluate((node) => node.scrollLeft) - userPosition)).toBeLessThanOrEqual(1);

  await page.goto('./?q=floating-point');
  await expectExplorerReady(page);
  await expect(page.locator('[data-timeline-scroll]')).toHaveAttribute(
    'data-initial-reveal',
    'cadence-2012-real-valued-systemverilog-coverage',
  );
  expect(await page.locator('[data-timeline-scroll]').evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
});

test('global Matrix is one accessible interleaved view with restrained entity colors', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  await expect(page.locator('[data-view]')).toHaveCount(0);
  await expect(page.locator('[data-group="both"]')).toBeVisible();
  await expect(page.locator('.activity-matrix-group')).toHaveCount(1);
  await expect(page.locator('[data-group="companies"], [data-group="people"]')).toHaveCount(0);
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
  await expect(longLabel).toHaveText('Cadence');
  await expect(longLabel).toHaveAttribute('title', 'Cadence');
  for (const [id, name] of [
    ['texas-instruments', 'Texas Instruments'],
    ['nxp', 'NXP'],
    ['analog-devices', 'Analog Devices'],
    ['stmicroelectronics', 'STMicroelectronics'],
    ['sony-semiconductor-solutions', 'Sony Semiconductor'],
    ['toshiba-electronic-devices-storage', 'Toshiba'],
  ]) {
    await expect(page.locator(
      `[data-group="both"] [data-matrix-row][data-entity-id="${id}"] .matrix-entity-label`,
    )).toHaveText(name);
  }

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

test('legacy Entity-view URLs canonicalize to the combined global surfaces', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';

    await page.goto(path);
    await expectExplorerReady(page, surface);
    await expect(page.locator('[data-view]')).toHaveCount(0);
    expect(new URL(page.url()).searchParams.has('view')).toBe(false);

    for (const viewValue of ['companies', 'people', 'both']) {
      await page.goto(`${path}?q=PLL&view=${viewValue}`);
      await expectExplorerReady(page, surface);
      expect(new URL(page.url()).searchParams.has('view')).toBe(false);
      expect(new URL(page.url()).searchParams.get('q')).toBe('PLL');

      if (surface === 'timeline') {
        await expect(page.locator('[data-group="both"]')).toBeVisible();
        await expect(page.locator('[data-group="both"] [data-matrix-row][data-entity-type="company"]:visible').first())
          .toBeVisible();
        await expect(page.locator('[data-group="both"] [data-matrix-row][data-entity-type="person"]:visible').first())
          .toBeVisible();
      } else {
        await expect(page.locator('[data-status]')).toHaveText(/of 121 events/);
      }
    }

    await page.locator('[data-search]').fill('');
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

test('Timeline always shows both Signal types while Events retains kind filtering', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);

  await expect(page.getByText('fixed while filtering', { exact: true })).toHaveCount(0);
  await expect(page.locator('[data-kind]')).toHaveCount(0);
  const serializedKinds = await page.locator('[data-events-json]').evaluate((node) => (
    JSON.parse(node.textContent).map((event) => event.kind)
  ));
  expect(serializedKinds).toHaveLength(121);
  expect(new Set(serializedKinds)).toEqual(new Set(['technical', 'organizational']));
  expect(serializedKinds.filter((kind) => kind === 'technical')).toHaveLength(89);
  expect(serializedKinds.filter((kind) => kind === 'organizational')).toHaveLength(32);

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

  for (const kindValue of ['technical', 'organizational']) {
    await page.goto(`./?kind=${kindValue}`);
    await expectExplorerReady(page);
    expect(new URL(page.url()).searchParams.has('kind')).toBe(false);
    await expect(page.locator('[data-kind]')).toHaveCount(0);
    await expect(page.locator('[data-status]')).toHaveText('110 of 121 events');
    await expect(page.locator('[data-matrix-mark].event-kind-technical:visible').first()).toBeVisible();
    await expect(page.locator('[data-matrix-mark].event-kind-organizational:visible').first()).toBeVisible();
  }

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  await expect(page.locator('[data-kind] option')).toHaveText(['All types', 'Technical', 'Organizational']);
  await page.locator('[data-kind]').selectOption('technical');
  await expect(page.locator('[data-status]')).toHaveText('89 of 121 events');
  expect(new URL(page.url()).searchParams.get('kind')).toBe('technical');
  await expect(page.locator('.kind-badge.event-kind-organizational:visible')).toHaveCount(0);
  await page.locator('[data-kind]').selectOption('organizational');
  await expect(page.locator('[data-status]')).toHaveText('32 of 121 events');
  expect(new URL(page.url()).searchParams.get('kind')).toBe('organizational');
  await expect(page.locator('[data-event-result]:visible .kind-badge')).toHaveText(
    Array(32).fill('Organizational'),
  );

  const aliases = new Map([
    ['publication', 'technical'],
    ['conference', 'technical'],
    ['hiring', 'organizational'],
    ['affiliation_change', 'organizational'],
    ['organization', 'organizational'],
    ['business', 'organizational'],
  ]);
  for (const [legacy, canonical] of aliases) {
    await page.goto(`./events/?kind=${legacy}`);
    await expectExplorerReady(page, 'events');
    await expect(page.locator('[data-kind]')).toHaveValue(canonical);
    expect(new URL(page.url()).searchParams.get('kind')).toBe(canonical);
  }

  await page.goto('./events/?kind=other');
  await expectExplorerReady(page, 'events');
  await expect(page.locator('[data-kind]')).toHaveValue('all');
  expect(new URL(page.url()).searchParams.has('kind')).toBe(false);

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
  await expect(row.locator('.result-body h3 a')).toHaveAttribute('href', `${basePath}events/${eventId}/`);
  await expect(row.locator('.result-links, a[href^="http"]')).toHaveCount(0);

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
  await expect(page.locator('.entity-header h1')).toHaveText('Apple');
  await expect(page.locator('.entity-header .eyebrow')).toHaveCount(0);
  await expect(page.locator('.entity-meta')).toContainText(/Last researched \d{4}-\d{2}-\d{2} · \d+ indexed events/);
  await expect(page.locator('.entity-note')).toHaveText('Public events shown here describe observable source material, not total internal activity.');
  await expect(page.locator('.site-header nav [aria-current="page"]')).toHaveCount(0);
  await expect(page.locator('.search-control > span')).toHaveClass(/visually-hidden/);
  await expect(page.locator('.select-control > span')).toHaveClass(/visually-hidden/);
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-context', 'company');
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
  await expect(page.locator('.entity-header h1')).toHaveText('Toshi Kawashima');
  await expect(page.locator('.entity-header .eyebrow')).toHaveCount(0);
  await expect(page.locator('.entity-meta')).toContainText(/\d+ indexed events?/);
  await expect(page.locator('.entity-note')).toHaveText('Public technical and organizational events indexed by this site.');
  await expect(page.locator('.site-header nav [aria-current="page"]')).toHaveCount(0);
  await expect(page.locator('.search-control > span')).toHaveClass(/visually-hidden/);
  await expect(page.locator('.select-control > span')).toHaveClass(/visually-hidden/);
  await expect(page.locator('[data-event-explorer-root]')).toHaveAttribute('data-context', 'person');
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

test('Timeline and Events expose their final surface-specific controls and terminology', async ({ page }) => {
  const removedCopy = 'Lexical search across events, evidence, companies, and people.';

  for (const path of ['./', './events/']) {
    const isEvents = path.includes('events');
    await page.goto(`${path}?companies=apple,renesas&kind=technical&q=PLL&view=people`);
    await expectExplorerReady(page, isEvents ? 'events' : 'timeline');
    await expect(page.getByText(removedCopy, { exact: true })).toHaveCount(0);
    await expect(page.locator('.search-control > span')).toHaveText('Search events');
    await expect(page.locator('.search-control > span')).toHaveClass(/visually-hidden/);
    await expect(page.getByRole('searchbox', { name: 'Search events', exact: true })).toBeVisible();
    await expect(page.locator('[data-view]')).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('Entity type', { exact: true })).toHaveCount(0);
    if (isEvents) {
      await expect(page.locator('label:has([data-kind]) > span')).toHaveText('Signal type');
      await expect(page.locator('label:has([data-kind]) > span')).toHaveClass(/visually-hidden/);
      await expect(page.getByRole('combobox', { name: 'Signal type', exact: true })).toBeVisible();
      await expect(page.locator('[data-kind] option')).toHaveText(['All types', 'Technical', 'Organizational']);
      expect(new URL(page.url()).searchParams.get('kind')).toBe('technical');
      await expect(page.locator('.event-filters > *')).toHaveCount(3);
    } else {
      await expect(page.locator('[data-kind]')).toHaveCount(0);
      expect(new URL(page.url()).searchParams.has('kind')).toBe(false);
      await expect(page.locator('.event-filters > *')).toHaveCount(2);
      await expect(page.locator('.kind-legend span')).toHaveText(['Technical', 'Organizational']);
    }
    await expect(page.locator('.event-filter-utility > .event-filter-summary')).toHaveCount(1);
    await expect(page.locator('.event-explorer > .event-filter-summary')).toHaveCount(0);
    expect(await page.locator('.event-filters').evaluate((filters) => getComputedStyle(filters).display)).toBe('flex');
    await expect(page.locator('[data-company-picker] summary > span')).toHaveText('Companies');
    await expect(page.locator('[data-company-summary]')).toHaveText('2 selected');
    await expect(page.locator('[data-reset]')).toHaveCount(0);
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
    const companyBox = await page.locator('[data-company-picker] summary').boundingBox();
    expect(searchBox).not.toBeNull();
    expect(companyBox).not.toBeNull();
    expect(searchBox.width).toBeGreaterThanOrEqual(220);
    expect(searchBox.width).toBeLessThanOrEqual(340);
    expect(Math.abs((searchBox.y + searchBox.height) - (companyBox.y + companyBox.height))).toBeLessThanOrEqual(1);
    if (isEvents) {
      const kindBox = await page.locator('[data-kind]').boundingBox();
      expect(kindBox).not.toBeNull();
      expect(Math.abs(searchBox.y - kindBox.y)).toBeLessThanOrEqual(1);
      expect(Math.abs(searchBox.height - kindBox.height)).toBeLessThanOrEqual(1);
    }

    await page.locator('[data-search]').fill('');
    if (isEvents) await page.locator('[data-kind]').selectOption('all');
    await page.locator('[data-company-picker] summary').click();
    await page.getByRole('button', { name: 'Select all', exact: true }).click();
    expect(new URL(page.url()).search).toBe('');
    await expect(page.locator('[data-search]')).toHaveValue('');
    if (isEvents) await expect(page.locator('[data-kind]')).toHaveValue('all');
    await expect(page.locator('[data-company-options] input:checked')).toHaveCount(await page.locator('[data-company-options] input').count());
    await expect(page.locator('[data-company-summary]')).toHaveText('All 43');
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
  const sparseState = page.locator('.entity-empty-state');
  await expect(sparseState.getByRole('heading')).toHaveText('No events are currently indexed');
  await expect(sparseState).toContainText('did not produce an event for the Timeline');
  await expect(sparseState.getByRole('link', { name: 'Return to Timeline →' })).toHaveAttribute('href', basePath);
  await expect(sparseState.getByText(/Golden|milestone/i)).toHaveCount(0);

  await page.goto('./people/toshi-kawashima/');
  await expect(page.getByText('PERSON TIMELINE', { exact: true })).toHaveCount(0);
  await expect(page.getByText('PEOPLE TIMELINE', { exact: true })).toHaveCount(0);
  await expect(page.locator('.entity-note')).toHaveText('Public technical and organizational events indexed by this site.');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    'Public technical and organizational Events linked to Toshi Kawashima.',
  );

  const eventId = 'apple-2026-04-pmu-dms';
  await page.goto(`./events/${eventId}/`);
  await expect(page.getByRole('heading', { name: 'Evidence', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Sources', exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Related articles', exact: true })).toHaveCount(0);
  await expect(page.locator('.back-link, .related-articles')).toHaveCount(0);
  await expect(page.locator('.record-context')).toHaveAttribute('aria-label', 'Linked entities');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Factual public Event and supporting evidence for /);
});

test('narrow viewports retain basic access without a mobile chronology fallback', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./?companies=apple,renesas&q=PLL');
  await expectExplorerReady(page);
  await expect(page.locator('.event-filters > *')).toHaveCount(2);
  await expect(page.locator('[data-kind], [data-view]')).toHaveCount(0);
  await expect(page.locator('[data-company-picker]')).toHaveCount(1);
  await expect(page.locator('[data-reset]')).toHaveCount(0);
  const narrowUtility = await page.locator('.event-filter-utility').evaluate((utility) => {
    const box = (selector) => {
      const rect = utility.querySelector(selector).getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width };
    };
    return {
      search: box('[data-search]'),
      company: box('[data-company-picker] summary'),
      summary: box('.event-filter-summary'),
    };
  });
  expect(narrowUtility.search.width).toBeCloseTo(narrowUtility.company.width, 0);
  expect(narrowUtility.company.top).toBeGreaterThanOrEqual(narrowUtility.search.bottom);
  expect(narrowUtility.summary.top).toBeGreaterThanOrEqual(narrowUtility.company.bottom);
  expect(narrowUtility.summary.left).toBeGreaterThanOrEqual(narrowUtility.search.left - 1);
  expect(narrowUtility.summary.right).toBeLessThanOrEqual(narrowUtility.search.right + 1);
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
  await expect(page.locator('.event-filters > *')).toHaveCount(3);
  await expect(page.locator('[data-kind]')).toBeVisible();
  await expect(page.locator('[data-view]')).toHaveCount(0);
  await expect(page.locator('[data-company-picker]')).toHaveCount(1);
  await expect(page.locator('[data-reset]')).toHaveCount(0);
  await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Articles', exact: true })).toBeVisible();
  await expect(page.locator('.site-header nav a')).toHaveCount(3);
});
