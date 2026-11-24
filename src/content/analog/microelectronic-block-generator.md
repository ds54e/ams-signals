---
name: Microelectronic Block Generator
summary: "Generates GF180 layouts from supplied SPICE subcircuits and runs simulation, verification and extraction."
description: "Generates layouts from supplied flat SPICE subcircuits and runs circuit simulation, DRC/LVS and parasitic extraction. Its current Basic/Intermediate edition exposes conventional placement, routing and checked CLI/MCP operations for supported GF180MCU-D structures, with configured devices, tools and PDK revisions bounding results."
scope:
  simulation:
    ai: false
  layout:
    ai: false
access: "Public Python flow and optional agent skills; requires the documented GF180MCU-D PDK, layout/verification tools and simulator. A model host is needed only when using the optional agent interface."
addedAt: '2026-10-18'
reviewedAt: "2026-11-24"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/mthudaa/Microelectronic-Block-Generator
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/85b0f9b1dd01ecc90a912f095a4d4c52db99ad7f/README.md
- id: activity
  title: 'Merge chore/tidy-repo: remove regenerable simulation bulk, fix pre-sim netlist'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/commit/64487f527ce00d1bc487c4570e4adb79e445f4df
- id: implementation-1
  title: 'Current conventional layout pipeline'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/85b0f9b1dd01ecc90a912f095a4d4c52db99ad7f/src/mbg/pipeline.py
- id: implementation-2
  title: 'Current read-only routing inspection skill'
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/85b0f9b1dd01ecc90a912f095a4d4c52db99ad7f/.ai/skills/mbg-routing-debug/SKILL.md
- id: review-20261031-agent
  title: "Integrated agent tools, PDK profiles and netlist validation"
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/commit/44e7b8c04a9b6e884f45d4d7d40732c636c1dd32
- id: review-20261031-netlist
  title: "Retained profile-aware netlist checking and failure reporting"
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/44e7b8c04a9b6e884f45d4d7d40732c636c1dd32/src/mbg/agent/handlers/netlist.py
- id: review-20261124-features
  title: "Current open-loop Basic and Intermediate feature boundary"
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/85b0f9b1dd01ecc90a912f095a4d4c52db99ad7f/docs/features.md
- id: review-20261124-init
  title: "Workspace initialization copies the supplied circuit"
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/85b0f9b1dd01ecc90a912f095a4d4c52db99ad7f/src/mbg/agent/handlers/design.py
- id: review-20261124-simulation
  title: "Current simulation tool workflow"
  url: https://github.com/mthudaa/Microelectronic-Block-Generator/blob/85b0f9b1dd01ecc90a912f095a4d4c52db99ad7f/.ai/skills/mbg-spice-sim/SKILL.md
---

### Current implemented operations

The current Basic/Intermediate edition accepts a supplied flat SPICE circuit and implements conventional placement/routing, circuit analyses, Magic DRC, Netgen LVS and parasitic extraction. These operations support Simulation and Layout. The design.init handler creates a workspace and copies the supplied circuit; it does not implement circuit synthesis or sizing, so the prior Design stage is removed. [Current features](#source-review-20261124-features) · [Layout pipeline](#source-implementation-1) · [Workspace initialization](#source-review-20261124-init).

### Runtime AI reassessment

The earlier full-auto skill is absent from the reviewed current tree. Its replacements expose bounded tool execution, existing-report inspection and artifact/status reporting. The routing-debug skill distinguishes missing access, opens and shorts from an existing layout/connectivity report; it does not supply the previously claimed model-selected repair loop. The simulation skill likewise supplies checked execution steps. These current bundled workflows do not establish the former stage-specific model decisions, so Simulation and Layout use conventional classification. This does not claim that a user could never apply an external agent to the tools. [Routing inspection](#source-implementation-2) · [Simulation workflow](#source-review-20261124-simulation).

### Process and evidence boundaries

Supported GF180MCU-D structures and explicit device dimensions constrain the physical flow. Generated macro views and uncharacterized Liberty templates do not establish measured timing characterization or foundry signoff. Preserved voltage-reference/Chipathon artifacts are examples, not evidence that removed autonomous workflows remain implemented. [Feature contract](#source-review-20261124-features).

The historical October integration provides typed tool dispatch and profile-aware connectivity checks. Its canonical implementation remains the recorded activity basis; current-scope review does not re-sample activity counts or manufacture a new freshness checkpoint. Review was static and did not rerun external EDA tools or circuit validation. [Recorded integration](#source-review-20261031-agent) · [Netlist checking](#source-review-20261031-netlist).
