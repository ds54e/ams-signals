// CLI audit and detection check over the configured static build.
import { cp, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { resolveSiteDeployment } from '../src/lib/site-deployment.mjs';
import { auditIndexing } from './lib/indexing.mjs';

const INDEXABLE = 'index, follow';
const PROBE_SEGMENT = '__indexing_probe__';

/**
 * Proves the cross-check is not vacuous. Clones the built output, adds one new
 * well-formed indexable HTML page without touching sitemap.xml, and requires the
 * audit to reject the clone. Never mutates the real dist/.
 */
async function verifyDetection({ projectRoot, outputRoot, origin, siteBase }) {
  const errors = [];
  const cloneRoot = await mkdtemp(path.join(tmpdir(), 'ams-signals-indexing-'));
  try {
    await cp(outputRoot, cloneRoot, { recursive: true });
    const probeDir = path.join(cloneRoot, PROBE_SEGMENT);
    await mkdir(probeDir, { recursive: true });
    await writeFile(
      path.join(probeDir, 'index.html'),
      [
        '<!doctype html>',
        '<html lang="en">',
        '  <head>',
        '    <meta charset="UTF-8" />',
        `    <meta name="robots" content="${INDEXABLE}" />`,
        `    <link rel="canonical" href="${origin}${siteBase}${PROBE_SEGMENT}/" />`,
        '    <title>indexing probe</title>',
        '  </head>',
        '  <body>indexing probe</body>',
        '</html>',
        '',
      ].join('\n'),
    );

    const mutated = await auditIndexing({ projectRoot, outputRoot: cloneRoot, origin, siteBase });
    if (mutated.errors.length === 0) {
      errors.push(
        'detection self-check: an indexable built page absent from sitemap.xml was not detected '
        + '- the sitemap cross-check is not enforcing anything',
      );
    } else if (!mutated.errors.some((error) => error.startsWith('sitemap.xml is missing indexable page(s):') && error.includes(PROBE_SEGMENT))) {
      errors.push(
        `detection self-check: injected page failed for the wrong reason: ${mutated.errors.join(' | ')}`,
      );
    }
  } finally {
    await rm(cloneRoot, { recursive: true, force: true });
  }
  return errors;
}

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

const detected = await verifyDetection({ projectRoot, outputRoot, origin, siteBase });
const errors = [...audited.errors, ...detected];

if (errors.length > 0) {
  console.error(`Indexing policy audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated indexing policy at ${origin}${siteBase}: ${audited.stats.pages} indexable HTML page(s) `
  + `with a matching ${audited.stats.sitemapUrls}-URL sitemap and a permissive robots.txt. `
  + 'Detection self-check confirmed the sitemap cross-check rejects an unlisted indexable page.',
);
