import { test } from '@playwright/test';
import { probeMissingRoute } from '../../tools/lib/missing-route-diagnostic.mjs';

test('non-blocking hosting diagnostic: synthetic missing route', async ({ request }, testInfo) => {
  const result = await probeMissingRoute(request);
  await testInfo.attach('missing-route-diagnostic', { body: JSON.stringify(result, null, 2), contentType: 'application/json' });
  testInfo.annotations.push({ type: 'hosting-diagnostic', description: result.detail });
  if (result.outcome !== 'confirmed') {
    console.warn(`[hosting diagnostic: ${result.outcome}] ${result.detail}`);
    test.skip(true, result.detail); // Report separately, never turn an unverified response into a pass.
  }
});
