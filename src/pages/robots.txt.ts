import type { APIRoute } from 'astro';
import { sitePath } from '../lib/paths';

// Normal crawling is permitted. /articles/ is intentionally NOT disallowed:
// crawlers must be able to fetch those pages and observe their noindex,
// follow directive directly.
export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('http://localhost');
  const sitemap = new URL(sitePath('sitemap.xml'), origin).href;

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
