---
name: "ALIGN"
aliases: []
summary: "Generates placed and routed analog layouts from circuit netlists and constraints."
description: "Generates hierarchical analog layouts from SPICE netlists and circuit constraints. The flow annotates circuit hierarchy, builds parameterized primitive cells and assembles placed and routed GDSII geometry using technology-specific layout rules."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited development added release-benchmark metrics aggregation and regression detection, connected to a Magic/ngspice execution matrix. The aggregation implementation remains in the current repository."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "Public Python/C++ flow, examples and PDK abstractions; each target technology requires compatible primitive and rule definitions."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://align-analoglayout.github.io/ALIGN-public/"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/blob/e392ae4789eb49193a4865244d8cc31dbe1744b7/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/commit/e392ae4789eb49193a4865244d8cc31dbe1744b7"
  - id: "implementation"
    title: "Layout flow entry point at the reviewed revision"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/blob/e392ae4789eb49193a4865244d8cc31dbe1744b7/align/main.py"
  - id: "gds-conversion"
    title: "Handle GDS paths and polygons with holes, September 10, 2026"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/commit/50fe01a207d8a0f8f76943d167734d77722738c5"
  - id: "activity-refresh"
    title: "Correct cascode input polarity in the OTA testbench wrapper, September 15, 2026"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/commit/a1025151d27963e926712c3d9e8866cdf21675cc"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/commit/0e11cb810a166d6b10e6b56764884f8400626592"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/commit/0669d8b8b3e49faed870e30922856c5a6b622df4"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/ALIGN-analoglayout/ALIGN-public/blob/8d3cc2e9aa5511315203eb5cbfd00d2c88fdbd18/benchmarks/scripts/aggregate.py"
---

### Scope

Recognizes circuit hierarchy, generates primitive layout cells and assembles constrained placement/routing. Layout is the output. Hierarchy annotation prepares that layout flow and does not constitute a separate circuit-design deliverable. [Layout pipeline](#source-readme) and [entry point](#source-implementation).

### Release boundary

The July 5 merge replaces legacy OTA benches with parameterized DUT wrappers and AC, CMRR, ICMR, OCMR, operating-point, PSRR and slew testbenches. This is substantive benchmark infrastructure maintenance, not evidence of newly reproduced electrical results. [Reviewed change](#source-activity).

The September 10 merge extends GDS-to-LEF/JSON conversion to paths and polygons with holes. The September 15 testbench-wrapper correction swaps the cascode DUT inputs to match the universal interface polarity. These extend layout import and benchmark correctness; the testbench maintenance does not establish a separate user-facing Simulation stage. [Geometry conversion](#source-gds-conversion); [wrapper correction](#source-activity-refresh).

### Scope classification

Circuit annotation reorganizes the supplied netlist into a hierarchy that enables the central primitive-generation, placement and routing flow; it does not select a new electrical topology. [Reviewed source](#source-readme).

Circuit annotation supports deterministic layout synthesis. Neither automatic constraint handling nor the project name establishes learned inference in either stage. [AI/stage evidence](#source-readme).

### Development provenance

The contribution implements artifact collection, threshold-based comparison and release-regression reporting connected to physical extraction and simulation runs. Attribution covers this benchmark-analysis pipeline within the established ALIGN project; it does not attribute ALIGN's original placement/routing engine to AI. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)
