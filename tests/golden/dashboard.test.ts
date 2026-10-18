import assert from 'node:assert/strict';
import test from 'node:test';
import { dashboardActivity } from '../../src/lib/dashboard.ts';
import { dashboardSeriesPercentages } from '../../src/lib/dashboard-presentation.ts';

const event = (start: string, precision = 'day', end?: string) => ({ data: { when: { start, precision, end } } });
const empty = { months: [], projects: {} };

test('dashboard percentages use each displayed series maximum, including unequal peaks in different months', () => {
  const counts = [
    { events: 2, analog: 40, digital: 0 },
    { events: 4, analog: 10, digital: 1 },
    { events: 0, analog: 20, digital: 2 },
  ];
  const original = structuredClone(counts);
  assert.deepEqual(dashboardSeriesPercentages(counts), [
    { events: 50, analog: 100, digital: 0 },
    { events: 100, analog: 25, digital: 50 },
    { events: 0, analog: 50, digital: 100 },
  ]);
  assert.deepEqual(counts, original);
  // An out-of-window peak must not influence the scale of the displayed slice.
  assert.deepEqual(dashboardSeriesPercentages(counts.slice(1)), [
    { events: 100, analog: 50, digital: 50 },
    { events: 0, analog: 100, digital: 100 },
  ]);
});

test('dashboard percentages preserve mixed zero buckets and entirely zero series without invalid geometry', () => {
  assert.deepEqual(dashboardSeriesPercentages([
    { events: 0, analog: 0, digital: 3 },
    { events: 6, analog: 0, digital: 0 },
    { events: 0, analog: 0, digital: 1 },
  ]), [
    { events: 0, analog: 0, digital: 100 },
    { events: 100, analog: 0, digital: 0 },
    { events: 0, analog: 0, digital: 1 / 3 * 100 },
  ]);
  const zero = Array.from({ length: 12 }, () => ({ events: 0, analog: 0, digital: 0 }));
  assert.deepEqual(dashboardSeriesPercentages(zero), zero);
  assert.deepEqual(dashboardSeriesPercentages([]), []);
});

test('dashboard uses twelve calendar months ending at the build month, including year rollover', () => {
  const rows = dashboardActivity([], empty, empty, '2027-02-03');
  assert.equal(rows.length, 12);
  assert.equal(rows[0].month, '2026-03');
  assert.equal(rows.at(-1)!.month, '2027-02');
  assert(rows.every((row) => row.events === 0 && row.analog === 0 && row.digital === 0));
});

test('Events count once at their supported start month; year precision and dates outside the window are excluded', () => {
  const events = [event('2026', 'year'), event('2026-10', 'month'), event('2026-10-18'),
    event('2026-09', 'month', '2026-10'), event('2025-10-31'), event('2026-11-01')];
  const original = structuredClone(events);
  const rows = dashboardActivity(events, empty, empty, '2026-10-18');
  assert.equal(rows.at(-1)!.events, 2);
  assert.equal(rows.at(-2)!.events, 1);
  assert.equal(rows.reduce((sum, row) => sum + row.events, 0), 3);
  assert.deepEqual(events, original);
});

test('repository counts become distinct active projects; snapshot months align by key and points activate only their date', () => {
  const analog = { months: ['2026-09', '2026-10'], projects: {
    first: { kind: 'github' as const, commits: [100, 0] },
    second: { kind: 'repository' as const, commits: [2, 6] },
    paper: { kind: 'public-update' as const, lastPublicUpdateAt: '2026-09-20' },
    old: { kind: 'public-update' as const, lastPublicUpdateAt: '2024-09-20' },
  } };
  const digital = { months: ['2026-08', '2026-09'], projects: {
    first: { kind: 'github' as const, commits: [4, 7] },
    release: { kind: 'public-update' as const, lastPublicUpdateAt: '2026-10-01' },
  } };
  const original = structuredClone({ analog, digital });
  const rows = dashboardActivity([], analog, digital, '2026-10-18');
  assert.deepEqual(rows.at(-3), { month: '2026-08', events: 0, analog: 0, digital: 1 });
  assert.deepEqual(rows.at(-2), { month: '2026-09', events: 0, analog: 3, digital: 1 });
  assert.deepEqual(rows.at(-1), { month: '2026-10', events: 0, analog: 1, digital: 1 });
  assert.deepEqual({ analog, digital }, original);
  // A later build neither shifts captured buckets nor extends an active project into unknown months.
  const later = dashboardActivity([], analog, digital, '2027-01-01');
  assert.deepEqual(later.find((row) => row.month === '2026-09'), rows.at(-2));
  assert.deepEqual(later.at(-1), { month: '2027-01', events: 0, analog: 0, digital: 0 });
});
