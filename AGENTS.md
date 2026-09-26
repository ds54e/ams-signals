# AMS Signals — Agent guidance

## Repository boundaries

- The durable asset is the source-grounded Golden RNM/AMS timeline; the website is its viewer. Keep factual records, editorial Articles and the standalone Analog/Digital catalogs separate. Catalog work must not change Golden semantics, viewer state, Articles or `/export.json`, or weaken Golden validation.
- Preserve author-supplied Article prose unless the author explicitly requests its transformation.
- Keep the implementation small: Astro static output, JSON factual data, Markdown editorial content, plain CSS and small vanilla JS/TS. Introducing React, a CMS, a database/backend, vector storage, runtime AI summaries or source-archive infrastructure requires a concrete need the existing design cannot meet.

## Task routing

Read only the guidance relevant to the task; paths below are relative to the repository root.

- For research or product-design decisions, consult the relevant sections of [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md). Temporary research briefs supplement, never override, durable product policy.
- For Golden research or changes to Events, Companies, People, factual views or export, use [src/data/AGENTS.md](src/data/AGENTS.md).
- For Analog research, content, activity, implementation or contract changes, use [src/lib/analog/AGENTS.md](src/lib/analog/AGENTS.md); for Digital, use [src/lib/digital/AGENTS.md](src/lib/digital/AGENTS.md). Shared catalog work uses both routes.
- For Article research or editorial work, use [the factual/editorial policy](PROJECT_CONTEXT.md#separate-factual-and-editorial-layers).
- For visual/layout changes, use [docs/VISUAL_SYSTEM.md](docs/VISUAL_SYSTEM.md). For publication or deployment, use [RELEASING.md](RELEASING.md) within the owner's authorization.

## Verification

- `npm run check` is the canonical deterministic check for code or published-content changes; [package.json](package.json) owns its component commands.
- Viewer, navigation and release changes also use `npm run test:smoke` with Playwright Chromium installed. For test ownership or release-suite changes, consult [the CI contract review](docs/CI_CONTRACT_REVIEW_2026-09-21.md#where-a-new-browser-assertion-belongs).
- Guidance-only changes need whitespace, Markdown/reference and instruction-consistency checks; full build/browser runs are unnecessary unless the change affects their inputs.

## Git attribution and hygiene

- When authorized to commit, configure `ds54e <17592097+ds54e@users.noreply.github.com>` as the repository commit identity unless the owner directs otherwise.
- Never use AI assistants, coding agents, bots or automation as commit authors/co-authors or in `Co-authored-by` trailers. GitHub's server-side committer identity on an owner-initiated web merge is acceptable.
- Use temporary work branches; merged heads are deleted automatically. Do not retain completed branches as archives.
- Create Git tags or GitHub Releases only on explicit owner request. Do not force-push or rewrite `main` history without explicit owner authorization for that specific rewrite.
