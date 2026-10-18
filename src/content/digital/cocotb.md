---
name: "cocotb"
aliases: []
description: "Python coroutine-based verification framework for driving and observing Verilog, SystemVerilog and VHDL designs in HDL simulators. The 2.1 release adds managed concurrent tasks and an experimental pytest regression plugin with fixtures and test selection; simulation still executes in a separately installed HDL simulator."
scope:
  verification:
    ai: false
access: "Public Python/C++ source and versioned releases; requires a supported HDL simulator. The 2.1 pytest plugin is opt-in and its API is experimental."
addedAt: "2026-09-05"
reviewedAt: "2026-10-18"
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
  - id: "release-2-1"
    title: "cocotb 2.1.0 release notes, August 30, 2026"
    url: "https://docs.cocotb.org/en/v2.1.0/release_notes.html"
  - id: "task-manager"
    title: "Released TaskManager concurrency, cancellation and error propagation"
    url: "https://github.com/cocotb/cocotb/blob/e85fae957d5c93894740b164ea9cc6567015b954/src/cocotb/_task_manager.py"
  - id: "pytest-plugin"
    title: "Released pytest plugin collection, fixtures and simulator-runner integration"
    url: "https://github.com/cocotb/cocotb/blob/e85fae957d5c93894740b164ea9cc6567015b954/src/cocotb_tools/_pytest/plugin.py"
  - id: "pytest-guide"
    title: "Versioned pytest plugin setup and experimental API boundary"
    url: "https://github.com/cocotb/cocotb/blob/e85fae957d5c93894740b164ea9cc6567015b954/docs/source/pytest_plugin.rst"
  - id: "vpi-handle-ownership"
    title: "October 14 development-branch fix for VPI object-handle leaks"
    url: "https://github.com/cocotb/cocotb/commit/f323470a5c084856840ee632fd202c2ebc34bb33"
---

### Implementation and scope

Coroutine scheduling, triggers and simulator bindings drive and observe HDL through an existing simulator. This is conventional Verification; externally AI-authored testbenches do not turn cocotb itself into a model-driven stage. It is neither an HDL execution engine nor DUT-generation software. [Project overview](#source-readme); [bridge implementation](#source-implementation).

### Reviewed activity

The September 30 change propagates cancellation to a waiting bridge thread and re-raises it in the wrapper task, with tests for explicit cancellation and end-of-test cleanup. This is a runtime-correctness checkpoint, distinct from nearby automated dependency/workflow updates. [Reviewed change](#source-activity-refresh).

### Released regression management

Release and implementation sources were checked on 2026-10-15. The existing catalog/activity review remains paired with the 2026-10-11 snapshot; no new repository capture is implied.

Version 2.1.0 was published August 30, 2026. Its TaskManager runs child awaitables concurrently, waits for cleanup and propagates grouped errors; failure normally cancels sibling tasks unless continuation is configured. The opt-in pytest plugin provides HDL build/run fixtures, test collection and selection, and regression reporting. Its API is explicitly experimental and expected to change. These released operations support conventional Verification. [Release notes](#source-release-2-1) · [TaskManager implementation](#source-task-manager) · [Plugin implementation](#source-pytest-plugin) · [Setup and limits](#source-pytest-guide)

### Development-branch correctness and compatibility

The reviewed development delta separates bootstrap/GPI initialization and changes implementation-library naming and removed configuration APIs, alongside signedness and LogicArrayObject maintenance. Adoption needs version-specific build/API compatibility review. [Reviewed implementation integration](#source-review-20261011-1)

The October 14 VPI fix adds destructors that release owned array, object and signal handles, while preserving borrowed handles for multidimensional-array pseudo-handles and generate pseudo-regions. This targets leaks during repeated object lookup; it is development-branch implementation evidence, not a claim that the fix shipped in 2.1.0 or a measured memory/performance result. The simulator interaction remains conventional Verification. [Ownership fix](#source-vpi-handle-ownership)
