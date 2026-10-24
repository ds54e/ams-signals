import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { auditIndexing } from '../../tools/lib/indexing.mjs';

async function fixture(t, siteBase) {
  const projectRoot = await mkdtemp(path.join(tmpdir(), 'ams-signals-indexing-test-'));
  t.after(() => rm(projectRoot, { recursive: true, force: true }));
  const outputRoot = path.join(projectRoot, 'dist');
  const origin = 'https://example.com';
  const options = { projectRoot, outputRoot, origin, siteBase };
  const write = async (file, body) => {
    const absolute = path.join(projectRoot, file);
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, body);
  };
  for (const [collection, id] of [['events', 'event-one'], ['companies', 'company-one'], ['people', 'person-one']]) {
    const record = collection === 'events'
      ? { id, companies: ['company-one'], people: ['person-one'] }
      : { id };
    await write(`src/data/${collection}/record.json`, JSON.stringify(record));
  }
  const routes = ['', 'timeline/', 'events/', 'events/event-one/', 'analog/', 'digital/', 'companies/company-one/', 'people/person-one/'];
  const html = (route, robots = 'index, follow') => `<!doctype html><html><head>
    <meta name="robots" content="${robots}">
    <link rel="canonical" href="${origin}${siteBase}${route}">
    </head><body><nav aria-label="Primary">
    <a href="${siteBase}">Home</a><a href="${siteBase}timeline/">Timeline</a><a href="${siteBase}events/">Events</a>
    <a href="${siteBase}analog/">Analog</a><a href="${siteBase}digital/">Digital</a>
    <a href="https://github.com/ds54e/ams-signals">GitHub ↗</a>
    </nav></body></html>`;
  const page = (route, body = html(route)) => write(`dist/${route}index.html`, body);
  for (const route of routes) await page(route);
  const sitemap = (paths) => `<urlset>${paths.map((route) => `<url><loc>${origin}${siteBase}${route}</loc></url>`).join('')}</urlset>`;
  await write('dist/sitemap.xml', sitemap(routes));
  await write('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}${siteBase}sitemap.xml\n`);
  return { options, page, html, write, routes, sitemap };
}

for (const siteBase of ['/', '/a+b/']) {
  test(`indexing audit accepts the complete public route set at ${siteBase}`, async (t) => {
    const f = await fixture(t, siteBase);
    const result = await auditIndexing(f.options);
    assert.deepEqual(result.errors, []);
    assert.equal(result.stats.pages, f.routes.length);
    assert.equal(result.stats.sitemapUrls, f.routes.length);
  });
}

test('an unsupported built page cannot be hidden with noindex', async (t) => {
  const f = await fixture(t, '/');
  await f.page('articles/', f.html('articles/', 'noindex, follow'));
  const result = await auditIndexing(f.options);
  assert(result.errors.some((error) => error.startsWith('/articles/ robots')));
});

test('an unsupported page is rejected even when added to the sitemap', async (t) => {
  const f = await fixture(t, '/');
  await f.page('extra/');
  await f.write('dist/sitemap.xml', f.sitemap([...f.routes, 'extra/']));
  const result = await auditIndexing(f.options);
  assert(result.errors.includes('sitemap.xml contents or ordering differ from the indexable route set'));
});

test('the built-page cross-check detects a page missing from the sitemap', async (t) => {
  const f = await fixture(t, '/');
  await f.page('extra/');
  const result = await auditIndexing(f.options);
  assert(result.errors.some((error) => error.startsWith('sitemap.xml is missing indexable page(s):') && error.includes('/extra/')));
});

test('canonical and primary navigation destinations respect the configured base', async (t) => {
  const f = await fixture(t, '/a+b/');
  const body = f.html('events/').replace('href="https://example.com/a+b/events/"', 'href="https://example.com/events/"')
    .replace('href="/a+b/digital/"', 'href="/digital/"');
  await f.page('events/', body);
  const result = await auditIndexing(f.options);
  assert(result.errors.some((error) => error.startsWith('/a+b/events/ canonical')));
  assert(result.errors.includes('/a+b/events/ primary navigation has incorrect destinations'));
});

test('sitemap ordering, duplicates and crawl configuration are blocking contracts', async (t) => {
  const f = await fixture(t, '/');
  await f.write('dist/sitemap.xml', f.sitemap([...f.routes].reverse().concat(f.routes[0])));
  await f.write('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
  const result = await auditIndexing(f.options);
  assert(result.errors.includes('sitemap.xml contents or ordering differ from the indexable route set'));
  assert(result.errors.includes('sitemap.xml contains duplicate entries'));
  assert(result.errors.includes('robots.txt does not allow crawling'));
  assert(result.errors.some((error) => error.startsWith('robots.txt does not reference')));
});

test('robots cannot block routes while advertising permissive crawling', async (t) => {
  const f = await fixture(t, '/');
  await f.write('dist/robots.txt', 'User-agent: *\nAllow: /\nDisallow: /events/\nSitemap: https://example.com/sitemap.xml\n');
  const result = await auditIndexing(f.options);
  assert(result.errors.includes('robots.txt blocks public crawling'));
});

for (const siteBase of ['/', '/a+b/']) {
  test(`empty entities stay crawlable but are excluded from search at ${siteBase}`, async (t) => {
    const f = await fixture(t, siteBase);
    const emptyRoutes = ['companies/empty-company/', 'people/empty-person/'];
    for (const [collection, id] of [['companies', 'empty-company'], ['people', 'empty-person']]) {
      await f.write(`src/data/${collection}/empty.json`, JSON.stringify({ id }));
    }
    for (const route of emptyRoutes) await f.page(route, f.html(route, 'noindex, follow'));
    assert.deepEqual((await auditIndexing(f.options)).errors, []);

    await f.write('dist/sitemap.xml', f.sitemap([...f.routes, ...emptyRoutes]));
    assert((await auditIndexing(f.options)).errors.some((error) => error.startsWith('sitemap.xml advertises non-indexable page(s):')));
    await f.write('dist/sitemap.xml', f.sitemap(f.routes));

    await f.page(emptyRoutes[0]);
    assert((await auditIndexing(f.options)).errors.some((error) => error.startsWith(`${siteBase}${emptyRoutes[0]} robots`)));
    await f.page(emptyRoutes[0], f.html(emptyRoutes[0], 'noindex, follow'));

    // Adding real evidence makes both entity pages indexable again.
    await f.write('src/data/events/record.json', JSON.stringify({
      id: 'event-one', companies: ['company-one', 'empty-company'], people: ['person-one', 'empty-person'],
    }));
    assert((await auditIndexing(f.options)).errors.some((error) => error.startsWith(`${siteBase}${emptyRoutes[0]} robots`)));
    for (const route of emptyRoutes) await f.page(route);
    const routes = [...f.routes.slice(0, 7), emptyRoutes[0], emptyRoutes[1], f.routes[7]];
    await f.write('dist/sitemap.xml', f.sitemap(routes));
    assert.deepEqual((await auditIndexing(f.options)).errors, []);
  });
}
