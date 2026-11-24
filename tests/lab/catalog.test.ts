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

test('Lab entries use unique canonical implementations not already listed in Analog or Digital', async () => {
  validateCatalog(lab);
  const canonical = (p) => p.data.sources.find((s) => s.purpose === 'code')?.url.replace(/\/$/, '').toLowerCase();
  const other = new Set((await Promise.all(['analog', 'digital'].map(load))).flat().map(canonical));
  const keys = lab.map(canonical);
  assert.equal(new Set(keys).size, lab.length);
  for (const key of keys) assert(key && !other.has(key), key);
  assert.equal(Object.keys(validateActivity(lab, snapshot).projects).length, lab.length);
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
