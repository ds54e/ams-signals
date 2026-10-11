---
name: "cocotb"
aliases: []
description: "Python coroutine-based verification framework for driving and observing Verilog, SystemVerilog and VHDL designs in HDL simulators. Triggers and testbench scheduling coordinate stimulus and checks with simulator events, allowing tests to use Python libraries alongside the simulator's execution engine."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical cocotb repository"
    url: "https://github.com/cocotb/cocotb"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/cocotb/cocotb/blob/58bff2f084e918bb1a41c7ca570b18d16b6abfb4/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/cocotb/_bridge.py"
    url: "https://github.com/cocotb/cocotb/blob/58bff2f084e918bb1a41c7ca570b18d16b6abfb4/src/cocotb/_bridge.py"
  - id: "activity"
    title: "Propagate Python exceptions through GPI callbacks"
    url: "https://github.com/cocotb/cocotb/commit/ca64add11543021f36578fbc4731c94c9483c93f"
  - id: "website"
    title: "Official project documentation"
    url: "https://docs.cocotb.org/en/stable/"
    purpose: "official"
  - id: "activity-refresh"
    title: "Re-raise CancelledError in resume wrapper tasks"
    url: "https://github.com/cocotb/cocotb/commit/58bff2f084e918bb1a41c7ca570b18d16b6abfb4"
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/cocotb/cocotb/commit/ba39c198b8375d972be25b8c964529b4146ee771"
---

### Implementation and scope

Coroutine scheduling, triggers and simulator bindings drive and observe HDL through an existing simulator. This is conventional Verification; externally AI-authored testbenches do not turn cocotb itself into a model-driven stage. It is neither an HDL execution engine nor DUT-generation software. [Project overview](#source-readme); [bridge implementation](#source-implementation).

### Reviewed activity

The September 30 change propagates cancellation to a waiting bridge thread and re-raises it in the wrapper task, with tests for explicit cancellation and end-of-test cleanup. This is a runtime-correctness checkpoint, distinct from nearby automated dependency/workflow updates. [Reviewed change](#source-activity-refresh).

### Current implementation and operating boundaries

The reviewed development delta separates bootstrap/GPI initialization and changes implementation-library naming and removed configuration APIs, alongside signedness and LogicArrayObject maintenance. Adoption needs version-specific build/API compatibility review. The simulator interaction remains conventional Verification. [Reviewed implementation integration](#source-review-20261011-1)

The review preserves existing Scope and development-provenance classifications. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.
