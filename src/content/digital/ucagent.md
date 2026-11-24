---
name: "UCAgent"
aliases: []
description: "Agent framework for hardware unit tests, coverage-driven verification and optional RTL development workflows. Its installable DesignWithPPA plugin generates or repairs Verilog/Chisel modules, checks them against shared Python reference tests, and iterates from fixed Yosys/OpenSTA pre-layout PPA measurements; model decisions, measurements and acceptance gates remain distinct."
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Copilot is co-credited for implementing workspace-bound path checks in the MiniWorkflow word-count example. The canonical executable example retains absolute-path rejection and real-path containment checks."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public implementation with direct model and external coding-agent backends. The optional DesignWithPPA plugin has separate installation and needs picker, Yosys, OpenSTA and a selected Liberty library; Chisel mode additionally needs its documented JDK/Mill toolchain."
addedAt: "2026-09-05"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical UCAgent repository"
    url: "https://github.com/XS-MLVP/UCAgent"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/XS-MLVP/UCAgent/blob/7607e05b287c9349c394534f75bdfeddd01ed02a/README.en.md"
  - id: "implementation"
    title: "Implemented model and tool-calling backend"
    url: "https://github.com/XS-MLVP/UCAgent/blob/7607e05b287c9349c394534f75bdfeddd01ed02a/ucagent/abackend/langchain/agent.py"
  - id: "blank-backend"
    title: "Optional backend that disables local model work"
    url: "https://github.com/XS-MLVP/UCAgent/blob/ac007684b2c6b1b4b7a1ca6e3090fef174d459fa/ucagent/abackend/blank.py"
  - id: "design-plugin"
    title: "Installable DesignWithPPA plugin and requirements"
    url: "https://github.com/XS-MLVP/UCAgent/blob/7607e05b287c9349c394534f75bdfeddd01ed02a/plugins/DesignWithPPA/README.md"
  - id: "design-plugin-registration"
    title: "Registered design workflows, skills, tools and checkers"
    url: "https://github.com/XS-MLVP/UCAgent/blob/7607e05b287c9349c394534f75bdfeddd01ed02a/plugins/DesignWithPPA/src/design_with_ppa/plugin.py"
  - id: "design-workflow"
    title: "Unit RTL generation, regression and optimization workflow"
    url: "https://github.com/XS-MLVP/UCAgent/blob/7607e05b287c9349c394534f75bdfeddd01ed02a/plugins/DesignWithPPA/src/design_with_ppa/workflows/unit-design-tdd.yaml"
  - id: "ppa-decisions"
    title: "Agent decisions for bounded RTL optimization candidates"
    url: "https://github.com/XS-MLVP/UCAgent/blob/7607e05b287c9349c394534f75bdfeddd01ed02a/plugins/DesignWithPPA/src/design_with_ppa/skills/ppa-iteration-analysis/SKILL.md"
  - id: "ppa-backend"
    title: "Fixed Yosys mapping and OpenSTA pre-layout measurements"
    url: "https://github.com/XS-MLVP/UCAgent/blob/7607e05b287c9349c394534f75bdfeddd01ed02a/plugins/DesignWithPPA/src/design_with_ppa/ppa/backends/yosys_opensta.py"
  - id: "activity"
    title: "Add blank backend for model-free master mode"
    url: "https://github.com/XS-MLVP/UCAgent/commit/fd1d77f73e9d7d55d31eacedb75af445a6bb589b"
  - id: "website"
    title: "Official project documentation"
    url: "https://ucagent.open-verify.cc/"
    purpose: "official"
  - id: "activity-refresh"
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/XS-MLVP/UCAgent/commit/82e7b224e613bca5284719be819619869dbe5fa0"
  - id: "activity-review"
    title: "Parallel task MCP-port selection and regression tests"
    url: "https://github.com/XS-MLVP/UCAgent/commit/ac007684b2c6b1b4b7a1ca6e3090fef174d459fa"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/XS-MLVP/UCAgent/commit/4dc53c15379ab09cad6defca5007bc26f37630ec
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/XS-MLVP/UCAgent/blob/1c7473085ad7f4d891604065b868fdcdb05d0cc3/examples/MiniWorkflow/my_tools.py
  - id: review-20261112-activity
    title: "Signed-metadata UVD waveform and workspace integration"
    url: https://github.com/XS-MLVP/UCAgent/commit/c5276ca94c95595c2d646c134acc0b2eb71db1b5
  - id: review-20261112-implementation
    title: "UVD workspace-contained waveform launcher"
    url: https://github.com/XS-MLVP/UCAgent/blob/c5276ca94c95595c2d646c134acc0b2eb71db1b5/ucagent/scripts/uvd/launch_uvd.py
  - id: review-20261112-tests
    title: "Launcher safety, waveform restoration and shutdown regressions"
    url: https://github.com/XS-MLVP/UCAgent/blob/c5276ca94c95595c2d646c134acc0b2eb71db1b5/tests/test_launch_uvd.py
