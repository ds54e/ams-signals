import { compareByNameThenId, sortEventsNewestFirst } from './content.ts';
import { normalizePublicOrigin } from './site-deployment.mjs';

export const EXPORT_SCHEMA_VERSION = 1;

export const EXPORT_PROJECT = {
  name: 'AMS Signals',
  scope: 'Public factual signals in RNM and mixed-signal verification.',
  notes: [
    'Each Event states only what its representative public sources directly support; source modality limits what the record establishes.',
    'The absence of a public Event is not evidence that a company or person lacks related internal activity.',
    'An employer move or acquisition alone does not establish methodology transfer.',
    'Standards participation alone does not establish internal deployment.',
  ],
} as const;

export type ExportSourceStatus = 'available' | 'unavailable';

// Named fixtures: these Person and Event records stay in the viewer but never in the factual export.
export const EXPORT_EXCLUDED_PERSON_IDS: readonly string[] = ['lunlun'];
export const EXPORT_EXCLUDED_EVENT_IDS: readonly string[] = [
  'lunlun-2024-initial-real-time-representation',
  'lunlun-2025-3-0-dynamic-behavior',
];

export interface GoldenCompanyData {
  id: string;
  name: string;
  lastReviewed?: string;
}

export interface GoldenPersonData {
  id: string;
  name: string;
}

export interface GoldenSourceData {
  title: string;
  url: string;
  checkedAt: string;
  status?: ExportSourceStatus;
  summary: string;
  archiveUrl?: string;
}

export interface GoldenEventData {
  id: string;
  when: { start: string; end?: string; precision: 'year' | 'month' | 'day' };
  kind: 'technical' | 'organizational';
  companies: string[];
  people: string[];
  headline: string;
  fact: string;
  sources: GoldenSourceData[];
  affiliationChange?: { person: string; from: string | null; to: string | null };
}

export type ExportedSource = Omit<GoldenSourceData, 'status' | 'archiveUrl'> & {
  status: ExportSourceStatus;
  archiveUrl: string | null;
};

export type ExportedCompany = GoldenCompanyData;
export type ExportedPerson = GoldenPersonData;

export type ExportedEvent = Omit<GoldenEventData, 'sources'> & {
  sources: ExportedSource[];
  recordUrl: string;
};

export interface ExportPayload {
  schemaVersion: typeof EXPORT_SCHEMA_VERSION;
  project: typeof EXPORT_PROJECT;
  companies: ExportedCompany[];
  people: ExportedPerson[];
  events: ExportedEvent[];
}

export interface ExportEntry<T> {
  readonly data: T;
}

export interface ExportPayloadInput {
  companies: readonly ExportEntry<GoldenCompanyData>[];
  people: readonly ExportEntry<GoldenPersonData>[];
  events: readonly ExportEntry<GoldenEventData>[];
  /** Public origin of the published site, e.g. 'https://ds54e.github.io'. Validated and normalized. */
  publicOrigin: string;
  /** Site base path, e.g. sitePath('/'), used to build deterministic public Event record URLs. */
  basePath: string;
}

export function exportEventRecordUrl(publicOrigin: string, basePath: string, eventId: string): string {
  const origin = normalizePublicOrigin(publicOrigin);
  const prefix = basePath.endsWith('/') ? basePath : `${basePath}/`;
  return new URL(`${prefix}events/${eventId}/`, origin).href;
}

/**
 * Deterministic factual export payload. Pure: inputs are never mutated, and every
 * derived value (order, normalized sources, record URLs) depends only on inputs.
 */
export function buildExportPayload(input: ExportPayloadInput): ExportPayload {
  const excludedPersonIds = new Set(EXPORT_EXCLUDED_PERSON_IDS);
  const excludedEventIds = new Set(EXPORT_EXCLUDED_EVENT_IDS);
  const publicOrigin = normalizePublicOrigin(input.publicOrigin);

  const companies = input.companies
    .map(({ data }) => ({ ...data }))
    .sort(compareByNameThenId);

  const people = input.people
    .filter(({ data }) => !excludedPersonIds.has(data.id))
    .map(({ data }) => ({ ...data }))
    .sort(compareByNameThenId);

  const events = sortEventsNewestFirst(input.events)
    .filter(({ data }) => !excludedEventIds.has(data.id))
    .map(({ data }): ExportedEvent => ({
      ...data,
      sources: data.sources.map((source) => ({
        ...source,
        status: source.status ?? 'available',
        archiveUrl: source.archiveUrl ?? null,
      })),
      recordUrl: exportEventRecordUrl(publicOrigin, input.basePath, data.id),
    }));

  return {
    schemaVersion: EXPORT_SCHEMA_VERSION,
    project: {
      name: EXPORT_PROJECT.name,
      scope: EXPORT_PROJECT.scope,
      notes: [...EXPORT_PROJECT.notes],
    },
    companies,
    people,
    events,
  };
}
