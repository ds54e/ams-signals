import { hasRepositoryHistory } from '../catalog-repository-activity.ts';
export { hasRepositoryHistory } from '../catalog-repository-activity.ts';
export { monthLabel } from '../catalog-activity-band.ts';
// Pure activity-window mechanics are domain-independent and shared verbatim; see that
// module for the freshness/window contract. PublicActivity below (the discriminated union,
// and lastPublicUpdateAt's optionality) is Analog-specific and intentionally not shared.
export { freshnessCutoff, activityMonths, countActivity } from '../catalog-activity-window.ts';

export type PublicActivity =
  | { kind: 'github' | 'repository'; lastCommitAt: string }
  | { kind: 'no-public-repo'; lastPublicUpdateAt?: string };

export function publicActivityDate(activity: PublicActivity): string {
  return hasRepositoryHistory(activity) ? activity.lastCommitAt : activity.lastPublicUpdateAt ?? '';
}
