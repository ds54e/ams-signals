// Served routes, indexing endpoints and configured public origin/base path.
//
// The exhaustive per-page robots/canonical contract is owned deterministically by
// tools/check-indexing.mjs; this file only covers what needs a real HTTP response.

import { expect, test } from '@playwright/test';
import { basePath, installBrowserErrorGuards, publicOrigin } from './release-helpers.mjs';

installBrowserErrorGuards(test);

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
  for (const route of ['', 'events/', 'analog/', 'digital/']) {
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

test('indexable surfaces self-canonicalize at the configured origin', async ({ page }) => {
  for (const route of ['', 'events/', 'analog/', 'digital/']) {
    const response = await page.goto(`./${route}`);
    expect(response?.status(), `HTTP status for ${route}`).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]'))
      .toHaveAttribute('href', `${publicOrigin}${basePath}${route}`);
  }
});
