import { test } from 'node:test';
import { activityBand } from '../../src/lib/catalog-activity-band.ts';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { projectTags, roleLabels } from '../../src/lib/catalog-roles.ts';
import { flowIds, flowLabels, sortProjects } from '../../src/lib/analog/catalog.ts';
import { hasRepositoryHistory, activityMonths, countActivity, freshnessCutoff, shortDate, type PublicActivity } from '../../src/lib/analog/activity.ts';
import { analogSchema, activitySchema, validateCatalog, validateActivity } from '../../src/lib/analog/schema.ts';

const valid = () => ({
  name: 'Sample', roles: ['benchmark'], summary: 'Evaluates circuit structure.', access: 'Requires Python.',
  description: 'Compares netlist connectivity and device ratios against reference circuits.',
  flow: { design: 'core' },
  addedAt: '2026-09-05', reviewedAt: '2026-09-05',
  sources: [{ id: 'code', title: 'Official code', url: 'https://github.com/levantlabs/circuitrubric-bench', purpose: 'code' }],
});
const entry = () => ({ id: 'sample', data: valid(), body: '### Evaluation\n\nReviewed public material. [Source](#source-code)' });
const snapshot = () => ({
  reviewedAt: '2026-09-05', capturedAt: '2026-09-05T03:00:00Z', method: 'first-parent-committer-utc',
  months: ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'],
  projects: { sample: {
    kind: 'github', repository: 'levantlabs/circuitrubric-bench', defaultBranch: 'main', headSha: 'a'.repeat(40),
    commits: [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0], lastCommitAt: '2026-06-23', lastMeaningfulCommitAt: '2026-06-23',
  } },
});

test('public activity sorts newest first, using paper dates and deterministic name/slug ties', () => {
  const input = [
    { id: 'old', data: { name: 'Aardvark', reviewedAt: '2026-09-05' } },
    { id: 'b', data: { name: 'Alpha', reviewedAt: '2026-09-01' } },
    { id: 'unknown', data: { name: 'First alphabetically' } },
    { id: 'paper', data: { name: 'Zeta' } },
    { id: 'a', data: { name: 'ＡＬＰＨＡ' } },
    { id: 'beta', data: { name: 'Beta' } },
    { id: 'newest', data: { name: 'Zebra' } },
  ];
  const activity: Record<string, PublicActivity> = {
    old: { kind: 'github', lastCommitAt: '2025-12-31' },
    a: { kind: 'github', lastCommitAt: '2026-08-20' },
    b: { kind: 'no-public-repo', lastPublicUpdateAt: '2026-08-20' },
    beta: { kind: 'github', lastCommitAt: '2026-08-20' },
    paper: { kind: 'no-public-repo', lastPublicUpdateAt: '2026-09-01' },
    unknown: { kind: 'no-public-repo' },
    newest: { kind: 'repository', lastCommitAt: '2026-09-04' },
  };
  const before = structuredClone(input);
  const expected = ['newest', 'paper', 'a', 'b', 'beta', 'old', 'unknown'];
  assert.deepEqual(sortProjects(input, activity).map((p) => p.id), expected);
  assert.deepEqual(input, before);
  assert.deepEqual(sortProjects([...input].reverse(), activity).map((p) => p.id), expected);
  input[0].data.reviewedAt = '2026-10-01';
  assert.deepEqual(sortProjects(input, activity).map((p) => p.id), expected);
  activity.old = { kind: 'github', lastCommitAt: '2026-09-05' };
  assert.equal(sortProjects(input, activity)[0].id, 'old');
});

test('dashboard descriptions are required, concise, and free of placeholders', () => {
  for (const description of [undefined, '', ' ', 'TODO', 'x'.repeat(601)]) {
    assert.equal(analogSchema.safeParse({ ...valid(), description }).success, false);
  }
});

