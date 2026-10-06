# AMS Signals — Agent guidance

## Working boundaries

- Follow the user's requested scope. Continue authorized implementation, local checks and fixes through completion; do not ask again for an action already authorized in the session.
- Keep the Golden factual corpus and independent Analog/Digital catalogs separate. Catalog work must preserve Golden semantics, viewer state and `/export.json`.
- Use the existing Astro/static-data/CSS/vanilla JS architecture. Add a backend, framework or runtime AI integration only for a concrete unmet requirement.
- Preserve unrelated work and source-grounded content. Merge, publication and external account/domain settings require the corresponding user authorization.

## Read by task

| Task | Guide |
| --- | --- |
| Product intent and research boundaries | [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) |
| Golden Events, Companies, People or factual export | [src/data/AGENTS.md](src/data/AGENTS.md) |
| Catalog content, activity, implementation, tests or docs | [Analog](src/lib/analog/AGENTS.md) / [Digital](src/lib/digital/AGENTS.md); shared changes use both |
| Timeline/Events behavior | [docs/TIMELINE.md](docs/TIMELINE.md) |
| Styling and responsive layout | [docs/VISUAL_SYSTEM.md](docs/VISUAL_SYSTEM.md) |
| Verification and test ownership | [docs/TESTING.md](docs/TESTING.md) |
| Publication | [RELEASING.md](RELEASING.md) |

Read the sections needed for the task, including the relevant scoped guide explicitly. Codex discovers project instructions along the root-to-current-directory ancestor path; this does not load every descendant guide. Scoped guides also cover associated sibling content/page/test/documentation paths. Repository skills under `.agents/skills/` apply only to their stated workflows.

## Verification and Git

- Code/content changes use `npm run check`; viewer/navigation/release changes also use `npm run test:smoke`. Documentation-only checks and test placement are defined in [Testing](docs/TESTING.md). Local checks can be run and change-caused failures fixed without repeated approval; deployed-site tests follow the release checklist.
- Never weaken a gate to obtain a pass or report an unperformed check as successful. After relevant checks pass, repeat or broaden them only for new changes or unresolved failures.
- Use `ds54e <17592097+ds54e@users.noreply.github.com>` as author and committer for authorized commits. No assistant/bot authors, co-authors, private email or `Co-authored-by` trailers. Keep identity configuration repository-local.
- Work on temporary branches. During authorized cleanup, delete only branches fully contained in main, after checking for unrelated working-tree changes. Force pushes, main history rewrites and tags/Releases require explicit authorization.

## Documentation

Explain the current product, implementation and operating contracts in their owning documents. Keep task receipts, migration narratives and duplicate inventories out of current guidance. [docs/README.md](docs/README.md) maps ownership; executable configuration and schemas own exact commands and validation. Finish with actual changes, verification results and any remaining limitation.
