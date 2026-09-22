import { hasRepositoryHistory } from '../catalog-repository-activity.ts';
export { hasRepositoryHistory } from '../catalog-repository-activity.ts';
export { monthLabel } from '../catalog-activity-band.ts';
// Pure activity-window mechanics are domain-independent and shared verbatim; see that
// module for the freshness/window contract. PublicActivity below (the discriminated union,
// and lastPublicUpdateAt's optionality) is Analog-specific and intentionally not shared.
export { freshnessCutoff, activityMonths, countActivity } from '../catalog-activity-window.ts';

// 'public-update' means this record's activity comes from a reviewed point-in-time public
// signal (a paper, release, or other dated public update) rather than reviewed monthly
// repository history. It never means the project has no public repository or code: ngspice,
// for example, has a real SourceForge source but is still activity-tracked as 'public-update'.
export type PublicActivity =
  | { kind: 'github' | 'repository'; lastCommitAt: string }
  | { kind: 'public-update'; lastPublicUpdateAt: string };

export function publicActivityDate(activity: PublicActivity): string {
  return hasRepositoryHistory(activity) ? activity.lastCommitAt : activity.lastPublicUpdateAt;
}
