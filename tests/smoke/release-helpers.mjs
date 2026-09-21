// Shared helpers for the release browser suites. The specs are split by responsibility:
//
//   release-surfaces.spec.mjs    rendered surface structure, terminology, chrome layout
//   release-discovery.spec.mjs   search, Signal-type filter, Company picker, canonicalization
//   release-matrix.spec.mjs      global Activity Matrix bands, bundles, packing, marking
//   release-navigation.spec.mjs  cross-surface URL/state, inspector selection, context Timelines
//
// Geometry, ordering and export projection for the same product behaviour are owned by the
// Node contracts in tests/golden/. These helpers exist only for what needs a browser.

import { expect } from '@playwright/test';

export const basePath = '/ams-signals/';

// Browser console and page errors are collected per page and asserted after every test.
const browserErrors = new WeakMap();

/**
 * Registers the shared browser-error guards. Each spec calls this once at module scope:
 * Playwright resolves top-level hooks against the suite of the file being loaded, so the
 * hooks cannot be declared here directly.
 */
export function installBrowserErrorGuards(test) {
  test.beforeEach(async ({ page }) => {
    const errors = [];
    browserErrors.set(page, errors);
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  });

  test.afterEach(async ({ page }, testInfo) => {
    expect(getBrowserErrors(page), `${testInfo.title}: browser console and page errors`).toEqual([]);
  });
}

export function getBrowserErrors(page) {
  return browserErrors.get(page) ?? [];
}

export async function expectExplorerReady(page, surface = 'timeline') {
  const explorer = page.locator('[data-event-explorer-root]');
  await expect(explorer, `event explorer root initialized on ${page.url()}`)
    .toHaveAttribute('data-initialized', 'true');
  await expect(explorer, `event explorer surface is "${surface}" on ${page.url()}`)
    .toHaveAttribute('data-surface', surface);
  await expect(page.locator('[data-status]'), `event status line on ${page.url()}`)
    .toHaveText(/\d+ of \d+ events?/);
}

export async function visibleTimelineEventIds(page) {
  return page.locator('[data-event-mark]:visible').evaluateAll((marks) => (
    [...new Set(marks.map((mark) => mark.getAttribute('data-event-id')).filter(Boolean))].sort()
  ));
}

export async function visibleListedEventIds(page) {
  return page.locator('[data-event-result]:visible').evaluateAll((events) => (
    events.map((event) => event.getAttribute('data-event-id')).filter(Boolean).sort()
  ));
}

// The viewer's own serialized factual corpus. Browser expectations derive their
// counts and orderings from this current corpus instead of pinned totals.
export async function viewerCorpus(page) {
  const events = await page.locator('[data-events-json]').evaluate((node) => JSON.parse(node.textContent));
  const ofKind = (kind) => events.filter((event) => event.kind === kind).length;
  return {
    events,
    total: events.length,
    technical: ofKind('technical'),
    organizational: ofKind('organizational'),
    companyIds: (event) => event.companies.map(({ id }) => id),
    peopleIds: (event) => event.people.map(({ id }) => id),
    latestYear: Math.max(...events.map((event) => Number(event.start.slice(0, 4)))),
    oldestYear: Math.min(...events.map((event) => Number(event.start.slice(0, 4)))),
  };
}

export function countStatus(visible, total) {
  return `${visible} of ${total} events`;
}

export async function expectStickyLabelToOccludeActiveMark(page, {
  rowSelector,
  labelSelector,
  markSelector,
}) {
  const row = page.locator(rowSelector);
  const scroller = page.locator('[data-timeline-scroll]');
  await expect(row).toBeVisible();
  await scroller.evaluate((node) => { node.scrollLeft = 0; });
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));

  const candidate = await row.evaluate((node, selectors) => {
    const label = node.querySelector(selectors.labelSelector);
    const scrollContainer = node.closest('[data-timeline-scroll]');
    const labelBounds = label.getBoundingClientRect();
    const maximumScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    return [...node.querySelectorAll(selectors.markSelector)]
      .filter((mark) => !mark.hidden && mark.getClientRects().length > 0)
      .map((mark) => {
        const bounds = mark.getBoundingClientRect();
        const targetScrollLeft = Math.min(
          maximumScroll,
          Math.max(0, ((bounds.left + bounds.right) / 2) - (labelBounds.right - 2)),
        );
        const shiftedLeft = bounds.left - targetScrollLeft;
        const shiftedRight = bounds.right - targetScrollLeft;
        return {
          eventId: mark.getAttribute('data-event-id'),
          targetScrollLeft,
          overlapsAtTarget: shiftedLeft < labelBounds.right && shiftedRight > labelBounds.left,
        };
      })
      .filter(({ targetScrollLeft, overlapsAtTarget }) => targetScrollLeft > 0 && overlapsAtTarget)
      .sort((left, right) => left.targetScrollLeft - right.targetScrollLeft)[0] ?? null;
  }, { labelSelector, markSelector });

  expect(candidate, 'a rendered Event mark can be scrolled behind its sticky label').not.toBeNull();
  const mark = row.locator(`${markSelector}[data-event-id="${candidate.eventId}"]`);
  await mark.click();
  await expect(mark).toHaveClass(/is-active/);
  await expect(mark).toHaveAttribute('aria-pressed', 'true');

  await scroller.evaluate((node, scrollLeft) => {
    node.scrollLeft = scrollLeft;
    node.dispatchEvent(new Event('scroll'));
  }, candidate.targetScrollLeft);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));

  const paintOrder = await row.evaluate((node, selectors) => {
    const label = node.querySelector(selectors.labelSelector);
    const mark = node.querySelector(`${selectors.markSelector}[data-event-id="${selectors.eventId}"]`);
    const labelBounds = label.getBoundingClientRect();
    const markBounds = mark.getBoundingClientRect();
    const overlap = {
      left: Math.max(labelBounds.left, markBounds.left),
      right: Math.min(labelBounds.right, markBounds.right),
      top: Math.max(labelBounds.top, markBounds.top),
      bottom: Math.min(labelBounds.bottom, markBounds.bottom),
    };
    const point = {
      x: (overlap.left + overlap.right) / 2,
      y: (overlap.top + overlap.bottom) / 2,
    };
    const topmost = document.elementFromPoint(point.x, point.y);
    return {
      overlapWidth: overlap.right - overlap.left,
      overlapHeight: overlap.bottom - overlap.top,
      topmostIsLabel: topmost === label || label.contains(topmost),
      active: mark.classList.contains('is-active'),
      pressed: mark.getAttribute('aria-pressed'),
    };
  }, { labelSelector, markSelector, eventId: candidate.eventId });

  expect(paintOrder.overlapWidth, 'active Event overlaps the sticky label horizontally').toBeGreaterThan(0);
  expect(paintOrder.overlapHeight, 'active Event overlaps the sticky label vertically').toBeGreaterThan(0);
  expect(paintOrder.topmostIsLabel, 'sticky label is topmost in the overlap').toBe(true);
  expect(paintOrder.active).toBe(true);
  expect(paintOrder.pressed).toBe('true');
  await expect(page.locator('[data-detail-event]'))
    .toHaveAttribute('href', `${basePath}events/${candidate.eventId}/`);

  return candidate.eventId;
}

