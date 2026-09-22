// Pure, domain-independent ordering mechanics shared by the Analog and Digital catalogs.
// The activity date's meaning (PublicActivity, publicActivityDate()) is domain-specific and
// stays in each domain's catalog.ts; only the generic "newest activity, then name, then id"
// comparator is shared, via a caller-supplied activity-date lookup rather than a shared type.

function compareStrings(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function normalizedName(name: string): string {
  return name.normalize('NFKC').toLowerCase().trim();
}

/** Newest activity date first, then normalized display name, then id — a stable total order. */
export function sortByActivityThenName<T extends { id: string; data: { name: string } }>(
  items: readonly T[],
  activityDateOf: (item: T) => string,
): T[] {
  return [...items].sort((a, b) =>
    compareStrings(activityDateOf(b), activityDateOf(a))
    || compareStrings(normalizedName(a.data.name), normalizedName(b.data.name))
    || compareStrings(a.id, b.id));
}
