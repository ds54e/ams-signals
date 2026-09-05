# Digital implementation contract

## Isolation and data

Use the `digital` Astro collection in `src/content/digital/`, its own schema/catalog/activity modules in `src/lib/digital/`, page in `src/pages/digital/` and stylesheet in `src/styles/digital.css`. Activity stays in `src/data/digital-activity.json`. Catalogs share only small content-independent helpers and the site shell; never couple them to factual/editorial records or export.

Public route `/digital/`, hidden H1 `Digital`, title `Digital · AMS Signals`. Use technical domain metadata, unchanged noindex/nofollow, and **Timeline | Events | Analog | Digital | Articles** navigation with correct base-path URLs and `aria-current`. There is no client catalog state or fetching.

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

Only **Project | Scope | Activity**. The column-header row is the first visible catalog content. Catalog max width is **1120px**, centered within the existing page shell; no global width change. Desktop columns are **`minmax(0, 1fr) 170px 108px`**, with **22px gaps**. At full width Project is **798px**. Below 900px stack the three areas in document order and hide the desktop header. No horizontal scrolling, oversized cards or extra prose.

Each row has an article with an accessible name, plain-text H2 immediately followed by external links. Do not render classification labels in the title or retain obsolete role/project-wide AI schema fields. Stage AI and AI-built belong only in Scope. Use a baseline-aligned wrapping flex title row, left aligned with **12px gaps**. Links remain Website, Paper, Code, Results, in that order and only when authored. No icons, self-links, fragment aliases or empty research-anchor elements. IDs required for article labelling remain. A single concise capability description appears below; retain essential technical identifiers naturally when condensing it.

Scope is a labelled vertical list with one stage per line, 3px gaps and 1.4 line height. The narrow 170px column has no pills, boxes or extra explanation. Each stage renders once: `AI Design` when its `ai` value is true, otherwise `Design`, and likewise for the other stages. AI-built is a separate last item, never an AI stage. Every item uses the same-size CSS circle (filled core/defining, open supporting/partial), a matching tooltip and accessible level text. Stage labels use Core scope/Supporting scope; AI-built identifies defining or partial/secondary development provenance. Shape works in monochrome and forced colors. No standalone legend or overview.

Sort by latest public activity descending: repository `lastCommitAt`, otherwise `lastPublicUpdateAt`; then NFKC-normalized lower-case trimmed name and slug ascending. Do not mutate authored input. Meaningful dates govern eligibility, not ordering. Month counts never rank projects.

Without JavaScript, all rows, Scope, activity metadata and external links work in static HTML. There are no disclosures, storage, search, filtering, self-permalink handlers or compatibility scripts. Preserve all source URLs and the independent Timeline/Events viewer.

## Reviewed public activity

Top-level fields: `reviewedAt`, UTC `capturedAt` on that date, `method: first-parent-committer-utc`, exactly twelve consecutive calendar `months` ending in the snapshot month, and one `projects` record per catalog slug. The current month is partial. Unknown or missing project IDs fail validation.

GitHub records contain:

- `kind: github`, verified canonical `repository`, numeric GitHub `repositoryId`, actual `defaultBranch` and captured `headSha`;
- twelve nonnegative safe-integer `commits` buckets;
- latest UTC `lastCommitAt` across the captured tip's full first-parent history;
- manually reviewed `lastMeaningfulCommitAt` and `lastMeaningfulCommitSha`, with a matching primary commit URL in the content sources.

Dates cannot exceed the snapshot. Meaningful activity cannot follow the latest commit or precede the rolling cutoff. Latest and meaningful commit months must agree with nonempty buckets where inside the window; no later month may have commits. Raw buckets include maintenance/bot traffic, while eligibility is assessed separately.

Every public Activity row stacks the normal-weight (400) date (`Sep 5`, including a different year when needed), the twelve-cell band, then secondary `N/12 months` left-aligned with the band. Use 5px-wide, 12px-high upright rectangular CSS cells with 2px gaps (82px total), newest to oldest: filled for a month with a reviewed signal, quietly outlined otherwise. Keep the band at its intrinsic 82px width, inside a 108px Activity column that also fits year-bearing dates. Keep the block compact and left-aligned on mobile. Counts never change height, width, opacity or color intensity. Each cell retains full month/year and repository counts or point-signal details in title/accessible text and data attributes. Only repository cells carry commit counts. Repository/default-branch identity or point-source provenance stays in the band's accessible label and date tooltip, not visible text or a duplicate link. The visible date has no Paper, Release, Public update, GitHub, GitLab or Latest prefix. The column header is only Activity, without a month-range cue. The snapshot/current month is leftmost (0 months ago), and the oldest is rightmost (11 months ago). DOM order, hover text, accessible descriptions and month data attributes follow that same newest-first order. Stored snapshot months and commit buckets stay chronological; only the newly constructed rendering cells are reversed. Never show stars, forks, rankings or scores.

