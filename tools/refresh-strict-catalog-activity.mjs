// Manual only. Checked-in data remains the build source; no network calls during checks.
import { readCatalogProjects } from './lib/catalog-input.mjs';
import { refreshCatalogActivity } from './lib/catalog-activity-refresh.mjs';
import { assertRepositoryIdentity, verifyMeaningfulCommit } from './strict-activity-support.mjs';

export async function refreshStrictCatalog({
  domain, activitySchema, validateActivity, validateCatalog, reviewedFork = () => false,
}) {
  const projects = await readCatalogProjects(new URL(`../src/content/${domain}/`, import.meta.url));
  validateCatalog(projects);
  return refreshCatalogActivity({
    domain, projects, activitySchema, validateActivity,
    verifyRepository({ id, record, repository, meta }) {
      const allowFork = reviewedFork(id, repository, meta.id);
      assertRepositoryIdentity(record?.kind === 'github' ? record : { repository, repositoryId: meta.id }, meta, { allowFork });
    },
    verifyHistory({ id, record, history, meaningfulDate }) {
      if (record?.kind === 'github') verifyMeaningfulCommit(record, history);
      if (!meaningfulDate) throw new Error(`${id}: meaningful commit is absent from first-parent history`);
    },
    reviewMessage: 'Manually review meaningful activity and non-GitHub public updates before committing.',
  });
}
