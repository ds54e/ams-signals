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
// Two independent sitemap contracts are enforced, because either alone can pass
// while the site is wrong:
//
//   1. an explicit expected set/order derived from the content collections, so
//      a missing or reordered route class is caught, and
//   2. a cross-check that the set of canonical URLs of every built HTML page
//      whose robots value is `index, follow` is *exactly* the set of sitemap
//      URLs. This catches a new indexable page that was never added to the
//      sitemap — a page the explicit set cannot know about.
//
// Run after `npm run build`. Target is resolved from SITE / BASE_URL so the same
// contract holds for a root-domain deployment and the legacy base-path shape.
//
// Detection self-check: after a clean audit, the run itself clones the built
// output into a temporary directory, injects one new well-formed indexable page
// (correct robots + self-canonical) without touching sitemap.xml, and requires
// the audit to fail on that clone. A silently vacuous cross-check therefore
// fails the build instead of passing quietly.
import { access, cp, mkdir, mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { resolveSiteDeployment } from '../src/lib/site-deployment.mjs';

const INDEXABLE = 'index, follow';
const EXCLUDED = 'noindex, follow';
const NAV_LABELS = ['Timeline', 'Events', 'Analog', 'Digital'];
const PROBE_SEGMENT = '__indexing_probe__';

async function filesUnder(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesUnder(absolute, extension);
    return entry.isFile() && entry.name.endsWith(extension) ? [absolute] : [];
  }));
  return nested.flat();
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function publicPathFor(outputRoot, siteBase, file) {
  const relative = path.relative(outputRoot, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '' : relative.replace(/\/index\.html$/, '/');
  return `${siteBase}${route}`;
}

function occurrences(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

function compareIds(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

async function readIds(directory) {
  const files = await filesUnder(directory, '.json');
  const records = await Promise.all(files.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
  return records.map((record) => record.id).sort(compareIds);
}

/**
 * Audits one built output tree. Pure with respect to the filesystem: it only
 * reads, so the detection self-check can point it at a mutated clone.
 */
async function auditIndexing({ projectRoot, outputRoot, origin, siteBase }) {
  const errors = [];
  const expect = (condition, message) => {
    if (!condition) errors.push(message);
  };

  const htmlFiles = await filesUnder(outputRoot, '.html').catch(() => []);
  if (htmlFiles.length === 0) {
    return { errors, stats: null };
  }

  // --- Built HTML: robots + canonical -------------------------------------
  const navReports = [];
  // Canonical URLs bucketed by the directive each page actually emits. The
  // indexable set is compared against the sitemap below; the noindex set backs
  // the reported statistics, which must describe the built site (it includes
  // the /articles/ index) rather than the authored Article count alone.
  const indexableCanonicals = new Set();
  const noindexCanonicals = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const pagePath = publicPathFor(outputRoot, siteBase, file);
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

    if (robotsValue === INDEXABLE) indexableCanonicals.add(expectedCanonical);
    else if (robotsValue === EXCLUDED) noindexCanonicals.add(expectedCanonical);

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

  // --- Article routes still build -----------------------------------------
  const articleSlugs = (await filesUnder(path.join(projectRoot, 'src/content/articles'), '.md'))
    .map((file) => path.basename(file, '.md'))
    .sort(compareIds);
  expect(articleSlugs.length > 0, 'no authored Articles found to verify');

  for (const slug of articleSlugs) {
    const target = path.join(outputRoot, 'articles', slug, 'index.html');
    expect(await exists(target), `Article route did not build: ${siteBase}articles/${slug}/`);
  }

  // --- sitemap.xml --------------------------------------------------------
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
  let sitemapLocations = null;
  if (!(await exists(sitemapFile))) {
    errors.push('sitemap.xml was not generated');
  } else {
    const sitemap = await readFile(sitemapFile, 'utf8');
    expect(sitemap.includes('<urlset'), 'sitemap.xml is missing a <urlset> element');

    sitemapLocations = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((match) => match[1]);
    expect(
      sitemapLocations.join('\n') === expectedLocations.join('\n'),
      'sitemap.xml contents or ordering differ from the indexable route set',
    );
    expect(new Set(sitemapLocations).size === sitemapLocations.length, 'sitemap.xml contains duplicate entries');
    expect(
      !sitemapLocations.some((location) => location.includes('/articles/')),
      'sitemap.xml advertises an Articles URL',
    );
    expect(
      !sitemapLocations.some((location) => location.includes('export.json')),
      'sitemap.xml advertises export.json',
    );

    // Cross-check: the sitemap must be exactly the set of indexable built pages.
    // Catches a new indexable route that the explicit expected set cannot know.
    const advertised = new Set(sitemapLocations);
    const missing = [...indexableCanonicals].filter((url) => !advertised.has(url)).sort(compareIds);
    const unindexable = [...advertised].filter((url) => !indexableCanonicals.has(url)).sort(compareIds);
    expect(missing.length === 0, `sitemap.xml is missing indexable page(s): ${missing.join(', ')}`);
    expect(unindexable.length === 0, `sitemap.xml advertises non-indexable page(s): ${unindexable.join(', ')}`);
  }

  // --- robots.txt ---------------------------------------------------------
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

  // Every page carries exactly one directive, so the two buckets must account
  // for the entire build; otherwise the reported statistics would be wrong.
  expect(
    indexableCanonicals.size + noindexCanonicals.size === htmlFiles.length,
    `page directive counts do not add up: ${indexableCanonicals.size} "${INDEXABLE}" + `
    + `${noindexCanonicals.size} "${EXCLUDED}" != ${htmlFiles.length} built HTML page(s)`,
  );

  return {
    errors,
    stats: {
      pages: htmlFiles.length,
      indexable: indexableCanonicals.size,
      noindex: noindexCanonicals.size,
      articleDetails: articleSlugs.length,
      sitemapUrls: sitemapLocations?.length ?? 0,
    },
  };
}

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
    } else if (!mutated.errors.some((error) => error.includes(PROBE_SEGMENT))) {
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
  `Validated indexing policy at ${origin}${siteBase}: ${audited.stats.pages} built HTML page(s) — `
  + `${audited.stats.indexable} indexable, ${audited.stats.noindex} noindex `
  + `(${audited.stats.articleDetails} of the noindex pages are authored Article detail pages, `
  + 'plus the Articles index) — with a matching '
  + `${audited.stats.sitemapUrls}-URL sitemap and a permissive robots.txt. `
  + 'Detection self-check confirmed the sitemap cross-check rejects an unlisted indexable page.',
);
