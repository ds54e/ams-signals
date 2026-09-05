import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFrontmatter } from 'astro/markdown';
import { activitySchema, catalogSlug, edaToolsSchema, validateCatalog, validateActivity } from '../../src/lib/eda-tools/schema.ts';
import { aiIds, areaIds, sortProjects } from '../../src/lib/eda-tools/catalog.ts';
import { activityMonths, countActivity, freshnessCutoff, publicActivityDate } from '../../src/lib/eda-tools/activity.ts';
import { assertRepositoryIdentity, verifyMeaningfulCommit } from '../../tools/eda-tools-activity-support.mjs';

const directory = new URL('../../src/content/eda-tools/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return { id: file.slice(0, -3), data: edaToolsSchema.parse(frontmatter), body: content };
}));
const snapshot = activitySchema.parse(JSON.parse(await readFile(new URL('../../src/data/eda-tools-activity.json', import.meta.url), 'utf8')));
const github = projects.find((p) => snapshot.projects[p.id].kind === 'github')!;
const manual = projects.find((p) => snapshot.projects[p.id].kind === 'public-update')!;
const data = () => structuredClone(github.data);
const activity = () => structuredClone(snapshot);

test('authored EDA inventory, provenance and snapshot validate together', () => {
  validateCatalog(projects);
  validateActivity(projects, snapshot);
  assert.ok(projects.length > 0);
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  assert.deepEqual(Object.keys(snapshot.projects).sort(), projects.map((p) => p.id).sort());
  assert.equal(freshnessCutoff('2026-09-05'), '2025-09-05');
  for (const p of projects) {
    const record = snapshot.projects[p.id];
    const meaningful = record.kind === 'github' ? record.lastMeaningfulCommitAt : record.lastPublicUpdateAt;
    assert.ok(meaningful >= freshnessCutoff(snapshot.reviewedAt));
    assert.equal(p.data.areas[p.data.primary], 'core');
  }
});

test('stable slugs reject ambiguity and duplicate authored entries', () => {
  for (const id of ['Upper', 'with space', '../escape', 'nested/slug', 'x--y', 'x_1', '']) assert.equal(catalogSlug.safeParse(id).success, false);
  assert.throws(() => validateCatalog([...projects, github]), /Duplicate catalog slug/);
  assert.throws(() => validateCatalog([]), /empty/);
});

test('only five axes and three AI relations are permitted, with a core primary category', () => {
  assert.deepEqual(areaIds, ['simulation', 'frontend-synthesis', 'formal-verification', 'debug-waveform', 'flow-physical']);
  assert.deepEqual(aiIds, ['ai-built', 'ai-enabled', 'traditional']);
  for (const ai of ['ai-assisted', 'ai-native', 'agent-ready', 'unknown']) assert.equal(edaToolsSchema.safeParse({ ...data(), ai }).success, false);
  for (const areas of [{}, { [github.data.primary]: 'supporting' }, { [github.data.primary]: 'planned' }, { ...github.data.areas, reasoning: 'core' }]) {
    assert.equal(edaToolsSchema.safeParse({ ...data(), areas }).success, false);
  }
  assert.equal(edaToolsSchema.safeParse({ ...data(), primary: 'benchmark' }).success, false);
  assert.equal(edaToolsSchema.safeParse({ ...data(), summary: 'A second description' }).success, false);
});

test('public text stays English, concise and single-paragraph; keywords stay bounded and distinct', () => {
  for (const keywords of [[], ['one', 'two'], ['a', 'b', 'c', 'd', 'e', 'f'], ['RTL', 'ＲＴＬ', 'chip'], ['a', 'a ', 'c'], ['a'.repeat(29), 'b', 'c']]) {
    assert.equal(edaToolsSchema.safeParse({ ...data(), keywords }).success, false);
  }
  for (const description of ['', 'TODO', 'A'.repeat(601), 'One paragraph\nAnother paragraph', '回路設計']) {
    assert.equal(edaToolsSchema.safeParse({ ...data(), description }).success, false);
  }
});

test('sources use valid public URLs, unique IDs and at most one quick-link purpose', () => {
  for (const url of ['javascript:alert(1)', 'ftp://host/file', 'https://example.com', 'https://user:password@github.com/owner/repo', 'not a URL']) {
    const p = data(); p.sources[0].url = url;
    assert.equal(edaToolsSchema.safeParse(p).success, false);
  }
  const p = data(); p.sources.push({ ...p.sources[0], id: 'duplicate-purpose' });
  assert.equal(edaToolsSchema.safeParse(p).success, false);
  p.sources.at(-1)!.purpose = undefined; p.sources.at(-1)!.id = p.sources[0].id;
  assert.equal(edaToolsSchema.safeParse(p).success, false);
});

