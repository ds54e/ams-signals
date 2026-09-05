// Refresh-only checks. No imports from a site build or browser entry point.
export function assertRepositoryIdentity(record, meta) {
  if (meta.private !== false || meta.fork !== false || meta.archived !== false
    || meta.id !== record.repositoryId
    || typeof meta.full_name !== 'string' || meta.full_name.toLowerCase() !== record.repository.toLowerCase()
    || typeof meta.default_branch !== 'string' || !meta.default_branch) {
    throw new Error(`${record.repository}: repository identity/access changed; review the canonical source manually`);
  }
}

export function verifyMeaningfulCommit(record, history) {
  const date = history.find(([sha]) => sha === record.lastMeaningfulCommitSha)?.[1];
  if (!date || new Date(date).toISOString().slice(0, 10) !== record.lastMeaningfulCommitAt) {
    throw new Error(`${record.repository}: meaningful commit is absent from first-parent history or its date differs; review manually`);
  }
}
