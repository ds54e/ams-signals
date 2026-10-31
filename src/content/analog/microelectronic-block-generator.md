---
name: Microelectronic Block Generator
summary: Generates GF180 analog layouts from SPICE subcircuits and connects sizing, DRC/LVS, extraction and post-layout simulation.
description: "Generates analog layouts from SPICE subcircuits and connects sizing, DRC/LVS, extraction and post-layout simulation. Agent-facing tools expose netlist checks, measurements and PDK profiles alongside optional model-driven corrections; GF180 remains the documented physical flow, and supported devices, configured tools and PDK revisions bound results."
scope:
  design:
    ai: true
  simulation:
    ai: true
  layout:
    ai: true
access: Public Python flow and agent skills; requires the documented GF180 PDK, layout/verification tools, simulator and model host for agent-driven operation.
addedAt: '2026-10-18'
reviewedAt: "2026-10-31"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/mthudaa/Microelectronic-Block-Generator
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/64487f527ce00d1bc487c4570e4adb79e445f4df/README.md
- id: activity
  title: 'Merge chore/tidy-repo: remove regenerable simulation bulk, fix pre-sim netlist'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/commit/64487f527ce00d1bc487c4570e4adb79e445f4df
- id: implementation-1
  title: 'Released implementation: src/mbg/flow.py'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/64487f527ce00d1bc487c4570e4adb79e445f4df/src/mbg/flow.py
- id: implementation-2
  title: 'Released implementation: .agents/skills/mbg-full-auto/SKILL.md'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/64487f527ce00d1bc487c4570e4adb79e445f4df/.agents/skills/mbg-full-auto/SKILL.md
- id: review-20261031-agent
  title: "Integrated agent tools, PDK profiles and netlist validation"
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/commit/44e7b8c04a9b6e884f45d4d7d40732c636c1dd32
- id: review-20261031-netlist
  title: "Retained profile-aware netlist checking and failure reporting"
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/44e7b8c04a9b6e884f45d4d7d40732c636c1dd32/src/mbg/agent/handlers/netlist.py
---

### Implementation and boundaries

The flow implements stage execution and artifact handling. The released full-auto skill directs model decisions about parameters, simulation outcomes and PEX-driven physical corrections, supporting all three AI stages on that optional path. Deterministic placement/routing alone is not AI. Project signoff gates and author-produced examples do not establish foundry signoff or general tapeout readiness. The selected merge publishes reconstructed top-level pre-simulation connectivity and removes regenerable output bulk. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The earlier checkpoint is now represented by `64487f527ce00d1bc487c4570e4adb79e445f4df` (2026-10-16 UTC) in the reconstructed canonical first-parent history. The current meaningful checkpoint is the October 28 integration described below. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

The canonical first-parent history was reconstructed: the former `c09fd766` checkpoint is now represented by `64487f52`. The October 28 integration adds typed agent-tool dispatch, profile-aware connectivity checks and measurements. GF180/SKY130 profile metadata describes device terminals and supported operations; it does not independently establish that every device or complete physical flow works across both PDKs. Netlist checks distinguish invalid designs from simulation-ready devices without layout support. Published voltage-reference results remain author-produced evidence. [Integration](#source-review-20261031-agent) · [Executable netlist checks](#source-review-20261031-netlist).