test('dates are calendar-valid and durable notes retain local provenance without raw URLs or HTML', () => {
  for (const reviewedAt of ['2026-02-29', '2026-13-01', '2026-00-01', 'yesterday', '2026-09-04']) {
    assert.equal(edaToolsSchema.safeParse({ ...data(), reviewedAt }).success, false);
  }
  for (const body of ['https://github.com/tool/tool', '<div>Hidden HTML</div>', '[Unknown](#source-missing)', '']) {
    assert.throws(() => validateCatalog([{ ...github, body }]));
  }
});

test('snapshot requires a valid capture and twelve consecutive calendar months', () => {
  assert.deepEqual(activityMonths('2026-09-05'), ['2025-10','2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07','2026-08','2026-09']);
  assert.equal(freshnessCutoff('2024-02-29'), '2023-02-28');
  for (const months of [snapshot.months.slice(1), [...snapshot.months].reverse(), snapshot.months.map(() => '2026-09'), [...snapshot.months.slice(0, 11), '2026-13']]) {
    assert.equal(activitySchema.safeParse({ ...activity(), months }).success, false);
  }
  assert.equal(activitySchema.safeParse({ ...activity(), capturedAt: '2026-09-04T23:59:00Z' }).success, false);
  assert.equal(activitySchema.safeParse({ ...activity(), method: 'all-branches' }).success, false);
});

test('GitHub activity requires explicit identity, branch, hashes and nonnegative integer buckets', () => {
  for (const changes of [
    { repository: 'owner' }, { repository: 'owner/..' }, { repositoryId: undefined }, { repositoryId: -1 },
    { defaultBranch: '' }, { defaultBranch: 'bad..branch' }, { defaultBranch: '-flag' },
    { headSha: 'main' }, { lastMeaningfulCommitSha: undefined },
    { commits: [0] }, { commits: Array(12).fill(-1) }, { commits: Array(12).fill(0.5) }, { commits: Array(12).fill(Number.MAX_SAFE_INTEGER + 1) },
  ]) {
    const s = activity(); Object.assign(s.projects[github.id], changes);
    assert.equal(activitySchema.safeParse(s).success, false);
  }
});

test('commit buckets agree with latest and manually reviewed meaningful dates', () => {
  for (const changes of [
    { commits: Array(12).fill(0) },
    { lastCommitAt: '2026-09-06' },
    { lastCommitAt: '2026-07-01', lastMeaningfulCommitAt: '2026-07-01', commits: Array(12).fill(1) },
    { lastCommitAt: '2026-01-01', lastMeaningfulCommitAt: '2026-02-01' },
  ]) {
    const s = activity(); Object.assign(s.projects[github.id], changes);
    assert.equal(activitySchema.safeParse(s).success, false);
  }
});

test('freshness checks meaningful activity rather than accepting cosmetic recent traffic', () => {
  const s = activity(); const record = s.projects[github.id];
  assert.equal(record.kind, 'github');
  const cutoff = freshnessCutoff(s.reviewedAt);
  const stale = new Date(new Date(`${cutoff}T00:00:00Z`).valueOf() - 86_400_000).toISOString().slice(0, 10);
  Object.assign(record, { lastCommitAt: s.reviewedAt, lastMeaningfulCommitAt: stale, commits: Array(12).fill(1) });
  assert.throws(() => validateActivity(projects, s), /Stale meaningful activity/);
  Object.assign(record, { lastMeaningfulCommitAt: cutoff });
  assert.doesNotThrow(() => validateActivity(projects, s));
  Object.assign(s.projects[manual.id], { lastPublicUpdateAt: stale });
  assert.throws(() => validateActivity(projects, s), /Stale meaningful activity/);
});

test('activity coverage and canonical Code/meaningful sources cannot drift from the catalog', () => {
  const missing = activity(); delete missing.projects[github.id];
  assert.throws(() => validateActivity(projects, missing), /Missing activity/);
  const extra = activity(); extra.projects.unknown = extra.projects[github.id];
  assert.throws(() => validateActivity(projects, extra), /Unknown activity/);
  for (const url of ['https://github.com/wrong/project', github.data.sources.find((s) => s.purpose === 'code')!.url + '/tree/main']) {
    const p = data(); p.sources.find((s) => s.purpose === 'code')!.url = url;
    assert.throws(() => validateActivity(projects.map((entry) => entry.id === github.id ? { ...entry, data: p } : entry), snapshot), /verified Code source/);
  }
  const p = data(); p.sources = p.sources.filter((source) => source.id !== 'activity');
  assert.throws(() => validateActivity(projects.map((entry) => entry.id === github.id ? { ...entry, data: p } : entry), snapshot), /meaningful commit requires/);
});

test('non-GitHub updates stay source-backed and never acquire a fake GitHub strip', () => {
  const s = activity(); Object.assign(s.projects[manual.id], { lastPublicUpdateSource: 'missing' });
  assert.throws(() => validateActivity(projects, s), /unknown public update source/);
  assert.equal(activitySchema.safeParse({ ...activity(), projects: { ...snapshot.projects, [manual.id]: { kind: 'public-update', lastPublicUpdateAt: '2026-09-04' } } }).success, false);
  Object.assign(s.projects[manual.id], { commits: Array(12).fill(0) });
  assert.equal(activitySchema.safeParse(s).success, false);
  const changed = projects.map((p) => p.id === manual.id ? { ...p, data: { ...p.data, sources: p.data.sources.map((source) => source.purpose === 'code' ? { ...source, url: 'https://github.com/mirror/surfer' } : source) } } : p);
  assert.throws(() => validateActivity(changed, snapshot), /GitHub Code requires/);
});

