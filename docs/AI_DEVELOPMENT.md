# AI-development provenance policy

This is the shared classification policy for Analog and Digital. It describes how cataloged software was implemented, independently of AI used at runtime in a user's design workflow. Current judgments and primary evidence live in each project's frontmatter and Markdown notes; this file is not a second project inventory.

## Shared policy

- **AI-ASSISTED:** verified credited AI contribution to actual implemented or corrected executable project code retained in the current project. Isolated fixes and executable test, build, tool and example logic qualify when their actual code contribution is established; no minimum size, subsystem significance or product-code role is required.
- **AI-BUILT:** strong primary evidence that AI built most of the project. One core component, coauthor credit or commit does not establish this project-wide claim.
- **No label:** qualifying evidence is absent, inaccessible or ambiguous. This does not assert exclusively human development.

Both displayed categories require strong direct evidence. AI-ASSISTED requires a verified code contribution even when AI-BUILT is unsupported. AI-BUILT permits human architecture, direction and correctness review; it does not imply every file was generated. Neither label measures confidence, software quality, maturity or runtime autonomy. Do not infer project-wide authorship or a generated-code percentage from commit counts.

## Evidence and interpretation

Verify the AI actor's identity, the corresponding actual code commit or PR, its merged canonical integration and current retention. Read the attributed diff and the retained implementation, not just its message or credit trailer. A Contributors entry for Claude, Codex or an AI bot is a research lead; a name-only coincidence does not establish AI identity, and a bot's presence does not attribute every commit to AI.

An isolated correctness repair or a thin control invoking an existing algorithm qualifies when AI is verifiably credited for its implemented code and that contribution remains integrated. Refactoring needs an actual code contribution rather than credit inferred from moved lines. A handwritten change that AI merely reviewed does not establish AI implementation.

Documentation-only changes, prose comments, static data or generated inputs without executable logic, mere proposals and unmerged PRs do not establish implementation. Executable tests, build scripts, tools and examples use the same actor, code, integration and retention requirements as other project code. Runtime AI features, MCP/agent interfaces, AI research topics, instruction files and casual assistant mentions do not establish development provenance. A vague disclosure mentioning both tooling and corpus still needs concrete implementation attribution. Runtime AI flags remain independent of development labels in either direction.

Assess forks, ports and enhancements as the named catalog project. Retained coauthor-credited original port lineage can support AI-ASSISTED for that contribution; it does not attribute an uncredited rewrite or port to AI. Do not transfer attribution to upstream dependencies or a different component. A qualifying component contribution supports AI-ASSISTED, while AI-BUILT still requires primary evidence that AI built most of the named project.

Use primary project/maintainer evidence and revision-pinned implementation links where practical. Search and disclosure gaps are limits of the investigation, not a census of private tool use. Preserve relevant uncertainty in project notes and reopen sources before changing a judgment.

## Data contract

`scope.aiDevelopment` is one optional enum, `assisted` or `built`; omission means no public badge. Unknown fields, parallel booleans and additional classification fields are rejected. Provenance cannot satisfy the requirement for at least one functional Scope stage. Each stage's independent `{ ai: boolean }` follows its domain's AI criteria; software-development attribution alone cannot set it.

A label requires `developmentEvidence: { summary, sources, reviewedAt }`: one or two factual English sentences (maximum 420 characters), one to three distinct existing source IDs, and its own valid calendar review date no earlier than catalog addition. Missing paired evidence/classification, unresolved or duplicate IDs and unknown fields fail validation. The domain schemas enforce these constraints. A provenance-only change must not advance activity dates or buckets.

Exactly one final provenance badge follows the functional stages. Both labels have the same outlined muted-purple appearance and accessible disclosure behavior; text distinguishes them. The [catalog contract](catalog/CONTRACT.md#presentation-and-disclosure) and [visual system](VISUAL_SYSTEM.md) own rendering. No public tiers, scores, percentages or human-only labels are introduced.
