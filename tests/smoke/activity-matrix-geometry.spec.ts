import { expect, test } from '@playwright/test';
import {
  ACTIVITY_MATRIX_BUNDLE_CELL_SIZE,
  ACTIVITY_MATRIX_BUNDLE_GAP,
  ACTIVITY_MATRIX_MAX_BUNDLE_COLUMNS,
  ACTIVITY_MATRIX_MIN_COLLISION_WIDTH,
  activityMatrixBundleColumns,
  activityMatrixBundleRows,
  activityMatrixBundleWidthPx,
  buildActivityMatrixBundles,
  deriveActivityMatrixTimeBands,
  projectTimestampToActivityMatrix,
} from '../../src/lib/activityMatrix';

type BundleEvent = Parameters<typeof buildActivityMatrixBundles>[0][number];

function event(id: string, start: string, precision: 'day' | 'month' | 'year' = 'day'): BundleEvent {
  return {
    id,
    collection: 'events',
    data: {
      id,
      kind: 'technical',
      when: { start, precision },
      companies: [],
      people: [],
    },
  } as unknown as BundleEvent;
}

const currentDensity = new Map([
  ['year-2026', 6],
  ['year-2025', 4],
  ['year-2024', 2],
  ['year-2023', 2],
  ['year-2022', 1],
  ['years-2020-2021', 2],
  ['years-2015-2019', 4],
  ['through-2014', 5],
]);

test('content-aware Activity Matrix bands derive deterministic widths from the latest corpus year', () => {
  const bands = deriveActivityMatrixTimeBands(2026, currentDensity);

  expect(bands.map(({ key }) => key)).toEqual([
    'year-2026',
    'year-2025',
    'year-2024',
    'year-2023',
    'year-2022',
    'years-2020-2021',
    'years-2015-2019',
    'through-2014',
  ]);
  expect(bands.map(({ label }) => label)).toEqual([
    '2026', '2025', '2024', '2023', '2022', '2020–2021', '2015–2019', '≤2014',
  ]);
  expect(bands.map(({ widthPx }) => widthPx)).toEqual([134, 114, 100, 52, 52, 76, 76, 68]);
  expect(bands.map(({ maxEventsPerRow }) => maxEventsPerRow)).toEqual([6, 4, 2, 2, 1, 2, 4, 5]);
  expect(bands.map(({ resolution }) => resolution)).toEqual([
    'continuous', 'continuous', 'continuous',
    'bucket', 'bucket', 'bucket', 'bucket', 'bucket',
  ]);
  expect(bands.at(-1)?.endPx).toBe(672);

  const futureBands = deriveActivityMatrixTimeBands(2027);
  expect(futureBands.map(({ key }) => key)).toEqual([
    'year-2027',
    'year-2026',
    'year-2025',
    'year-2024',
    'year-2023',
    'years-2021-2022',
    'years-2016-2020',
    'through-2015',
  ]);
  expect(futureBands.slice(5).map(({ label, ariaLabel }) => ({ label, ariaLabel }))).toEqual([
    { label: '2021–2022', ariaLabel: '2021–2022' },
    { label: '2016–2020', ariaLabel: '2016–2020' },
    { label: '≤2015', ariaLabel: '2015 and earlier' },
  ]);
});

test('band sizing clamps recent density and protects earlier labels and bundles', () => {
  const sparse = deriveActivityMatrixTimeBands(2026);
  expect(sparse.slice(0, 3).map(({ widthPx }) => widthPx)).toEqual([100, 100, 100]);
  expect(sparse.slice(3).map(({ widthPx }) => widthPx)).toEqual([52, 52, 76, 76, 68]);

  const dense = deriveActivityMatrixTimeBands(2026, {
    'year-2026': 20,
    'year-2025': 8,
    'year-2024': 1,
    'year-2023': 3,
  });
  expect(dense.slice(0, 3).map(({ widthPx }) => widthPx)).toEqual([160, 154, 100]);
  expect(dense[3].widthPx).toBe(68);
});

