---
name: "sva-rtl-transpiler"
aliases: []
description: "Prototype translator from a supported concurrent-SVA subset into RTL checkers and immediate assertions for open formal flows. It consumes slang JSON ASTs; single-clock assumptions, bounded consequents, partial sequence composition and delayed failure signals constrain translation and bounded-check depth selection."
scope:
  verification:
    ai: false
access: "Public Python implementation; slang AST generation and downstream simulation/formal tools are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/astrollo/sva-rtl-transpiler"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/astrollo/sva-rtl-transpiler/blob/446dde6afe8f67ec7aee36a2c7e730a1b591127c/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/sva_transpiler/main.py"
    url: "https://github.com/astrollo/sva-rtl-transpiler/blob/446dde6afe8f67ec7aee36a2c7e730a1b591127c/src/sva_transpiler/main.py"
  - id: "implementation-2"
    title: "Reviewed source: src/sva_transpiler/lookback_engine.py"
    url: "https://github.com/astrollo/sva-rtl-transpiler/blob/446dde6afe8f67ec7aee36a2c7e730a1b591127c/src/sva_transpiler/lookback_engine.py"
  - id: "activity"
    title: "Reviewed meaningful change: Initial release of SVA RTL transpiler"
    url: "https://github.com/astrollo/sva-rtl-transpiler/commit/3bd83ca86422159af9ba8b5aa6b9d90bbf3abfe5"
---

### Implemented operations and boundaries

The translator requires a slang JSON AST. It supports one clock and bounded consequent sequences with partial local-variable/composition handling. Generated fail signals can occur later than the earliest native-SVA failure, so BMC depth and counterexample length require explicit adjustment.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-06-10T16:17:59Z (`3bd83ca86422159af9ba8b5aa6b9d90bbf3abfe5`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
