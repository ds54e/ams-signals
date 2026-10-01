import assert from 'node:assert/strict';
import test from 'node:test';
import type { EventEntry } from '../../src/lib/content.ts';
import {
  TIMELINE_HISTORICAL_CUTOFF,
  TIMELINE_MIN_SEGMENT_WIDTH,
  buildTimelineGeometry,
  type TimelineGeometry,
} from '../../src/lib/timeline.ts';

type Event = EventEntry;

const event = (
  id: string,
  start: string,
  companies: string[] = [],
  people: string[] = [],
): Event => ({
  id,
  collection: 'events',
  data: {
    id,
    kind: 'technical',
    when: { start, precision: start.length === 4 ? 'year' : start.length === 7 ? 'month' : 'day' },
    companies,
    people,
    headline: id,
    fact: id,
    sources: [{ title: id, url: 'https://example.com/', checkedAt: '2026-01-01', summary: id }],
  },
} as unknown as Event);

const laneKeys = (value: Event): string[] => [
  ...value.data.companies.map((id) => `company:${id}`),
  ...value.data.people.map((id) => `person:${id}`),
];

/** Small deterministic fixtures: two historical years on one lane, plus recent years. */
const fixtures = (): Event[] => [
  event('historical-2010', '2010-05-01', ['acme']),
  event('historical-2015', '2015-05-01', ['acme']),
  event('historical-2020', '2020-05-01', ['zenith']),
  event('recent-2024', '2024-05-01', ['acme', 'zenith']),
  event('recent-2026', '2026-05-01', ['bravo'], ['ada']),
];

const projection = (geometry: TimelineGeometry) => ({
  width: geometry.width,
  columns: geometry.columns,
  segments: geometry.segments.map((segment) => ({
    key: segment.key,
    label: segment.label,
    year: segment.year,
    width: segment.width,
    offset: segment.offset,
    microSlotPitch: segment.microSlotPitch,
    bandGap: segment.bandGap,
    contentInset: segment.contentInset,
    bands: segment.bands.map((band) => ({
      width: band.width,
      events: band.events.map(({ data }) => data.id),
      occupiedLaneKeys: [...band.occupiedLaneKeys].sort(),
    })),
    events: segment.events.map(({ data }) => data.id),
  })),
  positions: [...geometry.positionByEventId.entries()].sort(([left], [right]) => left.localeCompare(right, 'en')),
});

test('historical Events aggregate into one cutoff segment and label their oldest year', () => {
  const geometry = buildTimelineGeometry(fixtures());

  assert.deepEqual(geometry.segments.map(({ key }) => key), ['2026', '2024', 'through-2020']);
  assert.deepEqual(geometry.segments.map(({ year }) => year), [2026, 2024, TIMELINE_HISTORICAL_CUTOFF]);

  const historical = geometry.segments.find(({ key }) => key === 'through-2020');
  assert.ok(historical);
  assert.deepEqual(
    historical.events.map(({ data }) => data.id).sort(),
    ['historical-2010', 'historical-2015', 'historical-2020'],
  );
  assert.equal(historical.label, `${TIMELINE_HISTORICAL_CUTOFF}–2010`);
  assert.equal(historical.microSlotPitch, 7);

  for (const segment of geometry.segments.filter(({ key }) => key !== 'through-2020')) {
    assert.equal(segment.label, String(segment.year));
    assert.equal(segment.microSlotPitch, 9);
  }

  // A historical group whose oldest year equals the cutoff keeps the plain cutoff label.
  const atCutoff = buildTimelineGeometry([event('only-2020', '2020-03-01', ['acme'])]);
  assert.equal(atCutoff.segments.length, 1);
  assert.equal(atCutoff.segments[0].label, String(TIMELINE_HISTORICAL_CUTOFF));
});

