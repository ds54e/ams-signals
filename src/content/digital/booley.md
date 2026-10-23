---
name: Booley
description: RTL workspace that runs a coding agent with EDA tools and checks recorded results against explicit acceptance goals. Typed simulation, lint, synthesis and Vivado FPGA implementation flows combine with waveform queries and sandboxed execution; the agent revises RTL and investigates failures while deterministic gates evaluate progress.
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: true
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for correcting executable QA test logic to require mutation-goal source-file scopes. The canonical project retains the corrected test."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: Public Python/Rust tooling; Docker, editor, EDA stack and agent CLI are needed for the integrated workflow, with licensed Vivado for FPGA implementation.
addedAt: '2026-10-18'
reviewedAt: '2026-10-23'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/boldaxolotl/booley
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/boldaxolotl/booley/blob/9f5bc119d195d46845fe6671734f1f371c60c6ed/README.md
- id: activity
  title: 'Merge pull request #1651 from boldaxolotl/codex/issue-1561-finish'
  url: https://github.com/boldaxolotl/booley/commit/c28daf4fc6f74fdee44592284aa2b410ff6752b8
- id: implementation-1
  title: 'Released implementation: crates/bwave/src/lib.rs'
  url: https://github.com/boldaxolotl/booley/blob/9f5bc119d195d46845fe6671734f1f371c60c6ed/crates/bwave/src/lib.rs
- id: implementation-2
  title: 'Released implementation: src/booley/config/goals.py'
  url: https://github.com/boldaxolotl/booley/blob/9f5bc119d195d46845fe6671734f1f371c60c6ed/src/booley/config/goals.py
- id: fpga-implementation
  title: Vivado FPGA implementation flow and report handling
  url: https://github.com/boldaxolotl/booley/blob/9f5bc119d195d46845fe6671734f1f371c60c6ed/src/booley/flows/fpga/flow.py
- id: "development-implementation-20261018"
  title: "AI-credited executable implementation"
  url: "https://github.com/boldaxolotl/booley/commit/c1a426e4e489ef860897a572b78a8ef2b67940ee"
- id: "development-retained-20261018"
  title: "Retained executable code at the reviewed canonical head"
  url: "https://github.com/boldaxolotl/booley/blob/9f5bc119d195d46845fe6671734f1f371c60c6ed/tests/qa/test_missions.py"
- id: website
  title: Official project website and documentation
  url: https://boldaxolotl.github.io/booley/
  purpose: official
---

### Implementation and boundaries

The sandboxed developer agent authors RTL and interprets test/waveform evidence, supporting AI Design and AI Verification. Fixed synthesis measurements are ordinary Synthesis; changing RTL to meet an area target does not itself establish AI synthesis-script optimization. The Edalize/Vivado FPGA implementation flow adds conventional Layout through actual implementation runs and report/bitstream handling. [Physical flow](#source-fpga-implementation). The selected runtime integration merge includes implementation and tests. Arbitrary input projects still need valid specifications, tool setup and acceptance goals. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `c28daf4fc6f74fdee44592284aa2b410ff6752b8` (2026-10-16 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

Claude is credited for correcting executable QA test logic to require mutation-goal source-file scopes. The canonical project retains the corrected test. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