---


### Implementation context

Agent backends and MCP collaboration are implemented runtime paths. The optional blank backend delegates work to external agents rather than making all modes model-free. [Reviewed source](#source-readme).

### Release boundary

Public examples and checkers define specific execution contracts; their existence does not independently demonstrate arbitrary-DUT coverage closure. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

DUT analysis, generated tests, execution checkers and coverage closure establish Verification. The separately installable DesignWithPPA plugin adds registered workflows that generate or repair Verilog/Chisel DUT source, validate it against shared Python reference tests, and iterate over measured PPA candidates; this implemented source-editing loop establishes AI Design. [Reviewed source](#source-readme); [Plugin registration](#source-design-plugin-registration); [Design workflow](#source-design-workflow).

The plugin invokes Yosys synthesis, Liberty mapping and pre-layout OpenSTA timing/power analysis. Its model chooses bounded RTL changes while the synthesis and measurement recipes remain fixed, so Synthesis is conventional. These unplaced-netlist estimates do not establish physical placement/routing or a separate backend Layout workflow. Rejected or functionally failing candidates are kept distinct from accepted improvements. [PPA decisions](#source-ppa-decisions); [PPA backend](#source-ppa-backend); [Plugin setup](#source-design-plugin).

Implemented model backends analyze DUTs, generate tests and choose verification actions with checker/coverage feedback. This justifies AI Verification beyond the optional MCP transport. [AI/stage evidence](#source-readme).

### Current-source review

Reviewed 2026-11-24. The README and model backend document direct model and external coding-agent modes, plus optional formal and coverage workflows. Default Python stage checking is heuristic; optional LLM and human checking does not establish arbitrary-DUT correctness. The blank backend remains a model-free coordination option rather than evidence that all modes lack inference. [README](#source-readme); [Model backend](#source-implementation); [Blank backend](#source-blank-backend).

An earlier reviewed meaningful first-parent change added parallel task MCP-port selection and regression tests (2026-09-30 UTC). [Reviewed commit](#source-activity-review).

### Development provenance

Copilot is co-credited for implementing workspace-bound path checks in the MiniWorkflow word-count example. The canonical executable example retains absolute-path rejection and real-path containment checks. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).


### November 12, 2026 implementation review

The November 11 update implements UVD waveform launching from signed metadata, checks workspace-contained databases and restores selected signals and native-tick cursor/window state. Tests cover missing signals, escaped symlinks, Tcl failures and viewer shutdown. UVD/UVS, UVD_HOME, Xvfb and related runtimes remain separate requirements; real-tool tests skip without them and were not reproduced here. This conventional supporting viewer does not independently establish AI operation or additional Synthesis/Layout stages; existing AI Verification remains unchanged. [Integrated activity](#source-review-20261112-activity). [UVD workspace-contained waveform launcher](#source-review-20261112-implementation) · [Launcher safety, waveform restoration and shutdown regressions](#source-review-20261112-tests).
