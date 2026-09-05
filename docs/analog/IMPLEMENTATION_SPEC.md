# Analog landscape implementation spec

Date: 2026-09-05
Status: domain catalog and compact dashboard contract

## 1. Scope and independence

Build a compact technical landscape and project index at `/analog/`. The reader should understand the field quickly, notice recent public activity, and reach relevant projects. Maintain an active, bounded population without a fixed project count; preserve the compact presentation when curating content.

Apply a rolling twelve-month freshness rule at each snapshot review. For 2026-09-05 the inclusive cutoff is 2025-09-05. A project with reviewed repository history requires verified substantive default-branch activity on or after that date; an existing no-repository project requires a sourced public update. Remove stale entries from the active catalog. Cosmetic changes or automated statistics alone do not establish meaningful activity. This is curation, not a judgment on historical technical value, and is not explained in the browsing UI. New entries require real public implementation in a verified canonical repository or upstream source distribution; a promised code release is insufficient. A canonical non-GitHub release may use the source-backed public-update mechanism without fabricated repository counts. Related agent/benchmark components share one entry unless they have distinct maintained implementations and lifecycles.

All public Analog UI/content is English only. Do not modify Golden Events, Companies, People, existing Article bodies, factual export schema/content, `/export.json`, or Timeline/Events state. Catalog code may share content-independent infrastructure only. Do not add a public JSON API.

Use Astro static output, plain CSS, and small vanilla TypeScript. No new framework, chart library, backend, runtime external fetch, score/ranking, compare mode, or project subpages.

Public navigation is `Analog`, browser title is `Analog · AMS Signals`, and metadata describes analog/RF/AMS tools, agents and benchmarks. The companion `Digital` page at `/digital/` covers RTL/digital projects. The `analog` collection and `src/content/analog/`, `src/lib/analog/`, `src/pages/analog/`, `tests/analog/` and `docs/analog/` directories share the public domain name. Domain chooses the page, matrix describes scope, roles describe kind, and AI-built optionally describes development provenance. The shared role-label helper is content-independent and never used for Golden classification.

## 2. Hierarchy and density

1. An accessible visually hidden `Analog` heading; no visible title or introduction.
2. The workflow matrix first, with a small `● core` / `○ supporting` legend directly below; no visible Landscape heading or Projects shortcut.
3. The project column-header row begins the index, in the same order as the matrix; no visible Projects heading.

Sort by latest public activity descending: reviewed repository-backed histories use `lastCommitAt`, otherwise use `lastPublicUpdateAt`. Use NFKC-normalized, lower-case, trimmed project name and then slug as deterministic ascending tie-breakers. Missing public dates sort last. Review dates and catalog addition dates never determine order.

Do not repeat project names in a separate activity overview. Desktop rows have three information areas: Project, Keywords, Activity. Use `minmax(0, 2.8fr) minmax(0, 1.15fr) 108px`: Activity has a fixed compact width, returning the remaining space to Project and Keywords without widening the page. Aim for 4–6 entries in a normal desktop viewport when viewing the index. On mobile stack the same three areas naturally. Use readable text without oversized cards or excessive whitespace. Remove project counts, recent additions, review/snapshot metadata, A–Z labels, activity explanations, window/dot legends, methodology and reproduction paragraphs from the browsing surface. Keep maintenance documentation in the repository.

## 3. Landscape

Use a semantic HTML table with project row headers and six column headers, in this order:

- `reasoning`: Reasoning — explicit model interpretation, analysis, diagnosis, or planning.
- `generate-edit`: Generate / Edit — creating or changing circuit/netlist/schematic artifacts; parameter-only edits may be supporting scope.
- `simulate-measure`: Simulate / Measure — simulation/extraction within the reviewed workflow, distinguishing agent tools from evaluator-only checks in research records.
- `optimize`: Optimize — sizing or iterative specification closure, not relative-ratio structural grading.
- `eda-integration`: EDA Integration — explicit EDA session/control/workflow interfaces, not merely using a simulator.
- `physical`: Physical — implemented layout/geometry operations; not a fabricated-silicon or signoff claim.

