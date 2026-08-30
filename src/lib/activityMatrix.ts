import type { CompanyEntry, EventEntry, PersonEntry } from './content';
import { dateNumber, eventYear, sortEventsNewestFirst } from './content';

export const ACTIVITY_MATRIX_MIN_TRACK_WIDTH = 620;
export const ACTIVITY_MATRIX_BUNDLE_PROXIMITY = 32;
export const ACTIVITY_MATRIX_BUNDLE_CELL_SIZE = 16;
export const ACTIVITY_MATRIX_BUNDLE_GAP = 2;
export const ACTIVITY_MATRIX_BUNDLE_COLLISION_FOOTPRINT = 34;
export const ACTIVITY_MATRIX_BASE_ROW_HEIGHT = 28;
export const ACTIVITY_MATRIX_ROW_PADDING = 5;
export const ACTIVITY_MATRIX_COLLISION_SLOT_GAP = 4;

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

export interface ActivityMatrixBundleMember {
  event: EventEntry;
  eventId: string;
  kind: EventEntry['data']['kind'];
  originalX: number;
  placementTimestamp: number;
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
}

export interface ActivityMatrixRow<T extends CompanyEntry | PersonEntry> extends OrderedActivityEntity<T> {
  bundles: ActivityMatrixBundle[];
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

function bundleHeight(memberCount: number): number {
  const rowCount = Math.max(Math.ceil(memberCount / 2), 1);
  return (rowCount * ACTIVITY_MATRIX_BUNDLE_CELL_SIZE)
    + ((rowCount - 1) * ACTIVITY_MATRIX_BUNDLE_GAP);
}

function buildBundles(events: EventEntry[], domain: ActivityMatrixDomain): ActivityMatrixBundle[] {
  const members = events.map((event): ActivityMatrixBundleMember => {
    const placementTimestamp = eventVisualPlacementTimestamp(event);
    return {
      event,
      eventId: event.data.id,
      kind: event.data.kind,
      originalX: activityMatrixX(placementTimestamp, domain),
      placementTimestamp,
    };
  }).sort((left, right) => (
    left.originalX - right.originalX
    || left.eventId.localeCompare(right.eventId, 'en')
  ));

  const bundleWindow = (ACTIVITY_MATRIX_BUNDLE_PROXIMITY / ACTIVITY_MATRIX_MIN_TRACK_WIDTH) * 100;
  const memberGroups: ActivityMatrixBundleMember[][] = [];

  for (const member of members) {
    const current = memberGroups.at(-1);
    if (!current || member.originalX - current[0].originalX > bundleWindow) {
      memberGroups.push([member]);
    } else {
      current.push(member);
    }
  }

  const bundles = memberGroups.map((bundleMembers): ActivityMatrixBundle => {
    const x = bundleMembers.reduce((sum, member) => sum + member.originalX, 0) / bundleMembers.length;
    const minOriginalX = bundleMembers[0].originalX;
    const maxOriginalX = bundleMembers.at(-1)?.originalX ?? minOriginalX;
    const eventIds = bundleMembers.map(({ eventId }) => eventId);
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
    };
  });

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
  domain: ActivityMatrixDomain,
): Array<ActivityMatrixRow<T>> {
  return orderedEntities.map((orderedEntity) => {
    const bundles = buildBundles(orderedEntity.events, domain);
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
