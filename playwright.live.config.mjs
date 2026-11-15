import { defineConfig, devices } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { isDeepStrictEqual } from 'node:util';

const fail = (message) => { throw new Error(`Live verification refused: ${message}`); };
const required = (name) => process.env[name] || fail(`${name} must be explicitly supplied`);
const url = required('PLAYWRIGHT_BASE_URL');
if (url !== 'https://ams-signals.com/' || required('SITE') !== 'https://ams-signals.com' || required('BASE_URL') !== '/') {
  fail('explicit production URL, SITE and BASE_URL must match https://ams-signals.com/');
}
const sha = required('LIVE_EXPECTED_SHA');
const previous = required('LIVE_PREVIOUS_SHA');
if (![sha, previous].every((value) => /^[a-f0-9]{40}$/.test(value))) fail('use full commit SHAs');
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
if (git('rev-parse', 'HEAD') !== sha) fail('checkout HEAD differs from expected deployed SHA');
git('cat-file', '-e', `${previous}^{commit}`);
git('merge-base', '--is-ancestor', previous, sha);
const buildInputs = ['src', 'public', 'astro.config.mjs', 'tsconfig.json', 'package-lock.json', '.npmrc', '.env', '.env.local', '.env.production', '.env.production.local'];
if (git('ls-files', '--others', '--exclude-standard', '--', ...buildInputs)) fail('untracked build inputs must be resolved first');
if (git('ls-files', '--others', '--ignored', '--exclude-standard', '--', ...buildInputs)) fail('ignored build inputs must be resolved first');
if (git('diff', sha, '--', ...buildInputs)) fail('build inputs differ from expected SHA');
const committedPackage = JSON.parse(git('show', `${sha}:package.json`));
const currentPackage = JSON.parse(readFileSync('package.json', 'utf8'));
// Only unrelated validation-script edits can differ while testing a deployed SHA.
// Lifecycle/build scripts and all dependency, override and runtime fields must agree.
const buildPackage = ({ scripts = {}, ...rest }) => ({ ...rest, scripts: Object.fromEntries(Object.entries(scripts).filter(([name]) => /^(?:preinstall|install|postinstall|prepare|prebuild|build|postbuild)$/.test(name))) });
if (!isDeepStrictEqual(buildPackage(committedPackage), buildPackage(currentPackage))) fail('package build or dependency configuration differs from expected SHA');
const runId = required('LIVE_DEPLOY_RUN_ID');
if (!/^\d+$/.test(runId)) fail('deploy run ID must be numeric');
const run = JSON.parse(execFileSync('gh', ['run', 'view', runId, '--repo', 'ds54e/ams-signals', '--json', 'headSha,headBranch,workflowName,status,conclusion'], { encoding: 'utf8', timeout: 30_000 }));
if (run.headSha !== sha || run.headBranch !== 'main' || run.workflowName !== 'Deploy GitHub Pages (manual)' || run.status !== 'completed' || run.conclusion !== 'success') fail('successful main deployment for this exact SHA is required');

export default defineConfig({
  testDir: './tests/live', timeout: 30_000, expect: { timeout: 5_000 },
  workers: 2, retries: 0, fullyParallel: false, reporter: 'list',
  use: { baseURL: url, trace: 'retain-on-failure', screenshot: 'only-on-failure', video: 'retain-on-failure' },
  projects: [{ name: 'live-chromium', use: { ...devices['Desktop Chrome'], ...(process.env.LIVE_CHROME === '1' ? { channel: 'chrome' } : {}) } }],
});
