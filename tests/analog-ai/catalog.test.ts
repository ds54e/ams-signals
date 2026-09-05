import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  catalogUrl, matchesProject, namespaceProjectHtml, normalizeSearch,
  parseCatalogUrl, resolveCatalogUrl, sortProjects,
} from '../../src/lib/analog-ai/catalog.ts';
import type { SearchableProject } from '../../src/lib/analog-ai/catalog.ts';
import { analogAiSchema, validateCatalog } from '../../src/lib/analog-ai/schema.ts';

const project: SearchableProject = {
  id: 'sample-ldo', roles: ['benchmark', 'agent'], text: normalizeSearch('Sample LDO ngspice ベンチマーク PVT未評価'),
  anchors: ['sample-ldo--evaluation', 'sample-ldo--source-code'],
};

test('NFKC, Latin case, whitespace and multiple query tokens use AND, including negative descriptions', () => {
  assert.equal(normalizeSearch('  ＬＤＯ　ﾍﾞﾝﾁﾏｰｸ  '), 'ldo ベンチマーク');
  assert.ok(matchesProject(project, { q: ' ＬＤＯ\tNGSPICE ', type: '' }));
  assert.ok(matchesProject(project, { q: 'PVT', type: '' }));
  assert.ok(matchesProject(project, { q: 'ﾍﾞﾝﾁﾏｰｸ', type: '' }));
  assert.ok(!matchesProject(project, { q: 'LDO spectre', type: '' }));
});

test('a multi-role project appears once under either role; search and role combine with AND', () => {
  for (const type of ['', 'agent', 'benchmark'] as const) {
    assert.equal([project].filter((p) => matchesProject(p, { q: 'LDO', type })).length, 1);
  }
  assert.ok(!matchesProject(project, { q: 'LDO', type: 'eda-tool' }));
  assert.ok(!matchesProject(project, { q: 'spectre', type: 'agent' }));
});

test('name order and slug ties are stable, immutable, and independent of review dates', () => {
  const input = [
    { id: 'z', data: { name: 'beta', reviewedAt: '2026-09-05' } },
    { id: 'b', data: { name: 'Alpha', reviewedAt: '2026-09-04' } },
    { id: 'a', data: { name: 'ＡＬＰＨＡ', reviewedAt: '2026-09-01' } },
  ];
  assert.deepEqual(sortProjects(input).map((p) => p.id), ['a', 'b', 'z']);
  assert.deepEqual(input.map((p) => p.id), ['z', 'b', 'a']);
  input[0].data.reviewedAt = '2026-09-06';
  assert.deepEqual(sortProjects(input).map((p) => p.id), ['a', 'b', 'z']);
});

test('URL parsing tolerates unknown types, malformed hashes and arbitrary query text', () => {
  const url = new URL('https://catalog.invalid/ams-signals/analog-ai/?q=%3Cscript%3E&type=__proto__#%E0%A4%A');
  assert.deepEqual(parseCatalogUrl(url), { q: '<script>', type: '', hash: '%E0%A4%A' });
  const next = catalogUrl(url, { q: 'LDO & ngspice', type: 'benchmark' });
  assert.equal(next.pathname, '/ams-signals/analog-ai/');
  assert.equal(next.searchParams.get('q'), 'LDO & ngspice');
  assert.equal(next.hash, '');
  const share = catalogUrl(next, { q: '', type: '' }, 'sample-ldo');
  assert.equal(share.href, 'https://catalog.invalid/ams-signals/analog-ai/#sample-ldo');
});

test('known hashes keep compatible filters and clear incompatible filters without count exceptions', () => {
  const compatible = resolveCatalogUrl(new URL('https://catalog.invalid/?q=ldo&type=agent#sample-ldo'), [project]);
  assert.deepEqual(compatible.state, { q: 'ldo', type: 'agent' });
  assert.equal(compatible.cleared, false);
  const conflict = resolveCatalogUrl(new URL('https://catalog.invalid/?q=spectre&type=eda-tool#sample-ldo'), [project]);
  assert.deepEqual(conflict.state, { q: '', type: '' });
  assert.equal(conflict.cleared, true);
  assert.equal(conflict.url.search, '');
  assert.equal(conflict.url.hash, '#sample-ldo');
  const unknown = resolveCatalogUrl(new URL('https://catalog.invalid/?q=missing#unknown'), [project]);
  assert.equal(unknown.target, undefined);
  assert.equal(unknown.cleared, false);
  assert.equal(unknown.url.hash, '#unknown');
  assert.equal(unknown.state.q, 'missing');
});

