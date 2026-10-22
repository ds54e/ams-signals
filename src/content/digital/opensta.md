---
name: "OpenSTA"
aliases: []
description: "Standalone static-timing analyzer consuming gate netlists, Liberty libraries, SDC constraints and parasitics. Tcl commands support timing checks and incremental analysis, with reviewed upstream extensions for scenes, LVF statistical timing and coupling-related noise delays; capabilities remain revision- and configuration-dependent."
scope:
  layout:
    ai: false
access: "Public C++/Tcl implementation; supported build dependencies, timing libraries, constraints and parasitic data are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
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
---

### Implemented operations and boundaries

The canonical source is parallaxsw/OpenSTA, without combining OpenROAD-fork activity. Upstream documents scenes, LVF normal/skew-normal statistical timing and October 15 noise-delay annotation with retained coupling capacitance. These specific operations do not establish commercial-equivalent completeness across every MCMM/AOCV/SI feature.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-21T22:41:45Z (`f7100b9276667aa5e51d6b7b152e457595991751`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
