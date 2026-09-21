import assert from 'node:assert/strict';
import test from 'node:test';
import {
  compareActivityEntities,
  orderEntitiesByRecentActivity,
  type OrderedActivityEntity,
} from '../../src/lib/activityMatrix.ts';
import type { CompanyEntry, EventEntry, PersonEntry } from '../../src/lib/content.ts';
import { compareByNameThenId } from '../../src/lib/content.ts';
type Company = CompanyEntry;
type Person = PersonEntry;
type Event = EventEntry;

const company = (id: string, name: string): Company => ({
  id, collection: 'companies', data: { id, name },
} as unknown as Company);

const person = (id: string, name: string): Person => ({
  id, collection: 'people', data: { id, name },
} as unknown as Person);

const event = (
  id: string,
  start: string,
  companies: string[] = [],
  people: string[] = [],
  precision: 'day' | 'month' | 'year' = 'day',
): Event => ({
  id,
  collection: 'events',
  data: {
    id,
    kind: 'technical',
    when: { start, precision },
    companies,
    people,
    headline: id,
    fact: id,
    sources: [{ title: id, url: 'https://example.com/', checkedAt: '2026-01-01', summary: id }],
  },
} as unknown as Event);

/** A 2026 Event fixes the corpus clock so the recent3/recent5 windows are predictable. */
const clock = event('clock-2026', '2026-03-01', ['clock']);
const clockCompany = company('clock', 'Clock');

const order = (companies: Company[], events: Event[]): string[] =>
  orderEntitiesByRecentActivity(companies, events, 'company').map(({ entity }) => entity.data.id);

const statsOrder = (companies: Company[], events: Event[]): OrderedActivityEntity<Company>[] =>
  orderEntitiesByRecentActivity(companies, events, 'company');

const precedes = (ids: string[], first: string, second: string, message: string): void => {
  const firstIndex = ids.indexOf(first);
  const secondIndex = ids.indexOf(second);
  assert.ok(firstIndex >= 0 && secondIndex >= 0, `${message} (both fixtures must be represented)`);
  assert.ok(firstIndex < secondIndex, message);
};

test('recent3 is the primary activity key and outranks recent5', () => {
  const entities = [
    company('a-company', 'Alpha Activity'),
    company('b-company', 'Beta Volume'),
    clockCompany,
  ];
  const events = [
    clock,
    event('a-2024', '2024-01-05', ['a-company']),
    event('b-2022-01', '2022-01-05', ['b-company']),
    event('b-2022-02', '2022-02-05', ['b-company']),
    event('b-2022-03', '2022-03-05', ['b-company']),
  ];

  const ordered = statsOrder(entities, events);
  const stats = new Map(ordered.map(({ entity, stats: value }) => [entity.data.id, value]));

  assert.equal(stats.get('a-company')?.recent3, 1);
  assert.equal(stats.get('a-company')?.recent5, 1);
  assert.equal(stats.get('b-company')?.recent3, 0);
  assert.equal(stats.get('b-company')?.recent5, 3);

  precedes(order(entities, events), 'a-company', 'b-company', 'recent3 must outrank recent5');
});

test('recent5 outranks the latest timestamp when recent3 ties', () => {
  const entities = [company('a-company', 'Alpha'), company('b-company', 'Beta'), clockCompany];
  const events = [
    clock,
    event('a-2024', '2024-06-05', ['a-company']),
    event('b-2024', '2024-01-05', ['b-company']),
    event('b-2022', '2022-01-05', ['b-company']),
  ];

  const stats = new Map(statsOrder(entities, events).map(({ entity, stats: value }) => [entity.data.id, value]));
  assert.equal(stats.get('a-company')?.recent3, stats.get('b-company')?.recent3);
  assert.ok((stats.get('b-company')?.recent5 ?? 0) > (stats.get('a-company')?.recent5 ?? 0));
  assert.ok((stats.get('a-company')?.latestStart ?? '') > (stats.get('b-company')?.latestStart ?? ''));

  precedes(order(entities, events), 'b-company', 'a-company', 'recent5 must outrank the latest timestamp');
});

