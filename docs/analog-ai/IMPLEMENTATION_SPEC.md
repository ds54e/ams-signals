# Analog AI landscape implementation spec

Date: 2026-09-05
Status: dashboard refinement contract; supersedes earlier presentation and ordering requirements

## 1. Scope and independence

Build a compact technical landscape and project index at `/analog-ai/`. The reader should understand the field quickly, notice recent public activity, and open relevant capability descriptions. Preserve the thirteen reviewed projects and existing research data in the repository.

All public Analog AI UI/content is English only. Do not modify Golden Events, Companies, People, existing Article bodies, factual export schema/content, `/export.json`, or Timeline/Events state. Catalog code may share content-independent infrastructure only. Do not add a public JSON API.

Use Astro static output, plain CSS, and small vanilla TypeScript. No new framework, chart library, backend, runtime external fetch, score/ranking, compare mode, or project subpages.

## 2. Hierarchy and density

1. An accessible visually hidden `Analog AI` heading; no visible title or introduction.
2. One compact Landscape matrix and a small `● core` / `◐ supporting` legend.
3. One compact Projects index in the same order as the matrix.

Sort by latest public activity descending: verified GitHub repositories use `lastCommitAt`, otherwise use `lastPublicUpdateAt`. Use NFKC-normalized, lower-case, trimmed project name and then slug as deterministic ascending tie-breakers. Missing public dates sort last. Review dates and catalog addition dates never determine order.

Do not repeat project names in a separate activity overview. Desktop rows have four information areas: project/summary, keywords, activity, sources. Aim for 4–6 collapsed entries in a normal desktop viewport when viewing the index. Use readable text without oversized cards or excessive whitespace. Remove project counts, recent additions, review/snapshot metadata, A–Z labels, activity explanations, window/dot legends, methodology and reproduction paragraphs from the browsing surface. Keep maintenance documentation in the repository.

## 3. Landscape

Use a semantic HTML table with project row headers and six column headers, in this order:

- `reasoning`: Reasoning — explicit model interpretation, analysis, diagnosis, or planning.
- `generate-edit`: Generate / Edit — creating or changing circuit/netlist/schematic artifacts; parameter-only edits may be supporting scope.
- `simulate-measure`: Simulate / Measure — simulation/extraction within the reviewed workflow, distinguishing agent tools from evaluator-only checks in research records.
- `optimize`: Optimize — sizing or iterative specification closure, not relative-ratio structural grading.
- `eda-integration`: EDA Integration — explicit EDA session/control/workflow interfaces, not merely using a simulator.
- `physical`: Physical — implemented layout/geometry operations; not a fabricated-silicon or signoff claim.

Each project has a strict `workflow` object whose optional keys are only these six fields. Values are only `core` or `supporting`. Missing means blank. Use `●` for core reviewed scope; `◐` for supporting/constrained reviewed scope. Planned work receives no mark. Classifications require primary-source re-review, not name/summary inference. Document ambiguity and workflow/track boundaries in authored research and implementation notes.

Visible legend: `● core   ◐ supporting`. No additional scope explanation is needed in the UI.

The underlying semantics remain reviewed scope, not maturity or independently verified capability; blank is unspecified, not inability. No totals, scores, column progression, or implication that more marks is better.

On narrow screens the table may scroll horizontally inside a keyboard-accessible, labelled region; keep its project-name column sticky where practical. Give each nonempty and blank cell an accessible meaning. Do not require color or hover to understand a state.

## 4. Compact entries and What it does

One list entry per project, with name, passive role labels, and exactly one concise summary sentence. Do not display `Reviewed YYYY-MM-DD`. Roles remain `benchmark`, `agent`, `eda-tool`, `dataset-environment`, with labels Benchmark, Design Agent, EDA Tool, Dataset & Environment. Multi-role projects still appear once.

Add `keywords`: three to five short, nonempty, distinct freeform phrases (maximum five). They are navigation aids, not a permanent taxonomy. Prefer useful boundaries such as Structural only, Partial release, or Paper-only over long default notices. Do not add PDK/simulator/circuit/maturity classification systems.

Expose available Website, Paper, Code, Results links directly, derived from the existing single source array (one link per purpose). Provide a stable project permalink. Use lightweight native `<details><summary>What it does</summary>…</details>`; multiple disclosures can stay open. Closed by default in static HTML, including without JS. Do not persist disclosure state.

