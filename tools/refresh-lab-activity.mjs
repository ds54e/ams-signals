import * as contract from '../src/lib/lab/schema.ts';
import { refreshStrictCatalog } from './refresh-strict-catalog-activity.mjs';

await refreshStrictCatalog({
  ...contract, domain: 'lab',
  // KiBot's maintained canonical repository is marked as a fork by GitHub.
  reviewedFork: (id, repo, repositoryId) => id === 'kibot' && repo === 'INTI-CMNB/KiBot' && repositoryId === 246344800,
});
