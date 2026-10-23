---
name: "Netgen"
aliases: []
summary: "Netlist comparison tool for layout-versus-schematic checking of SPICE and Verilog circuits."
description: "Netlist comparison tool for layout-versus-schematic checking of SPICE and Verilog circuits. Its Tcl interface compares connectivity and device properties using process-specific setup rules; layout extraction is supplied by other tools such as Magic or KLayout."
scope:
  layout:
    ai: false
access: "Public C/Tcl implementation; Tcl and process-specific LVS setup files are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-23'
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
---

### Implemented operations and boundaries

The user invokes netlist LVS; this project does not extract devices from GDS. Device normalization and comparison depend on the process setup and supported netlist syntax.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-14T15:51:49Z (`e5a185dcfa16ee6317883f02bfdc8cf10feabd0e`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
