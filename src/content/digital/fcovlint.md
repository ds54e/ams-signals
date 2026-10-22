---
name: "FCOVLint"
aliases: []
description: "Functional-coverage source linter for SystemVerilog covergroups, coverpoints, crosses and related options. Its Python rules extend Verible-based syntax inspection to coverage coding hazards and conventions, without measuring achieved coverage or proving that a verification plan is complete."
scope:
  verification:
    ai: false
access: "Public Python implementation; a compatible Verible syntax executable is required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/AsFigo/fcovlint"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/AsFigo/fcovlint/blob/9be9f9e4573094b5b8fedd2b51fbd7e48d127f0d/README.md"
  - id: "implementation-1"
    title: "Reviewed source: bin/fcovlint.py"
    url: "https://github.com/AsFigo/fcovlint/blob/9be9f9e4573094b5b8fedd2b51fbd7e48d127f0d/bin/fcovlint.py"
  - id: "implementation-2"
    title: "Reviewed source: src/rules/af_fcov_cg_naming.py"
    url: "https://github.com/AsFigo/fcovlint/blob/9be9f9e4573094b5b8fedd2b51fbd7e48d127f0d/src/rules/af_fcov_cg_naming.py"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #8 from IncludedGem/cg-naming-rule"
    url: "https://github.com/AsFigo/fcovlint/commit/9be9f9e4573094b5b8fedd2b51fbd7e48d127f0d"
---

### Implemented operations and boundaries

Covergroup naming and coverage-pattern rules execute on Verible syntax trees. This is coverage-source lint; it cannot establish achieved coverage, specification completeness or verification closure.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-09-13T18:13:32Z (`9be9f9e4573094b5b8fedd2b51fbd7e48d127f0d`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
