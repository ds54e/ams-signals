# AMS Signals — Agent Instructions

## Start here

Before making research or product-design decisions, read `PROJECT_CONTEXT.md`. It captures the durable product intent and the rationale behind the timeline-first, fact-first, tagless, bounded-growth design.

Temporary company-specific research briefs such as `RESEARCH_APPLE_V1.md` add task-specific context but do not override this file or `PROJECT_CONTEXT.md`.

For work on the standalone Analog AI catalog, also read `docs/analog-ai/README.md` and follow the documents it links. That catalog is intentionally independent from Timeline/Events data and has a separate, bounded project-catalog information model; do not apply Golden-event inclusion or taglessness rules to it by re-coupling it to Events.

For the standalone EDA Tools catalog, read `docs/eda-tools/README.md` and its linked contract. Its EDA scope and AI-relation labels are local to that independent catalog; they do not change Analog AI or Golden facts, viewer state, Articles or `/export.json`.

## Purpose

AMS Signals is a factual public-intelligence timeline for RNM and mixed-signal verification activity across companies and people.

The durable asset is the Golden factual timeline in `src/data/events/*.json`. The website is a viewer. Do not turn this repository into an evidence archive, company-rating database, or taxonomy project.

The standalone Analog AI catalog is an explicit additional surface with its own scoped product contract in `docs/analog-ai/`. It does not change the semantics, inclusion rules, or export contract of the factual Timeline/Events corpus.

## Core rule

Research may be highly inferential. Golden content may not be.

During research, aggressively form working hypotheses, follow people and organizations, compare companies, look for gaps, and search for evidence that could weaken your current ideas. Use inference to decide what to investigate next.

When committing Golden events, preserve only directly supportable public facts.

## Research loop

1. Read the current Golden timeline before searching.
2. Identify unanswered questions, stale areas, or possible changes.
3. Form working hypotheses to guide research.
4. Search public sources and follow promising leads.
5. Actively look for contradictory or narrowing evidence.
6. Cluster duplicate/reposted sources rather than accumulating them.
7. Promote only timeline milestones that materially add new factual information.
8. Update an existing event when a new source only strengthens the same milestone.
9. Discard research material that does not improve the Golden timeline.
10. Stop when the Golden timeline can be responsibly reassessed. Do not attempt to exhaust the web.

The loop above governs Golden Timeline/Event research. Analog AI catalog research follows `docs/analog-ai/RESEARCH_SEED.md` and must not create Golden records merely to support catalog entries.

## Golden event rules

Each Golden event should answer only:

- When?
- Who / which company?
- What publicly observable thing happened?
- Which public source supports it?

Do not add technology tags, maturity scores, confidence scores, strategic direction, disclosure scores, or inferred organization-wide conclusions to factual events.

`kind` is an intentionally coarse public-signal type, not a technology classification. Use only `technical` for principally technical or standards milestones and `organizational` for principally organizational, business, and workforce milestones. Keep `affiliationChange` as independent optional metadata when responsibly supported.

### Preserve source modality

A job posting supports facts about what the company posted or described in the role. It does not by itself prove deployed internal practice.

Prefer:

- `Apple posted a role whose description includes ...`
- `An Apple-authored paper reports ...`
- `An Apple patent describes ...`

Avoid:

- `Apple uses ...` when the only source is a job posting.
- `Apple is leading ...`
- `This suggests ...`
- `The company likely ...`

Inference may guide research or downstream interpretation. It does not belong in Golden factual content.

## Bounded growth

- One meaningful milestone can have multiple representative sources.
- Keep 1-3 sources per event.
- Do not create an event for every repost, location variant, or repeated hiring signal.
- Merge repeated sources when they describe the same time-bound fact.
- A new event should teach the reader something new about the timeline.
- Do not persist large scratch collections, downloaded pages, exhaustive search logs, or speculative notes.

## People

Create people records only when a person's public technical activity or affiliation change materially helps explain the RNM/AMS timeline.

Do not build employee directories. Do not treat a person who merely shares a job posting as a participant in that event.

## Interpretation boundary

AMS Signals separates a factual evidence layer from researched editorial Articles.

- Research may use hypotheses and inference to decide what to investigate next.
- Commit only directly supportable facts to Golden Events.
- Articles may synthesize and interpret public evidence, including sources that are not Golden Events, without promoting that interpretation into Golden content.
- Preserve evidence modality: reported practice, hiring or organizational mandates, patents, and ecosystem context do not support the same claims.
- Never infer methodology transfer from employer changes, acquisitions, or standards participation alone.
- Do not add maturity scores, rankings, strategic conclusions, or hidden technology taxonomies to Golden content.
- Preserve author-supplied Article prose. Do not rewrite, normalize, summarize, translate, expand, shorten, or fact-correct it unless the author explicitly requests that transformation.

Analog AI catalog entries are separately authored technical catalog content. Their project-role classification and project-specific summaries are allowed only within the scope defined in `docs/analog-ai/`; they do not become Golden facts and do not alter Golden taxonomy rules.

## Data discipline

Before committing:

```bash
npm run validate
npm run lint:facts
npm run check:duplicates
npm run build
npm run check:internal-links
```

Schema or fact-lint failures must be fixed. Duplicate warnings require judgment: merge or cluster when appropriate.

`npm run check` runs the full deterministic sequence above and does not require a browser. For viewer, navigation, or release changes, install Playwright's Chromium browser and run the separate production-preview smoke suite with `npm run test:smoke`.

New Analog AI validation may be added in addition to these checks. Do not weaken Golden validation or fact-lint rules to accommodate the catalog.

## Technology choices

Keep the implementation deliberately small:

- Astro static output
- JSON for Golden structured data
- Markdown for authored editorial Articles, kept separate from Golden data
- one generated JSON export of the validated factual corpus
- plain CSS
- small vanilla TypeScript/JavaScript where interaction is needed
- no database or backend
- no permanent technology taxonomy for the Golden factual corpus

Do not introduce React, a CMS, vector database, runtime AI summaries, or source-archive infrastructure without a concrete need that cannot be met by the existing design.
