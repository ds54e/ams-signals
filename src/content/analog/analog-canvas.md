---
name: Analog Canvas
summary: Agent-editable hierarchical schematic workbench with native simulation-source authoring.
description: Creates hierarchical analog schematics through a connectivity-aware editor and agent workflow, with structural SPICE/Spectre interchange. Agents can edit circuits and author simulation analyses and measurements; hosted execution and result inspection are separate from schematic drawing, while the offline Windows preview excludes agent and simulation services.
scope:
  design:
    ai: true
  simulation:
    ai: true
access: Public AGPL-3.0 source. Local development requires Node.js and pnpm; hosted simulation depends on the available service profile. The Windows preview is an offline editor, without agent or simulation services.
addedAt: '2026-10-01'
reviewedAt: "2026-10-05"
sources:
- id: code
  title: Canonical Analog Canvas repository
  url: https://github.com/cascode-ai/analog-canvas
  purpose: code
- id: readme
  title: Reviewed capabilities and local/desktop limits
  url: https://github.com/cascode-ai/analog-canvas/blob/a2473f0e2d51433a9f8747c26d5a7f4a4ac483e9/README.md
- id: skill
  title: Released schematic-authoring agent skill
  url: https://github.com/cascode-ai/analog-canvas/blob/a2473f0e2d51433a9f8747c26d5a7f4a4ac483e9/docs/agent/repo-skill/SKILL.md
- id: simulation
  title: Model-authored analyses and measurement workflow
  url: https://github.com/cascode-ai/analog-canvas/blob/a2473f0e2d51433a9f8747c26d5a7f4a4ac483e9/docs/agent/shared/simulation.md
- id: simulation-tools
  title: Implemented simulation authoring tools
  url: https://github.com/cascode-ai/analog-canvas/blob/a2473f0e2d51433a9f8747c26d5a7f4a4ac483e9/apps/mcp-server/src/simulation-authoring-tools.ts
- id: activity
  title: Reviewed substantive implementation commit
  url: https://github.com/cascode-ai/analog-canvas/commit/82c8f6a11452d5673b35a5686762d7476e798065
- id: "activity-current"
  title: "Agent planning tests use real Edit Engine snapshots"
  url: "https://github.com/cascode-ai/analog-canvas/commit/f85cd32dbcc9b307f98cdf4e27099992d120a01f"
---

### Workflow and scope

The released circuit skill directs the model to read, generate, place and refine schematics through typed editing operations, establishing AI Design rather than merely an agent-compatible API. Its shared simulation workflow separately directs agents to author native analyses, saved signals and measurement logic, supported by implemented simulation-authoring tools; this establishes AI Simulation. Schematic symbol placement is not physical IC Layout. [Circuit skill](#source-skill) · [Simulation workflow](#source-simulation) · [Implementation](#source-simulation-tools)

### Access and evidence limits

The README describes hosted ngspice/SKY130 execution; the current shared simulation guidance also describes VACASK-native profiles and distinguishes them from historical ngspice runs. Select the service's actual advertised profile rather than assuming the backend from the README. Local editor development and the offline Windows preview do not start the hosted simulation service; the preview also excludes agent services. No EDA runs were reproduced for this review. [Reviewed capabilities](#source-readme) · [Engine boundary](#source-simulation)

The reviewed October 1 correctness changes cover device-parameter ERC, ngspice name collisions, DUT port order and structural netlist errors. Their implementation and tests establish substantive activity, rather than the later package-release commit. [Meaningful activity](#source-activity)

### Development provenance

Runtime agent integration does not establish software-development provenance. The reviewed correctness commit contains assistant attribution, but this bounded repair set alone does not establish the defining-core or substantial-subsystem contribution required for a development badge. No provenance badge is assigned from it. [Reviewed change](#source-activity)

### Current activity review

Reviewed 2026-10-05. Agent-planning tests now obtain their snapshot from the real Edit Engine rather than a handwritten substitute. This is an executable integration-test improvement; it does not expand the existing runtime stage or development-provenance classification. [Reviewed change](#source-activity-current).
