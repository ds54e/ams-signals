---
name: "EBMC"
aliases: []
description: "Model checker for Verilog and SystemVerilog hardware with bounded and unbounded verification engines. Its implemented assertion subset is translated through engine-specific paths, so SVA support, proof status and counterexample interpretation depend on the selected encoding and reviewed revision."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing implicit-net declarations for nested concatenations on continuous-assignment left-hand sides. The canonical Verilog type checker retains the recursive implementation."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public C++ implementation; selected SAT/SMT or automata backend dependencies are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/diffblue/hw-cbmc"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/diffblue/hw-cbmc/blob/f8a2deeec151e7e11daabdad6e71547b2412cde0/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/ebmc/ebmc_parse_options.cpp"
    url: "https://github.com/diffblue/hw-cbmc/blob/f8a2deeec151e7e11daabdad6e71547b2412cde0/src/ebmc/ebmc_parse_options.cpp"
  - id: "implementation-2"
    title: "Reviewed source: src/temporal-logic/ltl_to_buechi.cpp"
    url: "https://github.com/diffblue/hw-cbmc/blob/f8a2deeec151e7e11daabdad6e71547b2412cde0/src/temporal-logic/ltl_to_buechi.cpp"
  - id: "implementation-3"
    title: "Reviewed source: src/temporal-logic/ltl_sva_to_string.cpp"
    url: "https://github.com/diffblue/hw-cbmc/blob/f8a2deeec151e7e11daabdad6e71547b2412cde0/src/temporal-logic/ltl_sva_to_string.cpp"
  - id: "implementation-4"
    title: "Reviewed source: regression/verilog/SVA/always_with_range2.buechi.desc"
    url: "https://github.com/diffblue/hw-cbmc/blob/f8a2deeec151e7e11daabdad6e71547b2412cde0/regression/verilog/SVA/always_with_range2.buechi.desc"
  - id: "implementation-5"
    title: "Reviewed source: regression/verilog/SVA/cycle_delay_star5.buechi.desc"
    url: "https://github.com/diffblue/hw-cbmc/blob/f8a2deeec151e7e11daabdad6e71547b2412cde0/regression/verilog/SVA/cycle_delay_star5.buechi.desc"
  - id: "activity"
    title: "Reviewed meaningful change: Verilog: out-of-range array index write is a no-op in RTL construction"
    url: "https://github.com/diffblue/hw-cbmc/commit/f8a2deeec151e7e11daabdad6e71547b2412cde0"
  - id: "buechi-always"
    title: "Buechi ranged-always semantic correction"
    url: "https://github.com/diffblue/hw-cbmc/commit/6e0bafaf2107129e0c2fbfe9e4fa314569f7cf73"
  - id: "buechi-zero-delay"
    title: "Buechi zero-delay semantic correction"
    url: "https://github.com/diffblue/hw-cbmc/commit/ad1f7dd12b739003d39f85784664bcb8963a14ab"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/diffblue/hw-cbmc/commit/1e934d1d0cbbab886766f1df6e4e98bc3204de89
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/diffblue/hw-cbmc/blob/f8a2deeec151e7e11daabdad6e71547b2412cde0/src/verilog/verilog_typecheck.cpp
---

### Implemented operations and boundaries

SVA support is encoding-specific. The September 28 Buechi fixes change ranged always to G rather than F and preserve the zero-delay branch of ##[*]; corresponding regressions became CORE tests. Bounded outcomes do not establish unbounded proof, and the fixes should not be attributed to every engine path.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3); [Source 4](#source-implementation-4); [Source 5](#source-implementation-5); [Source 7](#source-buechi-always).

### Scope and activity review

The exposed operations support Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-21T20:10:15Z (`f8a2deeec151e7e11daabdad6e71547b2412cde0`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing implicit-net declarations for nested concatenations on continuous-assignment left-hand sides. The canonical Verilog type checker retains the recursive implementation. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
