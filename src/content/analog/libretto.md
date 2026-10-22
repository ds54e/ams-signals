---
name: "Libretto"
aliases: []
summary: "Standard-cell characterization flow generating Liberty tables and documentation from scripted cell definitions and SPICE analyses."
description: "Standard-cell characterization flow generating Liberty tables and documentation from scripted cell definitions and SPICE analyses. It provides combinational and sequential characterization with process examples; supported cell templates, simulation conditions and table conventions must be checked when preparing a usable timing library."
scope:
  simulation:
    ai: false
access: "Public Python implementation; supported SPICE simulator, cell netlists and device models are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/snishizawa/libretto"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/snishizawa/libretto/blob/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f/README.md"
  - id: "implementation-1"
    title: "Reviewed source: script/libretto.py"
    url: "https://github.com/snishizawa/libretto/blob/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f/script/libretto.py"
  - id: "implementation-2"
    title: "Reviewed source: script/myExport.py"
    url: "https://github.com/snishizawa/libretto/blob/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f/script/myExport.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #11 from lionelsaintecluque/fix-liberty-lut-dimensions-inverted"
    url: "https://github.com/snishizawa/libretto/commit/4ccaeb17c485c051db8bb326dd84b9ea112e3a7f"
---

### Implemented operations and boundaries

Scripted combinational/sequential characterization produces Liberty tables and documentation. The August LUT-axis correction is meaningful maintained implementation activity despite infrequent commits. Cell templates, simulator behavior and models constrain output usability.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-08-26T02:40:22Z (`4ccaeb17c485c051db8bb326dd84b9ea112e3a7f`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
