import assert from 'node:assert/strict';
import { activityBand } from '../../src/lib/catalog-activity-band.ts';
import test from 'node:test';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFrontmatter } from 'astro/markdown';
import { activitySchema, catalogSlug, digitalSchema, validateCatalog, validateActivity } from '../../src/lib/digital/schema.ts';
import { projectTags, roleLabels } from '../../src/lib/catalog-roles.ts';
import { aiIds, flowIds, flowLabels, sortProjects } from '../../src/lib/digital/catalog.ts';
import { hasRepositoryHistory, activityMonths, countActivity, freshnessCutoff, publicActivityDate, shortDate } from '../../src/lib/digital/activity.ts';
import { assertRepositoryIdentity, verifyMeaningfulCommit } from '../../tools/digital-activity-support.mjs';

const directory = new URL('../../src/content/digital/', import.meta.url);
const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => {
  const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
  return { id: file.slice(0, -3), data: digitalSchema.parse(frontmatter), body: content };
}));
const snapshot = activitySchema.parse(JSON.parse(await readFile(new URL('../../src/data/digital-activity.json', import.meta.url), 'utf8')));
const github = projects.find((p) => snapshot.projects[p.id].kind === 'github')!;
const surfer = projects.find((p) => p.id === 'surfer')!;
const data = () => structuredClone(github.data);
const activity = () => structuredClone(snapshot);
// Point-update support remains tested even when all current Digital entries have monthly history.
const pointActivity = () => ({ ...activity(), projects: { ...snapshot.projects,
  [surfer.id]: { kind: 'public-update' as const, lastPublicUpdateType: 'public-update' as const, lastPublicUpdateAt: '2026-09-04', lastPublicUpdateSource: 'activity' },
} });

test('authored Digital catalog inventory, provenance and snapshot validate together', () => {
  validateCatalog(projects);
  validateActivity(projects, snapshot);
  assert.ok(projects.length > 0);
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  assert.deepEqual(Object.keys(snapshot.projects).sort(), projects.map((p) => p.id).sort());
  assert.equal(freshnessCutoff('2026-09-05'), '2025-09-05');
  for (const p of projects) {
    const record = snapshot.projects[p.id];
    const meaningful = hasRepositoryHistory(record) ? record.lastMeaningfulCommitAt : record.lastPublicUpdateAt;
    assert.ok(meaningful >= freshnessCutoff(snapshot.reviewedAt));
    assert.ok(Object.values(p.data.flow).length > 0);
  }
});

test('Digital has authored project roles while AI development provenance stays separate', () => {
  assert.equal(projects.length, 33);
  assert.ok(!projects.some((p) => p.id === 'ngspice-openvaf-enhancements'));
  const agents = ['coresmith', 'dr-rtl', 'haven', 'spec2cov', 'ucagent', 'verifyrtl'];
  assert.deepEqual(projects.filter((p) => p.data.roles.includes('agent')).map((p) => p.id).sort(), agents);
  for (const p of projects) {
    assert.deepEqual(p.data.roles, [agents.includes(p.id) ? 'agent' : 'eda-tool']);
    assert.deepEqual(projectTags(p.data.roles, p.data.ai === 'ai-built'), [
      ...p.data.roles.map((role) => ({ kind: 'role', label: roleLabels[role] })),
      ...(p.data.ai === 'ai-built' ? [{ kind: 'ai', label: 'AI-built' }] : []),
    ]);
  }
  assert.deepEqual(projects.filter((p) => p.data.ai === 'ai-built').map((p) => p.id).sort(), ['iverilog-uvm', 'uhdm2rtlil', 'vitamin', 'vivado-mcp', 'what', 'xezim']);
  for (const roles of [undefined, [], ['agent', 'agent'], ['simulation'], ['agent', 'benchmark', 'eda-tool']]) {
    assert.equal(digitalSchema.safeParse({ ...data(), roles }).success, false);
  }
  assert.ok(digitalSchema.safeParse({ ...data(), roles: ['agent', 'benchmark'] }).success);
});

test('stable slugs reject ambiguity and duplicate authored entries', () => {
  for (const id of ['Upper', 'with space', '../escape', 'nested/slug', 'x--y', 'x_1', '']) assert.equal(catalogSlug.safeParse(id).success, false);
  assert.throws(() => validateCatalog([...projects, github]), /Duplicate catalog slug/);
  assert.throws(() => validateCatalog([]), /empty/);
});

test('Digital Flow has four stages and accepts only reviewed core/supporting scope', () => {
  assert.deepEqual(flowIds, ['design', 'synthesis', 'verification', 'layout']);
  assert.deepEqual(flowIds.map((id) => flowLabels[id]), ['Design', 'Synthesis', 'Verification', 'Layout']);
  assert.deepEqual(aiIds, ['ai-built', 'ai-enabled', 'traditional']);
  for (const ai of ['ai-assisted', 'ai-native', 'agent-ready', 'unknown']) assert.equal(digitalSchema.safeParse({ ...data(), ai }).success, false);
  for (const flow of [undefined, {}, { design: undefined }, { design: 'planned' }, { design: null }, { simulation: 'core' }, { quality: 'core' }]) {
    assert.equal(digitalSchema.safeParse({ ...data(), flow }).success, false);
  }
  assert.ok(digitalSchema.safeParse({ ...data(), flow: { verification: 'supporting' } }).success);
  for (const removed of ['primary', 'areas', 'keywords', 'summary']) {
    assert.equal(digitalSchema.safeParse({ ...data(), [removed]: {} }).success, false);
  }
});

