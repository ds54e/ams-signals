# Analog AI landscape implementation spec

Date: 2026-09-05
Status: presentation redesign contract; supersedes the original search/filter catalog UX

## 1. Scope and independence

Build a compact technical landscape and project index at `/analog-ai/`. The reader should understand the field quickly, recognize patterns, and open only relevant Notes. Preserve the thirteen reviewed projects and researched detail prose.

All public Analog AI UI/content is English only. Do not modify Golden Events, Companies, People, existing Article bodies, factual export schema/content, `/export.json`, or Timeline/Events state. Catalog code may share content-independent infrastructure only. Do not add a public JSON API.

Use Astro static output, plain CSS, and small vanilla TypeScript. No new framework, chart library, backend, runtime external fetch, score/ranking, compare mode, or project subpages.

## 2. Hierarchy and density

1. `Analog AI` heading and `Benchmarks, agents, and tools for analog/RF/AMS design.`
2. Project total and `Reviewed from primary public sources`; inline recent additions (at most three) and `Public repository activity snapshot: YYYY-MM-DD`.
3. One compact Landscape matrix.
4. One Project index in deterministic A–Z name order with slug tiebreaker.
5. Restrained methodology/publication notes where needed.

Do not repeat project names in a separate activity overview. Desktop rows have four information areas: project/description, keywords, public repository activity, sources. Aim for 4–6 collapsed entries in a normal desktop viewport when viewing the index. Avoid oversized cards, excessive whitespace, long default notices, and decorative controls. Recent additions are a line, not a large box.

## 3. Landscape

Use a semantic HTML table with project row headers and six column headers, in this order:

- `reasoning`: Reasoning — explicit model interpretation, analysis, diagnosis, or planning.
- `generate-edit`: Generate / Edit — creating or changing circuit/netlist/schematic artifacts; parameter-only edits may be supporting scope.
- `simulate-measure`: Simulate / Measure — simulation/extraction within the reviewed workflow, distinguishing agent tools from evaluator-only checks in per-project Notes.
- `optimize`: Optimize — sizing or iterative specification closure, not relative-ratio structural grading.
- `eda-integration`: EDA Integration — explicit EDA session/control/workflow interfaces, not merely using a simulator.
- `physical`: Physical — implemented layout/geometry operations; not a fabricated-silicon or signoff claim.

Each project has a strict `workflow` object whose optional keys are only these six fields. Values are only `core` or `supporting`. Missing means blank. Use `●` for core reviewed scope; `◐` for supporting/constrained reviewed scope. Planned work receives no mark. Classifications require primary-source re-review, not name/summary inference. Document ambiguity and workflow/track boundaries in Notes and implementation notes.

Legend: `● core scope   ◐ supporting / constrained`

Note: `Scope shown here reflects reviewed public material, not maturity or independently verified capability.` Explicitly explain that blanks do not mean inability. No totals, scores, column progression, or implication that more marks is better.

On narrow screens the table may scroll horizontally inside a keyboard-accessible, labelled region; keep its project-name column sticky where practical. Give each nonempty and blank cell an accessible meaning. Do not require color or hover to understand a state.

## 4. Compact entries and Notes

One list entry per project, with name, passive role labels, subtle `Reviewed YYYY-MM-DD`, and exactly one concise summary sentence. Roles remain `benchmark`, `agent`, `eda-tool`, `dataset-environment`, with labels Benchmark, Design Agent, EDA Tool, Dataset & Environment. Multi-role projects still appear once.

Add `keywords`: three to five short, nonempty, distinct freeform phrases (maximum five). They are navigation aids, not a permanent taxonomy. Prefer useful boundaries such as Structural only, Partial release, or Paper-only over long default notices. Do not add PDK/simulator/circuit/maturity classification systems.

Expose available Website, Paper, Code, Results links directly, derived from the existing single source array (one link per purpose). Provide a stable project permalink. Use lightweight native `<details><summary>Notes</summary>…</details>`; multiple Notes can stay open. Closed by default in static HTML, including without JS. Do not persist disclosure state.

Retain existing researched Markdown prose, targets, access requirements, full notices, source list, and addedAt behind Notes. Also explain non-obvious workflow classifications there. Namespace all rendered headings and source IDs by project slug; preserve existing IDs and source links.

## 5. URL and JavaScript

