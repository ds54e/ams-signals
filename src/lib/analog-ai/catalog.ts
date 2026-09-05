export const roleIds = ['benchmark', 'agent', 'eda-tool', 'dataset-environment'] as const;
export type CatalogRole = typeof roleIds[number];

export const roleLabels: Record<CatalogRole, string> = {
  benchmark: 'Benchmark',
  agent: 'Design Agent',
  'eda-tool': 'EDA Tool',
  'dataset-environment': 'Dataset & Environment',
};

export type CatalogState = { q: string; type: CatalogRole | '' };
export type SearchableProject = { id: string; roles: readonly CatalogRole[]; text: string; anchors?: readonly string[] };

export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').toLowerCase().trim();
}

export function matchesProject(project: SearchableProject, state: CatalogState): boolean {
  const tokens = normalizeSearch(state.q).split(/\s+/u).filter(Boolean);
  return (!state.type || project.roles.includes(state.type))
    && tokens.every((token) => project.text.includes(token));
}

export function sortProjects<T extends { id: string; data: { name: string } }>(projects: readonly T[]): T[] {
  const compare = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;
  return [...projects].sort((a, b) =>
    compare(normalizeSearch(a.data.name), normalizeSearch(b.data.name)) || compare(a.id, b.id));
}

export function parseCatalogUrl(url: URL): CatalogState & { hash: string } {
  const type = url.searchParams.get('type') ?? '';
  let hash = url.hash.slice(1);
  try { hash = decodeURIComponent(hash); } catch { /* Unknown malformed anchors stay unknown. */ }
  return {
    q: url.searchParams.get('q') ?? '',
    type: roleIds.includes(type as CatalogRole) ? type as CatalogRole : '',
    hash,
  };
}

export function catalogUrl(current: URL, state: CatalogState, hash = ''): URL {
  const url = new URL(current);
  url.search = '';
  if (state.q.trim()) url.searchParams.set('q', state.q.trim());
  if (state.type) url.searchParams.set('type', state.type);
  url.hash = hash;
  return url;
}

export function resolveCatalogUrl(url: URL, projects: readonly SearchableProject[]) {
  const parsed = parseCatalogUrl(url);
  const target = projects.find((project) => project.id === parsed.hash
    || (parsed.hash.startsWith(`${project.id}--`) && project.anchors?.includes(parsed.hash)));
  const cleared = Boolean(target && !matchesProject(target, parsed));
  const state: CatalogState = cleared ? { q: '', type: '' } : { q: parsed.q, type: parsed.type };
  return { state, target, anchor: target ? parsed.hash : undefined, cleared, url: catalogUrl(url, state, parsed.hash) };
}

/** Namespace only Astro-rendered attributes; never process external source documents. */
export function namespaceProjectHtml(html: string, slug: string): string {
  return html.replace(/<[^>]+>/g, (tag) => tag.replace(/\s(id|href)="([^"]*)"/g, (match, attribute, value) => {
    if (attribute === 'id') return ` id="${slug}--${value}"`;
    if (value.startsWith('#')) return ` href="#${slug}--${value.slice(1)}"`;
    return match;
  }));
}
