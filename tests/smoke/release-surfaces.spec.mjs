// Browser contracts for the public surfaces themselves: Timeline, Events, Event detail,
// Company and Person pages and /export.json — rendered structure, terminology,
// responsive chrome layout, and surface overlay and stacking behaviour.
//
// Discovery controls live in release-discovery.spec.mjs, Activity Matrix geometry in
// release-matrix.spec.mjs, and cross-surface navigation and inspector state in
// release-navigation.spec.mjs.

import { expect, test } from '@playwright/test';
import { catalogFixture } from './catalog-index.ts';
import { sortEventsNewestFirst } from '../../src/lib/content.ts';
import { loadGoldenCorpus } from '../golden/corpus.ts';
import {
  basePath,
  countStatus,
  expectExplorerReady,
  installBrowserErrorGuards,
  publicOrigin,
  viewerCorpus,
  visibleTimelineEventIds,
} from './release-helpers.mjs';

installBrowserErrorGuards(test);

// Structural pathname check used in place of `new RegExp(...basePath...)`. basePath is a
// resolved BASE_URL and may legitimately contain regex metacharacters (e.g. '/a+b/'), so it
// must never be interpolated into a RegExp; plain string/URL operations avoid that entirely.
function expectSingleSegmentPath(pathname, prefix) {
  expect(pathname.startsWith(prefix)).toBe(true);
  expect(pathname.endsWith('/')).toBe(true);
  const slug = pathname.slice(prefix.length, -1);
  expect(slug).not.toBe('');
  expect(slug).not.toContain('/');
}