test('catalog schema preserves calendar dates, source protocols, roles and source identities', () => {
  assert.ok(analogSchema.safeParse(valid()).success);
  for (const data of [
    { ...valid(), addedAt: '2026-02-30' }, { ...valid(), reviewedAt: '2025-02-29' },
    { ...valid(), roles: [] }, { ...valid(), roles: ['benchmark', 'benchmark'] }, { ...valid(), roles: ['mature'] },
    { ...valid(), roles: ['agent', 'benchmark', 'eda-tool'] },
    { ...valid(), sources: [] },
    ...['not a URL', 'javascript:alert(1)', 'ftp://github.com/a'].map((url) => ({ ...valid(), sources: [{ ...valid().sources[0], url }] })),
    { ...valid(), sources: [...valid().sources, { ...valid().sources[0], purpose: 'paper' }] },
    { ...valid(), sources: [...valid().sources, { ...valid().sources[0], id: 'second' }] },
  ]) assert.equal(analogSchema.safeParse(data).success, false, JSON.stringify(data));
  assert.ok(analogSchema.safeParse({ ...valid(), addedAt: '2024-02-29' }).success);
  assert.ok(analogSchema.safeParse({ ...valid(), reviewedAt: '2026-09-04', roles: ['benchmark', 'agent'] }).success);
});

test('shared public tags preserve authored role order and narrowly opt into AI-built provenance', () => {
  assert.equal(roleLabels.agent, 'Agent');
  const input = ['agent', 'benchmark'] as const;
  assert.deepEqual(projectTags(input), [{ kind: 'role', label: 'Agent' }, { kind: 'role', label: 'Benchmark' }]);
  assert.deepEqual(input, ['agent', 'benchmark']);
  assert.deepEqual(projectTags(['benchmark', 'dataset-environment']), [
    { kind: 'role', label: 'Benchmark' }, { kind: 'role', label: 'Dataset & Environment' },
  ]);
  assert.deepEqual(projectTags(['eda-tool']), [{ kind: 'role', label: 'EDA Tool' }]);
  assert.deepEqual(projectTags(['eda-tool'], true), [{ kind: 'role', label: 'EDA Tool' }, { kind: 'ai', label: 'AI-built' }]);
  assert.ok(analogSchema.safeParse({ ...valid(), aiBuilt: true }).success);
  for (const aiBuilt of [false, 'true', 'ai-built', 'traditional']) {
    assert.equal(analogSchema.safeParse({ ...valid(), aiBuilt }).success, false);
  }
  assert.equal(analogSchema.safeParse({ ...valid(), ai: 'ai-enabled' }).success, false);
});

test('Analog domain membership, baseline scopes and moved provenance validate as one reviewed population', async () => {
  const directory = new URL('../../src/content/analog/', import.meta.url);
  const projects = await Promise.all((await readdir(directory)).filter((file) => file.endsWith('.md')).map(async (file) => {
    const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, directory), 'utf8'));
    return { id: file.slice(0, -3), data: analogSchema.parse(frontmatter), body: content };
  }));
  const activity = JSON.parse(await readFile(new URL('../../src/data/analog-activity.json', import.meta.url), 'utf8'));
  validateCatalog(projects, []); validateActivity(projects, activity);
  assert.equal(projects.length, 35);
  const baselines = {
    ngspice: { simulation: 'core' }, xyce: { simulation: 'core' },
    xschem: { design: 'core', simulation: 'supporting' },
    'openvaf-reloaded': { simulation: 'supporting' },
    klayout: { layout: 'core' }, magic: { layout: 'core' },
    align: { design: 'supporting', layout: 'core' },
  };
  for (const [id, flow] of Object.entries(baselines)) {
    const project = projects.find((p) => p.id === id)!;
    assert.ok(project, id); assert.deepEqual(project.data.flow, flow);
    assert.deepEqual(project.data.roles, ['eda-tool']);
    assert.equal(project.data.aiBuilt, undefined);
    if (id !== 'ngspice') {
      assert.equal(typeof activity.projects[id].repositoryId, 'number');
      assert.match(activity.projects[id].lastMeaningfulCommitSha, /^[a-f0-9]{40}$/);
    }
  }
  const moved = 'ngspice-openvaf-enhancements';
  assert.deepEqual(projects.filter((p) => p.data.aiBuilt).map((p) => p.id), [moved]);
  assert.deepEqual(projects.find((p) => p.id === moved)!.data.flow, { simulation: 'core' });
  assert.equal(activity.projects[moved].repository, 'javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements');
  assert.equal(typeof activity.projects[moved].repositoryId, 'number');
  assert.match(activity.projects[moved].lastMeaningfulCommitSha, /^[a-f0-9]{40}$/);
  const digital = await readdir(new URL('../../src/content/digital/', import.meta.url));
  assert.ok(!digital.includes(`${moved}.md`));
  const digitalActivity = JSON.parse(await readFile(new URL('../../src/data/digital-activity.json', import.meta.url), 'utf8'));
  assert.ok(!(moved in digitalActivity.projects));
  assert.equal(activity.projects.ngspice.kind, 'no-public-repo');
  assert.equal(activity.projects.ngspice.lastPublicUpdateAt, '2026-08-11');
  assert.ok(!('commits' in activity.projects.ngspice));
  const code = projects.find((p) => p.id === 'ngspice')!.data.sources.find((s) => s.purpose === 'code')!;
  assert.equal(new URL(code.url).hostname, 'sourceforge.net');
});

