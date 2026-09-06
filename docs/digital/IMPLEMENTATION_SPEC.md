# Digital implementation contract

## Isolation and data

Use the `digital` Astro collection in `src/content/digital/`, its own schema/catalog/activity modules in `src/lib/digital/`, page in `src/pages/digital/`. Activity stays in `src/data/digital-activity.json`. Both pages prepare domain data independently and render through `src/components/CatalogIndex.astro` and the single `src/styles/catalog.css`, using the shared [visual system](../VISUAL_SYSTEM.md); never couple them to factual/editorial records or export.

Public route `/digital/`, hidden H1 `Digital`, title `Digital · AMS Signals`. Use technical domain metadata, unchanged noindex/nofollow, and **Timeline | Events | Analog | Digital | Articles** navigation with correct base-path URLs and `aria-current`. Client filtering is ephemeral and independent of Timeline/Events. There is no runtime data fetching, URL state or storage.

Strict schema: `name`, optional `aliases`, one English single-paragraph `description` (600 characters), required `scope`, `access`, valid `addedAt`/`reviewedAt`, and `sources`. Review cannot precede addition.

Source IDs are unique stable slugs; URLs are public HTTP(S), non-placeholder and credential-free. At most one source per quick-link purpose (`official`, `paper`, `code`, `results`). Markdown stores durable implementation, classification and release notes with validated local `#source-ID` references; keep external URLs in frontmatter. Body prose is not rendered on the index. Unknown fields fail validation. Keep stable filenames/project IDs for content identity, not as a public fragment-navigation contract.

## Scope

The strict required `scope` object accepts the following optional stage fields, ordered as listed. Each present stage is a strict object with required `level: core | supporting` and required `ai: boolean`; neither is inferred or defaulted. At least one defined design-flow stage is required. An enabling tool may legitimately have only supporting scope; do not manufacture a core mark to satisfy validation. The optional final `aiBuilt: core | supporting` describes development provenance and cannot satisfy the stage requirement by itself. No flat `ai-design` taxonomy or project-wide AI enum remains.

- `design` → Design: RTL generation/editing/repair and user-facing design representation/IR transformations. A simulator's internal parser or a read-only debug database does not establish this stage.
- `synthesis` → Synthesis: logic synthesis, technology mapping, synthesis-driven optimization and actual synthesis/PPA loops.
- `verification` → Verification: RTL/gate simulation, testbenches, formal/model/equivalence checking, coverage, debug and waveform inspection.
- `layout` → Layout: floorplanning, placement, CTS, routing, backend timing/closure and implementation flows.

Review standalone frontends individually: reusable design APIs differ from synthesis-oriented lowering. Testbench/assertion generation belongs to Verification, not DUT Design. Synthesis timing alone is not Layout; clock-tree synthesis belongs to Layout, not logic Synthesis.

Core is a central user-facing capability/task/deliverable. Supporting is a secondary, optional, feedback, integration or enabling role. Re-review each project against its sources; do not derive scope from its name or dependencies. Plans get no marks. Missing stages are omitted and do not assert inability.

## AI involvement and evidence

An AI-prefixed stage means AI/ML/LLM materially participates in that stage's user-facing behavior: generation, decisions/search, prediction, interpretation, diagnosis or an implemented control loop. Running a conventional simulator or synthesizer after model-generated input is insufficient. RTL repair from timing feedback can be AI Design while fixed synthesis/SEC execution remains conventional. Testbench generation, coverage decisions and failure diagnosis belong to AI Verification when performed by a model; backend agents adapting synthesis or layout scripts can justify AI in those stages. An MCP/agent API alone adds no AI prefix.

AI-built describes the tool's own software development, independently of runtime AI. Core requires defining direct evidence; supporting requires material but secondary/partial assistance. Occasional AI-authored documentation, dependency updates or isolated commits are insufficient. Preserve the reasoning and cited implementation evidence in each Markdown body. Missing marks express a reviewed evidence boundary, not an assertion of inability, quality or maturity.

## Index and accessibility

The three row areas are Project, Scope and Activity, with **no visible column headers**. Use the shared **920px listing width**, aligned with Articles and Events. Desktop columns are **`minmax(0, 1fr) 122px 88px`**, with **16px gaps**, leaving **678px** for Project at full width. Below 900px stack Project → Scope → Activity in document order. No horizontal scrolling, oversized cards or extra prose.

Each row has an article with an accessible name, plain-text H2 immediately followed by external links. Do not render classification labels in the title or retain obsolete role/project-wide AI schema fields. Stage AI and AI-built belong only in Scope. Use a baseline-aligned wrapping flex title row, left aligned with **12px gaps**. Links remain Website, Paper, Code, Results, in that order and only when authored. No icons, self-links, fragment aliases or empty research-anchor elements. IDs required for article labelling remain. A single concise capability description appears below; retain essential technical identifiers naturally when condensing it.

