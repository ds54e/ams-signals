import { expect, test } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { installBrowserErrorGuards, expectExplorerReady } from '../smoke/release-helpers.mjs';
import { ANALYTICS_BEACON_SRC, ANALYTICS_SITE_TOKEN } from '../../src/lib/analytics.mjs';

installBrowserErrorGuards(test);
const origin = 'https://ams-signals.com';
const records = (kind) => readdirSync(`src/data/${kind}`).filter((f) => f.endsWith('.json')).map((f) => JSON.parse(readFileSync(`src/data/${kind}/${f}`, 'utf8')));
const events = records('events');
const companies = records('companies');
const people = records('people');
const representative = events[0];
const diff = execFileSync('git', ['diff', '--name-status', '--no-renames', process.env.LIVE_PREVIOUS_SHA, process.env.LIVE_EXPECTED_SHA, '--', 'src/data/events', 'src/data/companies', 'src/data/people'], { encoding: 'utf8' });
const changes = diff.trim().split('\n').filter(Boolean).map((line) => {
  const [status, path] = line.split('\t');
  const match = path.match(/^src\/data\/(events|companies|people)\/([^/]+)\.json$/);
  if (!match) return null;
  const record = JSON.parse(status === 'D'
    ? execFileSync('git', ['show', `${process.env.LIVE_PREVIOUS_SHA}:${path}`], { encoding: 'utf8' })
    : readFileSync(path, 'utf8'));
  return { status, kind: match[1], id: record.id, record, route: `${match[1]}/${record.id}/` };
}).filter(Boolean);

for (const route of ['', 'timeline/', 'events/', 'analog/', 'digital/', 'lab/']) {
  test(`served surface /${route}`, async ({ page }) => {
    const failedAssets = [];
    page.on('response', (r) => { if (new URL(r.url()).origin === origin && r.status() >= 400) failedAssets.push(`${r.status()} ${r.url()}`); });
    expect((await page.goto(`./${route}`))?.status()).toBe(200);
    expect(new URL(page.url()).origin).toBe(origin);
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/${route}`);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    await expect(page.locator(`script[src="${ANALYTICS_BEACON_SRC}"]`)).toHaveCount(1);
    await expect(page.locator('script[data-cf-beacon]')).toHaveCount(1);
    await expect(page.locator('script[data-cf-beacon]')).toHaveAttribute('data-cf-beacon', new RegExp(ANALYTICS_SITE_TOKEN));
    if (route === 'timeline/' || route === 'events/') await expectExplorerReady(page, route.slice(0, -1));
    expect(failedAssets).toEqual([]);
  });
}

test('retired export returns 404 and robots and sitemap reflect this release', async ({ request }) => {
  const get = async (route) => { const r = await request.get(`./${route}`); expect(r.status(), route).toBe(200); return r; };
  expect((await request.get('./export.json', { maxRedirects: 0 })).status()).toBe(404);
  const robots = await (await get('robots.txt')).text();
  expect(robots).toContain(`Sitemap: ${origin}/sitemap.xml`);
  expect(robots).toContain('Allow: /');
  expect(robots).not.toMatch(/^Disallow:\s*\S/m);
  const sitemap = await (await get('sitemap.xml')).text();
  for (const route of ['', 'timeline/', 'events/', 'analog/', 'digital/', 'lab/']) expect(sitemap).toContain(`<loc>${origin}/${route}</loc>`);
  expect(sitemap).not.toContain('export.json');
  for (const change of changes) {
    if (change.status === 'D') expect(sitemap).not.toContain(`${origin}/${change.route}`);
    else if (change.kind === 'events') expect(sitemap).toContain(`${origin}/${change.route}`);
  }
});

for (const change of changes) {
  test(`release change ${change.status} /${change.route}`, async ({ page, request }) => {
    if (change.status === 'D') {
      expect((await request.get(`./${change.route}`, { maxRedirects: 0 })).status()).toBe(404);
      return;
    }
    expect((await page.goto(`./${change.route}`))?.status()).toBe(200);
    await expect(page.locator('main')).toContainText(change.record.headline || change.record.name);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `${origin}/${change.route}`);
  });
}

for (const [kind, all] of [['companies', companies], ['people', people]]) {
  const empty = all.find((record) => !events.some((event) => event[kind].includes(record.id)) && !record.canonicalId);
  if (empty) test(`empty ${kind} is crawlable but not indexed`, async ({ page, request }) => {
    expect((await page.goto(`./${kind}/${empty.id}/`))?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    expect(await (await request.get('./sitemap.xml')).text()).not.toContain(`${origin}/${kind}/${empty.id}/`);
  });
}

test('Event source and Timeline inspector are wired', async ({ page }) => {
  expect((await page.goto(`./events/${representative.id}/`))?.status()).toBe(200);
  await expect(page.locator(`a[href=${JSON.stringify(representative.sources[0].url)}]`).first()).toBeVisible();
  await page.goto('./timeline/');
  await expectExplorerReady(page);
  const mark = page.locator('[data-event-mark]:visible').first();
  const id = await mark.getAttribute('data-event-id');
  await mark.click();
  await expect(mark).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-detail-event]')).toHaveAttribute('href', `/events/${id}/`);
});

for (const width of [390, 320]) for (const domain of ['analog', 'digital', 'lab']) {
  test(`${domain} search and narrow delivery ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(`./${domain}/`);
    const rows = page.locator('[data-catalog-project]');
    await expect(rows.first()).toBeVisible();
    const search = page.getByRole('searchbox', { name: 'Search projects' });
    await search.fill('__ams_no_matching_project__');
    await expect(rows.filter({ visible: true })).toHaveCount(0);
    await search.fill('');
    await expect(rows.first()).toBeVisible();
    const scope = page.getByRole('combobox', { name: 'Scope', exact: true });
    const option = await scope.locator('option').nth(1).getAttribute('value');
    await scope.selectOption(option);
    await expect(rows.filter({ visible: true }).first()).toBeVisible();
    await scope.selectOption('');
    const toggle = page.locator('[data-provenance-toggle]').first();
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  });
}
