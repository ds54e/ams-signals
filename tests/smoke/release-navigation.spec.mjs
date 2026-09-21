// Browser contracts for moving between surfaces and for selection state: Timeline and Events
// URL/filter state, inspector updates, cross-surface set consistency, legacy URL
// canonicalization, and context Company and Person Timelines.
//
// Surface rendering lives in release-surfaces.spec.mjs, discovery controls in
// release-discovery.spec.mjs, and Activity Matrix geometry in release-matrix.spec.mjs.

import { expect, test } from '@playwright/test';
import {
  basePath,
  expectExplorerReady,
  expectStickyLabelToOccludeActiveMark,
  installBrowserErrorGuards,
  queryState,
  viewerCorpus,
  visibleListedEventIds,
  visibleTimelineEventIds,
} from './release-helpers.mjs';

installBrowserErrorGuards(test);

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

test('legacy Entity-view URLs canonicalize to the combined global surfaces', async ({ page }) => {
  for (const path of ['./', './events/']) {
    const surface = path.includes('events') ? 'events' : 'timeline';

    await page.goto(path);
    await expectExplorerReady(page, surface);
    await expect(page.locator('[data-view]')).toHaveCount(0);
    expect(new URL(page.url()).searchParams.has('view')).toBe(false);
    const { total } = await viewerCorpus(page);

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
        await expect(page.locator('[data-status]')).toHaveText(new RegExp(`of ${total} events`));
      }
    }

    await page.locator('[data-search]').fill('');
    expect(new URL(page.url()).search).toBe('');
  }
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

test('Company and Person Timeline labels occlude active Event marks', async ({ page }) => {
  await page.setViewportSize({ width: 780, height: 900 });
  await page.goto('./companies/apple/');
  await expectExplorerReady(page);
  await expectStickyLabelToOccludeActiveMark(page, {
    rowSelector: '[data-group="companies"] [data-lane][data-entity-id="apple"]',
    labelSelector: '.lane-label',
    markSelector: '.event-mark',
  });

  const axisTopmost = await page.locator('.axis-label').evaluate((axisLabel) => {
    const bounds = axisLabel.getBoundingClientRect();
    const topmost = document.elementFromPoint(
      (bounds.left + bounds.right) / 2,
      (bounds.top + bounds.bottom) / 2,
    );
    return topmost === axisLabel || axisLabel.contains(topmost);
  });
  expect(axisTopmost, 'Timeline axis label remains topmost').toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./people/aadhar-sharma/');
  await expectExplorerReady(page);
  await expectStickyLabelToOccludeActiveMark(page, {
    rowSelector: '[data-group="people"] [data-lane][data-entity-id="aadhar-sharma"]',
    labelSelector: '.lane-label',
    markSelector: '.event-mark',
  });
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
