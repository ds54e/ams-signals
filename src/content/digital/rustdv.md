---
name: rustdv
description: Rust verification framework combining simulator-driven async coroutines with UVM-inspired components, phases, configuration, factories and sequences. Testbenches compile to native libraries loaded through VPI, with Icarus/Verilator integration and trace control; it follows selected UVM concepts without claiming IEEE 1800.2 conformance.
scope:
  verification:
    ai: false
access: Public Rust source and examples; requires a supported simulator and platform-specific VPI build setup.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/rustdv/rustdv
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/rustdv/rustdv/blob/ac72f6f4e95331e5e542a93d0a1574a6ca72dcb2/README.md
- id: activity
  title: 'Merge pull request #10 from teabone113/codex/verilator-mcp-service-points'
  url: https://github.com/rustdv/rustdv/commit/ac72f6f4e95331e5e542a93d0a1574a6ca72dcb2
- id: implementation-1
  title: 'Released implementation: rustdv/rustdv-sim/src/rustdv_sim.rs'
  url: https://github.com/rustdv/rustdv/blob/ac72f6f4e95331e5e542a93d0a1574a6ca72dcb2/rustdv/rustdv-sim/src/rustdv_sim.rs
- id: implementation-2
  title: 'Released implementation: STATUS.md'
  url: https://github.com/rustdv/rustdv/blob/ac72f6f4e95331e5e542a93d0a1574a6ca72dcb2/STATUS.md
---

### Implementation and boundaries

The released runtime, component library and simulator examples establish an independent Verification framework. The selected integration merge adds Verilator debug service points and trace handling. Rust ownership and native execution do not establish AI. UVM-inspired methodology is distinguished from a conforming SystemVerilog reference implementation. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `ac72f6f4e95331e5e542a93d0a1574a6ca72dcb2` (2026-10-15 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
