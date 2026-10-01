import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ACTIVITY_MATRIX_BUNDLE_GAP,
  ACTIVITY_MATRIX_MAX_BUNDLE_COLUMNS,
  ACTIVITY_MATRIX_VISUAL_ROW_PITCH,
  activityMatrixBundleColumns,
  activityMatrixBundleRows,
  activityMatrixBundleWidthPx,
  buildActivityMatrixBundles,
  deriveActivityMatrixTimeBands,
  packActivityMatrixBundleRows,
  projectTimestampToActivityMatrix,
} from '../../src/lib/activityMatrix.ts';

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
  ['year-2026', 7],
  ['year-2025', 4],
  ['year-2024', 3],
  ['year-2023', 2],
  ['years-2020-2022', 3],
  ['years-2015-2019', 4],
  ['through-2014', 5],
]);

test('content-aware Activity Matrix bands derive deterministic widths from the latest corpus year', () => {
  const bands = deriveActivityMatrixTimeBands(2026, currentDensity);

  assert.deepEqual(bands.map(({ key }) => key), [
    'year-2026',
    'year-2025',
    'year-2024',
    'year-2023',
    'years-2020-2022',
    'years-2015-2019',
    'through-2014',
  ]);
  assert.deepEqual(bands.map(({ label }) => label), [
    '2026', '2025', '2024', '2023', '2020–2022', '2015–2019', '≤2014',
  ]);
  assert.deepEqual(bands.map(({ widthPx }) => widthPx), [144, 114, 104, 54, 76, 76, 74]);
  assert.deepEqual(bands.map(({ maxEventsPerRow }) => maxEventsPerRow), [7, 4, 3, 2, 3, 4, 5]);
  assert.deepEqual(bands.map(({ resolution }) => resolution), [
    'continuous', 'continuous', 'continuous',
    'bucket', 'bucket', 'bucket', 'bucket',
  ]);
  assert.equal(bands.at(-1)?.endPx, 642);

  const futureBands = deriveActivityMatrixTimeBands(2027);
  assert.deepEqual(futureBands.map(({ key }) => key), [
    'year-2027',
    'year-2026',
    'year-2025',
    'year-2024',
    'years-2021-2023',
    'years-2016-2020',
    'through-2015',
  ]);
  assert.deepEqual(futureBands.slice(4).map(({ label, ariaLabel }) => ({ label, ariaLabel })), [
    { label: '2021–2023', ariaLabel: '2021–2023' },
    { label: '2016–2020', ariaLabel: '2016–2020' },
    { label: '≤2015', ariaLabel: '2015 and earlier' },
  ]);
});

test('band sizing clamps recent density and protects earlier labels and bundles', () => {
  const sparse = deriveActivityMatrixTimeBands(2026);
  assert.deepEqual(sparse.slice(0, 3).map(({ widthPx }) => widthPx), [100, 100, 100]);
  assert.deepEqual(sparse.slice(3).map(({ widthPx }) => widthPx), [52, 76, 76, 68]);

  const dense = deriveActivityMatrixTimeBands(2026, {
    'year-2026': 20,
    'year-2025': 8,
    'year-2024': 1,
    'year-2023': 3,
  });
  assert.deepEqual(dense.slice(0, 3).map(({ widthPx }) => widthPx), [160, 154, 100]);
  assert.equal(dense[3].widthPx, 74);
});

