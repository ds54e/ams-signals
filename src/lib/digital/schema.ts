import { hasRepositoryHistory, isRepositoryUrl, validateRepositorySources } from '../catalog-repository-activity.ts';
import { publicSignalTypes } from '../catalog-activity-band.ts';
import { z } from 'astro/zod';
import { aiIds, areaIds } from './catalog.ts';
import { roleIds } from '../catalog-roles.ts';
import { activityMonths, freshnessCutoff } from './activity.ts';

export const catalogSlug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a stable lowercase hyphenated filename');
const text = z.string().trim().min(1).refine(
  (value) => !/\b(?:TODO|TBD|FIXME|PLACEHOLDER|lorem ipsum)\b/iu.test(value), 'Replace placeholder content',
);
const publicText = text.refine((value) => !/[\r\n\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}]/u.test(value), 'Use one English paragraph');
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}, 'Use a valid calendar date');
const sourceUrl = z.string().url().refine((value) => {
  let url: URL;
  try { url = new URL(value); } catch { return false; }
  return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password
    && !/\b(?:TODO|TBD|PLACEHOLDER)\b/i.test(value)
    && !/(^|\.)(?:example\.(?:com|org|net)|localhost)$|\.(?:invalid|test)$/i.test(url.hostname);
}, 'Use a public HTTP(S) source URL');
const scope = z.enum(['core', 'supporting']).optional();

export const digitalSchema = z.object({
  name: publicText,
  aliases: z.array(text).default([]),
  roles: z.array(z.enum(roleIds)).min(1).max(2).refine((roles) => new Set(roles).size === roles.length, 'Duplicate role'),
  primary: z.enum(areaIds),
  ai: z.enum(aiIds),
  description: publicText.max(600, 'Keep one concise project description'),
  keywords: z.array(publicText.max(28)).min(3).max(5).refine(
    (values) => new Set(values.map((value) => value.normalize('NFKC').toLowerCase())).size === values.length,
    'Duplicate keyword',
  ),
  areas: z.object({
    simulation: scope, 'frontend-synthesis': scope, 'formal-verification': scope,
    'debug-waveform': scope, 'flow-physical': scope,
  }).strict(),
  access: text,
  addedAt: date,
  reviewedAt: date,
  sources: z.array(z.object({
    id: catalogSlug, title: text, url: sourceUrl,
    purpose: z.enum(['official', 'paper', 'code', 'results']).optional(),
  }).strict()).min(1),
}).strict().superRefine((project, context) => {
  if (!Object.values(project.areas).includes('core') || project.areas[project.primary] !== 'core') {
    context.addIssue({ code: 'custom', path: ['areas'], message: 'Primary category must be core' });
  }
  if (project.addedAt > project.reviewedAt) context.addIssue({ code: 'custom', path: ['reviewedAt'], message: 'Review cannot precede addition' });
  for (const field of ['id', 'purpose'] as const) {
    const seen = new Set<string>();
    project.sources.forEach((source, index) => {
      const value = source[field];
      if (value && seen.has(value)) context.addIssue({ code: 'custom', path: ['sources', index, field], message: `Duplicate source ${field}` });
      if (value) seen.add(value);
    });
  }
});

export function validateCatalog(projects: readonly { id: string; data: unknown; body?: string }[]) {
  if (!projects.length) throw new Error('Digital catalog must not be empty');
  const ids = new Set<string>();
  for (const project of projects) {
    catalogSlug.parse(project.id);
    if (ids.has(project.id)) throw new Error(`Duplicate catalog slug: ${project.id}`);
    ids.add(project.id);
    const data = digitalSchema.parse(project.data);
    const body = text.parse(project.body ?? '');
    if (/https?:\/\/|<\/?[a-z][\s\S]*?>/iu.test(body)) {
      throw new Error(`${project.id}: use Markdown and local source references; keep URLs in sources`);
    }
    const sourceIds = new Set(data.sources.map((source) => source.id));
    for (const match of body.matchAll(/\]\(#source-([^)]+)\)/g)) {
      if (!sourceIds.has(match[1])) throw new Error(`${project.id}: unknown source reference ${match[1]}`);
    }
  }
}

const sha = z.string().regex(/^[a-f0-9]{40}$/);
const repository = text.regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\/[a-zA-Z0-9_.-]+$/)
  .refine((value) => !['.', '..'].includes(value.split('/')[1]), 'Use an explicit owner/repository');
