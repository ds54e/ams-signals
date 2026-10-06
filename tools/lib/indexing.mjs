// Read-only indexing audit. Compare the source-derived route order and the
// actual built canonical set independently; both must match the sitemap.
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { exists, filesUnder, publicPathFor, readRecords } from './built-site.mjs';

const INDEXABLE = 'index, follow';
const NAV_LABELS = ['Timeline', 'Events', 'Analog', 'Digital'];

function occurrences(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

function compareIds(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

async function readIds(directory) {
  return (await readRecords(directory)).map((record) => record.id).sort(compareIds);
}

/**
 * Audits one built output tree. Pure with respect to the filesystem: it only
 * reads, so the detection self-check can point it at a mutated clone.
 */
export async function auditIndexing({ projectRoot, outputRoot, origin, siteBase }) {
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
  const indexableCanonicals = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    const pagePath = publicPathFor(outputRoot, siteBase, file);

    const robotsCount = occurrences(html, /<meta\b[^>]*\bname="robots"/gi);
    expect(robotsCount === 1, `${pagePath} emits ${robotsCount} robots directives, expected exactly 1`);

    const robotsValue = html.match(/<meta\b[^>]*\bname="robots"[^>]*\bcontent="([^"]*)"/i)?.[1];
    const expectedRobots = INDEXABLE;
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

    const nav = html.match(/<nav\b[^>]*\baria-label="Primary"[^>]*>([\s\S]*?)<\/nav>/i)?.[1];
    expect(nav !== undefined, `${pagePath} is missing primary navigation`);
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
    const expectedHrefs = ['', 'events/', 'analog/', 'digital/'].map((route) => siteBase + route);
    expect(
      links.map((link) => link.href).join(' | ') === expectedHrefs.join(' | '),
      `${pagePath} primary navigation has incorrect destinations`,
    );
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
    expect(!/^Disallow:[ \t]*[^ \t\r\n]/m.test(robots), 'robots.txt blocks public crawling');
    expect(
      robots.includes(`Sitemap: ${origin}${siteBase}sitemap.xml`),
      `robots.txt does not reference ${origin}${siteBase}sitemap.xml`,
    );
  }

  expect(
    indexableCanonicals.size === htmlFiles.length,
    `indexable canonical count ${indexableCanonicals.size} differs from ${htmlFiles.length} built HTML page(s)`,
  );

  return {
    errors,
    stats: {
      pages: htmlFiles.length,
      indexable: indexableCanonicals.size,
      sitemapUrls: sitemapLocations?.length ?? 0,
    },
  };
}
