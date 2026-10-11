---
name: Analog Canvas
summary: Agent-editable hierarchical schematic workbench with native simulation-source authoring.
description: "Creates hierarchical analog schematics through a connectivity-aware editor and agent workflow, with SPICE/Spectre interchange and native simulation authoring. A local headless workspace supports persistent batch drawing without a browser; separate adapters export circuits into Aether or Virtuoso, while simulation remains outside local drawing mode."
scope:
  design:
    ai: true
  simulation:
    ai: true
access: "Public AGPL-3.0 source. Local headless drawing requires Node.js/pnpm and configured agent access; hosted simulation and Aether/Virtuoso adapters need their separately documented services, EDA installations and PDKs."
addedAt: '2026-10-01'
reviewedAt: "2026-10-11"
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
- id: "review-20261011-1"
  title: "Headless implementation"
  url: "https://github.com/cascode-ai/analog-canvas/commit/ef2c587e598e1d8905e757b4ff2af713f4da7b5e"
- id: "review-20261011-2"
  title: "EDA adapters"
  url: "https://github.com/cascode-ai/analog-canvas/commit/00d128d1bab2515c02993653aa05b684dc74465b"
- id: "review-20261011-3"
  title: "Local-mode limits"
  url: "https://github.com/cascode-ai/analog-canvas/blob/37bccd4012764dce53b34927fa606c6f430296a2/docs/agent/local-workspace.md"
---

### Workflow and scope

The released circuit skill directs the model to read, generate, place and refine schematics through typed editing operations, establishing AI Design rather than merely an agent-compatible API. Its shared simulation workflow separately directs agents to author native analyses, saved signals and measurement logic, supported by implemented simulation-authoring tools; this establishes AI Simulation. Schematic symbol placement is not physical IC Layout. [Circuit skill](#source-skill) · [Simulation workflow](#source-simulation) · [Implementation](#source-simulation-tools)

### Access and evidence limits

The README describes hosted ngspice/SKY130 execution; the current shared simulation guidance also describes VACASK-native profiles and distinguishes them from historical ngspice runs. Select the service's actual advertised profile rather than assuming the backend from the README. Local headless drawing is an agent-authoring path distinct from the offline Windows preview. Neither local drawing nor the offline preview starts the hosted simulation service; the preview also excludes agent services. No EDA runs were reproduced for this review. [Reviewed capabilities](#source-readme) · [Engine boundary](#source-simulation)

The reviewed October 1 correctness changes cover device-parameter ERC, ngspice name collisions, DUT port order and structural netlist errors. Their implementation and tests establish substantive activity, rather than the later package-release commit. [Meaningful activity](#source-activity)

### Development provenance

Runtime agent integration does not establish software-development provenance. The reviewed correctness commit contains assistant attribution, but this bounded repair set alone does not establish the defining-core or substantial-subsystem contribution required for a development badge. No provenance badge is assigned from it. [Reviewed change](#source-activity)

### Current implementation and operating boundaries

The local workspace runs the same editor Agent host against persistent Project files, can emit netlist and formal SVG artifacts and compare a drawing with a reference netlist. It does not run simulation. Modular eda/ tools add offline export and single/serial-batch import adapters for Aether and Virtuoso Bridge, with explicit target dependencies and native readback boundaries. [Headless implementation](#source-review-20261011-1) · [EDA adapters](#source-review-20261011-2) · [Local-mode limits](#source-review-20261011-3)

Local mode is documented as an internal, evolving tool and refuses simulation, Gallery and browser-measured export operations. Native database readback is not electrical equivalence. Aether/Virtuoso imports need separately installed EDA, licensed runtimes where applicable, PDKs and process maps.
