// Focused browser contract for the Cloudflare Web Analytics beacon.
//
// The exhaustive per-page contract is owned deterministically by
// tools/check-analytics.mjs; this file only proves the served markup in a real
// browser under whichever deployment target the preview was built for. The
// beacon is emitted for the production origin only, so the expectation is
// derived from the configured target rather than assumed.

import { expect, test } from '@playwright/test';
import { installBrowserErrorGuards } from './release-helpers.mjs';
import {
  ANALYTICS_BEACON_SRC,
  ANALYTICS_SITE_TOKEN,
  analyticsEnabledFor,
} from '../../src/lib/analytics.mjs';
import { resolveSiteDeployment } from '../../src/lib/site-deployment.mjs';

installBrowserErrorGuards(test);

const deployment = resolveSiteDeployment(process.env);
const expectedCount = analyticsEnabledFor(new URL(deployment.origin)) ? 1 : 0;

// The external beacon is stubbed so the assertion is about emitted markup rather
// than reaching Cloudflare: a blocked or offline network must not make this spec
// flaky, and no real analytics event is required to pass.
test.beforeEach(async ({ page }) => {
  await page.route('**/static.cloudflareinsights.com/**', (route) => route.fulfill({
    status: 200,
    contentType: 'application/javascript',
    body: '',
  }));
});

for (const route of ['', 'articles/pll-metamorphic-testing/']) {
  test(`analytics beacon is ${expectedCount === 1 ? 'emitted once' : 'absent'} on /${route}`, async ({ page }) => {
    const response = await page.goto(`./${route}`);
    expect(response?.status()).toBe(200);

    const beacons = page.locator(`script[src="${ANALYTICS_BEACON_SRC}"]`);
    await expect(beacons).toHaveCount(expectedCount);
    await expect(page.locator('script[data-cf-beacon]')).toHaveCount(expectedCount);

    if (expectedCount === 1) {
      await expect(beacons).toHaveAttribute('data-cf-beacon', new RegExp(ANALYTICS_SITE_TOKEN));
      const html = await page.content();
      expect(html.split('data-cf-beacon').length - 1).toBe(1);
    } else {
      const html = await page.content();
      expect(html).not.toContain(ANALYTICS_SITE_TOKEN);
    }
  });
}
