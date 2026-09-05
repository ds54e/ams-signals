# Analog landscape and project index

Read `/AGENTS.md`, `/PROJECT_CONTEXT.md`, this file, `IMPLEMENTATION_SPEC.md`, and `IMPLEMENTATION_NOTES.md` before changing this surface. Use `RESEARCH_SEED.md` as historical research leads, never as evidence.

## Reader goal

Understand the analog/RF/AMS landscape quickly, notice useful patterns, and open only the projects worth investigating.

`/analog/` is a compact technical landscape and project index for analog/RF/AMS tools, agents, benchmarks, datasets and infrastructure. Domain chooses the page, not AI involvement. It is not an editorial Article, searchable database, ranking, or evidence archive. Public UI and authored catalog content are English only; existing Japanese Articles remain independent.

## Page direction

- Start directly with the workflow matrix and put its compact legend immediately below. Keep an accessible, visually hidden `Analog` heading; navigation provides visible page context. Do not show Landscape/Projects headings or a Projects shortcut.
- No introductory prose, project total, additions, review dates, snapshot metadata, or methodology paragraphs in the dashboard.
- Use CSS-drawn filled/open circles for `● core` / `○ supporting`, with accessible scope labels.
- An accessible HTML landscape matrix: Reasoning, Generate / Edit, Simulate / Measure, Optimize, EDA Integration, Physical.
- Order both Landscape and Projects by latest public activity, newest first: repository `lastCommitAt`, otherwise `lastPublicUpdateAt`; ties use normalized name then slug. Undated projects follow dated projects.
- The three column headers are Project, Keywords, Activity. Give the project description the most width; place wrapping Website/Paper/Code/Results links beside its title. Keywords visually combine authored role tags, optional AI-built, then 3–5 technical keywords. Activity has a prominent date and a compact binary twelve-month band. Keep readable text and no large cards.
- Render the existing `description` once below the name. Do not also show the shorter summary, roles below the name, disclosures, a separate description panel, or the reviewed-source bibliography. Keep Website, Paper, Code and Results links directly accessible.
- Stable project and descendant/source anchors. No search, filters, query state, history management, storage, or runtime fetching.

Matrix marks describe reviewed scope, never maturity, autonomy, quality, or verified capability. A blank means no primary reviewed scope was identified, not inability. Public repository activity describes visibility in one verified primary repository, not total effort or quality. It uses a checked-in twelve-month snapshot separate from durable project research.

## Domain and type model

Primary navigation is `Timeline | Events | Articles | Analog | Digital`. This route has browser title `Analog · AMS Signals` and hidden H1 `Analog`; `/digital/` is the Digital companion. The canonical route is `/analog/`, backed by the `analog` collection and directories. `/digital/` is the only other catalog route; removed routes have no redirects or aliases.

The matrix describes scope; one or two authored roles describe project kind: Agent, Benchmark, EDA Tool, Dataset & Environment. Render roles as individual tags in authored order before technical keywords. An optional `aiBuilt: true` adds an `AI-built` tag after roles only when software-development provenance directly supports it. Roles, provenance and technical keywords remain separate in the data. It is currently approved only for Ngspice + OpenVAF Enhancements. AI research alone does not establish AI-built provenance. Do not introduce an Analog three-way AI classification or display AI-enabled/Traditional labels.

Reviewed repository-backed monthly history produces a compact twelve-cell activity band, whether hosted on GitHub, GitLab or another canonical forge. Point updates without that history remain date-only. Cells indicate monthly presence, never commit-volume strength.

## Product boundary

Do not depend on Event, Company, Person, or Article records; add Golden records to support a project; connect project metadata to Golden IDs; change factual semantics, viewer state, authored Articles, or `/export.json`. Shared site shell, typography, `sitePath`, and build/test infrastructure remain appropriate.

The existing Astro static output, plain CSS, and small TypeScript architecture stays. No database, frontend framework, charting library, runtime API, public catalog JSON endpoint, compare mode, project subpages, or new score system.

## Research and maintenance

The catalog represents currently active projects, not a historical archive. At each review, remove projects with no verifiable meaningful public activity in the preceding twelve months (inclusive cutoff for 2026-09-05: **2025-09-05**). Projects with reviewed repository history require substantive default-branch implementation, task/data, result or technical-maintenance activity; cosmetic links and automated traffic/dependency churn alone do not renew eligibility. Projects without reviewed monthly repository history require a sourced public project update. This rolling curation rule does not diminish the historical work's technical value. New additions require a real public implementation in a verified canonical repository or upstream source distribution, not a paper's promise of code. SourceForge-backed ngspice uses a sourced release date with no monthly strip; the existing fresh paper-only ATLAS entry remains.

Re-open primary material before changing researched claims or workflow classification. Presentation summaries may condense the existing reviewed content without new claims. Separate reasoning from generation, evaluator simulation from model tools, relative sizing from electrical optimization, implemented paths from experiments and plans, and paper results from released artifacts. Preserve detailed research, prerequisites and activity methodology in the authored files and implementation notes; do not render them as dashboard explanations. Do not reproduce paid model or commercial EDA experiments merely to classify a project.

`IMPLEMENTATION_SPEC.md` defines behavior and validation. `IMPLEMENTATION_NOTES.md` records classification decisions, selected repositories, activity methodology, and checks. Catalog additions remain bounded and independently authored; repository commits are not catalog update notes.

Follow the user's current delivery instruction. This refinement is authorized for a normal fast-forward commit/push to `main` after validation and self-review. Do not deploy in this pass. Do not force-push or change deployment configuration; the existing Pages workflow is manual-only.
