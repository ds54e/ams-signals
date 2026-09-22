import assert from 'node:assert/strict';
import test from 'node:test';
import {
  EXPORT_EXCLUDED_EVENT_IDS,
  EXPORT_EXCLUDED_PERSON_IDS,
  EXPORT_PROJECT,
  buildExportPayload,
  exportEventRecordUrl,
  type ExportPayload,
  type GoldenEventData,
  type GoldenSourceData,
} from '../../src/lib/export.ts';
import { loadGoldenCorpus } from './corpus.ts';

// The current production deployment target, as independent literals.
const PUBLIC_ORIGIN = 'https://ds54e.github.io';
const BASE_PATH = '/ams-signals/';
// A representative migration target used to prove the export follows the
// configured deployment: custom origin with a root base path.
const MIGRATION_ORIGIN = 'https://migration-test.invalid';
const MIGRATION_BASE_PATH = '/';

// The published project contract: these four sentences are product copy, not derived data.
const PROJECT_NOTES = [
  'Each Event states only what its representative public sources directly support; source modality limits what the record establishes.',
  'The absence of a public Event is not evidence that a company or person lacks related internal activity.',
  'An employer move or acquisition alone does not establish methodology transfer.',
  'Standards participation alone does not establish internal deployment.',
];

// Deliberate named fixtures: these identities are part of the intended contract.
const EXCLUDED_PERSON_FIXTURE = 'lunlun';
const EXCLUDED_EVENT_FIXTURES = [
  'lunlun-2024-initial-real-time-representation',
  'lunlun-2025-3-0-dynamic-behavior',
];

const byNameThenId = <T extends { id: string; name: string }>(left: T, right: T): number =>
  left.name.localeCompare(right.name, 'en') || left.id.localeCompare(right.id, 'en');

const timestamp = (start: string): number => Date.parse(start);

const buildCurrentPayload = async (): Promise<{
  payload: ExportPayload;
  corpus: Awaited<ReturnType<typeof loadGoldenCorpus>>;
}> => {
  const corpus = await loadGoldenCorpus();
  return {
    payload: buildExportPayload({ ...corpus, publicOrigin: PUBLIC_ORIGIN, basePath: BASE_PATH }),
    corpus,
  };
};

test('exported Companies equal every canonical Company sorted by name then ID', async () => {
  const { payload, corpus } = await buildCurrentPayload();
  const expected = corpus.companies
    .map(({ data }) => ({ ...data }))
    .sort(byNameThenId);

  assert.deepEqual(payload.companies, expected);
  assert.deepEqual(
    payload.companies.map(({ id }) => id),
    expected.map(({ id }) => id),
  );
});

test('exported People equal source People minus the explicit excluded Person IDs', async () => {
  const { payload, corpus } = await buildCurrentPayload();
  const excluded = new Set(EXPORT_EXCLUDED_PERSON_IDS);
  const expected = corpus.people
    .map(({ data }) => ({ ...data }))
    .filter(({ id }) => !excluded.has(id))
    .sort(byNameThenId);

  assert.deepEqual(payload.people, expected);
  assert.deepEqual(
    payload.people.map(({ id }) => id),
    expected.map(({ id }) => id),
  );
});

test('exported Events equal source Events minus the explicit excluded Event IDs', async () => {
  const { payload, corpus } = await buildCurrentPayload();
  const excluded = new Set(EXPORT_EXCLUDED_EVENT_IDS);

  assert.deepEqual(
    [...payload.events.map(({ id }) => id)].sort(),
    corpus.events.map(({ data }) => data.id).filter((id) => !excluded.has(id)).sort(),
  );
});

test('excluded Lunlun fixtures remain present in the viewer corpus and absent from the export', async () => {
  const { payload, corpus } = await buildCurrentPayload();

  assert.deepEqual([...EXPORT_EXCLUDED_PERSON_IDS], [EXCLUDED_PERSON_FIXTURE]);
  assert.deepEqual([...EXPORT_EXCLUDED_EVENT_IDS], EXCLUDED_EVENT_FIXTURES);

  // The fixtures must exist in the sourced corpus, otherwise the exclusion proves nothing.
  assert.ok(corpus.people.some(({ data }) => data.id === EXCLUDED_PERSON_FIXTURE));
  for (const id of EXCLUDED_EVENT_FIXTURES) {
    assert.ok(corpus.events.some((event) => event.data.id === id), `${id} must exist in the corpus`);
  }

  assert.equal(payload.people.some(({ id }) => id === EXCLUDED_PERSON_FIXTURE), false);
  for (const id of EXCLUDED_EVENT_FIXTURES) {
    assert.equal(payload.events.some((event) => event.id === id), false);
  }
});

