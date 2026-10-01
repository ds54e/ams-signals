---
name: "Verilator"
aliases: []
description: "Compiled SystemVerilog simulator and lint system that translates RTL into C++/SystemC models for testbench execution, assertions, coverage and waveform debug. A separate JSON-only frontend exports elaborated design representations for downstream tooling, with an evolving format and example hierarchy consumers."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical Verilator repository"
    url: "https://github.com/verilator/verilator"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/verilator/verilator/blob/71c6638ccf32c252353a53a073a3ed35ba2bd169/README.rst"
  - id: "implementation"
    title: "Reviewed implementation: src/V3Case.cpp"
    url: "https://github.com/verilator/verilator/blob/71c6638ccf32c252353a53a073a3ed35ba2bd169/src/V3Case.cpp"
  - id: "activity"
    title: "Fix use-after-free of captured interface typedef in deleted generate branch (#8287)"
    url: "https://github.com/verilator/verilator/commit/b1c06fdb09c45e018804ef603058abf866a910fc"
  - id: "website"
    title: "Official project documentation"
    url: "https://verilator.org"
    purpose: "official"
  - id: "activity-refresh"
    title: "Optimize exhaustive case if-chains with an unconditional else"
    url: "https://github.com/verilator/verilator/commit/368f59d5f26d6349b95e4db9ba8ca9fdac0c387c"
  - id: "json-frontend"
    title: "Documented JSON-only frontend for downstream tools"
    url: "https://github.com/verilator/verilator/blob/71c6638ccf32c252353a53a073a3ed35ba2bd169/docs/guide/exe_verilator.rst"
  - id: "json-example"
    title: "Implemented consumer of elaborated JSON design models"
    url: "https://github.com/verilator/verilator/blob/71c6638ccf32c252353a53a073a3ed35ba2bd169/examples/json_py/vl_hier_graph"
---

### Implementation and scope

Compiled simulation, lint, assertions, coverage and waveform output support conventional Verification. Separately, the documented JSON-only mode exports parsed/elaborated AST and metadata for downstream tools, disables selected aggressive transformations and ships a Python hierarchy-graph consumer. This exposed reusable design representation supports conventional Design; it is distinct from an internal parser or debug-only tree dump. C++/SystemC model generation is not logic synthesis. [Project overview](#source-readme); [JSON frontend contract](#source-json-frontend); [working consumer](#source-json-example).

### Limits and reviewed activity

The JSON format is evolving, and performance/language compatibility depend on the design and enabled features. No catalog benchmark was run. The October 1 UTC change makes the last branch unconditional only for cases proven exhaustive beyond enum-only coverage, with regression tests. Later same-day commentary and test-label edits remain ordering history rather than the meaningful checkpoint. [Reviewed optimization](#source-activity-refresh); [case lowering](#source-implementation).

### Development provenance

The reviewed source establishes conventional compiler/simulator operations. Incidental coding-agent contributions do not establish a substantial attributed implementation campaign, defining-core AI construction or runtime model-driven stage. [Project implementation](#source-readme).
