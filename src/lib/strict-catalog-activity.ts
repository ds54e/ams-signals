import { hasRepositoryHistory } from './catalog-repository-activity.ts';
export { hasRepositoryHistory } from './catalog-repository-activity.ts';
export { monthLabel } from './catalog-activity-band.ts';
export { freshnessCutoff, activityMonths, countActivity } from './catalog-activity-window.ts';

export type PublicActivity =
  | { kind: 'github' | 'repository'; lastCommitAt: string }
  | { kind: 'public-update'; lastPublicUpdateAt: string }
  | { kind: 'unfetched' };

export function publicActivityDate(activity: PublicActivity): string {
  return activity.kind === 'unfetched' ? '' : hasRepositoryHistory(activity) ? activity.lastCommitAt : activity.lastPublicUpdateAt;
}
