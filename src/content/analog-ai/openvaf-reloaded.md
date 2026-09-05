---
name: "OpenVAF-Reloaded"
aliases: []
roles: ["eda-tool"]
summary: "Compiles Verilog-A device models into OSDI shared libraries."
description: "Community-maintained Verilog-A compiler that produces OSDI shared libraries for SPICE-class simulators, extending the original OpenVAF with compiler fixes and model-interface support."
keywords: ["Verilog-A", "OSDI", "Compiler", "Compact models"]
workflow:
  simulate-measure: supporting
  eda-integration: core
access: "Public Rust/LLVM compiler; generated libraries require a simulator implementing the matching OSDI interface."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/blob/fdf2522b70f42793f64b1c72f0195c96dea0cc19/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/commit/fdf2522b70f42793f64b1c72f0195c96dea0cc19"
  - id: "interface"
    title: "OSDI 0.4 interface at the reviewed revision"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/blob/fdf2522b70f42793f64b1c72f0195c96dea0cc19/openvaf/osdi/header/osdi_0_4.h"
---

### Scope

Compiles Verilog-A models into dynamic libraries implementing the OSDI simulator API. The compiler-to-simulator interface is core EDA Integration; Simulate / Measure is supporting because execution occurs in the host simulator. [Compiler documentation](#source-readme) and [OSDI header](#source-interface).

### Release boundary

The verified default branch is mob, despite older master wording in the README. The maintained compiler exposes OSDI 0.4; the legacy OSDI 0.3 branch is documented as unmaintained. Simulator compatibility and available OSDI features are separate from compiler generation. [Interface boundary](#source-readme).