test('Digital classification follows user-facing operations rather than internal compiler dependencies', () => {
  const scopes = {
    'icarus-verilog': { verification: 'core' }, xezim: { verification: 'core' },
    pono: { verification: 'core' }, surfer: { verification: 'core' },
    openroad: { layout: 'core' },
    slang: { design: 'core', verification: 'supporting' },
    'surelog-uhdm': { design: 'core' },
    'sv-elab': { design: 'supporting', synthesis: 'core' },
    uhdm2rtlil: { synthesis: 'core', verification: 'supporting' },
    circt: { design: 'core', synthesis: 'core', verification: 'supporting' },
    'dr-rtl': { design: 'core', synthesis: 'core', verification: 'core' },
    coresmith: { design: 'core', synthesis: 'core', verification: 'core', layout: 'core' },
  };
  for (const [id, flow] of Object.entries(scopes)) assert.deepEqual(projects.find((p) => p.id === id)!.data.flow, flow, id);
});

test('public text stays English, concise and single-paragraph', () => {
  for (const description of ['', 'TODO', 'A'.repeat(601), 'One paragraph\nAnother paragraph', '回路設計']) {
    assert.equal(digitalSchema.safeParse({ ...data(), description }).success, false);
  }
});

test('sources use valid public URLs, unique IDs and at most one quick-link purpose', () => {
  for (const url of ['javascript:alert(1)', 'ftp://host/file', 'https://example.com', 'https://user:password@github.com/owner/repo', 'not a URL']) {
    const p = data(); p.sources[0].url = url;
    assert.equal(digitalSchema.safeParse(p).success, false);
  }
  const p = data(); p.sources.push({ ...p.sources[0], id: 'duplicate-purpose' });
  assert.equal(digitalSchema.safeParse(p).success, false);
  p.sources.at(-1)!.purpose = undefined; p.sources.at(-1)!.id = p.sources[0].id;
  assert.equal(digitalSchema.safeParse(p).success, false);
});