test('Timeline is the temporal view with filters and one Evidence Inspector', async ({ page }) => {
  await page.goto('./timeline/');
  await expectExplorerReady(page);

  expect(new URL(page.url()).pathname).toBe(`${basePath}timeline/`);
  await expect(page).toHaveTitle('Timeline · AMS Signals');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${publicOrigin}${basePath}timeline/`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RNM|mixed-signal/i);
  await expect(page.locator('h1.visually-hidden')).toHaveText('AMS Signals Timeline');
  await expect(page.locator('main > .intro')).toHaveCount(0);
  await expect(page.getByText('FACTUAL PUBLIC TIMELINE', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Public signals in RNM & mixed-signal verification', { exact: true })).toHaveCount(0);
  await expect(page.locator('a.brand')).toHaveAttribute('href', basePath);
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('href', `${basePath}events/`);
  await expect(page.locator('.site-header nav a')).toHaveText(['Home', 'Timeline', 'Events', 'Analog', 'Digital', 'GitHub ↗']);

  await expect(page.locator('[data-activity-matrix-surface]')).toBeVisible();
  await expect(page.locator('.desktop-timeline')).toHaveCount(0);
  await expect(page.locator('[data-detail]')).toHaveCount(1);
  // The default inspector reflects the newest Event of the first (highest-activity) lane,
  // whatever that lane currently is.
  const firstLane = page.locator('[data-group="both"] [data-matrix-row]:visible').first();
  await expect(firstLane).toBeVisible();
  const firstLaneType = await firstLane.getAttribute('data-entity-type');
  const firstLaneId = await firstLane.getAttribute('data-entity-id');
  expect(firstLaneId).toBeTruthy();
  const corpus = await viewerCorpus(page);
  const newestForFirstLane = corpus.events
    .filter((event) => (firstLaneType === 'person' ? corpus.peopleIds(event) : corpus.companyIds(event))
      .includes(firstLaneId))
    .sort((left, right) => right.start.localeCompare(left.start) || left.id.localeCompare(right.id, 'en'))[0];
  expect(newestForFirstLane, `${firstLaneType}:${firstLaneId} must own at least one Event`).toBeTruthy();
  await expect(page.locator('[data-detail-event]'))
    .toHaveAttribute('href', `${basePath}events/${newestForFirstLane.id}/`);
  await expect(page.locator('[data-detail-title]')).toHaveText(newestForFirstLane.headline);
  await expect(page.locator('.result-section')).toHaveCount(0);
  await expect(page.locator('.company-records')).toHaveCount(0);
  await expect(page.getByText('Visible events', { exact: true })).toHaveCount(0);
  await expect(page.getByText('CHRONOLOGICAL RECORD', { exact: true })).toHaveCount(0);

  const internalHrefs = await page.locator('a[href]').evaluateAll((anchors) => anchors
    .map((anchor) => anchor.getAttribute('href'))
    .filter((href) => href?.startsWith('/')));
  expect(internalHrefs.every((href) => href.startsWith(basePath))).toBe(true);
});

test('canonical JSON export endpoint serves the factual corpus', async ({ page }) => {
  const response = await page.request.get('./export.json');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  // Payload construction, ordering, exclusions and source normalization are owned by
  // tests/golden/export-contract.test.ts. This only proves the built endpoint is wired to it.
  const payload = await response.json();
  expect(Object.keys(payload)).toEqual(['schemaVersion', 'project', 'companies', 'people', 'events']);
  expect(payload.schemaVersion).toBe(1);
  expect(Array.isArray(payload.companies)).toBe(true);
  expect(Array.isArray(payload.people)).toBe(true);
  expect(Array.isArray(payload.events)).toBe(true);
  expect(payload.companies.length).toBeGreaterThan(0);
  expect(payload.events.length).toBeGreaterThan(0);

  const sample = payload.events[0];
  expect(sample).toEqual(expect.objectContaining({
    id: expect.any(String),
    kind: expect.stringMatching(/^(technical|organizational)$/),
    sources: expect.any(Array),
  }));
  expect(sample.recordUrl).toBe(`${publicOrigin}${basePath}events/${sample.id}/`);
  // Independent shape check: verified via URL parsing plus plain string operations rather than
  // the exact template above or a regex, and rather than a scheme hardcoded to https — the
  // deployment resolver's documented, tested contract (src/lib/site-deployment.mjs) accepts
  // both http and https public origins.
  const recordUrl = new URL(sample.recordUrl);
  expect(['http:', 'https:']).toContain(recordUrl.protocol);
  expect(recordUrl.host.length).toBeGreaterThan(0);
  expectSingleSegmentPath(recordUrl.pathname, `${basePath}events/`);
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
  await expect(resultSection.locator(':scope > :first-child')).toHaveClass(/\bresult-list\b/);
  expect(await resultSection.evaluate((section) => section.previousElementSibling?.classList.contains('event-filter-utility'))).toBe(true);
  const corpus = await viewerCorpus(page);
  await expect(page.locator('[data-status]')).toHaveText(countStatus(corpus.total, corpus.total));
  await expect(page.locator('.event-filter-utility > .event-filter-summary'))
    .toHaveText(countStatus(corpus.total, corpus.total));
  await expect(page.locator('.event-filter-utility > .event-filter-summary > *')).toHaveCount(1);
  await expect(page.locator('.event-filter-utility .event-filter-summary .kind-legend')).toHaveCount(0);
  await expect(page.getByText('Newest first', { exact: true })).toHaveCount(0);

  const ids = await page.locator('[data-event-result]').evaluateAll((events) => events.map((event) => event.getAttribute('data-event-id')));
  expect(ids.length).toBeGreaterThan(0);
  expect(new Set(ids).size).toBe(ids.length);
  const { events: sourceEvents } = await loadGoldenCorpus();
  expect([...ids].sort()).toEqual(sourceEvents.map(({ id }) => id).sort());
  await expect(page.locator('[data-event-result]').first().locator('time')).toBeVisible();
  await expect(page.locator('[data-event-result]').first().locator('.signal-type')).toBeVisible();
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
  expect(eventsLayout.width).toBeLessThanOrEqual(1200);
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
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('aria-current', 'page');
});

test('Lunlun is a normal two-Event viewer trajectory that remains outside the factual export', async ({ page }) => {
  const events = [
    {
      id: 'lunlun-2024-initial-real-time-representation',
      date: '2024-06-22',
      headline: 'Initial real-time representation of Lunlun becomes available',
      fact: 'An initial real-time representation of Lunlun was publicly demonstrated in June 2024. The session exposes continuously observable motion, expression changes, and interactive response, providing a behavioral baseline for later revisions.',
      sourceTitle: 'Initial real-time representation of Lunlun',
      sourceUrl: 'https://www.youtube.com/watch?v=jDpZnGygy7w',
      sourceSummary: 'June 2024 public demonstration of the initial real-time model representation and its interactive behavior.',
    },
    {
      id: 'lunlun-2025-3-0-dynamic-behavior',
      date: '2025-08-04',
      headline: 'Lunlun 3.0 extends dynamic behavior and observable expression',
      fact: 'A 3.0 revision was publicly demonstrated in August 2025. The update extends motion and adds additional expression states during real-time operation, increasing the range of observable behavior while retaining the earlier interactive form.',
      sourceTitle: 'Lunlun 3.0 — extended motion and expression',
      sourceUrl: 'https://www.youtube.com/watch?v=Ce-lbGgZxAA',
      sourceSummary: 'August 2025 public demonstration of the 3.0 revision with expanded motion and additional expression states.',
    },
  ];
  const eventIds = events.map(({ id }) => id).sort();
  const forbiddenPublicTerms = ['にじさんじ', 'VTuber', 'Live2D'];

  await page.goto('./timeline/');
  await expectExplorerReady(page);
  const row = page.locator(
    '[data-group="both"] [data-matrix-row][data-entity-type="person"][data-entity-id="lunlun"]',
  );
  await expect(row).toBeVisible();
  await expect(row).toHaveAttribute('data-singleton', 'false');
  // recent3/recent5 depend on the corpus clock, so derive them from the current latest year
  // and the fixture's own two Events.
  const viewerCorpusCounts = await viewerCorpus(page);
  const fixtureYears = events.map(({ date }) => Number(date.slice(0, 4)));
  await expect(row).toHaveAttribute('data-recent3', String(
    fixtureYears.filter((year) => year >= viewerCorpusCounts.latestYear - 2).length,
  ));
  await expect(row).toHaveAttribute('data-recent5', String(
    fixtureYears.filter((year) => year >= viewerCorpusCounts.latestYear - 4).length,
  ));
  await expect(row).toHaveAttribute('data-latest-start', '2025-08-04');
  await expect(row).toHaveAttribute('data-total-events', '2');
  const marks = row.locator('[data-matrix-mark]');
  await expect(marks).toHaveCount(2);
  expect(await marks.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-event-id')).sort()))
    .toEqual(eventIds);
  for (const event of events) {
    await expect(row.locator(`[data-matrix-mark][data-event-id="${event.id}"]`))
      .toHaveAttribute('data-event-date', event.date);
  }
  // The deliberate two-Event fixture is the whole Lunlun trajectory: no mark lies outside it.
  const fixtureDates = events.map(({ date }) => date);
  const expectedDateOrder = [...fixtureDates].sort((left, right) => right.localeCompare(left));
  expect(await marks.evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-event-date'))))
    .toEqual(expectedDateOrder);
  expect(await marks.evaluateAll((nodes, dates) => nodes.every((node) => (
    dates.includes(node.getAttribute('data-event-date'))
  )), fixtureDates)).toBe(true);

  await page.locator('[data-search]').fill('Lunlun');
  const newestMark = row.locator(`[data-matrix-mark][data-event-id="${events[1].id}"]`);
  await newestMark.click();
  await expect(page.locator('[data-detail-title]')).toHaveText(events[1].headline);
  const inspectorSource = page.locator('[data-detail-sources] a');
  await expect(inspectorSource).toHaveCount(1);
  await expect(inspectorSource).toHaveText(`${events[1].sourceTitle} ↗`);
  await expect(inspectorSource).toHaveAttribute('href', events[1].sourceUrl);

  await page.locator('[data-search]').fill('');
  await page.locator('[data-company-picker] summary').click();
  await page.getByRole('button', { name: 'Clear all', exact: true }).click();
  await page.locator('[data-company-options] input[value="apple"]').check();
  await expect(row).toBeHidden();
  await page.getByRole('button', { name: 'Select all', exact: true }).click();
  await expect(row).toBeVisible();

  const personResponse = await page.goto('./people/lunlun/');
  expect(personResponse?.status()).toBe(200);
  await expectExplorerReady(page);
  await expect(page.locator('.entity-header h1')).toHaveText('Lunlun');
  await expect(page.locator('.entity-meta')).toHaveText('2 indexed events');
  const personEventIds = await page.locator('[data-events-json]').evaluate((node) => (
    JSON.parse(node.textContent).map(({ id }) => id).sort()
  ));
  expect(personEventIds).toEqual(eventIds);

  await page.goto('./events/');
  await expectExplorerReady(page, 'events');
  for (const event of events) {
    await expect(page.locator(`[data-event-result][data-event-id="${event.id}"]`)).toBeVisible();
  }
  expect(await page.locator('[data-event-result][data-event-id^="lunlun-"]').evaluateAll((nodes) => (
    nodes.map((node) => node.getAttribute('data-event-id')).sort()
  ))).toEqual(eventIds);
  await page.locator('[data-search]').fill('Lunlun');
  await expect(page.locator('[data-event-result]:visible')).toHaveCount(2);
  const corpus = await viewerCorpus(page);
  await expect(page.locator('[data-status]')).toHaveText(countStatus(2, corpus.total));
  await page.locator('[data-search]').fill('model');
  await expect(page.locator(`[data-event-result][data-event-id="${events[0].id}"]`)).toBeVisible();

  for (const event of events) {
    const response = await page.goto(`./events/${event.id}/`);
    expect(response?.status()).toBe(200);
    const record = page.locator('.record-page');
    await expect(record.getByRole('heading', { name: event.headline, exact: true, level: 1 })).toBeVisible();
    await expect(record.locator('.record-fact')).toHaveText(event.fact);
    await expect(record.locator('.record-context a[href$="/people/lunlun/"]')).toHaveText('Lunlun');
    const source = record.locator('.source-card');
    await expect(source.locator('h3 a')).toHaveText(`${event.sourceTitle} ↗`);
    await expect(source.locator('h3 a')).toHaveAttribute('href', event.sourceUrl);
    await expect(source.locator(':scope > p').first()).toHaveText(event.sourceSummary);
    await expect(source.locator('.source-availability')).toHaveText('Available · checked 2026-09-02');
    await expect(page.locator('body')).not.toContainText('youtube.com');
    for (const term of forbiddenPublicTerms) await expect(page.locator('body')).not.toContainText(term);
  }

  const payload = await (await page.request.get('./export.json')).json();
  expect(payload.people.map(({ id }) => id)).not.toContain('lunlun');
  for (const event of events) expect(payload.events.map(({ id }) => id)).not.toContain(event.id);
});

test('zero-Event researched Company pages still build without primary Timeline links', async ({ page }) => {
  await page.goto('./timeline/');
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

test('Timeline utility bar places count and legend beside the compact controls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./timeline/');
  await expectExplorerReady(page);

  const utility = page.locator('.event-filter-utility');
  const summary = utility.locator(':scope > .event-filter-summary');
  const corpus = await viewerCorpus(page);
  const representedIds = await visibleTimelineEventIds(page);
  expect(representedIds.length).toBeGreaterThan(0);
  // The represented count is derived from the currently rendered Matrix, the denominator
  // from the current viewer corpus.
  await expect(summary.locator(':scope > .index-count'))
    .toHaveText(countStatus(representedIds.length, corpus.total));
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
  expect(layout.summary.left - layout.company.right).toBeCloseTo(12, 1);
  expect(Math.abs(layout.search.top - layout.company.top)).toBeLessThanOrEqual(1);
  expect(Math.abs(layout.summary.top - layout.company.top)).toBeLessThanOrEqual(1);
  expect(layout.legendLeft).toBeGreaterThan(layout.statusRight);
  expect(Math.abs(layout.legendTop - layout.statusTop)).toBeLessThanOrEqual(1);
});

test('Company Focus panel owns overlapping pixels above every Timeline stacking context', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./timeline/');
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

test('Timeline and Events expose their final surface-specific controls and terminology', async ({ page }) => {
  const removedCopy = 'Lexical search across events, evidence, companies, and people.';

  for (const path of ['./timeline/', './events/']) {
    const isEvents = path.includes('events');
    await page.goto(`${path}?companies=apple,renesas&kind=technical&q=PLL&view=people`);
    await expectExplorerReady(page, isEvents ? 'events' : 'timeline');
    await expect(page.getByText(removedCopy, { exact: true })).toHaveCount(0);
    await expect(page.locator('.search-control > span')).toHaveText(isEvents ? 'Search events or companies' : 'Search events');
    await expect(page.locator('.search-control > span')).toHaveClass(/visually-hidden/);
    await expect(page.locator('[data-search]')).toHaveAttribute('placeholder', 'Apple, Model, AI');
    await expect(page.getByRole('searchbox', { name: isEvents ? 'Search events or companies' : 'Search events', exact: true })).toBeVisible();
    await expect(page.locator('[data-view]')).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('Entity type', { exact: true })).toHaveCount(0);
    if (isEvents) {
      await expect(page.locator('label:has([data-kind]) > span')).toHaveText('Signal type');
      await expect(page.locator('label:has([data-kind]) > span')).toHaveClass(/visually-hidden/);
      await expect(page.getByRole('combobox', { name: 'Signal type', exact: true })).toBeVisible();
      await expect(page.locator('[data-kind] option')).toHaveText(['All types', 'Technical', 'Organizational']);
      expect(new URL(page.url()).searchParams.get('kind')).toBe('technical');
      await expect(page.locator('.event-filters > *')).toHaveCount(2);
    } else {
      await expect(page.locator('[data-kind]')).toHaveCount(0);
      expect(new URL(page.url()).searchParams.has('kind')).toBe(false);
      await expect(page.locator('.event-filters > *')).toHaveCount(2);
      await expect(page.locator('.kind-legend span')).toHaveText(['Technical', 'Organizational']);
    }
    await expect(page.locator('.event-filter-utility > .event-filter-summary')).toHaveCount(1);
    await expect(page.locator('.event-explorer > .event-filter-summary')).toHaveCount(0);
    expect(await page.locator('.event-filters').evaluate((filters) => getComputedStyle(filters).display)).toBe(isEvents ? 'contents' : 'flex');
    if (isEvents) {
      await expect(page.locator('[data-company-picker]')).toHaveCount(0);
      expect(new URL(page.url()).searchParams.has('companies')).toBe(false);
    } else {
      await expect(page.locator('[data-company-picker] summary > span')).toHaveText('Companies');
      await expect(page.locator('[data-company-summary]')).toHaveText('2 selected');
    }
    await expect(page.locator('[data-reset]')).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('Search the factual record', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('View', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('All signals', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText('Company focus', { exact: true })).toHaveCount(0);
    await expect(page.locator('.event-filters').getByText(/active companies/i)).toHaveCount(0);

    const searchBox = await page.locator('[data-search]').boundingBox();
    expect(searchBox).not.toBeNull();
    expect(searchBox.width).toBe(328);
    if (!isEvents) {
      await page.locator('[data-company-picker] summary').click();
      await expect(page.getByRole('button', { name: 'Select all', exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible();
      await page.locator('[data-company-picker] summary').click();
      const companyBox = await page.locator('[data-company-picker] summary').boundingBox();
      expect(Math.abs(searchBox.y - companyBox.y)).toBeLessThanOrEqual(1);
    }
    if (isEvents) {
      const kindBox = await page.locator('[data-kind]').boundingBox();
      expect(kindBox).not.toBeNull();
      expect(Math.abs(searchBox.y - kindBox.y)).toBeLessThanOrEqual(1);
      expect(Math.abs(searchBox.height - kindBox.height)).toBeLessThanOrEqual(1);
    }

    await page.locator('[data-search]').fill('');
    if (isEvents) await page.locator('[data-kind]').selectOption('all');
    if (!isEvents) {
      await page.locator('[data-company-picker] summary').click();
      await page.getByRole('button', { name: 'Select all', exact: true }).click();
    }
    expect(new URL(page.url()).search).toBe('');
    await expect(page.locator('[data-search]')).toHaveValue('');
    if (isEvents) await expect(page.locator('[data-kind]')).toHaveValue('all');
    if (!isEvents) {
      const companyOptionCount = await page.locator('[data-company-options] input').count();
      await expect(page.locator('[data-company-options] input:checked')).toHaveCount(companyOptionCount);
      await expect(page.locator('[data-company-summary]')).toHaveText(`All ${companyOptionCount}`);
    }
  }
});

test('Inspector and context pages use Event, Evidence, and Entity terminology', async ({ page }) => {
  await page.goto('./timeline/');
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
  await expect(sparseState.getByRole('link', { name: 'Return to Timeline →' })).toHaveAttribute('href', `${basePath}timeline/`);
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
  await expect(page.locator('.back-link')).toHaveCount(0);
  await expect(page.locator('.record-context')).toHaveAttribute('aria-label', 'Linked entities');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /^Factual public Event and supporting evidence for /);
});

test('narrow viewports retain basic access without a mobile chronology fallback', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./timeline/?companies=apple,renesas&q=PLL');
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

  await page.goto('./timeline/?q=Google');
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
  await expect(page.locator('.event-filters > *')).toHaveCount(2);
  await expect(page.locator('[data-kind]')).toBeVisible();
  await expect(page.locator('[data-view]')).toHaveCount(0);
  await expect(page.locator('[data-company-picker]')).toHaveCount(0);
  await expect(page.locator('[data-reset]')).toHaveCount(0);
  await expect(page.locator('[data-event-result]:visible').first()).toBeVisible();
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Analog', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Digital', exact: true })).toBeVisible();
  await expect(page.locator('.site-header nav a')).toHaveText(['Home', 'Timeline', 'Events', 'Analog', 'Digital', 'GitHub ↗']);
});

// Anchor the independent source calculation to the static artifact, not the smoke run date.
async function expectedHomeActivity(page, events, analog, digital) {
  const buildMonth = await page.locator('.chart-card').getAttribute('data-build-month');
  expect(buildMonth).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
  const [year, month] = buildMonth.split('-').map(Number);
  const months = Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(year, month - 12 + i, 1)).toISOString().slice(0, 7));
  const active = (fixture, key) => Object.values(fixture.activity.projects).filter((record) => record.kind === 'public-update'
    ? record.lastPublicUpdateAt.slice(0, 7) === key
    : record.commits[fixture.activity.months.indexOf(key)] > 0).length;
  return months.map((key) => ({ month: key,
    events: events.filter(({ data: { when } }) => when.precision !== 'year' && when.start.startsWith(key)).length,
    analog: active(analog, key), digital: active(digital, key) }));
}

for (const width of [1440, 900, 390]) {
  test(`Home renders source-derived activity, four recent Events and complete project updates at ${width}px`, async ({ page }) => {
    const [{ events }, analog, digital] = await Promise.all([loadGoldenCorpus(), catalogFixture('analog'), catalogFixture('digital')]);
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    await expect(page).toHaveTitle('AMS Signals');
    await expect(page.getByRole('navigation', { name: 'Primary' }).locator('[aria-current="page"]')).toHaveText('Home');
    await expect(page.locator('[data-event-explorer-root]')).toHaveCount(0);
    expect(await page.locator('.activity-counts').evaluate((el) => getComputedStyle(el).clip)).toBe('rect(0px, 0px, 0px, 0px)');
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
    const expected = await expectedHomeActivity(page, events, analog, digital);
    const actual = await page.locator('[data-dashboard-month]').evaluateAll((nodes) => nodes.map((el) => ({ month: el.dataset.dashboardMonth,
      events: Number(el.dataset.events), analog: Number(el.dataset.analog), digital: Number(el.dataset.digital) })));
    expect(actual).toEqual(expected);
    const series = ['events', 'analog', 'digital'];
    const maxima = series.map((key) => Math.max(...expected.map((m) => m[key])));
    await expect(page.getByRole('heading', { name: 'Activity Trend', exact: true })).toBeVisible();
    const chart = page.locator('.activity-chart');
    await expect(chart).toHaveAccessibleName('Monthly Events, active Analog projects and active Digital projects');
    await expect(chart).toHaveAttribute('aria-describedby', 'chart-description');
    const chartLines = await chart.locator('[data-activity-series]').evaluateAll((nodes) => nodes.map((el) => ({
      series: el.dataset.activitySeries, path: el.getAttribute('d'), stroke: getComputedStyle(el).stroke,
      strokeWidth: getComputedStyle(el).strokeWidth, fill: getComputedStyle(el).fill,
      pointerEvents: getComputedStyle(el).pointerEvents, animation: getComputedStyle(el).animationName,
      transition: getComputedStyle(el).transitionDuration,
    })));
    expect(chartLines.map((line) => line.series)).toEqual(series);
    expect(chartLines.map((line) => line.stroke)).toEqual(['rgb(37, 99, 235)', 'rgb(41, 152, 130)', 'rgb(239, 173, 84)']);
    for (const [j, key] of series.entries()) {
      const line = chartLines[j];
      // Exactly one real point per month, connected only by straight segments.
      expect(line.path.match(/[A-Za-z]/g)).toEqual(['M', ...Array(11).fill('L')]);
      const points = line.path.split(' ').map((point) => point.slice(1).split(',').map(Number));
      expect(points).toHaveLength(12);
      const percentages = expected.map((month) => maxima[j] === 0 ? 0 : month[key] / maxima[j] * 100);
      for (const [i, [x, y]] of points.entries()) {
        expect(x).toBeCloseTo(50 + i * 44, 5);
        expect(y).toBeCloseTo(242 - percentages[i] / 100 * 218, 5);
        expect(y).toBeGreaterThanOrEqual(24);
        expect(y).toBeLessThanOrEqual(242);
      }
      expect(Math.min(...points.map((point) => point[1])), `${key} peak`).toBe(maxima[j] === 0 ? 242 : 24);
      expect(line.strokeWidth).toBe('2.5px');
      expect(line.fill).toBe('none');
      expect(line.pointerEvents).toBe('none');
      expect(line.animation).toBe('none');
      expect(line.transition).toBe('0s');
      const area = chart.locator(`[data-activity-area="${key}"]`);
      await expect(area).toHaveAttribute('d', `${line.path} L534,242 L50,242 Z`);
      await expect(area).toHaveAttribute('fill', `url(#activity-${key}-area)`);
      const gradient = chart.locator(`#activity-${key}-area`);
      await expect(gradient).toHaveAttribute('gradientUnits', 'userSpaceOnUse');
      await expect(gradient).toHaveAttribute('y1', '24');
      await expect(gradient).toHaveAttribute('y2', '242');
      expect(await gradient.locator('stop').evaluateAll((nodes) => nodes.map((el) => ({
        offset: el.getAttribute('offset'), opacity: el.getAttribute('stop-opacity'), color: getComputedStyle(el).stopColor,
      })))).toEqual([
        { offset: '0', opacity: '0.13', color: line.stroke },
        { offset: '1', opacity: '0', color: line.stroke },
      ]);
    }
    await expect(chart.locator('.chart-percent')).toHaveText(['0%', '25%', '50%', '75%', '100%']);
    expect(await chart.locator('.chart-percent').evaluateAll((nodes) => nodes.map((el) => Number(el.getAttribute('y')))))
      .toEqual([242, 187.5, 133, 78.5, 24]);
    await expect(page.locator('[data-dashboard-month] > text')).toHaveText(expected.map((m) =>
      new Date(`${m.month}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })));
    await expect(chart.locator('text')).toHaveCount(17);
    await expect(page.locator('.chart-card title, .chart-card [title], .chart-card [role="tooltip"]')).toHaveCount(0);
    await expect(chart.locator('rect, circle, marker, animate, animateTransform, set, a, [tabindex], [onclick], [onmouseover], [onmousemove]')).toHaveCount(0);
    await expect(page.locator('.chart-partial, .chart-card > p:not(.visually-hidden)')).toHaveCount(0);
    await expect(page.locator('#chart-description')).toContainText('Current month is partial.');
    await expect(page.locator('#chart-description')).toContainText('Each series is scaled to its own largest monthly count in these twelve months, which is 100%; an all-zero series stays at 0%');
    await expect(page.locator('#chart-description')).toContainText('not count comparisons between series');
    expect(await page.locator('#chart-description').evaluate((el) => getComputedStyle(el).clip)).toBe('rect(0px, 0px, 0px, 0px)');
    const monthNames = expected.map((m) => new Date(`${m.month}-01T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }));
    expect(await page.locator('.activity-counts tbody tr').evaluateAll((rows) => rows.map((row) => [...row.children].map((cell) => cell.textContent.trim()))))
      .toEqual(expected.map((m, i) => [monthNames[i], ...series.map((key) => String(m[key]))]));
    await expect(page.locator('.recent-signals li')).toHaveCount(4);
    expect(await page.locator('[data-recent-event]').evaluateAll((nodes) => nodes.map((el) => el.dataset.recentEvent)))
      .toEqual(sortEventsNewestFirst(events).slice(0, 4).map((entry) => entry.id));
    for (const entry of sortEventsNewestFirst(events).slice(0, 4)) {
      const row = page.locator(`[data-recent-event="${entry.id}"]`);
      await expect(row.locator('.signal-title')).toHaveText(entry.data.headline);
      await expect(row.locator('a')).toHaveAttribute('href', `${basePath}events/${entry.id}/`);
      await expect(row.locator('.signal-meta')).toContainText(entry.data.kind === 'technical' ? 'Technical' : 'Organizational');
      const icon = row.locator(`.signal-symbol.${entry.data.kind} svg`);
      await expect(icon).toHaveAttribute('aria-hidden', 'true');
      await expect(icon).toHaveClass(entry.data.kind === 'technical' ? 'lucide lucide-flask-conical' : 'lucide lucide-building-2');
      await expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
      expect(await icon.evaluate((el) => { const s = getComputedStyle(el); return { width: s.width, height: s.height, stroke: s.stroke, fill: s.fill }; }))
        .toEqual({ width: '20px', height: '20px', stroke: entry.data.kind === 'technical' ? 'rgb(60, 101, 164)' : 'rgb(136, 100, 84)', fill: 'none' });
      await expect(icon.locator('rect, circle')).toHaveCount(0);
      await expect(icon.locator('path')).toHaveCount(entry.data.kind === 'technical' ? 3 : 7);
    }
    for (const fixture of [analog, digital]) {
      const list = page.locator(`[data-updated-projects="${fixture.domain}"]`);
      expect(await list.locator('li').evaluateAll((nodes) => nodes.map((el) => el.dataset.updatedProject)))
        .toEqual(fixture.ordered.slice(0, 3).map((project) => project.id));
      for (const project of fixture.ordered.slice(0, 3)) {
        const row = list.locator(`[data-updated-project="${project.id}"]`);
        await expect(row.locator('p')).toHaveText(project.description);
        await expect(row.locator('a')).toHaveAttribute('href', `${basePath}${fixture.domain}/#${project.id}--name`);
        const style = await row.locator('p').evaluate((el) => ({ clamp: getComputedStyle(el).webkitLineClamp, overflow: getComputedStyle(el).overflow }));
        expect(style).toEqual({ clamp: 'none', overflow: 'visible' });
      }
    }
    if (width === 1440) {
      const chart = await page.locator('.chart-card').boundingBox();
      const signals = await page.locator('.signals-card').boundingBox();
      expect(chart.y).toBe(signals.y);
      expect(chart.height).toBe(signals.height);
      const [analogCard, digitalCard] = await page.locator('.updated-grid > .dashboard-panel').all();
      const analogBox = await analogCard.boundingBox();
      const digitalBox = await digitalCard.boundingBox();
      expect(chart.width).toBe(signals.width);
      expect(chart.width).toBe(592);
      expect(signals.x - (chart.x + chart.width)).toBe(16);
      expect(digitalBox.x - (analogBox.x + analogBox.width)).toBe(16);
      for (const key of ['x', 'width']) {
        expect(chart[key]).toBe(analogBox[key]);
        expect(signals[key]).toBe(digitalBox[key]);
      }
      expect((await page.locator('.activity-chart').boundingBox()).height).toBeGreaterThan(250);
    } else {
      expect((await page.locator('.signals-card').boundingBox()).y).toBeGreaterThan((await page.locator('.chart-card').boundingBox()).y);
    }
    if (width === 390) {
      const frame = page.locator('.chart-frame');
      expect(await frame.evaluate((el) => el.scrollWidth > el.clientWidth)).toBe(true);
      await frame.focus(); await page.keyboard.press('ArrowRight');
      await expect.poll(() => frame.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
    }
  });
}

