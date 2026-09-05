---
name: "Icarus Verilog"
aliases: []
primary: "simulation"
ai: "traditional"
description: "Verilog compiler and event-driven simulator supporting a SystemVerilog subset, VVP execution and VPI extensions for testbenches and external tools."
keywords: ["Verilog", "SystemVerilog", "event simulation", "VPI"]
areas:
  simulation: core
  frontend-synthesis: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Icarus Verilog repository"
    url: "https://github.com/steveicarus/iverilog"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/steveicarus/iverilog/blob/5ab23063fe15bae91f8453e5f50a35cb03ea3206/README.md"
  - id: "implementation"
    title: "Reviewed implementation: vvp/schedule.cc"
    url: "https://github.com/steveicarus/iverilog/blob/5ab23063fe15bae91f8453e5f50a35cb03ea3206/vvp/schedule.cc"
  - id: "activity"
    title: "Merge pull request #1412 from drewbabel/fix-countones-vpi-buffer"
    url: "https://github.com/steveicarus/iverilog/commit/5ab23063fe15bae91f8453e5f50a35cb03ea3206"
  - id: "website"
    title: "Official project documentation"
    url: "https://steveicarus.github.io/iverilog/"
    purpose: "official"
---

### Scope

The compiler elaborates designs into the VVP runtime representation; VPI provides simulation integration. [Project documentation](#source-readme).

### Classification

Tracked as the established Icarus project. Its identity and activity are separate from the UVM-focused derivative. [Reviewed source](#source-readme).

### Release boundary

SystemVerilog support remains a subset; the source does not support describing upstream Icarus as the full UVM extension. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
