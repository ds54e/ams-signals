---
name: "OpenCDC"
aliases: []
description: "Structural CDC analyzer for SystemVerilog RTL and gate-level Verilog netlists, with hierarchy elaboration, cell-library mapping, constraints and multiple report formats. Static recognition remains incomplete for FIFO, handshake payload and some RTL hierarchy patterns; clean reports require clock/cell coverage review and do not prove protocol safety."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opencode is co-credited with implementing hierarchical gate-level netlist flattening. The canonical frontend retains recursive elaboration, parent-port binding and cycle/depth checks."
  sources: [development-code-20261031, development-retained-20261031]
  reviewedAt: "2026-10-31"
access: "Public C++ implementation; slang/build dependencies and suitable clock constraints or configuration are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-31"
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
  - id: review-20261031-netlist
    title: "Gate-level hierarchy elaboration and cell-library boundaries"
    url: https://github.com/Ayoubbelguellaoui/CDC/blob/16be223c535013b5f4be90e0885b16d67228e15e/docs/netlist.md
  - id: development-code-20261031
    title: "Claude Opencode co-credited executable hierarchy elaboration"
    url: https://github.com/Ayoubbelguellaoui/CDC/commit/7a4ebe6124551662ea663b2e2ae625e40a2f07ee
  - id: development-retained-20261031
    title: "Retained hierarchy elaborator in the canonical frontend"
    url: https://github.com/Ayoubbelguellaoui/CDC/blob/16be223c535013b5f4be90e0885b16d67228e15e/src/frontend/netlist/flatten.cpp
  - id: review-20261031-limits
    title: "Current structural guarantees and known analysis gaps"
    url: https://github.com/Ayoubbelguellaoui/CDC/blob/16be223c535013b5f4be90e0885b16d67228e15e/README.md
---

### Implemented operations and boundaries

The public corpus records an untraced instance-to-instance violation, width-limited synchronizer recognition that flags a safe Gray FIFO, and handshake payload false positives. These are documented analysis boundaries rather than independently reproduced failures. Constraints, waivers and unknown-clock diagnostics affect report coverage.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier meaningful checkpoint was 2026-09-26T13:24:58Z (`6c6bd44bf2d137e108437bb5a9729c8fd5350886`), reviewed independently from later cosmetic or version-only changes. The current checkpoint is the October 25 UTC hierarchy elaborator described below. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was separately reviewed against the integrated, retained code below.

The gate-level frontend now elaborates multi-module structural Verilog by flattening child instances, binding parent ports and preserving instance-qualified names. Recursive instantiation and hierarchy depth above 64 are rejected. Cell classification combines defaults, a limited Liberty subset and explicit YAML overrides; behavioral RTL still uses slang. This gate-level path does not resolve the separate documented RTL instance-to-instance tracing gap. [Netlist frontend and limits](#source-review-20261031-netlist) · [Current analysis boundaries](#source-review-20261031-limits).

Claude Opencode is explicitly co-credited in the integrated hierarchy-elaboration commit. The current canonical frontend retains recursive elaboration, parent-port binding and cycle/depth checks, supporting AI-ASSISTED development. This does not establish that AI built most of OpenCDC. [Credited implementation](#source-development-code-20261031) · [Retained code](#source-development-retained-20261031).
