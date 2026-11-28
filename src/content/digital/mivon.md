---
name: "mivon"
aliases: ["Mivon RTL Simulator"]
description: "Rust SystemVerilog simulator with its own parser, elaboration and event execution, selected assertion and constrained-random operations, and built-in UVM-like method handling. Runtime bus checks monitor named signals for selected protocol rules; the public implementation remains partial and does not establish complete UVM, IEEE 1800 or vendor waveform-format compatibility."
scope:
  verification: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Copilot-credited commit adds executable preprocessor tests, including a timescale directive regression. That test remains in the current workspace test crate."
  sources: ["credited", "retained"]
  reviewedAt: "2026-11-28"
access: "Public Rust source; the README identifies MIT, but the reviewed root has no standalone license file. Confirm applicable terms before reuse. Optional native dependencies vary by build features."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public source"
    url: "https://github.com/mivonsim/mivon"
    purpose: code
  - id: readme
    title: "Overview and claimed feature set"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/README.md"
  - id: activity
    title: "November 23 runtime protocol check integration"
    url: "https://github.com/mivonsim/mivon/commit/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a"
  - id: sva-repair
    title: "October 24 multicycle implication antecedent correction"
    url: "https://github.com/mivonsim/mivon/commit/0b6b7cff239812293d727e610a318b72dc638bfa"
  - id: sva-engine
    title: "Retained sequence evaluation"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-simulator/src/simulator/engine/sequence.rs"
  - id: sva-tests
    title: "Retained implication and selected UVM tests"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-tests/src/tests/core_uvm.rs"
  - id: constraint-solver
    title: "Retained bounded randomization implementation"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-simulator/src/simulator/engine/uvm/constraint_solver.rs"
  - id: uvm
    title: "Built-in UVM method dispatch"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-simulator/src/simulator/engine/uvm/builtin.rs"
  - id: vip
    title: "Retained runtime checks and unit tests"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-simulator/src/simulator/vip_checker.rs"
  - id: vip-engine
    title: "Simulation loop integration"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-simulator/src/simulator/engine/core.rs"
  - id: vip-cli
    title: "CLI and simulation pipeline integration"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/src/run_fast.rs"
  - id: fsdb
    title: "Project-specific FSDB-named writer and reader"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-simulator/src/waveform/fsdb.rs"
  - id: audit
    title: "Maintainer's November gap assessment"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/AUDIT_GAP_REPORT.md"
  - id: credited
    title: "Copilot-credited executable preprocessor regression"
    url: "https://github.com/mivonsim/mivon/commit/64f10ec5eb3a174e0ee8b3237d7c81d2b04f87d3"
  - id: retained
    title: "Retained preprocessor test after workspace migration"
    url: "https://github.com/mivonsim/mivon/blob/ae67f17c7b57906c3b09fa4d93b51c3e6e06b09a/crates/mivon-tests/src/tests/core_types.rs"
---

## Implementation and selection

The simulator exposes a native CLI and independent frontend/IR/event-execution pipeline. The October 24 change corrects an implication antecedent containing multiple cycles that had vacuously passed when evaluated only at elapsed zero. The retained tests distinguish a matched antecedent followed by a failure from a nonmatching antecedent. November 23 expands runtime bus checks from APB, AXI4-Lite and AHB to selected USB, PCIe, DDR and Ethernet rules. The CLI installs checkers and the simulation loop invokes them; the implementation is distinct from a parser-only project or an offline protocol demonstration. [Assertion correction](#source-sva-repair) · [Retained evaluation](#source-sva-engine) · [Regressions](#source-sva-tests) · [Runtime integration](#source-activity) · [Checker](#source-vip) · [Engine](#source-vip-engine) · [CLI](#source-vip-cli).

## Limits

The built-in UVM dispatch and tests establish selected simulator-specific behavior, not execution of the complete Accellera reference UVM library. The constraint solver narrows domains, generates assignments and checks constraints with a finite attempt bound; exhaustion is not a general proof of unsatisfiability. Runtime checks are tied to expected signal names and selected rules; missing signals can bypass checks, and USB sequence/handshake checks are explicitly stubs. Some checks do not condition on ready. They are not complete protocol VIP or a compliance verdict. [UVM methods](#source-uvm) · [Tests](#source-sva-tests) · [Solver](#source-constraint-solver) · [Checker](#source-vip).

The FSDB-named implementation writes its own header and value-change representation; the review establishes neither Synopsys FSDB interoperability nor compatibility with commercial tools. The project's November gap assessment identifies substantial limitations in the integrated terminal UI, debug and project workflows. Do not infer production readiness, numerical performance or language-wide conformance from self-reported totals. No upstream simulation or regression was independently executed. The reviewed user-facing operation is Verification; other advertised tool stages are not classified here without separate implementation review. [Format implementation](#source-fsdb) · [Gap assessment](#source-audit) · [Overview](#source-readme).

The explicitly Copilot-credited executable preprocessor test remains present following the workspace reorganization. This supports AI-ASSISTED development, not runtime AI. [Credited change](#source-credited) · [Retained test](#source-retained).