test('the latest timestamp outranks total Event count', () => {
  const entities = [company('a-company', 'Alpha'), company('b-company', 'Beta'), clockCompany];
  const events = [
    clock,
    event('a-2024', '2024-06-05', ['a-company']),
    event('b-2024', '2024-01-05', ['b-company']),
  ];

  const stats = new Map(statsOrder(entities, events).map(({ entity, stats: value }) => [entity.data.id, value]));
  assert.equal(stats.get('a-company')?.recent3, stats.get('b-company')?.recent3);
  assert.equal(stats.get('a-company')?.recent5, stats.get('b-company')?.recent5);
  assert.equal(stats.get('a-company')?.total, stats.get('b-company')?.total);

  precedes(order(entities, events), 'a-company', 'b-company', 'the newer latest timestamp must lead');
});

test('total Event count is the final statistical key', () => {
  const entities = [company('a-company', 'Alpha'), company('b-company', 'Beta'), clockCompany];
  const events = [
    clock,
    event('shared-2025', '2025-01-15', ['a-company', 'b-company']),
    event('a-2010', '2010-01-05', ['a-company']),
  ];

  const stats = new Map(statsOrder(entities, events).map(({ entity, stats: value }) => [entity.data.id, value]));
  assert.equal(stats.get('a-company')?.recent3, 1);
  assert.equal(stats.get('b-company')?.recent3, 1);
  assert.equal(stats.get('a-company')?.recent5, 1);
  assert.equal(stats.get('b-company')?.recent5, 1);
  assert.equal(stats.get('a-company')?.latestStart, stats.get('b-company')?.latestStart);
  assert.equal(stats.get('a-company')?.total, 2);
  assert.equal(stats.get('b-company')?.total, 1);

  precedes(order(entities, events), 'a-company', 'b-company', 'the larger total must lead');
});

test('equal statistical keys fall back to name, then ID, then entity type', () => {
  const entities = [
    company('zulu-company', 'Zulu'),
    company('alpha-company', 'Alpha'),
    company('b-same-name', 'Same'),
    company('a-same-name', 'Same'),
    clockCompany,
  ];
  const events = [
    clock,
    event('shared', '2025-02-01', ['zulu-company', 'alpha-company', 'b-same-name', 'a-same-name']),
  ];

  const ids = order(entities, events);
  precedes(ids, 'alpha-company', 'zulu-company', 'equal keys must order by name');
  precedes(ids, 'a-same-name', 'b-same-name', 'equal names must order by ID');

  // The exported comparator also carries a deterministic entity-type tie-break.
  const sharedStats = [event('shared-person', '2025-02-01', ['twin'], ['twin'])];
  const [orderedCompany] = orderEntitiesByRecentActivity([company('twin', 'Twin')], sharedStats, 'company');
  const [orderedPerson] = orderEntitiesByRecentActivity([person('twin', 'Twin')], sharedStats, 'person');
  assert.equal(orderedCompany.entity.data.id, orderedPerson.entity.data.id);
  assert.equal(orderedCompany.entity.data.name, orderedPerson.entity.data.name);
  assert.ok(compareActivityEntities(orderedCompany, orderedPerson) < 0);
  assert.ok(compareActivityEntities(orderedPerson, orderedCompany) > 0);
  assert.equal(compareActivityEntities(orderedCompany, orderedCompany), 0);
});

test('activity ordering is invariant under reversed and shuffled input', () => {
  const entities = [
    company('a-company', 'Alpha'),
    company('b-company', 'Beta'),
    company('c-company', 'Gamma'),
    clockCompany,
  ];
  const events = [
    clock,
    event('a-2024', '2024-06-05', ['a-company']),
    event('b-2024', '2024-01-05', ['b-company']),
    event('b-2022', '2022-01-05', ['b-company']),
    event('c-2010', '2010-01-05', ['c-company']),
  ];

  const forward = order(entities, events);
  const reversed = order([...entities].reverse(), [...events].reverse());
  const shuffledEntities = [entities[2], entities[0], entities[3], entities[1]];
  const shuffledEvents = [events[4], events[1], events[3], events[0], events[2]];

  assert.deepEqual(reversed, forward);
  assert.deepEqual(order(shuffledEntities, shuffledEvents), forward);
  assert.equal(new Set(forward).size, forward.length);
});

