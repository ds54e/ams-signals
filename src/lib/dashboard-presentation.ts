type ActivityCounts = { events: number; analog: number; digital: number };

/** Normalize each displayed series independently; zero series stay at zero. */
export function dashboardSeriesPercentages(months: readonly ActivityCounts[]) {
  const maxima = {
    events: Math.max(0, ...months.map((m) => m.events)),
    analog: Math.max(0, ...months.map((m) => m.analog)),
    digital: Math.max(0, ...months.map((m) => m.digital)),
  };
  const percent = (count: number, maximum: number) => maximum === 0 ? 0 : count / maximum * 100;
  return months.map((m) => ({
    events: percent(m.events, maxima.events),
    analog: percent(m.analog, maxima.analog),
    digital: percent(m.digital, maxima.digital),
  }));
}

/** Pure SVG geometry; aggregation and authored month/count records stay separate. */
export function dashboardTrend(months: readonly ActivityCounts[]) {
  const left = 50, right = 534, top = 24, baseline = 242;
  const monthPositions = months.map((_, index) => left + index * (right - left) / Math.max(1, months.length - 1));
  const y = (percent: number) => baseline - percent / 100 * (baseline - top);
  const percentages = dashboardSeriesPercentages(months);
  const series = (['events', 'analog', 'digital'] as const).map((key) => {
    const points = percentages.map((month, index) => `${monthPositions[index]},${y(month[key])}`);
    const line = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point}`).join(' ');
    const area = points.length ? `${line} L${monthPositions[points.length - 1]},${baseline} L${left},${baseline} Z` : '';
    return { key, line, area };
  });
  const ticks = [0, 25, 50, 75, 100].map((percent) => ({ percent, y: y(percent) }));
  return { left, right, top, baseline, monthPositions, series, ticks };
}
