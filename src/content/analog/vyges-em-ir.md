---
name: "Vyges EM-IR"
aliases: []
summary: "Physical power-grid analysis tool computing resistive IR drop and electromigration-limit violations from supplied networks or routed geometry."
description: "Physical power-grid analysis tool computing resistive IR drop and electromigration-limit violations from supplied networks or routed geometry. Analog and digital examples use externally supplied loads; current limits, thermal assumptions and process data must be reviewed independently from claims of foundry-certified signoff."
scope:
  layout:
    ai: false
access: "Public Rust implementation; network or supported DEF/LEF inputs, load currents and reviewed current-limit data are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/vyges-tools/em-ir"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/vyges-tools/em-ir/blob/0baf10bf23a969b7ff1a0185a3acd03ca5de4ce8/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/emsignoff.rs"
    url: "https://github.com/vyges-tools/em-ir/blob/0baf10bf23a969b7ff1a0185a3acd03ca5de4ce8/src/emsignoff.rs"
  - id: "implementation-2"
    title: "Reviewed source: src/main.rs"
    url: "https://github.com/vyges-tools/em-ir/blob/0baf10bf23a969b7ff1a0185a3acd03ca5de4ce8/src/main.rs"
  - id: "activity"
    title: "Reviewed meaningful change: def: read the DEF with the tech LEF, so a strap continues on the via's other layer"
    url: "https://github.com/vyges-tools/em-ir/commit/938a8742bb3ab830f9443719ffe5794b9eccc7db"
---

### Implemented operations and boundaries

The exposed result is physical power-grid IR drop and segment-current checking, classified as Layout. Load currents are externally supplied; the tool does not solve analog operating points. Public generic limits and private foundry plugins are different inputs, and no independent PDNSim or silicon correlation was performed.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-17T05:53:57Z (`938a8742bb3ab830f9443719ffe5794b9eccc7db`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
