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
reviewedAt: '2026-11-24'
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
  - id: website
    title: Official project website and documentation
    url: https://stineje.github.io/CharLib/
    purpose: official
  - id: related-libretto
    title: "Related Libretto command-file characterization workflow"
    url: https://github.com/snishizawa/libretto/blob/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f/README.md
  - id: related-libretto-dispatch
    title: "Libretto's explicit combinational and flip-flop template dispatch"
    url: https://github.com/snishizawa/libretto/blob/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f/script/libretto.py
  - id: related-libretto-docs
    title: "Libretto's separate Markdown characterization-table export"
    url: https://github.com/snishizawa/libretto/blob/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f/script/myExportDoc.py
  - id: related-libretto-maintenance
    title: "Libretto's maintained Liberty lookup-table axis correction"
    url: https://github.com/snishizawa/libretto/commit/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f
---

### Implemented operations and boundaries

Combinational and sequential electrical characterization, NLDM timing and implemented power/constraint procedures establish Analog Simulation. This is different from CACE's circuit-level datasheet orchestration, and does not claim support for every cell topology or Liberty model family.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-09-22T18:37:59Z (`ebe8fb0da5a9d5bcf0fba07ab80af1e5c0541a43`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.

### Related characterization implementation

Libretto is a separate command-file-driven ngspice characterizer with explicit combinational/flip-flop template dispatch and Markdown table export. Its README also points readers to CharLib and lctime. The catalog groups that related implementation here because its additional discovery value is concentrated in those configuration and reporting choices; its maintained LUT-axis correction remains useful source evidence, not a reason to call the project inactive. CharLib retains its own YAML-driven procedures and ngspice/Xyce backend choices. This reference does not add Libretto's documentation generator, implementation ownership or activity to CharLib. [Libretto workflow](#source-related-libretto) · [Template dispatch](#source-related-libretto-dispatch) · [Documentation export](#source-related-libretto-docs) · [LUT correction](#source-related-libretto-maintenance).
