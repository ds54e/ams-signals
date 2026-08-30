import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const datePrecision = z.enum(['year', 'month', 'day']);
const eventKind = z.enum(['technical', 'organizational']);

const whenSchema = z.object({
  start: z.string().min(4),
  end: z.string().min(4).optional(),
  precision: datePrecision,
}).strict();

const sourceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  status: z.enum(['available', 'unavailable']).optional(),
  summary: z.string().min(1),
  archiveUrl: z.string().url().optional(),
}).strict();

const affiliationChangeSchema = z.object({
  person: z.string().min(1),
  from: z.string().min(1).nullable(),
  to: z.string().min(1).nullable(),
}).strict();

const events = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/data/events',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: z.object({
    id: z.string().min(1),
    when: whenSchema,
    kind: eventKind,
    companies: z.array(z.string().min(1)),
    people: z.array(z.string().min(1)),
    headline: z.string().min(1).max(160),
    fact: z.string().min(1).max(1000),
    sources: z.array(sourceSchema).min(1).max(3),
    affiliationChange: affiliationChangeSchema.optional(),
  }).strict(),
});

const companies = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/data/companies',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  }).strict(),
});

const people = defineCollection({
  loader: glob({
    pattern: '**/*.json',
    base: './src/data/people',
    generateId: ({ entry }) => entry.replace(/\.json$/, ''),
  }),
  schema: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  }).strict(),
});

const analysis = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/analysis',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: z.string().min(1).max(300),
  }).strict(),
});

export const collections = { events, companies, people, analysis };
