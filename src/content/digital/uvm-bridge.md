---
name: uvm_bridge
description: Bridges Python test code to a SystemVerilog UVM environment through DPI-C, exposing UVM configuration and test operations without recompiling Python scenarios. The public svuvm binding and simulator compatibility tests support mixed Python/UVM workflows; a suitable simulator and UVM library remain required.
scope:
  verification:
    ai: false
access: Public Python/C++/SystemVerilog implementation; simulator, UVM version and DPI/VPI support determine compatibility.
addedAt: '2026-10-18'
reviewedAt: "2026-11-28"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/Dragon-Git/uvm_bridge
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/Dragon-Git/uvm_bridge/blob/b178c9ace130cdf448625a44f356491fd60823c4/README.md
- id: activity
  title: 'test: run the UVM compatibility matrix under pytest'
  url: https://github.com/Dragon-Git/uvm_bridge/commit/2ac3b4656f6cab28b7bcc9781b64e7c89c3a6dca
- id: implementation-1
  title: 'Released implementation: src/svuvm/svuvm.cpp'
  url: https://github.com/Dragon-Git/uvm_bridge/blob/b178c9ace130cdf448625a44f356491fd60823c4/src/svuvm/svuvm.cpp
- id: implementation-2
  title: 'Released implementation: test/uvm_compat/test_compat.py'
  url: https://github.com/Dragon-Git/uvm_bridge/blob/b178c9ace130cdf448625a44f356491fd60823c4/test/uvm_compat/test_compat.py
- id: suspendable-dpi
  title: "November 13 suspendable DPI task integration"
  url: "https://github.com/Dragon-Git/uvm_bridge/commit/7c2ecc518bacf1598821c214fcb5484cb7a16663"
- id: dpi-retained
  title: "Retained Python GIL handling and DPI entry points"
  url: "https://github.com/Dragon-Git/uvm_bridge/blob/6882e7142c5391d830d5a7d84a57c457b71cfc22/src/svuvm/svuvm.cpp"
- id: vpi-tests
  title: "November 19 VPI compatibility test expansion"
  url: "https://github.com/Dragon-Git/uvm_bridge/commit/6882e7142c5391d830d5a7d84a57c457b71cfc22"
- id: vpi-probes
  title: "Retained VPI probes and skip handling"
  url: "https://github.com/Dragon-Git/uvm_bridge/blob/6882e7142c5391d830d5a7d84a57c457b71cfc22/test/base_test/base_test.py"
- id: review-20261128-activity
  title: "November 25 capability probing and bridge robustness corrections"
  url: "https://github.com/Dragon-Git/uvm_bridge/commit/bc7f7cb18de270c52e309341a826c4fc9508071a"
- id: review-20261128-vpi
  title: "November 24 VPI value, time and callback regressions"
  url: "https://github.com/Dragon-Git/uvm_bridge/commit/a622764e8991ccca9c0cc5d859283870f8da559b"
- id: review-20261128-capabilities
  title: "Retained symbol and time API probing"
  url: "https://github.com/Dragon-Git/uvm_bridge/blob/34c501606971f056cca60431b7ecd84789c41e6a/src/svuvm/simulator_capabilities.cpp"
- id: review-20261128-ci
  title: "November 26 cocotb backend and Xezim runner contract test integration"
  url: "https://github.com/Dragon-Git/uvm_bridge/commit/28cd000450689f551e83483cdd8994c4cc0e5d37"
---

### Implementation and boundaries

The binding implements reusable interaction with UVM rather than a single protocol verification example. The selected compatibility-matrix tests exercise real simulator/library combinations and qualify as technical maintenance. Later CI-only build dispatches are not the freshness basis. Foreign-language interoperability is conventional Verification, not runtime AI. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The earlier meaningful checkpoint was `2ac3b4656f6cab28b7bcc9781b64e7c89c3a6dca` (2026-10-16 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Reviewed implementation update, November 25, 2026

November 13 restores time-consuming exported UVM operations on sufficiently recent Verilator builds using suspendable DPI tasks. The bridge separates function-phase and task entry points and releases the Python GIL across potentially suspending exported calls. Function-phase callbacks still cannot invoke time-consuming exports. November 19 extends VPI tests for control, callbacks, assertions and covergroup objects, probing or skipping unsupported simulator operations. The tests do not establish universal VPI compatibility. [DPI integration](#source-suspendable-dpi) · [Retained bridge](#source-dpi-retained) · [VPI tests](#source-vpi-tests) · [Probe behavior](#source-vpi-probes).

At the November 25 review the saved meaningful checkpoint was 2026-11-19 UTC. The source and retained tests were inspected, not independently executed.

### November 28, 2026 source review

November 24 extends value-format, NULL-handle global-time and callback checks, with backend-specific unsupported cases kept explicit. November 25 corrects native data-buffer handling, adds a simulator symbol capability observation layer and dispatches supported time APIs according to available symbols. Observation of a symbol alone does not establish correct simulator semantics. November 26 wires selected cocotb backends and a vendored Xezim runner contract test into CI. This maintains Python/UVM and VPI interoperability; it does not demonstrate complete VPI support or identical results across simulators. No upstream test run was independently reproduced. [VPI regression integration](#source-review-20261128-vpi) · [Bridge implementation](#source-review-20261128-activity) · [Retained probing](#source-review-20261128-capabilities) · [CI integration](#source-review-20261128-ci).
