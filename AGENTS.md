# AMS Signals — Agent guidance

## Boundaries

- Keep the source-grounded Golden corpus, authored Articles and independent Analog/Digital catalogs separate. Catalog changes must not change Golden semantics, viewer state, Articles or `/export.json`, or weaken Golden validation.
- Preserve author-supplied Article prose unless the author explicitly requests its transformation.
- Prefer the existing Astro/static-data/CSS/vanilla JS architecture. A new framework, backend, CMS, vector store, runtime AI summary or source archive needs a concrete unmet requirement.
- Within the requested scope, proceed through edits, local verification and fixes without approval at each step. Preserve unrelated work. Finish with the actual changes, checks and remaining blockers, not just a plan. Merge, deployment, external account settings and publication remain separate owner-authorized actions.

## Read by task

Read the relevant sections, not every linked document. These routes also apply when editing associated content, pages, tests or docs outside a guide's directory.

| Task | Entry point |
| --- | --- |
| Product/research intent, factual/editorial boundaries | [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) |
| Golden Events, Companies, People or factual export | [src/data/AGENTS.md](src/data/AGENTS.md) |
| Analog / Digital catalog work | [Analog guide](src/lib/analog/AGENTS.md) / [Digital guide](src/lib/digital/AGENTS.md); shared changes use both |
| Timeline/Events interaction and presentation contracts | [docs/TIMELINE.md](docs/TIMELINE.md) |
| Styling, typography, responsive layout | [docs/VISUAL_SYSTEM.md](docs/VISUAL_SYSTEM.md) |
| Test ownership or CI changes | [docs/TESTING.md](docs/TESTING.md) |
| Publication/deployment | [RELEASING.md](RELEASING.md) |

## Verification

- `npm run check` is the deterministic gate for code or published-content changes; [package.json](package.json) owns its composition. Viewer, navigation and release changes also use `npm run test:smoke`.
- Documentation/guidance-only changes need whitespace, Markdown, link/anchor and instruction-consistency checks. Do not run full builds/browsers unless their inputs are affected. Existing PR CI remains unchanged.
- Local checks may be run and rerun to resolve change-caused failures. External-target browser runs are not local checks; use the release checklist. Never weaken a gate to obtain a pass or report an unperformed check as successful.

## Git and documentation hygiene

- For authorized commits use `ds54e <17592097+ds54e@users.noreply.github.com>` unless directed otherwise; do not use a real name or private email. Check both author and committer, and keep any Git identity configuration repository-local. No assistant/bot authors, co-authors or `Co-authored-by` trailers. GitHub's server-side committer on an owner-initiated web merge is acceptable.
- Use temporary work branches; merged heads are deleted automatically. Tags/Releases and any force-push or `main` history rewrite require explicit owner authorization.
- Update the owning current document rather than appending another migration report. Preserve needed rationale and unresolved work before retiring a document; completed receipts belong in PR/Git history. [docs/README.md](docs/README.md) maps ownership and retention.
- Keep public documents, commits and PRs focused on technical changes, evidence and necessary verification. Do not include personal request history, copied conversations, credentials or unnecessary task narration.
