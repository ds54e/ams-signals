import { getCollection } from 'astro:content';
import { buildExportPayload } from '../lib/export.ts';
import { normalizePublicOrigin } from '../lib/site-deployment.mjs';
import { sitePath } from '../lib/paths';

export const prerender = true;

export async function GET() {
  const [companies, people, events] = await Promise.all([
    getCollection('companies'),
    getCollection('people'),
    getCollection('events'),
  ]);

  const payload = buildExportPayload({
    companies,
    people,
    events,
    publicOrigin: normalizePublicOrigin(import.meta.env.SITE),
    basePath: sitePath('/'),
  });

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