test('recent time remains chronological across variable-width years while earlier periods share centers', () => {
  const bands = deriveActivityMatrixTimeBands(2026, currentDensity);
  const earlyJanuary = projectTimestampToActivityMatrix(Date.UTC(2026, 0, 1, 12), bands);
  const lateDecember = projectTimestampToActivityMatrix(Date.UTC(2025, 11, 31, 12), bands);

  expect(earlyJanuary.band.key).toBe('year-2026');
  expect(lateDecember.band.key).toBe('year-2025');
  expect(earlyJanuary.xPx).toBeLessThan(lateDecember.xPx);
  expect(lateDecember.xPx - earlyJanuary.xPx).toBeLessThan(1);

  const year2019 = projectTimestampToActivityMatrix(Date.UTC(2019, 6, 1), bands);
  const year2016 = projectTimestampToActivityMatrix(Date.UTC(2016, 1, 1), bands);
  const year2023 = projectTimestampToActivityMatrix(Date.UTC(2023, 6, 1), bands);
  const year2022 = projectTimestampToActivityMatrix(Date.UTC(2022, 6, 1), bands);

  expect(year2019.band.key).toBe('years-2015-2019');
  expect(year2016.band.key).toBe('years-2015-2019');
  expect(year2019.x).toBe(year2016.x);
  expect(year2023.band.key).toBe('year-2023');
  expect(year2022.band.key).toBe('year-2022');
  expect(year2023.x).not.toBe(year2022.x);
});

test('bundle modes cross recent year boundaries but never cross period boundaries', () => {
  const bands = deriveActivityMatrixTimeBands(2026, currentDensity);
  const recentBoundaryBundle = buildActivityMatrixBundles([
    event('late-december', '2025-12-31'),
    event('early-january', '2026-01-01'),
  ], bands);

  expect(recentBoundaryBundle).toHaveLength(1);
  expect(recentBoundaryBundle[0].mode).toBe('proximity');
  expect(recentBoundaryBundle[0].timeBandKeys).toEqual(['year-2026', 'year-2025']);
  expect(recentBoundaryBundle[0].eventIds).toEqual(['early-january', 'late-december']);

  const resolutionBoundaryBundles = buildActivityMatrixBundles([
    event('recent-january', '2024-01-01'),
    event('earlier-2023', '2023', 'year'),
  ], bands);
  expect(resolutionBoundaryBundles.map(({ mode }) => mode)).toEqual(['proximity', 'period']);

  const periodBundles = buildActivityMatrixBundles([
    event('historical-2016', '2016', 'year'),
    event('historical-2019', '2019', 'year'),
    event('historical-2017', '2017', 'year'),
    event('historical-2014', '2014', 'year'),
  ], bands);
  expect(periodBundles.map(({ timeBandKeys }) => timeBandKeys)).toEqual([
    ['years-2015-2019'],
    ['through-2014'],
  ]);
  expect(periodBundles[0].eventIds).toEqual([
    'historical-2019', 'historical-2017', 'historical-2016',
  ]);
});

test('bundles use up to three columns and actual width for collision placement', () => {
  expect(ACTIVITY_MATRIX_MAX_BUNDLE_COLUMNS).toBe(3);
  expect([1, 2, 3, 4, 5, 6].map(activityMatrixBundleColumns)).toEqual([1, 2, 3, 3, 3, 3]);
  expect([1, 2, 3, 4, 5, 6].map(activityMatrixBundleRows)).toEqual([1, 1, 1, 2, 2, 2]);
  expect(activityMatrixBundleWidthPx(3)).toBe(
    (3 * ACTIVITY_MATRIX_BUNDLE_CELL_SIZE) + (2 * ACTIVITY_MATRIX_BUNDLE_GAP),
  );

  const bands = deriveActivityMatrixTimeBands(2026, { 'year-2026': 20 });
  const bundles = buildActivityMatrixBundles([
    event('new-a', '2026-12-31'),
    event('new-b', '2026-12-20'),
    event('new-c', '2026-12-10'),
    event('old-a', '2026-09-20'),
    event('old-b', '2026-09-10'),
    event('old-c', '2026-09-01'),
  ], bands);

  expect(bundles).toHaveLength(2);
  expect(bundles.map(({ columnCount, rowCount, bundleWidthPx, collisionWidthPx }) => ({
    columnCount, rowCount, bundleWidthPx, collisionWidthPx,
  }))).toEqual(Array(2).fill({
    columnCount: 3,
    rowCount: 1,
    bundleWidthPx: 52,
    collisionWidthPx: 52,
  }));
  expect(Math.abs(bundles[1].xPx - bundles[0].xPx)).toBeGreaterThan(ACTIVITY_MATRIX_MIN_COLLISION_WIDTH);
  expect(Math.abs(bundles[1].xPx - bundles[0].xPx)).toBeLessThan(52);
  expect(bundles[0].slot).not.toBe(bundles[1].slot);
});
