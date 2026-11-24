import { hasRepositoryHistory } from './catalog-repository-activity.ts';
export { hasRepositoryHistory } from './catalog-repository-activity.ts';
export { monthLabel } from './catalog-activity-band.ts';
export { freshnessCutoff, activityMonths, countActivity } from './catalog-activity-window.ts';

// Shared date-bearing states; domain schemas own the complete records and evidence rules.
// A public-update is a reviewed point signal, not a claim that public source code is absent.
export type PublicActivity =
  | { kind: 'github' | 'repository'; lastCommitAt: string }
  | { kind: 'public-update'; lastPublicUpdateAt: string }
  | { kind: 'unfetched' };

export function publicActivityDate(activity: PublicActivity): string {
  return activity.kind === 'unfetched' ? '' : hasRepositoryHistory(activity) ? activity.lastCommitAt : activity.lastPublicUpdateAt;
}
