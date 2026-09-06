/** Calendar labels use UTC; shared index styles supply uppercase month names. */
export function formatDate(value: string, precision: 'year' | 'month' | 'day' = 'day'): string {
  const [year, month = 1, day = 1] = value.split('-').map(Number);
  if (precision === 'year') return String(year);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: precision === 'day' ? 'numeric' : undefined, timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, precision === 'day' ? day : 1)));
}