test('existing descendant hashes resolve their owner, preserve the target and obey filter conflicts', () => {
  for (const hash of project.anchors!) {
    const compatible = resolveCatalogUrl(new URL(`https://catalog.invalid/?q=ldo&type=agent#${hash}`), [project]);
    assert.equal(compatible.target, project);
    assert.equal(compatible.anchor, hash);
    assert.deepEqual(compatible.state, { q: 'ldo', type: 'agent' });
    assert.equal(compatible.cleared, false);
    const conflict = resolveCatalogUrl(new URL(`https://catalog.invalid/?q=spectre&type=eda-tool#${hash}`), [project]);
    assert.equal(conflict.target, project);
    assert.equal(conflict.cleared, true);
    assert.deepEqual(conflict.state, { q: '', type: '' });
    assert.equal(conflict.url.search, '');
    assert.equal(conflict.url.hash, `#${hash}`);
  }
  for (const hash of ['sample-ldo--missing', 'sample--evaluation', 'sample-ldo-extra--evaluation']) {
    const unknown = resolveCatalogUrl(new URL(`https://catalog.invalid/?q=missing#${hash}`), [project]);
    assert.equal(unknown.target, undefined);
    assert.equal(unknown.anchor, undefined);
    assert.equal(unknown.cleared, false);
    assert.equal(unknown.state.q, 'missing');
    assert.equal(unknown.url.hash, `#${hash}`);
  }
});

test('rendered heading and reference IDs are project-scoped without changing prose or external URLs', () => {
  const html = '<h3 id="評価方法">評価方法</h3><a id="ref" href="#source-code">出典</a><a href="https://github.com/">Code</a><code>id="plain"</code>';
  assert.equal(namespaceProjectHtml(html, 'project-a'), '<h3 id="project-a--評価方法">評価方法</h3><a id="project-a--ref" href="#project-a--source-code">出典</a><a href="https://github.com/">Code</a><code>id="plain"</code>');
});

const valid = () => ({
  name: 'Sample', roles: ['benchmark'], summary: 'Evaluates circuit structure.', access: 'Requires Python.',
  addedAt: '2026-09-05', reviewedAt: '2026-09-05',
  sources: [{ id: 'code', title: 'Official code', url: 'https://github.com/levantlabs/circuitrubric-bench', purpose: 'code' }],
});
const entry = () => ({ id: 'sample', data: valid(), body: '### Evaluation\n\nReviewed public material. [Source](#source-code)' });

test('catalog schema validates dates, source protocols, roles and source identities', () => {
  assert.ok(analogAiSchema.safeParse(valid()).success);
  for (const data of [
    { ...valid(), addedAt: '2026-02-30' },
    { ...valid(), reviewedAt: '2025-02-29' },
    { ...valid(), roles: [] },
    { ...valid(), roles: ['benchmark', 'benchmark'] },
    { ...valid(), roles: ['mature'] },
    { ...valid(), sources: [] },
    { ...valid(), sources: [{ ...valid().sources[0], url: 'not a URL' }] },
    { ...valid(), sources: [{ ...valid().sources[0], url: 'javascript:alert(1)' }] },
    { ...valid(), sources: [{ ...valid().sources[0], url: 'ftp://github.com/a' }] },
    { ...valid(), sources: [...valid().sources, { ...valid().sources[0], purpose: 'paper' }] },
    { ...valid(), sources: [...valid().sources, { ...valid().sources[0], id: 'second' }] },
  ]) assert.equal(analogAiSchema.safeParse(data).success, false, JSON.stringify(data));
  assert.ok(analogAiSchema.safeParse({ ...valid(), addedAt: '2024-02-29' }).success);
  assert.ok(analogAiSchema.safeParse({ ...valid(), reviewedAt: '2026-09-04' }).success);
});

test('catalog rejects placeholder content and coupling to other site records', () => {
  for (const data of [
    { ...valid(), summary: 'TODO: add summary' },
    { ...valid(), relatedEvents: ['event-a'] },
    { ...valid(), companies: ['company-a'] },
    { ...valid(), people: ['person-a'] },
    { ...valid(), confidence: 0.9 },
    { ...valid(), sources: [{ ...valid().sources[0], url: 'https://example.com/paper' }] },
    { ...valid(), sources: [{ ...valid().sources[0], url: 'https://demo.invalid/' }] },
    { ...valid(), sources: [{ ...valid().sources[0], url: 'https://github.com/TODO/project' }] },
  ]) assert.equal(analogAiSchema.safeParse(data).success, false);
  assert.throws(() => validateCatalog([{ ...entry(), body: 'TODO' }], []));
  assert.throws(() => validateCatalog([{ ...entry(), body: '<script>bad</script>' }], []));
  assert.throws(() => validateCatalog([{ ...entry(), body: 'https://example.com' }], []));
  assert.throws(() => validateCatalog([{ ...entry(), body: '[Source](#source-missing)' }], []), /unknown source reference/);
});

test('stable slugs and bounded updates validate independently; re-review needs no update note', () => {
  assert.deepEqual(validateCatalog([entry()], []), []);
  assert.deepEqual(validateCatalog([{ ...entry(), data: { ...valid(), reviewedAt: '2026-09-06' } }], []), []);
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
