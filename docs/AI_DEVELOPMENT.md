# AI-development provenance policy

This is the shared classification policy for Analog and Digital. It describes how cataloged software was implemented, independently of AI used at runtime in a user's design workflow. Current judgments and primary evidence live in each project's frontmatter and Markdown notes; this file is not a second project inventory.

## Shared policy

- **AI-ASSISTED:** strong direct evidence of substantial AI-assisted implementation of a meaningful feature, subsystem or implementation campaign within the current project, without characterizing its whole or defining-core construction.
- **AI-BUILT:** strong direct evidence that AI played a major implementation role across the project, or in a defining core that reasonably characterizes its development provenance.
- **No label:** qualifying evidence is absent, inaccessible, ambiguous or incidental. This does not assert exclusively human development.

Both displayed categories require strong direct evidence. The distinction is contribution scope and significance, not confidence, software quality, maturity, runtime autonomy or estimated generated-code percentage. AI-ASSISTED is not a fallback for weak AI-BUILT evidence. AI-BUILT permits human architecture, direction and correctness review; it does not imply every file was generated.

## Evidence and interpretation

A creation account can establish a defining-core role. A bounded implementation decision needs an identifiable contribution, attributable implementation material and evidence that it remains meaningful in the current project. Read the actual attributed diff, purpose and integration, not just its commit message or credit trailer. File size, credit counts and large test/data diffs are not thresholds.

Substantial backend, analysis, orchestration or runtime-storage subsystems differ from a thin control invoking an existing algorithm, an isolated correctness repair or ordinary build maintenance. Refactoring must establish a substantive implemented contribution rather than moved lines. A handwritten change that AI merely reviewed does not establish AI implementation.

Runtime models, MCP/agent interfaces, AI research topics, generated test inputs/examples/docs, ordinary completion, isolated fixes, instruction files, bot PRs and casual assistant mentions do not qualify alone. A vague disclosure mentioning both tooling and corpus is not corpus-only, but still needs concrete implementation attribution. Importance of the surrounding compiler or simulator does not enlarge a small contribution.

Assess forks, ports and enhancements as the named catalog project. Do not transfer attribution to upstream dependencies, to a different component or to an unattributed rewrite. A significant subsystem can justify AI-ASSISTED without attributing the entire HDL/compiler to AI.

Use primary project/maintainer evidence and revision-pinned implementation links where practical. Search and disclosure gaps are limits of the investigation, not a census of private tool use. Preserve relevant uncertainty in project notes and reopen sources before changing a judgment.

## Data contract

`scope.aiDevelopment` is one optional enum, `assisted` or `built`; omission means no public badge. Unknown fields, parallel booleans and additional classification fields are rejected. Provenance cannot satisfy the requirement for at least one functional Scope stage. Each stage's independent `{ ai: boolean }` follows its domain's AI criteria; software-development attribution alone cannot set it.

A label requires `developmentEvidence: { summary, sources, reviewedAt }`: one or two factual English sentences (maximum 420 characters), one to three distinct existing source IDs, and its own valid calendar review date no earlier than catalog addition. Missing paired evidence/classification, unresolved or duplicate IDs and unknown fields fail validation. The domain schemas enforce these constraints. A provenance-only change must not advance activity dates or buckets.

Exactly one final provenance badge follows the functional stages. Both labels have the same outlined muted-purple appearance and accessible disclosure behavior; text distinguishes them. The [catalog contract](catalog/CONTRACT.md#presentation-and-disclosure) and [visual system](VISUAL_SYSTEM.md) own rendering. No public tiers, scores, percentages or human-only labels are introduced.
