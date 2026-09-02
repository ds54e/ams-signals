import type { CompanyEntry, EventEntry, PersonEntry } from './content';
import { dateNumber, eventYear, sortEventsNewestFirst } from './content';

export const ACTIVITY_MATRIX_BUNDLE_PROXIMITY = 32;
export const ACTIVITY_MATRIX_BUNDLE_CELL_SIZE = 16;
export const ACTIVITY_MATRIX_BUNDLE_GAP = 2;
export const ACTIVITY_MATRIX_VISUAL_ROW_PITCH = ACTIVITY_MATRIX_BUNDLE_CELL_SIZE + ACTIVITY_MATRIX_BUNDLE_GAP;
export const ACTIVITY_MATRIX_MAX_BUNDLE_COLUMNS = 3;
export const ACTIVITY_MATRIX_BASE_ROW_HEIGHT = 28;
export const ACTIVITY_MATRIX_ROW_PADDING = 5;
export const ACTIVITY_MATRIX_RECENT_WIDTH_BASE = 74;
export const ACTIVITY_MATRIX_RECENT_WIDTH_PER_EVENT = 10;
export const ACTIVITY_MATRIX_RECENT_MIN_WIDTH = 100;
export const ACTIVITY_MATRIX_RECENT_MAX_WIDTH = 160;

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
  maxEventsPerRow: number;
  zone: ActivityMatrixTimeZone;
  resolution: ActivityMatrixTimeResolution;
}

export interface ActivityMatrixBoundary {
  key: string;
  xPx: number;
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
  originalXPx: number;
  placementTimestamp: number;
  timeBandKey: string;
  timeZone: ActivityMatrixTimeZone;
  timeResolution: ActivityMatrixTimeResolution;
}

export interface ActivityMatrixBundle {
  key: string;
  x: number;
  xPx: number;
  members: ActivityMatrixBundleMember[];
  eventIds: string[];
  minOriginalX: number;
  maxOriginalX: number;
  maxOriginalDisplacement: number;
  maxOriginalDisplacementPx: number;
  columnCount: number;
  rowCount: number;
  bundleWidthPx: number;
  collisionWidthPx: number;
  height: number;
  rowStart: number;
  rowEnd: number;
  top: number;
  mode: ActivityMatrixBundleMode;
  timeBandKeys: string[];
  timeZone: ActivityMatrixTimeZone;
  timeResolution: ActivityMatrixTimeResolution;
}

export interface ActivityMatrixRow<T extends CompanyEntry | PersonEntry> extends OrderedActivityEntity<T> {
  bundles: ActivityMatrixBundle[];
  visualRowCount: number;
  height: number;
}

export interface ActivityMatrixBundleRowPlacement {
  rowStart: number;
  rowEnd: number;
}

export interface ActivityMatrixGeometry {
  domain: ActivityMatrixDomain;
  trackWidth: number;
  timeBands: ActivityMatrixTimeBand[];
  boundaries: ActivityMatrixBoundary[];
  companyRows: Array<ActivityMatrixRow<CompanyEntry>>;
  peopleRows: Array<ActivityMatrixRow<PersonEntry>>;
  combinedRows: Array<ActivityMatrixRow<CompanyEntry | PersonEntry>>;
}

type BandDensity = ReadonlyMap<string, number> | Readonly<Record<string, number>>;
type ActivityMatrixBandDefinition = Omit<
  ActivityMatrixTimeBand,
  'widthPx' | 'startPx' | 'endPx' | 'maxEventsPerRow'
>;

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
  return {
    oldestYear: Math.min(...years),
    latestYear: Math.max(...years),
  };
}

