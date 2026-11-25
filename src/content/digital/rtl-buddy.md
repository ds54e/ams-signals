---
name: "RTL Buddy"
aliases: []
description: "CLI workflow manager for Verilog/SystemVerilog regression, simulation, formal checking and mutation campaigns, with synthesis, place-and-route and power-analysis commands. YAML configurations dispatch external simulators, SymbiYosys, Yosys and OpenROAD and organize artifacts; supported tool versions and platform definitions bound each integrated flow."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for repairing SDC clock resolution and unresolved-clock reporting. The canonical Tcl reader retains structured read results and detection of clock commands inside unevaluated script bodies."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python implementation; command-specific external simulators, SymbiYosys, the documented Yosys fork and OpenROAD/platform data are required."
addedAt: "2026-10-22"
reviewedAt: '2026-11-25'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/rtl-buddy/rtl_buddy"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/rtl-buddy/rtl_buddy/blob/7ef509c029fbf15b483684223492393d12ded066/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/rtl_buddy/tools/pnr_openroad.py"
    url: "https://github.com/rtl-buddy/rtl_buddy/blob/7ef509c029fbf15b483684223492393d12ded066/src/rtl_buddy/tools/pnr_openroad.py"
  - id: "implementation-2"
    title: "Reviewed source: src/rtl_buddy/tools/sby_fpv.py"
    url: "https://github.com/rtl-buddy/rtl_buddy/blob/7ef509c029fbf15b483684223492393d12ded066/src/rtl_buddy/tools/sby_fpv.py"
  - id: "activity"
    title: "Reviewed meaningful change: fix(pnr): render resume-check scripts as the run writes them (#937)"
    url: "https://github.com/rtl-buddy/rtl_buddy/commit/7ef509c029fbf15b483684223492393d12ded066"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/rtl-buddy/rtl_buddy/commit/2fbdc552502b01ef84a6a8149978e27014582245
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/rtl-buddy/rtl_buddy/blob/2fbdc552502b01ef84a6a8149978e27014582245/src/rtl_buddy/constraints/tcl_reader.py
  - id: website
    title: Official project website and documentation
    url: https://rtl-buddy.github.io/rtl_buddy/
    purpose: official
  - id: review-20261125-mutation
    title: "Retained mutation campaign execution and baseline behavior"
    url: "https://github.com/rtl-buddy/rtl_buddy/blob/6cbf80822110ee634e00c03b723f8ab171bbb604/src/rtl_buddy/runner/mut_runner.py"
  - id: review-20261125-score
    title: "Retained mutation outcome and score calculation"
    url: "https://github.com/rtl-buddy/rtl_buddy/blob/6cbf80822110ee634e00c03b723f8ab171bbb604/src/rtl_buddy/runner/mut_results.py"
  - id: review-20261125-fpv-test
    title: "Retained FPV grading regression cases"
    url: "https://github.com/rtl-buddy/rtl_buddy/blob/6cbf80822110ee634e00c03b723f8ab171bbb604/tests/test_mut_fpv_grading.py"
  - id: review-20261125-latch
    title: "November 24 latch-borrow margin reporting integration"
    url: "https://github.com/rtl-buddy/rtl_buddy/commit/6cbf80822110ee634e00c03b723f8ab171bbb604"
  - id: review-20261125-saif
    title: "November 24 SAIF naming and instance mapping integration"
    url: "https://github.com/rtl-buddy/rtl_buddy/commit/185507eaac1df019cddf88d3ce58cc95b3c3289b"
---

### Implemented operations and boundaries

Current main includes the v7 synthesis and OpenROAD implementation workflows as well as regression and SBY dispatch. The manager orchestrates external engines rather than replacing them; the documented Yosys fork, simulators, solver versions and platform data are command-specific dependencies. No separate Design stage or runtime AI is inferred from agent-facing interfaces.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Synthesis, Verification, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier meaningful checkpoint was 2026-10-21T05:46:49Z (`7ef509c029fbf15b483684223492393d12ded066`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for repairing SDC clock resolution and unresolved-clock reporting. The canonical Tcl reader retains structured read results and detection of clock commands inside unevaluated script bodies. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

### November 25 source review

The retained mutation runner supports generated xeno mutants and user-supplied patches, materializing independent source copies and invoking configured simulation/assertion or formal oracles. The score is killed divided by killed plus survived; unscorable build or formal tool errors are excluded. This is not formal equivalence classification of surviving mutants. The implementation warns about non-PASS unmutated baselines but continues execution, so a valid passing baseline must be checked separately before interpreting the score. The FPV oracle compares verdicts with the baseline and treats some incomplete proof outcomes as errors; users must distinguish a real counterexample from inconclusive proof behavior. [Runner](#source-review-20261125-mutation) · [Scoring](#source-review-20261125-score) · [FPV regression cases](#source-review-20261125-fpv-test).

November 24 integrates SAIF naming corrections and explicit instance mapping for the power workflow, and separately adds latch-borrow margin reporting from OpenSTA timing reports, distinguishing rising and falling checks across corners. The latter is the current meaningful default-branch checkpoint. These changes improve interpretation of existing external-engine results, not independent physical signoff. The source and regression cases were reviewed without independently running the tools. [SAIF integration](#source-review-20261125-saif) · [Latch report integration](#source-review-20261125-latch).