The additional `kind: repository` supports reviewed non-GitHub monthly history without changing existing `github` records. It requires a canonical HTTPS repository URL matching the authored Code source, an explicit host-scoped `repositoryId`, `defaultBranch`, `headSha`, twelve first-parent UTC `commits` buckets, `lastCommitAt`, `lastMeaningfulCommitAt`, `lastMeaningfulCommitSha` and `lastMeaningfulCommitSource`. That source ID must resolve to the reviewed commit within the canonical repository. It also pins its own `capturedAt`, allowing a later manual review without claiming that other projects were refreshed. The capture must be in the snapshot month, no later than the review date, and at or after the latest commit date. A changed month window requires recapturing the manual history; validation forbids silently relabeling old buckets. Eligibility and ordering retain the same meaningful/latest-date rules. GitHub identity and commit-source checks remain unchanged.

Records without reviewed monthly history use `kind: public-update`, a required `lastPublicUpdateAt` and a valid `lastPublicUpdateSource`. They derive the same twelve-cell view from their reviewed event date, without a `commits` field. Surfer now uses a reviewed `repository` record from its canonical GitLab `main` branch, retaining its existing latest and meaningful date and primary commit source. Source-backed ngspice and paper-tracked ATLAS on Analog activate August and July 2026 respectively, each with `1/12 months`.

The **12-month reviewed public activity band** is a rendering view shared by both catalogs, not a flattening of stored provenance. Existing repository records retain genuine first-parent counts. Point records require `lastPublicUpdateType` (`paper`, `release` or `public-update`) alongside their existing reviewed date and source ID. Map the date to its calendar month only; no synthetic repository, SHA or commit buckets are added. An event outside the displayed months produces twelve inactive cells and `0/12 months`, without moving the event or changing freshness eligibility. Active-month counts never affect ordering.

For point cells, titles/accessibility text say `July 2026 · paper publication`, `August 2026 · release` or the corresponding public update. Other months say `no reviewed public activity signal`, never `0 commits`. An inactive month does not establish that development stopped. Every row retains date / twelve binary cells / `N/12 months`. Commit volume never changes visible strength; source types, source IDs and raw repository counts stay available in metadata and hover/accessibility detail. No public methodology prose is added.

## Validation and delivery

`validate:digital` and `test:digital` run inside `npm run check`. Validate stable unique IDs, strict nonempty stage Scope, explicit AI booleans and supported levels, concise descriptions, source URLs/IDs/purposes, complete activity coverage, valid consecutive months/counts/dates, canonical identities and inclusive meaningful freshness. Keep all existing activity, Golden and companion-catalog checks.

The manual `refresh:digital-activity` command is not a build/check/browser dependency. It verifies repository identity and first-parent history, preserves manually reviewed meaningful dates and non-GitHub records, validates the whole proposed snapshot, then replaces it atomically. Network/identity/history failure leaves checked-in data intact.

The production-preview Chromium suite derives inventory/source/Scope/activity expectations from authored data. It checks one row per project, ordering, plain-text titles, quick links immediately after names, absence of title classification labels, vertical Scope with exact normal/AI stage labels, separate AI-built and circle accessibility, normal-weight dates, all-row twelve-cell bands, real repository counts vs point-event provenance, keyboard/no-JS operation, no runtime requests/storage, navigation order and state isolation. Inspect first/middle/last and multi-link rows at **1440, 1280, 1024, 390 and 320px**, including forced colors and no page overflow. Preserve existing non-catalog behavior and the robots directive.

Run `npm run check`, both catalog unit commands, `npm run test:smoke` and `git diff --check`. Compare source arrays, retained metadata, activity JSON, factual content, Article bodies and `/export.json` against the starting state. Review the full diff and rendered density. Commit/push to `main` with normal history after successful checks; deploy only when explicitly authorized, through the existing manual Pages workflow. Wait for both jobs and verify production; do not change deployment configuration.