test('recent time remains chronological across variable-width years while earlier periods share centers', () => {
  const bands = deriveActivityMatrixTimeBands(2026, currentDensity);
  const earlyJanuary = projectTimestampToActivityMatrix(Date.UTC(2026, 0, 1, 12), bands);
  const lateDecember = projectTimestampToActivityMatrix(Date.UTC(2025, 11, 31, 12), bands);

  assert.equal(earlyJanuary.band.key, 'year-2026');
  assert.equal(lateDecember.band.key, 'year-2025');
  assert.ok(earlyJanuary.xPx < lateDecember.xPx);
  assert.ok(lateDecember.xPx - earlyJanuary.xPx < 1);

  const year2019 = projectTimestampToActivityMatrix(Date.UTC(2019, 6, 1), bands);
  const year2016 = projectTimestampToActivityMatrix(Date.UTC(2016, 1, 1), bands);
  const year2024 = projectTimestampToActivityMatrix(Date.UTC(2024, 6, 1), bands);
  const year2023 = projectTimestampToActivityMatrix(Date.UTC(2023, 6, 1), bands);
  const year2020 = projectTimestampToActivityMatrix(Date.UTC(2020, 6, 1), bands);
  const year2021 = projectTimestampToActivityMatrix(Date.UTC(2021, 6, 1), bands);
  const year2022 = projectTimestampToActivityMatrix(Date.UTC(2022, 6, 1), bands);

  assert.equal(year2019.band.key, 'years-2015-2019');
  assert.equal(year2016.band.key, 'years-2015-2019');
  assert.equal(year2019.x, year2016.x);
  assert.equal(year2024.band.key, 'year-2024');
  assert.equal(year2024.band.resolution, 'continuous');
  assert.equal(year2023.band.key, 'year-2023');
  assert.equal(year2023.band.resolution, 'bucket');
  assert.deepEqual([year2020, year2021, year2022].map(({ band }) => band.key), [
    'years-2020-2022', 'years-2020-2022', 'years-2020-2022',
  ]);
  assert.equal(year2020.x, year2021.x);
  assert.equal(year2021.x, year2022.x);
  assert.notEqual(year2023.x, year2022.x);
});

test('bundle modes cross recent year boundaries but never cross period boundaries', () => {
  const bands = deriveActivityMatrixTimeBands(2026, currentDensity);
  const recentBoundaryBundle = buildActivityMatrixBundles([
    event('late-december', '2025-12-31'),
    event('early-january', '2026-01-01'),
  ], bands);

  assert.equal(recentBoundaryBundle.length, 1);
  assert.equal(recentBoundaryBundle[0].mode, 'proximity');
  assert.deepEqual(recentBoundaryBundle[0].timeBandKeys, ['year-2026', 'year-2025']);
  assert.deepEqual(recentBoundaryBundle[0].eventIds, ['early-january', 'late-december']);

  const resolutionBoundaryBundles = buildActivityMatrixBundles([
    event('recent-january', '2024-01-01'),
    event('earlier-2023', '2023', 'year'),
  ], bands);
  assert.deepEqual(resolutionBoundaryBundles.map(({ mode }) => mode), ['proximity', 'period']);

  const periodBundles = buildActivityMatrixBundles([
    event('earlier-2023', '2023', 'year'),
    event('historical-2020', '2020', 'year'),
    event('historical-2022', '2022', 'year'),
    event('historical-2021', '2021', 'year'),
    event('historical-2016', '2016', 'year'),
    event('historical-2019', '2019', 'year'),
    event('historical-2014', '2014', 'year'),
  ], bands);
  assert.deepEqual(periodBundles.map(({ timeBandKeys }) => timeBandKeys), [
    ['year-2023'],
    ['years-2020-2022'],
    ['years-2015-2019'],
    ['through-2014'],
  ]);
  assert.deepEqual(periodBundles[1].eventIds, [
    'historical-2022', 'historical-2021', 'historical-2020',
  ]);
});

