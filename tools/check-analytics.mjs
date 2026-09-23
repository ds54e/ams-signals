// Deterministic analytics contract over the built output.
//
// Cloudflare Web Analytics is production-only: the beacon must appear on every
// built HTML page of the public production origin and on none of any other
// deployment target. This audit derives that expectation from the configured
// deployment (SITE / BASE_URL) instead of a hard-coded page count, makes no
// network requests, and needs no Cloudflare API credential.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { resolveSiteDeployment } from '../src/lib/site-deployment.mjs';
import {
  ANALYTICS_BEACON_SRC,
  ANALYTICS_SITE_TOKEN,
  analyticsEnabledFor,
} from '../src/lib/analytics.mjs';

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, 'dist');
const deployment = resolveSiteDeployment(process.env);
const expectedEnabled = analyticsEnabledFor(new URL(deployment.origin));
const errors = [];

async function filesUnder(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(absolute, extension);
    return entry.isFile() && entry.name.endsWith(extension) ? [absolute] : [];
  }));
  return nested.flat();
}

function occurrences(haystack, needle) {
  return haystack.split(needle).length - 1;
}

function publicPathFor(file) {
  const relative = path.relative(outputRoot, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '' : relative.replace(/\/index\.html$/, '/');
  return `${deployment.baseUrl}${route}`;
}

// The canonical Cloudflare snippet, matched as a whole so a malformed or
// duplicated beacon cannot satisfy the per-page counts below.
const beaconSnippet = new RegExp(
  '<!-- Cloudflare Web Analytics -->'
  + `<script type="module" src="${ANALYTICS_BEACON_SRC}" `
  + `data-cf-beacon='\\{"token": "${ANALYTICS_SITE_TOKEN}"\\}'></script>`
  + '<!-- End Cloudflare Web Analytics -->',
  'g',
);

const htmlFiles = await filesUnder(outputRoot, '.html').catch(() => []);
if (htmlFiles.length === 0) {
  console.error('No built HTML found in dist/. Run npm run build before check:analytics.');
  process.exit(1);
}

const expectedCount = expectedEnabled ? 1 : 0;
let instrumented = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pagePath = publicPathFor(file);

  const srcCount = occurrences(html, ANALYTICS_BEACON_SRC);
  const attributeCount = occurrences(html, 'data-cf-beacon');
  const tokenCount = occurrences(html, ANALYTICS_SITE_TOKEN);

  if (srcCount === 1) instrumented += 1;

  if (srcCount !== expectedCount) {
    errors.push(`${pagePath} has ${srcCount} analytics beacon script(s), expected ${expectedCount}`);
  }
  if (attributeCount !== expectedCount) {
    errors.push(`${pagePath} has ${attributeCount} data-cf-beacon attribute(s), expected ${expectedCount}`);
  }
  // The public site token is only legitimate inside the canonical snippet, so a
  // stray occurrence means partially applied or hand-edited instrumentation.
  if (tokenCount !== expectedCount) {
    errors.push(`${pagePath} references the analytics site token ${tokenCount} time(s), expected ${expectedCount}`);
  }

  const snippets = [...html.matchAll(beaconSnippet)];
  if (expectedEnabled && snippets.length !== 1) {
    errors.push(`${pagePath} does not contain exactly one canonical analytics snippet (found ${snippets.length})`);
    continue;
  }

  if (expectedEnabled) {
    const snippetEnd = snippets[0].index + snippets[0][0].length;
    const bodyEnd = html.indexOf('</body>');
    if (bodyEnd === -1) {
      errors.push(`${pagePath} has no closing </body>`);
    } else if (snippetEnd > bodyEnd) {
      errors.push(`${pagePath} places the analytics beacon after </body>`);
    } else if (html.slice(snippetEnd, bodyEnd).trim() !== '') {
      errors.push(`${pagePath} has content between the analytics beacon and </body>`);
    }
  }
}

if (errors.length > 0) {
  console.error(`Analytics contract failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated Cloudflare Web Analytics contract across ${htmlFiles.length} built HTML page(s) at `
  + `${deployment.origin}${deployment.baseUrl}: target is `
  + `${expectedEnabled ? 'instrumented' : 'uninstrumented'}; ${instrumented} page(s) carry the canonical beacon.`,
);
