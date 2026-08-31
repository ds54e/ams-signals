import { expect, test } from '@playwright/test';
import {
  ACTIVITY_MATRIX_MIN_TRACK_WIDTH,
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

test('progressive Activity Matrix bands derive from the latest corpus year', () => {
  const bands = deriveActivityMatrixTimeBands(2026);

  expect(ACTIVITY_MATRIX_MIN_TRACK_WIDTH).toBe(640);
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
  expect(bands.map(({ widthPx }) => widthPx)).toEqual([140, 140, 140, 44, 44, 44, 44, 44]);
  expect(bands.map(({ resolution }) => resolution)).toEqual([
    'continuous', 'continuous', 'continuous',
    'bucket', 'bucket', 'bucket', 'bucket', 'bucket',
  ]);
  expect(bands.at(-1)?.endPx).toBe(640);

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
  expect(futureBands.slice(5).map(({ ariaLabel }) => ariaLabel)).toEqual([
    '2021–2022', '2016–2020', '2015 and earlier',
  ]);
});

test('recent time is continuous across years while earlier periods share bucket centers', () => {
  const bands = deriveActivityMatrixTimeBands(2026);
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
  const bands = deriveActivityMatrixTimeBands(2026);
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
