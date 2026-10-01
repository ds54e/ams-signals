// Browser contracts for the public surfaces themselves: Timeline, Events, Event detail,
// Company and Person pages, Articles and /export.json — rendered structure, terminology,
// responsive chrome layout, and surface overlay and stacking behaviour.
//
// Discovery controls live in release-discovery.spec.mjs, Activity Matrix geometry in
// release-matrix.spec.mjs, and cross-surface navigation and inspector state in
// release-navigation.spec.mjs.

import { expect, test } from '@playwright/test';
import {
  basePath,
  countStatus,
  expectExplorerReady,
  getBrowserErrors,
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
  await page.goto('./');
  await expectExplorerReady(page);

  expect(new URL(page.url()).pathname).toBe(basePath);
  await expect(page).toHaveTitle('AMS Signals');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${publicOrigin}${basePath}`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /RNM|mixed-signal/i);
  await expect(page.locator('h1.visually-hidden')).toHaveText('AMS Signals Timeline');
  await expect(page.locator('main > .intro')).toHaveCount(0);
  await expect(page.getByText('FACTUAL PUBLIC TIMELINE', { exact: true })).toHaveCount(0);
  await expect(page.getByText('Public signals in RNM & mixed-signal verification', { exact: true })).toHaveCount(0);
  await expect(page.locator('a.brand')).toHaveAttribute('href', basePath);
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).toHaveAttribute('href', `${basePath}events/`);
  await expect(page.locator('.site-header nav a')).toHaveText(['Timeline', 'Events', 'Analog', 'Digital']);
  await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Analysis', exact: true })).toHaveCount(0);

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

test('Articles publishes every authored document and keeps editorial links separate', async ({ page }) => {
  for (const path of ['./', './events/']) {
    await page.goto(path);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    await expect(page.locator('a[href*="/analysis/"]')).toHaveCount(0);
    await expect(page.locator('.site-header nav a')).toHaveText(['Timeline', 'Events', 'Analog', 'Digital']);
    await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveCount(0);
  }

  const indexResponse = await page.request.get('./analysis/');
  const articleResponse = await page.request.get('./analysis/from-behavioral-models-to-managed-verification-assets/');
  expect(indexResponse.status()).toBe(404);
  expect(articleResponse.status()).toBe(404);

  await page.goto('./?q=PLL&companies=apple');
  await expectExplorerReady(page);

  // Articles are no longer a navigation surface, but every URL stays live and
  // must remain reachable by a direct request.
  const articlesResponse = await page.goto('./articles/');
  expect(articlesResponse?.status()).toBe(200);
  await page.waitForLoadState('load');

  expect(new URL(page.url()).pathname).toBe(`${basePath}articles/`);
  expect(new URL(page.url()).search).toBe('');
  await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  await expect(page).toHaveTitle('Articles · AMS Signals');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${publicOrigin}${basePath}articles/`);
  await expect(page.locator('h1#articles-heading')).toHaveText('Articles');
  await expect(page.locator('h1#articles-heading')).toHaveClass(/visually-hidden/);
  await expect(page.locator('.article-index .eyebrow, .article-index-header')).toHaveCount(0);
  await expect(page.getByText('No articles yet.', { exact: true })).toHaveCount(0);
  const articleRows = page.locator('.article-list > li');
  const articleLinks = articleRows.locator('h2 a');
  const indexUrl = page.url();
  const articleEntries = await articleRows.evaluateAll((rows) => rows.map((row) => ({
    date: row.querySelector('time')?.textContent?.trim() ?? '',
    datetime: row.querySelector('time')?.getAttribute('datetime') ?? '',
    title: row.querySelector('h2 a')?.textContent?.trim() ?? '',
    href: row.querySelector('h2 a')?.getAttribute('href') ?? '',
    summary: row.querySelector('.article-list-body > p')?.textContent?.trim() ?? '',
  })));
  expect(articleEntries.length, 'Articles index should publish at least one Article').toBeGreaterThan(0);
  await expect(page.locator('.article-index > .index-count')).toHaveText(`${articleEntries.length} articles`);

  const articles = articleEntries.map(({ title, href }) => ({
    title,
    href: new URL(href, indexUrl).href,
  }));
  for (const [index, article] of articles.entries()) {
    await expect(articleLinks.nth(index)).toBeVisible();
    expect(articleEntries[index].date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(articleEntries[index].datetime).toBe(articleEntries[index].date);
    expect(article.title, `Article title for ${article.href}`).not.toBe('');
    expect(articleEntries[index].summary, `Article summary for ${article.href}`).not.toBe('');
    const articleUrl = new URL(article.href);
    expect(articleUrl.origin).toBe(new URL(indexUrl).origin);
    expectSingleSegmentPath(articleUrl.pathname, `${basePath}articles/`);
  }
  expect(new Set(articles.map(({ href }) => href)).size).toBe(articles.length);
  await expect(page.locator('.article-list > li > .article-list-body > p')).toHaveCount(articles.length);
  await expect(page.locator('.article-list a[href$="/articles/ams-nettypes-interoperability/"]'))
    .toHaveText('「線」を自由にしたら、線同士がつながらなくなった');
  await expect(page.getByText('AMSの「線」を自由にしたら、線同士がつながらなくなった', { exact: true }))
    .toHaveCount(0);
  const indexLayout = await page.locator('.article-index').evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const firstRow = element.querySelector('.article-list > li');
    const firstTitle = firstRow?.querySelector('h2');
    return {
      width: rect.width,
      left: rect.left,
      right: document.documentElement.clientWidth - rect.right,
      rowDisplay: firstRow ? getComputedStyle(firstRow).display : '',
      titleFontSize: firstTitle ? Number.parseFloat(getComputedStyle(firstTitle).fontSize) : 0,
    };
  });
  expect(indexLayout.width).toBeLessThanOrEqual(920);
  expect(Math.abs(indexLayout.left - indexLayout.right)).toBeLessThanOrEqual(1);
  expect(indexLayout.rowDisplay).toBe('grid');
  expect(indexLayout.titleFontSize).toBeLessThanOrEqual(18);
  await expect(page.locator('main article')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Timeline', exact: true })).not.toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('link', { name: 'Events', exact: true })).not.toHaveAttribute('aria-current', 'page');
  expect((await page.request.get('./articles/__nonexistent-smoke-route__/')).status()).toBe(404);

  for (const article of articles) {
    const errorCountBeforeNavigation = getBrowserErrors(page).length;
    const response = await page.goto(article.href);
    expect(response?.status(), `HTTP status for ${article.href}`).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
    await expect(page.getByRole('heading', { name: article.title, exact: true, level: 1 })).toBeVisible();
    await expect(page.locator('.article-page > .back-link, .article-header .eyebrow')).toHaveCount(0);
    // An Article URL is live but explicitly excluded from indexing.
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    await expect(page.locator('link[rel="canonical"]'))
      .toHaveAttribute('href', `${publicOrigin}${new URL(article.href).pathname}`);
    await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveCount(0);
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
    expect(articleLayout.titleFontSize).toBeLessThanOrEqual(40);

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
        publisherRendered: row.querySelector('p') !== null,
      })));
      expect(sources.length, `Source rows for ${article.href}`).toBeGreaterThan(0);
      expect(sources.map(({ id }) => id)).toEqual(sources.map((_, index) => `source-${index + 1}`));
      expect(sources.map(({ number }) => number)).toEqual(sources.map((_, index) => `[${index + 1}]`));
      expect(new Set(sources.map(({ id }) => id)).size).toBe(sources.length);
      expect(new Set(sources.map(({ href }) => href)).size).toBe(sources.length);
      expect(sources.every(({ publisherRendered }) => !publisherRendered)).toBe(true);

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
    const relatedRows = await relatedSection.locator(':scope > ol > li').evaluateAll((rows) => rows.map((row) => ({
      year: row.querySelector('time')?.textContent?.trim() ?? '',
      datetime: row.querySelector('time')?.getAttribute('datetime') ?? '',
      title: row.querySelector('a')?.textContent?.trim() ?? '',
      href: row.querySelector('a')?.getAttribute('href') ?? '',
    })));
    const relatedEventHrefs = relatedRows.map(({ href }) => href);

    if (relatedSectionCount === 0) {
      expect(relatedEventHrefs).toEqual([]);
    } else {
      await expect(relatedSection.getByRole('heading', { name: 'Related events', exact: true, level: 2 }))
        .toBeVisible();
      expect(relatedEventHrefs.length, `Related Event links for ${article.href}`).toBeGreaterThan(0);
      for (const related of relatedRows) {
        expect(related.year).toMatch(/^\d{4}$/);
        expect(related.datetime.startsWith(related.year)).toBe(true);
        expect(related.title).not.toBe('');
        expect(related.title.endsWith('→')).toBe(false);
      }
    }

    const normalizedEventHrefs = relatedEventHrefs.map((href) => new URL(href, article.href).href);
    expect(new Set(normalizedEventHrefs).size, `Unique Related Event links for ${article.href}`)
      .toBe(normalizedEventHrefs.length);
    for (const eventHref of normalizedEventHrefs) {
      const eventUrl = new URL(eventHref);
      expect(eventUrl.origin).toBe(new URL(article.href).origin);
      expectSingleSegmentPath(eventUrl.pathname, `${basePath}events/`);
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

    if (new URL(article.href).pathname.endsWith('/articles/pll-metamorphic-testing/')) {
      const tableHeaders = await page.locator('.article-body table').evaluateAll((tables) => tables.map((table) => (
        [...table.querySelectorAll('thead th')].map((header) => header.textContent?.trim() ?? '')
      )));
      expect(tableHeaders.slice(0, 2)).toEqual([
        ['テスト', 'リファレンス周波数', '期待される結果'],
        ['入力の変更', 'ADC出力', 'RSSI'],
      ]);
    }

    expect(
      getBrowserErrors(page).slice(errorCountBeforeNavigation),
      `browser console and page errors for ${article.href}`,
    ).toEqual([]);
  }
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
  expect(payload).not.toHaveProperty('analysis');
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
  await expect(page.locator(
    '[data-event-result][data-event-id="stijn-ringeling-2026-ml-sigma-delta-evaluation"]',
  )).toBeVisible();
  await expect(page.locator(
    '[data-event-result][data-event-id="ecosystem-2026-08-pss-3-1-public-review"]',
  )).toBeVisible();

  const ids = await page.locator('[data-event-result]').evaluateAll((events) => events.map((event) => event.getAttribute('data-event-id')));
  expect(ids.length).toBeGreaterThan(0);
  expect(new Set(ids).size).toBe(ids.length);
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

  await page.goto('./');
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

test('Timeline utility bar places count and legend beside the compact controls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
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
    const companyOptionCount = await page.locator('[data-company-options] input').count();
    await expect(page.locator('[data-company-options] input:checked')).toHaveCount(companyOptionCount);
    await expect(page.locator('[data-company-summary]')).toHaveText(`All ${companyOptionCount}`);
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
  await expect(page.getByRole('link', { name: 'Analog', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Digital', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Articles', exact: true })).toHaveCount(0);
  await expect(page.locator('.site-header nav a')).toHaveText(['Timeline', 'Events', 'Analog', 'Digital']);
});
