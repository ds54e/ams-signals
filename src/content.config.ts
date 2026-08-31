import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const datePrecision = z.enum(['year', 'month', 'day']);
const eventKind = z.enum(['technical', 'organizational']);

const articleDate = z.preprocess(
  (value) => value instanceof Date && !Number.isNaN(value.valueOf())
    ? value.toISOString().slice(0, 10)
    : value,
  z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Use an exact YYYY-MM-DD date')
    .refine((value) => {
      const parsed = new Date(`${value}T00:00:00.000Z`);
      return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
    }, 'Use a valid calendar date'),
);

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

const articles = defineCollection({
  loader: glob({
    // Matching the tracked directory marker lets Astro evict a deleted final
    // Article from its content cache while the collection is otherwise empty.
    pattern: ['*.md', '.gitkeep'],
    base: './src/content/articles',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().trim().min(1),
    published: articleDate,
    summary: z.string().trim().min(1),
    updated: articleDate.optional(),
    relatedEvents: z.array(z.string().trim().min(1)).default([]),
  }).strict().superRefine((article, context) => {
    if (article.updated && article.updated < article.published) {
      context.addIssue({
        code: 'custom',
        path: ['updated'],
        message: 'updated must not precede published',
      });
    }

    const seen = new Set<string>();
    article.relatedEvents.forEach((eventId, index) => {
      if (seen.has(eventId)) {
        context.addIssue({
          code: 'custom',
          path: ['relatedEvents', index],
          message: `Duplicate related Event ID: ${eventId}`,
        });
      }
      seen.add(eventId);
    });
  }),
});

export const collections = { events, companies, people, articles };
