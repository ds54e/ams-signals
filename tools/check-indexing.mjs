// Audit the actual build. tests/build/indexing.test.mjs exercises rejection
// of an indexable page missing from the sitemap on a minimal fixture.
import path from 'node:path';
import { resolveSiteDeployment } from '../src/lib/site-deployment.mjs';
import { auditIndexing } from './lib/indexing.mjs';

// --- CLI ---------------------------------------------------------------------
const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, 'dist');
const deployment = resolveSiteDeployment(process.env);
const siteBase = deployment.baseUrl;
const origin = deployment.origin;

const audited = await auditIndexing({ projectRoot, outputRoot, origin, siteBase });
if (audited.stats === null) {
  console.error('No built HTML found in dist/. Run npm run build before check:indexing.');
  process.exit(1);
}

const { errors } = audited;

if (errors.length > 0) {
  console.error(`Indexing policy audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated indexing policy at ${origin}${siteBase}: ${audited.stats.pages} HTML page(s), ${audited.stats.indexable} indexable, `
  + `with a matching ${audited.stats.sitemapUrls}-URL sitemap and a permissive robots.txt.`,
);
