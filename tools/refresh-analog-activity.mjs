// Manual only: never imported by a build, check, or browser entry point.
import { readFile } from 'node:fs/promises';
import { readCatalogProjects } from './lib/catalog-input.mjs';
import { refreshCatalogActivity } from './lib/catalog-activity-refresh.mjs';
import { activitySchema, validateActivity, validateCatalog } from '../src/lib/analog/schema.ts';

const projects = await readCatalogProjects(new URL('../src/content/analog/', import.meta.url));
const updates = JSON.parse(await readFile(new URL('../src/data/analog-updates.json', import.meta.url), 'utf8'));
validateCatalog(projects, updates);
await refreshCatalogActivity({
  domain: 'analog', projects, activitySchema, validateActivity,
  verifyRepository({ id, record, repository, meta }) {
    if (meta.private || meta.fork || meta.archived || meta.full_name.toLowerCase() !== repository.toLowerCase()
      || (record?.repositoryId !== undefined && meta.id !== record.repositoryId)) {
      throw new Error(`${id}: repository identity/access changed; review the primary source manually`);
    }
  },
  verifyHistory({ id, record, meaningfulDate }) {
    if (!meaningfulDate || (record?.lastMeaningfulCommitAt
      && new Date(meaningfulDate).toISOString().slice(0, 10) !== record.lastMeaningfulCommitAt)) {
      throw new Error(`${id}: meaningful commit is absent from first-parent history or its date differs; review manually`);
    }
  },
  reviewMessage: 'Review commit histories, meaningful-activity dates, repository notes, and public implementation access before committing.',
});
