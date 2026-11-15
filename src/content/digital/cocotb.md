---
name: "cocotb"
aliases: []
description: "Python coroutine-based verification framework for driving and observing Verilog, SystemVerilog and VHDL designs in HDL simulators. The 2.1 release adds managed concurrent tasks and an experimental pytest regression plugin with fixtures and test selection; simulation still executes in a separately installed HDL simulator."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-credited correction changes the executable nox release backport tool to find consumed newsfragments from the release branch fork point. The correction remains in current code."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "BSD-3-Clause Python/C++ source and versioned releases; requires a supported external HDL simulator and compatible Python/native build setup. The 2.1 pytest plugin is opt-in and its API is experimental."
addedAt: "2026-09-05"
reviewedAt: "2026-11-15"
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
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/cocotb/cocotb/commit/46125f43a9e4d5d887f807d38d2000416ad16975"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/cocotb/cocotb/blob/ae55ced614b3f4ba89d77da5bd635024546d0737/noxfile.py"
  - id: interface-references
    title: Development-branch VPI interface and modport reference resolution
    url: https://github.com/cocotb/cocotb/commit/29cb070b39acbdc7b7a827324527c02524bb7c33
  - id: "packed-struct-range"
    title: "November 9 VPI packed-struct and union range correctness repair"
    url: "https://github.com/cocotb/cocotb/commit/eb4127b0a03b8754e53c98b64ae3178f1621888f"
  - id: "packed-struct-retained"
    title: "Retained VPI range handling at the reviewed master head"
    url: "https://github.com/cocotb/cocotb/blob/c25699e8209edebf1e2b009698c759c62d6bca92/src/cocotb/share/lib/gpi/vpi/VpiSignal.cpp"
  - id: "license"
    title: "cocotb BSD three-clause license"
    url: "https://github.com/cocotb/cocotb/blob/c25699e8209edebf1e2b009698c759c62d6bca92/LICENSE"
---

### Implementation and scope

Coroutine scheduling, triggers and simulator bindings drive and observe HDL through an existing simulator. This is conventional Verification; externally AI-authored testbenches do not turn cocotb itself into a model-driven stage. It is neither an HDL execution engine nor DUT-generation software. [Project overview](#source-readme); [bridge implementation](#source-implementation).

### Reviewed activity

The September 30 change propagates cancellation to a waiting bridge thread and re-raises it in the wrapper task, with tests for explicit cancellation and end-of-test cleanup. This is a runtime-correctness checkpoint, distinct from nearby automated dependency/workflow updates. [Reviewed change](#source-activity-refresh).

### Released regression management

The October 15, 2026 release/source review did not recapture repository history. The November 15 review below uses a separate, later repository capture.

Version 2.1.0 was published August 30, 2026. Its TaskManager runs child awaitables concurrently, waits for cleanup and propagates grouped errors; failure normally cancels sibling tasks unless continuation is configured. The opt-in pytest plugin provides HDL build/run fixtures, test collection and selection, and regression reporting. Its API is explicitly experimental and expected to change. These released operations support conventional Verification. [Release notes](#source-release-2-1) · [TaskManager implementation](#source-task-manager) · [Plugin implementation](#source-pytest-plugin) · [Setup and limits](#source-pytest-guide)

### Development-branch correctness and compatibility

The reviewed development delta separates bootstrap/GPI initialization and changes implementation-library naming and removed configuration APIs, alongside signedness and LogicArrayObject maintenance. Adoption needs version-specific build/API compatibility review. [Reviewed implementation integration](#source-review-20261011-1)

The October 14 VPI fix adds destructors that release owned array, object and signal handles, while preserving borrowed handles for multidimensional-array pseudo-handles and generate pseudo-regions. This targets leaks during repeated object lookup; it is development-branch implementation evidence, not a claim that the fix shipped in 2.1.0 or a measured memory/performance result. The simulator interaction remains conventional Verification. [Ownership fix](#source-vpi-handle-ownership)

The October 19 development-branch change resolves SystemVerilog interface and modport references through VPI handles. The change includes Verilator and Xcelium coverage; Verilator versions below 5.053 retain an expected-failure caveat. This is unreleased development work, not a 2.1.0 feature, and preserves cocotb's conventional Verification classification. [Interface-reference change](#source-interface-references)

The November 15 review reconfirmed v2.1.0 as the latest release and inspected the November 9 VPI repair. Packed structs/unions no longer use direct left/right range queries that can return invalid bounds in Questa; packed arrays of those types still obtain dimensions through vpiRange for VCS compatibility. The implementation remains at the pinned master head. This is a development-branch correctness checkpoint beyond v2.1.0; simulator results in the commit are maintainer-reported and were not independently reproduced. Later README, dependency and CI changes affect raw activity without automatically advancing this checkpoint. [Repair and reported checks](#source-packed-struct-range) · [Retained implementation](#source-packed-struct-retained) · [Released version](#source-release-2-1)

The repository license is BSD-3-Clause. External simulators retain their own installation, compatibility and licensing requirements. [License](#source-license)

### Development provenance

A Claude-credited correction changes the executable nox release backport tool to find consumed newsfragments from the release branch fork point. The correction remains in current code. This supports AI-assisted development. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
