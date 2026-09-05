# Analog AI catalog

This directory is the entry point for work on the standalone Analog AI catalog in AMS Signals.

Before implementing or editing this feature, read:

1. `/AGENTS.md`
2. `/PROJECT_CONTEXT.md`
3. this file
4. `IMPLEMENTATION_SPEC.md`
5. `RESEARCH_SEED.md` when adding or reviewing catalog content

## Product boundary

Analog AI is a standalone technical catalog for analog/RF/AMS AI projects: benchmarks, design agents, EDA tools, and datasets or experiment environments.

It is not a Timeline or Events derivative, and it is not a view of company AI activity.

For this feature:

- do not read or depend on Event, Company, Person, or Article records;
- do not add Golden Events in order to add a catalog project;
- do not add `relatedEvents`, Company IDs, or Person IDs to catalog data;
- do not change `/export.json`;
- do not reuse Timeline/Events filter state or domain-specific UI such as EventExplorer;
- sharing the common site shell, typography, `sitePath`, build/test infrastructure, and other content-independent utilities is fine.

A catalog change must be able to add, remove, or edit a project without changing Timeline/Events data or ordering.

## Reader goal

The page should help an engineer answer:

1. What projects exist?
2. What does each one actually do?
3. How is it different from the others?
4. What is public, and what environment or tooling is required separately?
5. Where are the primary source, paper, code, or published results?

The catalog is a technical catalog and database-like reference surface, not an editorial Article, maturity ranking, or exhaustive evidence archive.

## Language

All public-facing Analog AI content and UI are English only: page title and description, controls, role labels, project summaries, targets, access/environment statements, notices, expanded details, source labels, and catalog update notes. Do not create a bilingual version. Articles remain Japanese and independent from this catalog.

## Initial UX direction

- Navigation entry: `Analog AI`
- Route: `/analog-ai/`
- English page title: `Analog AI benchmarks and tools`
- One project list; do not duplicate the same project into category sections.
- Filter by one role at a time: Benchmark / Design Agent / EDA Tool / Dataset & Environment.
- A project may have multiple roles and should still appear only once in the full list.
- Text search plus role filter is sufficient for v1.
- Stable project anchors are required for sharing.
- Project details may be expanded independently; do not use an exclusive accordion.
- The useful project description must be visible before opening details.
- A small catalog-specific “recent additions / major updates” area may exist, but it must not use Events or project repository commit timestamps as a substitute for editorial updates.

See `IMPLEMENTATION_SPEC.md` for observable behavior and acceptance criteria.

## Research rule

Do not turn prior ChatGPT prose into catalog facts. Re-check primary sources before writing initial content.

Keep these distinctions explicit when they matter:

- reasoning-only track vs simulator/tool track;
- topology/relative-size grading vs measured circuit performance;
- source code being public vs a complete experiment being reproducible;
- simulator integration being implemented vs a reported design result;
- target/preregistered metric vs synthetic demo vs measured result;
- PVT vs Monte Carlo vs PEX vs DRC/LVS;
- support for some circuits in an open environment vs support for every circuit in a suite;
- a narrow silicon demonstration vs general analog-design capability.

A project may be interesting even when it is early-stage, but describe plans, implementations, author-reported results, and independent reproduction as different things.

## Implementation scope

Keep the existing stack: Astro static generation, plain CSS, and small client-side JavaScript/TypeScript. Do not add a CMS, database, runtime AI summaries, vector search, or a new frontend framework for this feature.

The initial implementation should leave a reviewable diff and test results. Do not merge or deploy unless explicitly instructed.
