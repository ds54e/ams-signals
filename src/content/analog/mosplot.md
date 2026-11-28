---
name: "Mosplot"
aliases: ["gmid","gm/ID"]
summary: "Device lookup-table characterization and residual-equation multicorner analog sizing."
description: "Python gm/ID framework that builds transistor lookup tables with ngspice, HSPICE or Spectre, plots interpolated device characteristics, and sizes parameterized analog circuits against multicorner specifications. Its residual-equation optimizer freezes geometry across corners, reports operating points and produces netlists for separate electrical verification."
scope:
  design: { ai: false }
  simulation: { ai: false }
access: "Apache-2.0 Python implementation; device characterization needs a supported simulator and appropriate transistor models."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical gmid repository, currently named Mosplot"
    url: "https://github.com/medwatt/gmid"
    purpose: code
  - id: readme
    title: "Reviewed characterization and multicorner optimization workflow"
    url: "https://github.com/medwatt/gmid/blob/6c4c5e164295c60a8b996f9dff8a79c64456ddaf/README.md"
  - id: activity
    title: "September 21 optimizer implementation and tests"
    url: "https://github.com/medwatt/gmid/commit/94c5f097399fe2fdd152f7082e8cdb7e6c6b7a9a"
  - id: corner-history
    title: "May 28 corner support"
    url: "https://github.com/medwatt/gmid/commit/1bd669075262264beb29957efa6471454987a669"
  - id: characterize
    title: "Simulator-backed lookup table generation"
    url: "https://github.com/medwatt/gmid/blob/6c4c5e164295c60a8b996f9dff8a79c64456ddaf/src/mosplot/lookup_table_generator/lookup_table_generator.py"
  - id: optimizer
    title: "Retained multicorner optimization implementation"
    url: "https://github.com/medwatt/gmid/blob/6c4c5e164295c60a8b996f9dff8a79c64456ddaf/src/mosplot/optimizer/optimizer.py"
  - id: end-to-end
    title: "Synthetic-table corner and netlist tests"
    url: "https://github.com/medwatt/gmid/blob/6c4c5e164295c60a8b996f9dff8a79c64456ddaf/tests/test_end_to_end.py"
---

### Implementation and selection

Mosplot exposes a simulator-driven DC sweep and lookup-table generation path, expression-based design charts and a residual-equation optimization API. The optimizer evaluates all configured corners and re-solves operating points at fixed reference geometry; the conventional CMA-ES and SciPy optimization paths are not model-hosted AI. The end-to-end test uses a synthetic square-law current-mirror table and a second table with current-density scaling. It checks corner feasibility, geometry preservation, report generation and Spectre netlist writing. [Characterization](#source-characterize) · [Optimizer](#source-optimizer) · [Tests](#source-end-to-end).

### Scope and limits

Design is supported by automated multicorner sizing; Simulation is supported by electrical device characterization and lookup-based evaluation. The tool is distinct from individual gm/ID lookup utilities and agent instructions because it implements an explicit circuit residual system and shared geometry across corners. May corner support and September optimizer work establish maintenance beyond the initial version. The later example-comment edits do not advance meaningful activity. Netlist export and synthetic regression evidence do not establish foundry signoff, arbitrary topology support or independent verification of the optimizer's reported performance. [Overview](#source-readme) · [Corner history](#source-corner-history) · [Implementation](#source-activity).
