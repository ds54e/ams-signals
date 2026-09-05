# Analog AI landscape and project index

Read `/AGENTS.md`, `/PROJECT_CONTEXT.md`, this file, `IMPLEMENTATION_SPEC.md`, and `IMPLEMENTATION_NOTES.md` before changing this surface. Use `RESEARCH_SEED.md` as historical research leads, never as evidence.

## Reader goal

Understand the Analog AI landscape quickly, notice useful patterns, and open only the projects worth investigating.

`/analog-ai/` is a compact technical landscape and project index for analog/RF/AMS benchmarks, agents, tools, and environments. It is not an editorial Article, searchable database, ranking, or evidence archive. Public UI and authored catalog content are English only; existing Japanese Articles remain independent.

## Page direction

- Start with Landscape. Keep an accessible, visually hidden Analog AI heading; navigation provides visible page context.
- No introductory prose, project total, additions, review dates, snapshot metadata, or methodology paragraphs in the dashboard.
- An accessible HTML landscape matrix: Reasoning, Generate / Edit, Simulate / Measure, Optimize, EDA Integration, Physical.
- Order both Landscape and Projects by latest public activity, newest first: repository `lastCommitAt`, otherwise `lastPublicUpdateAt`; ties use normalized name then slug. Undated projects follow dated projects.
- One compact project index: project/one-sentence summary, 3–5 keywords, activity with a prominent latest date, and direct primary links. Use moderately larger text without large cards.
- Passive role labels; independently expandable native **What it does**, closed by default, with one concise capability paragraph and the existing sources.
- Stable project and descendant/source anchors. No search, filters, query state, history management, storage, or runtime fetching.

Matrix marks describe reviewed scope, never maturity, autonomy, quality, or verified capability. A blank means no primary reviewed scope was identified, not inability. Public repository activity describes visibility in one verified primary repository, not total effort or quality. It uses a checked-in twelve-month snapshot separate from durable project research.

## Product boundary

Do not depend on Event, Company, Person, or Article records; add Golden records to support a project; connect project metadata to Golden IDs; change factual semantics, viewer state, authored Articles, or `/export.json`. Shared site shell, typography, `sitePath`, and build/test infrastructure remain appropriate.

The existing Astro static output, plain CSS, and small TypeScript architecture stays. No database, frontend framework, charting library, runtime API, public catalog JSON endpoint, compare mode, project subpages, or new score system.

## Research and maintenance

Re-open primary material before changing researched claims or workflow classification. Presentation summaries may condense the existing reviewed content without new claims. Separate reasoning from generation, evaluator simulation from model tools, relative sizing from electrical optimization, implemented paths from experiments and plans, and paper results from released artifacts. Preserve detailed research, prerequisites and activity methodology in the authored files and implementation notes; do not render them as dashboard explanations. Do not reproduce paid model or commercial EDA experiments merely to classify a project.

`IMPLEMENTATION_SPEC.md` defines behavior and validation. `IMPLEMENTATION_NOTES.md` records classification decisions, selected repositories, activity methodology, and checks. Catalog additions remain bounded and independently authored; repository commits are not catalog update notes.

Follow the user's current delivery instruction. This refinement is authorized for a normal fast-forward commit/push to `main` after validation and self-review. Do not force-push or change deployment configuration; the existing Pages workflow is manual-only.
