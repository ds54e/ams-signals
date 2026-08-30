import type { CompanyEntry, EventEntry, PersonEntry } from './content';
import { dateNumber, eventYear, sortEventsNewestFirst } from './content';

export const ACTIVITY_MATRIX_MIN_TRACK_WIDTH = 620;
export const ACTIVITY_MATRIX_COLLISION_FOOTPRINT = 18;
export const ACTIVITY_MATRIX_BASE_ROW_HEIGHT = 28;
export const ACTIVITY_MATRIX_COLLISION_SLOT_PITCH = 14;

export type ActivityEntityType = 'company' | 'person';

export interface ActivityMatrixDomain {
  oldestYear: number;
  latestYear: number;
  start: number;
  end: number;
}

export interface ActivityMatrixTick {
  year: number;
  label: string;
  x: number;
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

export interface ActivityMatrixAnchor {
  key: string;
  x: number;
  placementTimestamp: number;
  events: EventEntry[];
  eventIds: string[];
  kinds: Array<EventEntry['data']['kind']>;
  slot: number;
}

export interface ActivityMatrixRow<T extends CompanyEntry | PersonEntry> extends OrderedActivityEntity<T> {
  anchors: ActivityMatrixAnchor[];
  slotCount: number;
  height: number;
}

export interface ActivityMatrixGeometry {
  domain: ActivityMatrixDomain;
  ticks: ActivityMatrixTick[];
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
    start: Date.UTC(oldestYear, 0, 1),
    end: Date.UTC(latestYear + 1, 0, 1),
  };
}

export function activityMatrixX(placementTimestamp: number, domain: ActivityMatrixDomain): number {
  const duration = domain.end - domain.start;
  const normalized = duration === 0 ? 0.5 : (domain.end - placementTimestamp) / duration;
  return Math.min(Math.max(normalized, 0), 1) * 100;
}

function yearMidpointTimestamp(year: number): number {
  const start = Date.UTC(year, 0, 1);
  const end = Date.UTC(year + 1, 0, 1);
  return start + ((end - start) / 2);
}

export function generateActivityMatrixTicks(domain: ActivityMatrixDomain): ActivityMatrixTick[] {
  const years = new Set<number>([domain.latestYear]);

  if (domain.latestYear > 2020) {
    for (let year = domain.latestYear - 2; year > 2020; year -= 2) {
      if (year >= domain.oldestYear) years.add(year);
    }
  }

  if (domain.oldestYear <= 2020 && domain.latestYear >= 2020) years.add(2020);

  const historicalStart = Math.min(domain.latestYear, 2019);
  for (let year = Math.floor(historicalStart / 5) * 5; year > domain.oldestYear; year -= 5) {
    years.add(year);
  }

  years.add(domain.oldestYear);

  return [...years]
    .filter((year) => year >= domain.oldestYear && year <= domain.latestYear)
    .sort((left, right) => right - left)
    .map((year) => ({
      year,
      label: String(year),
      x: activityMatrixX(yearMidpointTimestamp(year), domain),
    }));
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

export function activityAnchorKey(event: EventEntry): string {
  return `${event.data.when.precision}:${event.data.when.start}`;
}

function buildAnchors(events: EventEntry[], domain: ActivityMatrixDomain): ActivityMatrixAnchor[] {
  const clustered = new Map<string, EventEntry[]>();

  for (const event of events) {
    const key = activityAnchorKey(event);
    const members = clustered.get(key) ?? [];
    members.push(event);
    clustered.set(key, members);
  }

  const anchors = [...clustered.entries()].map(([key, members]): ActivityMatrixAnchor => {
    const orderedMembers = sortEventsNewestFirst(members);
    const placementTimestamp = eventVisualPlacementTimestamp(orderedMembers[0]);
    return {
      key,
      x: activityMatrixX(placementTimestamp, domain),
      placementTimestamp,
      events: orderedMembers,
      eventIds: orderedMembers.map((event) => event.data.id),
      kinds: [...new Set(orderedMembers.map((event) => event.data.kind))].sort(),
      slot: 0,
    };
  }).sort((left, right) => (
    left.x - right.x
    || left.key.localeCompare(right.key, 'en')
    || left.eventIds[0].localeCompare(right.eventIds[0], 'en')
  ));

  const minimumSeparation = (ACTIVITY_MATRIX_COLLISION_FOOTPRINT / ACTIVITY_MATRIX_MIN_TRACK_WIDTH) * 100;
  const latestXBySlot: number[] = [];

  for (const anchor of anchors) {
    let slot = latestXBySlot.findIndex((latestX) => anchor.x - latestX >= minimumSeparation);
    if (slot === -1) slot = latestXBySlot.length;
    anchor.slot = slot;
    latestXBySlot[slot] = anchor.x;
  }

  return anchors;
}

function buildRows<T extends CompanyEntry | PersonEntry>(
  orderedEntities: Array<OrderedActivityEntity<T>>,
  domain: ActivityMatrixDomain,
): Array<ActivityMatrixRow<T>> {
  return orderedEntities.map((orderedEntity) => {
    const anchors = buildAnchors(orderedEntity.events, domain);
    const slotCount = Math.max(...anchors.map(({ slot }) => slot), 0) + 1;
    return {
      ...orderedEntity,
      anchors,
      slotCount,
      height: ACTIVITY_MATRIX_BASE_ROW_HEIGHT
        + ((slotCount - 1) * ACTIVITY_MATRIX_COLLISION_SLOT_PITCH),
    };
  });
}

export function buildActivityMatrixGeometry(
  events: EventEntry[],
  companies: CompanyEntry[],
  people: PersonEntry[],
): ActivityMatrixGeometry {
  const domain = deriveActivityMatrixDomain(events);
  const companyRows = buildRows(orderEntitiesByRecentActivity(companies, events, 'company'), domain);
  const peopleRows = buildRows(orderEntitiesByRecentActivity(people, events, 'person'), domain);
  return {
    domain,
    ticks: generateActivityMatrixTicks(domain),
    companyRows,
    peopleRows,
    combinedRows: [...companyRows, ...peopleRows].sort(compareActivityEntities),
  };
}