function activityMatrixBandDefinitions(latestYear: number): ActivityMatrixBandDefinition[] {
  return [
    ...[0, 1, 2].map((offset): ActivityMatrixBandDefinition => {
      const year = latestYear - offset;
      return {
        key: `year-${year}`,
        label: String(year),
        ariaLabel: String(year),
        startYear: year,
        endYear: year,
        zone: 'recent',
        resolution: 'continuous',
      };
    }),
    ...[3].map((offset): ActivityMatrixBandDefinition => {
      const year = latestYear - offset;
      return {
        key: `year-${year}`,
        label: String(year),
        ariaLabel: String(year),
        startYear: year,
        endYear: year,
        zone: 'earlier',
        resolution: 'bucket',
      };
    }),
    {
      key: `years-${latestYear - 6}-${latestYear - 4}`,
      label: `${latestYear - 6}–${latestYear - 4}`,
      ariaLabel: `${latestYear - 6}–${latestYear - 4}`,
      startYear: latestYear - 6,
      endYear: latestYear - 4,
      zone: 'earlier',
      resolution: 'bucket',
    },
    {
      key: `years-${latestYear - 11}-${latestYear - 7}`,
      label: `${latestYear - 11}–${latestYear - 7}`,
      ariaLabel: `${latestYear - 11}–${latestYear - 7}`,
      startYear: latestYear - 11,
      endYear: latestYear - 7,
      zone: 'earlier',
      resolution: 'bucket',
    },
    {
      key: `through-${latestYear - 12}`,
      label: `≤${latestYear - 12}`,
      ariaLabel: `${latestYear - 12} and earlier`,
      endYear: latestYear - 12,
      zone: 'earlier',
      resolution: 'bucket',
    },
  ];
}

function densityForBand(density: BandDensity, key: string): number {
  const value = density instanceof Map ? density.get(key) : density[key];
  return Math.max(Number(value) || 0, 0);
}

export function activityMatrixBundleColumns(memberCount: number): number {
  const count = Math.max(Math.trunc(memberCount), 0);
  if (count === 0) return 0;

  const maxColumns = Math.min(count, ACTIVITY_MATRIX_MAX_BUNDLE_COLUMNS);
  const minimumRows = Math.ceil(count / maxColumns);
  for (let columns = 1; columns <= maxColumns; columns += 1) {
    if (Math.ceil(count / columns) === minimumRows) return columns;
  }

  return maxColumns;
}

export function activityMatrixBundleRows(memberCount: number): number {
  const count = Math.max(Math.trunc(memberCount), 0);
  const columns = activityMatrixBundleColumns(count);
  return columns === 0 ? 0 : Math.ceil(count / columns);
}

export function activityMatrixBundleWidthPx(memberCount: number): number {
  const columns = activityMatrixBundleColumns(memberCount);
  return columns === 0
    ? 0
    : (columns * ACTIVITY_MATRIX_BUNDLE_CELL_SIZE) + ((columns - 1) * ACTIVITY_MATRIX_BUNDLE_GAP);
}

export function deriveActivityMatrixBandWidth(
  band: ActivityMatrixBandDefinition,
  maxEventsPerRow: number,
): number {
  if (band.resolution === 'continuous') {
    return Math.min(
      Math.max(
        ACTIVITY_MATRIX_RECENT_WIDTH_BASE + (ACTIVITY_MATRIX_RECENT_WIDTH_PER_EVENT * maxEventsPerRow),
        ACTIVITY_MATRIX_RECENT_MIN_WIDTH,
      ),
      ACTIVITY_MATRIX_RECENT_MAX_WIDTH,
    );
  }

  const minimumLabelWidth = band.startYear === undefined
    ? 68
    : band.startYear === band.endYear
      ? 52
      : 76;
  return Math.max(minimumLabelWidth, activityMatrixBundleWidthPx(maxEventsPerRow) + 16);
}

export function deriveActivityMatrixTimeBands(
  latestYear: number,
  maxEventsPerRowByBand: BandDensity = new Map(),
): ActivityMatrixTimeBand[] {
  let nextStartPx = 0;
  return activityMatrixBandDefinitions(latestYear).map((definition) => {
    const maxEventsPerRow = densityForBand(maxEventsPerRowByBand, definition.key);
    const widthPx = deriveActivityMatrixBandWidth(definition, maxEventsPerRow);
    const startPx = nextStartPx;
    const endPx = startPx + widthPx;
    nextStartPx = endPx;
    return { ...definition, maxEventsPerRow, widthPx, startPx, endPx };
  });
}

export function deriveActivityMatrixBoundaries(
  bands: ActivityMatrixTimeBand[],
): ActivityMatrixBoundary[] {
  return bands.slice(0, -1).map((band) => ({
    key: `${band.key}-end`,
    xPx: band.endPx,
  }));
}

function timeBandContainsYear(band: Pick<ActivityMatrixTimeBand, 'startYear' | 'endYear'>, year: number): boolean {
  return band.startYear === undefined
    ? year <= band.endYear
    : year >= band.startYear && year <= band.endYear;
}

