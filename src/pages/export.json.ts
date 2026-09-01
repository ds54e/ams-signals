import { getCollection } from 'astro:content';
import { sortEventsNewestFirst } from '../lib/content';
import { sitePath } from '../lib/paths';

export const prerender = true;

const publicOrigin = 'https://ds54e.github.io';
const excludedPersonIds = new Set(['lunlun']);
const excludedEventIds = new Set([
  'lunlun-2024-initial-real-time-representation',
  'lunlun-2025-3-0-dynamic-behavior',
]);

const byNameAndId = (
  left: { data: { id: string; name: string } },
  right: { data: { id: string; name: string } },
) => left.data.name.localeCompare(right.data.name, 'en')
  || left.data.id.localeCompare(right.data.id, 'en');

export async function GET() {
  const [companyEntries, peopleEntries, eventEntries] = await Promise.all([
    getCollection('companies'),
    getCollection('people'),
    getCollection('events'),
  ]);

  const companies = [...companyEntries]
    .sort(byNameAndId)
    .map(({ data }) => ({ ...data }));
  const people = [...peopleEntries]
    .filter(({ data }) => !excludedPersonIds.has(data.id))
    .sort(byNameAndId)
    .map(({ data }) => ({ ...data }));
  const events = sortEventsNewestFirst(eventEntries)
    .filter(({ data }) => !excludedEventIds.has(data.id))
    .map(({ data }) => ({
      ...data,
      sources: data.sources.map((source) => ({
        ...source,
        status: source.status ?? 'available',
        archiveUrl: source.archiveUrl ?? null,
      })),
      recordUrl: new URL(sitePath(`events/${data.id}/`), publicOrigin).href,
    }));

  const payload = {
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

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
