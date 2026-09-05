# Analog AI catalog implementation spec

Date: 2026-09-05
Status: implementation contract for the standalone catalog

## 1. Scope

Implement a standalone catalog at `/analog-ai/` for analog/RF/AMS AI benchmarks, design agents, EDA tools, and datasets/experiment environments.

This is a technical catalog and database-like reference surface, not an editorial Article. All public-facing catalog content and UI must be English only, including the page title/description, controls, role labels, project summaries, targets, access/environment statements, notices, expanded details, source labels, and update notes. Do not create a bilingual version. Existing Articles remain Japanese.

This feature must remain independent of Timeline, Events, Company, Person, and Articles data. It may share only content-independent site infrastructure.

Do not modify the factual export. Do not create a new public JSON API for v1.

## 2. Page structure

Order the page as follows:

1. page title and one short description;
2. optional catalog-specific recent additions / major updates, maximum 3 entries;
3. search input, role filter, visible count, reset action;
4. one project list;
5. short publication/review note.

The project list is the main surface. Do not create a large comparison dashboard, capability scorecard, maturity ladder, star rating, or multi-column card grid.

Suggested page title: `Analog AI benchmarks and tools`.

## 3. Project roles

Use these four coarse roles:

- `benchmark` — Benchmark
- `agent` — Design Agent
- `eda-tool` — EDA Tool
- `dataset-environment` — Dataset & Environment

A project may have multiple roles.

The UI offers `All` or one role at a time. Do not build multi-axis filtering for circuit type, PDK, simulator, layout stage, etc. in v1. Those terms may remain searchable text.

## 4. Ordering

The full list uses a deterministic display-name order with slug as a tiebreaker.

Filtering never reorders surviving projects.

Do not order by GitHub activity, stars, review date, perceived maturity, or search relevance.

Show count as `Showing M of N projects`; a multi-role project counts once.

## 5. Project summary

The collapsed/default view must contain enough information to decide whether to investigate the project:

- project name;
- a subtle `Reviewed YYYY-MM-DD` indicator, visible without expanding the entry;
- role(s);
- about two concise English sentences explaining what it does and what makes it distinct;
- optional circuit/domain targets when verified;
- one short `Access & environment` statement;
- an important condition in the default view when it materially changes interpretation or usability;
- available primary links such as official site, paper, code, results;
- a detail disclosure and stable project link.

Do not force every project into the same metric table. An EDA bridge does not need benchmark pass rates; a structural benchmark does not need a PVT field.

Avoid promotional wording copied from project READMEs. Write a neutral technical summary.

## 6. Expanded details

Expanded content may include:

- work/input/output scope;
- what the model/agent is allowed to change;
- evaluation or execution method;
- version/track differences;
- what tasks, code, grader, result artifacts, or environments are public;
- requirements and important out-of-scope areas;
- primary sources and catalog review date.

Use independent `details`/`summary` behavior or an equivalent accessible implementation. Multiple projects must be expandable at once.

Do not persist every open/closed state across reloads. A project named by URL hash must open.

Namespace generated IDs by project slug so repeated headings such as `Evaluation` do not cause duplicate DOM IDs.

## 7. Search

Search these catalog-owned fields/content:

- name and aliases;
- role display labels;
- summary;
- target/domain text;
- access/environment text;
- important notice;
- rendered project detail text.

Do not index raw HTML, internal metadata keys, full external documents, or URL strings merely because they are URLs.

Normalization:

- Unicode NFKC;
- case-insensitive Latin text;
- trim surrounding whitespace;
- whitespace-separated tokens use AND matching.

The role filter and search query combine with AND.

Handle IME composition so Japanese conversion-in-progress does not trigger disruptive filtering.

Search matching is not a capability claim. Text such as `PVT not evaluated` may match `PVT`; do not infer badges or support status from a text hit.

For zero results, keep current controls visible, show a zero-result message, and provide one reset action. Do not silently broaden the query.

## 8. URL contract

Use this page's own query parameters only:

- `q` — text query;
- `type` — one of the four role IDs, omitted for all;
- hash — stable project slug or an existing namespaced descendant ID (`<project-slug>--...`).

Examples:

`/ams-signals/analog-ai/?q=ldo&type=benchmark`

`/ams-signals/analog-ai/#evo-ldo-bench`

`/ams-signals/analog-ai/#circuitrubric--source-method`

Use `sitePath` or the current equivalent for internal URLs. Never hardcode a root path that drops the GitHub Pages base.

Filtering updates URL state without creating one history entry per keystroke. Do not use localStorage for catalog filter state.

Unknown `type` falls back to all. Unknown hash does not redirect to a guessed project.

### Hash vs filter conflict

When a known hash names a project or one of its existing descendants:

1. restore q/type from the URL;
2. resolve the hash;
3. if the project is visible under the restored filters, keep filters;
4. otherwise clear q/type, synchronize the URL, and optionally show a short notice that filtering was cleared to show the linked project;
5. open the owning project's details and bring the actual anchor into view, respecting its scroll margin and preserving the full hash.

Do not insert the hashed project as a special exception while keeping contradictory counts/filters.

After arriving by hash, a new user search/filter action should remove the stale hash and honor the new controls.

A project's copy/share link should be the stable hash URL without current q/type.

## 9. Static and accessible behavior

All project summaries, expanded detail content, and source links must be present in the built HTML. Runtime fetching from GitHub, papers, or model APIs is out of scope.

Without JavaScript, every catalog project and its source links must remain readable. Do not leave unusable interactive controls visible without graceful handling.

Keyboard-only use must support search, role selection, detail disclosure, and links. Filtering must not steal focus from the search field.

Avoid page-level horizontal overflow at desktop and narrow widths. Long project names and links must wrap safely.

