---
name: "dau-sim"
aliases: ["DAU simulator"]
description: "Cycle-accurate Python digital simulator mapping supported SystemVerilog and Amaranth RTL into CSP time-series computations, with a separate pure-Python cocotb backend. Includes VCD export and a Verilator-based cocotb launcher for comparison; the SystemVerilog frontend and simulator hooks implement restricted subsets."
scope:
  verification: { ai: false }
access: "Apache-2.0 Python source, Python 3.11 or newer; native CSP availability varies by platform. The external cocotb/Verilator integration requires its respective tools."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/dau-dev/dau-sim"
    purpose: code
  - id: readme
    title: "Project overview and operating boundaries"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/README.md"
  - id: activity
    title: "Reviewed meaningful implementation checkpoint"
    url: "https://github.com/dau-dev/dau-sim/commit/b9ce73a2160fec5304fd7771508bdbede1596ef8"
  - id: frontend
    title: "Retained pyslang frontend implementation"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/dau_sim/frontends/pyslang_frontend.py"
  - id: frontend-tests
    title: "Retained SystemVerilog frontend tests"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/dau_sim/tests/test_frontend_sv.py"
  - id: backend
    title: "Pure-Python cocotb backend implementation"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/dau_sim/backends/cocotb_backend.py"
  - id: backend-docs
    title: "Cocotb semantics and backend limitations"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/docs/src/cocotb.md"
  - id: earlier
    title: "October signed arithmetic and test infrastructure corrections"
    url: "https://github.com/dau-dev/dau-sim/commit/f5f124b8d79fa561bcbd15435f0c0fa4b10228f3"
  - id: metadata
    title: "November compiler and backend metadata changes"
    url: "https://github.com/dau-dev/dau-sim/commit/4a2d66649dd463edc25721b79541c9481fbee8e0"
  - id: launcher
    title: "Retained separate cocotb-on-Verilator launcher"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/dau_sim/integrations/cocotb.py"
  - id: launcher-tests
    title: "Retained waveform and testcase selection regressions"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/dau_sim/tests/test_ready_valid_sum_cocotb.py"
  - id: package
    title: "Package metadata and dependencies"
    url: "https://github.com/dau-dev/dau-sim/blob/445092d91404652136ea5f45db8cb1ddecf69dad/pyproject.toml"
---

## Implementation and selection

The pyslang frontend lowers supported RTL into the simulator's IR; the compiler maps clocked and combinational computations onto CSP streams. The retained frontend tests include port, expression and clock-domain extraction. A separate Python cocotb backend implements the supported handle and trigger interfaces against the IR evaluation engine. October's integrated signed-arithmetic and code-generation corrections, November compiler metadata changes, and the November 23 launcher waveform and testcase-selection integration demonstrate continued executable development. [Frontend](#source-frontend) · [Frontend tests](#source-frontend-tests) · [Backend](#source-backend) · [Earlier correction](#source-earlier) · [Metadata integration](#source-metadata) · [Latest implementation](#source-activity).

## Limits

The external launcher builds RTL with Verilator; its tests verify that launch path, not the native CSP engine. The pure-Python backend is distinct and documents restrictions on simulator-specific VPI access and force/release. The pyslang frontend rejects unsupported expressions/statements and unknown-bit parameter constants; a general four-state event-driven SystemVerilog or UVM implementation is not established. Package metadata identifies an alpha implementation and notes CSP dependency availability on Linux ARM. Upstream tests were inspected but not independently run. [Backend limitations](#source-backend-docs) · [External launcher](#source-launcher) · [Launcher regressions](#source-launcher-tests) · [Package metadata](#source-package).
