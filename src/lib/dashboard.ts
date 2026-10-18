import { activityMonths } from './catalog-activity-window.ts';

type DatedEvent = { data: { when: { start: string; precision: string } } };
type ActivitySnapshot = {
  months: readonly string[];
  projects: Readonly<Record<string,
    | { kind: 'github' | 'repository'; commits: readonly number[] }
    | { kind: 'public-update'; lastPublicUpdateAt?: string }
  >>;
};

/** Count reviewed active projects, never commits, against their captured month keys.
 * Missing snapshot months contribute no reviewed signals; history is not extrapolated.
 */
function activeProjects(snapshot: ActivitySnapshot, month: string): number {
  const index = snapshot.months.indexOf(month);
  return Object.values(snapshot.projects).filter((record) => record.kind === 'public-update'
    ? record.lastPublicUpdateAt?.slice(0, 7) === month
    : index !== -1 && record.commits[index] > 0).length;
}

/** A build-time view only. Event ranges count once at their supported start month;
 * year-only records cannot be assigned to a month. No factual records are changed.
 */
export function dashboardActivity(
  events: readonly DatedEvent[], analog: ActivitySnapshot, digital: ActivitySnapshot, buildDate: string,
) {
  return activityMonths(buildDate).map((month) => ({
    month,
    events: events.filter(({ data: { when } }) => when.precision !== 'year' && when.start.slice(0, 7) === month).length,
    analog: activeProjects(analog, month),
    digital: activeProjects(digital, month),
  }));
}
