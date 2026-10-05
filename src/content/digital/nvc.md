---
name: "NVC"
aliases: []
description: "VHDL compiler and simulator using LLVM-generated native code, with waveform output and integration with OSVVM, UVVM, VUnit and cocotb. It targets VHDL-2008 simulation, with a documented VHPI subset and experimental Verilog/VHDL-2019 support; native compilation does not provide logic synthesis."
scope:
  verification:
    ai: false
access: "Public GPL-3.0-or-later source and packaged binaries; source builds require LLVM and documented native dependencies."
addedAt: "2026-10-05"
reviewedAt: "2026-10-05"
sources:
  - id: "site"
    title: "Official NVC documentation and releases"
    url: "https://www.nickg.me.uk/nvc/"
    purpose: "official"
  - id: "code"
    title: "Canonical NVC implementation"
    url: "https://github.com/nickg/nvc"
    purpose: "code"
  - id: "readme"
    title: "Reviewed simulation capabilities and language boundaries"
    url: "https://github.com/nickg/nvc/blob/abdccc7038225dd19b5b4ab45feaf8ab5002fc4b/README.md"
  - id: "implementation"
    title: "Event-driven runtime model"
    url: "https://github.com/nickg/nvc/blob/abdccc7038225dd19b5b4ab45feaf8ab5002fc4b/src/rt/model.c"
  - id: "activity"
    title: "Pass ports as arguments to inertial actual processes"
    url: "https://github.com/nickg/nvc/commit/abdccc7038225dd19b5b4ab45feaf8ab5002fc4b"
---

### Implementation and scope

Analysis, elaboration and LLVM compilation prepare native simulation. The public runtime schedules processes, drivers and timeouts; foreign interfaces and verification-library integrations support testbench execution. These are conventional Verification operations, not hardware synthesis or a separate design-generation stage. [Project boundaries](#source-readme); [runtime implementation](#source-implementation).

VHDL-2008 support excludes PSL, and Verilog/VHDL-2019 support is experimental. The reviewed VHPI subset is intended to support integrations such as cocotb; it is not a complete foreign-interface conformance claim. No runtime AI or qualifying development provenance is established by the inspected sources. [Language and interface status](#source-readme).

### Reviewed public activity

The canonical master branch has complete first-parent history. The September 23 UTC lowering change passes the mapped port as a process argument for inertial actuals, replacing implicit parent-port access. [Reviewed implementation change](#source-activity).
