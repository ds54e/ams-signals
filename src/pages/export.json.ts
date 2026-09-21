import { getCollection } from 'astro:content';
import { buildExportPayload } from '../lib/export.ts';

export const prerender = true;

const publicOrigin = 'https://ds54e.github.io';

export async function GET() {
  const [companyEntries, peopleEntries, eventEntries] = await Promise.all([
    getCollection('companies'),
    getCollection('people'),
    getCollection('events'),
  ]);

  const payload = buildExportPayload(companyEntries, peopleEntries, eventEntries, {
    publicOrigin,
    siteBase: import.meta.env.BASE_URL,
  });

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
