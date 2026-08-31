import type { CompanyEntry, EventEntry, PersonEntry } from './content';
import { dateNumber, eventYear, sortEventsNewestFirst } from './content';

export const ACTIVITY_MATRIX_MIN_TRACK_WIDTH = 640;
export const ACTIVITY_MATRIX_RECENT_BAND_WIDTH = 140;
export const ACTIVITY_MATRIX_EARLIER_BAND_WIDTH = 44;
export const ACTIVITY_MATRIX_BUNDLE_PROXIMITY = 32;
export const ACTIVITY_MATRIX_BUNDLE_CELL_SIZE = 16;
export const ACTIVITY_MATRIX_BUNDLE_GAP = 2;
export const ACTIVITY_MATRIX_BUNDLE_COLLISION_FOOTPRINT = 34;
export const ACTIVITY_MATRIX_BASE_ROW_HEIGHT = 28;
export const ACTIVITY_MATRIX_ROW_PADDING = 5;
export const ACTIVITY_MATRIX_COLLISION_SLOT_GAP = 4;

export type ActivityEntityType = 'company' | 'person';
export type ActivityMatrixTimeZone = 'recent' | 'earlier';
export type ActivityMatrixTimeResolution = 'continuous' | 'bucket';
export type ActivityMatrixBundleMode = 'proximity' | 'period';

export interface ActivityMatrixDomain {
  oldestYear: number;
  latestYear: number;
}

export interface ActivityMatrixTimeBand {
  key: string;
  label: string;
  ariaLabel: string;
  startYear?: number;
  endYear: number;
  widthPx: number;
  startPx: number;
  endPx: number;
  zone: ActivityMatrixTimeZone;
  resolution: ActivityMatrixTimeResolution;
}

export interface ActivityMatrixTimeZoneSpan {
  key: ActivityMatrixTimeZone;
  label: 'RECENT' | 'EARLIER';
  startPx: number;
  endPx: number;
  widthPx: number;
}

export interface ActivityMatrixBoundary {
  key: string;
  xPx: number;
  isZoneBoundary: boolean;
}

export interface RecentActivityStats {
  recent3: number;
  recent5: number;
  latestStart: string;
  latestStartTimestamp: number;
  total: number;
}

export interface OrderedActivityEntity<T extends CompanyEntry | PersonEntry> {
  entityType: ActivityEntityType;
  entity: T;
  events: EventEntry[];
  stats: RecentActivityStats;
}

export interface ActivityMatrixBundleMember {
  event: EventEntry;
  eventId: string;
  kind: EventEntry['data']['kind'];
  originalX: number;
  placementTimestamp: number;
  timeBandKey: string;
  timeZone: ActivityMatrixTimeZone;
  timeResolution: ActivityMatrixTimeResolution;
}

export interface ActivityMatrixBundle {
  key: string;
  x: number;
  members: ActivityMatrixBundleMember[];
  eventIds: string[];
  minOriginalX: number;
  maxOriginalX: number;
  maxOriginalDisplacement: number;
  rowCount: number;
  height: number;
  slot: number;
  top: number;
  mode: ActivityMatrixBundleMode;
  timeBandKeys: string[];
  timeZone: ActivityMatrixTimeZone;
  timeResolution: ActivityMatrixTimeResolution;
}

export interface ActivityMatrixRow<T extends CompanyEntry | PersonEntry> extends OrderedActivityEntity<T> {
  bundles: ActivityMatrixBundle[];
  slotCount: number;
  height: number;
}

export interface ActivityMatrixGeometry {
  domain: ActivityMatrixDomain;
  timeBands: ActivityMatrixTimeBand[];
  timeZones: ActivityMatrixTimeZoneSpan[];
  boundaries: ActivityMatrixBoundary[];
  companyRows: Array<ActivityMatrixRow<CompanyEntry>>;
  peopleRows: Array<ActivityMatrixRow<PersonEntry>>;
  combinedRows: Array<ActivityMatrixRow<CompanyEntry | PersonEntry>>;
}

function utcParts(value: string): { year: number; month: number; day: number } {
  const [year, month = '01', day = '01'] = value.split('-').map(Number);
  return { year, month, day };
}

export function eventVisualPlacementTimestamp(event: EventEntry): number {
  const { year, month, day } = utcParts(event.data.when.start);

  if (event.data.when.precision === 'day') {
    return Date.UTC(year, month - 1, day, 12);
  }

  if (event.data.when.precision === 'month') {
    const intervalStart = Date.UTC(year, month - 1, 1);
    const intervalEnd = Date.UTC(year, month, 1);
    return intervalStart + ((intervalEnd - intervalStart) / 2);
  }

  const intervalStart = Date.UTC(year, 0, 1);
  const intervalEnd = Date.UTC(year + 1, 0, 1);
  return intervalStart + ((intervalEnd - intervalStart) / 2);
}

