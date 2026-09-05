import { z } from 'astro/zod';
import { roleIds } from './catalog.ts';
import { activityMonths } from './activity.ts';

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
  summary: text.max(240, 'Keep the default summary to one concise sentence'),
  description: text.max(600, 'Keep What it does to one short paragraph'),
  keywords: z.array(text.max(28)).min(3).max(5).refine(
    (values) => new Set(values.map((value) => value.normalize('NFKC').toLowerCase())).size === values.length,
    'Duplicate keyword',
  ),
  workflow: z.object({
    reasoning: z.enum(['core', 'supporting']).optional(),
    'generate-edit': z.enum(['core', 'supporting']).optional(),
    'simulate-measure': z.enum(['core', 'supporting']).optional(),
    optimize: z.enum(['core', 'supporting']).optional(),
    'eda-integration': z.enum(['core', 'supporting']).optional(),
    physical: z.enum(['core', 'supporting']).optional(),
  }).strict(),
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

const githubRepository = text.regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\/[a-zA-Z0-9_.-]+$/)
  .refine((value) => !['.', '..'].includes(value.split('/')[1]), 'Use an explicit owner/repository');
const branch = text.refine((value) => !/^[./-]|[/.]$|\.\.|@\{|[\s~^:?*\[\\\x00-\x1f\x7f]|\/\//u.test(value)
  && !value.split('/').some((part) => part.startsWith('.') || part.endsWith('.lock')) && value !== '@', 'Invalid default branch');
const githubActivity = z.object({
  kind: z.literal('github'),
  repository: githubRepository,
  defaultBranch: branch,
  headSha: z.string().regex(/^[a-f0-9]{40}$/),
  commits: z.array(z.number().int().nonnegative().safe()).length(12),
  lastCommitAt: date,
  notes: text.optional(),
}).strict();
const noRepositoryActivity = z.object({
  kind: z.literal('no-public-repo'),
  lastPublicUpdateAt: date.optional(),
  lastPublicUpdateSource: catalogSlug.optional(),
  notes: text.optional(),
}).strict();
export const activitySchema = z.object({
  reviewedAt: date,
  capturedAt: z.string().datetime(),
  method: z.literal('first-parent-committer-utc'),
  months: z.array(z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/)).length(12),
  projects: z.record(catalogSlug, z.discriminatedUnion('kind', [githubActivity, noRepositoryActivity])),
}).strict().superRefine((snapshot, context) => {
  if (snapshot.capturedAt.slice(0, 10) !== snapshot.reviewedAt) {
    context.addIssue({ code: 'custom', message: 'Snapshot and capture dates differ' });
  }
  if (JSON.stringify(snapshot.months) !== JSON.stringify(activityMonths(snapshot.reviewedAt))) {
    context.addIssue({ code: 'custom', path: ['months'], message: 'Use twelve consecutive months ending in the snapshot month' });
  }
  for (const [id, activity] of Object.entries(snapshot.projects)) {
    const last = activity.kind === 'github' ? activity.lastCommitAt : activity.lastPublicUpdateAt;
    if (last && last > snapshot.reviewedAt) context.addIssue({ code: 'custom', path: ['projects', id], message: 'Activity date is after the snapshot' });
    if (activity.kind === 'github') {
      const latestMonth = activity.lastCommitAt.slice(0, 7);
      if (snapshot.months.some((month, index) => (month > latestMonth && activity.commits[index] > 0)
        || (month === latestMonth && activity.commits[index] === 0))) {
        context.addIssue({ code: 'custom', path: ['projects', id], message: 'Commit buckets disagree with last commit date' });
      }
    } else if (Boolean(activity.lastPublicUpdateAt) !== Boolean(activity.lastPublicUpdateSource)) {
      context.addIssue({ code: 'custom', path: ['projects', id], message: 'A public update date requires its source ID' });
    }
  }
});

export function validateActivity(projects: readonly { id: string; data: unknown }[], value: unknown) {
  const snapshot = activitySchema.parse(value);
  const ids = new Set(projects.map((project) => project.id));
  for (const id of Object.keys(snapshot.projects)) {
    if (!ids.has(id)) throw new Error(`Unknown activity project: ${id}`);
  }
  for (const project of projects) {
    const activity = snapshot.projects[project.id];
    if (!activity) throw new Error(`Missing activity project: ${project.id}`);
    const data = analogAiSchema.parse(project.data);
    if (activity.kind === 'github') {
      const code = data.sources.find((source) => source.purpose === 'code');
      if (!code || new URL(code.url).hostname !== 'github.com'
        || new URL(code.url).pathname.replace(/^\/|\/$/g, '').toLowerCase() !== activity.repository.toLowerCase()) {
        throw new Error(`${project.id}: primary repository must match the verified Code source`);
      }
    } else {
      if (data.sources.some((source) => source.purpose === 'code' && new URL(source.url).hostname === 'github.com')) {
        throw new Error(`${project.id}: verified GitHub Code source requires a repository activity record`);
      }
      if (activity.lastPublicUpdateSource && !data.sources.some((source) => source.id === activity.lastPublicUpdateSource)) {
        throw new Error(`${project.id}: unknown public update source`);
      }
    }
  }
  return snapshot;
}