test('optional pinned activity evidence preserves transferred identity and requires its source', () => {
  const s = snapshot();
  const record = { ...s.projects.sample, repositoryId: 123, lastMeaningfulCommitSha: 'b'.repeat(40) };
  const value = { ...s, projects: { sample: record } };
  assert.throws(() => validateActivity([entry()], value), /meaningful commit requires/);
  const sample = entry();
  const project = { ...sample, data: { ...sample.data, sources: [...sample.data.sources, {
    id: 'activity', title: 'Substantive commit', url: `https://github.com/${record.repository}/commit/${record.lastMeaningfulCommitSha}`,
  }] } };
  assert.ok(validateActivity([project], value));
  for (const change of [{ repositoryId: -1 }, { repositoryId: 0.5 }, { lastMeaningfulCommitSha: 'branch' }, { lastMeaningfulCommitAt: '2026-05-01' }]) {
    assert.equal(activitySchema.safeParse({ ...s, projects: { sample: { ...record, ...change } } }).success, false);
  }
});

test('Analog Flow distinguishes design tasks, central evaluation, optional feedback and layout primitives', async () => {
  const scopes = {
    analogsage: { design: 'core', simulation: 'supporting' },
    autosizer: { design: 'core', simulation: 'core' },
    analoggym: { design: 'core', simulation: 'core' },
    panda: { design: 'core', simulation: 'core', layout: 'core' },
    eeschematic: { design: 'core' }, circuitrubric: { design: 'core' },
    'razavi-bench': { design: 'core', simulation: 'supporting' },
    'virtuoso-agent': { design: 'core', simulation: 'core' },
    'virtuoso-bridge-lite': { design: 'core', simulation: 'core', layout: 'supporting' },
    vcli: { design: 'core', simulation: 'core', layout: 'supporting' },
    zerosim: { simulation: 'core' }, evas: { simulation: 'core' },
  };
  for (const [id, flow] of Object.entries(scopes)) {
    const { frontmatter } = parseFrontmatter(await readFile(new URL(`../../src/content/analog/${id}.md`, import.meta.url), 'utf8'));
    assert.deepEqual(analogSchema.parse(frontmatter).flow, flow, id);
  }
});

test('catalog rejects placeholders and coupling to factual or editorial records', () => {
  for (const data of [
    { ...valid(), summary: 'TODO: add summary' }, { ...valid(), relatedEvents: ['event-a'] },
    { ...valid(), companies: ['company-a'] }, { ...valid(), people: ['person-a'] }, { ...valid(), confidence: 0.9 },
    ...['https://example.com/paper', 'https://demo.invalid/', 'https://github.com/TODO/project'].map((url) => ({ ...valid(), sources: [{ ...valid().sources[0], url }] })),
  ]) assert.equal(analogSchema.safeParse(data).success, false);
  for (const body of ['TODO', '<script>bad</script>', 'https://example.com']) assert.throws(() => validateCatalog([{ ...entry(), body }], []));
  assert.throws(() => validateCatalog([{ ...entry(), body: '[Source](#source-missing)' }], []), /unknown source reference/);
});

test('stable slugs and bounded updates validate independently of re-review', () => {
  assert.deepEqual(validateCatalog([entry()], []), []);
  assert.throws(() => validateCatalog([entry(), entry()], []), /Duplicate catalog slug/);
  assert.throws(() => validateCatalog([{ ...entry(), id: 'Sample_Name' }], []));
  const update = { project: 'sample', date: '2026-09-05', kind: 'added', summary: 'Initial entry' };
  assert.deepEqual(validateCatalog([entry()], [update]), [update]);
  assert.throws(() => validateCatalog([entry()], [{ ...update, project: 'absent' }]), /Unknown catalog update project/);
  assert.throws(() => validateCatalog([entry()], [{ ...update, date: '2026-13-01' }]));
  assert.throws(() => validateCatalog([entry()], Array(4).fill(update)));
  assert.throws(() => validateCatalog([], [update]));
  assert.deepEqual(validateCatalog([], []), []);
});

