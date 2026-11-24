import * as contract from '../src/lib/lab/schema.ts';
import { refreshStrictCatalog } from './refresh-strict-catalog-activity.mjs';

await refreshStrictCatalog({
  ...contract, domain: 'lab',
  // Reviewed canonical implementations whose GitHub identity is fork-marked.
  reviewedFork: (id, repo, repositoryId) => [
    ['kibot', 'INTI-CMNB/KiBot', 246344800],
    ['oscillatord', 'leoleovich/oscillatord', 1184205953],
  ].some(([slug, repository, numericId]) => id === slug && repo === repository && repositoryId === numericId),
});
