---
name: "OpenVAF-Reloaded"
aliases: []
summary: "Compiles Verilog-A device models into OSDI shared libraries."
description: "Community-maintained Verilog-A compiler that produces OSDI shared libraries for SPICE-class simulators. Extending the original OpenVAF, it fixes model-compilation issues and develops the OSDI 0.4 interface; numerical circuit analysis runs in a compatible host simulator."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude- and Cursor-credited development implemented VAMS-2023 named events and jump statements across compiler representation, validation and lowering. The current lowering code retains these language-support paths."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
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
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/commit/ca099d237471a99623ab4b97d899928b317f3e34"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/commit/ef6436dc4e73b5f97a23cfc40546701bfc287961"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/OpenVAF/OpenVAF-Reloaded/blob/fdf2522b70f42793f64b1c72f0195c96dea0cc19/openvaf/hir_lower/src/stmt.rs"
---

### Scope

Compiles Verilog-A models into dynamic libraries implementing the OSDI simulator API. The delivered model libraries serve Simulation; electrical execution occurs in the host simulator. [Compiler documentation](#source-readme) and [OSDI header](#source-interface).

### Release boundary

The verified default branch is mob, despite older master wording in the README. The maintained compiler exposes OSDI 0.4; the legacy OSDI 0.3 branch is documented as unmaintained. Simulator compatibility and available OSDI features are separate from compiler generation. [Interface boundary](#source-readme).

### Scope classification

The compiler turns Verilog-A models into OSDI libraries consumed by simulators. The compiled simulation models are the user-facing deliverable; the host simulator executes electrical analyses. [Reviewed source](#source-readme).

Verilog-A-to-OSDI compilation enables numerical simulation in a host tool. This compiler path does not use reviewed AI inference. [AI/stage evidence](#source-readme).

### Development provenance

Named-event declaration/trigger/detection and break/continue/return support span syntax, HIR, semantic diagnostics and control-flow lowering, with compiler/OSDI regression fixtures. This is substantial language implementation within OpenVAF-Reloaded; attribution is not borrowed from the separately cataloged ngspice/OpenVAF enhancement repository. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)
