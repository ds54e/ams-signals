---
name: "RTL Buddy"
aliases: []
description: "CLI workflow manager for Verilog/SystemVerilog regression, simulation and formal checking, with current synthesis and place-and-route commands. YAML configurations dispatch external simulators, SymbiYosys, Yosys and OpenROAD and organize artifacts; supported tool versions and platform definitions bound each integrated flow."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: "Public Python implementation; command-specific external simulators, SymbiYosys, the documented Yosys fork and OpenROAD/platform data are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
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
---

### Implemented operations and boundaries

Current main includes the v7 synthesis and OpenROAD implementation workflows as well as regression and SBY dispatch. The manager orchestrates external engines rather than replacing them; the documented Yosys fork, simulators, solver versions and platform data are command-specific dependencies. No separate Design stage or runtime AI is inferred from agent-facing interfaces.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Synthesis, Verification, Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-21T05:46:49Z (`7ef509c029fbf15b483684223492393d12ded066`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