The shared index primitives provide 17px/700 titles, 15px muted descriptions at 1.65 line height, 22px/24px row padding and 9px title-to-description spacing. Quick links and Scope use 13px; dates and activity summaries use 12px normal-weight metadata. These tokens also govern Articles and Events, with all four index surfaces sharing the listing width.

Scope is a labelled vertical list with one stage per line, 2px gaps and 1.4 line height. The narrow 122px column has no pills, boxes or extra explanation. Each stage renders once: `AI Design` when its `ai` value is true, otherwise `Design`, and likewise for the other stages. AI-built is a separate last item, never an AI stage. Every item uses the same-size CSS circle (filled core/defining, open supporting/partial), a matching tooltip and accessible level text. Stage labels use Core scope/Supporting scope; AI-built identifies defining or partial/secondary development provenance. Shape works in monochrome and forced colors. No standalone legend or overview.

Sort by latest public activity descending: repository `lastCommitAt`, otherwise `lastPublicUpdateAt`; then NFKC-normalized lower-case trimmed name and slug ascending. Do not mutate authored input. Meaningful dates govern eligibility, not ordering. Month counts never rank projects.

Without JavaScript, all rows, Scope, activity metadata and external links work in static HTML. The filter toolbar is hidden until enhancement succeeds, so no nonfunctional controls are exposed. There are no disclosures, storage, self-permalink handlers or compatibility scripts. Preserve all source URLs and the independent Timeline/Events viewer.

## Search and Scope filtering

`CatalogIndex.astro` supplies the same small native form to both domains; `src/scripts/catalog-filter.ts` enhances it. Search is about **300px**, the stage select **150px**, and the quiet normal-weight count follows immediately after the select with a 12px gap. The shared `.index-count` primitive also styles Event status and the Articles count; controls, count and any legend stay left-grouped and wrap naturally. At 600px and below Search takes a full row, with Scope and count below. Shared `filters.css` owns native control styling; there is no outer card, toolbar rule, reset button or replacement overview. The shared index rule removes the first visible row's top border, including after filtering. First-row padding supplies about 22px of whitespace below the controls.

Use only public project name, description and rendered Scope label text from the existing DOM. Do not index aliases, research, source URLs, accessible classification explanations or removed tags. Normalize Unicode NFKC, English case, punctuation/symbol separators and whitespace. All query terms must match; one/two-character terms such as `AI` match whole words to avoid incidental letters in `maintains`. Longer terms match substrings. Apply changes on input, after IME composition, and on Scope change; Enter must not navigate or submit a query string.

Options are All scopes, Design, Synthesis, Verification, Layout. Match the underlying stage independently of level or AI prefix. Search and stage selection use AND; filtering only hides rows and retains authored activity order. Show `N projects` by default and `N of TOTAL projects` whenever a nonempty search or stage filter is applied, even if all projects match. Announce the count politely. Zero matches shows only `No projects match.` below the controls. Clearing native controls restores the full list. Browser-restored form values are reconciled on `pageshow`; no URL/history manager or persistence layer is introduced.

## Reviewed public activity

Top-level fields: `reviewedAt`, UTC `capturedAt` on that date, `method: first-parent-committer-utc`, exactly twelve consecutive calendar `months` ending in the snapshot month, and one `projects` record per catalog slug. The current month is partial. Unknown or missing project IDs fail validation.

GitHub records contain:

- `kind: github`, verified canonical `repository`, numeric GitHub `repositoryId`, actual `defaultBranch` and captured `headSha`;
- twelve nonnegative safe-integer `commits` buckets;
- latest UTC `lastCommitAt` across the captured tip's full first-parent history;
- manually reviewed `lastMeaningfulCommitAt` and `lastMeaningfulCommitSha`, with a matching primary commit URL in the content sources.

Dates cannot exceed the snapshot. Meaningful activity cannot follow the latest commit or precede the rolling cutoff. Latest and meaningful commit months must agree with nonempty buckets where inside the window; no later month may have commits. Raw buckets include maintenance/bot traffic, while eligibility is assessed separately.