test('Analog Flow has only three stages, reviewed states and at least one meaningful scope', () => {
  assert.deepEqual(flowIds, ['design', 'simulation', 'layout']);
  assert.deepEqual(flowIds.map((id) => flowLabels[id]), ['Design', 'Simulation', 'Layout']);
  for (const flow of [undefined, {}, { design: undefined }, { design: 'planned' }, { design: false }, { design: null }, { quality: 'core' }, { verification: 'core' }]) {
    assert.equal(analogSchema.safeParse({ ...valid(), flow }).success, false);
  }
  assert.ok(analogSchema.safeParse({ ...valid(), flow: { simulation: 'supporting' } }).success);
  assert.ok(analogSchema.safeParse({ ...valid(), flow: { design: 'core', layout: 'supporting' } }).success);
  for (const removed of ['keywords', 'workflow']) {
    assert.equal(analogSchema.safeParse({ ...valid(), [removed]: {} }).success, false);
  }
});

test('activity uses exactly twelve consecutive calendar months ending at the snapshot month', () => {
  assert.deepEqual(activityMonths('2026-09-05'), snapshot().months);
  assert.deepEqual(activityMonths('2024-02-29').slice(-3), ['2023-12', '2024-01', '2024-02']);
  assert.ok(activitySchema.safeParse(snapshot()).success);
  for (const months of [snapshot().months.slice(1), [...snapshot().months].reverse(), Array(12).fill('2026-09'), [...snapshot().months.slice(0, 11), '2026-13']]) {
    assert.equal(activitySchema.safeParse({ ...snapshot(), months }).success, false);
  }
});

test('activity counting uses UTC committer dates and retains an old latest date', () => {
  const result = countActivity(['2025-09-30T23:30:00-02:00', '2026-08-31T23:45:00-01:00', '2026-09-04T12:00:00Z'], '2026-09-05T03:00:00Z');
  assert.deepEqual(result.commits, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2]);
  assert.equal(result.lastCommitAt, '2026-09-04');
  assert.deepEqual(countActivity(['2024-02-29T01:00:00Z'], '2026-09-05T03:00:00Z'), { commits: Array(12).fill(0), lastCommitAt: '2024-02-29' });
  for (const dates of [[], ['invalid'], ['2026-09-05T04:00:00Z']]) assert.throws(() => countActivity(dates, '2026-09-05T03:00:00Z'));
  assert.match(shortDate('2025-06-18', '2026-09-05'), /2025/);
});

test('activity validates identities, refs, timestamps, nonnegative integer counts, and last-date consistency', () => {
  const good = snapshot().projects.sample;
  for (const record of [
    { ...good, commits: [] }, ...[-1, 1.5, NaN, Infinity].map((count) => ({ ...good, commits: [count, ...good.commits.slice(1)] })),
    { ...good, repository: 'missing-owner' }, { ...good, repository: 'owner/..' }, { ...good, headSha: 'branch-name' },
    ...['', '-main', 'foo..bar', 'foo/bar.lock', 'a b', 'main@{1}'].map((defaultBranch) => ({ ...good, defaultBranch })),
    { ...good, lastCommitAt: '2026-02-30' }, { ...good, lastCommitAt: '2026-09-06' },
    { ...good, lastMeaningfulCommitAt: undefined }, { ...good, lastMeaningfulCommitAt: '2026-02-30' },
    { ...good, lastMeaningfulCommitAt: '2026-06-24' },
    { ...good, lastCommitAt: '2026-05-01' }, { ...good, lastCommitAt: '2026-08-01' }, { ...good, score: 99 },
  ]) assert.equal(activitySchema.safeParse({ ...snapshot(), projects: { sample: record } }).success, false, JSON.stringify(record));
  for (const override of [{ reviewedAt: '2026-02-30' }, { capturedAt: 'invalid' }, { capturedAt: '2026-09-06T00:00:00Z' }, { method: 'all-refs' }]) {
    assert.equal(activitySchema.safeParse({ ...snapshot(), ...override }).success, false);
  }
});

test('each activity record belongs to one authored project and its verified Code repository', () => {
  assert.deepEqual(validateActivity([entry()], snapshot()), snapshot());
  assert.throws(() => validateActivity([entry()], { ...snapshot(), projects: {} }), /Missing activity project/);
  assert.throws(() => validateActivity([], snapshot()), /Unknown activity project/);
  const unrelated = { ...snapshot(), projects: { sample: { ...snapshot().projects.sample, repository: 'other/repo' } } };
  assert.throws(() => validateActivity([entry()], unrelated), /verified Code source/);
});