export function deriveActivityMatrixDomain(events: EventEntry[]): ActivityMatrixDomain {
  if (events.length === 0) {
    throw new Error('Activity Matrix geometry requires at least one Event.');
  }

  const years = events.map(eventYear);
  const oldestYear = Math.min(...years);
  const latestYear = Math.max(...years);
  return {
    oldestYear,
    latestYear,
  };
}

function shortYear(year: number): string {
  return String(year).slice(-2).padStart(2, '0');
}

function rangeLabel(startYear: number, endYear: number): string {
  return `${shortYear(startYear)}–${shortYear(endYear)}`;
}

export function deriveActivityMatrixTimeBands(latestYear: number): ActivityMatrixTimeBand[] {
  const definitions: Array<Omit<ActivityMatrixTimeBand, 'startPx' | 'endPx'>> = [
    ...[0, 1, 2].map((offset): Omit<ActivityMatrixTimeBand, 'startPx' | 'endPx'> => {
      const year = latestYear - offset;
      return {
        key: `year-${year}`,
        label: String(year),
        ariaLabel: String(year),
        startYear: year,
        endYear: year,
        widthPx: ACTIVITY_MATRIX_RECENT_BAND_WIDTH,
        zone: 'recent',
        resolution: 'continuous',
      };
    }),
    ...[3, 4].map((offset): Omit<ActivityMatrixTimeBand, 'startPx' | 'endPx'> => {
      const year = latestYear - offset;
      return {
        key: `year-${year}`,
        label: String(year),
        ariaLabel: String(year),
        startYear: year,
        endYear: year,
        widthPx: ACTIVITY_MATRIX_EARLIER_BAND_WIDTH,
        zone: 'earlier',
        resolution: 'bucket',
      };
    }),
    {
      key: `years-${latestYear - 6}-${latestYear - 5}`,
      label: rangeLabel(latestYear - 6, latestYear - 5),
      ariaLabel: `${latestYear - 6}–${latestYear - 5}`,
      startYear: latestYear - 6,
      endYear: latestYear - 5,
      widthPx: ACTIVITY_MATRIX_EARLIER_BAND_WIDTH,
      zone: 'earlier',
      resolution: 'bucket',
    },
    {
      key: `years-${latestYear - 11}-${latestYear - 7}`,
      label: rangeLabel(latestYear - 11, latestYear - 7),
      ariaLabel: `${latestYear - 11}–${latestYear - 7}`,
      startYear: latestYear - 11,
      endYear: latestYear - 7,
      widthPx: ACTIVITY_MATRIX_EARLIER_BAND_WIDTH,
      zone: 'earlier',
      resolution: 'bucket',
    },
    {
      key: `through-${latestYear - 12}`,
      label: `≤${latestYear - 12}`,
      ariaLabel: `${latestYear - 12} and earlier`,
      endYear: latestYear - 12,
      widthPx: ACTIVITY_MATRIX_EARLIER_BAND_WIDTH,
      zone: 'earlier',
      resolution: 'bucket',
    },
  ];

  let nextStartPx = 0;
  return definitions.map((definition) => {
    const startPx = nextStartPx;
    const endPx = startPx + definition.widthPx;
    nextStartPx = endPx;
    return { ...definition, startPx, endPx };
  });
}

export function deriveActivityMatrixTimeZones(
  bands: ActivityMatrixTimeBand[],
): ActivityMatrixTimeZoneSpan[] {
  return (['recent', 'earlier'] as const).map((zone) => {
    const zoneBands = bands.filter((band) => band.zone === zone);
    const startPx = zoneBands[0]?.startPx ?? 0;
    const endPx = zoneBands.at(-1)?.endPx ?? startPx;
    return {
      key: zone,
      label: zone === 'recent' ? 'RECENT' : 'EARLIER',
      startPx,
      endPx,
      widthPx: endPx - startPx,
    };
  });
}

export function deriveActivityMatrixBoundaries(
  bands: ActivityMatrixTimeBand[],
): ActivityMatrixBoundary[] {
  return bands.slice(0, -1).map((band, index) => ({
    key: `${band.key}-end`,
    xPx: band.endPx,
    isZoneBoundary: band.zone !== bands[index + 1]?.zone,
  }));
}

function timeBandContainsYear(band: ActivityMatrixTimeBand, year: number): boolean {
  return band.startYear === undefined
    ? year <= band.endYear
    : year >= band.startYear && year <= band.endYear;
}

export interface ActivityMatrixProjection {
  x: number;
  xPx: number;
  band: ActivityMatrixTimeBand;
}