Each project has a strict `workflow` object whose optional keys are only these six fields. Values are only `core` or `supporting`. Missing means blank. Use equally sized CSS-drawn circles: filled for core reviewed scope and open/bordered for supporting scope. Blank cells have no circle. Preserve textual/ARIA meanings `Core scope`, `Supporting scope`, `No reviewed scope`, and matching tooltips; shape alone must work in monochrome and forced-color modes. Planned work receives no mark. Classifications require primary-source re-review, not name/summary inference. Document ambiguity and workflow/track boundaries in authored research and implementation notes.

Visible legend: `● core   ○ supporting`. No additional scope explanation is needed in the UI.

The underlying semantics remain reviewed scope, not maturity or independently verified capability; blank is unspecified, not inability. No totals, scores, column progression, or implication that more marks is better.

On narrow screens the table may scroll horizontally inside a keyboard-accessible, labelled region; keep its project-name column sticky where practical. Give each nonempty and blank cell an accessible meaning. Do not require color or hover to understand a state.

## 4. Compact entries and links

One list entry per project, with name and exactly one useful description directly below it. Render the existing `description`, not both description and summary. Do not display `Reviewed YYYY-MM-DD` or roles below the name. Roles remain `benchmark`, `agent`, `eda-tool`, `dataset-environment`, with public labels Benchmark, Agent, EDA Tool, Dataset & Environment. Require one or two distinct authored roles. Render each role as a tag in authored order at the start of Keywords. A narrow optional `aiBuilt: true` adds an `AI-built` tag after the roles; no false/string/three-way AI value is accepted. Its initial approved entry is Ngspice + OpenVAF Enhancements, not the normal AI-oriented research population. Multi-role projects still appear once. Role/provenance tags and technical keywords form one restrained visual group, with `data-tag-kind` distinguishing them. Keep their authored data fields separate; do not inject roles into the technical keyword array.

Keep `keywords`: three to five short, nonempty, distinct freeform phrases (maximum five). They are navigation aids, not a permanent taxonomy. Do not repeat role labels as keywords unless a term is also useful as a domain keyword. Prefer useful boundaries such as Structural only, Partial release, or Paper-only over long default notices. Do not add PDK/simulator/circuit/maturity classification systems.

Expose available Website, Paper, Code, Results links in that order beside the project title, derived from the existing single source array (one link per purpose). Use a wrapping flex title row: name followed immediately by left-aligned links with a 16px gap, no fixed-width link box, truncation or icons. On narrow screens links may wrap directly below the title, before the description. The project name remains the stable permalink, with no visible `#` or replacement icon; preserve its accessible permalink label. Do not render What it does, any disclosure or separate detail panel, or the full Primary sources bibliography.

Keep the required plain-text `description` (at most 600 characters) focused on the main use case and useful operations. Keep summaries, complete source arrays, Markdown research, targets, access, notices, dates and activity notes in the authored data; update them when research warrants, without turning them into extra dashboard prose. Retain legacy Markdown heading IDs, bibliography IDs and non-primary source IDs as empty aliases at each retained project's description. Primary-purpose source IDs stay on the visible primary links. Namespace all aliases by project slug. Removing a stale entry also removes its catalog anchors; no historical project page is created.

## 5. URL and JavaScript

`/analog/` and `/digital/` are the only supported catalog routes. Do not generate removed routes, redirects, aliases or compatibility scripts. New builds contain `dist/analog/index.html` and `dist/digital/index.html`.

Retained project hashes keep their IDs. Ngspice + OpenVAF Enhancements keeps its slug at `/analog/#ngspice-openvaf-enhancements` after the authored record moves from Digital; no duplicate row or redirect is added at its previous location. Keep `/analog/#project-slug` and published namespaced descendants such as `/analog/#circuitrubric--source-method`. Native fragment navigation reaches the always-visible project or primary link on direct load, reload, hash navigation, and browser back/forward. Old detail/research-source bookmarks lead to the project description. Unknown/malformed hashes remain inert. Use native links/history and `sitePath` for the deployment base. Preserve the complete hash.

