---
name: "OpenSTA"
aliases: []
description: "Static timing and power analyzer consuming gate netlists, Liberty libraries, SDC constraints and parasitics. It supports incremental timing analysis, statistical timing and coupling-related delay models, plus internal, switching and leakage power estimation from propagated or annotated activity, including VCD time windows and SAIF."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing configurable precision in JSON timing reports. The canonical path-report writer retains the report-digits setting for timing and capacitance values."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public C++/Tcl implementation; supported build dependencies, timing libraries, constraints and parasitic data are required."
addedAt: "2026-10-22"
reviewedAt: '2026-11-25'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/parallaxsw/OpenSTA"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/parallaxsw/OpenSTA/blob/f7100b9276667aa5e51d6b7b152e457595991751/README.md"
  - id: "implementation-1"
    title: "Reviewed source: search/Search.tcl"
    url: "https://github.com/parallaxsw/OpenSTA/blob/f7100b9276667aa5e51d6b7b152e457595991751/search/Search.tcl"
  - id: "implementation-2"
    title: "Reviewed source: doc/ChangeLog.md"
    url: "https://github.com/parallaxsw/OpenSTA/blob/f7100b9276667aa5e51d6b7b152e457595991751/doc/ChangeLog.md"
  - id: "activity"
    title: "Reviewed meaningful change: write_path_spice: deassert asynchronous set/reset pins pr #481"
    url: "https://github.com/parallaxsw/OpenSTA/commit/f7100b9276667aa5e51d6b7b152e457595991751"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/parallaxsw/OpenSTA/commit/230e28d9880294170f1e659dbdc675d66468ce2d
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/parallaxsw/OpenSTA/blob/f7100b9276667aa5e51d6b7b152e457595991751/search/ReportPath.cc
  - id: website
    title: Official project website and documentation
    url: https://opensta.readthedocs.io/en/latest/
    purpose: official
  - id: power-review-20261123
    title: "November 23 clock-gate and activity-limit follow-up integration"
    url: "https://github.com/parallaxsw/OpenSTA/commit/28d7a0b5123d59cbff8c1def4e3830c840fe5d50"
  - id: power-earlier-20261123
    title: "Clock-gate enable, conditional leakage and slew-limit fixes and regressions"
    url: "https://github.com/parallaxsw/OpenSTA/commit/a0991c6ecd0eaf53e472bf257c079821ae64b547"
  - id: power-tcl
    title: "Retained static power, VCD time-window and SAIF command implementation"
    url: "https://github.com/parallaxsw/OpenSTA/blob/28d7a0b5123d59cbff8c1def4e3830c840fe5d50/power/Power.tcl"
  - id: power-engine
    title: "Retained activity propagation and Liberty power model evaluation"
    url: "https://github.com/parallaxsw/OpenSTA/blob/28d7a0b5123d59cbff8c1def4e3830c840fe5d50/power/Power.cc"
  - id: power-clock-gate-test
    title: "Clock-gate activity regression including test-enable connectivity"
    url: "https://github.com/parallaxsw/OpenSTA/blob/28d7a0b5123d59cbff8c1def4e3830c840fe5d50/test/power_clock_gate_test_enable.tcl"
  - id: power-vcd-test
    title: "VCD activity time-window regression"
    url: "https://github.com/parallaxsw/OpenSTA/blob/28d7a0b5123d59cbff8c1def4e3830c840fe5d50/test/vcd_begin_end_time.tcl"
---

### Implemented operations and boundaries

The canonical source is parallaxsw/OpenSTA, without combining OpenROAD-fork activity. Upstream documents scenes, LVF normal/skew-normal statistical timing and October 15 noise-delay annotation with retained coupling capacitance. These specific operations do not establish commercial-equivalent completeness across every MCMM/AOCV/SI feature.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier timing-related checkpoint was 2026-10-21T22:41:45Z (`f7100b9276667aa5e51d6b7b152e457595991751`). The November 23 power-analysis integration supersedes it as the meaningful checkpoint. [Earlier implementation](#source-activity) · [Current implementation activity](#source-power-review-20261123).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing configurable precision in JSON timing reports. The canonical path-report writer retains the report-digits setting for timing and capacitance values. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

### Static power analysis

The public Tcl interface exposes internal, switching and leakage power by design group or instance using Liberty power models and annotated or propagated activity. VCD import supports explicit begin/end times; SAIF and direct activity settings provide alternative input paths. This permits separate analysis of operating windows rather than an assertion of transistor-level transient power accuracy. Results depend on library power characterization, parasitics, activity annotation coverage and propagation assumptions. [Commands](#source-power-tcl) · [VCD window regression](#source-power-vcd-test).

The November 23 integrations correct clock-gate test-enable activity, conditional leakage handling and limits on propagated activity using scene-dependent slew. The subsequent follow-up retains duty clamping and distinguishes propagated activity from explicitly annotated activity, and the clock-gate regression covers reconnecting a test-enable driver. This is static power evaluation in an implemented digital design, not analog transistor-level noise or a physical power-grid solve. The source and tests were reviewed, not executed; no signoff equivalence or tagged-release inclusion is asserted. [Initial correction](#source-power-earlier-20261123) · [Follow-up integration](#source-power-review-20261123) · [Power engine](#source-power-engine) · [Clock-gate regression](#source-power-clock-gate-test).
