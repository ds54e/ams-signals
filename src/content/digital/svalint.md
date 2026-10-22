---
name: "SVALint"
aliases: []
description: "SystemVerilog assertion linter implementing additional Python rules over Verible syntax trees. It checks assertion coding patterns, event usage and related style hazards through a standalone CLI, providing source-quality diagnostics rather than proving that properties hold or capture the intended specification."
scope:
  verification:
    ai: false
access: "Public Python implementation; a compatible Verible syntax executable is required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/AsFigo/svalint"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/AsFigo/svalint/blob/f794fa4b1e30bd4f7f8b70bc1097a01ad177fbfb/README.md"
  - id: "implementation-1"
    title: "Reviewed source: bin/svalint.py"
    url: "https://github.com/AsFigo/svalint/blob/f794fa4b1e30bd4f7f8b70bc1097a01ad177fbfb/bin/svalint.py"
  - id: "implementation-2"
    title: "Reviewed source: src/rules/af_clk_without_edge.py"
    url: "https://github.com/AsFigo/svalint/blob/f794fa4b1e30bd4f7f8b70bc1097a01ad177fbfb/src/rules/af_clk_without_edge.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #68 from AsFigo/srini_dev"
    url: "https://github.com/AsFigo/svalint/commit/3f4f77765f577cfa24b90c4afb6441cf3dd96b48"
---

### Implemented operations and boundaries

The CLI invokes Verible syntax inspection and adds assertion-specific Python rules. Lint diagnostics concern source patterns and event/coding hazards, not property validity or full SVA semantics.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-08-23T22:20:32Z (`3f4f77765f577cfa24b90c4afb6441cf3dd96b48`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
