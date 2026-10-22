---
name: "svlint"
aliases: []
description: "SystemVerilog linter built on sv-parser with configurable syntax and text rules. Its standalone Rust CLI checks coding conventions and design-intent hazards through a parser independent of Verible, providing source diagnostics rather than simulation, property proof or complete semantic verification."
scope:
  verification:
    ai: false
access: "Public Rust implementation; supported SystemVerilog preprocessing/parsing inputs and configuration are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/dalance/svlint"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/dalance/svlint/blob/98e84ce9776593f8d8aae45ae80001ba3e9789ff/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/main.rs"
    url: "https://github.com/dalance/svlint/blob/98e84ce9776593f8d8aae45ae80001ba3e9789ff/src/main.rs"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #312 from ds54e/ds54e/default_nettype_wire_at_end"
    url: "https://github.com/dalance/svlint/commit/a199c0caa6299958fccde2aedd87c5652c9d15cf"
---

### Implemented operations and boundaries

The November 4 implementation adds an executable default_nettype end-of-file rule with positive/negative cases. It remains inside the one-year inclusive cutoff on the observation date and has a signal in the displayed twelve-month window; low frequency is not evidence of abandonment.

[Project overview](#source-readme); [Source 1](#source-implementation-1).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2025-11-04T01:10:39Z (`a199c0caa6299958fccde2aedd87c5652c9d15cf`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