test('People entities order with the same comparator and stay deterministic', () => {
  const people = [
    person('person-alpha', 'Alpha'),
    person('person-beta', 'Beta'),
    person('person-clock', 'Clock'),
  ];
  const events = [
    event('clock-person', '2026-03-01', [], ['person-clock']),
    event('alpha-2024', '2024-06-05', [], ['person-alpha']),
    event('beta-2022', '2022-01-05', [], ['person-beta']),
    event('beta-2022-b', '2022-06-05', [], ['person-beta']),
  ];

  const forward = orderEntitiesByRecentActivity(people, events, 'person').map(({ entity }) => entity.data.id);
  const reversed = orderEntitiesByRecentActivity([...people].reverse(), [...events].reverse(), 'person')
    .map(({ entity }) => entity.data.id);
  assert.deepEqual(reversed, forward);
  assert.equal(forward[0], 'person-clock');
});

test('adding an unrelated singleton does not reorder entities with unchanged keys', () => {
  const entities = [company('a-company', 'Alpha'), company('b-company', 'Beta'), clockCompany];
  const events = [
    clock,
    event('a-2024', '2024-06-05', ['a-company']),
    event('b-2022', '2022-01-05', ['b-company']),
  ];

  const before = order(entities, events);
  const after = order([...entities, company('newcomer', 'Newcomer')], [
    ...events,
    event('newcomer-2019', '2019-01-05', ['newcomer']),
  ]);

  const aIndexBefore = before.indexOf('a-company');
  const bIndexBefore = before.indexOf('b-company');
  assert.ok(aIndexBefore < bIndexBefore);
  assert.equal(after.includes('newcomer'), true);
  assert.ok(
    after.indexOf('a-company') < after.indexOf('b-company'),
    'an unrelated singleton must not reorder existing entities',
  );
  assert.deepEqual(after.filter((id) => id !== 'newcomer'), before);
});

test('alphabetical Company picker ordering is independent of activity ordering', () => {
  const entities = [company('zulu-company', 'Zulu'), company('alpha-company', 'Alpha'), clockCompany];
  const busyEvents = [
    clock,
    event('zulu-2026', '2026-06-05', ['zulu-company']),
    event('zulu-2025', '2025-06-05', ['zulu-company']),
    event('zulu-2024', '2024-06-05', ['zulu-company']),
    event('alpha-2010', '2010-01-05', ['alpha-company']),
  ];
  const idleEvents = [
    clock,
    event('alpha-2026', '2026-06-05', ['alpha-company']),
    event('zulu-2010', '2010-01-05', ['zulu-company']),
  ];

  const alphabetical = (input: Company[]) => input
    .map(({ data }) => data)
    .sort(compareByNameThenId)
    .map(({ id }) => id);

  // Alphabetical picker order ignores activity entirely.
  assert.deepEqual(alphabetical(entities), ['alpha-company', 'clock', 'zulu-company']);
  assert.deepEqual(alphabetical([...entities].reverse()), ['alpha-company', 'clock', 'zulu-company']);

  // ...while activity order changes with the corpus.
  const busyFirst = order(entities, busyEvents)[0];
  const idleFirst = order(entities, idleEvents)[0];
  assert.equal(busyFirst, 'zulu-company');
  assert.equal(idleFirst, 'alpha-company');
  assert.notDeepEqual(order(entities, busyEvents), alphabetical(entities));
});

test('alphabetical ordering is a total order with a name-then-ID tie-break', () => {
  const data = [
    { id: 'b-same', name: 'Same' },
    { id: 'a-same', name: 'Same' },
    { id: 'zulu', name: 'Zulu' },
    { id: 'alpha', name: 'Alpha' },
  ];

  assert.deepEqual(
    [...data].sort(compareByNameThenId).map(({ id }) => id),
    ['alpha', 'a-same', 'b-same', 'zulu'],
  );
  assert.deepEqual(
    [...data].reverse().sort(compareByNameThenId).map(({ id }) => id),
    ['alpha', 'a-same', 'b-same', 'zulu'],
  );
  assert.equal(compareByNameThenId(data[0], data[0]), 0);
});