test('point records require reviewed provenance and never store fabricated repository counts', () => {
  const projects = [{ ...entry(), data: { ...valid(), sources: [{ id: 'paper', title: 'Paper', url: 'https://arxiv.org/abs/2607.14165v1', purpose: 'paper' }] } }];
  const record = { kind: 'no-public-repo', lastPublicUpdateType: 'paper', lastPublicUpdateAt: '2026-07-15', lastPublicUpdateSource: 'paper' };
  assert.equal(hasRepositoryHistory(record), false);
  assert.throws(() => validateActivity([entry()], { ...snapshot(), projects: { sample: record } }), /requires a repository activity record/);
  assert.ok(validateActivity(projects, { ...snapshot(), projects: { sample: record } }));
  assert.throws(() => validateActivity(projects, { ...snapshot(), projects: { sample: { kind: 'no-public-repo', lastPublicUpdateType: 'public-update' } } }), /requires verified meaningful activity/);
  for (const bad of [{ ...record, lastPublicUpdateType: undefined }, { ...record, lastPublicUpdateType: 'commits' }, { ...record, lastPublicUpdateSource: undefined }, { ...record, commits: Array(12).fill(0) }, { ...record, repository: 'owner/repo' }]) {
    assert.equal(activitySchema.safeParse({ ...snapshot(), projects: { sample: bad } }).success, false);
  }
  assert.throws(() => validateActivity(projects, { ...snapshot(), projects: { sample: { ...record, lastPublicUpdateSource: 'missing' } } }), /unknown public update source/);
});

test('reviewed monthly repository records work across hosts and retain strict identity and freshness checks', () => {
  // Synthetic fixtures exercise the same contract for different hosting platforms.
  for (const repository of ['https://gitlab.com/group/subgroup/tool', 'https://codeberg.org/group/tool']) {
    const record = { ...snapshot().projects.sample, kind: 'repository', repository, repositoryId: '123',
      capturedAt: '2026-09-05T04:00:00Z', lastMeaningfulCommitSha: 'b'.repeat(40), lastMeaningfulCommitSource: 'activity',
    };
    const sample = { ...entry(), data: { ...valid(), sources: [
      { id: 'code', title: 'Canonical repository', url: repository, purpose: 'code' },
      { id: 'activity', title: 'Reviewed implementation commit', url: `${repository}/commit/${record.lastMeaningfulCommitSha}` },
    ] } };
    const value = { ...snapshot(), projects: { sample: record } };
    assert.ok(validateActivity([sample], value));
    assert.equal(hasRepositoryHistory(record), true);
    for (const change of [
      { repositoryId: undefined }, { repository: 'https://github.com/mirror/tool' }, { capturedAt: undefined },
      { capturedAt: '2026-08-31T00:00:00Z' }, { lastMeaningfulCommitAt: '2025-09-04' },
      { commits: [] }, { commits: Array(12).fill(0) }, { lastMeaningfulCommitSha: undefined },
      { lastMeaningfulCommitSource: 'missing' }, { lastMeaningfulCommitSha: 'c'.repeat(40) },
    ]) assert.throws(() => validateActivity([sample], { ...value, projects: { sample: { ...record, ...change } } }));
    const wrongSource = { ...sample, data: { ...sample.data, sources: sample.data.sources.map((s) => s.purpose === 'code' ? { ...s, url: 'https://gitlab.com/unrelated/tool' } : s) } };
    assert.throws(() => validateActivity([wrongSource], value), /verified Code source/);
  }
});

