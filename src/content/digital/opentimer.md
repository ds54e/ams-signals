---
name: "OpenTimer"
aliases: []
description: "Parallel incremental static-timing analysis engine with C++ APIs and a command shell. It reads supported netlist, Liberty and SDC inputs to construct timing graphs and report paths or slack; its constraint and library coverage should be evaluated independently from other STA implementations."
scope:
  layout:
    ai: false
access: "Public C++ implementation; the supported compiler/task runtime and matching libraries, netlists and constraints are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/OpenTimer/OpenTimer"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/OpenTimer/OpenTimer/blob/cd0565fc7a720368e75751c717be92d76350ee8d/README.md"
  - id: "implementation-1"
    title: "Reviewed source: ot/timer/timer.hpp"
    url: "https://github.com/OpenTimer/OpenTimer/blob/cd0565fc7a720368e75751c717be92d76350ee8d/ot/timer/timer.hpp"
  - id: "implementation-2"
    title: "Reviewed source: ot/timer/sdc.cpp"
    url: "https://github.com/OpenTimer/OpenTimer/blob/cd0565fc7a720368e75751c717be92d76350ee8d/ot/timer/sdc.cpp"
  - id: "activity"
    title: "Reviewed meaningful change: Add liberty bus group support (#94)"
    url: "https://github.com/OpenTimer/OpenTimer/commit/933ea6a079ea1a2f63fbdc506cc6f72e297ecced"
---

### Implemented operations and boundaries

Meaningful activity is the December 16 Liberty bus-group implementation, not later contributor-link edits. This low-activity maintained implementation still meets the reviewed freshness window. SDC/Liberty coverage is not inferred from OpenSTA.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2025-12-16T18:48:28Z (`933ea6a079ea1a2f63fbdc506cc6f72e297ecced`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
