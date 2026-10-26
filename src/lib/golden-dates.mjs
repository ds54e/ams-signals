// Golden dates retain their stated precision; validation never fills in factual dates.
export function isCalendarDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

export function isDateAtPrecision(value, precision) {
  if (typeof value !== 'string') return false;
  if (precision === 'year') return /^\d{4}$/.test(value);
  if (precision === 'month') return /^\d{4}-(0[1-9]|1[0-2])$/.test(value);
  return precision === 'day' && isCalendarDate(value);
}

export function isValidWhen(when) {
  return !!when && isDateAtPrecision(when.start, when.precision)
    && (when.end === undefined || (isDateAtPrecision(when.end, when.precision) && when.end >= when.start));
}
