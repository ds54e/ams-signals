import { getCollection } from 'astro:content';
import { buildExportPayload } from '../lib/export.ts';
import { sitePath } from '../lib/paths';

export const prerender = true;

export async function GET() {
  const [companies, people, events] = await Promise.all([
    getCollection('companies'),
    getCollection('people'),
    getCollection('events'),
  ]);

  const payload = buildExportPayload({ companies, people, events, basePath: sitePath('/') });

  return new Response(`${JSON.stringify(payload, null, 2)}\n`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