export function projectTimestampToActivityMatrix(
  placementTimestamp: number,
  bands: ActivityMatrixTimeBand[],
): ActivityMatrixProjection {
  const year = new Date(placementTimestamp).getUTCFullYear();
  const band = bands.find((candidate) => timeBandContainsYear(candidate, year));
  if (!band) throw new Error(`No Activity Matrix time band contains ${year}.`);

  let xPx = band.startPx + (band.widthPx / 2);
  if (band.resolution === 'continuous') {
    const yearStart = Date.UTC(year, 0, 1);
    const yearEnd = Date.UTC(year + 1, 0, 1);
    const yearProgress = (placementTimestamp - yearStart) / (yearEnd - yearStart);
    xPx = band.startPx + ((1 - Math.min(Math.max(yearProgress, 0), 1)) * band.widthPx);
  }

  return {
    x: (xPx / ACTIVITY_MATRIX_MIN_TRACK_WIDTH) * 100,
    xPx,
    band,
  };
}

function eventIdsForEntity(event: EventEntry, entityType: ActivityEntityType): string[] {
  return entityType === 'company' ? event.data.companies : event.data.people;
}

export function orderEntitiesByRecentActivity<T extends CompanyEntry | PersonEntry>(
  entities: T[],
  events: EventEntry[],
  entityType: ActivityEntityType,
): Array<OrderedActivityEntity<T>> {
  if (events.length === 0) return [];
  const latestCorpusYear = Math.max(...events.map(eventYear));

  return entities
    .map((entity): OrderedActivityEntity<T> => {
      const linkedEvents = sortEventsNewestFirst(events.filter((event) => (
        eventIdsForEntity(event, entityType).includes(entity.data.id)
      )));
      const latestEvent = linkedEvents[0];
      return {
        entityType,
        entity,
        events: linkedEvents,
        stats: {
          recent3: linkedEvents.filter((event) => eventYear(event) >= latestCorpusYear - 2).length,
          recent5: linkedEvents.filter((event) => eventYear(event) >= latestCorpusYear - 4).length,
          latestStart: latestEvent?.data.when.start ?? '',
          latestStartTimestamp: latestEvent ? dateNumber(latestEvent.data.when.start) : Number.NEGATIVE_INFINITY,
          total: linkedEvents.length,
        },
      };
    })
    .filter(({ stats }) => stats.total > 0)
    .sort(compareActivityEntities);
}

export function compareActivityEntities(
  left: OrderedActivityEntity<CompanyEntry | PersonEntry>,
  right: OrderedActivityEntity<CompanyEntry | PersonEntry>,
): number {
  return right.stats.recent3 - left.stats.recent3
    || right.stats.recent5 - left.stats.recent5
    || right.stats.latestStartTimestamp - left.stats.latestStartTimestamp
    || right.stats.total - left.stats.total
    || left.entity.data.name.localeCompare(right.entity.data.name, 'en')
    || left.entity.data.id.localeCompare(right.entity.data.id, 'en')
    || left.entityType.localeCompare(right.entityType, 'en');
}

function bundleHeight(memberCount: number): number {
  const rowCount = Math.max(Math.ceil(memberCount / 2), 1);
  return (rowCount * ACTIVITY_MATRIX_BUNDLE_CELL_SIZE)
    + ((rowCount - 1) * ACTIVITY_MATRIX_BUNDLE_GAP);
}

