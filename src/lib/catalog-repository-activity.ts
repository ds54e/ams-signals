/** Monthly repository history is explicitly reviewed; a point update never implies commits. */
export function hasRepositoryHistory<T extends { kind: string }>(
  record: T,
): record is Extract<T, { kind: 'github' | 'repository' }> {
  return record.kind === 'github' || record.kind === 'repository';
}

/** Generic records use a canonical HTTPS URL; GitHub keeps its existing identity checks. */
export function isRepositoryUrl(value: string): boolean {
  let url: URL;
  try { url = new URL(value); } catch { return false; }
  return url.protocol === 'https:' && !url.username && !url.password && !url.search && !url.hash
    && url.pathname !== '/' && !/(^|\.)github\.com$/i.test(url.hostname);
}

export function validateRepositorySources(record: {
  repository: string; lastMeaningfulCommitSha: string; lastMeaningfulCommitSource: string;
}, sources: readonly { id: string; purpose?: string; url: string }[]) {
  const canonical = record.repository.replace(/\/$/, '');
  const code = sources.find((source) => source.purpose === 'code');
  if (!code || code.url.replace(/\/$/, '') !== canonical) {
    throw new Error('Primary repository must match the verified Code source');
  }
  const evidence = sources.find((source) => source.id === record.lastMeaningfulCommitSource);
  const url = evidence && new URL(evidence.url);
  const repository = new URL(canonical);
  if (!url || url.origin !== repository.origin || !url.pathname.startsWith(`${repository.pathname}/`)
    || !url.pathname.split('/').includes(record.lastMeaningfulCommitSha) || url.search || url.hash) {
    throw new Error('Meaningful commit requires its primary source in the canonical repository');
  }
}