const branch = text.refine((value) => !/^[./-]|[/.]$|\.\.|@\{|[\s~^:?*\[\\\x00-\x1f\x7f]|\/\//u.test(value)
  && !value.split('/').some((part) => part.startsWith('.') || part.endsWith('.lock')) && value !== '@', 'Invalid default branch');
const githubActivity = z.object({
  kind: z.literal('github'), repository, repositoryId: z.number().int().positive().safe(),
  defaultBranch: branch, headSha: sha,
  commits: z.array(z.number().int().nonnegative().safe()).length(12),
  lastCommitAt: date, lastMeaningfulCommitAt: date, lastMeaningfulCommitSha: sha,
}).strict();
const repositoryActivity = githubActivity.extend({
  kind: z.literal('repository'),
  repository: sourceUrl.refine(isRepositoryUrl, 'Use a canonical non-GitHub HTTPS repository URL'),
  repositoryId: text,
  capturedAt: z.string().datetime(),
  lastMeaningfulCommitSha: z.string().regex(/^[a-f0-9]{40}$/),
  lastMeaningfulCommitSource: catalogSlug,
}).strict();
const publicUpdate = z.object({
  kind: z.literal('public-update'), lastPublicUpdateAt: date, lastPublicUpdateSource: catalogSlug,
  lastPublicUpdateType: z.enum(publicSignalTypes),
}).strict();

export const activitySchema = z.object({
  reviewedAt: date, capturedAt: z.string().datetime(), method: z.literal('first-parent-committer-utc'),
  months: z.array(z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/)).length(12),
  projects: z.record(catalogSlug, z.discriminatedUnion('kind', [githubActivity, repositoryActivity, publicUpdate])),
}).strict().superRefine((snapshot, context) => {
  if (snapshot.capturedAt.slice(0, 10) !== snapshot.reviewedAt) {
    context.addIssue({ code: 'custom', message: 'Snapshot and capture dates differ' });
  }
  if (JSON.stringify(snapshot.months) !== JSON.stringify(activityMonths(snapshot.reviewedAt))) {
    context.addIssue({ code: 'custom', path: ['months'], message: 'Use twelve consecutive months ending in the snapshot month' });
  }
  for (const [id, activity] of Object.entries(snapshot.projects)) {
    if (activity.kind === 'repository' && (activity.capturedAt.slice(0, 7) !== snapshot.reviewedAt.slice(0, 7)
      || activity.capturedAt.slice(0, 10) > snapshot.reviewedAt || activity.lastCommitAt > activity.capturedAt.slice(0, 10))) {
      context.addIssue({ code: 'custom', path: ['projects', id], message: 'Repository capture must cover the snapshot month and reviewed commit dates' });
    }
    const last = hasRepositoryHistory(activity) ? activity.lastCommitAt : activity.lastPublicUpdateAt;
    const meaningful = hasRepositoryHistory(activity) ? activity.lastMeaningfulCommitAt : last;
    const issue = (message: string) => context.addIssue({ code: 'custom', path: ['projects', id], message });
    if (last > snapshot.reviewedAt) issue('Activity is after the snapshot');
    if (meaningful < freshnessCutoff(snapshot.reviewedAt)) issue('Stale meaningful activity');
    if (meaningful > last) issue('Meaningful activity cannot follow the last commit');
    if (hasRepositoryHistory(activity)) {
      if (snapshot.months.some((month, index) =>
        (month > last.slice(0, 7) && activity.commits[index] > 0)
        || ([last.slice(0, 7), meaningful.slice(0, 7)].includes(month) && activity.commits[index] === 0))) {
        issue('Commit buckets disagree with reviewed commit dates');
      }
    }
  }
});

export function validateActivity(projects: readonly { id: string; data: unknown }[], value: unknown) {
  const snapshot = activitySchema.parse(value);
  const ids = new Set(projects.map((project) => project.id));
  if (ids.size !== projects.length) throw new Error('Duplicate catalog slug');
  for (const id of Object.keys(snapshot.projects)) {
    if (!ids.has(id)) throw new Error(`Unknown activity project: ${id}`);
  }
  for (const project of projects) {
    const record = snapshot.projects[project.id];
    if (!record) throw new Error(`Missing activity project: ${project.id}`);
    const data = digitalSchema.parse(project.data);
    if (data.reviewedAt > snapshot.reviewedAt) throw new Error(`${project.id}: review is after the snapshot`);
    const code = data.sources.find((source) => source.purpose === 'code');
    if (record.kind === 'repository') {
      validateRepositorySources(record, data.sources);
    } else if (record.kind === 'github') {
      const url = code && new URL(code.url);
      if (!url || url.hostname !== 'github.com' || url.search || url.hash
        || url.pathname.replace(/^\/|\/$/g, '').toLowerCase() !== record.repository.toLowerCase()) {
        throw new Error(`${project.id}: primary repository must match the verified Code source`);
      }
      const evidence = `https://github.com/${record.repository}/commit/${record.lastMeaningfulCommitSha}`;
      if (!data.sources.some((source) => source.url.toLowerCase() === evidence.toLowerCase())) {
        throw new Error(`${project.id}: meaningful commit requires its primary source`);
      }
    } else {
      if (code && new URL(code.url).hostname === 'github.com') throw new Error(`${project.id}: GitHub Code requires repository activity`);
      if (!data.sources.some((source) => source.id === record.lastPublicUpdateSource)) {
        throw new Error(`${project.id}: unknown public update source`);
      }
    }
  }
  return snapshot;
}
