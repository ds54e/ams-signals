import { z } from 'astro/zod';
import { roleIds } from './catalog.ts';

export const catalogSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a stable lowercase hyphenated filename');
const text = z.string().trim().min(1).refine(
  (value) => !/\b(?:TODO|TBD|FIXME|PLACEHOLDER|lorem ipsum)\b|仮置き|後で記入/iu.test(value),
  'Replace placeholder content before publication',
);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}, 'Use a valid calendar date');
const sourceUrl = z.string().url().refine((value) => {
  let url: URL;
  try { url = new URL(value); } catch { return false; }
  return ['http:', 'https:'].includes(url.protocol)
    && !url.username && !url.password
    && !/\b(?:TODO|TBD|PLACEHOLDER)\b/i.test(value)
    && !/(^|\.)(?:example\.(?:com|org|net)|localhost)$|\.(?:invalid|test)$/i.test(url.hostname)
    && !/(?:<|%3c)(?:owner|url|project|user)(?:>|%3e)/i.test(value);
}, 'Use a public HTTP(S) source URL, not a placeholder');

export const analogAiSchema = z.object({
  name: text,
  aliases: z.array(text).default([]),
  roles: z.array(z.enum(roleIds)).min(1).refine((roles) => new Set(roles).size === roles.length, 'Duplicate role'),
  summary: text,
  targets: text.optional(),
  access: text,
  notice: text.optional(),
  addedAt: date,
  reviewedAt: date,
  sources: z.array(z.object({
    id: catalogSlug,
    title: text,
    url: sourceUrl,
    purpose: z.enum(['official', 'paper', 'code', 'results']).optional(),
  }).strict()).min(1),
}).strict().superRefine((project, context) => {
  const ids = new Set<string>();
  const purposes = new Set<string>();
  project.sources.forEach((source, index) => {
    if (ids.has(source.id)) context.addIssue({ code: 'custom', path: ['sources', index, 'id'], message: 'Duplicate source ID' });
    ids.add(source.id);
    if (source.purpose && purposes.has(source.purpose)) context.addIssue({ code: 'custom', path: ['sources', index, 'purpose'], message: 'Duplicate quick-link purpose' });
    if (source.purpose) purposes.add(source.purpose);
  });
});

export const catalogUpdatesSchema = z.array(z.object({
  project: catalogSlug,
  date,
  kind: z.enum(['added', 'updated']),
  summary: text,
}).strict()).max(3, 'Keep at most three current catalog updates');

export function validateCatalog(
  projects: readonly { id: string; data: unknown; body?: string }[],
  updates: unknown,
) {
  const ids = new Set<string>();
  for (const project of projects) {
    catalogSlug.parse(project.id);
    if (ids.has(project.id)) throw new Error(`Duplicate catalog slug: ${project.id}`);
    ids.add(project.id);
    const data = analogAiSchema.parse(project.data);
    text.parse(project.body ?? '');
    // Sources live in one metadata array. Prose uses local source anchors.
    if (/https?:\/\/|<\/?[a-z][\s\S]*?>/iu.test(project.body ?? '')) {
      throw new Error(`${project.id}: use Markdown and local source references; keep external URLs in sources`);
    }
    const sourceIds = new Set(data.sources.map((source) => source.id));
    for (const match of (project.body ?? '').matchAll(/\]\(#source-([^)]+)\)/g)) {
      if (!sourceIds.has(match[1])) throw new Error(`${project.id}: unknown source reference ${match[1]}`);
    }
  }
  const parsed = catalogUpdatesSchema.parse(updates);
  for (const update of parsed) {
    if (!ids.has(update.project)) throw new Error(`Unknown catalog update project: ${update.project}`);
  }
  return parsed;
}