function activityMatrixBandKeyForYear(latestYear: number, year: number): string {
  const definition = activityMatrixBandDefinitions(latestYear)
    .find((band) => timeBandContainsYear(band, year));
  if (!definition) throw new Error(`No Activity Matrix time band contains ${year}.`);
  return definition.key;
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
  const trackWidth = bands.at(-1)?.endPx ?? 0;
  if (trackWidth <= 0) throw new Error('Activity Matrix track width must be positive.');

  let xPx = band.startPx + (band.widthPx / 2);
  if (band.resolution === 'continuous') {
    const yearStart = Date.UTC(year, 0, 1);
    const yearEnd = Date.UTC(year + 1, 0, 1);
    const yearProgress = (placementTimestamp - yearStart) / (yearEnd - yearStart);
    xPx = band.startPx + ((1 - Math.min(Math.max(yearProgress, 0), 1)) * band.widthPx);
  }

  return {
    x: (xPx / trackWidth) * 100,
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

function deriveBandDensity(
  latestYear: number,
  orderedEntities: Array<OrderedActivityEntity<CompanyEntry | PersonEntry>>,
): Map<string, number> {
  const density = new Map(activityMatrixBandDefinitions(latestYear).map(({ key }) => [key, 0]));
  for (const { events } of orderedEntities) {
    const counts = new Map<string, number>();
    for (const event of events) {
      const key = activityMatrixBandKeyForYear(latestYear, eventYear(event));
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    for (const [key, count] of counts) density.set(key, Math.max(density.get(key) ?? 0, count));
  }
  return density;
}

function bundleHeight(memberCount: number): number {
  const rowCount = Math.max(activityMatrixBundleRows(memberCount), 1);
  return (rowCount * ACTIVITY_MATRIX_BUNDLE_CELL_SIZE)
    + ((rowCount - 1) * ACTIVITY_MATRIX_BUNDLE_GAP);
}

type ActivityMatrixPackableBundle = Pick<
  ActivityMatrixBundle,
  'xPx' | 'collisionWidthPx' | 'rowCount'
>;

function activityMatrixBundlesConflictHorizontally(
  left: ActivityMatrixPackableBundle,
  right: ActivityMatrixPackableBundle,
): boolean {
  const leftStart = left.xPx - (left.collisionWidthPx / 2);
  const leftEnd = left.xPx + (left.collisionWidthPx / 2);
  const rightStart = right.xPx - (right.collisionWidthPx / 2);
  const rightEnd = right.xPx + (right.collisionWidthPx / 2);
  return !(
    leftEnd + ACTIVITY_MATRIX_BUNDLE_GAP <= rightStart
    || rightEnd + ACTIVITY_MATRIX_BUNDLE_GAP <= leftStart
  );
}

function activityMatrixRowRangesOverlap(
  left: ActivityMatrixBundleRowPlacement,
  right: ActivityMatrixBundleRowPlacement,
): boolean {
  return left.rowStart < right.rowEnd && right.rowStart < left.rowEnd;
}

export function packActivityMatrixBundleRows(
  bundles: ActivityMatrixPackableBundle[],
): ActivityMatrixBundleRowPlacement[] {
  const placed: Array<ActivityMatrixPackableBundle & ActivityMatrixBundleRowPlacement> = [];

  return bundles.map((bundle) => {
    let rowStart = 0;
    while (placed.some((candidate) => (
      activityMatrixBundlesConflictHorizontally(bundle, candidate)
      && activityMatrixRowRangesOverlap(
        { rowStart, rowEnd: rowStart + bundle.rowCount },
        candidate,
      )
    ))) {
      rowStart += 1;
    }

    const placement = { rowStart, rowEnd: rowStart + bundle.rowCount };
    placed.push({ ...bundle, ...placement });
    return placement;
  });
}

export function buildActivityMatrixBundles(
  events: EventEntry[],
  bands: ActivityMatrixTimeBand[],
): ActivityMatrixBundle[] {
  const trackWidth = bands.at(-1)?.endPx ?? 0;
  if (trackWidth <= 0) throw new Error('Activity Matrix track width must be positive.');

  const members = events.map((event): ActivityMatrixBundleMember => {
    const placementTimestamp = eventVisualPlacementTimestamp(event);
    const projection = projectTimestampToActivityMatrix(placementTimestamp, bands);
    return {
      event,
      eventId: event.data.id,
      kind: event.data.kind,
      originalX: projection.x,
      originalXPx: projection.xPx,
      placementTimestamp,
      timeBandKey: projection.band.key,
      timeZone: projection.band.zone,
      timeResolution: projection.band.resolution,
    };
  }).sort((left, right) => (
    left.originalXPx - right.originalXPx
    || left.eventId.localeCompare(right.eventId, 'en')
  ));

  const memberGroups: Array<{
    mode: ActivityMatrixBundleMode;
    members: ActivityMatrixBundleMember[];
  }> = [];

  for (const member of members.filter(({ timeZone }) => timeZone === 'recent')) {
    const current = memberGroups.at(-1);
    if (!current
      || current.mode !== 'proximity'
      || member.originalXPx - current.members[0].originalXPx > ACTIVITY_MATRIX_BUNDLE_PROXIMITY) {
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
    const xPx = bundleMembers.reduce((sum, member) => sum + member.originalXPx, 0) / bundleMembers.length;
    const x = (xPx / trackWidth) * 100;
    const minOriginalX = Math.min(...bundleMembers.map(({ originalX }) => originalX));
    const maxOriginalX = Math.max(...bundleMembers.map(({ originalX }) => originalX));
    const eventIds = bundleMembers.map(({ eventId }) => eventId);
    const timeBandKeys = [...new Set(bundleMembers.map(({ timeBandKey }) => timeBandKey))];
    const columnCount = activityMatrixBundleColumns(bundleMembers.length);
    const rowCount = Math.max(activityMatrixBundleRows(bundleMembers.length), 1);
    const bundleWidthPx = activityMatrixBundleWidthPx(bundleMembers.length);
    return {
      key: eventIds.join('|'),
      x,
      xPx,
      members: bundleMembers,
      eventIds,
      minOriginalX,
      maxOriginalX,
      maxOriginalDisplacement: Math.max(...bundleMembers.map((member) => Math.abs(member.originalX - x))),
      maxOriginalDisplacementPx: Math.max(...bundleMembers.map((member) => Math.abs(member.originalXPx - xPx))),
      columnCount,
      rowCount,
      bundleWidthPx,
      collisionWidthPx: bundleWidthPx,
      height: bundleHeight(bundleMembers.length),
      rowStart: 0,
      rowEnd: rowCount,
      top: ACTIVITY_MATRIX_ROW_PADDING,
      mode,
      timeBandKeys,
      timeZone: bundleMembers[0].timeZone,
      timeResolution: bundleMembers[0].timeResolution,
    };
  }).sort((left, right) => left.xPx - right.xPx || left.key.localeCompare(right.key, 'en'));

  const placements = packActivityMatrixBundleRows(bundles);
  bundles.forEach((bundle, index) => {
    bundle.rowStart = placements[index].rowStart;
    bundle.rowEnd = placements[index].rowEnd;
    bundle.top = ACTIVITY_MATRIX_ROW_PADDING
      + (bundle.rowStart * ACTIVITY_MATRIX_VISUAL_ROW_PITCH);
  });

  return bundles;
}

function buildRows<T extends CompanyEntry | PersonEntry>(
  orderedEntities: Array<OrderedActivityEntity<T>>,
  bands: ActivityMatrixTimeBand[],
): Array<ActivityMatrixRow<T>> {
  return orderedEntities.map((orderedEntity) => {
    const bundles = buildActivityMatrixBundles(orderedEntity.events, bands);
    const visualRowCount = Math.max(...bundles.map(({ rowEnd }) => rowEnd), 1);
    const occupiedHeight = Math.max(
      ...bundles.map((bundle) => bundle.top + bundle.height + ACTIVITY_MATRIX_ROW_PADDING),
      ACTIVITY_MATRIX_BASE_ROW_HEIGHT,
    );
    return {
      ...orderedEntity,
      bundles,
      visualRowCount,
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
  const orderedCompanies = orderEntitiesByRecentActivity(companies, events, 'company');
  const orderedPeople = orderEntitiesByRecentActivity(people, events, 'person');
  const density = deriveBandDensity(
    domain.latestYear,
    [...orderedCompanies, ...orderedPeople] as Array<OrderedActivityEntity<CompanyEntry | PersonEntry>>,
  );
  const timeBands = deriveActivityMatrixTimeBands(domain.latestYear, density);
  const trackWidth = timeBands.at(-1)?.endPx ?? 0;
  const companyRows = buildRows(orderedCompanies, timeBands);
  const peopleRows = buildRows(orderedPeople, timeBands);
  return {
    domain,
    trackWidth,
    timeBands,
    boundaries: deriveActivityMatrixBoundaries(timeBands),
    companyRows,
    peopleRows,
    combinedRows: [...companyRows, ...peopleRows].sort(compareActivityEntities),
  };
}