## 10. Suggested content model

Use a dedicated content collection; do not extend Articles or reuse Golden Event records.

Suggested location:

`src/content/analog-ai/*.md`

One file represents one continuing project. A paper, website, repository, and leaderboard for the same project normally remain one entry. Tracks/versions remain within the same project unless they become genuinely distinct projects.

Keep stable slug/file name across display-name changes; old names belong in aliases.

Minimum metadata concept:

- `name`
- `aliases` optional
- `roles` one or more valid role IDs
- `summary`
- `targets` optional
- `access`
- `notice` optional
- `addedAt` catalog registration date
- `reviewedAt` date the description was last checked against primary material
- `sources`

Do not add large capability boolean matrices, maturity/confidence scores, or active/inactive guesses.

### Sources

Keep one source array and derive quick links from it rather than maintaining a duplicate links list.

Each source should have a local ID, title, and URL. Optionally assign one quick-link purpose such as `official`, `paper`, `code`, or `results`.

Within one project, a quick-link purpose should not have multiple competing entries.

Use stable/version-specific sources for version-dependent claims when possible. Distinguish the convenient current repository link from the evidence supporting a specific historical result.

## 11. Catalog update notes

Use catalog-specific update data, not Golden Events and not repository commit timestamps.

A small data file such as `src/data/analog-ai-updates.json` is acceptable. An update record refers only to catalog project slug, date, `added|updated`, and a short explanation.

Keep only a small current set for display. Do not create a permanent exhaustive changelog.

Do not add an update-note entry for a spelling fix, link check, or routine re-review with no change. `reviewedAt` is sufficient for a no-change review.

`addedAt` means added to this catalog, not project publication date. `reviewedAt` means primary material was reviewed, not repository last-commit time. Do not substitute build time for either.

## 12. Existing-site boundary

Add `Analog AI` to the primary navigation as a normal independent link. It must not receive Timeline/Events filter-state attributes.

The Analog AI page must not call `getCollection('events')`, `companies`, `people`, or `articles`.

Do not change the semantics, ordering, inclusion rules, or filters of existing Timeline/Events views for this work.

Do not change existing Article bodies.

Do not change `/export.json`; verify it remains identical before/after this feature when built from the same factual data.

## 13. Research/content requirements

Initial catalog prose must be regenerated from primary sources. Prior chat prose is a research lead, not evidence.

Check, when relevant:

- task contract;
- tool permissions;
- simulator/PDK/EDA requirements;
- grader/oracle;
- whether sizing means relative device ratios or measured optimization;
- whether PVT/MC/layout/DRC/LVS is implemented, evaluated, merely planned, or not in scope;
- what artifacts are actually public;
- whether reported numeric results are author-reported, preregistered targets, synthetic demos, or independently reproduced.

Do not run paid model experiments, commercial EDA, or large simulations merely to write catalog summaries unless separately requested.

## 14. Validation

Keep all existing checks. Do not delete or weaken existing tests to make this feature pass.

Add validation appropriate to the new collection, including:

- unique stable slugs;
- valid/non-duplicate roles;
- valid calendar dates for catalog dates;
- valid http/https source URLs;
- unique source IDs per project;
- no duplicate quick-link purpose within a project;
- update records reference real catalog projects;
- no placeholder URLs/TODO demo data in the public catalog.

Add focused tests for search normalization, multi-token AND behavior, multi-role filtering, stable ordering, URL parsing, hash conflict behavior, independent details, no-JS readability, and narrow-width rendering.

Run the repository's existing `npm run check` and browser smoke suite in addition to new tests.

## 15. Acceptance scenarios

The implementation is not complete until these observable cases are covered:

1. Full page shows every project exactly once in deterministic name order.
2. A benchmark+agent project appears in either role filter but counts once in the full list.
3. `LDO ngspice` behaves as AND search and combines with role as AND.
4. aliases, case differences, and NFKC-equivalent text resolve as expected.
5. IME composition does not cause disruptive intermediate filtering.
6. Zero-result state preserves controls and can be reset.
7. q/type survive reload and browser navigation appropriately.
8. A hash-visible project keeps compatible filters.
9. A hash-hidden project causes filters to clear rather than becoming a count exception.
10. New search/filter input after hash arrival removes the old hash.
11. Share link contains project hash but not transient q/type.
12. Unknown type/hash or special q text does not crash or render as HTML.
13. Multiple project details can stay open.
14. Repeated detail headings do not create duplicate DOM IDs.
15. No-JS output still exposes all project content and primary links.
16. Desktop and roughly 390px width have no broken horizontal layout.
17. A no-change re-review may change `reviewedAt` without changing order/update notes.
18. Empty catalog-update data hides the section cleanly; invalid project references fail validation.
19. Adding/removing a catalog project requires no Event/Company/Person changes.
20. Existing factual data, Articles, and `/export.json` remain unchanged except for the intentional global-nav addition.
21. Timeline/Events state and Analog AI state never leak into each other.
22. All public-facing Analog AI UI and content are English only; existing Japanese Articles remain unchanged.
23. Direct loading or reloading a namespaced detail/source anchor opens its owning project and reaches the actual target; compatible/conflicting filters follow the same rules as project hashes. Unknown descendant IDs do not resolve to a guessed owner.

## 16. Delivery

Work on a reviewable branch/diff. Report:

- changed files and behavior;
- number and names of projects included after primary-source review;
- candidate projects withheld because primary material was insufficient or ambiguous;
- checks/tests run and actual results;
- confirmation that factual export and existing authored content were not changed;
- desktop/narrow-width visual checks;
- remaining limitations.

Do not merge to main or deploy unless explicitly instructed.