test('rolling freshness uses an inclusive date boundary, not the twelve calendar-month buckets', () => {
  assert.equal(freshnessCutoff('2026-09-05'), '2025-09-05');
  assert.equal(freshnessCutoff('2024-02-29'), '2023-02-28');
  assert.equal(freshnessCutoff('2025-03-01'), '2024-03-01');
  const record = { ...snapshot().projects.sample, commits: Array(12).fill(0), lastCommitAt: '2025-09-05', lastMeaningfulCommitAt: '2025-09-05' };
  assert.ok(validateActivity([entry()], { ...snapshot(), projects: { sample: record } }));
  assert.throws(() => validateActivity([entry()], { ...snapshot(), projects: { sample: { ...record, lastCommitAt: '2025-09-04', lastMeaningfulCommitAt: '2025-09-04' } } }), /on or after 2025-09-05/);
  // A recent cosmetic/bot commit may affect ordering, but cannot rescue a stale project.
  assert.throws(() => validateActivity([entry()], { ...snapshot(), projects: { sample: { ...snapshot().projects.sample, lastMeaningfulCommitAt: '2025-09-04' } } }), /requires verified meaningful activity/);
  const paper = { ...entry(), data: { ...valid(), sources: [{ id: 'paper', title: 'Paper', url: 'https://arxiv.org/abs/2607.14165v1', purpose: 'paper' }] } };
  const publicUpdate = { kind: 'no-public-repo', lastPublicUpdateType: 'paper', lastPublicUpdateAt: '2025-09-05', lastPublicUpdateSource: 'paper' };
  assert.ok(validateActivity([paper], { ...snapshot(), projects: { sample: publicUpdate } }));
  assert.throws(() => validateActivity([paper], { ...snapshot(), projects: { sample: { ...publicUpdate, lastPublicUpdateAt: '2025-09-04' } } }), /requires verified meaningful activity/);
  // Advancing the snapshot requires curation even if no source files changed.
  assert.throws(() => validateActivity([paper], { ...snapshot(), reviewedAt: '2026-09-06', capturedAt: '2026-09-06T03:00:00Z', projects: { sample: publicUpdate } }), /on or after 2025-09-06/);
});

test('compact activity dates retain year context without zero-padded days', () => {
  assert.equal(shortDate('2026-09-05', '2026-09-05'), 'Sep 5');
  assert.equal(shortDate('2025-10-01', '2026-09-05'), 'Oct 1, 2025');
});

test('ATLAS paper and ngspice release occupy their reviewed month without invented commit data', async () => {
  const snapshot = activitySchema.parse(JSON.parse(await readFile(new URL('../../src/data/analog-activity.json', import.meta.url), 'utf8')));
  for (const [id, date, type, label] of [
    ['atlas', '2026-07-15', 'paper', 'paper publication'],
    ['ngspice', '2026-08-11', 'release', 'release'],
  ]) {
    const { frontmatter } = parseFrontmatter(await readFile(new URL(`../../src/content/analog/${id}.md`, import.meta.url), 'utf8'));
    const data = analogSchema.parse(frontmatter);
    const record = snapshot.projects[id], before = structuredClone(record);
    const band = activityBand(record, snapshot.months, data.sources);
    assert.equal(record.kind, 'no-public-repo');
    assert.equal(band.date, date);
    assert.equal(band.cells.length, 12);
    assert.equal(band.activeMonths, 1);
    assert.deepEqual(band.cells.filter((cell) => cell.active).map((cell) => cell.month), [date.slice(0, 7)]);
    for (const cell of band.cells) {
      assert.equal(cell.signal, type);
      assert.ok(!('commits' in cell));
      assert.ok(!cell.detail.includes('commits'));
      assert.ok(cell.detail.endsWith(cell.active ? label : 'no reviewed public activity signal'));
      assert.equal(cell.source, cell.active ? (record as any).lastPublicUpdateSource : undefined);
    }
    assert.ok(band.provenance.startsWith(label + ':'));
    assert.deepEqual(record, before);
    assert.ok(!('commits' in record));
  }
});

test('point-signal bands retain calendar boundaries without clamping or changing freshness eligibility', () => {
  const months = snapshot().months;
  const sources = [{ id: 'update', title: 'Reviewed public update' }];
  for (const lastPublicUpdateAt of ['2025-09-05', '2025-10-01', '2026-09-05']) {
    const record = { kind: 'public-update' as const, lastPublicUpdateType: 'public-update' as const,
      lastPublicUpdateAt, lastPublicUpdateSource: 'update' };
    const band = activityBand(record, months, sources);
    const expected = months.includes(lastPublicUpdateAt.slice(0, 7)) ? [lastPublicUpdateAt.slice(0, 7)] : [];
    assert.equal(band.cells.length, 12);
    assert.deepEqual(band.cells.filter((cell) => cell.active).map((cell) => cell.month), expected);
    assert.equal(band.activeMonths, expected.length);
    assert.ok(band.cells.every((cell) => !('commits' in cell)));
    assert.equal(band.date, lastPublicUpdateAt);
  }
});
