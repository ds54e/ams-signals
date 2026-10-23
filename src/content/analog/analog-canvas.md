---
name: Analog Canvas
summary: Agent-editable hierarchical schematic workbench with native simulation-source authoring.
description: "Agent-assisted hierarchical analog schematic editor with connectivity inspection, SPICE/Spectre and RNL interchange, and native simulation-source authoring. Logic gates and D flip-flops can retain their symbols while calling transistor-level project cells; hosted simulation and EDA adapters are separate from local headless drawing, which does not execute simulations."
scope:
  design:
    ai: true
  simulation:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited implementation added hosted standard-cell simulation binding and integrated coupled-inductor support across editing, persistence, rendering and netlist export. The current edit engine retains the coupling transaction implementation."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "Public AGPL-3.0 source. Local headless drawing requires Node.js/pnpm and configured agent access; hosted simulation and Aether/Virtuoso adapters need their separately documented services, EDA installations and PDKs."
addedAt: '2026-10-01'
reviewedAt: '2026-10-23'
sources:
- id: code
  title: Canonical Analog Canvas repository
  url: https://github.com/cascode-ai/analog-canvas
  purpose: code
- id: readme
  title: Reviewed capabilities and local/desktop limits
  url: https://github.com/cascode-ai/analog-canvas/blob/2e2cc4487ea15d8d233539254bb370d9cacaeb78/README.md
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
- id: "development-audit-implementation"
  title: "Reviewed AI-attributed implementation"
  url: "https://github.com/cascode-ai/analog-canvas/commit/166346e3e6e5b1f9f813d10b5d8b8d3ad63ecebe"
- id: "development-audit-extension"
  title: "Reviewed coordinated implementation extension"
  url: "https://github.com/cascode-ai/analog-canvas/commit/31fe413a3a2822ccc29ca51343c8e9405793ec17"
- id: "development-audit-retained"
  title: "Retained implementation at the reviewed repository head"
  url: "https://github.com/cascode-ai/analog-canvas/blob/5f3c0ead997d4327546dc30893a479428167fe1e/packages/edit-engine/src/transaction-inductor-coupling.ts"
- id: "cell-bound-flip-flops"
  title: "D flip-flop project-cell binding, netlist extraction and regression tests"
  url: "https://github.com/cascode-ai/analog-canvas/commit/8a6eb88d10804f34ceb50d0041d5eef3f229b792"
- id: "selection-connectivity"
  title: "Selected-wire and component connectivity highlighting with logical-net tests"
  url: "https://github.com/cascode-ai/analog-canvas/commit/b5d43fd934b25f89a5f60af64b2cfdba1721c026"
- id: "export-net-names"
  title: "Selection names share the netlist exporter's logical-net naming"
  url: "https://github.com/cascode-ai/analog-canvas/commit/331c929edc127081b75cb9ba736800d96bd2c8fd"
- id: rnl-interchange
  title: RNL import and export with port-permutation consistency checks
  url: https://github.com/cascode-ai/analog-canvas/commit/c72fbfca50d6217e00a80074ac24c611b9dd26be
- id: website
  title: Official project website and documentation
  url: https://analog-canvas.tokenzhang.com
  purpose: official
---

### Workflow and scope

The released circuit skill directs the model to read, generate, place and refine schematics through typed editing operations, establishing AI Design rather than merely an agent-compatible API. Its shared simulation workflow separately directs agents to author native analyses, saved signals and measurement logic, supported by implemented simulation-authoring tools; this establishes AI Simulation. Schematic symbol placement is not physical IC Layout. [Circuit skill](#source-skill) · [Simulation workflow](#source-simulation) · [Implementation](#source-simulation-tools)

### Access and evidence limits

The README describes hosted ngspice/SKY130 execution; the current shared simulation guidance also describes VACASK-native profiles and distinguishes them from historical ngspice runs. Select the service's actual advertised profile rather than assuming the backend from the README. Local headless drawing is an agent-authoring path distinct from the offline Windows preview. Neither local drawing nor the offline preview starts the hosted simulation service; the preview also excludes agent services. No EDA runs were reproduced for this review. [Reviewed capabilities](#source-readme) · [Engine boundary](#source-simulation)

The reviewed October 1 correctness changes cover device-parameter ERC, ngspice name collisions, DUT port order and structural netlist errors. Their implementation and tests establish substantive activity, rather than the later package-release commit. [Meaningful activity](#source-activity)

### Current implementation and operating boundaries

The local workspace runs the same editor Agent host against persistent Project files, can emit netlist and formal SVG artifacts and compare a drawing with a reference netlist. It does not run simulation. Modular eda/ tools add offline export and single/serial-batch import adapters for Aether and Virtuoso Bridge, with explicit target dependencies and native readback boundaries. [Headless implementation](#source-review-20261011-1) · [EDA adapters](#source-review-20261011-2) · [Local-mode limits](#source-review-20261011-3)

Local mode is documented as an internal, evolving tool and refuses simulation, Gallery and browser-measured export operations. Native database readback is not electrical equivalence. Aether/Virtuoso imports need separately installed EDA, licensed runtimes where applicable, PDKs and process maps.

### Schematic connectivity and cell implementations

The October 14 implementation lets D flip-flop variants call a transistor-level Cell of the same Project while keeping their library symbols, extending the existing logic-gate path. The planner matches signal pins by name, validates supply pins or global supplies, rejects incompatible interfaces and restores the ideal body when the binding is cleared. Netlist extraction emits the child subcircuit call in the Cell's pin order; regression fixtures cover binding, export, clearing and rename protection. Flip-flops accept project Cells rather than reviewed external standard-cell targets. This is schematic Design coverage. [Binding and extraction](#source-cell-bound-flip-flops)

Selecting a wire, pin or single component highlights its logical connections, including physically separate wires joined by a shared net name. Selection labels reuse the exporter's net naming, with a draft-analysis fallback when complete extraction is unavailable. These are structural inspection aids, not electrical simulation or proof of circuit equivalence. [Connectivity implementation and tests](#source-selection-connectivity) · [Net-name implementation and tests](#source-export-net-names)

The October 19 interchange change adds SPICE+RNL and Spectre+RNL exports and an RNL import path. Its tests check consistent port permutation across the annotated netlist and editor representation. The RNL runtime is loaded separately by the application; this does not imply every user must install it separately. These are schematic Design operations and do not turn local headless drawing into simulation. [RNL interchange](#source-rnl-interchange)

### Development provenance

The coupling change spans typed model data, transactions, clipboard behavior, rendering and electrical export, while the simulation change binds declared cell libraries through the hosted execution contract. The reviewed contribution is broader than the earlier isolated ERC repair; it supports a substantial-subsystem provenance label. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)
