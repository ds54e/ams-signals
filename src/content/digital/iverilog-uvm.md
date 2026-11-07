---
name: "iverilog-uvm"
aliases: []
description: "Experimental Icarus-derived SystemVerilog simulator for UVM, constrained randomization, assertions, coverage and DPI-C, retaining the Verilog-1995 source translator. It runs implemented subsets of unmodified Accellera UVM; simulation and translation have documented gaps, and the maintainer warns against production or tapeout use."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The maintainer attributes the bulk of this fork’s SystemVerilog/UVM implementation to Claude, with human direction and review. The attribution covers the fork’s extensions to Icarus Verilog."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-10-01"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-07"
sources:
  - id: "code"
    title: "Canonical iverilog-uvm repository"
    url: "https://github.com/dsellerbrock/iverilog-uvm"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/9e065f35974dac54854bfd98ed2759852ff707e7/README.md"
  - id: "implementation"
    title: "Reviewed implementation: vvp/vthread.cc"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/9e065f35974dac54854bfd98ed2759852ff707e7/vvp/vthread.cc"
  - id: "activity"
    title: "Solve constraints jointly across random member objects (#258)"
    url: "https://github.com/dsellerbrock/iverilog-uvm/commit/b6cb9eea532826068a82600b87c3a91040969547"
  - id: "development-1"
    title: "Current maintainer development account"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/9e065f35974dac54854bfd98ed2759852ff707e7/README.md"
  - id: "development-2"
    title: "Spring implementation history"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/5ef72e85ef22c1fc3f3e93725f47412c508f2b10/docs/history/2026-05_phase_history_readme.md"
  - id: "activity-refresh"
    title: "Integrate VVP hot-path optimizations and parallel regression execution"
    url: "https://github.com/dsellerbrock/iverilog-uvm/commit/9e065f35974dac54854bfd98ed2759852ff707e7"
  - id: "translation"
    title: "Retained Verilog-1995 source translation and limitations"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/9e065f35974dac54854bfd98ed2759852ff707e7/Documentation/targets/tgt-vlog95.rst"
  - id: "translation-code"
    title: "Retained source generator in the fork"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/9e065f35974dac54854bfd98ed2759852ff707e7/tgt-vlog95/vlog95.c"
  - id: "build-targets"
    title: "Default build includes the vlog95 target"
    url: "https://github.com/dsellerbrock/iverilog-uvm/blob/9e065f35974dac54854bfd98ed2759852ff707e7/Makefile.in"
  - id: "activity-current"
    title: "Dynamic-array randomization and scoped class-call handling"
    url: "https://github.com/dsellerbrock/iverilog-uvm/commit/b4a296a1033b33755d0401cc8d971a0f15752b59"
  - id: review-20261103-implementation
    title: "Integrated SystemVerilog/UVM correctness train and tests"
    url: https://github.com/dsellerbrock/iverilog-uvm/commit/1d54995b84358de76b3494e8fbce63d4d6b17a96
  - id: review-20261107-implementation
    title: "Integrated nested-object constraint handling and regression fixtures"
    url: https://github.com/dsellerbrock/iverilog-uvm/commit/43abd12b5fc66513f6177d20f4a531c5e12b96ae
  - id: review-20261107-retained
    title: "Retained nested-object dynamic-array regression fixture"
    url: https://github.com/dsellerbrock/iverilog-uvm/blob/43abd12b5fc66513f6177d20f4a531c5e12b96ae/ivtest/ivltests/issue2602_nested_object_dynamic_array2_body.vh
---

### Implementation and scope

Simulation, UVM behavior, assertions, constrained randomization and coverage are conventional Verification. Z3 solves randomization constraints; it is not a hardware formal proof engine. The fork also retains the documented vlog95 source translator and includes it in the default build: that exposed source transformation supports conventional Design. Parser work and the native-code feasibility experiment do not establish logic Synthesis. [Current features and limits](#source-readme); [translation contract](#source-translation); [source generator](#source-translation-code); [build integration](#source-build-targets).

### Release boundary and reviewed activity

The fork is experimental, has not been endorsed by upstream Icarus and is explicitly unsuitable for production/tapeout decisions. Passing selected OpenTitan/UVM workloads does not establish full standards or application compatibility. The September 29 merge integrates VVP hot-path changes, four-state bitwise regressions and parallel regression execution; its separately stored native-code spike is not an enabled backend. [Reviewed merge](#source-activity-refresh); [runtime implementation](#source-implementation).

### Development provenance review

Reviewed 2026-10-01: **AI-BUILT**. The maintainer explicitly calls this fork largely AI-written and attributes much of its SystemVerilog/UVM implementation to Claude under human direction and review. This characterizes the fork's defining extension effort, without transferring authorship to upstream Icarus or claiming runtime AI. [Current maintainer account](#source-development-1); [historical extension account](#source-development-2).

### Current activity review

Reviewed 2026-10-05. The elaborator adds two-dimensional dynamic-array randomization handling and preserves scoped class-method resolution, with technical regression evidence. Existing UVM compatibility remains workload-specific rather than complete language compliance. [Reviewed change](#source-activity-current).

### Selection and current source review

The November 3 first-parent train integrates numeric clocking-input skew initialization, recursive array-pattern defaults, object naming and string-property indexing corrections, plus executable regression fixtures. These are sustained correctness/verification improvements rather than evidence of complete IEEE/UVM compliance. No simulator or production qualification campaign was independently run. The experimental-use warning, exposed vlog95 Design operation and independently attributed AI-built fork extensions remain unchanged. [Implementation and regression evidence](#source-review-20261103-implementation).

### November implementation review

The November 7 integration adds nested rand-object dynamic-array constraint lowering and runtime size/element handling, with paired 2017/2023 regression fixtures checking direct references, foreach constraints, contradictory constraints and null handles. This supports continued technical maintenance, not complete SystemVerilog/UVM compliance. The experimental/tapeout warning, conventional Design/Verification classification and separately attributed AI-built development remain unchanged. No simulator runs were performed. [Implementation and regression evidence](#source-review-20261107-implementation) · [Retained fixture](#source-review-20261107-retained).
