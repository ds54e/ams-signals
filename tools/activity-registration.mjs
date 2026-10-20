// Catalog articles own registration; the snapshot owns only captured activity.
export function planActivityRegistration(projects, snapshot, selected = []) {
  const byId = new Map(projects.map((project) => [project.id, project]));
  if (byId.size !== projects.length) throw new Error('Duplicate catalog slug');
  for (const id of Object.keys(snapshot.projects)) {
    if (!byId.has(id)) throw new Error(`Removed or renamed catalog project ${id}: curate its activity record explicitly`);
  }
  for (const id of selected) {
    if (!byId.has(id)) throw new Error(`Unknown selected catalog project: ${id}`);
  }
  const targets = selected.length ? new Set(selected) : new Set(byId.keys());
  const ordered = [
    ...Object.keys(snapshot.projects).map((id) => byId.get(id)),
    ...projects.filter((project) => !snapshot.projects[project.id]),
  ];
  return ordered.map((project) => {
    const existing = snapshot.projects[project.id];
    if (existing?.kind !== 'unfetched' && existing) return { project, existing, selected: targets.has(project.id) };
    const code = project.data.sources?.find((source) => source.purpose === 'code');
    const url = code && new URL(code.url);
    const repository = url?.hostname === 'github.com' && !url.search && !url.hash
      ? url.pathname.replace(/^\/+|\/+$/g, '') : '';
    if (!/^[\w.-]+\/[\w.-]+$/.test(repository)) {
      throw new Error(`${project.id}: new registration needs a canonical GitHub Code source; curate other hosts manually`);
    }
    const activity = project.data.sources.find((source) => source.id === 'activity');
    const meaningfulSha = activity?.url.match(new RegExp(`^https://github\\.com/${repository.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/commit/([a-f0-9]{40})$`, 'i'))?.[1];
    if (!meaningfulSha) throw new Error(`${project.id}: new registration needs an explicit activity commit source`);
    return { project, existing, repository, meaningfulSha, selected: true };
  });
}

export function preserveUnselectedCapture(record, snapshotCapturedAt) {
  return record.kind === 'github' && !record.capturedAt
    ? { ...record, capturedAt: snapshotCapturedAt } : record;
}

export async function githubMetadata(repository) {
  const headers = { 'User-Agent': 'ams-signals-activity-refresh', Accept: 'application/vnd.github+json' };
  if (process.env.GH_TOKEN) headers.Authorization = `Bearer ${process.env.GH_TOKEN}`;
  const response = await fetch(`https://api.github.com/repos/${repository}`, { headers });
  if (!response.ok) throw new Error(`${repository}: GitHub metadata HTTP ${response.status}`);
  return response.json();
}
