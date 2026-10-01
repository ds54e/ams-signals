import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ACTIVITY_MATRIX_BASE_ROW_HEIGHT,
  ACTIVITY_MATRIX_BUNDLE_GAP,
  ACTIVITY_MATRIX_BUNDLE_PROXIMITY,
  buildActivityMatrixGeometry,
  orderEntitiesByRecentActivity,
  type ActivityMatrixGeometry,
} from '../../src/lib/activityMatrix.ts';
import { loadGoldenCorpus } from './corpus.ts';

type Geometry = ActivityMatrixGeometry;

const yearOf = (start: string): number => Number(start.slice(0, 4));

const buildCurrentGeometry = async (): Promise<{ geometry: Geometry; corpus: Awaited<ReturnType<typeof loadGoldenCorpus>> }> => {
  const corpus = await loadGoldenCorpus();
  return {
    geometry: buildActivityMatrixGeometry(corpus.events, corpus.companies, corpus.people),
    corpus,
  };
};

const laneKey = (row: Geometry['companyRows'][number]): string => `${row.entityType}:${row.entity.data.id}`;

/** Order-independent projection of the geometry used to compare two builds. */
const projection = (geometry: Geometry) => ({
  domain: geometry.domain,
  trackWidth: geometry.trackWidth,
  timeBands: geometry.timeBands,
  boundaries: geometry.boundaries,
  rows: [...geometry.companyRows, ...geometry.peopleRows].map((row) => ({
    lane: laneKey(row),
    visualRowCount: row.visualRowCount,
    height: row.height,
    eventIds: row.events.map(({ data }) => data.id),
    stats: row.stats,
    bundles: row.bundles.map((bundle) => ({
      key: bundle.key,
      xPx: bundle.xPx,
      rowStart: bundle.rowStart,
      rowEnd: bundle.rowEnd,
      mode: bundle.mode,
      timeBandKeys: bundle.timeBandKeys,
      eventIds: bundle.eventIds,
    })),
  })),
});

test('the Matrix corpus domain is derived from the oldest and newest Golden Event years', async () => {
  const { geometry, corpus } = await buildCurrentGeometry();
  const years = corpus.events.map(({ data }) => yearOf(data.when.start));

  assert.deepEqual(geometry.domain, { oldestYear: Math.min(...years), latestYear: Math.max(...years) });
  assert.ok(geometry.trackWidth > 0);
  assert.equal(geometry.trackWidth, geometry.timeBands.at(-1)?.endPx);
  assert.deepEqual(
    geometry.boundaries,
    geometry.timeBands.slice(0, -1).map((band) => ({ key: `${band.key}-end`, xPx: band.endPx })),
  );
});

test('every representable Event appears in at least one lane and zero-entity Events never do', async () => {
  const { geometry, corpus } = await buildCurrentGeometry();

  const represented = new Set<string>();
  for (const row of [...geometry.companyRows, ...geometry.peopleRows]) {
    for (const bundle of row.bundles) {
      for (const { eventId } of bundle.members) represented.add(eventId);
    }
  }

  const representable = corpus.events.filter((event) => (
    event.data.companies.length + event.data.people.length > 0
  ));
  assert.ok(representable.length > 0);

  const missing = representable.map(({ data }) => data.id).filter((id) => !represented.has(id));
  assert.deepEqual(missing, [], 'every Event with an entity lane must be represented in the geometry');

  // Ecosystem Events name no Company and no Person: they are viewer records, not Matrix marks.
  const zeroEntity = corpus.events.filter((event) => (
    event.data.companies.length === 0 && event.data.people.length === 0
  ));
  for (const event of zeroEntity) {
    assert.equal(represented.has(event.data.id), false, `${event.data.id} must not create a Matrix mark`);
  }
});

test('each Event keeps one precise projection across every lane where it appears', async () => {
  const { geometry } = await buildCurrentGeometry();
  const seen = new Map<string, { x: number; xPx: number; placementTimestamp: number; band: string }>();

  for (const row of [...geometry.companyRows, ...geometry.peopleRows]) {
    for (const bundle of row.bundles) {
      for (const member of bundle.members) {
        const current = {
          x: member.originalX,
          xPx: member.originalXPx,
          placementTimestamp: member.placementTimestamp,
          band: member.timeBandKey,
        };
        const previous = seen.get(member.eventId);
        if (previous === undefined) {
          seen.set(member.eventId, current);
        } else {
          assert.deepEqual(current, previous, `${member.eventId} must project identically in every lane`);
        }
      }
    }
  }

  assert.ok(seen.size > 0);
});

test('every row reports at least one visual row and a valid packed height', async () => {
  const { geometry } = await buildCurrentGeometry();
  const rows = [...geometry.companyRows, ...geometry.peopleRows];

  assert.ok(rows.length > 0);
  for (const row of rows) {
    assert.ok(row.visualRowCount >= 1, `${laneKey(row)} must occupy at least one visual row`);
    assert.ok(row.height >= ACTIVITY_MATRIX_BASE_ROW_HEIGHT);
    assert.ok(row.bundles.length >= 1, `${laneKey(row)} must hold at least one bundle`);
    assert.ok(row.events.length >= 1);
    assert.equal(row.visualRowCount, Math.max(...row.bundles.map(({ rowEnd }) => rowEnd), 1));
  }
});

