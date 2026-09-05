# Analog implementation contract

## Isolation and data

Use the `analog` Astro collection in `src/content/analog/`, its own schema/catalog/activity modules in `src/lib/analog/`, page in `src/pages/analog/` and stylesheet in `src/styles/analog.css`. Activity stays in `src/data/analog-activity.json`. Catalogs share only small content-independent helpers and the site shell; never couple them to factual/editorial records or export.

Public route `/analog/`, hidden H1 `Analog`, title `Analog · AMS Signals`. Use technical domain metadata, unchanged noindex/nofollow, and **Timeline | Events | Analog | Digital | Articles** navigation with correct base-path URLs and `aria-current`. There is no client catalog state or fetching.

Strict schema: `name`, optional `aliases`, internal `summary` (240 characters), one public `description` (600 characters), required `flow`, optional `targets`/`notice`, `access`, valid `addedAt`/`reviewedAt`, and `sources`. The existing bounded catalog-update records stay internal.

Source IDs are unique stable slugs; URLs are public HTTP(S), non-placeholder and credential-free. At most one source per quick-link purpose (`official`, `paper`, `code`, `results`). Markdown stores durable implementation, classification and release notes with validated local `#source-ID` references; keep external URLs in frontmatter. Body prose is not rendered on the index. Unknown fields fail validation. Keep stable filenames/project IDs for content identity, not as a public fragment-navigation contract.

## Flow

The strict required `flow` object accepts only the following optional fields, ordered as listed; each value is `core` or `supporting`. At least one defined stage is required. An enabling tool may legitimately have only supporting scope; do not manufacture a core mark to satisfy validation.

- `design` → Design: circuit understanding, topology selection/generation, schematic/netlist editing, transistor sizing, tuning, optimization and design-space exploration.
- `simulation` → Simulation: SPICE/Verilog-A/behavioral execution, electrical evaluation/measurement, simulator feedback and relevant learned performance estimation.
- `layout` → Layout: layout generation/editing, placement/routing, physical implementation and associated DRC/LVS/PEX or orchestration.

Optimization belongs to Design. Tool integration is classified by its actual operations, not an additional stage. Schematic drawing is Design, not IC layout. A simulator is normally core Simulation; a model compiler that enables another simulator may have only supporting Simulation.

Core is a central user-facing capability/task/deliverable. Supporting is a secondary, optional, feedback, integration or enabling role. Re-review each project against its sources; do not derive scope from its name or dependencies. Plans get no marks. Missing stages are omitted and do not assert inability.

## Index and accessibility

Only **Project | Flow | Activity**. The column-header row is the first visible catalog content. Catalog max width is **1120px**, centered within the existing page shell; no global width change. Desktop columns are **`minmax(0, 1fr) 170px 108px`**, with **22px gaps**. At full width Project is **798px**. Below 900px stack the three areas in document order and hide the desktop header. No horizontal scrolling, oversized cards or extra prose.

Each row has an article with an accessible name, plain-text H2 immediately followed by external links. Do not render classification labels or retain unused role/AI schema fields. Use a baseline-aligned wrapping flex title row, left aligned with **12px gaps**. Links remain Website, Paper, Code, Results, in that order and only when authored. No icons, self-links, fragment aliases or empty research-anchor elements. IDs required for article labelling remain. A single concise capability description appears below; retain essential technical identifiers naturally when condensing it.

Flow is a labelled vertical list with one stage per line, 3px gaps and 1.4 line height. The narrow 170px column has no pills, boxes or extra explanation. Each item has the stage label, a same-size CSS circle (filled core, open supporting), a matching tooltip and accessible Core scope/Supporting scope text. Shape works in monochrome and forced colors. No standalone legend or overview.

Sort by latest public activity descending: repository `lastCommitAt`, otherwise `lastPublicUpdateAt`; then NFKC-normalized lower-case trimmed name and slug ascending. Do not mutate authored input. Meaningful dates govern eligibility, not ordering. Month counts never rank projects.

Without JavaScript, all rows, Flow, activity metadata and external links work in static HTML. There are no disclosures, storage, search, filtering, self-permalink handlers or compatibility scripts. Preserve all source URLs and the independent Timeline/Events viewer.

## Reviewed public activity

The compact column label is `Activity`; accessible labels identify reviewed public activity and its provenance. No introductory explanation is shown. No stars, forks/watchers counts, issues/PR counts, scores, or quality ranking.

Use exactly one verified primary public repository per project, explicitly recorded, and its current default branch. Never sum repositories or count non-landed PR refs. Without monthly repository history, derive the same twelve-cell band from the reviewed public event date. Only its calendar month is active when inside the window; do not store synthetic commit counts.

The activity kind `no-public-repo` means no reviewed monthly repository history for this visualization: it also accommodates a real SourceForge source repository. Never present this internal enum as a claim that ngspice lacks public code.

Separate volatile activity into `src/data/analog-activity.json`. Include explicit snapshot date, ordered twelve calendar months ending in the snapshot month (current month is partial), project IDs, activity kind, repository, default branch, monthly integer counts, last default-branch commit date, and optional last public update date for no-repository projects. Record a pinned repository head and collection time for auditability. Optional `repositoryId` and `lastMeaningfulCommitSha` preserve stronger identity/provenance for transferred and newly reviewed records; all new GitHub baselines include both. A supplied meaningful SHA requires its exact commit URL in content sources and agreement with a nonempty month bucket. The refresh script checks a supplied numeric ID and confirms a supplied meaningful SHA/date in first-parent history, without advancing it automatically.