test('dates are calendar-valid and durable notes retain local provenance without raw URLs or HTML', () => {
  for (const reviewedAt of ['2026-02-29', '2026-13-01', '2026-00-01', 'yesterday', '2026-09-04']) {
    assert.equal(digitalSchema.safeParse({ ...data(), reviewedAt }).success, false);
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
  const dated = pointActivity(); Object.assign(dated.projects[surfer.id], { lastPublicUpdateAt: stale });
  assert.throws(() => validateActivity(projects, dated), /Stale meaningful activity/);
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

test('point updates require sources and cannot silently acquire repository buckets', () => {
  const s = pointActivity();
  assert.doesNotThrow(() => validateActivity(projects, s));
  assert.equal(hasRepositoryHistory(s.projects[surfer.id]), false);
  const band = activityBand(s.projects[surfer.id], s.months, surfer.data.sources);
  assert.equal(band.cells.length, 12);
  assert.equal(band.activeMonths, 1);
  assert.deepEqual(band.cells.filter((cell) => cell.active).map((cell) => cell.month), ['2026-09']);
  assert.equal(band.cells[11].detail, 'September 2026 · public update');
  assert.ok(band.cells.every((cell) => !('commits' in cell)));
  for (const lastPublicUpdateType of [undefined, 'github', 'unknown']) {
    const changed = pointActivity(); Object.assign(changed.projects[surfer.id], { lastPublicUpdateType });
    assert.equal(activitySchema.safeParse(changed).success, false);
  }
  Object.assign(s.projects[surfer.id], { lastPublicUpdateSource: 'missing' });
  assert.throws(() => validateActivity(projects, s), /unknown public update source/);
  Object.assign(s.projects[surfer.id], { commits: Array(12).fill(0) });
  assert.equal(activitySchema.safeParse(s).success, false);
  const missingSource = pointActivity(); delete (missingSource.projects[surfer.id] as any).lastPublicUpdateSource;
  assert.equal(activitySchema.safeParse(missingSource).success, false);
  const changed = projects.map((p) => p.id === surfer.id ? { ...p, data: { ...p.data, sources: p.data.sources.map((source) => source.purpose === 'code' ? { ...source, url: 'https://github.com/mirror/surfer' } : source) } } : p);
  assert.throws(() => validateActivity(changed, pointActivity()), /GitHub Code requires/);
});

test('Surfer uses reviewed canonical GitLab first-parent history without changing its public date', () => {
  const record = snapshot.projects.surfer;
  assert.equal(record.kind, 'repository');
  if (record.kind !== 'repository') throw new Error('Missing reviewed Surfer history');
  assert.equal(hasRepositoryHistory(record), true);
  assert.equal(record.repository, 'https://gitlab.com/surfer-project/surfer');
  assert.equal(record.repositoryId, '42073614');
  assert.equal(record.defaultBranch, 'main');
  assert.equal(record.headSha, 'db1ca915a989860f11c440b0a932b1f5fbce71b2');
  assert.equal(record.lastMeaningfulCommitSha, record.headSha);
  assert.equal(record.lastMeaningfulCommitSource, 'activity');
  assert.equal(publicActivityDate(record), '2026-09-04');
  assert.equal(record.lastMeaningfulCommitAt, '2026-09-04');
  assert.deepEqual(record.commits, [47,51,99,35,66,28,31,40,10,32,17,7]);
  assert.doesNotThrow(() => verifyMeaningfulCommit(record, [[record.headSha, '2026-09-04T11:44:01Z']]));
  const before = pointActivity();
  assert.deepEqual(sortProjects(projects, snapshot.projects).map((p) => p.id), sortProjects(projects, before.projects).map((p) => p.id));
});

test('generic repository records enforce identity, complete monthly history and reviewed provenance', () => {
  for (const change of [
    { repository: 'invalid' }, { repository: 'https://github.com/mirror/surfer' },
    { repository: 'https://gitlab.com/' }, { repository: 'https://gitlab.com/surfer-project/surfer?branch=main' },
    { repositoryId: undefined }, { repositoryId: '' }, { defaultBranch: 'bad..branch' },
    { capturedAt: undefined }, { capturedAt: '2026-08-31T00:00:00Z' }, { capturedAt: '2026-09-06T00:00:00Z' },
    { capturedAt: '2026-09-03T00:00:00Z' }, { commits: undefined }, { commits: [1] },
    { commits: Array(12).fill(-1) }, { commits: Array(12).fill(0.5) }, { commits: Array(12).fill(0) },
    { headSha: 'main' }, { lastMeaningfulCommitSha: undefined }, { lastMeaningfulCommitAt: '2025-09-04' },
    { lastMeaningfulCommitAt: '2026-09-05' }, { lastMeaningfulCommitSource: 'missing' },
    { lastMeaningfulCommitSha: 'a'.repeat(40) },
  ]) {
    const s = activity(); Object.assign(s.projects.surfer, change);
    assert.throws(() => validateActivity(projects, s), JSON.stringify(change));
  }
  for (const source of ['code', 'activity']) {
    const changed = projects.map((p) => p.id === surfer.id ? { ...p, data: { ...p.data, sources: p.data.sources.map((s) => s.id === source ? { ...s, url: 'https://gitlab.com/unrelated/surfer' } : s) } } : p);
    assert.throws(() => validateActivity(changed, snapshot), /verified Code source|primary source/);
  }
  // Manual repositories cannot inherit re-labeled buckets when the refresh window moves.
  const s = activity();
  assert.equal(activitySchema.safeParse({ ...s, reviewedAt: '2026-10-05', capturedAt: '2026-10-05T00:00:00Z', months: activityMonths('2026-10-05') }).success, false);
});

test('ordering uses raw latest public activity, normalized alphabetical ties, then slug without mutating input', () => {
  const input = [{ id: 'z', data: { name: 'Alpha' } }, { id: 'a', data: { name: 'Ａｌｐｈａ' } }, { id: 'recent', data: { name: 'Zed' } }, { id: 'paper', data: { name: 'Beta' } }];
  const values = { z: { kind: 'github' as const, lastCommitAt: '2026-09-01' }, a: { kind: 'github' as const, lastCommitAt: '2026-09-01' }, recent: { kind: 'repository' as const, lastCommitAt: '2026-09-05' }, paper: { kind: 'public-update' as const, lastPublicUpdateType: 'public-update' as const, lastPublicUpdateAt: '2026-09-02' } };
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
  const dir = await mkdtemp(join(tmpdir(), 'digital-history-test-'));
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

test('compact activity dates retain year context without zero-padded days', () => {
  assert.equal(shortDate('2026-09-05', '2026-09-05'), 'Sep 5');
  assert.equal(shortDate('2025-10-01', '2026-09-05'), 'Oct 1, 2025');
});

test('GitHub and GitLab render genuine reviewed counts with equal binary monthly states', () => {
  for (const project of projects) {
    const record = snapshot.projects[project.id], before = structuredClone(record);
    if (!hasRepositoryHistory(record)) continue;
    const band = activityBand(record, snapshot.months, project.data.sources);
    assert.equal(band.date, record.lastCommitAt);
    assert.equal(band.cells.length, 12);
    assert.deepEqual(band.cells.map((cell) => cell.month), snapshot.months);
    assert.deepEqual(band.cells.map((cell) => cell.commits), record.commits);
    assert.deepEqual(band.cells.map((cell) => cell.active), record.commits.map((count) => count > 0));
    assert.equal(band.activeMonths, record.commits.filter((count) => count > 0).length);
    assert.ok(band.cells.every((cell) => cell.signal === 'repository' && cell.detail.endsWith(`${cell.commits} default-branch commits`)));
    assert.ok(band.provenance.includes(record.repository));
    assert.deepEqual(record, before);
  }
});
