import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, 'dist');
const siteBase = '/ams-signals/';
const origin = 'https://internal.invalid';
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

function publicPathFor(file) {
  const relative = path.relative(outputRoot, file).split(path.sep).join('/');
  const route = relative === 'index.html' ? '' : relative.replace(/\/index\.html$/, '/');
  return `${siteBase}${route}`;
}

function decodeHref(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&#38;', '&')
    .replaceAll('&#x26;', '&');
}

function anchorHrefs(html) {
  const pattern = /<a\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi;
  return [...html.matchAll(pattern)].map((match) => decodeHref(match[1] ?? match[2] ?? ''));
}

function outputTarget(pathname) {
  const relative = decodeURIComponent(pathname.slice(siteBase.length));
  if (!relative) return path.join(outputRoot, 'index.html');
  if (pathname.endsWith('/')) return path.join(outputRoot, relative, 'index.html');
  return path.join(outputRoot, relative);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function requireHref(html, href, label) {
  if (!anchorHrefs(html).includes(href)) errors.push(`${label} is missing ${href}`);
}

const htmlFiles = await filesUnder(outputRoot, '.html').catch(() => []);
if (htmlFiles.length === 0) {
  console.error('No built HTML found in dist/. Run npm run build before check:internal-links.');
  process.exit(1);
}

let internalLinkCount = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pagePath = publicPathFor(file);
  for (const href of anchorHrefs(html)) {
    if (!href || href.startsWith('#') || /^(?:mailto:|tel:|javascript:)/i.test(href)) continue;
    const resolved = new URL(href, `${origin}${pagePath}`);
    if (resolved.origin !== origin) continue;
    internalLinkCount += 1;

    if (!resolved.pathname.startsWith(siteBase)) {
      errors.push(`${pagePath} escapes the configured base: ${href}`);
      continue;
    }

    const extension = path.posix.extname(resolved.pathname);
    if (resolved.pathname !== siteBase && !resolved.pathname.endsWith('/') && !extension) {
      errors.push(`${pagePath} uses a non-canonical route without a trailing slash: ${href}`);
    }

    if (!(await exists(outputTarget(resolved.pathname)))) {
      errors.push(`${pagePath} points to a missing built target: ${href}`);
    }
  }
}

const eventDir = path.join(projectRoot, 'src/data/events');
const companyDir = path.join(projectRoot, 'src/data/companies');
const peopleDir = path.join(projectRoot, 'src/data/people');
const analysisDir = path.join(projectRoot, 'src/content/analysis');
const [eventFiles, companyFiles, peopleFiles, analysisFiles] = await Promise.all([
  filesUnder(eventDir, '.json'),
  filesUnder(companyDir, '.json'),
  filesUnder(peopleDir, '.json'),
  filesUnder(analysisDir, '.md'),
]);
const events = await Promise.all(eventFiles.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
const companies = await Promise.all(companyFiles.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
const people = await Promise.all(peopleFiles.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
const homeHtml = await readFile(path.join(outputRoot, 'index.html'), 'utf8');

for (const event of events) requireHref(homeHtml, `${siteBase}events/${event.id}/`, 'Timeline');
for (const company of companies) requireHref(homeHtml, `${siteBase}companies/${company.id}/`, 'Timeline');
for (const person of people) requireHref(homeHtml, `${siteBase}people/${person.id}/`, 'Timeline');

for (const event of events) {
  const eventHtml = await readFile(path.join(outputRoot, 'events', event.id, 'index.html'), 'utf8');
  for (const companyId of event.companies) {
    requireHref(eventHtml, `${siteBase}companies/${companyId}/`, `Event ${event.id}`);
  }
  for (const personId of event.people) {
    requireHref(eventHtml, `${siteBase}people/${personId}/`, `Event ${event.id}`);
  }
}

for (const company of companies) {
  const companyHtml = await readFile(path.join(outputRoot, 'companies', company.id, 'index.html'), 'utf8');
  for (const event of events.filter((entry) => entry.companies.includes(company.id))) {
    requireHref(companyHtml, `${siteBase}events/${event.id}/`, `Company ${company.id}`);
  }
}

for (const person of people) {
  const personHtml = await readFile(path.join(outputRoot, 'people', person.id, 'index.html'), 'utf8');
  for (const event of events.filter((entry) => entry.people.includes(person.id))) {
    requireHref(personHtml, `${siteBase}events/${event.id}/`, `Person ${person.id}`);
  }
}

const analysisIndex = await readFile(path.join(outputRoot, 'analysis', 'index.html'), 'utf8');
for (const file of analysisFiles) {
  const articleId = path.relative(analysisDir, file).split(path.sep).join('/').replace(/\.md$/, '');
  requireHref(analysisIndex, `${siteBase}analysis/${articleId}/`, 'Analysis index');
  const articleHtml = await readFile(path.join(outputRoot, 'analysis', articleId, 'index.html'), 'utf8');
  const eventReferences = anchorHrefs(articleHtml).filter((href) => {
    const resolved = new URL(href, `${origin}${siteBase}analysis/${articleId}/`);
    return resolved.origin === origin && resolved.pathname.startsWith(`${siteBase}events/`);
  });
  if (eventReferences.length === 0) errors.push(`Analysis ${articleId} has no generated Event link`);
}

if (errors.length > 0) {
  console.error(`Internal-link audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${internalLinkCount} internal anchor(s) across ${htmlFiles.length} built HTML page(s), including Timeline, Analysis, Event, Company, and People relationships.`);
