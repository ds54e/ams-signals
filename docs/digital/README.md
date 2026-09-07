# Digital catalog

Read `AGENTS.md`, `PROJECT_CONTEXT.md`, this file, [IMPLEMENTATION_SPEC.md](IMPLEMENTATION_SPEC.md) and [IMPLEMENTATION_NOTES.md](IMPLEMENTATION_NOTES.md) before changing this surface.

## Reader goal and page direction

At `/digital/`, quickly understand what an RTL/digital project does, what it covers, where AI materially participates and whether it has recent public activity.

The English-only page is a two-column editorial index: a metadata rail beside project content, without visible column headings. Keep the visually hidden H1 `Digital`, browser title `Digital · AMS Signals`, and no visible title, introduction, review dates or methodology. A lightweight Search / All scopes toolbar and quiet result count enhance the list when JavaScript is available. No overview block, standalone legend, tabs, rankings or project subpages.

Search matches the public name, description and rendered Scope labels. The single stage selector matches stage presence independently of AI prefixes; Search and Scope combine with AND. Filtering is local to the current page, without URL state, storage or EventExplorer coupling. Without JavaScript the toolbar stays hidden and every project remains readable.

Project names are plain text. On the same left-aligned wrapping title line, show only the name and available Website / Paper / Code / Results links, in that order. A short capability description follows, usually two useful sentences explaining the project and its workflow or output. Preserve identifying technical terms naturally, without adding hidden search metadata. Scope stages (Design, Synthesis, Verification, Layout) appear as compact, vertically stacked uppercase category labels in the metadata rail. No self-permalink links or fragment compatibility aliases are maintained.

The metadata rail shows a compact, normal-weight date including its year (`SEP 5, 2026`), twelve binary cells with the oldest month at the left and newest/current month at the right, then Scope labels separated by a compact 10px gap. Month totals remain non-visible; no extra labels or section headings separate this block. Repository-backed records use reviewed monthly history from their canonical host, including GitLab. Paper/release/public-update records activate the reviewed event month without invented commit counts. Activity provenance is available through hover/accessibility metadata rather than a visible date prefix. Activity describes recorded public signals, never total development effort or quality.

Both catalogs share one presentation component, filter script and stylesheet, and use the same 920px listing width as Articles and Events. Typography and row rhythm follow the site-wide [visual system](../VISUAL_SYSTEM.md), while domain data and validation remain independent.

## Domain and boundaries

Domain chooses the page. A present Scope stage means the project materially participates in that user-facing design stage; it is not a score or a promise of completeness. Do not add stages for internal dependencies, incidental adapters or future plans. Every project needs at least one design-flow stage.

The title line has no classification labels. Each present Scope stage contains only an explicit `ai` boolean. Render either the normal stage name or its `AI `-prefixed form, never both. Optional `scope.aiDevelopment` is a single `assisted` / `built` enum rendered after the functional stages. **AI-ASSISTED** identifies substantial AI-assisted implementation of a meaningful feature, subsystem or campaign. **AI-BUILT** identifies a major AI implementation role across the project or its defining core. Both require strong direct evidence; the distinction is scope, never confidence or quality. Runtime stage AI remains independent and is not inferred from an MCP interface, a model used elsewhere or AI-authored commits. Roles, capability strength fields and project-wide runtime-AI enums remain absent.

The [shared development-provenance review](../AI_BUILT_REVIEW.md) records every current project and preserves the previous audit as history. Each displayed label has a factual `developmentEvidence` explanation, valid existing source references and its own review date. Ambiguous or incidental evidence stays unlabeled; AI-ASSISTED is never a fallback for weak AI-BUILT evidence. A badge opens the explanation and primary links inline through a keyboard/touch-accessible native button; static HTML keeps them readable without JavaScript. No modal or project page is added.

The [Scope simplification review](../CATALOG_SCOPE_REVIEW.md) records every reassessed secondary assignment and the description review. Filled labels use stage colors; AI-prefixed forms retain that same color, while provenance uses muted red: AI-ASSISTED is outlined and unfilled; AI-BUILT is filled. A small extra gap separates the final provenance badge from workflow stages. Text carries meaning without color.

Primary navigation is **Timeline | Events | Analog | Digital | Articles**. The existing `noindex, nofollow` policy stays. Routes, collections and directories use `analog` and `digital` consistently; no redirects or route aliases.

The independently authored catalogs do not depend on Golden Timeline/Events, Companies, People or Articles, alter viewer state, or enter `/export.json`. Preserve authored Japanese Articles. Keep Astro static output, plain CSS, no database/framework/chart library/runtime fetching, and no generalized Golden technology taxonomy.

## Active curation and research

The catalog is a current landscape, not a historical archive. Remove projects with no verified meaningful public activity in the preceding twelve months; this does not diminish their historical technical value. The 2026-09-06 activity review uses the inclusive 2025-09-06 cutoff. Repository eligibility uses manually reviewed substantive implementation, correctness, tests, technical maintenance or result updates. Cosmetic/bot traffic alone does not renew it. Mechanical latest public activity remains the sort key, with normalized name and slug tie-breakers.

Re-open cited primary material before changing claims or Scope. Read the authored implementation/release notes; distinguish electrical evaluation from structural grading, model tools from evaluator operations, released paths from experiments/plans and reported results from reproduced results. Keep complete research in Markdown/frontmatter; expose only the requested concise development evidence through its badge, without adding public methodology. Do not run costly external EDA/model experiments merely to classify scope. Use the watch list only for bounded future review.

Follow the current delivery authorization. Run full checks and browser/visual review before a normal commit/push. When deployment is authorized, use the existing manual Pages workflow on `main`, wait for build and deploy success, then verify production; never replace its deployment mechanism.
