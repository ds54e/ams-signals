// Deterministic indexing-policy audit over the built output. Complements
// tools/internal-link-check.mjs (link/asset integrity) by owning the search
// indexing contract:
//
//   * every built HTML page carries exactly one robots directive and one
//     self-referential canonical URL,
//   * Articles surfaces are `noindex, follow` while remaining live and linked,
//   * sitemap.xml advertises exactly the indexable route classes and nothing
//     else,
//   * robots.txt permits crawling and advertises the sitemap,
//   * the primary navigation no longer contains Articles.
//
// Run after `npm run build`. Target is resolved from SITE / BASE_URL so the same
// contract holds for a root-domain deployment and the legacy base-path shape.
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { resolveSiteDeployment } from '../src/lib/site-deployment.mjs';

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, 'dist');
const deployment = resolveSiteDeployment(process.env);
const siteBase = deployment.baseUrl;
const origin = deployment.origin;
const errors = [];

const INDEXABLE = 'index, follow';
const EXCLUDED = 'noindex, follow';
const NAV_LABELS = ['Timeline', 'Events', 'Analog', 'Digital'];

async function filesUnder(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(absolute, extension);
    return entry.isFile() && entry.name.endsWith(extension) ? [absolute] : [];
  }));
  return nested.flat();
}

function publicPathFor(file) {
  const relative = path.relative(outputRoot, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '' : relative.replace(/\/index\.html$/, '/');
  return `${siteBase}${route}`;
}

function occurrences(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

async function readIds(directory) {
  const files = await filesUnder(directory, '.json');
  const records = await Promise.all(files.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
  return records.map((record) => record.id).sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
}

function expect(condition, message) {
  if (!condition) errors.push(message);
}

// --- Built HTML ------------------------------------------------------------
const htmlFiles = await filesUnder(outputRoot, '.html').catch(() => []);
if (htmlFiles.length === 0) {
  console.error('No built HTML found in dist/. Run npm run build before check:indexing.');
  process.exit(1);
}

const navReports = [];
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pagePath = publicPathFor(file);
  const isArticle = pagePath.startsWith(`${siteBase}articles/`);

  const robotsCount = occurrences(html, /<meta\b[^>]*\bname="robots"/gi);
  expect(robotsCount === 1, `${pagePath} emits ${robotsCount} robots directives, expected exactly 1`);

  const robotsValue = html.match(/<meta\b[^>]*\bname="robots"[^>]*\bcontent="([^"]*)"/i)?.[1];
  const expectedRobots = isArticle ? EXCLUDED : INDEXABLE;
  expect(
    robotsValue === expectedRobots,
    `${pagePath} robots is ${JSON.stringify(robotsValue)}, expected ${JSON.stringify(expectedRobots)}`,
  );

  const canonicalCount = occurrences(html, /<link\b[^>]*\brel="canonical"/gi);
  expect(canonicalCount === 1, `${pagePath} emits ${canonicalCount} canonical links, expected exactly 1`);

  const canonical = html.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]*)"/i)?.[1];
  const expectedCanonical = `${origin}${pagePath}`;
  expect(
    canonical === expectedCanonical,
    `${pagePath} canonical is ${JSON.stringify(canonical)}, expected ${JSON.stringify(expectedCanonical)}`,
  );

  const nav = html.match(/<nav\b[^>]*\baria-label="Primary"[^>]*>([\s\S]*?)<\/nav>/i)?.[1];
  if (nav !== undefined) {
    const links = [...nav.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([^<]*)<\/a>/gi)]
      .map((match) => ({ href: match[1], text: match[2].trim() }));
    navReports.push({ pagePath, links });
  }
}

expect(navReports.length > 0, 'no page rendered the primary navigation');

for (const { pagePath, links } of navReports) {
  const labels = links.map((link) => link.text);
  expect(
    labels.join(' | ') === NAV_LABELS.join(' | '),
    `${pagePath} primary navigation is [${labels.join(', ')}], expected [${NAV_LABELS.join(', ')}]`,
  );
  expect(
    !links.some((link) => link.href === `${siteBase}articles/`),
    `${pagePath} primary navigation still links to Articles`,
  );
}

// --- Article routes still build -------------------------------------------
const articleSlugs = (await filesUnder(path.join(projectRoot, 'src/content/articles'), '.md'))
  .map((file) => path.basename(file, '.md'))
  .sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
expect(articleSlugs.length > 0, 'no authored Articles found to verify');

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

for (const slug of articleSlugs) {
  const target = path.join(outputRoot, 'articles', slug, 'index.html');
  expect(await exists(target), `Article route did not build: ${siteBase}articles/${slug}/`);
}

// --- sitemap.xml -----------------------------------------------------------
const [eventIds, companyIds, peopleIds] = await Promise.all([
  readIds(path.join(projectRoot, 'src/data/events')),
  readIds(path.join(projectRoot, 'src/data/companies')),
  readIds(path.join(projectRoot, 'src/data/people')),
]);

const expectedLocations = [
  siteBase,
  `${siteBase}events/`,
  ...eventIds.map((id) => `${siteBase}events/${id}/`),
  `${siteBase}analog/`,
  `${siteBase}digital/`,
  ...companyIds.map((id) => `${siteBase}companies/${id}/`),
  ...peopleIds.map((id) => `${siteBase}people/${id}/`),
].map((entry) => `${origin}${entry}`);

const sitemapFile = path.join(outputRoot, 'sitemap.xml');
if (!(await exists(sitemapFile))) {
  errors.push('sitemap.xml was not generated');
} else {
  const sitemap = await readFile(sitemapFile, 'utf8');
  expect(sitemap.includes('<urlset'), 'sitemap.xml is missing a <urlset> element');

  const locations = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => match[1]);
  expect(
    locations.join('\n') === expectedLocations.join('\n'),
    'sitemap.xml contents or ordering differ from the indexable route set',
  );
  expect(new Set(locations).size === locations.length, 'sitemap.xml contains duplicate entries');
  expect(
    !locations.some((location) => location.includes('/articles/')),
    'sitemap.xml advertises an Articles URL',
  );
  expect(
    !locations.some((location) => location.includes('export.json')),
    'sitemap.xml advertises export.json',
  );
}

// --- robots.txt ------------------------------------------------------------
const robotsFile = path.join(outputRoot, 'robots.txt');
if (!(await exists(robotsFile))) {
  errors.push('robots.txt was not generated');
} else {
  const robots = await readFile(robotsFile, 'utf8');
  expect(/^User-agent: \*$/m.test(robots), 'robots.txt has no "User-agent: *" group');
  expect(/^Allow: \/$/m.test(robots), 'robots.txt does not allow crawling');
  expect(
    robots.includes(`Sitemap: ${origin}${siteBase}sitemap.xml`),
    `robots.txt does not reference ${origin}${siteBase}sitemap.xml`,
  );
  expect(!/^Disallow: *\/articles/m.test(robots), 'robots.txt disallows /articles/');
}

if (errors.length > 0) {
  console.error(`Indexing policy audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated indexing policy across ${htmlFiles.length} built HTML page(s) at ${origin}${siteBase}: `
  + `${articleSlugs.length} Articles page(s) as "${EXCLUDED}", all other pages as "${INDEXABLE}", `
  + `${expectedLocations.length} sitemap URL(s), and a permissive robots.txt.`,
);
