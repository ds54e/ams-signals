import { publicActivityDate, type PublicActivity } from './activity.ts';

export { roleIds, roleLabels, projectTags, type CatalogRole } from '../catalog-roles.ts';

export const flowIds = ['design', 'simulation', 'layout'] as const;
export const flowLabels: Record<typeof flowIds[number], string> = {
  design: 'Design', simulation: 'Simulation', layout: 'Layout',
};
export const scopeLabels = { core: 'Core scope', supporting: 'Supporting scope' };

export function sortProjects<T extends { id: string; data: { name: string } }>(
  projects: readonly T[], activity: Readonly<Record<string, PublicActivity>>,
): T[] {
  const key = (name: string) => name.normalize('NFKC').toLowerCase().trim();
  const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  return [...projects].sort((a, b) =>
    compare(publicActivityDate(activity[b.id]), publicActivityDate(activity[a.id]))
    || compare(key(a.data.name), key(b.data.name)) || compare(a.id, b.id));
}
