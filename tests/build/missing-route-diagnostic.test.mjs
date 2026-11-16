import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyMissingRoute, probeMissingRoute } from '../../tools/lib/missing-route-diagnostic.mjs';

test('only 404 confirms a synthetic missing route', () => {
  assert.equal(classifyMissingRoute(404).outcome, 'confirmed');
  for (const status of [null, 429, 500, 503, 504]) assert.equal(classifyMissingRoute(status).outcome, 'unconfirmed');
  for (const status of [200, 301, 302, 403]) assert.equal(classifyMissingRoute(status).outcome, 'unexpected');
});

test('probe is single-attempt, bounded and does not follow redirects', async () => {
  for (const status of [404, 200, 302, 503, null]) {
    let calls = 0;
    const result = await probeMissingRoute({ get: async (url, options) => {
      calls++;
      assert.equal(url, './__ams_live_missing_route__/');
      assert.deepEqual(options, { timeout: 10000, maxRetries: 0, maxRedirects: 0 });
      if (status === null) throw new Error('timeout');
      return { status: () => status };
    } });
    assert.equal(calls, 1);
    assert.equal(result.outcome, classifyMissingRoute(status).outcome);
    if (status === null) assert.match(result.error, /timeout/);
  }
});
