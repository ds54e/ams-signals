import assert from 'node:assert/strict';
import { test } from 'node:test';
import { coreAreasForBase, contentAreas } from '../../tools/ci-impact.mjs';

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
  assert.deepEqual(contentAreas(data), ['analog', 'digital', 'golden', 'lab']);
  assert.deepEqual(contentAreas([data[0], data[6], data[8]]), ['analog', 'lab']);
  assert.deepEqual(contentAreas([data[3], data[4]]), ['golden']);
  assert.equal(contentAreas([]), null);
  for (const path of [
    'src/content.config.ts', 'src/content/analog/AGENTS.md',
    'src/content/analog/subdir/example.md', 'src/data/events/README.md',
    'src/scripts/catalog.ts', 'src/pages/index.astro', 'src/styles/global.css',
    'package-lock.json', '.github/workflows/ci.yml', 'docs/TESTING.md',
    'tests/smoke/catalog-index.ts', 'public/example.json', 'tools/ci-impact.mjs',
  ]) {
    assert.equal(contentAreas([...data, path]), null, path);
  }
});

test('empty history, missing base, invalid base and diff failure select full regression', () => {
  const base = 'a'.repeat(40);
  assert.deepEqual(coreAreasForBase(base, () => data.join('\0') + '\0'), ['analog', 'digital', 'golden', 'lab']);
  assert.equal(coreAreasForBase(base, () => ''), null);
  assert.equal(coreAreasForBase(base, () => data[0]), null);
  assert.equal(coreAreasForBase(base, () => { throw new Error('shallow history'); }), null);
  assert.equal(coreAreasForBase('0'.repeat(40)), null);
  assert.equal(coreAreasForBase(undefined), null);
  assert.equal(coreAreasForBase('--help'), null);
});

test('diff is NUL-delimited and renames are checked as additions and deletions', () => {
  const base = 'b'.repeat(40);
  const diff = (command, args) => {
    assert.equal(command, 'git');
    assert.deepEqual(args, ['diff', '--name-only', '--no-renames', '-z', base, 'HEAD']);
    return 'src/content/analog/old.md\0src/pages/new.astro\0';
  };
  assert.equal(coreAreasForBase(base, diff), null);
});
