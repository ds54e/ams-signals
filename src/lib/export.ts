import type { CompanyEntry, EventEntry, PersonEntry } from './content.ts';
import { sortEventsNewestFirst } from './content.ts';

export const EXCLUDED_EXPORT_PERSON_IDS = new Set(['lunlun']);
export const EXCLUDED_EXPORT_EVENT_IDS = new Set([
  'lunlun-2024-initial-real-time-representation',
  'lunlun-2025-3-0-dynamic-behavior',
]);

const byNameAndId = (
  left: { data: { id: string; name: string } },
  right: { data: { id: string; name: string } },
) => left.data.name.localeCompare(right.data.name, 'en')
  || left.data.id.localeCompare(right.data.id, 'en');

export function buildExportPayload(
  companyEntries: CompanyEntry[],
  peopleEntries: PersonEntry[],
  eventEntries: EventEntry[],
  options: {
    publicOrigin: string;
    siteBase: string;
  },
) {
  const companies = [...companyEntries]
    .sort(byNameAndId)
    .map(({ data }) => ({ ...data }));
  const people = [...peopleEntries]
    .filter(({ data }) => !EXCLUDED_EXPORT_PERSON_IDS.has(data.id))
    .sort(byNameAndId)
    .map(({ data }) => ({ ...data }));
  const events = sortEventsNewestFirst(eventEntries)
    .filter(({ data }) => !EXCLUDED_EXPORT_EVENT_IDS.has(data.id))
    .map(({ data }) => ({
      ...data,
      sources: data.sources.map((source) => ({
        ...source,
        status: source.status ?? 'available',
        archiveUrl: source.archiveUrl ?? null,
      })),
      recordUrl: new URL(
        `${options.siteBase.replace(/\/+$/, '')}/events/${data.id}/`,
        options.publicOrigin,
      ).href,
    }));

  return {
    schemaVersion: 1,
    project: {
      name: 'AMS Signals',
      scope: 'Public factual signals in RNM and mixed-signal verification.',
      notes: [
        'Each Event states only what its representative public sources directly support; source modality limits what the record establishes.',
        'The absence of a public Event is not evidence that a company or person lacks related internal activity.',
        'An employer move or acquisition alone does not establish methodology transfer.',
        'Standards participation alone does not establish internal deployment.',
      ],
    },
    companies,
    people,
    events,
  };
}
