---
name: "Netgen"
aliases: []
summary: "Netlist comparison tool for layout-versus-schematic checking of SPICE and Verilog circuits."
description: "Netlist comparison tool for layout-versus-schematic checking of SPICE and Verilog circuits. Its Tcl interface compares connectivity and device properties using process-specific setup rules; layout extraction is supplied by other tools such as Magic or KLayout."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer explicitly credits Claude Opus 5.5 with implementing Verilog instance-array corrections and SPICE writer repairs. The current parser retains ascending-array and bus-connection handling; this is software-development assistance, separate from conventional LVS."
  sources: [development-20261124-code, development-20261124-retained]
  reviewedAt: '2026-11-24'
access: "Public C/Tcl implementation; Tcl and process-specific LVS setup files are required."
addedAt: "2026-10-22"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/RTimothyEdwards/netgen"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/RTimothyEdwards/netgen/blob/e5a185dcfa16ee6317883f02bfdc8cf10feabd0e/README.md"
  - id: "implementation-1"
    title: "Reviewed source: base/netcmp.c"
    url: "https://github.com/RTimothyEdwards/netgen/blob/e5a185dcfa16ee6317883f02bfdc8cf10feabd0e/base/netcmp.c"
  - id: "implementation-2"
    title: "Reviewed source: tcltk/tclnetgen.c"
    url: "https://github.com/RTimothyEdwards/netgen/blob/e5a185dcfa16ee6317883f02bfdc8cf10feabd0e/tcltk/tclnetgen.c"
  - id: "activity"
    title: "Reviewed meaningful change: Applied a fix suggested by yashv373 in issue #111 on github.  A"
    url: "https://github.com/RTimothyEdwards/netgen/commit/e5a185dcfa16ee6317883f02bfdc8cf10feabd0e"
  - id: website
    title: Official project website and documentation
    url: https://opencircuitdesign.com/netgen/
    purpose: official
  - id: review-20261112-activity
    title: "Mixed-language netlist case matching and bus-delimiter correction"
    url: https://github.com/RTimothyEdwards/netgen/commit/9f31fb288e85e7d2a5fa01c74e2dcc960925dd88
  - id: review-20261112-implementation
    title: "Verilog parser matching and source bus delimiters"
    url: https://github.com/RTimothyEdwards/netgen/blob/9f31fb288e85e7d2a5fa01c74e2dcc960925dd88/base/verilog.c
  - id: development-20261124-code
    title: "Credited executable implementation and tests"
    url: https://github.com/RTimothyEdwards/netgen/commit/fea8aa679d5a66f370544694d46858732fd4302b
  - id: development-20261124-retained
    title: "Retained credited implementation at the reviewed head"
    url: https://github.com/RTimothyEdwards/netgen/blob/fea8aa679d5a66f370544694d46858732fd4302b/base/verilog.c
---

### Implemented operations and boundaries

The user invokes netlist LVS; this project does not extract devices from GDS. Device normalization and comparison depend on the process setup and supported netlist syntax.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-14T15:51:49Z (`e5a185dcfa16ee6317883f02bfdc8cf10feabd0e`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.


### November 12, 2026 implementation review

The November 7 update replaces an inconsistent exact-name matcher with the configured match function for SPICE-derived naming and recognizes both square and angle bus delimiters while preserving their source convention. This is substantive mixed-netlist correctness maintenance, not a new stage. The maintainer retains a more-general-delimiter-handling limitation; the patch has no new regression tests. Investigation assistance alone is not treated as unambiguous AI code attribution. [Integrated activity](#source-review-20261112-activity). [Verilog parser matching and source bus delimiters](#source-review-20261112-implementation).

### November 24, 2026 development-provenance review

The maintainer explicitly credits Claude Opus 5.5 with implementing Verilog instance-array corrections and SPICE writer repairs. The current parser retains ascending-array and bus-connection handling; this is software-development assistance, separate from conventional LVS. [Credited change](#source-development-20261124-code) · [Retained code](#source-development-20261124-retained).
