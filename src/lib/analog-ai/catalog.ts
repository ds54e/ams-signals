import { publicActivityDate, type PublicActivity } from './activity.ts';

export { roleIds, roleLabels, projectType, type CatalogRole } from '../catalog-roles.ts';

export const workflowIds = ['reasoning', 'generate-edit', 'simulate-measure', 'optimize', 'eda-integration', 'physical'] as const;
export const workflowLabels: Record<typeof workflowIds[number], string> = {
  reasoning: 'Reasoning', 'generate-edit': 'Generate / Edit', 'simulate-measure': 'Simulate / Measure',
  optimize: 'Optimize', 'eda-integration': 'EDA Integration', physical: 'Physical',
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

/** Retain old detail targets while the dashboard shows a shorter description. */
export function projectDetailAnchors(html: string, slug: string): string[] {
  return [...html.matchAll(/<[^>]+>/g)].flatMap(([tag]) => {
    const id = tag.match(/\sid="([^"]+)"/)?.[1];
    return id ? [`${slug}--${id}`] : [];
  });
}
