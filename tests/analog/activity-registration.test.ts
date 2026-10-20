import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { parseFrontmatter } from 'astro/markdown';
import { planActivityRegistration, preserveUnselectedCapture } from '../../tools/activity-registration.mjs';
import { activityBand } from '../../src/lib/catalog-activity-band.ts';
import { validateActivity } from '../../src/lib/analog/schema.ts';

const old = { id: 'old', data: { sources: [{ purpose: 'code', url: 'https://github.com/owner/old' }] } };
const added = { id: 'added', data: { sources: [
  { purpose: 'code', url: 'https://github.com/owner/added' },
  { id: 'activity', url: `https://github.com/owner/added/commit/${'a'.repeat(40)}` },
] } };
const snapshot = { capturedAt: '2026-10-18T01:00:00Z', projects: { old: { kind: 'github', repository: 'owner/old' } } };

test('the catalog registers new articles and retains existing captures', () => {
  const planned = planActivityRegistration([added, old], snapshot, ['old']);
  assert.deepEqual(planned.map(({ project }) => project.id), ['old', 'added']);
  assert.equal(planned[0].existing, snapshot.projects.old);
  assert.equal(planned[1].repository, 'owner/added');
  assert.equal(planned[1].meaningfulSha, 'a'.repeat(40));
  assert.deepEqual(preserveUnselectedCapture(snapshot.projects.old, snapshot.capturedAt), {
    ...snapshot.projects.old, capturedAt: snapshot.capturedAt,
  });
});

test('removed and renamed articles require explicit curation', () => {
  assert.throws(() => planActivityRegistration([added], snapshot), /Removed or renamed/);
  assert.throws(() => planActivityRegistration([old], snapshot, ['unknown']), /Unknown selected/);
  assert.throws(() => planActivityRegistration([old, { ...added, data: { sources: added.data.sources.slice(0, 1) } }], snapshot), /explicit activity commit/);
});

test('a failed new capture is displayed as unfetched without zero commits', () => {
  const band = activityBand({ kind: 'unfetched', repository: 'owner/added', attemptedAt: '2026-10-20T09:00:00Z' }, ['2026-10'], []);
  assert.equal(band.date, '');
  assert.equal(band.activeMonths, 0);
  assert.equal(band.cells[0].signal, 'unfetched');
  assert.equal(band.cells[0].commits, undefined);
  assert.match(band.provenance, /Activity not fetched/);
});

test('an unfetched catalog entry validates without inventing a public activity date', async () => {
  const article = parseFrontmatter(await readFile(new URL('../../src/content/analog/rnl.md', import.meta.url), 'utf8'));
  const capturedAt = '2026-10-20T09:00:00Z';
  const record = { kind: 'unfetched', repository: 'rich-netlist/rnl', attemptedAt: capturedAt };
  const snapshot = { reviewedAt: '2026-10-20', capturedAt, method: 'first-parent-committer-utc',
    months: ['2025-11','2025-12','2026-01','2026-02','2026-03','2026-04','2026-05','2026-06','2026-07','2026-08','2026-09','2026-10'],
    projects: { rnl: record } };
  assert.equal(validateActivity([{ id: 'rnl', data: article.frontmatter }], snapshot).projects.rnl.kind, 'unfetched');
  assert.throws(() => validateActivity([{ id: 'rnl', data: article.frontmatter }], {
    ...snapshot, projects: { rnl: { ...record, commits: Array(12).fill(0) } },
  }));
});