for (const width of [1440, 390]) {
  test(`Home exposes readable source-derived monthly counts in forced colors at ${width}px`, async ({ page }) => {
    const [{ events }, analog, digital] = await Promise.all([loadGoldenCorpus(), catalogFixture('analog'), catalogFixture('digital')]);
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('./');
    const expected = await expectedHomeActivity(page, events, analog, digital);
    await expect(page.locator('.chart-area:visible')).toHaveCount(0);
    await expect(page.locator('.chart-percent')).toHaveText(['0%', '25%', '50%', '75%', '100%']);
    const forcedLines = await page.locator('.chart-line').evaluateAll((nodes) => nodes.map((el) => ({
      stroke: getComputedStyle(el).stroke, dash: getComputedStyle(el).strokeDasharray,
    })));
    const systemText = await page.locator('.chart-percent').first().evaluate((el) => getComputedStyle(el).fill);
    expect(forcedLines).toEqual([
      { stroke: systemText, dash: 'none' },
      { stroke: systemText, dash: '6px, 3px' },
      { stroke: systemText, dash: '2px, 3px' },
    ]);
    const counts = page.locator('.activity-counts');
    const table = counts.getByRole('table', { name: 'Monthly activity counts; Events and distinct active projects' });
    await expect(table).toBeVisible();
    await expect(table.locator('thead th')).toHaveText(['Month', 'Events', 'Analog', 'Digital']);
    const expectedRows = expected.map((row) => [new Date(`${row.month}-01T00:00:00Z`).toLocaleDateString('en-US', {
      month: 'long', year: 'numeric', timeZone: 'UTC',
    }), ...[row.events, row.analog, row.digital].map(String)]);
    expect(await table.locator('tbody tr').evaluateAll((rows) => rows.map((row) => [...row.children].map((cell) => cell.textContent.trim())))).toEqual(expectedRows);
    const layout = await counts.evaluate((el) => ({
      position: getComputedStyle(el).position, clip: getComputedStyle(el).clip,
      width: el.clientWidth, scrollWidth: el.scrollWidth,
    }));
    expect(layout.position).toBe('static');
    expect(layout.clip).toBe('auto');
    expect(layout.scrollWidth).toBe(layout.width);
    for (const cell of await table.locator('th, td').all()) {
      await cell.scrollIntoViewIfNeeded();
      await expect(cell).toBeInViewport();
      const style = await cell.evaluate((el) => ({ fontSize: parseFloat(getComputedStyle(el).fontSize), color: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor }));
      expect(style.fontSize).toBeGreaterThanOrEqual(12);
      expect(style.color).not.toBe(style.background);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
  });
}