export function buildActivityMatrixBundles(
  events: EventEntry[],
  bands: ActivityMatrixTimeBand[],
): ActivityMatrixBundle[] {
  const members = events.map((event): ActivityMatrixBundleMember => {
    const placementTimestamp = eventVisualPlacementTimestamp(event);
    const projection = projectTimestampToActivityMatrix(placementTimestamp, bands);
    return {
      event,
      eventId: event.data.id,
      kind: event.data.kind,
      originalX: projection.x,
      placementTimestamp,
      timeBandKey: projection.band.key,
      timeZone: projection.band.zone,
      timeResolution: projection.band.resolution,
    };
  }).sort((left, right) => (
    left.originalX - right.originalX
    || left.eventId.localeCompare(right.eventId, 'en')
  ));

  const bundleWindow = (ACTIVITY_MATRIX_BUNDLE_PROXIMITY / ACTIVITY_MATRIX_MIN_TRACK_WIDTH) * 100;
  const memberGroups: Array<{
    mode: ActivityMatrixBundleMode;
    members: ActivityMatrixBundleMember[];
  }> = [];

  for (const member of members.filter(({ timeZone }) => timeZone === 'recent')) {
    const current = memberGroups.at(-1);
    if (!current
      || current.mode !== 'proximity'
      || member.originalX - current.members[0].originalX > bundleWindow) {
      memberGroups.push({ mode: 'proximity', members: [member] });
    } else {
      current.members.push(member);
    }
  }

  for (const band of bands.filter(({ zone }) => zone === 'earlier')) {
    const periodMembers = members.filter(({ timeBandKey }) => timeBandKey === band.key);
    if (periodMembers.length > 0) memberGroups.push({ mode: 'period', members: periodMembers });
  }

  const bundles = memberGroups.map(({ mode, members: groupedMembers }): ActivityMatrixBundle => {
    const bundleMembers = [...groupedMembers].sort((left, right) => (
      right.placementTimestamp - left.placementTimestamp
      || left.eventId.localeCompare(right.eventId, 'en')
    ));
    const x = bundleMembers.reduce((sum, member) => sum + member.originalX, 0) / bundleMembers.length;
    const minOriginalX = Math.min(...bundleMembers.map(({ originalX }) => originalX));
    const maxOriginalX = Math.max(...bundleMembers.map(({ originalX }) => originalX));
    const eventIds = bundleMembers.map(({ eventId }) => eventId);
    const timeBandKeys = [...new Set(bundleMembers.map(({ timeBandKey }) => timeBandKey))];
    const rowCount = Math.max(Math.ceil(bundleMembers.length / 2), 1);
    return {
      key: eventIds.join('|'),
      x,
      members: bundleMembers,
      eventIds,
      minOriginalX,
      maxOriginalX,
      maxOriginalDisplacement: Math.max(...bundleMembers.map((member) => Math.abs(member.originalX - x))),
      rowCount,
      height: bundleHeight(bundleMembers.length),
      slot: 0,
      top: ACTIVITY_MATRIX_ROW_PADDING,
      mode,
      timeBandKeys,
      timeZone: bundleMembers[0].timeZone,
      timeResolution: bundleMembers[0].timeResolution,
    };
  }).sort((left, right) => left.x - right.x || left.key.localeCompare(right.key, 'en'));

  const minimumSeparation = (
    ACTIVITY_MATRIX_BUNDLE_COLLISION_FOOTPRINT / ACTIVITY_MATRIX_MIN_TRACK_WIDTH
  ) * 100;
  const latestXBySlot: number[] = [];

  for (const bundle of bundles) {
    let slot = latestXBySlot.findIndex((latestX) => bundle.x - latestX >= minimumSeparation);
    if (slot === -1) slot = latestXBySlot.length;
    bundle.slot = slot;
    latestXBySlot[slot] = bundle.x;
  }

  const slotHeights = latestXBySlot.map((_, slot) => Math.max(
    ...bundles.filter((bundle) => bundle.slot === slot).map((bundle) => bundle.height),
  ));
  const slotTops: number[] = [];
  let nextTop = ACTIVITY_MATRIX_ROW_PADDING;
  for (const slotHeight of slotHeights) {
    slotTops.push(nextTop);
    nextTop += slotHeight + ACTIVITY_MATRIX_COLLISION_SLOT_GAP;
  }
  for (const bundle of bundles) bundle.top = slotTops[bundle.slot];

  return bundles;
}

function buildRows<T extends CompanyEntry | PersonEntry>(
  orderedEntities: Array<OrderedActivityEntity<T>>,
  bands: ActivityMatrixTimeBand[],
): Array<ActivityMatrixRow<T>> {
  return orderedEntities.map((orderedEntity) => {
    const bundles = buildActivityMatrixBundles(orderedEntity.events, bands);
    const slotCount = Math.max(...bundles.map(({ slot }) => slot), 0) + 1;
    const occupiedHeight = Math.max(
      ...bundles.map((bundle) => bundle.top + bundle.height + ACTIVITY_MATRIX_ROW_PADDING),
      ACTIVITY_MATRIX_BASE_ROW_HEIGHT,
    );
    return {
      ...orderedEntity,
      bundles,
      slotCount,
      height: occupiedHeight,
    };
  });
}

export function buildActivityMatrixGeometry(
  events: EventEntry[],
  companies: CompanyEntry[],
  people: PersonEntry[],
): ActivityMatrixGeometry {
  const domain = deriveActivityMatrixDomain(events);
  const timeBands = deriveActivityMatrixTimeBands(domain.latestYear);
  const companyRows = buildRows(orderEntitiesByRecentActivity(companies, events, 'company'), timeBands);
  const peopleRows = buildRows(orderEntitiesByRecentActivity(people, events, 'person'), timeBands);
  return {
    domain,
    timeBands,
    timeZones: deriveActivityMatrixTimeZones(timeBands),
    boundaries: deriveActivityMatrixBoundaries(timeBands),
    companyRows,
    peopleRows,
    combinedRows: [...companyRows, ...peopleRows].sort(compareActivityEntities),
  };
}
