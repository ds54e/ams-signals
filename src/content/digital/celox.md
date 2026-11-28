---
name: "Celox"
aliases: []
description: "Compiler-based RTL simulator for Veryl and a supported subset of SystemVerilog, with typed TypeScript tests, native CLI and cocotb/VPI. It implements selected SystemVerilog covergroups including interface declarations and JSON coverage reporting; it is not a gate-level timing or analog simulator."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-coauthored change implemented clock and reset options and corrected reset polarity in the TypeScript testbench layer. The option plumbing remains in the reviewed master implementation."
  sources: ["development-implementation", "development-retained"]
  reviewedAt: "2026-11-20"
access: "Public Rust and TypeScript source under Apache-2.0 or MIT. The Veryl test workflow uses the Celox npm and Vite packages; the native CLI is available via Cargo, and the VPI workflow additionally needs cocotb."
addedAt: "2026-11-20"
reviewedAt: "2026-11-28"
sources:
  - id: "official"
    title: "Official project website"
    url: "https://celox-sim.github.io/celox/"
    purpose: "official"
  - id: "code"
    title: "Canonical public Celox implementation and project guide"
    url: "https://github.com/celox-sim/celox"
    purpose: "code"
  - id: "release"
    title: "Celox 0.13.0 release and VPI changes"
    url: "https://github.com/celox-sim/celox/releases/tag/v0.13.0"
  - id: "activity"
    title: "Reviewed SystemVerilog array-write correction and regression"
    url: "https://github.com/celox-sim/celox/commit/0c7f46bd9c25f71161f41ddd6f82d40a845c39f8"
  - id: "development-implementation"
    title: "Integrated Claude-coauthored clock/reset implementation and tests"
    url: "https://github.com/celox-sim/celox/commit/ff75365c2cb9130f9cbec3251f5ed1e701d3baa4"
  - id: "development-retained"
    title: "Retained clock/reset option plumbing on reviewed master"
    url: "https://github.com/celox-sim/celox/blob/0c7f46bd9c25f71161f41ddd6f82d40a845c39f8/packages/celox/src/napi-helpers.ts#L482-L488"
  - id: review-20261123
    title: "Event-keyed state-update scheduling"
    url: "https://github.com/celox-sim/celox/commit/c6ba61f671aa694725853f88ba48bd3130f46b62"
  - id: review-20261128-activity
    title: "November 27 interface-declared covergroups"
    url: "https://github.com/celox-sim/celox/commit/456f4e7b4e18d9641808ae90f0fd6be6ec0ee133"
  - id: review-20261128-cli
    title: "November 27 native CLI covergroup reporting"
    url: "https://github.com/celox-sim/celox/commit/1a0a2485c70c6b4bd9c0fd1ad0eada256b85efa5"
  - id: review-20261128-coverage-tests
    title: "Retained covergroup execution and report tests"
    url: "https://github.com/celox-sim/celox/blob/d4e1d96204fd8d50c4b57ac3cdb32253595e63ff/crates/celox/tests/frontends/systemverilog/covergroup.rs"
  - id: review-20261128-cli-tests
    title: "Retained JSON report and failure-path regression"
    url: "https://github.com/celox-sim/celox/blob/d4e1d96204fd8d50c4b57ac3cdb32253595e63ff/crates/celox/tests/run_cli.rs"
  - id: review-20261128-limits
    title: "Current conformance-suite limitations"
    url: "https://github.com/celox-sim/celox/blob/d4e1d96204fd8d50c4b57ac3cdb32253595e63ff/crates/celox-test-suite/LIMITATIONS.md"
---

### Implementation and scope

Celox is an independent simulator, not Veryl's built-in simulator. Its compiled kernels execute RTL for verification. The Vite/Vitest workflow exposes Veryl using typed TypeScript ports and hierarchy; the Rust API and CLI also run supported SystemVerilog designs and timed testbenches. The native executable can run cocotb testbenches via VPI. Internal elaboration, compiler IR and executable code generation do not provide separate RTL Design or logic Synthesis stages. The supported SystemVerilog subset is not full IEEE 1800 conformance; gate-level timing and AMS simulation are outside the reviewed workflow. [Project and implementation](#source-code)

### Selection and release boundary

The November 2, 2026 v0.13.0 release records executable SystemVerilog and VPI fixes, including native cocotb clock handling. The November 19 master correction keeps disjoint flip-flop array-element writes out of sparse next-state lowering and adds a SystemVerilog regression. This is a later default-branch implementation, not a v0.13.0 feature. Public code and test diffs were inspected; simulator conformance and performance were not independently reproduced. [Release](#source-release) · [Reviewed integration](#source-activity)

### Development provenance

A credited Claude Opus contribution added executable clock/reset option plumbing and reset-polarity handling, including TypeScript tests. The credited commit is an ancestor of the reviewed canonical revision, where the option plumbing remains present. This is development provenance, not AI-driven simulation. [Credited implementation](#source-development-implementation) · [Retained source](#source-development-retained)

### November 23 source review

The native simulator groups state updates by event and distinguishes transition, sample and publish work. This is an internal simulation change after v0.13.0, not added HDL coverage or an independently measured speedup. [Reviewed implementation](#source-review-20261123).

### November 28, 2026 source review

November 27 integrates covergroups declared in interfaces with instance-specific bindings, sampling and explicit restrictions on references outside the interface. The native CLI also writes JSON covergroup coverage through --coverage-report, with regressions for successful and failed simulation runs. The implemented report and selected language cases are concrete verification functionality; they do not establish full clause 19 or UVM conformance, UCIS interoperability or AMS support. These are reviewed default-branch changes, not claims about a tagged release. The source and tests were inspected, not run. [Interface implementation](#source-review-20261128-activity) · [Coverage execution tests](#source-review-20261128-coverage-tests) · [CLI integration](#source-review-20261128-cli) · [CLI regression](#source-review-20261128-cli-tests) · [Limitations](#source-review-20261128-limits).
