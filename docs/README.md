# Documentation map

Read by task. This is an index, not a mandatory pre-read or another rulebook.

| Question | Current owner |
| --- | --- |
| What is the product for; what may be inferred or edited? | [Product Context](../PROJECT_CONTEXT.md) |
| How should an agent work here? | [Root guidance](../AGENTS.md), then the relevant routed guide |
| How do Timeline and Events behave? | [Timeline contract](TIMELINE.md) |
| What do both catalogs share? | [Catalog contract](catalog/CONTRACT.md) |
| What is specific to a catalog? | [Analog](analog/README.md) / [Digital](digital/README.md) |
| What evidence qualifies for an AI-development label? | [AI-development policy](AI_DEVELOPMENT.md) |
| Who owns visual dimensions, colors and responsive rules? | [Visual system](VISUAL_SYSTEM.md); referenced CSS owns the implemented tokens |
| Which checks protect a change? | [Testing](TESTING.md); package/config/workflow files own executable commands |
| How is production published and verified? | [Release checklist](../RELEASING.md) |

Current project classifications, supporting sources and reasoning belong together in `src/content/analog/` or `src/content/digital/`: frontmatter plus the Markdown body, not frontmatter alone. Activity captures belong in the corresponding `src/data/*-activity.json`. Golden records remain in their own collections. Do not duplicate those inventories in a central report.

## Retention and authority

Keep enduring intent, hard-to-recover design rationale, current contracts, source-backed decisions and unresolved blockers discoverable. A date in a filename is not sufficient reason to delete a document. Before retirement, identify its incoming references and move any still-needed rule, operational caveat or unresolved decision to its owner.

Completed migrations, import totals, old test timings and one-off verification receipts belong in the PR and Git history. Historical evidence is context, not an instruction to repeat a migration or overwrite current data. Reopen primary sources before making a new claim.

Keep ongoing work scoped to its objective, necessary decision rationale and unresolved blockers. Maintain current requirements and unresolved decisions in the owning document; completed change summaries and verification results belong in PR/Git history. Do not create empty plan trees, cumulative implementation logs or an audit file for every edit.

When a document and implementation disagree, identify the mismatch and reconcile it within the task's authority. A cleanup must not silently change product semantics or weaken tests. Schemas own field validation, source records own evidence and implementation/configuration own executable behavior; prose explains intent and contracts rather than cloning every literal.

## Reusable workflows

Repository skills live in `.agents/skills/`. Keep descriptions short and task-specific; read the full skill only when it applies. The existing analytics skill handles live readership/search metrics. The catalog-refresh skill handles activity recapture, not general catalog editing. Ordinary research, typo fixes and documentation cleanup do not need another skill or a full-document reading itinerary.

Avoid placing guidance Markdown inside Astro-loaded content collections. Follow root task routing to the relevant scoped guidance, including associated content, page, test and documentation paths; do not assume every descendant `AGENTS.md` is loaded automatically.
