// Public project kinds shared by the two domain catalogs, never by Golden records.
export const roleIds = ['benchmark', 'agent', 'eda-tool', 'dataset-environment'] as const;
export type CatalogRole = typeof roleIds[number];
export const roleLabels: Record<CatalogRole, string> = {
  benchmark: 'Benchmark', agent: 'Agent', 'eda-tool': 'EDA Tool',
  'dataset-environment': 'Dataset & Environment',
};

export function projectType(roles: readonly CatalogRole[], aiBuilt = false): string {
  return roles.map((role) => roleLabels[role]).join(' + ') + (aiBuilt ? ' · AI-built' : '');
}
