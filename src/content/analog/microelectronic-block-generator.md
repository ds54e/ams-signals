---
name: Microelectronic Block Generator
summary: Generates GF180 analog layouts from SPICE subcircuits and connects sizing, DRC/LVS, extraction and post-layout simulation.
description: Generates GF180 analog layouts from SPICE subcircuits and connects sizing, DRC/LVS, extraction and post-layout simulation. Optional agent skills choose circuit and physical corrections from measured feedback, while deterministic flow stages retain artifacts and failure states; supported cells and configured process tools bound the workflow.
scope:
  design:
    ai: true
  simulation:
    ai: true
  layout:
    ai: true
access: Public Python flow and agent skills; requires the documented GF180 PDK, layout/verification tools, simulator and model host for agent-driven operation.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/mthudaa/Microelectronic-Block-Generator
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/c09fd766935056c940ff364eef478e698c344859/README.md
- id: activity
  title: 'Merge chore/tidy-repo: remove regenerable simulation bulk, fix pre-sim netlist'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/commit/c09fd766935056c940ff364eef478e698c344859
- id: implementation-1
  title: 'Released implementation: src/mbg/flow.py'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/c09fd766935056c940ff364eef478e698c344859/src/mbg/flow.py
- id: implementation-2
  title: 'Released implementation: .agents/skills/mbg-full-auto/SKILL.md'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/c09fd766935056c940ff364eef478e698c344859/.agents/skills/mbg-full-auto/SKILL.md
---

### Implementation and boundaries

The flow implements stage execution and artifact handling. The released full-auto skill directs model decisions about parameters, simulation outcomes and PEX-driven physical corrections, supporting all three AI stages on that optional path. Deterministic placement/routing alone is not AI. Project signoff gates and author-produced examples do not establish foundry signoff or general tapeout readiness. The selected merge publishes reconstructed top-level pre-simulation connectivity and removes regenerable output bulk. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `c09fd766935056c940ff364eef478e698c344859` (2026-10-16 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
