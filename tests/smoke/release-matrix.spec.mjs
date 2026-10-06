// Browser contracts for the global Activity Matrix: progressive time bands, bundle
// membership, packing and projection, activity row order, sticky-label paint order, and the
// invariant that filtering never recomputes geometry. Corpus geometry and ordering
// themselves are owned by tests/golden/activity-matrix*.test.ts and activity-order.test.ts.
//
// Surface rendering lives in release-surfaces.spec.mjs, discovery controls in
// release-discovery.spec.mjs, and cross-surface navigation in release-navigation.spec.mjs.

import { expect, test } from '@playwright/test';
import { buildActivityMatrixGeometry } from '../../src/lib/activityMatrix.ts';
import { loadGoldenCorpus } from '../golden/corpus.ts';
import {
  basePath,
  ensureScrollableStickyCandidate,
  expectExplorerReady,
  expectStickyLabelToOccludeActiveMark,
  installBrowserErrorGuards,
  viewerCorpus,
} from './release-helpers.mjs';

installBrowserErrorGuards(test);

test('Event bundles retain direct Event interaction and reduce cleanly under filtering', async ({ page }) => {
  await page.goto('./');
  await expectExplorerReady(page);
  const corpus = await viewerCorpus(page);
  const eventById = new Map(corpus.events.map((event) => [event.id, event]));
  const normalizeToken = (value) => String(value).normalize('NFKC').toLocaleLowerCase('en')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  // Mirrors the documented search rule so filtering expectations are derived, not pinned.
  const matchesTerm = (searchText, term) => normalizeToken(searchText).split(' ')
    .some((token) => (term.length <= 2 ? token === term : token.startsWith(term)));

  const bands = await page.locator('[data-activity-time-band]').evaluateAll((nodes) => nodes.map((node) => ({
    key: node.getAttribute('data-time-band'),
    startYear: node.hasAttribute('data-band-start-year')
      ? Number(node.getAttribute('data-band-start-year'))
      : undefined,
    endYear: Number(node.getAttribute('data-band-end-year')),
  })));

  // The bundle fixture is derived from the rendered Matrix: bundle membership, packing and
  // band sizing are owned by the Node geometry contracts, not by this browser test.
  const renderedBundles = await page.locator('[data-group="both"] [data-matrix-bundle]').evaluateAll((nodes) => (
    nodes.map((node) => ({
      key: node.getAttribute('data-bundle-key'),
      mode: node.getAttribute('data-bundle-mode'),
      eventIds: JSON.parse(node.getAttribute('data-bundle-event-ids')),
    }))
  ));
  const fixture = renderedBundles.find(({ mode, eventIds }) => mode === 'period' && eventIds.length >= 3);
  expect(fixture, 'the corpus must supply a multi-member period bundle').toBeTruthy();

  const bundle = page.locator(`[data-group="both"] [data-matrix-bundle][data-bundle-key="${fixture.key}"]`);
  const bundledIds = fixture.eventIds;
  await expect(bundle).toBeVisible();
  expect(JSON.parse(await bundle.getAttribute('data-visible-event-ids'))).toEqual(bundledIds);
  await expect(bundle).toHaveAttribute('data-bundle-member-count', String(bundledIds.length));
  await expect(bundle).toHaveAttribute('data-bundle-mode', 'period');
  await expect(bundle).not.toHaveAttribute('data-bundle-window');
  await expect(bundle).not.toHaveAttribute('data-bundle-window-px');
  await expect(bundle.locator('[data-bundle-member]')).toHaveCount(bundledIds.length);
  await expect(page.locator('[data-cluster-count], [data-detail-cluster], .is-cluster, .is-mixed')).toHaveCount(0);

  // A period bundle sits inside the bucket band that contains every member year.
  const bundledYears = bundledIds.map((id) => Number(eventById.get(id).start.slice(0, 4)));
  const containingBand = bands.find(({ startYear, endYear }) => (startYear === undefined
    ? bundledYears.every((year) => year <= endYear)
    : bundledYears.every((year) => year >= startYear && year <= endYear)));
  expect(containingBand, `no current band contains ${bundledYears.join(', ')}`).toBeTruthy();
  await expect(bundle).toHaveAttribute('data-time-band', containingBand.key);

  // Rendered member metadata stays internally coherent with the shared design constants.
  const bundledColumns = Number(await bundle.getAttribute('data-bundle-columns'));
  const bundledRows = Number(await bundle.getAttribute('data-bundle-rows'));
  expect(bundledColumns).toBeGreaterThanOrEqual(1);
  expect(bundledRows).toBe(Math.ceil(bundledIds.length / bundledColumns));
  expect(Number(await bundle.getAttribute('data-bundle-width-px')))
    .toBe((bundledColumns * 18) + ((bundledColumns - 1) * 2));

  const memberKinds = bundledIds.map((id) => eventById.get(id).kind);
  await expect(bundle.locator('[data-bundle-member].event-kind-technical'))
    .toHaveCount(memberKinds.filter((kind) => kind === 'technical').length);
  await expect(bundle.locator('[data-bundle-member].event-kind-organizational'))
    .toHaveCount(memberKinds.filter((kind) => kind === 'organizational').length);
  const bundleKindShapes = await page.locator('[data-group="both"]').evaluate((group) => {
    const technical = group.querySelector('[data-bundle-member].event-kind-technical .timeline-glyph');
    const organizational = group.querySelector('[data-bundle-member].event-kind-organizational .timeline-glyph');
    return {
      technicalRadius: getComputedStyle(technical).borderRadius,
      organizationalRadius: getComputedStyle(organizational).borderRadius,
    };
  });
  expect(bundleKindShapes.technicalRadius).not.toBe(bundleKindShapes.organizationalRadius);

  // Every bundle member stays directly selectable.
  for (const id of bundledIds) {
    const member = bundle.locator(`[data-bundle-member][data-event-id="${id}"]`);
    await member.click();
    await expect(member).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-detail-event]')).toHaveAttribute('href', `${basePath}events/${id}/`);
  }

  const bundleGeometry = () => bundle.evaluate((node) => ({
    eventIds: node.getAttribute('data-bundle-event-ids'),
    x: node.getAttribute('data-bundle-x'),
    rowStart: node.getAttribute('data-visual-row-start'),
    rowEnd: node.getAttribute('data-visual-row-end'),
    top: node.getAttribute('data-bundle-top'),
    height: getComputedStyle(node).getPropertyValue('--bundle-height'),
    width: node.getAttribute('data-bundle-width-px'),
    columns: node.getAttribute('data-bundle-columns'),
    rows: node.getAttribute('data-bundle-rows'),
  }));
  const immutableGeometry = await bundleGeometry();

  // Filtering reduces the bundle to exactly the matching members, and to one member — centred
  // in its bundle — for a term only that member carries.
  const isolating = bundledIds
    .flatMap((id) => normalizeToken(`${eventById.get(id).headline} ${eventById.get(id).fact}`)
      .split(' ')
      .filter((token) => token.length >= 8)
      .map((token) => ({ token, id })))
    .find(({ token }) => bundledIds.filter((other) => matchesTerm(eventById.get(other).search, token)).length === 1);
  expect(isolating, 'the fixture bundle must expose a term that isolates one member').toBeTruthy();

  await page.locator('[data-search]').fill(isolating.token);
  await expect.poll(async () => JSON.parse(await bundle.getAttribute('data-visible-event-ids')))
    .toEqual([isolating.id]);
  await expect(bundle).toHaveAttribute('data-visible-member-count', '1');
  await expect(bundle.locator('[data-bundle-member]:visible')).toHaveCount(1);
  expect(await bundleGeometry()).toEqual(immutableGeometry);
  const centeredSingle = await bundle.evaluate((node) => {
    const bundleBounds = node.getBoundingClientRect();
    const memberBounds = node.querySelector('[data-bundle-member]:not([hidden])').getBoundingClientRect();
    return Math.abs((bundleBounds.left + bundleBounds.width / 2) - (memberBounds.left + memberBounds.width / 2));
  });
  expect(centeredSingle).toBeLessThanOrEqual(1);

  const absentToken = ['nomatchprobezz', 'qzqxqzqx', 'zxzxzxzx']
    .find((candidate) => bundledIds.every((id) => !matchesTerm(eventById.get(id).search, candidate)));
  expect(absentToken, 'a term absent from the bundle must exist').toBeTruthy();
  await page.locator('[data-search]').fill(absentToken);
  await expect.poll(async () => JSON.parse(await bundle.getAttribute('data-visible-event-ids'))).toEqual([]);
  await expect(bundle).toHaveAttribute('data-visible-member-count', '0');
  await expect(bundle).toBeHidden();

  await page.locator('[data-search]').fill('');
  const sharedEventId = (await Promise.all(corpus.events
    .filter((event) => event.companies.length + event.people.length > 1)
    .map(async ({ id }) => ((await page.locator(`[data-matrix-mark][data-event-id="${id}"]:visible`).count()) > 1
      ? id
      : null))))
    .find(Boolean);
  expect(sharedEventId, 'the corpus must render a shared Event in more than one lane').toBeTruthy();
  const containingMarks = page.locator(`[data-matrix-mark][data-event-id="${sharedEventId}"]:visible`);
  expect(await containingMarks.count()).toBeGreaterThan(1);
  await containingMarks.first().click();
  await expect.poll(() => containingMarks.evaluateAll((marks) => (
    marks.every((mark) => mark.getAttribute('aria-pressed') === 'true')
  ))).toBe(true);

  const independentKindShapes = await bundle.evaluate((node) => {
    const members = [...node.querySelectorAll('[data-bundle-member]')];
    members[1].classList.remove('event-kind-technical');
    members[1].classList.add('event-kind-organizational');
    return members.map((member) => {
      const glyphStyle = getComputedStyle(member.querySelector('.timeline-glyph'));
      return {
        borderRadius: glyphStyle.borderRadius,
        background: glyphStyle.backgroundColor,
      };
    });
  });
  expect(independentKindShapes[0]).not.toEqual(independentKindShapes[1]);
});

