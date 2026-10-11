---
name: "Verilator"
aliases: []
description: "Compiled SystemVerilog simulator and lint system supporting timing, assertions, coverage, constrained randomization and VPI-based testbench access. It translates designs into C++/SystemC models and can export elaborated JSON representations for downstream tooling; feature availability depends on the selected version and build."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-11"
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
  - id: "activity-current"
    title: "Clocking-block cycle-delay correction"
    url: "https://github.com/verilator/verilator/commit/19254541ee5f745a45c59eb540d635bdf49b3919"
  - id: "review-20261011-1"
    title: "Windows SMT pipe"
    url: "https://github.com/verilator/verilator/commit/60706d5c8443e9c8928586467dd8d0ceab34cd59"
  - id: "review-20261011-2"
    title: "Packed-member VPI"
    url: "https://github.com/verilator/verilator/commit/56223ce8dd2a8212e442a58244b30717ebd0e0c5"
---

### Implementation and scope

Compiled simulation, lint, assertions, coverage and waveform output support conventional Verification. Separately, the documented JSON-only mode exports parsed/elaborated AST and metadata for downstream tools, disables selected aggressive transformations and ships a Python hierarchy-graph consumer. This exposed reusable design representation supports conventional Design; it is distinct from an internal parser or debug-only tree dump. C++/SystemC model generation is not logic synthesis. [Project overview](#source-readme); [JSON frontend contract](#source-json-frontend); [working consumer](#source-json-example).

### Limits and reviewed activity

The JSON format is evolving, and performance/language compatibility depend on the design and enabled features. No catalog benchmark was run. The October 1 UTC change makes the last branch unconditional only for cases proven exhaustive beyond enum-only coverage, with regression tests. Later same-day commentary and test-label edits remain ordering history rather than the meaningful checkpoint. [Reviewed optimization](#source-activity-refresh); [case lowering](#source-implementation).

### Development provenance

The reviewed source establishes conventional compiler/simulator operations. Incidental coding-agent contributions do not establish a substantial attributed implementation campaign, defining-core AI construction or runtime model-driven stage. [Project implementation](#source-readme).

### Current implementation and operating boundaries

The randomization runtime gains a Windows solver subprocess/pipe path. VPI can access packed-struct/union members. Separate fixes cover whole-unpacked-array NBAs in suspendable/forked processes, intra-assignment timing and SVA consequents. [Windows SMT pipe](#source-review-20261011-1) · [Packed-member VPI](#source-review-20261011-2)

Reviewed commits are on the captured development branch. Do not describe every change as belonging to an already released stable version, or infer full UVM support from isolated improvements. Underlying simulation and solver execution remain conventional.