test('every bundle member belongs to the Company or Person entity that owns the row', async () => {
  const { geometry } = await buildCurrentGeometry();

  for (const row of [...geometry.companyRows, ...geometry.peopleRows]) {
    for (const bundle of row.bundles) {
      for (const member of bundle.members) {
        const laneIds = row.entityType === 'company'
          ? member.event.data.companies
          : member.event.data.people;
        assert.ok(
          laneIds.includes(row.entity.data.id),
          `${member.eventId} does not reference ${laneKey(row)}`,
        );
      }
      assert.deepEqual(
        [...bundle.eventIds].sort(),
        bundle.members.map(({ eventId }) => eventId).sort(),
      );
    }
    // The row carries exactly the events linked to its own entity.
    assert.deepEqual(
      [...new Set(row.events.map(({ data }) => data.id))].sort(),
      [...new Set(row.bundles.flatMap((bundle) => bundle.eventIds))].sort(),
    );
    const linked = new Set(row.events.map(({ data }) => (
      row.entityType === 'company' ? data.companies.includes(row.entity.data.id) : data.people.includes(row.entity.data.id)
    )));
    assert.deepEqual([...linked], [true]);
  }
});

test('recent bundles use proximity semantics and earlier bundles use period semantics', async () => {
  const { geometry } = await buildCurrentGeometry();

  let proximityBundles = 0;
  let periodBundles = 0;

  for (const row of [...geometry.companyRows, ...geometry.peopleRows]) {
    // Bundles are laid out newest-first inside a lane.
    const recentBundles = row.bundles.filter(({ mode }) => mode === 'proximity');
    const periodBundlesInRow = row.bundles.filter(({ mode }) => mode === 'period');

    for (const bundle of recentBundles) {
      proximityBundles += 1;
      assert.equal(bundle.timeZone, 'recent');
      assert.equal(bundle.timeResolution, 'continuous');
      for (const member of bundle.members) {
        assert.equal(member.timeZone, 'recent');
        assert.equal(member.timeResolution, 'continuous');
      }
      // Proximity grouping keeps every member within the proximity window of the group anchor.
      const anchor = bundle.members[0].originalXPx;
      const span = Math.max(...bundle.members.map(({ originalXPx }) => originalXPx)) - anchor;
      assert.ok(span <= ACTIVITY_MATRIX_BUNDLE_PROXIMITY, `${bundle.key} exceeds the proximity window`);
    }

    for (const bundle of periodBundlesInRow) {
      periodBundles += 1;
      assert.equal(bundle.timeZone, 'earlier');
      assert.equal(bundle.timeResolution, 'bucket');
      assert.equal(bundle.timeBandKeys.length, 1, 'a period bundle must stay inside one period band');
      for (const member of bundle.members) {
        assert.equal(member.timeZone, 'earlier');
        assert.equal(member.timeResolution, 'bucket');
        assert.equal(member.timeBandKey, bundle.timeBandKeys[0]);
      }
      // Distinct period bands never share a bundle.
      const bandCounts = new Map<string, number>();
      for (const member of bundle.members) {
        bandCounts.set(member.timeBandKey, (bandCounts.get(member.timeBandKey) ?? 0) + 1);
      }
      assert.equal(bandCounts.size, 1);
    }
  }

  assert.ok(proximityBundles > 0, 'the corpus must exercise recent proximity bundles');
  assert.ok(periodBundles > 0, 'the corpus must exercise earlier period bundles');
});

test('packed bundle rectangles never overlap illegally inside a lane', async () => {
  const { geometry } = await buildCurrentGeometry();
  let compared = 0;

  for (const row of [...geometry.companyRows, ...geometry.peopleRows]) {
    for (let left = 0; left < row.bundles.length; left += 1) {
      for (let right = left + 1; right < row.bundles.length; right += 1) {
        const first = row.bundles[left];
        const second = row.bundles[right];
        const verticalOverlap = first.rowStart < second.rowEnd && second.rowStart < first.rowEnd;
        if (!verticalOverlap) continue;
        compared += 1;

        const separation = Math.abs(first.xPx - second.xPx)
          - ((first.collisionWidthPx + second.collisionWidthPx) / 2);
        assert.ok(
          separation >= ACTIVITY_MATRIX_BUNDLE_GAP,
          `${laneKey(row)} packs ${first.key} and ${second.key} too close in overlapping rows`,
        );
      }
    }
  }

  assert.ok(compared > 0, 'the corpus must exercise visual-row collision packing');
});

test('row order matches the activity order derived from the same source Events', async () => {
  const { geometry, corpus } = await buildCurrentGeometry();

  assert.deepEqual(
    geometry.companyRows.map(({ entity }) => entity.data.id),
    orderEntitiesByRecentActivity(corpus.companies, corpus.events, 'company')
      .map(({ entity }) => entity.data.id),
  );
  assert.deepEqual(
    geometry.peopleRows.map(({ entity }) => entity.data.id),
    orderEntitiesByRecentActivity(corpus.people, corpus.events, 'person')
      .map(({ entity }) => entity.data.id),
  );
  assert.equal(geometry.combinedRows.length, geometry.companyRows.length + geometry.peopleRows.length);
});

test('geometry and lane order are deterministic under reversed input', async () => {
  const { geometry, corpus } = await buildCurrentGeometry();
  const reversed = buildActivityMatrixGeometry(
    [...corpus.events].reverse(),
    [...corpus.companies].reverse(),
    [...corpus.people].reverse(),
  );

  assert.deepEqual(projection(reversed), projection(geometry));
  assert.deepEqual(
    reversed.combinedRows.map(({ entity, entityType }) => `${entityType}:${entity.data.id}`),
    geometry.combinedRows.map(({ entity, entityType }) => `${entityType}:${entity.data.id}`),
  );
  assert.deepEqual(projection(buildActivityMatrixGeometry(corpus.events, corpus.companies, corpus.people)), projection(geometry));
});