Remove search, categories, reset, visible filtering counts/messages, query matching, q/type parsing/state, edit-session history, IME logic, and filter visibility/conflicts. Old query strings are inert; do not implement query migration or a new URL state machine. No localStorage. With no disclosure to open, the catalog needs no client JavaScript; remove the obsolete anchor-opening code.

Without JavaScript all projects, descriptions, matrix meanings, keywords, activity and primary links remain visible and understandable. All project and compatibility anchors are in static HTML; no interaction is needed to reveal their content.

## 6. Reviewed public activity

The compact column label is `Activity`; accessible labels identify reviewed public activity and its provenance. No introductory explanation is shown. No stars, forks/watchers counts, issues/PR counts, scores, or quality ranking.

Use exactly one verified primary public repository per project, explicitly recorded, and its current default branch. Never sum repositories or count non-landed PR refs. Without monthly repository history, derive the same twelve-cell band from the reviewed public event date. Only its calendar month is active when inside the window; do not store synthetic commit counts.

The legacy activity kind `no-public-repo` means no reviewed monthly repository history for this visualization: it also accommodates a real SourceForge source repository. Never present this internal enum as a claim that ngspice lacks public code.

Separate volatile activity into `src/data/analog-activity.json`. Include explicit snapshot date, ordered twelve calendar months ending in the snapshot month (current month is partial), project IDs, activity kind, repository, default branch, monthly integer counts, last default-branch commit date, and optional last public update date for no-repository projects. Record a pinned repository head and collection time for auditability. Optional `repositoryId` and `lastMeaningfulCommitSha` preserve stronger identity/provenance for transferred and newly reviewed records; all new GitHub baselines include both. A supplied meaningful SHA requires its exact commit URL in content sources and agreement with a nonempty month bucket. The refresh script checks a supplied numeric ID and confirms a supplied meaningful SHA/date in first-parent history, without advancing it automatically.

For repository-backed records also require `lastMeaningfulCommitAt`: the date of the most recent substantive commit verified during manual review, with the inspected commit recorded in `notes`. This conservative freshness evidence can precede `lastCommitAt` and must never follow it. Eligibility uses the meaningful date; ordering and the unchanged raw monthly strip use the actual latest committer date/history. The refresh helper preserves the reviewed meaningful date, never promotes a bot/cosmetic commit automatically, and refuses to replace the snapshot if eligibility has expired. The rolling cutoff is a calendar date one year before review (February 29 clamps to February 28), separate from the twelve displayed calendar months.

For every project stack the prominent latest date (`Sep 5`, retaining the year when different from the snapshot year), the twelve-cell band, then secondary `N/12 months` left-aligned with the band. Use 5px-wide, 12px-high upright rectangular CSS cells with 2px gaps (82px total), from oldest to newest: filled for a month with a reviewed signal, a quiet outline otherwise. Keep the band at its intrinsic 82px width, inside a 108px Activity column that also fits year-bearing dates. Keep this compact block left-aligned on mobile rather than stretching it. Every active cell has identical size, color and opacity regardless of count. Keep full month/year names and repository counts or point-signal details in each cell's title, accessible text and data attributes; these are informational, never visual strength. Only repository cells carry commit counts. Keep repository/default-branch identity or point-source provenance in the band's accessible label and date tooltip, not visible text or a second link. The visible date has no Paper, Release, Public update, GitHub, GitLab or Latest prefix. The column header is only Activity, without a month-range cue. Do not repeat month labels or explanatory prose in rows.

The additional `kind: repository` supports reviewed non-GitHub monthly history without changing existing `github` records. It requires a canonical HTTPS repository URL matching the authored Code source, an explicit host-scoped `repositoryId`, `defaultBranch`, `headSha`, twelve first-parent UTC `commits` buckets, `lastCommitAt`, `lastMeaningfulCommitAt`, `lastMeaningfulCommitSha` and `lastMeaningfulCommitSource`. That source ID must resolve to the reviewed commit within the canonical repository. It also pins its own `capturedAt`, allowing a later manual review without claiming that other projects were refreshed. The capture must be in the snapshot month, no later than the review date, and at or after the latest commit date. A changed month window requires recapturing the manual history; validation forbids silently relabeling old buckets. Eligibility and ordering retain the same meaningful/latest-date rules. GitHub identity and commit-source checks remain unchanged.