test('Event ordering is newest-first with the deterministic ID tie-break', async () => {
  const { payload } = await buildCurrentPayload();
  const ordered = payload.events.map(({ id, when }) => ({ id, start: when.start }));

  for (let index = 1; index < ordered.length; index += 1) {
    const previous = ordered[index - 1];
    const current = ordered[index];
    assert.ok(
      timestamp(previous.start) >= timestamp(current.start),
      `${previous.id} (${previous.start}) must not precede ${current.id} (${current.start})`,
    );
    if (timestamp(previous.start) === timestamp(current.start)) {
      assert.ok(
        previous.id.localeCompare(current.id, 'en') < 0,
        `same-date Events must tie-break by ascending ID: ${previous.id} before ${current.id}`,
      );
    }
  }

  // The same invariant for equal-precision dates: the export must be a total, stable order.
  const ids = ordered.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
});

test('every exported source carries an explicit status and a null-or-string archiveUrl', async () => {
  const { payload, corpus } = await buildCurrentPayload();
  const inputById = new Map(corpus.events.map((event) => [event.data.id, event.data]));

  let withoutStatus = 0;
  let withStatus = 0;
  let normalizedArchive = 0;

  for (const event of payload.events) {
    assert.ok(event.sources.length >= 1);
    for (const source of event.sources) {
      assert.ok('status' in source, `${event.id} source must expose a status field`);
      assert.ok(['available', 'unavailable'].includes(source.status));

      assert.ok('archiveUrl' in source, `${event.id} source must expose an archiveUrl field`);
      assert.ok(source.archiveUrl === null || typeof source.archiveUrl === 'string');
      if (typeof source.archiveUrl === 'string') assert.doesNotThrow(() => new URL(source.archiveUrl));

      // The normalized value must preserve the authored value where one was authored.
      const inputSource = inputById.get(event.id)?.sources.find(({ url }) => url === source.url);
      assert.ok(inputSource);
      assert.equal(source.status, inputSource.status ?? 'available');
      assert.equal(source.archiveUrl, inputSource.archiveUrl ?? null);

      if (inputSource.status === undefined) withoutStatus += 1; else withStatus += 1;
      if (inputSource.archiveUrl === undefined) normalizedArchive += 1;
    }
  }

  assert.ok(withoutStatus > 0, 'the corpus must exercise defaulted source status');
  assert.ok(withStatus > 0, 'the corpus must exercise authored source status');
  assert.ok(normalizedArchive > 0, 'the corpus must exercise defaulted archiveUrl');
});

test('source normalization defaults status and archiveUrl without inventing values', () => {
  const event: GoldenEventData = {
    id: 'synthetic-event',
    when: { start: '2026-01-15', precision: 'day' },
    kind: 'technical',
    companies: [],
    people: [],
    headline: 'Synthetic event',
    fact: 'Synthetic fact.',
    sources: [
      { title: 'Bare source', url: 'https://example.com/bare', checkedAt: '2026-01-15', summary: 'Bare.' } as GoldenSourceData,
      {
        title: 'Authored source',
        url: 'https://example.com/authored',
        checkedAt: '2026-01-15',
        summary: 'Authored.',
        status: 'unavailable',
        archiveUrl: 'https://web.archive.org/example',
      },
    ],
  };

  const payload = buildExportPayload({
    companies: [],
    people: [],
    events: [{ data: event }],
    publicOrigin: PUBLIC_ORIGIN,
    basePath: BASE_PATH,
  });

  assert.deepEqual(payload.events[0].sources, [
    {
      title: 'Bare source',
      url: 'https://example.com/bare',
      checkedAt: '2026-01-15',
      summary: 'Bare.',
      status: 'available',
      archiveUrl: null,
    },
    {
      title: 'Authored source',
      url: 'https://example.com/authored',
      checkedAt: '2026-01-15',
      summary: 'Authored.',
      status: 'unavailable',
      archiveUrl: 'https://web.archive.org/example',
    },
  ]);
});

test('every exported Event has the deterministic public recordUrl', async () => {
  const { payload } = await buildCurrentPayload();

  for (const event of payload.events) {
    assert.equal(event.recordUrl, `https://ds54e.github.io/ams-signals/events/${event.id}/`);
  }
  assert.deepEqual(
    payload.events.map(({ recordUrl }) => recordUrl),
    payload.events.map(({ id }) => `https://ds54e.github.io/ams-signals/events/${id}/`),
  );
});

