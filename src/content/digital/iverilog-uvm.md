---
name: "iverilog-uvm"
aliases: []
roles: ["eda-tool"]
ai: "ai-built"
description: "Icarus-derived simulator extending SystemVerilog verification with UVM, constrained randomization, assertions, functional coverage and DPI-C."
flow: {"verification":"core"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical iverilog-uvm repository"
    url: "https://github.com/dsellerbrock/iverilog-uvm"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/b6cb9eea532826068a82600b87c3a91040969547/README.md"
  - id: "implementation"
    title: "Reviewed implementation: vvp/class_type.cc"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/b6cb9eea532826068a82600b87c3a91040969547/vvp/class_type.cc"
  - id: "activity"
    title: "Solve constraints jointly across random member objects (#258)"
    url: "https://github.com/dsellerbrock/iverilog-uvm/commit/b6cb9eea532826068a82600b87c3a91040969547"
---


### Classification

The canonical README explicitly credits Claude with much of the SystemVerilog/UVM implementation, under human direction and review. [Reviewed source](#source-readme).

### Release boundary

Although derived from Icarus, the canonical public repository is not flagged as a GitHub fork. Formal/Verify denotes verification features here, not the planned formal proof engine. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

UVM, assertions, randomization, coverage and simulation are verification capabilities. Parser and future proof-engine work do not create separate Design or Synthesis scope. [Reviewed source](#source-readme).
