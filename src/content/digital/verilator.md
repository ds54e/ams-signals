---
name: "Verilator"
aliases: []
description: "Compiled SystemVerilog simulator and lint system supporting timing, assertions, coverage, constrained randomization and VPI-based testbench access. It translates designs into C++/SystemC models and can export elaborated JSON representations for downstream tooling; feature availability depends on the selected version and build."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is co-credited for correcting coverage state after assertion action blocks and adding executable regressions. The canonical head retains the V3Coverage.cpp correction and tests."
  sources: ["review-20261115-activity", "review-20261115-retained", "review-20261115-tests"]
  reviewedAt: "2026-11-15"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-28"
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
    url: "https://www.veripool.org/verilator/"
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
  - id: review-20261112-activity
    title: "Guarded-transition FSM coverage extraction correction"
    url: https://github.com/verilator/verilator/commit/2894829fed934a15b01620d44cc5daeb72768c60
  - id: review-20261112-implementation
    title: "FSM target-state and transition extraction"
    url: https://github.com/verilator/verilator/blob/2894829fed934a15b01620d44cc5daeb72768c60/src/V3FsmDetect.cpp
  - id: review-20261112-tests
    title: "Guarded one-block and explicitly marked FSM regressions"
    url: https://github.com/verilator/verilator/blob/2894829fed934a15b01620d44cc5daeb72768c60/test_regress/t/t_cover_fsm_transition_shapes_multi.v
  - id: review-20261115-activity
    title: "AI-coauthored assertion-action-block coverage correction and regressions"
    url: https://github.com/verilator/verilator/commit/9ed03126f55c7f2295f81dd9415c75d0527e8423
  - id: review-20261115-retained
    title: "Coverage state restoration retained at the reviewed default-branch head"
    url: https://github.com/verilator/verilator/blob/81c7a56e16bbd937bfd9dbedb9e40f3fd4a12308/src/V3Coverage.cpp
  - id: review-20261115-tests
    title: "Retained assertion-action-block executable coverage regressions"
    url: https://github.com/verilator/verilator/blob/81c7a56e16bbd937bfd9dbedb9e40f3fd4a12308/test_regress/t/t_cover_line.v
  - id: review-20261128-activity
    title: "Executable VPI driver regressions"
    url: "https://github.com/verilator/verilator/commit/d986a209210fccb4071f9f04694333eba7b6e8bf"
  - id: review-20261128-sva
    title: "SVA disjunction failure propagation and regressions"
    url: "https://github.com/verilator/verilator/commit/bfef4a1ff9f64c0216a62cb87745ad97308435b4"
  - id: review-20261128-vpi-test
    title: "Retained VPI driver test implementation"
    url: "https://github.com/verilator/verilator/blob/50b2d6fd0d97af716ba1536e86395d9c40d4c0e2/test_regress/t/t_vpi_drivers.cpp"
---

### Implementation and scope

Compiled simulation, lint, assertions, coverage and waveform output support conventional Verification. Separately, the documented JSON-only mode exports parsed/elaborated AST and metadata for downstream tools, disables selected aggressive transformations and ships a Python hierarchy-graph consumer. This exposed reusable design representation supports conventional Design; it is distinct from an internal parser or debug-only tree dump. C++/SystemC model generation is not logic synthesis. [Project overview](#source-readme); [JSON frontend contract](#source-json-frontend); [working consumer](#source-json-example).

### Limits and reviewed activity

The JSON format is evolving, and performance/language compatibility depend on the design and enabled features. No catalog benchmark was run. The October 1 UTC change makes the last branch unconditional only for cases proven exhaustive beyond enum-only coverage, with regression tests. Later same-day commentary and test-label edits remain ordering history rather than the meaningful checkpoint. [Reviewed optimization](#source-activity-refresh); [case lowering](#source-implementation).

### Development provenance

The November 15 assertion-action-block repair and executable regressions explicitly credit Claude Opus 5.5 as coauthor using an Anthropic address. Both remain in the canonical default-branch head, supporting AI-ASSISTED for this bounded contribution. The compiler/simulator operations remain conventional; software-development attribution does not establish runtime AI. [Attributed implementation and tests](#source-review-20261115-activity); [retained coverage visitor](#source-review-20261115-retained); [retained regression](#source-review-20261115-tests).

### Current implementation and operating boundaries

The randomization runtime gains a Windows solver subprocess/pipe path. VPI can access packed-struct/union members. Separate fixes cover whole-unpacked-array NBAs in suspendable/forked processes, intra-assignment timing and SVA consequents. [Windows SMT pipe](#source-review-20261011-1) · [Packed-member VPI](#source-review-20261011-2)

Reviewed commits are on the captured development branch. Do not describe every change as belonging to an already released stable version, or infer full UVM support from isolated improvements. Underlying simulation and solver execution remain conventional.


### November 12, 2026 implementation review

The November 11 implementation extracts constant FSM targets guarded by nested conditional branches when omitted assignments hold the current state, carrying that condition through state collection and arc emission. Regressions add guarded one-block machines and explicitly marked non-enum machines with guarded-only targets. Supported-shape limits remain explicit; this is not complete FSM extraction. The tests were inspected rather than run. Functional scope remains unchanged. [Integrated activity](#source-review-20261112-activity). [FSM target-state and transition extraction](#source-review-20261112-implementation) · [Guarded one-block and explicitly marked FSM regressions](#source-review-20261112-tests).


### November 15, 2026 implementation review

The coverage visitor saves and restores its state around each assertion/cover node, so a terminating task in an assertion action block no longer disables coverage of subsequent statements outside that assertion. Executable regressions exercise $error followed by if/else and $stop/$fatal in case items followed by assignments; updated expected outputs cover line, branch, LCOV and trace output. This corrects coverage instrumentation, not the execution semantics of failed assertions or all coverage defects. [Integrated repair and expected outputs](#source-review-20261115-activity); [retained implementation](#source-review-20261115-retained); [executable cases](#source-review-20261115-tests).

The reviewed master head is `81c7a56e16bbd937bfd9dbedb9e40f3fd4a12308`; its later commentary-only change is ordering history, while the November 15 repair is the meaningful checkpoint on that first-parent chain. Default-branch integration is not a stable-release claim. Source and regression inspection did not include an upstream test run.

### November 28, 2026 source review

On November 27 the SVA NFA builder was corrected to propagate Boolean-leaf context into nested disjunction operands, with regressions for three-term disjunctions after delayed antecedents. The November 28 VPI driver regression adds executable C++ and SystemVerilog cases for read/write access across driver shapes. The reviewed meaningful checkpoint is the test integration; the later bit-builtin wrapper commit remains the raw head. These changes support existing Verification rather than a new Scope or runtime AI classification. Tests were inspected, not executed; master integration is not a stable-release claim. [SVA repair](#source-review-20261128-sva) · [VPI integration](#source-review-20261128-activity) · [Retained regression](#source-review-20261128-vpi-test).
