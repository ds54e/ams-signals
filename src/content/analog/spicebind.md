---
name: SpiceBind
summary: HDL-first mixed-signal co-simulation bridge embedding ngspice circuits in Verilog through VPI.
description: HDL-first mixed-signal co-simulation bridge embedding ngspice circuits in Verilog through VPI. A time barrier coordinates HDL events with adaptive analog steps, including step cuts or retries at intervening digital changes; the early implementation is tested upstream with Icarus Verilog and Verilator, while other simulators require qualification.
scope:
  simulation:
    ai: false
access: Public BSD-3-Clause C++/Python source; requires libngspice, a C++17 toolchain and a supported VPI simulator. Examples use Python/cocotb; Verilator needs a recent timing/VPI-capable build.
addedAt: '2026-10-31'
reviewedAt: '2026-10-31'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/themperek/spicebind
  purpose: code
- id: readme
  title: Reviewed project workflow and boundaries
  url: https://github.com/themperek/spicebind/blob/668b9a6a1b474f7b5181b5caed915e8d0a1505bd/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/themperek/spicebind/commit/fbeefee701ee8d1e03b88bbf9305b54de374ac87
- id: sync
  title: ngspice synchronization callbacks
  url: https://github.com/themperek/spicebind/blob/668b9a6a1b474f7b5181b5caed915e8d0a1505bd/cpp/NgSpiceCallbacks.cpp
- id: barrier
  title: Inter-engine timing barrier
  url: https://github.com/themperek/spicebind/blob/668b9a6a1b474f7b5181b5caed915e8d0a1505bd/cpp/TimeBarrier.h
---

### Mixed-signal execution

The VPI plugin binds selected HDL module instances to ngspice netlists, exchanges analog/digital values and coordinates two simulation engines. The September 9 synchronization implementation cuts proposed analog steps before XSPICE event processing, handles exact event boundaries and adds timing regressions. The bridge provides Simulation, without replacing the HDL testbench or claiming a complete Verilog-AMS language implementation. [Architecture](#source-readme) · [Synchronization implementation and tests](#source-activity) · [Callbacks](#source-sync).

### Access and evidence limits

Icarus Verilog and Verilator are the upstream-tested hosts; VPI compatibility alone does not qualify other simulators. The README's lock-step behavior is supported by the reviewed callback/barrier code and tests, but those external simulator tests were not independently reproduced here. The later talk-recording update is not the meaningful-activity basis. [Reviewed source](#source-code) · [Timing barrier](#source-barrier).
