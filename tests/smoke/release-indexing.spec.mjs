// Served routes, indexing endpoints and configured public origin/base path.
//
// The exhaustive per-page robots/canonical contract is owned deterministically by
// tools/check-indexing.mjs; this file only covers what needs a real HTTP response.

import { expect, test } from '@playwright/test';
import { readdir, readFile } from 'node:fs/promises';
import { basePath, installBrowserErrorGuards, publicOrigin } from './release-helpers.mjs';

const records = async (collection) => {
  const directory = new URL(`../../src/data/${collection}/`, import.meta.url);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort();
  return Promise.all(files.map(async (file) => JSON.parse(await readFile(new URL(file, directory), 'utf8'))));
};
const [events, companies, people] = await Promise.all(['events', 'companies', 'people'].map(records));

test('indexing endpoints are served from the configured base', { tag: '@core' }, async ({ request }) => {
  const [robots, sitemap] = await Promise.all([request.get('./robots.txt'), request.get('./sitemap.xml')]);
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain(`Sitemap: ${publicOrigin}${basePath}sitemap.xml`);
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('<urlset');
});

test('unsupported and retired routes return 404', { tag: '@core' }, async ({ request }) => {
  const routes = [
    'export.json', 'articles/',
    ...[
      'apple-rnm-modeling-verification-operations', 'uvm-ms-2011-to-2025',
      'ams-nettypes-interoperability', 'rnm-model-validation', 'pll-metamorphic-testing',
      'ams-verification-team-organization', 'why-analog-verification-engineers-emerged',
      'pre-post-silicon-pss',
    ].map((slug) => `articles/${slug}/`),
    'analysis/', 'analysis/from-behavioral-models-to-managed-verification-assets/',
  ];
  await Promise.all(routes.map(async (route) => {
    const response = await request.get(`./${route}`, { maxRedirects: 0 });
    expect(response.status(), route).toBe(404);
  }));
});

test('retired empty Company routes stay absent unless factual Events restore the group', async ({ request }) => {
  const sitemap = await (await request.get('./sitemap.xml')).text();
  for (const id of ['tcs', 'microsoft', 'impinj', 'thine-electronics', 'omnivision']) {
    const restored = companies.some((company) => company.id === id);
    expect(!restored || events.some((event) => event.companies.includes(id)), id).toBe(true);
    const route = `companies/${id}/`;
    const response = await request.get(`./${route}`, { maxRedirects: 0 });
    expect(response.status(), route).toBe(restored ? 200 : 404);
    expect(response.headers(), route).not.toHaveProperty('location');
    expect(sitemap.includes(`<loc>${publicOrigin}${basePath}${route}</loc>`), route).toBe(restored);
  }
});

test('active and empty entity pages are served without redirecting', async ({ request }) => {
  // The static audit checks every expected route and all metadata. This checks
  // the preview boundary for one active and one empty page of each entity type
  // when present. The independent live suite owns production HTTP verification.
  for (const [collection, entities] of [['companies', companies], ['people', people]]) {
    const active = new Set(events.flatMap((event) => event[collection]));
    for (const id of [entities.find((entity) => active.has(entity.id))?.id,
      entities.find((entity) => !active.has(entity.id))?.id].filter(Boolean)) {
      const route = `${collection}/${id}/`;
      const response = await request.get(`./${route}`, { maxRedirects: 0 });
      expect(response.status(), route).toBe(200);
      expect(response.headers(), route).not.toHaveProperty('location');
      if (!active.has(id)) expect(await response.text(), route).toContain('No events are currently indexed');
    }
  }
});

test.describe('browser indexing', () => {
  installBrowserErrorGuards(test);

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
});
