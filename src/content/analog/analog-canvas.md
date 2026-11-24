---
name: Analog Canvas
summary: Agent-editable hierarchical schematic workbench with native simulation-source authoring.
description: "Agent-guided hierarchical schematic editor with native testbench authoring and SPICE/Spectre/RNL interchange. SKY130/ngspice experiments run locally in the browser; hosted SG13G2/VACASK execution is restricted to the project team, while exported testbenches can use separately configured simulators and PDKs."
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
access: "Public AGPL-3.0 source. Browser SKY130/ngspice execution needs no simulation server account; hosted execution is team-restricted. Local headless authoring and external EDA adapters have separate Node.js, service, simulator and PDK requirements."
addedAt: '2026-10-01'
reviewedAt: "2026-11-24"
sources:
- id: code
  title: Canonical Analog Canvas repository
  url: https://github.com/cascode-ai/analog-canvas
  purpose: code
- id: readme
  title: Reviewed capabilities and local/desktop limits
  url: https://github.com/cascode-ai/analog-canvas/blob/0fb4f24e86ffbea6b430127290edce4c004ec4bd/README.md
- id: skill
  title: Released schematic-authoring agent skill
  url: https://github.com/cascode-ai/analog-canvas/blob/0fb4f24e86ffbea6b430127290edce4c004ec4bd/docs/agent/workflow.md
- id: simulation
  title: Model-authored analyses and measurement workflow
  url: https://github.com/cascode-ai/analog-canvas/blob/0fb4f24e86ffbea6b430127290edce4c004ec4bd/docs/agent/shared/simulation.md
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
- id: review-20261031-rnl
  title: RNL project-cell symbols, PDK terminals, library bodies and top-cell preservation
  url: https://github.com/cascode-ai/analog-canvas/commit/b295fc3dbfde584466037cd67739bd60baa8c18c
- id: review-20261031-identities
  title: Distinguish document-local parts when ordering bodies and call symbols
  url: https://github.com/cascode-ai/analog-canvas/commit/1abf83781d704b9de5b504841bd4d810e5eb40c9
- id: review-20261031-tests
  title: Retained interchange regression tests
  url: https://github.com/cascode-ai/analog-canvas/blob/1abf83781d704b9de5b504841bd4d810e5eb40c9/apps/editor/src/features/netlist-export/rnl-round-trip.test.ts
- id: review-20261103-qualification
  title: "Integrated SG13G2 device, corner and cell qualification"
  url: https://github.com/cascode-ai/analog-canvas/commit/9556c9eaf31a40d56df98cd1e4cb8548f8c78470
- id: review-20261103-contract
  title: "Current simulation execution and isolation boundaries"
  url: https://github.com/cascode-ai/analog-canvas/blob/6d6b3d3e8c7718019ac06db6ccb40ca5fb3ccb5d/docs/specs/simulation-execution.md
- id: review-20261107-implementation
  title: "Polyline leg-slide and rotation implementation with regressions"
  url: https://github.com/cascode-ai/analog-canvas/commit/b02d4184ac2ab6ddb810bddb7068ce6b807b3256
- id: review-20261107-models
  title: "SG13G2 model defaults, parameter warnings and profile inference"
  url: https://github.com/cascode-ai/analog-canvas/commit/7ff62c6c22f827d2434c195ad49207fa7151c807
- id: review-20261118-rnl
  title: "Mode-routed RNL wires, labels and partial-drawing recovery"
  url: https://github.com/cascode-ai/analog-canvas/commit/feaa2279a62b43729871634eb32c4001cb181ed0
- id: review-20261118-tests
  title: "Executable agent-import routing, labels and recovery regressions"
  url: https://github.com/cascode-ai/analog-canvas/blob/feaa2279a62b43729871634eb32c4001cb181ed0/apps/editor/src/features/netlist-export/rnl-agent-import.test.ts
- id: review-20261124-execution
  title: "Current browser and hosted simulation access boundaries"
  url: https://github.com/cascode-ai/analog-canvas/blob/0fb4f24e86ffbea6b430127290edce4c004ec4bd/docs/user/analog-simulation.md
- id: review-20261124-browser
  title: "Implemented browser ngspice execution and waveform routing"
  url: https://github.com/cascode-ai/analog-canvas/blob/0fb4f24e86ffbea6b430127290edce4c004ec4bd/apps/editor/src/features/simulation/browser-ngspice/browser-ngspice-executor.ts
---

### Authoring and stage boundaries

The released agent workflow directs models to inspect, generate and refine circuit schematics through typed editing operations. Its simulation guidance separately directs models to author native analyses, saved signals and measurements. These substantive workflows support AI Design and AI Simulation; schematic symbol placement does not establish physical IC Layout. [Authoring workflow](#source-skill) · [Simulation workflow](#source-simulation) · [Authoring tools](#source-simulation-tools).

### Browser, hosted and headless execution

The current public browser path executes ngspice with SKY130 models locally, without a simulation server account. Its implemented worker/executor routes testbench requests and waveforms. Hosted environments, including SG13G2/VACASK, are restricted to project-team accounts. Older hosted-profile qualification evidence does not establish public access to those environments. [Current access contract](#source-review-20261124-execution) · [Browser executor](#source-review-20261124-browser).

Local headless drawing is a distinct authoring path: it edits persistent projects and exports netlist/drawing artifacts, and its reviewed interface does not perform simulation. Aether and Virtuoso adapters require their separately configured services, installations and PDK mappings. Browser-local execution should not be confused with that headless authoring mode. No simulator, hosted service or electrical-qualification campaign was independently run for this review. [Headless implementation](#source-review-20261011-1) · [EDA adapters](#source-review-20261011-2) · [Headless limits](#source-review-20261011-3).

### Implemented interchange and connectivity

Hierarchical cell binding checks ports and supplies before netlist extraction; it remains schematic Design coverage. RNL import/export preserves project-cell hierarchy, terminal mappings and circuit identities. The later routing changes preserve mode-generated wire paths and net labels, and reject an individually misconnected wire with diagnostics while retaining the remaining drawing. The reviewed regression cases establish structural-interchange behavior, not electrical equivalence. [Cell binding](#source-cell-bound-flip-flops) · [Hierarchical interchange](#source-review-20261031-rnl) · [Routed imports](#source-review-20261118-rnl) · [Regression cases](#source-review-20261118-tests).

### Development provenance and activity

Claude-credited executable changes added hosted cell-library binding and integrated coupled-inductor editing, transactions and netlist export. The current edit engine retains the coupling transaction, supporting AI-ASSISTED independently of runtime AI stages. [Credited implementation](#source-development-audit-implementation) · [Coupling implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained).

Source review on November 24, 2026 checked current capabilities and canonical history. The activity snapshot remains separate; current-head access corrections do not silently replace the recorded meaningful checkpoint. Historical SG13G2 qualification and RNL implementation sources remain evidence of their specific reviewed revisions. [Recorded implementation activity](#source-activity) · [Historical qualification](#source-review-20261103-qualification).