Every public Activity row stacks the normal-weight (400) date (`Sep 5`, including a different year when needed), the twelve-cell band, then secondary `N/12 months` left-aligned with the band. Use 4px-wide, 8px-high vertical CSS ticks with 2px gaps (70px total), newest to oldest: filled for a month with a reviewed signal, quietly outlined otherwise. Keep the band at its intrinsic 70px width, inside an 88px Activity column that also fits year-bearing dates. Keep the block compact and left-aligned on mobile. Counts never change height, width, opacity or color intensity. Each cell retains full month/year and repository counts or point-signal details in title/accessible text and data attributes. Only repository cells carry commit counts. Repository/default-branch identity or point-source provenance stays in the band's accessible label and date tooltip, not visible text or a duplicate link. The visible date has no Paper, Release, Public update, GitHub, GitLab or Latest prefix. There is no visible column header or month-range cue. The snapshot/current month is leftmost (0 months ago), and the oldest is rightmost (11 months ago). DOM order, hover text, accessible descriptions and month data attributes follow that same newest-first order. Stored snapshot months and commit buckets stay chronological; only the newly constructed rendering cells are reversed. Never show stars, forks, rankings or scores.

The additional `kind: repository` supports reviewed non-GitHub monthly history without changing existing `github` records. It requires a canonical HTTPS repository URL matching the authored Code source, an explicit host-scoped `repositoryId`, `defaultBranch`, `headSha`, twelve first-parent UTC `commits` buckets, `lastCommitAt`, `lastMeaningfulCommitAt`, `lastMeaningfulCommitSha` and `lastMeaningfulCommitSource`. That source ID must resolve to the reviewed commit within the canonical repository. It also pins its own `capturedAt`, allowing a later manual review without claiming that other projects were refreshed. The capture must be in the snapshot month, no later than the review date, and at or after the latest commit date. A changed month window requires recapturing the manual history; validation forbids silently relabeling old buckets. Eligibility and ordering retain the same meaningful/latest-date rules. GitHub identity and commit-source checks remain unchanged.

Records without reviewed monthly history use `kind: public-update`, a required `lastPublicUpdateAt` and a valid `lastPublicUpdateSource`. They derive the same twelve-cell view from their reviewed event date, without a `commits` field. Surfer now uses a reviewed `repository` record from its canonical GitLab `main` branch, retaining its existing latest and meaningful date and primary commit source. Source-backed ngspice and paper-tracked ATLAS on Analog activate August and July 2026 respectively, each with `1/12 months`.

The **12-month reviewed public activity band** is a rendering view shared by both catalogs, not a flattening of stored provenance. Existing repository records retain genuine first-parent counts. Point records require `lastPublicUpdateType` (`paper`, `release` or `public-update`) alongside their existing reviewed date and source ID. Map the date to its calendar month only; no synthetic repository, SHA or commit buckets are added. An event outside the displayed months produces twelve inactive cells and `0/12 months`, without moving the event or changing freshness eligibility. Active-month counts never affect ordering.

For point cells, titles/accessibility text say `July 2026 · paper publication`, `August 2026 · release` or the corresponding public update. Other months say `no reviewed public activity signal`, never `0 commits`. An inactive month does not establish that development stopped. Every row retains date / twelve binary cells / `N/12 months`. Commit volume never changes visible strength; source types, source IDs and raw repository counts stay available in metadata and hover/accessibility detail. No public methodology prose is added.

## Validation and delivery

`validate:digital` and `test:digital` run inside `npm run check`. Validate stable unique IDs, strict nonempty stage Scope, explicit AI booleans and supported levels, concise descriptions, source URLs/IDs/purposes, complete activity coverage, valid consecutive months/counts/dates, canonical identities and inclusive meaningful freshness. Keep all existing activity, Golden and companion-catalog checks.

The manual `refresh:digital-activity` command is not a build/check/browser dependency. It verifies repository identity and first-parent history, preserves manually reviewed meaningful dates and non-GitHub records, validates the whole proposed snapshot, then replaces it atomically. Network/identity/history failure leaves checked-in data intact.

The production-preview Chromium suite derives inventory/source/Scope/activity expectations from authored data. It checks one row per project, ordering, plain-text titles, quick links immediately after names, absence of title classification labels, vertical Scope with exact normal/AI stage labels, separate AI-built and circle accessibility, normal-weight dates, all-row twelve-cell bands, real repository counts vs point-event provenance, keyboard/no-JS operation, normalized public-text Search, every stage filter, AND matching, result counts/empty state, absence of column headers, no external requests/storage, navigation order and state isolation. Inspect first/middle/last and multi-link rows at **1440, 1280, 1024, 390 and 320px**, including forced colors and no page overflow. Preserve existing non-catalog behavior and the robots directive.

Run `npm run check`, both catalog unit commands, `npm run test:smoke` and `git diff --check`. Compare source arrays, retained metadata, activity JSON, factual content, Article bodies and `/export.json` against the starting state. Review the full diff and rendered density. Commit/push to `main` with normal history after successful checks; deploy only when explicitly authorized, through the existing manual Pages workflow. Wait for both jobs and verify production; do not change deployment configuration.
