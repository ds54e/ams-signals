# AI-development provenance policy

This is the shared classification policy for Analog and Digital. It describes how cataloged software was implemented, independently of AI used at runtime in a user's design workflow. Current judgments and primary evidence live in each project's frontmatter and Markdown notes; this file is not a second project inventory.

## Shared policy

- **AI-ASSISTED:** verified credited AI contribution to actual implemented or corrected executable project code retained in the current project. Isolated fixes and executable test, build, tool and example logic qualify when their actual code contribution is established; no minimum size, subsystem significance or product-code role is required.
- **No label:** qualifying evidence is absent, inaccessible or ambiguous. This does not assert exclusively human development.

AI-ASSISTED requires strong direct evidence of a verified code contribution. It does not measure contribution size, confidence, software quality, maturity or runtime autonomy. Describe the attributable implementation and its boundaries rather than estimating how much of a project AI generated.

## Evidence and interpretation

Verify the AI actor's identity, the corresponding actual code commit or PR, its merged canonical integration and current retention. Read the attributed diff and the retained implementation, not just its message or credit trailer. A Contributors entry for Claude, Codex or an AI bot is a research lead; a name-only coincidence does not establish AI identity, and a bot's presence does not attribute every commit to AI.

An isolated correctness repair or a thin control invoking an existing algorithm qualifies when AI is verifiably credited for its implemented code and that contribution remains integrated. Refactoring needs an actual code contribution rather than credit inferred from moved lines. A handwritten change that AI merely reviewed does not establish AI implementation.

Documentation-only changes, prose comments, static data or generated inputs without executable logic, mere proposals and unmerged PRs do not establish implementation. Executable tests, build scripts, tools and examples use the same actor, code, integration and retention requirements as other project code. Runtime AI features, MCP/agent interfaces, AI research topics, instruction files and casual assistant mentions do not establish development provenance. A vague disclosure mentioning both tooling and corpus still needs concrete implementation attribution. Runtime AI flags remain independent of development labels in either direction.

Assess forks, ports and enhancements as the named catalog project. Retained coauthor-credited original port lineage can support AI-ASSISTED for that contribution; it does not attribute an uncredited rewrite or port to AI. Do not transfer attribution to upstream dependencies or a different component. A qualifying component contribution supports the same AI-ASSISTED label as other verified executable contributions, without attributing unrelated project code to AI.

Use primary project/maintainer evidence and revision-pinned implementation links where practical. Search and disclosure gaps are limits of the investigation, not a census of private tool use. Preserve relevant uncertainty in project notes and reopen sources before changing a judgment.

## Data contract

`scope.aiDevelopment` is the optional literal `assisted`; omission means no public badge. Unknown fields, parallel booleans and additional classification fields are rejected. Provenance cannot satisfy the requirement for at least one functional Scope stage. Each stage's independent `{ ai: boolean }` follows its domain's AI criteria; software-development attribution alone cannot set it.

A label requires `developmentEvidence: { summary, sources, reviewedAt }`: one or two factual English sentences (maximum 420 characters), one to three distinct existing source IDs, and its own valid calendar review date no earlier than catalog addition. Missing paired evidence/classification, unresolved or duplicate IDs and unknown fields fail validation. The domain schemas enforce these constraints. A provenance-only change must not advance activity dates or buckets.

The AI-ASSISTED provenance badge follows the functional stages, with an outlined muted-purple appearance and accessible disclosure of the attributable implementation and primary sources. The [catalog contract](catalog/CONTRACT.md#presentation-and-disclosure) and [visual system](VISUAL_SYSTEM.md) own rendering. No public tiers, scores, percentages or human-only labels are introduced.