test('ordering uses raw latest public activity, normalized alphabetical ties, then slug without mutating input', () => {
  const input = [{ id: 'z', data: { name: 'Alpha' } }, { id: 'a', data: { name: 'Ａｌｐｈａ' } }, { id: 'recent', data: { name: 'Zed' } }, { id: 'paper', data: { name: 'Beta' } }];
  const values = { z: { kind: 'github' as const, lastCommitAt: '2026-09-01' }, a: { kind: 'github' as const, lastCommitAt: '2026-09-01' }, recent: { kind: 'github' as const, lastCommitAt: '2026-09-05' }, paper: { kind: 'public-update' as const, lastPublicUpdateAt: '2026-09-02' } };
  assert.deepEqual(sortProjects(input, values).map((p) => p.id), ['recent', 'paper', 'a', 'z']);
  assert.deepEqual(input.map((p) => p.id), ['z', 'a', 'recent', 'paper']);
  const ordered = sortProjects(projects, snapshot.projects);
  const dates = ordered.map((p) => publicActivityDate(snapshot.projects[p.id]));
  assert.deepEqual(dates, [...dates].sort().reverse());
});

test('activity counting uses UTC, includes the partial month and rejects invalid/future histories', () => {
  assert.deepEqual(countActivity(['2025-09-30T20:00:00-07:00', '2026-09-01T00:00:00Z', '2026-09-05T01:00:00+09:00'], '2026-09-05T12:00:00Z'), { commits: [1,0,0,0,0,0,0,0,0,0,0,2], lastCommitAt: '2026-09-04' });
  for (const dates of [[], ['invalid'], ['2026-09-06T00:00:00Z']]) assert.throws(() => countActivity(dates, '2026-09-05T12:00:00Z'));
});

test('real Git first-parent history counts merges once and excludes side-branch commits', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'eda-history-test-'));
  const git = (args: string[], date?: string) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', env: { ...process.env, GIT_AUTHOR_NAME: 'Fixture', GIT_AUTHOR_EMAIL: 'fixture@invalid.test', GIT_COMMITTER_NAME: 'Fixture', GIT_COMMITTER_EMAIL: 'fixture@invalid.test', ...(date ? { GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date } : {}) }, stdio: ['ignore', 'pipe', 'pipe'] });
  try {
    git(['init', '-b', 'main']); git(['-c', 'commit.gpgsign=false', 'commit', '--allow-empty', '-m', 'Base'], '2025-10-01T00:00:00Z');
    git(['switch', '-c', 'feature']); await writeFile(join(dir, 'feature'), 'feature'); git(['add', 'feature']);
    git(['-c', 'commit.gpgsign=false', 'commit', '-m', 'Side branch'], '2025-11-01T00:00:00Z');
    git(['switch', 'main']); git(['-c', 'commit.gpgsign=false', 'merge', '--no-ff', 'feature', '-m', 'Land feature'], '2026-01-01T00:00:00Z');
    const dates = git(['log', '--first-parent', '--format=%cI']).trim().split('\n');
    assert.equal(dates.length, 2);
    assert.deepEqual(countActivity(dates, '2026-09-05T12:00:00Z'), { commits: [1,0,0,1,0,0,0,0,0,0,0,0], lastCommitAt: '2026-01-01' });
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('refresh rejects forks, private or replaced repositories and preserves the manual meaningful commitment', () => {
  const record = snapshot.projects[github.id]; assert.equal(record.kind, 'github');
  if (record.kind !== 'github') return;
  const meta = { full_name: record.repository, id: record.repositoryId, private: false, fork: false, archived: false, default_branch: record.defaultBranch };
  assert.doesNotThrow(() => assertRepositoryIdentity(record, meta));
  for (const change of [{ fork: true }, { private: true }, { archived: true }, { id: record.repositoryId + 1 }, { full_name: 'replacement/repo' }, { default_branch: '' }]) {
    assert.throws(() => assertRepositoryIdentity(record, { ...meta, ...change }), /identity\/access changed/);
  }
  const before = structuredClone(record);
  assert.doesNotThrow(() => verifyMeaningfulCommit(record, [[record.lastMeaningfulCommitSha, `${record.lastMeaningfulCommitAt}T00:00:00Z`]]));
  assert.throws(() => verifyMeaningfulCommit(record, []), /absent/);
  assert.throws(() => verifyMeaningfulCommit(record, [[record.lastMeaningfulCommitSha, '2000-01-01T00:00:00Z']]), /date differs/);
  assert.deepEqual(record, before);
});
