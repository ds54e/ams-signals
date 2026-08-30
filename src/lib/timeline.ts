import type { EventEntry } from './content';
import { eventYear, sortEventsNewestFirst } from './content';

export const TIMELINE_HISTORICAL_CUTOFF = 2020;
export const TIMELINE_MARK_SIZE = 14;
export const TIMELINE_RECENT_MICRO_SLOT_PITCH = 9;
export const TIMELINE_HISTORICAL_MICRO_SLOT_PITCH = 7;
export const TIMELINE_RECENT_BAND_GAP = 11;
export const TIMELINE_HISTORICAL_BAND_GAP = 9;
export const TIMELINE_SEGMENT_INLINE_PADDING = 12;
export const TIMELINE_MIN_SEGMENT_WIDTH = 84;

export interface TimelinePosition {
  x: number;
  segmentKey: string;
  band: number;
  microSlot: number;
}

export interface TimelineBand {
  events: EventEntry[];
  occupiedLaneKeys: Set<string>;
  width: number;
}

export interface TimelineSegment {
  key: string;
  label: string;
  year: number;
  events: EventEntry[];
  bands: TimelineBand[];
  width: number;
  offset: number;
  microSlotPitch: number;
  bandGap: number;
  contentInset: number;
}

export interface TimelineGeometry {
  segments: TimelineSegment[];
  width: number;
  columns: string;
  positionByEventId: Map<string, TimelinePosition>;
}

function occupiedLaneKeys(event: EventEntry): Set<string> {
  return new Set([
    ...event.data.companies.map((id) => `company:${id}`),
    ...event.data.people.map((id) => `person:${id}`),
  ]);
}

function intersects(left: Set<string>, right: Set<string>): boolean {
  for (const key of left) {
    if (right.has(key)) return true;
  }
  return false;
}

function packBands(events: EventEntry[], microSlotPitch: number): TimelineBand[] {
  const bands: TimelineBand[] = [];

  for (const event of events) {
    const eventLaneKeys = occupiedLaneKeys(event);
    let band = bands.at(-1);

    if (!band || intersects(eventLaneKeys, band.occupiedLaneKeys)) {
      band = {
        events: [],
        occupiedLaneKeys: new Set<string>(),
        width: 0,
      };
      bands.push(band);
    }

    band.events.push(event);
    for (const key of eventLaneKeys) band.occupiedLaneKeys.add(key);
    band.width = TIMELINE_MARK_SIZE + ((band.events.length - 1) * microSlotPitch);
  }

  return bands;
}

export function buildTimelineGeometry(events: EventEntry[]): TimelineGeometry {
  const groups = new Map<string, { key: string; label: string; year: number; events: EventEntry[] }>();

  for (const event of sortEventsNewestFirst(events)) {
    const year = eventYear(event);
    const historical = year <= TIMELINE_HISTORICAL_CUTOFF;
    const key = historical ? 'through-2020' : String(year);
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: historical ? '≤2020' : String(year),
        year: historical ? TIMELINE_HISTORICAL_CUTOFF : year,
        events: [],
      });
    }
    groups.get(key)?.events.push(event);
  }

  let timelineOffset = 0;
  const positionByEventId = new Map<string, TimelinePosition>();
  const segments = [...groups.values()]
    .sort((left, right) => right.year - left.year)
    .map((group): TimelineSegment => {
      const historical = group.key === 'through-2020';
      const microSlotPitch = historical
        ? TIMELINE_HISTORICAL_MICRO_SLOT_PITCH
        : TIMELINE_RECENT_MICRO_SLOT_PITCH;
      const bandGap = historical
        ? TIMELINE_HISTORICAL_BAND_GAP
        : TIMELINE_RECENT_BAND_GAP;
      const bands = packBands(group.events, microSlotPitch);
      const packedWidth = bands.reduce((total, band) => total + band.width, 0)
        + (Math.max(bands.length - 1, 0) * bandGap);
      const width = Math.max(
        TIMELINE_MIN_SEGMENT_WIDTH,
        (TIMELINE_SEGMENT_INLINE_PADDING * 2) + packedWidth,
      );
      const contentInset = (width - packedWidth) / 2;
      const segment: TimelineSegment = {
        ...group,
        bands,
        width,
        offset: timelineOffset,
        microSlotPitch,
        bandGap,
        contentInset,
      };

      let bandOffset = contentInset;
      bands.forEach((band, bandIndex) => {
        band.events.forEach((event, microSlot) => {
          positionByEventId.set(event.data.id, {
            x: timelineOffset + bandOffset + (TIMELINE_MARK_SIZE / 2) + (microSlot * microSlotPitch),
            segmentKey: group.key,
            band: bandIndex,
            microSlot,
          });
        });
        bandOffset += band.width + bandGap;
      });

      timelineOffset += width;
      return segment;
    });

  return {
    segments,
    width: Math.max(timelineOffset, TIMELINE_MIN_SEGMENT_WIDTH),
    columns: segments.map((segment) => `${segment.width}px`).join(' '),
    positionByEventId,
  };
}
