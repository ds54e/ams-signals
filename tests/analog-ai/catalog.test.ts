import { test } from 'node:test';
import assert from 'node:assert/strict';
import { projectDetailAnchors, sortProjects } from '../../src/lib/analog-ai/catalog.ts';
import { activityMonths, countActivity, shortDate, type PublicActivity } from '../../src/lib/analog-ai/activity.ts';
import { analogAiSchema, activitySchema, validateCatalog, validateActivity } from '../../src/lib/analog-ai/schema.ts';

const valid = () => ({
  name: 'Sample', roles: ['benchmark'], summary: 'Evaluates circuit structure.', access: 'Requires Python.',
  description: 'Compares netlist connectivity and device ratios against reference circuits.',
  keywords: ['Topology', 'Relative sizing', 'Structural only'], workflow: { 'generate-edit': 'core' },
  addedAt: '2026-09-05', reviewedAt: '2026-09-05',
  sources: [{ id: 'code', title: 'Official code', url: 'https://github.com/levantlabs/circuitrubric-bench', purpose: 'code' }],
});
const entry = () => ({ id: 'sample', data: valid(), body: '### Evaluation\n\nReviewed public material. [Source](#source-code)' });
const snapshot = () => ({
  reviewedAt: '2026-09-05', capturedAt: '2026-09-05T03:00:00Z', method: 'first-parent-committer-utc',
  months: ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'],
  projects: { sample: {
    kind: 'github', repository: 'levantlabs/circuitrubric-bench', defaultBranch: 'main', headSha: 'a'.repeat(40),
    commits: [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0], lastCommitAt: '2026-06-23',
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
    newest: { kind: 'github', lastCommitAt: '2026-09-04' },
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

test('legacy detail IDs survive simplification without treating text or link destinations as IDs', () => {
  const html = '<h3 id="evaluation">Evaluation</h3><a id="ref" href="#source-code">Source</a><a href="https://github.com/">Code</a><code>id="plain"</code>';
  assert.deepEqual(projectDetailAnchors(html, 'project-a'), ['project-a--evaluation', 'project-a--ref']);
  assert.deepEqual(projectDetailAnchors('<p>No heading</p>', 'project-a'), []);
});

test('dashboard descriptions are required, concise, and free of placeholders', () => {
  for (const description of [undefined, '', ' ', 'TODO', 'x'.repeat(601)]) {
    assert.equal(analogAiSchema.safeParse({ ...valid(), description }).success, false);
  }
});

test('catalog schema preserves calendar dates, source protocols, roles and source identities', () => {
  assert.ok(analogAiSchema.safeParse(valid()).success);
  for (const data of [
    { ...valid(), addedAt: '2026-02-30' }, { ...valid(), reviewedAt: '2025-02-29' },
    { ...valid(), roles: [] }, { ...valid(), roles: ['benchmark', 'benchmark'] }, { ...valid(), roles: ['mature'] },
    { ...valid(), sources: [] },
    ...['not a URL', 'javascript:alert(1)', 'ftp://github.com/a'].map((url) => ({ ...valid(), sources: [{ ...valid().sources[0], url }] })),
    { ...valid(), sources: [...valid().sources, { ...valid().sources[0], purpose: 'paper' }] },
    { ...valid(), sources: [...valid().sources, { ...valid().sources[0], id: 'second' }] },
  ]) assert.equal(analogAiSchema.safeParse(data).success, false, JSON.stringify(data));
  assert.ok(analogAiSchema.safeParse({ ...valid(), addedAt: '2024-02-29' }).success);
  assert.ok(analogAiSchema.safeParse({ ...valid(), reviewedAt: '2026-09-04', roles: ['benchmark', 'agent'] }).success);
});

test('catalog rejects placeholders and coupling to factual or editorial records', () => {
  for (const data of [
    { ...valid(), summary: 'TODO: add summary' }, { ...valid(), relatedEvents: ['event-a'] },
    { ...valid(), companies: ['company-a'] }, { ...valid(), people: ['person-a'] }, { ...valid(), confidence: 0.9 },
    ...['https://example.com/paper', 'https://demo.invalid/', 'https://github.com/TODO/project'].map((url) => ({ ...valid(), sources: [{ ...valid().sources[0], url }] })),
  ]) assert.equal(analogAiSchema.safeParse(data).success, false);
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

test('keywords are bounded concise freeform text; workflow accepts only reviewed states and known fields', () => {
  for (const keywords of [[], ['One', 'Two'], ['A', 'B', 'C', 'D', 'E', 'F'], ['One', 'one', 'Three'], ['One', 'Ｏｎｅ', 'Three'], ['One', 'Two', ' '], ['One', 'Two', 'x'.repeat(29)]]) {
    assert.equal(analogAiSchema.safeParse({ ...valid(), keywords }).success, false);
  }
  for (const workflow of [{ reasoning: 'planned' }, { reasoning: false }, { reasoning: null }, { maturity: 'core' }, { physical: 'complete' }]) {
    assert.equal(analogAiSchema.safeParse({ ...valid(), workflow }).success, false);
  }
  assert.ok(analogAiSchema.safeParse({ ...valid(), workflow: {} }).success);
  assert.ok(analogAiSchema.safeParse({ ...valid(), workflow: { reasoning: 'core', physical: 'supporting' } }).success);
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

test('no-repository records have no synthetic zero activity and public dates require a real source', () => {
  const projects = [{ ...entry(), data: { ...valid(), sources: [{ id: 'paper', title: 'Paper', url: 'https://arxiv.org/abs/2607.14165v1', purpose: 'paper' }] } }];
  const record = { kind: 'no-public-repo', lastPublicUpdateAt: '2026-07-15', lastPublicUpdateSource: 'paper' };
  assert.throws(() => validateActivity([entry()], { ...snapshot(), projects: { sample: record } }), /requires a repository activity record/);
  assert.ok(validateActivity(projects, { ...snapshot(), projects: { sample: record } }));
  assert.ok(validateActivity(projects, { ...snapshot(), projects: { sample: { kind: 'no-public-repo' } } }));
  for (const bad of [{ ...record, lastPublicUpdateSource: undefined }, { ...record, commits: Array(12).fill(0) }, { ...record, repository: 'owner/repo' }]) {
    assert.equal(activitySchema.safeParse({ ...snapshot(), projects: { sample: bad } }).success, false);
  }
  assert.throws(() => validateActivity(projects, { ...snapshot(), projects: { sample: { ...record, lastPublicUpdateSource: 'missing' } } }), /unknown public update source/);
});
