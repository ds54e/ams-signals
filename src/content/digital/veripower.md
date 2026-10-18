---
name: VeriPower
description: Coding-agent workflow for specification-driven RTL, UVM testbenches, simulation triage, lint/CDC, synthesis and timing/power analysis. Stage skills direct model decisions while a persistent engine tracks file versions, evidence and invalidated checks; the released flow depends on configured commercial EDA tools and libraries.
scope:
  design:
    ai: true
  synthesis:
    ai: true
  verification:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for implementing duplicate clock-name rejection and structured specification-tool failures. The canonical project retains the executable validation and regression tests."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: Public agent workflow, scripts and host adapters; Synopsys tools, appropriate libraries/licenses and a supported model host are separate requirements.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/chipweaver/veripower
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/chipweaver/veripower/blob/ca5b17e6ce97fab4401ce37390a83c86475683fe/README.md
- id: activity
  title: 'refactor: make VeriPower host-neutral and release 0.2.6'
  url: https://github.com/chipweaver/veripower/commit/6f764c1295e4eb0e1e05daaaea5637c424172054
- id: implementation-1
  title: 'Released implementation: skills/synthesis/SKILL.md'
  url: https://github.com/chipweaver/veripower/blob/ca5b17e6ce97fab4401ce37390a83c86475683fe/skills/synthesis/SKILL.md
- id: implementation-2
  title: 'Released implementation: skills/simulation-triage/SKILL.md'
  url: https://github.com/chipweaver/veripower/blob/ca5b17e6ce97fab4401ce37390a83c86475683fe/skills/simulation-triage/SKILL.md
- id: "development-implementation-20261018"
  title: "AI-credited executable implementation"
  url: "https://github.com/chipweaver/veripower/commit/bfe1ab9b26863c3788bcb357f3ed8d51bdc8a8a5"
- id: "development-retained-20261018"
  title: "Retained executable code at the reviewed canonical head"
  url: "https://github.com/chipweaver/veripower/blob/ca5b17e6ce97fab4401ce37390a83c86475683fe/skills/specification/scripts/spec/constraints.py"
---

### Implementation and boundaries

RTL and verification skills direct model authoring and diagnosis. The synthesis skill also directs adaptation of DC scripts, clock constraints and report interpretation, supporting AI Synthesis beyond RTL-only optimization. The stage scripts execute fixed tools and record verdicts. PrimeTime timing/power analysis does not establish routed Layout. The selected host-neutral integration changes runtime adapters and workflow delivery; benchmark outcomes are not reproduced here. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `6f764c1295e4eb0e1e05daaaea5637c424172054` (2026-10-12 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

Claude is credited for implementing duplicate clock-name rejection and structured specification-tool failures. The canonical project retains the executable validation and regression tests. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