Keep `/analog-ai/#project-slug` and real namespaced descendants such as `/analog-ai/#circuitrubric--source-method`. Known project hashes open Notes and scroll the project; valid descendant hashes open their owning Notes and scroll the actual target on direct load, reload, hash navigation, and browser back/forward. Unknown/malformed hashes must not guess an owner or throw. Use native links/history and `sitePath` for the deployment base. Preserve the complete hash.

Remove search, categories, reset, visible filtering counts/messages, query matching, q/type parsing/state, edit-session history, IME logic, and filter visibility/conflicts. Old query strings are inert; do not implement query migration or a new URL state machine. No localStorage. Client code only enhances anchor access and scrolling; it never hides project entries.

Without JavaScript all projects, matrix meanings, keywords, activity and primary links remain present and understandable, with native Notes operable. Notes content is always in static HTML. Browser-native fragment handling may reveal closed details; do not depend on it for core readability.

## 6. Public repository activity

Label it `Public repository activity`. Explain: `Public repository activity is a visibility signal, not a measure of quality, maturity, or total development effort.` No stars, forks/watchers counts, issues/PR counts, scores, or ranking.

Use exactly one verified primary public repository per project, explicitly recorded, and its current default branch. Never sum repositories or count non-landed PR refs. Without a verified repository show `No verified public repository` and a sourced public date when known (for example, `Paper Jul 2026`).

Separate volatile activity into `src/data/analog-ai-activity.json`. Include explicit snapshot date, ordered twelve calendar months ending in the snapshot month (current month is partial), project IDs, activity kind, repository, default branch, monthly integer counts, last default-branch commit date, and optional last public update date for no-repository projects. Record a pinned repository head and collection time for auditability.

Display twelve equal binary month marks: `●` at least one recorded commit, `·` zero. Expose raw counts/month names through accessible labels and title, plus `N/12 active months · latest Mon DD`. Explain the window and partial current month. Do not map counts to visual weight or quality.

Method: inspect the first-parent history of the captured default-branch head and bucket committer dates in UTC. Count a merge once at its integration commit; omit side-branch commits as separate counts. This conservative integration-history signal avoids attributing unmerged or pre-merge side-branch commits to default-branch activity. Git commit dates do not prove push/landing dates; fast-forwards, imported/rewritten history, bots and bulk commits can distort visibility. State material repository-specific caveats. Do not infer inactivity beyond public history.

A manually invoked, dependency-light refresh helper is optional. It must validate a complete snapshot before replacing it, fail without damaging the checked-in data, and never run during check/build or in the browser. Normal builds require no GitHub access. A refresh must not silently add repositories or claim a paper-only project has code; that is a research decision.

## 7. Validation and acceptance

Keep original Golden validation/check stages. Validate stable unique slugs, roles, valid calendar dates and public source URLs, source identities, bounded updates, source anchors, no placeholders, and no Golden coupling. Add:

- keyword bounds, uniqueness and concise strings;
- strict workflow keys and `core|supporting` values;
- exactly one activity record per catalog project, no unknown IDs;
- twelve valid consecutive ordered month buckets ending in the snapshot month;
- nonnegative integer counts, explicit valid repository identifiers/default branches;
- valid snapshot, capture, commit/public-update dates and pinned head;
- consistency between snapshot window/counts/dates and source repository.

Refactor catalog unit/browser tests for the simpler product. Derive inventory from authored data; keep named anchor/behavior fixtures where useful. Cover inventory/order, English UI/content, roles, keywords, matrix state markers, activity and no-repository state, direct sources, independent Notes, permalinks, descendant load/reload/history, valid unique IDs, keyboard use, no-JS readability, state isolation, and 1440/390/320 layouts without page overflow. Remove obsolete search/filter tests rather than preserving removed product behavior.

Run `npm run check`, `npm run test:smoke`, `git diff --check`. Compare pre/post export bytes and existing factual/authored content. Visually inspect matrix, first/middle/last projects, activity/no-repository examples, expanded Notes, project/source hashes and reload at desktop and narrow widths. Self-review density, discoverability, source access and non-ranking semantics; iterate if the index still feels like articles.

## 8. Delivery

Use a branch from latest main, scoped commits, push and PR, full diff self-review, and passing CI. This redesign is explicitly authorized for squash merge and the existing manual `.github/workflows/pages.yml` deployment after checks. Wait for both Pages jobs, then verify live catalog, Timeline, Events, Articles and unchanged export. Stop for a substantial product contradiction, unmeasurable activity, factual-boundary requirement, unresolved regression, or significant deployment/configuration issue. Do not hot-fix main.
