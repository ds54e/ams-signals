---
name: "iverilog-uvm"
aliases: []
description: "Experimental Icarus-derived SystemVerilog simulator extending UVM, constrained randomization, assertions, functional coverage and DPI-C support. Development uses Claude under human review, with conformance tests tracking behavior against the unmodified Accellera library and language standards."
scope:
  verification:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The maintainer attributes the bulk of this fork’s SystemVerilog/UVM implementation to Claude, with human direction and review. The attribution covers the fork’s extensions to Icarus Verilog."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-09-07"
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
  - id: "development-1"
    title: "Current maintainer development account"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/49505f514ca2729d597d4a2d7347fd639a1209a3/README.md"
  - id: "development-2"
    title: "Spring implementation history"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/5ef72e85ef22c1fc3f3e93725f47412c508f2b10/docs/history/2026-05_phase_history_readme.md"
---


### Implementation context

The canonical README explicitly credits Claude with much of the SystemVerilog/UVM implementation, under human direction and review. [Reviewed source](#source-readme).

### Release boundary

Although derived from Icarus, the canonical public repository is not flagged as a GitHub fork. Verification scope covers the implemented testbench features; the formal proof engine remains planned. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

UVM, assertions, randomization, coverage and simulation are verification capabilities. Parser and future proof-engine work do not create separate Design or Synthesis scope. [Reviewed source](#source-readme).

Runtime simulation and verification-language features are conventional Verification. Explicit author credit for Claude developing much of the core extension under human review justifies AI-built, independently of runtime behavior. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-BUILT**. The maintainer explicitly attributes the bulk of the fork’s SystemVerilog/UVM work to Claude under human direction and review. Current and historical implementation accounts corroborate that defining extension effort. [Current maintainer development account](#source-development-1); [Spring implementation history](#source-development-2).
