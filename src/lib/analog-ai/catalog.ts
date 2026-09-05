export const roleIds = ['benchmark', 'agent', 'eda-tool', 'dataset-environment'] as const;
export type CatalogRole = typeof roleIds[number];
export const roleLabels: Record<CatalogRole, string> = {
  benchmark: 'Benchmark', agent: 'Design Agent', 'eda-tool': 'EDA Tool',
  'dataset-environment': 'Dataset & Environment',
};

export const workflowIds = ['reasoning', 'generate-edit', 'simulate-measure', 'optimize', 'eda-integration', 'physical'] as const;
export const workflowLabels: Record<typeof workflowIds[number], string> = {
  reasoning: 'Reasoning', 'generate-edit': 'Generate / Edit', 'simulate-measure': 'Simulate / Measure',
  optimize: 'Optimize', 'eda-integration': 'EDA Integration', physical: 'Physical',
};
export const scopeLabels = { core: 'Core reviewed scope', supporting: 'Supporting / constrained reviewed scope' };

export function sortProjects<T extends { id: string; data: { name: string } }>(projects: readonly T[]): T[] {
  const key = (name: string) => name.normalize('NFKC').toLowerCase().trim();
  const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  return [...projects].sort((a, b) => compare(key(a.data.name), key(b.data.name)) || compare(a.id, b.id));
}

/** Namespace only Astro-rendered attributes; never process external source documents. */
export function namespaceProjectHtml(html: string, slug: string): string {
  return html.replace(/<[^>]+>/g, (tag) => tag.replace(/\s(id|href)="([^"]*)"/g, (match, attribute, value) => {
    if (attribute === 'id') return ` id="${slug}--${value}"`;
    if (value.startsWith('#')) return ` href="#${slug}--${value.slice(1)}"`;
    return match;
  }));
}
