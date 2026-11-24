---
name: "EqMap"
aliases: []
description: "Rust synthesis tool that remaps FPGA LUT netlists using e-graph equality saturation and extracts alternatives for LUT count or logic depth. It emits Verilog and per-module reports, with optional exact extraction and correctness checks. The supported flow uses constrained, preprocessed netlists; reports do not establish routed timing or signoff PPA."
scope:
  synthesis:
    ai: false
access: "Apache-2.0 source. Requires a Rust toolchain; the supplied RTL preparation and equivalence flows use Yosys. Optional exact extraction enables CBC or HiGHS through separate build features and solver dependencies."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: Canonical Cornell EqMap implementation
    url: https://github.com/cornell-zhang/eqmap
    purpose: code
  - id: official
    title: Official EqMap documentation
    url: https://cornell-zhang.github.io/eqmap/
    purpose: official
  - id: overview
    title: Reviewed workflow, supported netlist subset and dependencies
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/README.md
  - id: frontend
    title: Yosys preparation, flattening and net splitting in the supplied wrapper
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/bin/eqmap
  - id: cli
    title: FPGA mapping command, extraction options and implemented partition modes
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/src/bin/eqmap_fpga.rs
  - id: driver
    title: Equality-saturation driver, reports and inconclusive verification handling
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/src/driver.rs
  - id: extraction
    title: LUT-count and logic-depth extraction cost functions
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/src/cost.rs
  - id: report-test
    title: Executable mapping, functionality-check and report regression
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/tests/driver/mk_rpt.v
  - id: equivalence-test
    title: Mapped-output equivalence regression through the supplied Yosys flow
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/tests/verify/c17.v
  - id: activity
    title: Integrated multiple-module mapping, emission and per-module reporting
    url: https://github.com/cornell-zhang/eqmap/commit/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb
  - id: build
    title: Reviewed crate and optional solver feature definitions
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/Cargo.toml
  - id: license
    title: Apache-2.0 project license
    url: https://github.com/cornell-zhang/eqmap/blob/d3144c45d3441530cd8d240c5fc6ea6645b8a2fb/LICENSE
---

### Implemented mapping workflow

EqMap imports supported Verilog netlists, builds alternative equivalent logic representations through e-graph rewrites and extracts a remapped implementation. The FPGA command supports LUT-count/register-cost and logic-depth objectives, with a default maximum LUT fan-in of six. Optional CBC or HiGHS features enable exact extraction. Output includes Verilog and per-module reports of circuit statistics and search limits. This is a Synthesis workflow for exploring FPGA technology mapping; equality saturation itself does not imply runtime AI. [Mapping command](#source-cli) · [Driver](#source-driver) · [Cost functions](#source-extraction) · [Build features](#source-build)

The supplied wrapper prepares input with Yosys, flattening the design and splitting nets before invoking EqMap. The README documents a constrained input subset with flat hierarchy and one-bit top-level ports. The current multiple-module implementation processes several supported netlists; it does not establish general hierarchical RTL elaboration. [Supported input](#source-overview) · [Preparation flow](#source-frontend) · [Current multi-module implementation](#source-cli)

### Correctness and operating limits

Register-to-register and arc-set partitioning are implemented. The CLI also exposes a `delay-paths` value whose dispatch panics as unimplemented; it is not a supported partitioning workflow at the reviewed revision. Optional `--verify` checks functionality, but the driver warns and continues when the result is inconclusive. A successful command exit therefore does not always prove equivalence. The repository separately supplies mapping/report regressions and Yosys-based output-equivalence cases. [Partition dispatch](#source-cli) · [Verification result handling](#source-driver) · [Report regression](#source-report-test) · [Equivalence regression](#source-equivalence-test)

LUT count and logic depth are implementation-search objectives. The reviewed flow does not perform placement, routing or signoff timing, and published area comparisons are not treated as independently reproduced PPA guarantees. The embedded checks support this mapping workflow without adding a general-purpose Verification stage. [Reported metrics](#source-driver) · [Project scope](#source-overview)

### Reviewed activity

The August 28 first-parent checkpoint extends FPGA and ASIC command paths to compile multiple modules, emit each result and associate reports with module names. The reviewed head retains the multi-module implementation. Source, commit diffs and executable regression definitions were inspected; external solvers, Yosys and the paper's benchmarks were not rerun. [Integrated implementation](#source-activity) · [Retained command](#source-cli)
