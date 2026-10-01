// Browser contract for the search-indexing surfaces added after the custom-domain
// cutover: robots.txt and sitemap.xml are served, advertise the configured public
// origin and base path, and keep Articles out of both the crawl directives and the
// sitemap while their URLs stay live.
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
  // Crawlers must be able to fetch Article pages and read their noindex directive.
  expect(robots).not.toContain('Disallow: /articles');
});

test('sitemap.xml advertises indexable routes and excludes Articles and export', async ({ page }) => {
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
