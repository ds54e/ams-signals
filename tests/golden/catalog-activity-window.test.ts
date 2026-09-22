// Domain-independent contract tests for the shared activity-window primitives
// (src/lib/catalog-activity-window.ts). These primitives are semantically identical for
// Analog and Digital and are re-exported unchanged by both domain façades
// (src/lib/analog/activity.ts, src/lib/digital/activity.ts), whose own integration tests
// (tests/analog/catalog.test.ts, tests/digital/catalog.test.ts) keep proving each domain
// calls this primitive correctly. This file only proves the primitive itself is correct.
import assert from 'node:assert/strict';
import test from 'node:test';
import { activityMonths, countActivity, freshnessCutoff } from '../../src/lib/catalog-activity-window.ts';

test('activityMonths returns exactly twelve months', () => {
  assert.equal(activityMonths('2026-09-05').length, 12);
});

test('activityMonths includes the reviewed month last', () => {
  assert.equal(activityMonths('2026-09-05').at(-1), '2026-09');
  assert.equal(activityMonths('2026-01-15').at(-1), '2026-01');
});

test('activityMonths crosses a year boundary in consecutive calendar order', () => {
  assert.deepEqual(
    activityMonths('2026-02-01'),
    ['2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02'],
  );
});

test('activityMonths uses UTC calendar semantics regardless of the process timezone offset', () => {
  // A late-UTC-day timestamp must not roll to the next/previous month under a local offset.
  assert.deepEqual(activityMonths('2026-01-01').slice(-2), ['2025-12', '2026-01']);
  assert.deepEqual(activityMonths('2024-02-29').slice(-3), ['2023-12', '2024-01', '2024-02']);
});

test('freshnessCutoff subtracts exactly one year on an ordinary day', () => {
  assert.equal(freshnessCutoff('2026-09-05'), '2025-09-05');
  assert.equal(freshnessCutoff('2025-03-01'), '2024-03-01');
});

test('freshnessCutoff preserves a month-end day when the prior year has the same length', () => {
  assert.equal(freshnessCutoff('2026-01-31'), '2025-01-31');
  assert.equal(freshnessCutoff('2026-04-30'), '2025-04-30');
});

test('freshnessCutoff clamps a leap-day reviewedAt to the prior non-leap February', () => {
  assert.equal(freshnessCutoff('2024-02-29'), '2023-02-28');
});

test('countActivity normalizes committer timestamps to UTC calendar dates', () => {
  const result = countActivity(['2026-09-04T12:00:00Z'], '2026-09-05T03:00:00Z');
  assert.equal(result.lastCommitAt, '2026-09-04');
});

test('countActivity normalizes non-UTC timezone offsets to their UTC calendar date', () => {
  // 23:30 on 2025-09-30 at UTC-2 is 2025-10-01T01:30:00Z -> bucketed into October, not September.
  const result = countActivity(['2025-09-30T23:30:00-02:00'], '2026-09-05T03:00:00Z');
  const months = activityMonths('2026-09-05');
  assert.deepEqual(result.commits, months.map((month) => month === '2025-10' ? 1 : 0));
});

test('countActivity buckets commits inside the window and drops commits outside it', () => {
  const months = activityMonths('2026-09-05');
  const result = countActivity(['2020-01-01T00:00:00Z', '2026-08-15T00:00:00Z'], '2026-09-05T03:00:00Z');
  assert.deepEqual(result.commits, months.map((month) => month === '2026-08' ? 1 : 0));
});

test('countActivity reports the latest commit date even when it predates the window', () => {
  assert.deepEqual(
    countActivity(['2024-02-29T01:00:00Z'], '2026-09-05T03:00:00Z'),
    { commits: Array(12).fill(0), lastCommitAt: '2024-02-29' },
  );
});

test('countActivity rejects an empty history', () => {
  assert.throws(() => countActivity([], '2026-09-05T03:00:00Z'), /Empty default-branch history/);
});

test('countActivity rejects an unparseable timestamp', () => {
  assert.throws(() => countActivity(['not-a-date'], '2026-09-05T03:00:00Z'), /Invalid or future commit timestamp/);
});

test('countActivity rejects a timestamp after capturedAt', () => {
  assert.throws(() => countActivity(['2026-09-05T04:00:00Z'], '2026-09-05T03:00:00Z'), /Invalid or future commit timestamp/);
});

test('countActivity does not mutate its input array', () => {
  const dates = Object.freeze(['2026-08-01T00:00:00Z', '2026-08-02T00:00:00Z']);
  const before = [...dates];
  countActivity(dates, '2026-09-05T03:00:00Z');
  assert.deepEqual(dates, before);
});
