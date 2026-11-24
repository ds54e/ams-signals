import { publicActivityDate, type PublicActivity } from '../catalog-activity.ts';
import { sortByActivityThenName } from '../catalog-sort.ts';

export const scopeStageIds = ['board', 'control', 'acquisition', 'analysis', 'test'] as const;
export const scopeStageLabels: Record<typeof scopeStageIds[number], string> = {
  board: 'Board & Fixture', control: 'Control', acquisition: 'Acquisition', analysis: 'Analysis', test: 'Test Automation',
};

export function sortProjects<T extends { id: string; data: { name: string } }>(
  projects: readonly T[], activity: Readonly<Record<string, PublicActivity>>,
): T[] {
  return sortByActivityThenName(projects, (project) => publicActivityDate(activity[project.id]));
}
