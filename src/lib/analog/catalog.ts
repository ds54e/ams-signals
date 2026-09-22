import { publicActivityDate, type PublicActivity } from './activity.ts';
import { sortByActivityThenName } from '../catalog-sort.ts';

export const scopeStageIds = ['design', 'simulation', 'layout'] as const;
export const scopeStageLabels: Record<typeof scopeStageIds[number], string> = {
  design: 'Design', simulation: 'Simulation', layout: 'Layout',
};

export function sortProjects<T extends { id: string; data: { name: string } }>(
  projects: readonly T[], activity: Readonly<Record<string, PublicActivity>>,
): T[] {
  return sortByActivityThenName(projects, (project) => publicActivityDate(activity[project.id]));
}
