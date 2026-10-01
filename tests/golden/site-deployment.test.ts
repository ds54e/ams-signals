import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEFAULT_BASE_PATH,
  DEFAULT_PUBLIC_ORIGIN,
  normalizeBasePath,
  normalizePublicOrigin,
  resolveSiteDeployment,
} from '../../src/lib/site-deployment.mjs';

test('unset variables resolve to the current production deployment target', () => {
  const deployment = resolveSiteDeployment({});

  assert.equal(deployment.origin, 'https://ds54e.github.io');
  assert.equal(deployment.basePath, '/ams-signals');
  assert.equal(deployment.baseUrl, '/ams-signals/');
  assert.equal(DEFAULT_PUBLIC_ORIGIN, 'https://ds54e.github.io');
  assert.equal(DEFAULT_BASE_PATH, '/ams-signals');
});

test('explicit origin and base path select a different deployment target', () => {
  const deployment = resolveSiteDeployment({
    SITE: 'https://migration-test.invalid',
    BASE_URL: '/',
  });

  assert.equal(deployment.origin, 'https://migration-test.invalid');
  assert.equal(deployment.basePath, '/');
  assert.equal(deployment.baseUrl, '/');
});

test('slash normalization follows small explicit rules', () => {
  assert.equal(normalizePublicOrigin('https://example.com/'), 'https://example.com');
  assert.equal(normalizePublicOrigin('http://example.com:8080'), 'http://example.com:8080');
  assert.equal(normalizeBasePath('/'), '/');
  assert.equal(normalizeBasePath('/ams-signals/'), '/ams-signals');
  assert.equal(normalizeBasePath('/nested/base///'), '/nested/base');
});

test('invalid explicit settings fail loudly instead of reverting to defaults', () => {
  for (const site of ['not-a-url', 'ftp://example.com', 'https://example.com/path', 'https://example.com/?q=1', 'https://user@example.com', '']) {
    assert.throws(() => resolveSiteDeployment({ SITE: site }), /Invalid SITE/);
    assert.throws(() => resolveSiteDeployment({ SITE: site }), /Unset SITE to use the default/);
  }
  for (const base of ['ams-signals', '', 'https://example.com', '/a//b', '/a b', '/a?b', '/a#b']) {
    assert.throws(() => resolveSiteDeployment({ BASE_URL: base }), /Invalid BASE_URL/);
  }
});

test('only the two supported variables influence the resolution', () => {
  const deployment = resolveSiteDeployment({
    SITE: 'https://example.org',
    BASE_URL: '/root',
    UNRELATED: 'ignored',
    PLAYWRIGHT_BASE_URL: 'https://external.example/target/',
  });

  assert.equal(deployment.origin, 'https://example.org');
  assert.equal(deployment.baseUrl, '/root/');
});
