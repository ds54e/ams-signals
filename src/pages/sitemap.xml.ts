import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sitePath } from '../lib/paths';

// Public indexable HTML routes only. Articles are deliberately absent: they stay
// reachable by direct URL but are excluded from indexing via `noindex, follow`,
// so they must not be advertised here.
//
// URLs are derived from the configured deployment target (`site` + base), never
// from a hard-coded production origin. Ordering is fixed and IDs are sorted by
// plain code-unit comparison so the output is byte-stable across environments.
const compareIds = (left: string, right: string) => (left < right ? -1 : left > right ? 1 : 0);

export const GET: APIRoute = async ({ site }) => {
  const [events, companies, people] = await Promise.all([
    getCollection('events'),
    getCollection('companies'),
    getCollection('people'),
  ]);

  const origin = site ?? new URL('http://localhost');
  const ids = (entries: { data: { id: string } }[]) => entries
    .map((entry) => entry.data.id)
    .sort(compareIds);

  const paths = [
    sitePath(''),
    sitePath('events/'),
    ...ids(events).map((id) => sitePath(`events/${id}/`)),
    sitePath('analog/'),
    sitePath('digital/'),
    ...ids(companies).map((id) => sitePath(`companies/${id}/`)),
    ...ids(people).map((id) => sitePath(`people/${id}/`)),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...paths.map((entry) => `  <url><loc>${new URL(entry, origin).href}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
