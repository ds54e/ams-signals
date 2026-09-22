// Domain-independent contract test for the shared ordering primitive
// (src/lib/catalog-sort.ts). The activity-date lookup is caller-supplied, so this file
// never touches PublicActivity or publicActivityDate() — those stay domain-specific in
// src/lib/analog/catalog.ts and src/lib/digital/catalog.ts, whose own integration tests
// keep proving each domain's sortProjects() calls this primitive correctly.
import assert from 'node:assert/strict';
import test from 'node:test';
import { sortByActivityThenName } from '../../src/lib/catalog-sort.ts';

test('sorts by descending activity date, then normalized name, then id, without mutating input', () => {
  const items = [
    { id: 'old', data: { name: 'Aardvark' } },
    { id: 'b', data: { name: 'Alpha' } },
    { id: 'a', data: { name: 'ＡＬＰＨＡ' } },
    { id: 'newest', data: { name: 'Zebra' } },
  ];
  const dates: Record<string, string> = { old: '2025-12-31', a: '2026-08-20', b: '2026-08-20', newest: '2026-09-04' };
  const before = structuredClone(items);

  const sorted = sortByActivityThenName(items, (item) => dates[item.id]);

  assert.deepEqual(sorted.map((item) => item.id), ['newest', 'a', 'b', 'old']);
  assert.deepEqual(items, before);
});

test('name comparison is Unicode-normalized, case-insensitive and trimmed', () => {
  const items = [
    { id: 'z', data: { name: ' alpha ' } },
    { id: 'a', data: { name: 'ＡＬＰＨＡ' } },
  ];
  const sorted = sortByActivityThenName(items, () => '2026-01-01');
  // Equal normalized names and equal dates fall through to the id tie-break.
  assert.deepEqual(sorted.map((item) => item.id), ['a', 'z']);
});

test('id is the final deterministic tie-break when date and name are both equal', () => {
  const items = [
    { id: 'z', data: { name: 'Same' } },
    { id: 'a', data: { name: 'Same' } },
  ];
  assert.deepEqual(sortByActivityThenName(items, () => '2026-01-01').map((item) => item.id), ['a', 'z']);
});

test('is stable under a reversed input order', () => {
  const items = [
    { id: 'first', data: { name: 'First' } },
    { id: 'second', data: { name: 'Second' } },
    { id: 'third', data: { name: 'Third' } },
  ];
  const dates: Record<string, string> = { first: '2026-01-01', second: '2026-01-02', third: '2026-01-03' };
  const forward = sortByActivityThenName(items, (item) => dates[item.id]).map((item) => item.id);
  const reversed = sortByActivityThenName([...items].reverse(), (item) => dates[item.id]).map((item) => item.id);
  assert.deepEqual(forward, reversed);
  assert.deepEqual(forward, ['third', 'second', 'first']);
});