test('recent-activity row ordering and alphabetical Company picker stay filter-stable', async ({ page }) => {
  const payload = await (await page.request.get('./export.json')).json();
  await page.goto('./');
  await expectExplorerReady(page);
  const viewerEvents = await page.locator('[data-events-json]').evaluate((node) => (
    JSON.parse(node.textContent).map((event) => ({
      id: event.id,
      when: { start: event.start },
      companies: event.companies.map(({ id }) => id),
      people: event.people.map(({ id }) => id),
      peopleWithNames: event.people,
    }))
  ));
  const viewerPeople = [...new Map(viewerEvents.flatMap((event) => event.peopleWithNames)
    .map((person) => [person.id, person])).values()];
  const latestYear = Math.max(...viewerEvents.map((event) => Number(event.when.start.slice(0, 4))));
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
    const linked = viewerEvents.filter((event) => event.companies.includes(company.id)).sort((left, right) => (
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
  // Comparator correctness and rank ordering are owned by tests/golden/activity-order.test.ts.
  expect(expectedIds, 'the corpus must supply active Companies').not.toHaveLength(0);
  const expectedPeople = viewerPeople.map((person) => {
    const linked = viewerEvents.filter((event) => event.people.includes(person.id)).sort((left, right) => (
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
  expect(expectedPeople.length, 'the corpus must supply active People').toBeGreaterThan(0);

  const pickerOrder = () => page.locator('[data-company-options] label').evaluateAll((labels) => labels.map((label) => ({
    id: label.querySelector('input')?.value,
    name: label.querySelector('span')?.textContent?.trim(),
    count: label.querySelector('small')?.textContent?.trim(),
  })));

  for (const path of ['./', './events/']) {
    await page.goto(path);
    await expectExplorerReady(page, path.includes('events') ? 'events' : 'timeline');
    expect(await pickerOrder()).toEqual(path.includes('events') ? [] : expectedPicker);
    await expect(page.locator('.company-records')).toHaveCount(0);

    await page.locator('[data-search]').fill('RNM');
    await expect.poll(() => new URL(page.url()).searchParams.get('q')).toBe('RNM');
    expect(await pickerOrder()).toEqual(path.includes('events') ? [] : expectedPicker);
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

test('global Activity Matrix renders the validated geometry without visual bundle overlaps', async ({ page }) => {
  const corpus = await loadGoldenCorpus();
  const geometry = buildActivityMatrixGeometry(corpus.events, corpus.companies, corpus.people);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('./');
  await expectExplorerReady(page);

  // Node contracts own projection, boundary grouping and packing. This checks the
  // integration boundary: source geometry reaches the served DOM and CSS intact.
  const matrix = page.locator('[data-activity-matrix-surface]');
  await expect(matrix).toHaveAttribute('data-domain-oldest-year', String(geometry.domain.oldestYear));
  await expect(matrix).toHaveAttribute('data-domain-latest-year', String(geometry.domain.latestYear));
  await expect(matrix).toHaveAttribute('data-track-width', String(geometry.trackWidth));
  await expect(matrix).toHaveAttribute('data-time-band-count', String(geometry.timeBands.length));
  await expect(page.locator('[data-timeline-segment]')).toHaveCount(0);
  const bands = await page.locator('[data-activity-time-band]').evaluateAll((nodes) => nodes.map((node) => ({
    key: node.getAttribute('data-time-band'),
    label: node.getAttribute('data-band-label'),
    ariaLabel: node.getAttribute('data-band-aria-label'),
    startYear: node.hasAttribute('data-band-start-year') ? Number(node.getAttribute('data-band-start-year')) : undefined,
    endYear: Number(node.getAttribute('data-band-end-year')),
    widthPx: Number(node.getAttribute('data-band-width-px')),
    maxEventsPerRow: Number(node.getAttribute('data-band-max-events-per-row')),
    startPx: Number(node.getAttribute('data-band-start-px')),
    endPx: Number(node.getAttribute('data-band-end-px')),
    zone: node.getAttribute('data-time-zone'),
    resolution: node.getAttribute('data-time-resolution'),
  })));
  expect(bands).toEqual(geometry.timeBands.map((band) => ({ ...band, startYear: band.startYear })));
  await expect(page.locator('.activity-axis-track .activity-guides span')).toHaveCount(geometry.boundaries.length);
  await expect(page.locator('.activity-axis-track .activity-guides .is-zone-boundary, .activity-zone-label')).toHaveCount(0);
  await expect(page.locator('.activity-axis-track')).toHaveAttribute('aria-label',
    `Activity Matrix time bands: ${geometry.timeBands.map(({ ariaLabel }) => ariaLabel).join(', ')}. Newest is left.`);

  const rows = await page.locator('[data-matrix-row]').evaluateAll((nodes) => nodes.map((node) => ({
    lane: `${node.getAttribute('data-lane-type')}:${node.getAttribute('data-entity-id')}`,
    visualRowCount: Number(node.getAttribute('data-visual-row-count')),
    height: Number.parseFloat(node.style.getPropertyValue('--matrix-row-height')),
    borderBottom: getComputedStyle(node).borderBottomWidth,
    baselineContent: getComputedStyle(node.querySelector('[data-matrix-track]'), '::before').content,
    bundles: [...node.querySelectorAll('[data-matrix-bundle]')].map((bundle) => ({
      ids: JSON.parse(bundle.getAttribute('data-bundle-event-ids')),
      x: Number(bundle.getAttribute('data-bundle-x')),
      xPx: Number(bundle.getAttribute('data-bundle-x-px')),
      minX: Number(bundle.getAttribute('data-min-original-event-x')),
      maxX: Number(bundle.getAttribute('data-max-original-event-x')),
      maxDisplacement: Number(bundle.getAttribute('data-max-original-displacement')),
      columns: Number(bundle.getAttribute('data-bundle-columns')),
      rowCount: Number(bundle.getAttribute('data-bundle-rows')),
      bundleWidthPx: Number(bundle.getAttribute('data-bundle-width-px')),
      collisionWidthPx: Number(bundle.getAttribute('data-collision-width-px')),
      rowStart: Number(bundle.getAttribute('data-visual-row-start')),
      rowEnd: Number(bundle.getAttribute('data-visual-row-end')),
      top: Number(bundle.getAttribute('data-bundle-top')),
      mode: bundle.getAttribute('data-bundle-mode'),
      zone: bundle.getAttribute('data-time-zone'),
      resolution: bundle.getAttribute('data-time-resolution'),
      bandKeys: JSON.parse(bundle.getAttribute('data-time-band-keys')),
      window: bundle.hasAttribute('data-bundle-window') ? Number(bundle.getAttribute('data-bundle-window')) : null,
      windowPx: bundle.hasAttribute('data-bundle-window-px') ? Number(bundle.getAttribute('data-bundle-window-px')) : null,
      members: [...bundle.querySelectorAll('[data-bundle-member]')].map((member) => ({
        id: member.getAttribute('data-event-id'),
        x: Number(member.getAttribute('data-original-event-x')),
        timestamp: Number(member.getAttribute('data-original-placement-timestamp')),
        band: member.getAttribute('data-time-band'),
        zone: member.getAttribute('data-time-zone'),
      })),
    })),
  })));
  expect(rows).toEqual(geometry.combinedRows.map((row) => ({
    lane: `${row.entityType}:${row.entity.data.id}`,
    visualRowCount: row.visualRowCount,
    height: row.height,
    borderBottom: '1px',
    baselineContent: 'none',
    bundles: row.bundles.map((bundle) => ({
      ids: bundle.eventIds, x: bundle.x, xPx: bundle.xPx,
      minX: bundle.minOriginalX, maxX: bundle.maxOriginalX, maxDisplacement: bundle.maxOriginalDisplacement,
      columns: bundle.columnCount, rowCount: bundle.rowCount,
      bundleWidthPx: bundle.bundleWidthPx, collisionWidthPx: bundle.collisionWidthPx,
      rowStart: bundle.rowStart, rowEnd: bundle.rowEnd, top: bundle.top,
      mode: bundle.mode, zone: bundle.timeZone, resolution: bundle.timeResolution, bandKeys: bundle.timeBandKeys,
      window: bundle.mode === 'proximity' ? (32 / geometry.trackWidth) * 100 : null,
      windowPx: bundle.mode === 'proximity' ? 32 : null,
      members: bundle.members.map((member) => ({
        id: member.eventId, x: member.originalX, timestamp: member.placementTimestamp,
        band: member.timeBandKey, zone: member.timeZone,
      })),
    })),
  })));

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
  const globalCorpus = await viewerCorpus(page);
  await expect(page.locator('[data-activity-matrix-surface]'))
    .toHaveAttribute('data-domain-oldest-year', String(globalCorpus.oldestYear));
  // The progressive band labels are derived from the current latest corpus year.
  await expect(page.locator('[data-activity-time-band]')).toHaveText([
    String(globalCorpus.latestYear),
    String(globalCorpus.latestYear - 1),
    String(globalCorpus.latestYear - 2),
    String(globalCorpus.latestYear - 3),
    `${globalCorpus.latestYear - 6}–${globalCorpus.latestYear - 4}`,
    `${globalCorpus.latestYear - 11}–${globalCorpus.latestYear - 7}`,
    `≤${globalCorpus.latestYear - 12}`,
  ]);

  await page.goto('./companies/apple/');
  await expectExplorerReady(page);
  await expect(page.locator('.desktop-timeline')).toBeVisible();
  await expect(page.locator('[data-activity-matrix-surface]')).toHaveCount(0);
  // A context Timeline derives its historical segment label from its own Events.
  const contextCorpus = await viewerCorpus(page);
  const historicalCutoff = 2020;
  const oldestHistoricalYear = Math.min(
    ...contextCorpus.events.map((event) => Number(event.start.slice(0, 4))).filter((year) => year <= historicalCutoff),
  );
  const expectedHistoricalLabel = oldestHistoricalYear < historicalCutoff
    ? `${historicalCutoff}–${oldestHistoricalYear}`
    : String(historicalCutoff);
  await expect(page.locator('[data-timeline-segment][data-segment-key="through-2020"]'))
    .toHaveAttribute('data-segment-label', expectedHistoricalLabel);
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
      visualRows: lane.getAttribute('data-visual-row-count'),
      style: lane.getAttribute('style'),
    })),
    bundles: [...root.querySelectorAll('[data-matrix-bundle]')].map((bundle) => ({
      lane: bundle.closest('[data-lane]')?.getAttribute('data-entity-id'),
      ids: bundle.getAttribute('data-bundle-event-ids'),
      x: bundle.getAttribute('data-bundle-x'),
      rowStart: bundle.getAttribute('data-visual-row-start'),
      rowEnd: bundle.getAttribute('data-visual-row-end'),
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
        rowStart: bundle.getAttribute('data-visual-row-start'),
        rowEnd: bundle.getAttribute('data-visual-row-end'),
      }))
    ));
    if (!referenceBundles) referenceBundles = bundles;
    else expect(bundles, `${viewport.width}px bundle geometry`).toEqual(referenceBundles);
    const initial = await measure();
    expectAligned(initial, `${viewport.width}px initial`);
    expect(initial.newestBandLeft, `${viewport.width}px 2026 band clears label column`)
      .toBeGreaterThanOrEqual(initial.labelRight - 1);
    expect(initial.axisHeight, `${viewport.width}px compact axis height`).toBe(35);


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

test('Matrix fills available width, scrolls only its derived excess locally, and preserves initial-lens reveal behavior', async ({ page }) => {
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
  const medium = await scroller.evaluate((node) => {
    const shell = node.closest('.activity-matrix-shell');
    const labelWidth = Number.parseFloat(getComputedStyle(shell).getPropertyValue('--matrix-label-width'));
    const trackWidth = Number(shell.getAttribute('data-matrix-track-width'));
    return {
      localOverflow: node.scrollWidth - node.clientWidth,
      expectedDerivedOverflow: Math.max(0, (labelWidth + trackWidth) - node.clientWidth),
      pageClientWidth: document.documentElement.clientWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
    };
  });
  expect(medium.localOverflow).toBe(medium.expectedDerivedOverflow);
  expect(medium.pageScrollWidth).toBe(medium.pageClientWidth);

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

  await page.goto('./?q=Bringing%20Continuous%20Domain');
  await expectExplorerReady(page);
  await expect(page.locator('[data-timeline-scroll]')).toHaveAttribute(
    'data-initial-reveal',
    'cadence-2012-real-valued-systemverilog-coverage',
  );
  expect(await page.locator('[data-timeline-scroll]').evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
});

test('global Matrix sticky labels occlude active marks without clearing selection', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto('./');
  await expectExplorerReady(page);

  // The lane under test is derived: the contract needs a mark whose current position can
  // actually be scrolled behind its sticky label, which depends on corpus density.
  const stickyRow = await ensureScrollableStickyCandidate(page, {
    labelSelector: '.matrix-entity-label',
    markSelector: '[data-matrix-mark]',
  });
  expect(stickyRow, 'a lane must expose a mark that can be scrolled behind its sticky label').toBeTruthy();

  await expectStickyLabelToOccludeActiveMark(page, {
    rowSelector: stickyRow.rowSelector,
    labelSelector: '.matrix-entity-label',
    markSelector: '[data-matrix-mark]',
  });

  const axisPaintOrder = await page.locator('.activity-matrix-shell').evaluate(async (shell) => {
    const axis = shell.querySelector('.activity-matrix-axis-viewport');
    const axisMask = shell.querySelector('.matrix-axis-spacer');
    const rowLabel = shell.querySelector('[data-matrix-row][data-entity-id="apple"] .matrix-entity-label');
    const rowDocumentTop = window.scrollY + rowLabel.getBoundingClientRect().top;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, rowDocumentTop);
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const axisBounds = axisMask.getBoundingClientRect();
    const labelBounds = rowLabel.getBoundingClientRect();
    const overlap = {
      left: Math.max(axisBounds.left, labelBounds.left),
      right: Math.min(axisBounds.right, labelBounds.right),
      top: Math.max(axisBounds.top, labelBounds.top),
      bottom: Math.min(axisBounds.bottom, labelBounds.bottom),
    };
    const point = {
      x: (overlap.left + overlap.right) / 2,
      y: (overlap.top + overlap.bottom) / 2,
    };
    const topmost = document.elementFromPoint(point.x, point.y);
    return {
      axisPosition: getComputedStyle(axis).position,
      overlapWidth: overlap.right - overlap.left,
      overlapHeight: overlap.bottom - overlap.top,
      topmostIsAxis: topmost === axisMask || axisMask.contains(topmost),
    };
  });
  expect(axisPaintOrder.axisPosition).toBe('sticky');
  expect(axisPaintOrder.overlapWidth).toBeGreaterThan(0);
  expect(axisPaintOrder.overlapHeight).toBeGreaterThan(0);
  expect(axisPaintOrder.topmostIsAxis, 'sticky Matrix axis remains above sticky row labels').toBe(true);
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
    const glyph = mark.querySelector('.timeline-glyph');
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
      glyphWidth: parseFloat(getComputedStyle(glyph).width),
    };
  });
  expect(visualGrammar.rowHeight).toBeGreaterThanOrEqual(28);
  expect(visualGrammar.rowBorder).toBe('1px');
  expect(visualGrammar.baselineContent).toBe('none');
  expect(visualGrammar.guideBorder).toBe('1px');
  expect(visualGrammar.guideStyle).toBe('solid');
  expect(visualGrammar.labelWhiteSpace).toBe('nowrap');
  expect(visualGrammar.labelOverflow).toBe('hidden');
  expect(visualGrammar.labelTextOverflow).toBe('ellipsis');
  expect(visualGrammar.hitWidth).toBe(18);
  expect(visualGrammar.glyphWidth).toBe(8);
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
    expect(colors.company).toBe(colorScheme === 'light' ? 'rgb(36, 43, 48)' : 'rgb(237, 242, 237)');
    expect(colors.person).toBe(colorScheme === 'light' ? 'rgb(75, 109, 137)' : 'rgb(143, 169, 190)');
    expect(colors.person, `${colorScheme} Person versus Organizational`).not.toBe(colors.organizational);
    expect(colors.contrast, `${colorScheme} Person label contrast`).toBeGreaterThanOrEqual(4.5);
  }
});
