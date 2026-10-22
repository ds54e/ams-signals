---
name: "CharLib"
aliases: []
summary: "SPICE-based standard-cell characterization tool producing Liberty timing and power data from YAML configurations."
description: "SPICE-based standard-cell characterization tool producing Liberty timing and power data from YAML configurations. It evaluates combinational and sequential cells through a modified PySpice backend with ngspice or Xyce; supported procedures and model quality constrain the resulting library characterization."
scope:
  simulation:
    ai: false
access: "Public Python implementation; modified PySpice, ngspice or Xyce, cell netlists and device models are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/stineje/CharLib"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/stineje/CharLib/blob/987e90f5286b11c3a548749f93b689a7b8723003/README.md"
  - id: "implementation-1"
    title: "Reviewed source: charlib/cli/run.py"
    url: "https://github.com/stineje/CharLib/blob/987e90f5286b11c3a548749f93b689a7b8723003/charlib/cli/run.py"
  - id: "implementation-2"
    title: "Reviewed source: charlib/characterizer/procedures/combinational/dynamic_power.py"
    url: "https://github.com/stineje/CharLib/blob/987e90f5286b11c3a548749f93b689a7b8723003/charlib/characterizer/procedures/combinational/dynamic_power.py"
  - id: "implementation-3"
    title: "Reviewed source: charlib/characterizer/procedures/sequential/constraint/recovery.py"
    url: "https://github.com/stineje/CharLib/blob/987e90f5286b11c3a548749f93b689a7b8723003/charlib/characterizer/procedures/sequential/constraint/recovery.py"
  - id: "activity"
    title: "Reviewed meaningful change: Add combinational dynamic power charactereization"
    url: "https://github.com/stineje/CharLib/commit/ebe8fb0da5a9d5bcf0fba07ab80af1e5c0541a43"
---

### Implemented operations and boundaries

Combinational and sequential electrical characterization, NLDM timing and implemented power/constraint procedures establish Analog Simulation. This is different from CACE's circuit-level datasheet orchestration, and does not claim support for every cell topology or Liberty model family.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-09-22T18:37:59Z (`ebe8fb0da5a9d5bcf0fba07ab80af1e5c0541a43`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
