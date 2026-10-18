# Documentation map

Read the guide and sections needed for the task. Each document owns one current contract.

| Question | Owner |
| --- | --- |
| Contributing and local setup | [Contributor entry point](#contributing-and-local-setup) |
| Product purpose and research boundaries | [Product Context](../PROJECT_CONTEXT.md) |
| Agent working rules and task routing | [Root guidance](../AGENTS.md) |
| Golden editing and record validation | [Golden guidance](../src/data/AGENTS.md) / [content schema](../src/content.config.ts) |
| Timeline, Events, Company/Person behavior | [Timeline contract](TIMELINE.md) |
| Shared catalog curation, data, activity and interaction | [Catalog contract](catalog/CONTRACT.md) |
| Domain-specific stages and schema differences | [Analog](analog/README.md) / [Digital](digital/README.md) |
| Evidence for AI-development labels | [AI-development policy](AI_DEVELOPMENT.md) |
| Typography, palette, layout and responsive behavior | [Visual system](VISUAL_SYSTEM.md) |
| Check selection and test ownership | [Testing](TESTING.md) |
| Exact-SHA production deployment and verification | [Release checklist](../RELEASING.md) |

## Contributing and local setup

Start with [Product Context](../PROJECT_CONTEXT.md) and the relevant scoped guide linked from [root guidance](../AGENTS.md). The table above routes content, implementation and documentation contributions to their owning contracts.

Use Node.js 24 and the locked dependencies:

```bash
npm ci
npm run dev
```

[package.json](../package.json) owns executable commands; [Testing](TESTING.md) owns check selection, including `npm run check` and the browser suite. Install Chromium with `npx playwright install chromium` before running that suite. Activity refreshes are manual networked operations, separate from builds and tests; see the reusable workflows below. Publication and its authorization remain in the [release checklist](../RELEASING.md).

### Repository layout

- `src/data/events/`, `src/data/companies/`, `src/data/people/`: Golden factual records.
- `src/content/analog/`, `src/content/digital/`: catalog metadata and source-backed implementation/classification notes.
- `src/data/*-activity.json`: reviewed catalog activity captures.
- `src/lib/`: factual transforms, catalog contracts and shared presentation helpers.
- `src/components/`, `src/pages/`, `src/scripts/`, `src/styles/`: Astro views and browser behavior.
- `tools/`: validation, build-output audits and manual refresh commands.
- `tests/`: deterministic contracts and Chromium interaction/visual tests.

### Build target and analytics configuration

[The deployment resolver](../src/lib/site-deployment.mjs) owns the build origin/base used by Astro and audits. Unset variables fall back to `https://ds54e.github.io/ams-signals/`; invalid explicit values fail. [Testing](TESTING.md#local-production-shaped-and-live-checks) explains consistent build/audit settings, and the [release checklist](../RELEASING.md#publication) gives the production target and exact-SHA gates.

[Analytics configuration](../src/lib/analytics.mjs) owns production-only Cloudflare beacon emission and the public served site token, which is not an API credential. The [analytics boundary](../RELEASING.md#analytics-boundary) distinguishes markup checks, intercepted browser smoke and provider-side ingestion, and retains owner control of account settings.

## Sources of truth

Golden JSON records own factual evidence. Catalog frontmatter and Markdown bodies own current project metadata, classification reasoning and sources; activity JSON owns captures. Schemas own validation, CSS owns implemented tokens, and package/config/workflow files own executable behavior.

Current guides explain intent, contracts, necessary technical rationale and unresolved constraints. Reconcile implementation/documentation disagreements within the authorized scope. Do not duplicate project inventories, migration narratives, research logs or completed-task receipts in documentation. Evidence of dated public activity belongs in source records, where its date has product meaning.

## Reusable workflows

Repository skills live in `.agents/skills/`. The analytics skill handles fresh traffic/search metrics; the catalog-refresh skill handles activity recapture and month rollover. Their descriptions are task-specific, and their full instructions are read only when needed. Ordinary code/content edits do not require either workflow.

Keep guidance outside Astro-loaded content collections. Root task routing points to scoped guides for associated content, implementation, tests and docs because Codex's automatic `AGENTS.md` discovery follows the current working directory's ancestor path.
