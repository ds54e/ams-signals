import { hasRepositoryHistory } from '../catalog-repository-activity.ts';
export { hasRepositoryHistory } from '../catalog-repository-activity.ts';
export { monthLabel } from '../catalog-activity-band.ts';

export type PublicActivity =
  | { kind: 'github' | 'repository'; lastCommitAt: string }
  | { kind: 'no-public-repo'; lastPublicUpdateAt?: string };

export function publicActivityDate(activity: PublicActivity): string {
  return hasRepositoryHistory(activity) ? activity.lastCommitAt : activity.lastPublicUpdateAt ?? '';
}

/** Inclusive rolling curation boundary, independent of the calendar-month strip. */
export function freshnessCutoff(reviewedAt: string): string {
  const [year, month, day] = reviewedAt.split('-').map(Number);
  const lastDay = new Date(Date.UTC(year - 1, month, 0)).getUTCDate();
  return `${String(year - 1).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(Math.min(day, lastDay)).padStart(2, '0')}`;
}

/** Twelve UTC calendar months, including the partial snapshot month. */
export function activityMonths(reviewedAt: string): string[] {
  const end = new Date(`${reviewedAt.slice(0, 7)}-01T00:00:00Z`);
  return Array.from({ length: 12 }, (_, index) => {
    const date = new Date(end);
    date.setUTCMonth(date.getUTCMonth() - 11 + index);
    return date.toISOString().slice(0, 7);
  });
}

export function shortDate(date: string, snapshotDate: string): string {
  return new Intl.DateTimeFormat('en', {
    month: 'short', day: 'numeric', timeZone: 'UTC',
    ...(date.slice(0, 4) !== snapshotDate.slice(0, 4) ? { year: 'numeric' as const } : {}),
  }).format(new Date(`${date}T00:00:00Z`));
}

/** Input is the captured tip's full first-parent history, not branch/ref search results. */
export function countActivity(dates: readonly string[], capturedAt: string) {
  const reviewedAt = capturedAt.slice(0, 10);
  const months = activityMonths(reviewedAt);
  const commits = months.map(() => 0);
  let lastCommitAt: string | undefined;
  for (const value of dates) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.valueOf()) || parsed.valueOf() > new Date(capturedAt).valueOf()) {
      throw new Error(`Invalid or future commit timestamp: ${value}`);
    }
    const date = parsed.toISOString().slice(0, 10);
    if (!lastCommitAt || date > lastCommitAt) lastCommitAt = date;
    const index = months.indexOf(date.slice(0, 7));
    if (index !== -1) commits[index] += 1;
  }
  if (!lastCommitAt) throw new Error('Empty default-branch history');
  return { commits, lastCommitAt };
}
