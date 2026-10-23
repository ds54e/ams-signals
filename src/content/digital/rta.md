---
name: "Ṛta"
aliases: []
description: "Deterministic SDC constraint-analysis toolkit for validation, reference resolution, coverage, conflicts and change review before STA. Its CLI exposes context-aware diagnostics and machine-readable results, while unresolved context and supported-command limits prevent readiness scores from establishing timing closure or signoff."
scope:
  layout:
    ai: false
access: "Public Python implementation; supported SDC syntax and optional design/context inputs are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-23'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/RAMA-L7/rta-constraint-intelligence"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/RAMA-L7/rta-constraint-intelligence/blob/1f3e02379e5bfbc5a8709808438d031fcd40c260/README.md"
  - id: "implementation-1"
    title: "Reviewed source: rta/engine/rules/checker.py"
    url: "https://github.com/RAMA-L7/rta-constraint-intelligence/blob/1f3e02379e5bfbc5a8709808438d031fcd40c260/rta/engine/rules/checker.py"
  - id: "implementation-2"
    title: "Reviewed source: cli.py"
    url: "https://github.com/RAMA-L7/rta-constraint-intelligence/blob/1f3e02379e5bfbc5a8709808438d031fcd40c260/cli.py"
  - id: "implementation-3"
    title: "Reviewed source: checker.py"
    url: "https://github.com/RAMA-L7/rta-constraint-intelligence/blob/1f3e02379e5bfbc5a8709808438d031fcd40c260/checker.py"
  - id: "implementation-4"
    title: "Reviewed source: rta/engine/context/design_context.py"
    url: "https://github.com/RAMA-L7/rta-constraint-intelligence/blob/1f3e02379e5bfbc5a8709808438d031fcd40c260/rta/engine/context/design_context.py"
  - id: "activity"
    title: "Reviewed meaningful change: feat(release): v1.5.11 - Context-Aware Constraint Analysis"
    url: "https://github.com/RAMA-L7/rta-constraint-intelligence/commit/3b5c2f25c48d6b6b1d4809f0d5d69fc467d387ea"
  - id: website
    title: Official project website and documentation
    url: https://rama-l7.github.io/rta-constraint-intelligence/
    purpose: official
---

### Implemented operations and boundaries

Timing-constraint quality belongs to Layout under backend timing/closure. The engine records resolved, unavailable, unsupported, ambiguous and unvalidated context; readiness/coverage scores are not STA correctness or timing closure. Generic MCP exposure does not establish runtime AI.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3); [Source 4](#source-implementation-4).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-08-25T14:07:01Z (`3b5c2f25c48d6b6b1d4809f0d5d69fc467d387ea`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