Add a required plain-text `description` (at most 600 characters) for one concise paragraph about the main use case and useful operations. Avoid repeating the collapsed summary. Keep the complete source list. Do not fill the disclosure with unsupported features, prerequisites, methodological/review boundaries or activity caveats. Existing Markdown research, targets, access, notices, dates and activity notes remain stored unchanged, but are not rendered. Keep all legacy Markdown heading IDs as aliases at the compact description and all source IDs at their original links; namespace by project slug.

## 5. URL and JavaScript

Keep `/analog-ai/#project-slug` and real namespaced descendants such as `/analog-ai/#circuitrubric--source-method`. Known project hashes open What it does and scroll the project; valid descendant hashes open their owning disclosure and scroll the actual target on direct load, reload, hash navigation, and browser back/forward. Legacy detail heading hashes now lead to the concise capability paragraph. Unknown/malformed hashes must not guess an owner or throw. Use native links/history and `sitePath` for the deployment base. Preserve the complete hash.

Remove search, categories, reset, visible filtering counts/messages, query matching, q/type parsing/state, edit-session history, IME logic, and filter visibility/conflicts. Old query strings are inert; do not implement query migration or a new URL state machine. No localStorage. Client code only enhances anchor access and scrolling; it never hides project entries.

Without JavaScript all projects, matrix meanings, keywords, activity and primary links remain present and understandable, with native disclosures operable. Capability descriptions are always in static HTML. Browser-native fragment handling may reveal closed details; do not depend on it for core readability.

## 6. Public repository activity

The compact column label is `Activity`; accessible labels identify public repository activity. No introductory explanation is shown. No stars, forks/watchers counts, issues/PR counts, scores, or quality ranking.

Use exactly one verified primary public repository per project, explicitly recorded, and its current default branch. Never sum repositories or count non-landed PR refs. Without a verified repository show the sourced public date when known, labelled Paper or Update, without an invented activity strip.

Separate volatile activity into `src/data/analog-ai-activity.json`. Include explicit snapshot date, ordered twelve calendar months ending in the snapshot month (current month is partial), project IDs, activity kind, repository, default branch, monthly integer counts, last default-branch commit date, and optional last public update date for no-repository projects. Record a pinned repository head and collection time for auditability.

Display twelve equal binary month marks: `●` at least one recorded commit, `·` zero. Expose raw counts/month names/default branch through accessible labels and title. Put a prominent `Latest Mon DD` date above the repository link and strip; retain `N/12 active months` below. The window remains in accessible strip labels, not visible explanatory prose. Do not map counts to visual weight or quality.

Method: inspect the first-parent history of the captured default-branch head and bucket committer dates in UTC. Count a merge once at its integration commit; omit side-branch commits as separate counts. Git commit dates do not prove push/landing dates; fast-forwards, imported/rewritten history, bots and bulk commits can distort visibility. Retain methodology and repository-specific caveats in data and maintenance documentation, not dashboard prose. Do not infer inactivity beyond public history.

A manually invoked, dependency-light refresh helper is optional. It must validate a complete snapshot before replacing it, fail without damaging the checked-in data, and never run during check/build or in the browser. Normal builds require no GitHub access. A refresh must not silently add repositories or claim a paper-only project has code; that is a research decision.

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

Refactor catalog unit/browser tests for the simpler product. Derive inventory from authored data; keep named anchor/behavior fixtures where useful. Cover inventory/order, English UI/content, roles, keywords, matrix state markers, activity and no-repository state, direct sources, independent Notes, permalinks, descendant load/reload/history, valid unique IDs, keyboard use, no-JS readability, state isolation, and 1440/390/320 layouts without page overflow. Remove obsolete search/filter tests rather than preserving removed product behavior.

Run `npm run check`, `npm run test:smoke`, `git diff --check`. Compare pre/post export bytes and existing factual/authored content. Visually inspect matrix, first/middle/last projects, activity/no-repository examples, expanded Notes, project/source hashes and reload at desktop and narrow widths. Self-review density, discoverability, source access and non-ranking semantics; iterate if the index still feels like articles.

## 8. Delivery

The current refinement request authorizes working on latest `main`, scoped commits, and a normal fast-forward push after full checks and diff/visual self-review. Do not force-push or change deployment configuration. Allow a configured main-triggered deployment to run normally; the current `.github/workflows/pages.yml` is manual-only, so this request does not require dispatching it. Stop for a substantial product conflict or an unresolved regression.