/**
 * Finds a Matrix lane whose currently positioned mark can be scrolled behind its sticky
 * label, narrowing the viewport as needed. Which lane qualifies, and how much local
 * overflow is required, both depend on corpus density, so the fixture is derived rather
 * than pinned to a named Company.
 */
export async function ensureScrollableStickyCandidate(page, selectors) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const found = await findScrollableStickyLabelRow(page, selectors);
    if (found) return found;

    const measured = await page.evaluate(({ labelSelector, markSelector }) => {
      const scroller = document.querySelector('[data-timeline-scroll]');
      let smallestGap = Number.POSITIVE_INFINITY;
      for (const row of scroller.querySelectorAll('[data-matrix-row]')) {
        if (row.hidden || !row.getClientRects().length) continue;
        const label = row.querySelector(labelSelector);
        if (!label) continue;
        const labelBounds = label.getBoundingClientRect();
        for (const mark of row.querySelectorAll(markSelector)) {
          if (mark.hidden || !mark.getClientRects().length) continue;
          smallestGap = Math.min(smallestGap, mark.getBoundingClientRect().left - labelBounds.right);
        }
      }
      return {
        maximumScroll: scroller.scrollWidth - scroller.clientWidth,
        smallestGap,
        clientWidth: document.documentElement.clientWidth,
      };
    }, selectors);

    if (!Number.isFinite(measured.smallestGap)) return null;
    const deficit = Math.ceil(measured.smallestGap - measured.maximumScroll) + 8;
    if (deficit <= 0) return null;

    await page.setViewportSize({ width: Math.max(320, measured.clientWidth - deficit), height: 900 });
    await page.goto('./');
    await expectExplorerReady(page);
  }

  return findScrollableStickyLabelRow(page, selectors);
}

/**
 * Finds a Matrix lane whose currently positioned mark can be scrolled behind its sticky
 * label. Which lane qualifies depends on corpus density, so the fixture is derived rather
 * than pinned to a named Company.
 */
export async function findScrollableStickyLabelRow(page, { labelSelector, markSelector }) {
  return page.locator('[data-timeline-scroll]').evaluate((scroller, selectors) => {
    const maximumScroll = scroller.scrollWidth - scroller.clientWidth;
    if (maximumScroll <= 0) return null;

    let best = null;
    for (const row of scroller.querySelectorAll('[data-group="both"] [data-matrix-row]')) {
      if (row.hidden || !row.getClientRects().length) continue;
      const label = row.querySelector(selectors.labelSelector);
      if (!label) continue;
      const labelBounds = label.getBoundingClientRect();

      for (const mark of row.querySelectorAll(selectors.markSelector)) {
        if (mark.hidden || !mark.getClientRects().length) continue;
        const bounds = mark.getBoundingClientRect();
        const centre = (bounds.left + bounds.right) / 2;
        const targetScrollLeft = Math.min(maximumScroll, Math.max(0, centre - (labelBounds.right - 2)));
        if (targetScrollLeft <= 0) continue;

        const shiftedLeft = bounds.left - targetScrollLeft;
        const shiftedRight = bounds.right - targetScrollLeft;
        const overlaps = shiftedLeft < labelBounds.right && shiftedRight > labelBounds.left;
        if (!overlaps) continue;
        if (best && targetScrollLeft >= best.targetScrollLeft) continue;

        best = {
          rowSelector: `[data-group="both"] [data-matrix-row][data-entity-type="${row.getAttribute('data-entity-type')}"]`
            + `[data-entity-id="${row.getAttribute('data-entity-id')}"]`,
          targetScrollLeft,
        };
      }
    }
    return best;
  }, { labelSelector, markSelector });
}

export function queryState(url) {
  return Object.fromEntries([...new URL(url).searchParams.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

export function expectedActivityBundleColumns(memberCount) {
  const maxColumns = Math.min(memberCount, 3);
  const minimumRows = Math.ceil(memberCount / maxColumns);
  return Array.from({ length: maxColumns }, (_, index) => index + 1)
    .find((columns) => Math.ceil(memberCount / columns) === minimumRows);
}
