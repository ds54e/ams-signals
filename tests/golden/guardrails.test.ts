import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

// Permanent guardrails for the deterministic Golden gates. Phase 1 proved these validators with
// throwaway fault injection; these tests keep the same negative checks under CI.
//
// They invoke the real tools against a synthetic throwaway corpus and must never grow a second
// copy of the validator logic, so a rule deleted from tools/ shows up here as a failure.
const validateScript = fileURLToPath(new URL('../../tools/validate.mjs', import.meta.url));
const factLintScript = fileURLToPath(new URL('../../tools/fact-lint.mjs', import.meta.url));

const run = (script: string, cwd: string) => spawnSync(process.execPath, [script], { cwd, encoding: 'utf8' });

const writeJson = (path: string, value: unknown) => writeFile(path, `${JSON.stringify(value, null, 2)}\n`, 'utf8');

/** Minimal valid Golden corpus in a throwaway directory: one Company and one Event. */
async function goldenFixture() {
  const root = await mkdtemp(join(tmpdir(), 'ams-signals-guardrail-'));
  const companies = join(root, 'src/data/companies');
  const people = join(root, 'src/data/people');
  const events = join(root, 'src/data/events');
  await Promise.all([
    mkdir(companies, { recursive: true }),
    mkdir(people, { recursive: true }),
    mkdir(events, { recursive: true }),
  ]);
  await writeJson(join(companies, 'acme.json'), { id: 'acme', name: 'Acme' });

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
  const eventPath = join(events, `${event.id}.json`);
  await writeJson(eventPath, event);
  return { root, eventPath, event };
}

async function withFixture(body: (fixture: Awaited<ReturnType<typeof goldenFixture>>) => Promise<void>) {
  const fixture = await goldenFixture();
  try {
    await body(fixture);
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
}

test('Golden validator rejects an Event that references an unknown Company', async () => {
  await withFixture(async ({ root, eventPath, event }) => {
    // The pristine fixture passes, so the rejection below is caused by the dangling reference.
    const baseline = run(validateScript, root);
    assert.equal(baseline.status, 0, baseline.stderr);

    await writeJson(eventPath, { ...event, companies: ['missing-company'] });
    const rejected = run(validateScript, root);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /unknown company id missing-company/i);
  });
});

test('Golden fact lint rejects hiring facts that erase job-posting source modality', async () => {
  await withFixture(async ({ root, eventPath, event }) => {
    const baseline = run(factLintScript, root);
    assert.equal(baseline.status, 0, baseline.stderr);

    const hiring = {
      ...event,
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
    await writeJson(eventPath, hiring);
    const rejected = run(factLintScript, root);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /hiring facts should preserve source modality/i);

    // Naming the posting as what the source supports is accepted again.
    await writeJson(eventPath, {
      ...hiring,
      fact: 'Acme posted a role whose description includes SystemVerilog RNM for mixed-signal verification.',
    });
    const accepted = run(factLintScript, root);
    assert.equal(accepted.status, 0, accepted.stderr);
  });
});

test('Golden fact lint rejects inference wording in a factual Event', async () => {
  await withFixture(async ({ root, eventPath, event }) => {
    const baseline = run(factLintScript, root);
    assert.equal(baseline.status, 0, baseline.stderr);

    await writeJson(eventPath, {
      ...event,
      fact: 'This likely demonstrates a company-wide RNM verification strategy.',
    });
    const rejected = run(factLintScript, root);
    assert.notEqual(rejected.status, 0);
    assert.match(rejected.stderr, /inference-like wording/i);
  });
});
