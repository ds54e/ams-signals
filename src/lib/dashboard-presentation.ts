type ActivityCounts = { events: number; analog: number; digital: number };

/** Normalize each displayed series independently; zero series stay at zero. */
export function dashboardBarHeights(months: readonly ActivityCounts[]) {
  const maxima = {
    events: Math.max(0, ...months.map((m) => m.events)),
    analog: Math.max(0, ...months.map((m) => m.analog)),
    digital: Math.max(0, ...months.map((m) => m.digital)),
  };
  const height = (count: number, maximum: number) => maximum === 0 ? 0 : count / maximum * 218;
  return months.map((m) => ({
    events: height(m.events, maxima.events),
    analog: height(m.analog, maxima.analog),
    digital: height(m.digital, maxima.digital),
  }));
}