The **12-month reviewed public activity band** is a rendering view shared by both catalogs, not a flattening of stored provenance. Existing repository records retain genuine first-parent counts. Point records require `lastPublicUpdateType` (`paper`, `release` or `public-update`) alongside their existing reviewed date and source ID. Map the date to its calendar month only; no synthetic repository, SHA or commit buckets are added. An event outside the displayed months produces twelve inactive cells and `0/12 months`, without moving the event or changing freshness eligibility. Active-month counts never affect ordering.

For point cells, titles/accessibility text say `July 2026 · paper publication`, `August 2026 · release` or the corresponding public update. Other months say `no reviewed public activity signal`, never `0 commits`. An inactive month does not establish that development stopped. Every row retains date / twelve binary cells / `N/12 months`. Commit volume never changes visible strength; source types, source IDs and raw repository counts stay available in metadata and hover/accessibility detail. No public methodology prose is added.

Method: inspect the first-parent history of the captured default-branch head and bucket committer dates in UTC. Count a merge once at its integration commit; omit side-branch commits as separate counts. Git commit dates do not prove push/landing dates; fast-forwards, imported/rewritten history, bots and bulk commits can distort visibility. Retain methodology and repository-specific caveats in data and maintenance documentation, not dashboard prose. Do not infer inactivity beyond public history.

The existing manual helper refreshes GitHub history only and preserves manually reviewed non-GitHub records. Validation rejects a shifted month window until those histories are recaptured. It must validate a complete snapshot before replacing it, fail without damaging the checked-in data, and never run during check/build or in the browser. Normal builds require no repository-host access. A refresh must not silently add repositories or claim a paper-only project has code; that is a research decision.

## 7. Validation and acceptance

Keep original Golden validation/check stages. Validate stable unique slugs, roles, valid calendar dates and public source URLs, source identities, bounded updates, source anchors, no placeholders, and no Golden coupling. Add:

- keyword bounds, uniqueness and concise strings;
- a nonempty concise capability description;
- strict workflow keys and `core|supporting` values;
- exactly one activity record per catalog project, no unknown IDs;
- twelve valid consecutive ordered month buckets ending in the snapshot month;
- nonnegative integer counts, explicit valid repository identifiers/default branches;
- valid snapshot, capture, commit/public-update dates and pinned head;
- consistency between snapshot window/counts/dates and source repository.
- verified meaningful activity at or after the rolling cutoff, including sourced dates for no-repository entries; a recent raw commit cannot rescue stale meaningful activity.

Refactor catalog unit/browser tests for the simpler product. Derive inventory from authored data; keep named anchor/behavior fixtures where useful. Cover inventory/order, English UI/content, one visible description, three index columns, role/AI tags before unchanged technical keywords, CSS filled/open matrix circles and accessible meanings, exact binary activity cells for repository histories and point signals, primary-purpose links in the title row, permalinks, descendant load/reload/history, valid unique IDs, keyboard use, no-JS readability, state isolation, and 1440/390/320 layouts without page overflow. Assert that Type / Links, visible repository names, Latest, half-circle marks, redundant headings, shortcuts, disclosures and bibliography are absent. Verify uniform activity-cell strength independent of raw counts, oldest-to-newest cell order, date/band/summary placement, compact width, no header month cue, and wrapping links without overlap. Remove obsolete disclosure/search/filter tests rather than preserving removed product behavior.

Run `npm run check`, `npm run test:smoke`, `git diff --check`. Compare pre/post export bytes and existing factual/authored content. Visually inspect matrix, first/middle/last projects, activity/no-repository examples, project/source hashes and reload at desktop and narrow widths. Self-review density, duplicated text, discoverability, source access and non-ranking semantics; iterate if the index still feels like articles.

## 8. Delivery

The current refinement request authorizes working on latest `main`, scoped commits, and a normal fast-forward push after full checks and diff/visual self-review. Do not deploy in this pass, force-push, or change deployment configuration. The current `.github/workflows/pages.yml` remains manual-only. Stop for a substantial product conflict or an unresolved regression.
