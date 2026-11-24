---
name: "OpenTimer"
aliases: []
description: "Parallel incremental static-timing analysis engine with C++ APIs and a command shell. It reads supported netlist, Liberty and SDC inputs to construct timing graphs and report paths or slack; its constraint and library coverage should be evaluated independently from other STA implementations."
scope:
  layout:
    ai: false
access: "Public C++ implementation; the supported compiler/task runtime and matching libraries, netlists and constraints are required."
addedAt: "2026-10-22"
reviewedAt: "2026-11-24"
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
  - id: review-20261107-implementation
    title: "Build-system correction for missing cell-library implementation"
    url: https://github.com/OpenTimer/OpenTimer/commit/00d592bb13921493e416c3aa1bf87fd649411045
---

### Implemented operations and boundaries

The December 2025 implementation series adds Liberty bus-group support and subsequently corrects the build-system source list. Maintenance is intermittent; SDC/Liberty coverage is not inferred from OpenSTA.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The December 16, 2025 Liberty change parses bus groups and inherits bus-level directions for their pins. The December 24 correction adds celllibs.cpp to CMake, repairing the link failure introduced by multi-library loading. These are concrete extensions and follow-up repairs to an established engine. The November 24, 2026 review found no later substantive default-branch change, so this evidence supports intermittent maintenance with a substantial recent gap. No STA or build run was independently repeated. [Liberty implementation](#source-activity) · [Build correction](#source-review-20261107-implementation).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
