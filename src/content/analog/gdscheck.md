---
name: "gdscheck"
aliases: []
summary: "Experimental Rust design-rule checker for GDSII layouts with declarative YAML rule decks."
description: "Experimental Rust design-rule checker for GDSII layouts with declarative YAML rule decks, including IHP, GF180 and predictive ASAP7 checks. Its CLI supports directional spacing, enclosure and routing-track checks; process-specific exclusions and unqualified results limit its use to development and regression workflows."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting edge-piece classification at polygon walls. The canonical Rust implementation retains separate tolerances for labels and edge midpoints, with an executable regression."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Rust implementation; a recent Rust toolchain and a matching rule deck are required."
addedAt: "2026-10-22"
reviewedAt: '2026-11-25'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/aesc-silicon/gdscheck"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/main.rs"
    url: "https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/src/main.rs"
  - id: "implementation-2"
    title: "Reviewed source: src/lib.rs"
    url: "https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/src/lib.rs"
  - id: "activity"
    title: "November 9 ASAP7 predictive-process rule decks and generated fixtures"
    url: "https://github.com/aesc-silicon/gdscheck/commit/c130cb5e73546423082cde624e4c99ddbbe02933"
  - id: earlier-ihp
    title: "October 16 IHP SG13CMOS5L deck correction"
    url: "https://github.com/aesc-silicon/gdscheck/commit/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8"
  - id: asap7-docs
    title: "ASAP7 rule interpretation and omitted checks"
    url: "https://github.com/aesc-silicon/gdscheck/blob/71f5752df46e590847a42d7a888ecb9123453985/docs/source/pdks/asap7.rst"
  - id: asap7-openroad
    title: "ASAP7 OpenROAD tech-LEF rule subset"
    url: "https://github.com/aesc-silicon/gdscheck/blob/71f5752df46e590847a42d7a888ecb9123453985/pdks/asap7/suites/openroad.yml"
  - id: asap7-tests
    title: "Retained ASAP7 generated-fixture and rule-suite regressions"
    url: "https://github.com/aesc-silicon/gdscheck/blob/71f5752df46e590847a42d7a888ecb9123453985/tests/asap7.rs"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/aesc-silicon/gdscheck/commit/dee4df85c048ec054fa12d500ecb9525026d384b
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/aesc-silicon/gdscheck/blob/2100e66b5bad4bc6cb8ef0dc66db788022d19fb8/src/merge.rs
  - id: website
    title: Official project website and documentation
    url: https://aesc-silicon.github.io/gdscheck/
    purpose: official
---

### Implemented operations and boundaries

The reviewed version identifies itself as experimental and explicitly disclaims tape-out qualification. Bundled decks for different processes have separate coverage and regression evidence.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

October 16 corrects an IHP SG13CMOS5L deck. November 9 adds ASAP7 release 1p7 decks, generated fixtures and regressions, including a distinct OpenROAD suite constrained by the technology LEF. This is a predictive FinFET process, not a foundry-qualified deck: the documented unimplemented rules and LEF-specific exclusions remain relevant. These independently useful rule-engine and deck workflows justify retention alongside general layout editors and open-PDK regression harnesses. [Earlier correction](#source-earlier-ihp) · [ASAP7 rules](#source-asap7-docs) · [OpenROAD subset](#source-asap7-openroad) · [Retained regressions](#source-asap7-tests).

The meaningful checkpoint within the saved capture is 2026-11-09T10:31:26Z (`c130cb5e73546423082cde624e4c99ddbbe02933`), followed by the v0.2.1 version update. Later upstream changes are outside that capture. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting edge-piece classification at polygon walls. The canonical Rust implementation retains separate tolerances for labels and edge midpoints, with an executable regression. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
