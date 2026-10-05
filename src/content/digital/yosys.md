---
name: "Yosys"
aliases: []
description: "RTL synthesis framework for logic optimization and FPGA/ASIC technology mapping, with Verilog support and integrated sv-elab/slang SystemVerilog lowering. Scripts compose reusable passes, while SAT, equivalence and formal-model operations support direct checks and verification drivers such as SymbiYosys and EQY."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-05"
sources:
  - id: "code"
    title: "Canonical Yosys repository"
    url: "https://github.com/YosysHQ/yosys"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/YosysHQ/yosys/blob/53f1cdd34cbcd4784209827dc6c6183705eca126/README.md"
  - id: "implementation"
    title: "Reviewed implementation: techlibs/common/synth.cc"
    url: "https://github.com/YosysHQ/yosys/blob/435977e97008578a4532da60e70f75b5e88d076d/techlibs/common/synth.cc"
  - id: "activity"
    title: "Merge pull request #6176 from YosysHQ/nella/cell-rank"
    url: "https://github.com/YosysHQ/yosys/commit/435977e97008578a4532da60e70f75b5e88d076d"
  - id: "website"
    title: "Official project documentation"
    url: "https://yosyshq.readthedocs.io/projects/yosys/"
    purpose: "official"
  - id: "activity-refresh"
    title: "Preserve signedness in shift-add peephole optimization"
    url: "https://github.com/YosysHQ/yosys/commit/53f1cdd34cbcd4784209827dc6c6183705eca126"
  - id: "formal"
    title: "Yosys equivalence-miter construction implementation"
    url: "https://github.com/YosysHQ/yosys/blob/53f1cdd34cbcd4784209827dc6c6183705eca126/passes/equiv/equiv_make.cc"
  - id: "activity-current"
    title: "Portable Python-wheel toolchain and pkg-config handling"
    url: "https://github.com/YosysHQ/yosys/commit/0e8336b4e2659efb40c2b8751c7619f69c358137"
---

### Implementation context

Yosys parses and lowers supported RTL, composes optimization and technology-mapping passes, and emits synthesized representations. The current source integrates sv-elab/slang for a synthesizable SystemVerilog subset. Formal passes can construct equivalence problems and solver-facing models; complete multi-engine proof orchestration is commonly supplied by SBY or EQY. [Project overview](#source-readme); [equivalence implementation](#source-formal).

### Release boundary

Reviewed October 1, 2026 at `53f1cdd34cbcd4784209827dc6c6183705eca126`. The September 30 first-parent merge repairs shift-add peephole matching so shift-operand signedness agrees with the add/subtract operation. The current README documents integrated sv-elab/slang support for a synthesizable SystemVerilog subset, rather than complete language compatibility. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

RTL optimization and technology mapping are synthesis operations. Formal transformations and solver-facing primitives support verification; full proof flows are usually orchestrated by separate drivers. [Reviewed source](#source-readme).

RTL optimization/mapping and formal primitives execute conventionally. Their use inside an agent loop does not make upstream Yosys AI Synthesis. [AI/stage evidence](#source-readme).

### Current activity review

Reviewed 2026-10-05. Python-wheel builds resolve missing or incompatible Bison/Flex toolchains and pkg-config handling across supported platforms, with a local build harness. This is substantive installation/build support rather than a new synthesis algorithm. [Reviewed change](#source-activity-current).
