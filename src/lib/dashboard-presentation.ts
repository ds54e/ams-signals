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
