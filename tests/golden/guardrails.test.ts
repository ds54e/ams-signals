import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const validateScript = fileURLToPath(new URL('../../tools/validate.mjs', import.meta.url));
const factLintScript = fileURLToPath(new URL('../../tools/fact-lint.mjs', import.meta.url));

function run(script: string, cwd: string) {
  return spawnSync(process.execPath, [script], { cwd, encoding: 'utf8' });
}

async function writeJson(path: string, value: unknown) {
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function goldenFixture() {
  const root = await mkdtemp(join(tmpdir(), 'ams-signals-golden-'));
  const companyDir = join(root, 'src/data/companies');
  const peopleDir = join(root, 'src/data/people');
  const eventDir = join(root, 'src/data/events');
  await Promise.all([
    mkdir(companyDir, { recursive: true }),
    mkdir(peopleDir, { recursive: true }),
    mkdir(eventDir, { recursive: true }),
  ]);
  await writeJson(join(companyDir, 'acme.json'), { id: 'acme', name: 'Acme' });
  const event = {
    id: 'acme-2026-rnm-demo',
    when: { start: '2026', precision: 'year' },
    kind: 'technical',
    companies: ['acme'],
    people: [],
    headline: 'Acme authors present an RNM verification demonstration',
    fact: 'An Acme-authored presentation describes a SystemVerilog RNM verification demonstration.',
    sources: [{
      title: 'Acme presentation',
      url: 'https://example.org/acme-rnm',
      checkedAt: '2026-09-21',
      summary: 'Public presentation describing an RNM verification demonstration.',
    }],
  };
  const eventPath = join(eventDir, `${event.id}.json`);
  await writeJson(eventPath, event);
  return { root, eventDir, eventPath, event };
}

test('Golden validator rejects references to unknown Companies', async () => {
  const fixture = await goldenFixture();
  try {
    const baseline = run(validateScript, fixture.root);
    assert.equal(baseline.status, 0, baseline.stderr);

    await writeJson(fixture.eventPath, { ...fixture.event, companies: ['missing-company'] });
    const rejected = run(validateScript, fixture.root);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /unknown company id missing-company/i);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('Golden fact lint rejects hiring claims that erase source modality', async () => {
  const fixture = await goldenFixture();
  try {
    const hiring = {
      ...fixture.event,
      kind: 'organizational',
      headline: 'Acme posts a Senior AMS Verification Engineer role',
      fact: 'Acme uses SystemVerilog RNM across mixed-signal verification.',
      sources: [{
        title: 'Acme careers: Senior AMS Verification Engineer',
        url: 'https://jobs.example.org/acme/senior-ams-verification-engineer',
        checkedAt: '2026-09-21',
        summary: 'Acme posted a verification role whose description includes SystemVerilog RNM.',
      }],
    };
    await writeJson(fixture.eventPath, hiring);
    const rejected = run(factLintScript, fixture.root);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /hiring facts should preserve source modality/i);

    await writeJson(fixture.eventPath, {
      ...hiring,
      fact: 'Acme posted a role whose description includes SystemVerilog RNM for mixed-signal verification.',
    });
    const accepted = run(factLintScript, fixture.root);
    assert.equal(accepted.status, 0, accepted.stderr);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});

test('Golden fact lint rejects inference wording in factual Events', async () => {
  const fixture = await goldenFixture();
  try {
    await writeJson(fixture.eventPath, {
      ...fixture.event,
      fact: 'This likely demonstrates a company-wide RNM verification strategy.',
    });
    const rejected = run(factLintScript, fixture.root);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /inference-like wording/i);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
});
