import { catalogDomains } from './catalog-domains.ts';

export const activitySeries = ['events', ...catalogDomains] as const;
type Series = typeof activitySeries[number];
type ActivityCounts = Record<Series, number>;

/** Normalize each displayed series independently; zero series stay at zero. */
export function dashboardSeriesPercentages(months: readonly ActivityCounts[]) {
  const maxima = activitySeries.map((key) => Math.max(0, ...months.map((month) => month[key])));
  return months.map((month) => Object.fromEntries(activitySeries.map((key, index) => [
    key, maxima[index] === 0 ? 0 : month[key] / maxima[index] * 100,
  ])) as ActivityCounts);
}

/** Pure SVG geometry; aggregation and authored month/count records stay separate. */
export function dashboardTrend(months: readonly ActivityCounts[]) {
  const left = 50, right = 534, top = 24, baseline = 242;
  const monthPositions = months.map((_, index) => left + index * (right - left) / Math.max(1, months.length - 1));
  const y = (percent: number) => baseline - percent / 100 * (baseline - top);
  const percentages = dashboardSeriesPercentages(months);
  const series = activitySeries.map((key) => {
    const points = percentages.map((month, index) => `${monthPositions[index]},${y(month[key])}`);
    const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point}`).join(' ');
    const area = points.length ? `${line} L${monthPositions[points.length - 1]},${baseline} L${left},${baseline} Z` : '';
    return { key, line, area };
  });
  const ticks = [0, 25, 50, 75, 100].map((percent) => ({ percent, y: y(percent) }));
  return { left, right, top, baseline, monthPositions, series, ticks };
}
