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
reviewedAt: "2026-10-01"
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
---

### Implementation and scope

Simulation, UVM behavior, assertions, constrained randomization and coverage are conventional Verification. Z3 solves randomization constraints; it is not a hardware formal proof engine. The fork also retains the documented vlog95 source translator and includes it in the default build: that exposed source transformation supports conventional Design. Parser work and the native-code feasibility experiment do not establish logic Synthesis. [Current features and limits](#source-readme); [translation contract](#source-translation); [source generator](#source-translation-code); [build integration](#source-build-targets).

### Release boundary and reviewed activity

The fork is experimental, has not been endorsed by upstream Icarus and is explicitly unsuitable for production/tapeout decisions. Passing selected OpenTitan/UVM workloads does not establish full standards or application compatibility. The September 29 merge integrates VVP hot-path changes, four-state bitwise regressions and parallel regression execution; its separately stored native-code spike is not an enabled backend. [Reviewed merge](#source-activity-refresh); [runtime implementation](#source-implementation).

### Development provenance review

Reviewed 2026-10-01: **AI-BUILT**. The maintainer explicitly calls this fork largely AI-written and attributes much of its SystemVerilog/UVM implementation to Claude under human direction and review. This characterizes the fork's defining extension effort, without transferring authorship to upstream Icarus or claiming runtime AI. [Current maintainer account](#source-development-1); [historical extension account](#source-development-2).
