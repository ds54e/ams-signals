// Served routes, indexing endpoints and configured public origin/base path.
//
// The exhaustive per-page robots/canonical contract is owned deterministically by
// tools/check-indexing.mjs; this file only covers what needs a real HTTP response.

import { expect, test } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';
import { basePath, installBrowserErrorGuards, publicOrigin } from './release-helpers.mjs';

installBrowserErrorGuards(test);

const records = async (collection) => {
  const directory = new URL(`../../src/data/${collection}/`, import.meta.url);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort();
  return Promise.all(files.map(async (file) => JSON.parse(await readFile(new URL(file, directory), 'utf8'))));
};
const [events, companies, people] = await Promise.all(['events', 'companies', 'people'].map(records));

test('robots.txt permits crawling and advertises the sitemap', async ({ page }) => {
  const response = await page.request.get('./robots.txt');
  expect(response.status()).toBe(200);

  const robots = await response.text();
  expect(robots).toContain('User-agent: *');
  expect(robots).toContain('Allow: /');
  expect(robots).toContain(`Sitemap: ${publicOrigin}${basePath}sitemap.xml`);
  expect(robots).not.toMatch(/^Disallow:\s*\S/m);
});

test('sitemap.xml advertises public HTML routes and excludes export', async ({ page }) => {
  const response = await page.request.get('./sitemap.xml');
  expect(response.status()).toBe(200);

  const sitemap = await response.text();
  expect(sitemap).toContain('<urlset');
  for (const route of ['', 'timeline/', 'events/', 'analog/', 'digital/']) {
    expect(sitemap).toContain(`<loc>${publicOrigin}${basePath}${route}</loc>`);
  }
  expect(sitemap).not.toContain('/articles/');
  expect(sitemap).not.toContain('export.json');
});

test('unsupported editorial routes return 404', async ({ page }) => {
  const routes = [
    'articles/',
    ...[
      'apple-rnm-modeling-verification-operations', 'uvm-ms-2011-to-2025',
      'ams-nettypes-interoperability', 'rnm-model-validation', 'pll-metamorphic-testing',
      'ams-verification-team-organization', 'why-analog-verification-engineers-emerged',
      'pre-post-silicon-pss',
    ].map((slug) => `articles/${slug}/`),
    'analysis/', 'analysis/from-behavioral-models-to-managed-verification-assets/',
  ];
  for (const route of routes) {
    const response = await page.request.get(`./${route}`);
    expect(response.status(), route).toBe(404);
  }
});

test('retired empty Company routes return genuine 404 and leave sitemap/export', async ({ page }) => {
  const sitemap = await (await page.request.get('./sitemap.xml')).text();
  const payload = await (await page.request.get('./export.json')).json();
  for (const id of ['tcs', 'microsoft', 'impinj', 'thine-electronics', 'omnivision']) {
    const route = `companies/${id}/`;
    const response = await page.request.get(`./${route}`, { maxRedirects: 0 });
    expect(response.status(), route).toBe(404);
    expect(response.headers(), route).not.toHaveProperty('location');
    expect(sitemap, route).not.toContain(`<loc>${publicOrigin}${basePath}${route}</loc>`);
    expect(payload.companies.map((company) => company.id), route).not.toContain(id);
  }
});

test('indexable surfaces self-canonicalize at the configured origin', async ({ page }) => {
  for (const route of ['', 'timeline/', 'events/', 'analog/', 'digital/']) {
    const response = await page.goto(`./${route}`);
    expect(response?.status(), `HTTP status for ${route}`).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]'))
      .toHaveAttribute('href', `${publicOrigin}${basePath}${route}`);
  }
});

test('entity indexing follows actual evidence while empty views remain available', async ({ page }) => {
  test.setTimeout(120_000);
  const sitemap = await (await page.request.get('./sitemap.xml')).text();
  for (const [collection, entities] of [['companies', companies], ['people', people]]) {
    for (const entity of entities) {
      const route = `${collection}/${entity.id}/`;
      const hasEvents = events.some((event) => event[collection].includes(entity.id));
      const response = await page.request.get(`./${route}`);
      expect(response.status(), route).toBe(200);
      const html = await response.text();
      expect(html, route).toContain(`<meta name="robots" content="${hasEvents ? 'index' : 'noindex'}, follow">`);
      expect(html, route).toContain(`<link rel="canonical" href="${publicOrigin}${basePath}${route}">`);
      expect(sitemap.includes(`<loc>${publicOrigin}${basePath}${route}</loc>`), route).toBe(hasEvents);
      if (!hasEvents) expect(html, route).toContain('No events are currently indexed');
    }
  }
});

test('factual Event text, evidence and navigation are readable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  try {
    // Cover normal and unavailable-source presentation from the current corpus.
    const samples = [...new Set([events[0], events.find((event) => event.sources.some((source) => source.status === 'unavailable'))].filter(Boolean))];
    for (const event of samples) {
      const response = await page.goto(`./events/${event.id}/`);
      expect(response?.status(), event.id).toBe(200);
      await expect(page.locator('h1')).toHaveText(event.headline);
      await expect(page.locator('.record-fact')).toHaveText(event.fact);
      await expect(page.locator('.source-card')).toHaveCount(event.sources.length);
      for (let index = 0; index < event.sources.length; index++) {
        const source = event.sources[index];
        const card = page.locator('.source-card').nth(index);
        await expect(card.locator('h3')).toContainText(source.title);
        await expect(card).toContainText(source.summary);
        if (source.status !== 'unavailable') await expect(card.locator('h3 a')).toHaveAttribute('href', source.url);
      }
    }
    await page.goto('./events/');
    await expect(page.locator('[data-event-result]')).toHaveCount(events.length);
    await expect(page.locator('[data-event-result]').first().locator('.result-fact')).not.toBeEmpty();
    for (const [collection, entities] of [['companies', companies], ['people', people]]) {
      const entity = entities.find((entry) => events.some((event) => event[collection].includes(entry.id)));
      const related = events.filter((event) => event[collection].includes(entity.id));
      await page.goto(`./${collection}/${entity.id}/`);
      await expect(page.locator('[data-static-event]')).toHaveCount(related.length);
      for (const event of related) {
        const link = page.locator(`[data-static-event] a[href="${basePath}events/${event.id}/"]`);
        await expect(link).toHaveText(event.headline);
        await expect(link.locator('xpath=ancestor::article').locator('.result-fact')).toHaveText(event.fact);
      }
    }
  } finally {
    await context.close();
  }
});
