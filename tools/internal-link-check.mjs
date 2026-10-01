import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { resolveSiteDeployment } from '../src/lib/site-deployment.mjs';

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, 'dist');
// The deployment being audited. Defaults to the current production target
// (https://ds54e.github.io + /ams-signals/); override with SITE / BASE_URL to
// audit a different deployment, e.g. a root-based custom-domain build.
const deployment = resolveSiteDeployment(process.env);
const siteBase = deployment.baseUrl;
const origin = deployment.origin;
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

function attributeValues(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => decodeHref(match[1] ?? match[2] ?? ''));
}

function anchorHrefs(html) {
  return attributeValues(html, /<a\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi);
}

// Same-site asset references (stylesheets, scripts, images) are audited for
// existence and base compliance alongside anchors.
function assetRefs(html) {
  return [
    ...attributeValues(html, /<link\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi),
    ...attributeValues(html, /<script\b[^>]*?\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi),
    ...attributeValues(html, /<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)')[^>]*>/gi),
  ];
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

function inspectorEventUrls(html, label) {
  const match = html.match(/<script\b(?=[^>]*\bdata-events-json\b)[^>]*>([\s\S]*?)<\/script>/i);
  if (!match) {
    errors.push(`${label} is missing serialized Event inspector data`);
    return new Set();
  }

  try {
    return new Set(JSON.parse(match[1]).map((event) => event.eventUrl));
  } catch (error) {
    errors.push(`${label} has invalid serialized Event inspector data: ${error.message}`);
    return new Set();
  }
}

function requireInspectorEvent(urls, href, label) {
  if (!urls.has(href)) errors.push(`${label} is missing ${href}`);
}

const htmlFiles = await filesUnder(outputRoot, '.html').catch(() => []);
if (htmlFiles.length === 0) {
  console.error('No built HTML found in dist/. Run npm run build before check:internal-links.');
  process.exit(1);
}

// Resolve a reference against the audited origin. Only references that land on
// the configured public origin are audited; every real external source URL
// stays out of scope. Query and hash are ignored for target lookup.
function resolveReference(ref, pagePath) {
  if (!ref || ref.startsWith('#') || /^(?:mailto:|tel:|javascript:|data:)/i.test(ref)) return null;
  const resolved = new URL(ref, `${origin}${pagePath}`);
  if (resolved.origin !== origin) return null;
  return resolved;
}

let internalLinkCount = 0;
let internalAssetCount = 0;
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const pagePath = publicPathFor(file);
  for (const href of anchorHrefs(html)) {
    const resolved = resolveReference(href, pagePath);
    if (!resolved) continue;
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
  for (const ref of assetRefs(html)) {
    const resolved = resolveReference(ref, pagePath);
    if (!resolved) continue;
    internalAssetCount += 1;

    if (!resolved.pathname.startsWith(siteBase)) {
      errors.push(`${pagePath} references an asset outside the configured base: ${ref}`);
      continue;
    }

    if (!(await exists(outputTarget(resolved.pathname)))) {
      errors.push(`${pagePath} references a missing built asset: ${ref}`);
    }
  }
}

const eventDir = path.join(projectRoot, 'src/data/events');
const companyDir = path.join(projectRoot, 'src/data/companies');
const peopleDir = path.join(projectRoot, 'src/data/people');
const [eventFiles, companyFiles, peopleFiles] = await Promise.all([
  filesUnder(eventDir, '.json'),
  filesUnder(companyDir, '.json'),
  filesUnder(peopleDir, '.json'),
]);
const events = await Promise.all(eventFiles.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
const companies = await Promise.all(companyFiles.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
const people = await Promise.all(peopleFiles.map(async (file) => JSON.parse(await readFile(file, 'utf8'))));
const homeHtml = await readFile(path.join(outputRoot, 'index.html'), 'utf8');
const eventsIndexHtml = await readFile(path.join(outputRoot, 'events', 'index.html'), 'utf8');
const articlesIndexHtml = await readFile(path.join(outputRoot, 'articles', 'index.html'), 'utf8');
const homeInspectorUrls = inspectorEventUrls(homeHtml, 'Timeline');
const activeCompanyIds = new Set(events.flatMap((event) => event.companies));

// Articles are no longer part of the primary navigation, so the home and Events
// index pages are not required to link to them. The Articles index itself must
// still resolve its own brand and Events links.
requireHref(articlesIndexHtml, siteBase, 'Articles index');
requireHref(articlesIndexHtml, `${siteBase}events/`, 'Articles index');

for (const event of events) {
  const eventPath = `${siteBase}events/${event.id}/`;
  requireHref(eventsIndexHtml, eventPath, 'Events index');
  requireInspectorEvent(homeInspectorUrls, eventPath, 'Timeline inspector data');
}
for (const company of companies) {
  if (activeCompanyIds.has(company.id)) {
    requireHref(homeHtml, `${siteBase}companies/${company.id}/`, 'Timeline');
  }
}
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
  const companyEvents = events.filter((entry) => entry.companies.includes(company.id));
  const companyInspectorUrls = companyEvents.length > 0
    ? inspectorEventUrls(companyHtml, `Company ${company.id}`)
    : new Set();
  for (const event of companyEvents) {
    requireInspectorEvent(companyInspectorUrls, `${siteBase}events/${event.id}/`, `Company ${company.id} inspector data`);
  }
}

for (const person of people) {
  const personHtml = await readFile(path.join(outputRoot, 'people', person.id, 'index.html'), 'utf8');
  const personInspectorUrls = inspectorEventUrls(personHtml, `Person ${person.id}`);
  for (const event of events.filter((entry) => entry.people.includes(person.id))) {
    requireInspectorEvent(personInspectorUrls, `${siteBase}events/${event.id}/`, `Person ${person.id} inspector data`);
  }
}

if (errors.length > 0) {
  console.error(`Internal-link audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${internalLinkCount} internal anchor(s) and ${internalAssetCount} same-site asset reference(s) `
  + `across ${htmlFiles.length} built HTML page(s) at ${origin}${siteBase}, `
  + 'including Timeline, Events, Articles, Event, Company, and People relationships.',
);
