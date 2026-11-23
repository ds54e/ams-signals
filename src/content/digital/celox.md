---
name: "Celox"
aliases: []
description: "Compiler-based RTL simulator for Veryl and a supported subset of SystemVerilog. It exposes a typed TypeScript API for Veryl tests with Vitest, runs supported SystemVerilog testbenches through its Rust CLI, and connects to cocotb through VPI. It is not a gate-level timing or analog simulator."
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
reviewedAt: '2026-11-23'
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
---

### Implementation and scope

Celox is an independent simulator, not Veryl's built-in simulator. Its compiled kernels execute RTL for verification. The Vite/Vitest workflow exposes Veryl using typed TypeScript ports and hierarchy; the Rust API and CLI also run supported SystemVerilog designs and timed testbenches. The native executable can run cocotb testbenches via VPI. Internal elaboration, compiler IR and executable code generation do not provide separate RTL Design or logic Synthesis stages. The supported SystemVerilog subset is not full IEEE 1800 conformance; gate-level timing and AMS simulation are outside the reviewed workflow. [Project and implementation](#source-code)

### Selection and release boundary

The November 2, 2026 v0.13.0 release records executable SystemVerilog and VPI fixes, including native cocotb clock handling. The November 19 master correction keeps disjoint flip-flop array-element writes out of sparse next-state lowering and adds a SystemVerilog regression. This is a later default-branch implementation, not a v0.13.0 feature. Public code and test diffs were inspected; simulator conformance and performance were not independently reproduced. [Release](#source-release) · [Reviewed integration](#source-activity)

### Development provenance

A credited Claude Opus contribution added executable clock/reset option plumbing and reset-polarity handling, including TypeScript tests. The credited commit is an ancestor of the reviewed canonical revision, where the option plumbing remains present. This is development provenance, not AI-driven simulation. [Credited implementation](#source-development-implementation) · [Retained source](#source-development-retained)

### November 23 source review

The native simulator groups state updates by event and distinguishes transition, sample and publish work. This is an internal simulation change after v0.13.0, not added HDL coverage or an independently measured speedup. [Reviewed implementation](#source-review-20261123).
