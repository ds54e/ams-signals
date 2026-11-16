---
name: wavepeek
description: Stateless CLI for RTL waveform queries, with a bundled agent skill guiding sampling, completeness checks and focused debugging. VCD/FST are supported directly; FSDB/SHM require local vendor readers, and extracted AMBA events do not establish protocol compliance.
scope:
  verification:
    ai: true
access: Public source and binaries; optional proprietary-format support requires Linux x86_64 and local Verdi/Xcelium reader libraries.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/kleverhq/wavepeek
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/kleverhq/wavepeek/blob/a4451a222e2971404cce574d89fcfb991b160521/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/kleverhq/wavepeek/commit/c5db17bb852bae9dd2a44563512268a100253e90
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/kleverhq/wavepeek/commit/2bc7a5fe711b7e43ec093ee8a511481867ddc623
- id: retained
  title: Current implementation at review
  url: https://github.com/kleverhq/wavepeek/blob/a4451a222e2971404cce574d89fcfb991b160521/skills/wavepeek/SKILL.md
- id: skill-bundle
  title: Packaged executable skill distribution
  url: https://github.com/kleverhq/wavepeek/blob/a4451a222e2971404cce574d89fcfb991b160521/src/skill.rs
---

### Implementation and selection

The distributed skill specifies substantive debug choices and evidence interpretation connected to implemented commands, supporting AI Verification; the CLI itself is deterministic. Point-query correctness and cross-format regression tests establish activity. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

The source embeds the skill bundle into the binary and exposes its materialization, rather than relying on an external prompt example. [Distribution implementation](#source-skill-bundle).
