import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { labSchema, activitySchema as labActivitySchema, validateActivity, validateCatalog } from '../../src/lib/lab/schema.ts';
import { activitySchema as digitalActivitySchema } from '../../src/lib/digital/schema.ts';
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

test('catalogs list each canonical implementation once except the reviewed domain pairs', async () => {
  validateCatalog(lab);
  const domains = { analog: await load('analog'), digital: await load('digital'), lab };
  const byCode = new Map<string, string[]>();
  const byRepositoryId = new Map<number, string[]>();
  for (const [domain, entries] of Object.entries(domains)) {
    const activity = domain === 'lab' ? snapshot : JSON.parse(await readFile(new URL(`../../src/data/${domain}-activity.json`, import.meta.url), 'utf8'));
    for (const { id, data } of entries) {
      const url = data.sources.find((source) => source.purpose === 'code')?.url;
      assert(url, `${domain}/${id} needs its canonical implementation`);
      const key = url.replace(/\/+$/u, '').replace(/\.git$/iu, '').toLowerCase();
      const instances = byCode.get(key) ?? [];
      instances.push(`${domain}/${id}`);
      byCode.set(key, instances);
      const record = activity.projects[id];
      if (record?.kind === 'github' && typeof record.repositoryId === 'number') {
        const identities = byRepositoryId.get(record.repositoryId) ?? [];
        identities.push(`${domain}/${id}`);
        byRepositoryId.set(record.repositoryId, identities);
      }
    }
  }
  const duplicates = (index: Map<string | number, string[]>) => [...index.values()].filter((instances) => instances.length > 1)
    .map((instances) => instances.sort()).sort((a, b) => a[0].localeCompare(b[0]));
  const reviewedPairs = [['analog/openada', 'digital/openada'], ['analog/vibe-ic', 'digital/vibe-ic']];
  assert.deepEqual(duplicates(byCode), reviewedPairs);
  // Numeric repository identity also detects renamed or transferred repositories.
  assert.deepEqual(duplicates(byRepositoryId), reviewedPairs);
  assert.equal(Object.keys(validateActivity(lab, snapshot).projects).length, lab.length);
});

test('Lab distinguishes live capture, recorded data and test execution from related operations', () => {
  const scopes = (id: string) => Object.keys(lab.find((p) => p.id === id)!.data.scope)
    .filter((key) => key !== 'aiDevelopment').sort();
  for (const id of ['nptdms', 'rigolwfm', 'tm-data-types']) assert.deepEqual(scopes(id), ['analysis']);
  for (const id of ['openfpgaloader', 'pyocd']) assert.deepEqual(scopes(id), ['control']);
  assert.deepEqual(scopes('litescope'), ['acquisition', 'control']);
  assert.deepEqual(scopes('pyrpl'), ['acquisition', 'analysis', 'control']);
  assert.deepEqual(scopes('stabilizer'), ['acquisition', 'control', 'test']);
  assert.deepEqual(scopes('diode-pcb'), ['design']);
  assert.deepEqual(scopes('kibot'), ['design']);
  // The implemented objective-callback optimization loop selects and executes repeatable trials.
  assert.deepEqual(scopes('gpcam'), ['analysis', 'test']);
  assert.equal(lab.find(({ id }) => id === 'gpcam')!.data.scope.test.ai, true);
  assert.deepEqual(scopes('origen-o2'), ['test']);
  assert.deepEqual(scopes('probe-rs'), ['control', 'test']);
  assert.deepEqual(scopes('pyvisa-sim'), ['test']);
  assert.deepEqual(scopes('multiline-trl-calibration'), ['analysis']);
  assert.deepEqual(scopes('tinytapeout-demo-pcb'), ['design']);
});

test('Lab separates implemented characterization, virtual benches and adaptive procedures from AI development', () => {
  const check = (id: string, expected: Record<string, { ai: boolean }>) => {
    const project = lab.find((p) => p.id === id);
    assert(project, id);
    const { aiDevelopment: _, ...functional } = project.data.scope;
    assert.deepEqual(functional, expected, id);
  };
  const conventional = { ai: false };
  const bench = { control: conventional, acquisition: conventional, analysis: conventional, test: conventional };
  for (const id of ['agentic-web-instrument-control', 'qmi', 'rf-bench', 'open-lab-automation', 'tinysa-ultra-phase-noise', 'laboneq', 'openscope-2c53t']) check(id, bench);
  for (const id of ['gpsdo-pynq-z2', 'openpauw']) check(id, { design: conventional, ...bench });
  check('optimaldesign-jl', { analysis: conventional, test: conventional });
  check('gpcam', { analysis: { ai: true }, test: { ai: true } });
  check('qibocal-mcp', Object.fromEntries(Object.keys(bench).map((stage) => [stage, { ai: true }])));
});

test('Lab Scope stays functional and strict; development provenance requires real source IDs', () => {
  const p = lab.find(({ id }) => id === 'diode-pcb')!.data;
  assert(labSchema.safeParse(p).success);
  // Isolate stage validation from the separate provenance/evidence pairing rule.
  const { developmentEvidence: _, ...plain } = p;
  assert(labSchema.safeParse({ ...plain, scope: { design: { ai: false } } }).success);
  for (const scope of [{}, { board: { ai: false } }, { layout: { ai: false } }, { design: true }, { design: { ai: false, rank: 1 } }]) {
    assert(!labSchema.safeParse({ ...plain, scope }).success);
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

test('strict Digital and Lab captures reject editorial notes outside article metadata', async () => {
  const digital = JSON.parse(await readFile(new URL('../../src/data/digital-activity.json', import.meta.url), 'utf8'));
  for (const [schema, source] of [[labActivitySchema, snapshot], [digitalActivitySchema, digital]] as const) {
    const record = structuredClone(source);
    const id = Object.keys(record.projects).find((id) => record.projects[id].kind === 'github');
    assert(id);
    assert(schema.safeParse(record).success);
    record.projects[id].notes = 'Editorial explanation belongs in the project article.';
    assert.equal(schema.safeParse(record).success, false);
  }
});

test('reviewed canonical KiBot fork exception is bound to exact public repository identity', () => {
  const record = snapshot.projects.kibot;
  const meta = { id: record.repositoryId, full_name: record.repository, default_branch: 'master', private: false, archived: false, fork: true };
  assert.throws(() => assertRepositoryIdentity(record, meta), /identity/);
  assert.doesNotThrow(() => assertRepositoryIdentity(record, meta, { allowFork: true }));
  assert.throws(() => assertRepositoryIdentity(record, { ...meta, id: 1 }, { allowFork: true }), /identity/);
});