test('record URLs follow an alternate public origin and root base path', async () => {
  const corpus = await loadGoldenCorpus();
  const payload = buildExportPayload({
    ...corpus,
    publicOrigin: MIGRATION_ORIGIN,
    basePath: MIGRATION_BASE_PATH,
  });

  for (const event of payload.events) {
    assert.equal(event.recordUrl, `https://migration-test.invalid/events/${event.id}/`);
  }
  assert.deepEqual(
    payload.events.map(({ recordUrl }) => recordUrl),
    payload.events.map(({ id }) => `https://migration-test.invalid/events/${id}/`),
  );
});

test('only recordUrl changes between the current deployment and a root-based migration target', async () => {
  const corpus = await loadGoldenCorpus();
  const current = buildExportPayload({ ...corpus, publicOrigin: PUBLIC_ORIGIN, basePath: BASE_PATH });
  const migrated = buildExportPayload({
    ...corpus,
    publicOrigin: MIGRATION_ORIGIN,
    basePath: MIGRATION_BASE_PATH,
  });

  assert.deepEqual(
    migrated.events.map(({ recordUrl: _recordUrl, ...event }) => event),
    current.events.map(({ recordUrl: _recordUrl, ...event }) => event),
  );
  assert.deepEqual(migrated.companies, current.companies);
  assert.deepEqual(migrated.people, current.people);
  assert.deepEqual(migrated.project, current.project);
  assert.equal(migrated.schemaVersion, current.schemaVersion);
});

test('record URL construction keeps the trailing slash and rejects non-public origins', () => {
  assert.equal(
    exportEventRecordUrl('https://example.com', '/', 'some-event'),
    'https://example.com/events/some-event/',
  );
  assert.equal(
    exportEventRecordUrl('https://example.com/', '/ams-signals/', 'some-event'),
    'https://example.com/ams-signals/events/some-event/',
  );

  for (const invalid of ['not-a-url', 'ftp://example.com', 'https://example.com/path', 'relative.example.com', '']) {
    assert.throws(() => exportEventRecordUrl(invalid, '/', 'some-event'), /Invalid SITE/);
  }
});

test('the payload carries no editorial analysis field and keeps the documented shape', async () => {
  const { payload } = await buildCurrentPayload();

  assert.deepEqual(Object.keys(payload), ['schemaVersion', 'project', 'companies', 'people', 'events']);
  assert.equal(payload.schemaVersion, 1);
  assert.equal('analysis' in payload, false);

  const eventFields = new Set(payload.events.flatMap((event) => Object.keys(event)));
  assert.equal(eventFields.has('analysis'), false);
  assert.deepEqual([...eventFields].sort(), [
    'affiliationChange', 'companies', 'fact', 'headline', 'id', 'kind', 'people', 'recordUrl', 'sources', 'when',
  ].sort());

  const sourceFields = new Set(payload.events.flatMap((event) => event.sources.flatMap((source) => Object.keys(source))));
  assert.deepEqual([...sourceFields].sort(), ['archiveUrl', 'checkedAt', 'status', 'summary', 'title', 'url']);
});

test('the project notes contract remains intact', async () => {
  const { payload } = await buildCurrentPayload();

  assert.deepEqual(payload.project, {
    name: 'AMS Signals',
    scope: 'Public factual signals in RNM and mixed-signal verification.',
    notes: PROJECT_NOTES,
  });
  assert.deepEqual(payload.project.notes, [...EXPORT_PROJECT.notes]);
  assert.equal(payload.project.notes.length, 4);
});

test('payload construction never mutates its source inputs', async () => {
  const corpus = await loadGoldenCorpus();

  for (const basePath of [BASE_PATH, '/']) {
    const before = {
      events: structuredClone(corpus.events.map(({ data }) => data)),
      companies: structuredClone(corpus.companies.map(({ data }) => data)),
      people: structuredClone(corpus.people.map(({ data }) => data)),
    };

    buildExportPayload({ ...corpus, publicOrigin: PUBLIC_ORIGIN, basePath });

    assert.deepEqual(corpus.events.map(({ data }) => data), before.events);
    assert.deepEqual(corpus.companies.map(({ data }) => data), before.companies);
    assert.deepEqual(corpus.people.map(({ data }) => data), before.people);
  }
});

test('exclusion and sort decisions are stable under reversed input order', async () => {
  const corpus = await loadGoldenCorpus();
  const forward = buildExportPayload({ ...corpus, publicOrigin: PUBLIC_ORIGIN, basePath: BASE_PATH });
  const reversed = buildExportPayload({
    events: [...corpus.events].reverse(),
    companies: [...corpus.companies].reverse(),
    people: [...corpus.people].reverse(),
    publicOrigin: PUBLIC_ORIGIN,
    basePath: BASE_PATH,
  });

  assert.deepEqual(reversed, forward);
});
