---
name: "xezim"
aliases: ["sisSIM"]
description: "Rust SystemVerilog simulator for RTL, gate-level and UVM verification, with constrained randomization, coverage, DPI/VPI, SDF timing and optional native compilation. It also supports a UPF power-aware simulation subset and resolved real-number nets, including tested Verilog-AMS `wreal`, without a general analog solver."
scope:
  verification:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The maintainer describes AI agents implementing the parser, elaboration and event-driven simulation core through iterative coding and testing. The repository presents AI-assisted construction of core EDA software as its development premise."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical xezim repository"
    url: "https://github.com/aionhw/xezim"
    purpose: "code"
  - id: "readme"
    title: "README at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/compiler/simulator.rs at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/src/compiler/simulator.rs"
  - id: "activity"
    title: "xezim 0.11.0 release commit"
    url: "https://github.com/aionhw/xezim/commit/6558a1e64e251cbd8d0c4e936860af268cf7e04f"
  - id: "release-0-11-0"
    title: "xezim 0.11.0 release"
    url: "https://github.com/aionhw/xezim/releases/tag/0.11.0"
  - id: "coverage-0-11-0"
    title: "Coverage guide at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/docs/coverage-guide.md"
  - id: "wreal-0-11-0"
    title: "Verilog-AMS wreal compliance test at xezim 0.11.0"
    url: "https://github.com/aionhw/xezim/blob/6558a1e64e251cbd8d0c4e936860af268cf7e04f/tests/sv_compliance/tests_advanced/50_wreal_nets.sv"
  - id: "development-1"
    title: "Project premise"
    url: "https://github.com/aionhw/xezim/blob/409bc7724a130a6fa6052d663dfc97db113cae3e/README.md"
  - id: "development-2"
    title: "Maintainer account"
    url: "https://www.linkedin.com/posts/bondan-rufen_from-skeptic-to-believer-building-xezim-activity-7475570954924978176-DaAy"
  - id: "activity-refresh"
    title: "Latest reviewed meaningful implementation update in the current activity snapshot"
    url: "https://github.com/aionhw/xezim/commit/6558a1e64e251cbd8d0c4e936860af268cf7e04f"
  - id: "readme-current"
    title: "README at the October 1 implementation revision"
    url: "https://github.com/aionhw/xezim/blob/2fdc4c36f282088c04dbe66fae211f55ee9a44e4/README.md"
  - id: "upf-current"
    title: "Implemented UPF subset and limitations"
    url: "https://github.com/aionhw/xezim/blob/2fdc4c36f282088c04dbe66fae211f55ee9a44e4/docs/upf-guide.md"
  - id: "notes-current"
    title: "Post-0.11 correctness and performance notes"
    url: "https://github.com/aionhw/xezim/blob/2fdc4c36f282088c04dbe66fae211f55ee9a44e4/NOTES.md"
  - id: "activity-october"
    title: "Correct two-state stores from JIT code"
    url: "https://github.com/aionhw/xezim/commit/2fdc4c36f282088c04dbe66fae211f55ee9a44e4"
---


### Implementation context

xezim 0.11.0 documents built-in UVM DPI, broader constrained-random solving, functional and assertion coverage, opt-in statement/branch/toggle code coverage, specify timing checks and SDF `TIMINGCHECK` annotation. These are simulator features rather than separate design or synthesis stages. [0.11.0 release](#source-release-0-11-0); [Coverage guide](#source-coverage-0-11-0).

The authors explicitly describe AI agents as first-class contributors to the simulator implementation. This describes the development process, independently of whether a user runs an AI agent. [Reviewed source](#source-readme).

### RNM boundary

The 0.11.0 tree includes a Verilog-AMS `wreal` compliance test covering fractional real values, summed multi-driver resolution, signed contributions and module-port propagation. The README also documents user-defined nettypes with resolution functions. These are useful real-number-modeling primitives, but they do not establish a general Verilog-AMS analog solver. [wreal test](#source-wreal-0-11-0); [Reviewed source](#source-readme).

### Release boundary

Release 0.11.0 and the subsequent October 1 main-branch implementation were reviewed. Later correctness/performance changes remain marked unreleased in the project notes and are not presented as a new numbered release. UVM and language conformance reports describe tested cases and workloads, not complete IEEE compliance. The xezim-core dependency is not a second activity repository. [0.11.0 release](#source-release-0-11-0); [Current notes](#source-notes-current); [Meaningful implementation update](#source-activity-october).

[Implementation inspected](#source-implementation).

### Scope classification

SystemVerilog execution, UVM, randomization, coverage, timing checks and RNM-oriented net semantics remain Verification capabilities. Internal bytecode/native compilation and elaboration serve verification, not a separate Design or Synthesis stage. [Reviewed source](#source-readme).

SystemVerilog execution is conventional Verification. The authors identify AI agents as first-class core implementation contributors, giving AI-built provenance rather than AI Verification. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-BUILT**. The repository frames AI-assisted core-EDA construction as its premise, and the maintainer’s construction account describes agent-written parser, elaboration and event-driven/four-state simulator work. Together these establish a major implementation role in the defining core. [Project premise](#source-development-1); [Maintainer account](#source-development-2).

### Power-aware and post-release verification

The current UPF path models supply states/voltage, switches, powered-down domain corruption, output isolation and retained values. It is explicitly a subset: level shifters are transparent, power-state-table legality and retention save/restore timing are not modeled, and several parsed commands have no runtime effect. These are Verification semantics, not physical power-grid design or a continuous electrical solver. [UPF guide](#source-upf-current).

The reviewed main branch also documents cocotb integration, FST output, cache/native/JIT execution and post-release fixes for DPI failures, class/struct access, virtual interfaces, memory sensitivity and two-state JIT stores. Performance comparisons remain maintainer-reported, workload-specific results; the catalog does not claim blanket speed superiority. [Current README](#source-readme-current); [Post-release notes](#source-notes-current); [JIT correctness commit](#source-activity-october).