test('bundles use the narrowest columns that preserve minimum rows and actual collision width', () => {
  assert.equal(ACTIVITY_MATRIX_MAX_BUNDLE_COLUMNS, 3);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(activityMatrixBundleColumns), [1, 2, 3, 2, 3, 3]);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(activityMatrixBundleRows), [1, 1, 1, 2, 2, 2]);
  assert.deepEqual([1, 2, 3, 4, 5, 6].map(activityMatrixBundleWidthPx), [18, 38, 58, 38, 58, 58]);

  for (const [memberCount, collisionWidthPx] of [[1, 18], [2, 38], [3, 58], [4, 38], [5, 58], [6, 58]]) {
    const [bundle] = buildActivityMatrixBundles(
      Array.from({ length: memberCount }, (_, index) => event(`period-${memberCount}-${index}`, '2023', 'year')),
      deriveActivityMatrixTimeBands(2026, currentDensity),
    );
    assert.equal(bundle.bundleWidthPx, collisionWidthPx);
    assert.equal(bundle.collisionWidthPx, collisionWidthPx);
  }

  const bands = deriveActivityMatrixTimeBands(2026, { 'year-2026': 20 });
  const separatedSingles = buildActivityMatrixBundles([
    event('single-new', '2026-12-31'),
    event('single-old', '2026-10-13'),
  ], bands);
  assert.equal(separatedSingles.length, 2);
  assert.ok(Math.abs(separatedSingles[1].xPx - separatedSingles[0].xPx) > 32);
  assert.ok(Math.abs(separatedSingles[1].xPx - separatedSingles[0].xPx) < 36);
  assert.deepEqual(separatedSingles.map(({ collisionWidthPx, rowStart }) => ({ collisionWidthPx, rowStart })), [
    { collisionWidthPx: 18, rowStart: 0 },
    { collisionWidthPx: 18, rowStart: 0 },
  ]);

  const bundles = buildActivityMatrixBundles([
    event('new-a', '2026-12-31'),
    event('new-b', '2026-12-20'),
    event('new-c', '2026-12-10'),
    event('old-a', '2026-09-20'),
    event('old-b', '2026-09-10'),
    event('old-c', '2026-09-01'),
  ], bands);

  assert.equal(bundles.length, 2);
  assert.deepEqual(bundles.map(({ columnCount, rowCount, bundleWidthPx, collisionWidthPx }) => ({
    columnCount, rowCount, bundleWidthPx, collisionWidthPx,
  })), Array(2).fill({
    columnCount: 3,
    rowCount: 1,
    bundleWidthPx: 58,
    collisionWidthPx: 58,
  }));
  assert.ok(Math.abs(bundles[1].xPx - bundles[0].xPx) > 32);
  assert.ok(Math.abs(bundles[1].xPx - bundles[0].xPx) < 52);
  assert.notEqual(bundles[0].rowStart, bundles[1].rowStart);
});

test('row-aware packing reuses free visual rows without weakening rectangle separation', () => {
  assert.equal(ACTIVITY_MATRIX_VISUAL_ROW_PITCH, 20);

  const packableBundles = [
    { xPx: 0, collisionWidthPx: 34, rowCount: 2 },
    { xPx: 100, collisionWidthPx: 34, rowCount: 1 },
    { xPx: 125, collisionWidthPx: 16, rowCount: 1 },
    { xPx: 125, collisionWidthPx: 16, rowCount: 1 },
  ];
  const expectedPlacements = [
    { rowStart: 0, rowEnd: 2 },
    { rowStart: 0, rowEnd: 1 },
    { rowStart: 1, rowEnd: 2 },
    { rowStart: 2, rowEnd: 3 },
  ];

  for (let repetition = 0; repetition < 5; repetition += 1) {
    assert.deepEqual(packActivityMatrixBundleRows(packableBundles), expectedPlacements);
  }

  const placed = packableBundles.map((bundle, index) => ({
    ...bundle,
    ...expectedPlacements[index],
  }));
  for (let left = 0; left < placed.length; left += 1) {
    for (let right = left + 1; right < placed.length; right += 1) {
      const verticalOverlap = placed[left].rowStart < placed[right].rowEnd
        && placed[right].rowStart < placed[left].rowEnd;
      if (!verticalOverlap) continue;

      const horizontalSeparation = Math.abs(placed[left].xPx - placed[right].xPx)
        - ((placed[left].collisionWidthPx + placed[right].collisionWidthPx) / 2);
      assert.ok(horizontalSeparation >= ACTIVITY_MATRIX_BUNDLE_GAP);
    }
  }
});
