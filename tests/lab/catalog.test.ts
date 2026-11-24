import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { labSchema, validateActivity, validateCatalog } from '../../src/lib/lab/schema.ts';
import { assertRepositoryIdentity } from '../../tools/strict-activity-support.mjs';

const root = new URL('../../src/content/', import.meta.url);
async function load(domain: string) {
  const base = new URL(domain + '/', root);
  const files = (await readdir(base)).filter((file) => file.endsWith('.md'));
  return Promise.all(files.map(async (file) => {
    const { frontmatter, content } = parseFrontmatter(await readFile(new URL(file, base), 'utf8'));
    return { id: file.slice(0, -3), data: frontmatter, body: content };
  }));
}

const lab = await load('lab');
const snapshot = JSON.parse(await readFile(new URL('../../src/data/lab-activity.json', import.meta.url), 'utf8'));

test('catalogs list each canonical implementation once except the reviewed Vibe-IC pair', async () => {
  validateCatalog(lab);
  const domains = { analog: await load('analog'), digital: await load('digital'), lab };
  const byCode = new Map<string, string[]>();
  for (const [domain, entries] of Object.entries(domains)) {
    for (const { id, data } of entries) {
      const url = data.sources.find((source) => source.purpose === 'code')?.url;
      assert(url, `${domain}/${id} needs its canonical implementation`);
      const key = url.replace(/\/+$/u, '').replace(/\.git$/iu, '').toLowerCase();
      const instances = byCode.get(key) ?? [];
      instances.push(`${domain}/${id}`);
      byCode.set(key, instances);
    }
  }
  assert.deepEqual([...byCode.values()].filter((instances) => instances.length > 1),
    [['analog/vibe-ic', 'digital/vibe-ic']]);
  assert.equal(Object.keys(validateActivity(lab, snapshot).projects).length, lab.length);
});

test('Lab distinguishes live capture, recorded data and test execution from related operations', () => {
  const scopes = (id: string) => Object.keys(lab.find((p) => p.id === id)!.data.scope)
    .filter((key) => key !== 'aiDevelopment').sort();
  for (const id of ['nptdms', 'rigolwfm', 'tm-data-types']) assert.deepEqual(scopes(id), ['analysis']);
  for (const id of ['openfpgaloader', 'pyocd']) assert.deepEqual(scopes(id), ['control']);
  assert.deepEqual(scopes('litescope'), ['acquisition', 'control']);
  assert.deepEqual(scopes('probe-rs'), ['control', 'test']);
  assert.deepEqual(scopes('pyvisa-sim'), ['test']);
});

test('Lab Scope stays functional and strict; development provenance requires real source IDs', () => {
  const p = lab.find(({ id }) => id === 'interactive-html-bom')!.data;
  assert(labSchema.safeParse(p).success);
  for (const scope of [{}, { design: { ai: false } }, { board: true }, { board: { ai: false, rank: 1 } }]) {
    assert(!labSchema.safeParse({ ...p, scope }).success);
  }
  assert(!labSchema.safeParse({ ...p, developmentEvidence: { ...p.developmentEvidence, sources: ['missing'] } }).success);
  assert(!labSchema.safeParse({ ...p, status: 'draft' }).success);
  assert.throws(() => validateCatalog([{ ...lab[0], body: '[Broken](#source-not-authored)' }]), /unknown source reference/);
});

test('Lab activity keeps unknown captures distinct from zero and rejects bad registration', () => {
  const project = lab.find(({ id }) => id === 'qcodes')!;
  const { projects: _, ...base } = snapshot;
  const attemptedAt = base.capturedAt;
  const pending = { kind: 'unfetched', repository: 'microsoft/Qcodes', attemptedAt };
  const withRecord = (record) => ({ ...base, projects: { qcodes: record } });
  assert.equal(validateActivity([project], withRecord(pending)).projects.qcodes.kind, 'unfetched');
  assert.throws(() => validateActivity([project], withRecord({ ...pending, commits: Array(12).fill(0) })), /Unrecognized key/);
  assert.throws(() => validateActivity([project], withRecord({ ...pending, repository: 'QCoDeS/Qcodes' })), /must match/);
  assert.throws(() => validateActivity([project], { ...base, projects: {} }), /Missing activity/);
  const record = snapshot.projects.qcodes;
  assert.throws(() => validateActivity([project], withRecord({ ...record, commits: Array(12).fill(0) })), /Commit buckets disagree/);
});

test('reviewed canonical KiBot fork exception is bound to exact public repository identity', () => {
  const record = snapshot.projects.kibot;
  const meta = { id: record.repositoryId, full_name: record.repository, default_branch: 'master', private: false, archived: false, fork: true };
  assert.throws(() => assertRepositoryIdentity(record, meta), /identity/);
  assert.doesNotThrow(() => assertRepositoryIdentity(record, meta, { allowFork: true }));
  assert.throws(() => assertRepositoryIdentity(record, { ...meta, id: 1 }, { allowFork: true }), /identity/);
});
