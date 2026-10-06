# Documentation map

Read the guide and sections needed for the task. Each document owns one current contract.

| Question | Owner |
| --- | --- |
| Product purpose and research boundaries | [Product Context](../PROJECT_CONTEXT.md) |
| Agent working rules and task routing | [Root guidance](../AGENTS.md) |
| Timeline, Events, Company/Person behavior | [Timeline contract](TIMELINE.md) |
| Shared catalog curation, data, activity and interaction | [Catalog contract](catalog/CONTRACT.md) |
| Domain-specific stages and schema differences | [Analog](analog/README.md) / [Digital](digital/README.md) |
| Evidence for AI-development labels | [AI-development policy](AI_DEVELOPMENT.md) |
| Typography, palette, layout and responsive behavior | [Visual system](VISUAL_SYSTEM.md) |
| Check selection and test ownership | [Testing](TESTING.md) |
| Exact-SHA production deployment and verification | [Release checklist](../RELEASING.md) |

## Sources of truth

Golden JSON records own factual evidence. Catalog frontmatter and Markdown bodies own current project metadata, classification reasoning and sources; activity JSON owns captures. Schemas own validation, CSS owns implemented tokens, and package/config/workflow files own executable behavior.

Current guides explain intent, contracts, necessary technical rationale and unresolved constraints. Reconcile implementation/documentation disagreements within the authorized scope. Do not duplicate project inventories, migration narratives, research logs or completed-task receipts in documentation. Evidence of dated public activity belongs in source records, where its date has product meaning.

## Reusable workflows

Repository skills live in `.agents/skills/`. The analytics skill handles fresh traffic/search metrics; the catalog-refresh skill handles activity recapture and month rollover. Their descriptions are task-specific, and their full instructions are read only when needed. Ordinary code/content edits do not require either workflow.

Keep guidance outside Astro-loaded content collections. Root task routing points to scoped guides for associated content, implementation, tests and docs because Codex's automatic `AGENTS.md` discovery follows the current working directory's ancestor path.
