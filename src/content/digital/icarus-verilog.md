---
name: "Icarus Verilog"
aliases: []
roles: ["eda-tool"]
ai: "traditional"
description: "Verilog compiler and event-driven simulator supporting a SystemVerilog subset, VVP execution and VPI extensions for testbenches and external tools."
flow: {"verification":"core"}
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


### Classification

Tracked as the established Icarus project. Its identity and activity are separate from the UVM-focused derivative. [Reviewed source](#source-readme).

### Release boundary

SystemVerilog support remains a subset; the source does not support describing upstream Icarus as the full UVM extension. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Verilog/SystemVerilog simulation through the compiler and VVP runtime is the reviewed public use. Internal compilation and elaboration do not independently establish a circuit-design or logic-synthesis flow. [Reviewed source](#source-readme).
