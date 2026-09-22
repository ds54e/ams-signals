import { publicActivityDate, type PublicActivity } from './activity.ts';
import { sortByActivityThenName } from '../catalog-sort.ts';

export const scopeStageIds = ['design', 'synthesis', 'verification', 'layout'] as const;
export const scopeStageLabels: Record<typeof scopeStageIds[number], string> = {
  design: 'Design', synthesis: 'Synthesis', verification: 'Verification', layout: 'Layout',
};

export function sortProjects<T extends { id: string; data: { name: string } }>(
  projects: readonly T[], activity: Readonly<Record<string, PublicActivity>>,
): T[] {
  return sortByActivityThenName(projects, (project) => publicActivityDate(activity[project.id]));
}
