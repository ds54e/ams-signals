---
name: "OpenCDC"
aliases: []
description: "Slang-based structural clock-domain-crossing analyzer for SystemVerilog designs, with constraints, waivers and multiple report formats. Its public corpus documents hierarchy-related misses and false positives on some safe FIFO or handshake structures, so clean reports require coverage and modeling review."
scope:
  verification:
    ai: false
access: "Public C++ implementation; slang/build dependencies and suitable clock constraints or configuration are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/Ayoubbelguellaoui/CDC"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/Ayoubbelguellaoui/CDC/blob/6c6bd44bf2d137e108437bb5a9729c8fd5350886/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/analysis/analyzer.cpp"
    url: "https://github.com/Ayoubbelguellaoui/CDC/blob/6c6bd44bf2d137e108437bb5a9729c8fd5350886/src/analysis/analyzer.cpp"
  - id: "implementation-2"
    title: "Reviewed source: docs/what-we-can-prove.md"
    url: "https://github.com/Ayoubbelguellaoui/CDC/blob/6c6bd44bf2d137e108437bb5a9729c8fd5350886/docs/what-we-can-prove.md"
  - id: "implementation-3"
    title: "Reviewed source: benchmarks/corpus/README.md"
    url: "https://github.com/Ayoubbelguellaoui/CDC/blob/6c6bd44bf2d137e108437bb5a9729c8fd5350886/benchmarks/corpus/README.md"
  - id: "activity"
    title: "Reviewed meaningful change: Add realistic benchmark corpus (16 designs, manifest v1.2, runner extensions)"
    url: "https://github.com/Ayoubbelguellaoui/CDC/commit/6c6bd44bf2d137e108437bb5a9729c8fd5350886"
---

### Implemented operations and boundaries

The public corpus records an untraced instance-to-instance violation, width-limited synchronizer recognition that flags a safe Gray FIFO, and handshake payload false positives. These are documented analysis boundaries rather than independently reproduced failures. Constraints, waivers and unknown-clock diagnostics affect report coverage.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-09-26T13:24:58Z (`6c6bd44bf2d137e108437bb5a9729c8fd5350886`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
