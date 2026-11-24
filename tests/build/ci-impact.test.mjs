import assert from 'node:assert/strict';
import { test } from 'node:test';
import { coreOnlyForBase, isContentOnly } from '../../tools/ci-impact.mjs';

const data = [
  'src/content/analog/ngspice.md',
  'src/content/digital/xezim.md',
  'src/content/lab/example.md',
  'src/data/events/example.json',
  'src/data/companies/example.json',
  'src/data/people/example.json',
  'src/data/analog-activity.json',
  'src/data/digital-activity.json',
  'src/data/lab-activity.json',
];

test('only known factual data and catalog records qualify for core regression', () => {
  assert.equal(isContentOnly(data), true);
  assert.equal(isContentOnly([]), false);
  for (const path of [
    'src/content.config.ts', 'src/content/analog/AGENTS.md',
    'src/content/analog/subdir/example.md', 'src/data/events/README.md',
    'src/scripts/catalog.ts', 'src/pages/index.astro', 'src/styles/global.css',
    'package-lock.json', '.github/workflows/ci.yml', 'docs/TESTING.md',
    'tests/smoke/catalog-index.ts', 'public/example.json', 'tools/ci-impact.mjs',
  ]) {
    assert.equal(isContentOnly([...data, path]), false, path);
  }
});

test('empty history, missing base, invalid base and diff failure select full regression', () => {
  const base = 'a'.repeat(40);
  assert.equal(coreOnlyForBase(base, () => data.join('\0') + '\0'), true);
  assert.equal(coreOnlyForBase(base, () => ''), false);
  assert.equal(coreOnlyForBase(base, () => data[0]), false);
  assert.equal(coreOnlyForBase(base, () => { throw new Error('shallow history'); }), false);
  assert.equal(coreOnlyForBase('0'.repeat(40)), false);
  assert.equal(coreOnlyForBase(undefined), false);
  assert.equal(coreOnlyForBase('--help'), false);
});

test('diff is NUL-delimited and renames are checked as additions and deletions', () => {
  const base = 'b'.repeat(40);
  const diff = (command, args) => {
    assert.equal(command, 'git');
    assert.deepEqual(args, ['diff', '--name-only', '--no-renames', '-z', base, 'HEAD']);
    return 'src/content/analog/old.md\0src/pages/new.astro\0';
  };
  assert.equal(coreOnlyForBase(base, diff), false);
});
