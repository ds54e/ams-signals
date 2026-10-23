---
name: "CNSTLint"
aliases: []
description: "SystemVerilog constraint linter with targeted rules for random variables, distribution weights, expression sizing and constraint coding hazards. Python checks operate on Verible syntax trees and produce source diagnostics; they do not solve constraints or establish the behavior of generated stimulus."
scope:
  verification:
    ai: false
access: "Public Python implementation; a compatible Verible syntax executable is required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-23'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/AsFigo/cnstlint"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/AsFigo/cnstlint/blob/0b1c68328b520ce527589992ae2e6b7b496b9045/README.md"
  - id: "implementation-1"
    title: "Reviewed source: bin/cnstlint.py"
    url: "https://github.com/AsFigo/cnstlint/blob/0b1c68328b520ce527589992ae2e6b7b496b9045/bin/cnstlint.py"
  - id: "implementation-2"
    title: "Reviewed source: src/rules/af_cnst_dist_fractional_weight.py"
    url: "https://github.com/AsFigo/cnstlint/blob/0b1c68328b520ce527589992ae2e6b7b496b9045/src/rules/af_cnst_dist_fractional_weight.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #6 from vajeetha/vak_dist_fractions"
    url: "https://github.com/AsFigo/cnstlint/commit/0b1c68328b520ce527589992ae2e6b7b496b9045"
  - id: website
    title: Official project website and documentation
    url: https://asfigo.github.io/cnstlint/
    purpose: official
---

### Implemented operations and boundaries

The reviewed dist-weight rule is registered by the CLI and inspects syntax nodes. This is constraint-source lint, not a solver, randomization engine or distribution-quality measurement.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-20T21:21:40Z (`0b1c68328b520ce527589992ae2e6b7b496b9045`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