test('Events sharing a lane never occupy the same packed band', () => {
  const geometry = buildTimelineGeometry(fixtures());
  const byId = new Map(fixtures().map((value) => [value.data.id, value]));

  for (const segment of geometry.segments) {
    for (const band of segment.bands) {
      for (let left = 0; left < band.events.length; left += 1) {
        for (let right = left + 1; right < band.events.length; right += 1) {
          const first = laneKeys(band.events[left]);
          const second = new Set(laneKeys(band.events[right]));
          const shared = first.filter((key) => second.has(key));
          assert.deepEqual(
            shared,
            [],
            `${band.events[left].data.id} and ${band.events[right].data.id} collide in one band`,
          );
        }
      }
      assert.deepEqual(
        [...band.occupiedLaneKeys].sort(),
        [...new Set(band.events.flatMap(laneKeys))].sort(),
      );
    }
  }

  // The two shared-lane historical Events must land in different bands.
  const historical = geometry.segments.find(({ key }) => key === 'through-2020');
  assert.ok(historical);
  const bandOf = (id: string) => historical.bands.findIndex((band) => (
    band.events.some((entry) => entry.data.id === id)
  ));
  assert.notEqual(bandOf('historical-2010'), bandOf('historical-2015'));
  assert.ok(bandOf('historical-2010') >= 0 && bandOf('historical-2015') >= 0);

  // Every segment band is non-empty and its width follows the documented micro-slot pitch.
  for (const segment of geometry.segments) {
    assert.ok(segment.bands.length >= 1);
    for (const band of segment.bands) {
      assert.ok(band.events.length >= 1);
      assert.equal(band.width, 18 + ((band.events.length - 1) * segment.microSlotPitch));
    }
    assert.deepEqual(
      segment.events.map(({ data }) => data.id).sort(),
      segment.bands.flatMap((band) => band.events.map(({ data }) => data.id)).sort(),
    );
    assert.ok(byId.size > 0);
  }
});

test('segment widths never fall below the defined minimum', () => {
  const geometry = buildTimelineGeometry(fixtures());

  for (const segment of geometry.segments) {
    assert.ok(segment.width >= TIMELINE_MIN_SEGMENT_WIDTH, `${segment.key} is narrower than the minimum`);
    const packed = segment.bands.reduce((total, band) => total + band.width, 0)
      + (Math.max(segment.bands.length - 1, 0) * segment.bandGap);
    assert.ok(segment.width >= packed);
    assert.equal(segment.contentInset, (segment.width - packed) / 2);
  }

  assert.ok(geometry.width >= TIMELINE_MIN_SEGMENT_WIDTH);
  assert.equal(
    geometry.width,
    Math.max(...geometry.segments.map(({ offset, width }) => offset + width), TIMELINE_MIN_SEGMENT_WIDTH),
  );
  assert.equal(geometry.columns, geometry.segments.map(({ width }) => `${width}px`).join(' '));
});

test('Event positions are derived, ordered and deterministic', () => {
  const geometry = buildTimelineGeometry(fixtures());
  const segmentByKey = new Map(geometry.segments.map((segment) => [segment.key, segment]));

  for (const segment of geometry.segments) {
    let previousX = Number.NEGATIVE_INFINITY;
    for (const band of segment.bands) {
      band.events.forEach((entry, microSlot) => {
        const position = geometry.positionByEventId.get(entry.data.id);
        assert.ok(position, `${entry.data.id} must have a position`);
        assert.equal(position.segmentKey, segment.key);
        assert.equal(position.microSlot, microSlot);
        assert.equal(position.band, segment.bands.indexOf(band));
        assert.ok(position.x > previousX, 'events must advance along the Timeline');
      });
      previousX = Math.max(
        ...band.events.map((entry) => geometry.positionByEventId.get(entry.data.id)?.x ?? Number.NEGATIVE_INFINITY),
      );
    }
    assert.equal(segmentByKey.get(segment.key)?.offset, segment.offset);
  }

  assert.equal(geometry.positionByEventId.size, fixtures().length);
  for (const [id, position] of geometry.positionByEventId) {
    const segment = segmentByKey.get(position.segmentKey);
    assert.ok(segment, `${id} must belong to a built segment`);
    assert.ok(position.x >= segment.offset && position.x <= segment.offset + segment.width);
  }
});

test('Timeline geometry is invariant under reversed input', () => {
  const forward = buildTimelineGeometry(fixtures());
  const reversed = buildTimelineGeometry([...fixtures()].reverse());

  assert.deepEqual(projection(reversed), projection(forward));
  assert.deepEqual(projection(buildTimelineGeometry(fixtures())), projection(forward));
  assert.deepEqual(
    [...reversed.positionByEventId.keys()].sort(),
    [...forward.positionByEventId.keys()].sort(),
  );
});
