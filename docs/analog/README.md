# Analog catalog

Read `AGENTS.md`, `PROJECT_CONTEXT.md`, this file, [IMPLEMENTATION_SPEC.md](IMPLEMENTATION_SPEC.md) and [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md) before changing this surface.

## Reader goal and page direction

At `/analog/`, quickly understand what an analog/RF/AMS project does, what it covers, where AI materially participates and whether it has recent public activity.

The English-only page starts directly with one compact index: **Project | Scope | Activity**. Keep the visually hidden H1 `Analog`, browser title `Analog · AMS Signals`, and no visible title, introduction, counts, review dates or methodology. No overview block, standalone legend, search, filters, tabs, disclosures, rankings or project subpages.

Project names are plain text. On the same left-aligned wrapping title line, show only the name and available Website / Paper / Code / Results links, in that order. A single concrete description follows. Scope stages (Design, Simulation, Layout) appear vertically, one per line, with small filled/open circles for core/supporting scope. No self-permalink links or fragment compatibility aliases are maintained.

Every Activity row shows its compact, normal-weight date, twelve binary cells with the newest month at the left and oldest at the right, and `N/12 months`. Repository-backed records use reviewed monthly history from their canonical host, including GitLab. Paper/release/public-update records activate the reviewed event month without invented commit counts. Provenance is available through hover/accessibility metadata rather than a visible date prefix. Activity describes recorded public signals, never total development effort or quality.

## Domain and boundaries

Domain chooses the page and Scope describes its design-stage scope. Core means a central user-facing capability/task/deliverable; supporting means a secondary, optional, feedback or enabling role. Neither measures maturity, autonomy or reproduced success. Do not add stages solely for internal dependencies or future plans.

The title line has no classification labels. Scope records each stage as an explicit `level` and `ai` boolean. Render either the normal stage name or its `AI `-prefixed form, never both. Optional `scope.aiBuilt` is a separate final item: core for defining, well-supported AI development provenance; supporting for material but partial/secondary assistance. Runtime stage AI is not inferred from an MCP interface, a model used elsewhere, or AI-authored commits. Role labels and the former project-wide AI categories have no active schema or UI.

Primary navigation is **Timeline | Events | Analog | Digital | Articles**. The existing `noindex, nofollow` policy stays. Routes, collections and directories use `analog` and `digital` consistently; no redirects or route aliases.

The independently authored catalogs do not depend on Golden Timeline/Events, Companies, People or Articles, alter viewer state, or enter `/export.json`. Preserve authored Japanese Articles. Keep Astro static output, plain CSS, no database/framework/chart library/runtime fetching, and no generalized Golden technology taxonomy.

## Active curation and research

The catalog is a current landscape, not a historical archive. Remove projects with no verified meaningful public activity in the preceding twelve months; this does not diminish their historical technical value. The 2026-09-05 review uses the inclusive 2025-09-05 cutoff. Repository eligibility uses manually reviewed substantive implementation, correctness, tests, technical maintenance or result updates. Cosmetic/bot traffic alone does not renew it. Mechanical latest public activity remains the sort key, with normalized name and slug tie-breakers.

Re-open cited primary material before changing claims or Scope. Read the authored implementation/release notes; distinguish electrical evaluation from structural grading, model tools from evaluator operations, released paths from experiments/plans and reported results from reproduced results. Keep research and complete provenance in Markdown/frontmatter, not public methodology. Do not run costly external EDA/model experiments merely to classify scope. Use the watch list only for bounded future review.

Follow the current delivery authorization. Run full checks and browser/visual review before a normal commit/push. When deployment is authorized, use the existing manual Pages workflow on `main`, wait for build and deploy success, then verify production; never replace its deployment mechanism.
