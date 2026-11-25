import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { access, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { activitySchema, validateActivity } from '../../src/lib/digital/schema.ts';
import { assertRepositoryIdentity, verifyMeaningfulCommit } from '../../tools/strict-activity-support.mjs';
import { refreshCatalogActivity } from '../../tools/lib/catalog-activity-refresh.mjs';

const exec = promisify(execFile);
const oldCapture = '2026-11-05T12:00:00.000Z';
const newCapture = '2026-11-25T12:00:00.000Z';
const months = ['2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05',
  '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11'];
const oldCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
let repositoryDirectory;
let meaningfulSha;
let headSha;

before(async () => {
  repositoryDirectory = await mkdtemp(join(tmpdir(), 'catalog-refresh-history-'));
  const git = async (args, date = '2026-11-20T12:00:00Z') => (await exec('git', ['-c', 'commit.gpgsign=false', ...args], {
    cwd: repositoryDirectory,
    env: { ...process.env, GIT_AUTHOR_NAME: 'Fixture', GIT_AUTHOR_EMAIL: 'fixture@invalid.test',
      GIT_COMMITTER_NAME: 'Fixture', GIT_COMMITTER_EMAIL: 'fixture@invalid.test',
      GIT_AUTHOR_DATE: '2001-01-01T00:00:00Z', GIT_COMMITTER_DATE: date },
  })).stdout.trim();
  await git(['init', '--quiet', '--initial-branch=reviewed-main']);
  await git(['commit', '--quiet', '--allow-empty', '-m', 'Reviewed implementation'], '2026-09-30T23:30:00-02:00');
  meaningfulSha = await git(['rev-parse', 'HEAD']);
  await git(['checkout', '--quiet', '-b', 'topic']);
  await git(['commit', '--quiet', '--allow-empty', '-m', 'Side work one'], '2026-10-15T12:00:00Z');
  await git(['commit', '--quiet', '--allow-empty', '-m', 'Side work two'], '2026-11-05T12:00:00Z');
  await git(['checkout', '--quiet', 'reviewed-main']);
  await git(['commit', '--quiet', '--allow-empty', '-m', 'Routine maintenance'], '2026-11-02T12:00:00Z');
  await git(['merge', '--quiet', '--no-ff', '--no-edit', 'topic']);
  headSha = await git(['rev-parse', 'HEAD']);
});

after(async () => {
  if (repositoryDirectory) await rm(repositoryDirectory, { recursive: true, force: true });
});

function githubRecord(id, extra = {}) {
  return { kind: 'github', repository: `fixture/${id}`, repositoryId: 101,
    defaultBranch: 'reviewed-main', headSha: meaningfulSha, commits: [...oldCounts],
    lastCommitAt: '2026-10-01', lastMeaningfulCommitAt: '2026-10-01', lastMeaningfulCommitSha: meaningfulSha,
    ...extra };
}

function project(id, record = githubRecord(id)) {
  const repository = record.kind === 'repository' ? record.repository
    : record.kind === 'public-update' ? `https://codeberg.org/fixture/${id}` : `https://github.com/fixture/${id}`;
  const evidence = record.kind === 'repository' ? `${repository}/-/commit/${meaningfulSha}`
    : record.kind === 'public-update' ? `${repository}/releases/tag/v1.0` : `${repository}/commit/${meaningfulSha}`;
  return { id, data: { name: `Fixture ${id}`, description: 'Exercises a reviewed verification operation.',
    scope: { verification: { ai: false } }, access: 'Public source',
    addedAt: '2026-10-01', reviewedAt: '2026-11-05', sources: [
      { id: 'code', purpose: 'code', title: 'Implementation', url: repository },
      { id: 'activity', title: 'Reviewed activity', url: evidence },
    ] }, body: 'Reviewed [implementation evidence](#source-activity).' };
}

function manualRecord() {
  return { ...githubRecord('manual'), kind: 'repository', repository: 'https://gitlab.com/fixture/manual',
    repositoryId: 'gitlab:202', capturedAt: oldCapture, lastMeaningfulCommitSource: 'activity' };
}

async function fixture(t, records, projects = Object.entries(records).map(([id, record]) => project(id, record))) {
  const directory = await mkdtemp(join(tmpdir(), 'catalog-refresh-output-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const destination = pathToFileURL(join(directory, 'digital-activity.json'));
  const previous = { reviewedAt: oldCapture.slice(0, 10), capturedAt: oldCapture,
    method: 'first-parent-committer-utc', months, projects: records };
  const original = `${JSON.stringify(previous, null, 2)}\n`;
  await writeFile(destination, original);
  const foreignCandidate = join(directory, `.digital-activity-${process.pid}.tmp`);
  await writeFile(foreignCandidate, 'Unrelated unfinished capture\n');
  const originalFiles = (await readdir(directory)).sort();
  const requests = [];
  const gitScratch = new Set();
  const messages = [];
  const warnings = [];
  const config = {
    domain: 'digital', destination, projects, activitySchema, validateActivity,
    verifyRepository({ record, repository, meta }) {
      assertRepositoryIdentity(record?.kind === 'github' ? record : { repository, repositoryId: meta.id }, meta);
    },
    verifyHistory({ id, record, history, meaningfulDate }) {
      if (record?.kind === 'github') verifyMeaningfulCommit(record, history);
      if (!meaningfulDate) throw new Error(`${id}: meaningful commit is absent from first-parent history`);
    },
    reviewMessage: 'Review meaningful activity before committing.',
  };
  const runtime = {
    args: [], now: () => newCapture,
    async fetchMetadata(repository) {
      requests.push(repository);
      return { id: 101, full_name: repository, default_branch: 'reviewed-main',
        private: false, fork: false, archived: false };
    },
    async run(command, args) {
      assert.equal(command, 'git');
      const localArgs = [...args];
      if (localArgs[0] === 'clone') {
        assert.match(localArgs.at(-2), /^https:\/\/github\.com\/fixture\/[a-z-]+\.git$/);
        localArgs[localArgs.length - 2] = pathToFileURL(repositoryDirectory).href;
        gitScratch.add(dirname(localArgs.at(-1)));
      }
      return (await exec(command, localArgs, { timeout: 10_000, env: { ...process.env, GIT_TERMINAL_PROMPT: '0' } })).stdout;
    },
    logger: { log: (message) => messages.push(message), warn: (message) => warnings.push(message) },
  };
  return {
    config, runtime, original, requests, messages, warnings,
    async assertClean() {
      assert.deepEqual((await readdir(directory)).sort(), originalFiles, 'Only the destination may change');
      assert.equal(await readFile(foreignCandidate, 'utf8'), 'Unrelated unfinished capture\n');
      for (const scratch of gitScratch) await assert.rejects(access(scratch), { code: 'ENOENT' });
    },
  };
}

test('targeted refresh preserves reviewed evidence and manual records while registering new and retried captures', async (t) => {
  const records = {
    selected: githubRecord('selected'),
    untouched: githubRecord('untouched'),
    dated: githubRecord('dated', { capturedAt: '2026-11-02T12:00:00.000Z' }),
    manual: manualRecord(),
    point: { kind: 'public-update', lastPublicUpdateAt: '2026-11-03',
      lastPublicUpdateSource: 'activity', lastPublicUpdateType: 'release' },
    retry: { kind: 'unfetched', repository: 'fixture/retry', attemptedAt: oldCapture },
  };
  // Deliberately disagree with capture order: existing record order must be retained.
  const projects = ['added', 'point', 'manual', 'dated', 'retry', 'untouched', 'selected']
    .map((id) => project(id, records[id]));
  const f = await fixture(t, records, projects);
  const result = await refreshCatalogActivity(f.config, { ...f.runtime, args: ['--project=selected'] });
  assert.deepEqual(f.requests, ['fixture/selected', 'fixture/retry', 'fixture/added']);
  assert.deepEqual(Object.keys(result.projects), [...Object.keys(records), 'added']);
  assert.equal(result.capturedAt, newCapture);
  assert.deepEqual(result.months, months);
  for (const id of ['selected', 'retry', 'added']) {
    assert.equal(result.projects[id].headSha, headSha);
    assert.equal(result.projects[id].defaultBranch, 'reviewed-main');
    assert.equal(result.projects[id].lastMeaningfulCommitSha, meaningfulSha);
    assert.equal(result.projects[id].lastMeaningfulCommitAt, '2026-10-01');
    assert.equal(result.projects[id].lastCommitAt, '2026-11-20');
    assert.equal(result.projects[id].capturedAt, newCapture);
    // One UTC October commit, then one mainline commit and one merge in November.
    // The side commits and deliberately old author dates must not affect the counts.
    assert.deepEqual(result.projects[id].commits, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2]);
  }
  assert.deepEqual(result.projects.untouched, { ...records.untouched, capturedAt: oldCapture });
  for (const id of ['dated', 'manual', 'point']) assert.deepEqual(result.projects[id], records[id]);
  assert.deepEqual(JSON.parse(await readFile(f.config.destination, 'utf8')), result);
  assert.deepEqual(f.warnings, []);
  await f.assertClean();
});

test('failed new and retried captures remain unfetched without invented activity', async (t) => {
  const records = { retry: { kind: 'unfetched', repository: 'fixture/retry', attemptedAt: oldCapture } };
  const f = await fixture(t, records, [project('retry', records.retry), project('added')]);
  const result = await refreshCatalogActivity(f.config, { ...f.runtime,
    fetchMetadata: async () => { throw new Error('Repository host unavailable'); },
  });
  for (const id of ['retry', 'added']) assert.deepEqual(result.projects[id], {
    kind: 'unfetched', repository: `fixture/${id}`, attemptedAt: newCapture,
  });
  assert.equal(f.warnings.length, 2);
  assert.deepEqual(JSON.parse(await readFile(f.config.destination, 'utf8')), result);
  await f.assertClean();
});

test('an existing capture failure after a success leaves the entire destination unchanged', async (t) => {
  const f = await fixture(t, { good: githubRecord('good'), broken: githubRecord('broken') });
  await assert.rejects(refreshCatalogActivity(f.config, { ...f.runtime,
    fetchMetadata: async (repository) => {
      if (repository === 'fixture/broken') throw new Error('Repository host unavailable');
      return f.runtime.fetchMetadata(repository);
    },
  }), /Repository host unavailable/);
  assert.ok(f.messages.some((message) => message.startsWith('good: captured ')));
  assert.equal(await readFile(f.config.destination, 'utf8'), f.original);
  assert.deepEqual(f.warnings, []);
  await f.assertClean();
});

test('repository and meaningful-history policy failures prevent snapshot replacement', async (t) => {
  await t.test('a changed numeric repository identity fails before Git capture', async (t) => {
    const f = await fixture(t, { selected: githubRecord('selected') });
    await assert.rejects(refreshCatalogActivity(f.config, { ...f.runtime,
      fetchMetadata: async (repository) => ({ ...await f.runtime.fetchMetadata(repository), id: 999 }),
    }), /identity\/access changed/);
    assert.equal(await readFile(f.config.destination, 'utf8'), f.original);
    await f.assertClean();
  });
  await t.test('a meaningful date inconsistent with the actual commit fails', async (t) => {
    const f = await fixture(t, { selected: githubRecord('selected', {
      lastCommitAt: '2026-10-02', lastMeaningfulCommitAt: '2026-10-02',
    }) });
    await assert.rejects(refreshCatalogActivity(f.config, f.runtime), /date differs/);
    assert.equal(await readFile(f.config.destination, 'utf8'), f.original);
    await f.assertClean();
  });
});

test('full rollover cannot publish a candidate containing an old manual repository capture', async (t) => {
  const f = await fixture(t, { selected: githubRecord('selected'), manual: manualRecord() });
  await assert.rejects(refreshCatalogActivity(f.config, { ...f.runtime, now: () => '2026-12-01T12:00:00.000Z' }),
    /Repository capture must cover the snapshot month/);
  assert.ok(f.messages.some((message) => message.startsWith('selected: captured ')));
  assert.equal(await readFile(f.config.destination, 'utf8'), f.original);
  await f.assertClean();
});

test('selection across month rollover and unknown options fail before repository access', async (t) => {
  const f = await fixture(t, { selected: githubRecord('selected') });
  await assert.rejects(refreshCatalogActivity(f.config, { ...f.runtime,
    args: ['--project=selected'], now: () => '2026-12-01T12:00:00.000Z',
  }), /Month rollover requires a complete refresh/);
  await assert.rejects(refreshCatalogActivity(f.config, { ...f.runtime, args: ['--unknown'] }), /Unknown option/);
  assert.deepEqual(f.requests, []);
  assert.equal(await readFile(f.config.destination, 'utf8'), f.original);
  await f.assertClean();
});