For repository-backed records also require `lastMeaningfulCommitAt`: the date of the most recent substantive commit verified during manual review, with the inspected commit recorded in `notes`. This conservative freshness evidence can precede `lastCommitAt` and must never follow it. Eligibility uses the meaningful date; ordering and the unchanged raw monthly strip use the actual latest committer date/history. The refresh helper preserves the reviewed meaningful date, never promotes a bot/cosmetic commit automatically, and refuses to replace the snapshot if eligibility has expired. The rolling cutoff is a calendar date one year before review (February 29 clamps to February 28), separate from the twelve displayed calendar months.

For every project stack the normal-weight (400) latest date (`Sep 5`, retaining the year when different from the snapshot year), the twelve-cell band, then secondary `N/12 months` left-aligned with the band. Use 5px-wide, 12px-high upright rectangular CSS cells with 2px gaps (82px total), from oldest to newest: filled for a month with a reviewed signal, a quiet outline otherwise. Keep the band at its intrinsic 82px width, inside a 108px Activity column that also fits year-bearing dates. Keep this compact block left-aligned on mobile rather than stretching it. Every active cell has identical size, color and opacity regardless of count. Keep full month/year names and repository counts or point-signal details in each cell's title, accessible text and data attributes; these are informational, never visual strength. Only repository cells carry commit counts. Keep repository/default-branch identity or point-source provenance in the band's accessible label and date tooltip, not visible text or a second link. The visible date has no Paper, Release, Public update, GitHub, GitLab or Latest prefix. The column header is only Activity, without a month-range cue. Do not repeat month labels or explanatory prose in rows.

The additional `kind: repository` supports reviewed non-GitHub monthly history without changing existing `github` records. It requires a canonical HTTPS repository URL matching the authored Code source, an explicit host-scoped `repositoryId`, `defaultBranch`, `headSha`, twelve first-parent UTC `commits` buckets, `lastCommitAt`, `lastMeaningfulCommitAt`, `lastMeaningfulCommitSha` and `lastMeaningfulCommitSource`. That source ID must resolve to the reviewed commit within the canonical repository. It also pins its own `capturedAt`, allowing a later manual review without claiming that other projects were refreshed. The capture must be in the snapshot month, no later than the review date, and at or after the latest commit date. A changed month window requires recapturing the manual history; validation forbids silently relabeling old buckets. Eligibility and ordering retain the same meaningful/latest-date rules. GitHub identity and commit-source checks remain unchanged.

The **12-month reviewed public activity band** is a rendering view shared by both catalogs, not a flattening of stored provenance. Existing repository records retain genuine first-parent counts. Point records require `lastPublicUpdateType` (`paper`, `release` or `public-update`) alongside their existing reviewed date and source ID. Map the date to its calendar month only; no synthetic repository, SHA or commit buckets are added. An event outside the displayed months produces twelve inactive cells and `0/12 months`, without moving the event or changing freshness eligibility. Active-month counts never affect ordering.

For point cells, titles/accessibility text say `July 2026 · paper publication`, `August 2026 · release` or the corresponding public update. Other months say `no reviewed public activity signal`, never `0 commits`. An inactive month does not establish that development stopped. Every row retains date / twelve binary cells / `N/12 months`. Commit volume never changes visible strength; source types, source IDs and raw repository counts stay available in metadata and hover/accessibility detail. No public methodology prose is added.

Method: inspect the first-parent history of the captured default-branch head and bucket committer dates in UTC. Count a merge once at its integration commit; omit side-branch commits as separate counts. Git commit dates do not prove push/landing dates; fast-forwards, imported/rewritten history, bots and bulk commits can distort visibility. Retain methodology and repository-specific caveats in data and maintenance documentation, not dashboard prose. Do not infer inactivity beyond public history.

The existing manual helper refreshes GitHub history only and preserves manually reviewed non-GitHub records. Validation rejects a shifted month window until those histories are recaptured. It must validate a complete snapshot before replacing it, fail without damaging the checked-in data, and never run during check/build or in the browser. Normal builds require no repository-host access. A refresh must not silently add repositories or claim a paper-only project has code; that is a research decision.

## Validation and delivery

`validate:analog` and `test:analog` run inside `npm run check`. Validate stable unique IDs, strict nonempty Flow and supported states, concise descriptions, source URLs/IDs/purposes, complete activity coverage, valid consecutive months/counts/dates, canonical identities and inclusive meaningful freshness. Keep all existing activity, Golden and companion-catalog checks.

The manual `refresh:analog-activity` command is not a build/check/browser dependency. It verifies repository identity and first-parent history, preserves manually reviewed meaningful dates and non-GitHub records, validates the whole proposed snapshot, then replaces it atomically. Network/identity/history failure leaves checked-in data intact.

The production-preview Chromium suite derives inventory/source/Flow/activity expectations from authored data. It checks one row per project, ordering, plain-text titles, quick links immediately after names, absence of classification labels, vertical Flow with exact labels and circle accessibility, normal-weight dates, all-row twelve-cell bands, real repository counts vs point-event provenance, keyboard/no-JS operation, no runtime requests/storage, navigation order and state isolation. Inspect first/middle/last and multi-link rows at **1440, 1280, 1024, 390 and 320px**, including forced colors and no page overflow. Preserve existing non-catalog behavior and the robots directive.

Run `npm run check`, both catalog unit commands, `npm run test:smoke` and `git diff --check`. Compare source arrays, retained metadata, activity JSON, factual content, Article bodies and `/export.json` against the starting state. Review the full diff and rendered density. Commit/push to `main` with normal history after successful checks; **do not deploy or change deployment configuration**.
