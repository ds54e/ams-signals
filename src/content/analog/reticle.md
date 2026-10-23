---
name: "Reticle"
aliases: []
summary: "Browser and native IC-layout editor with incremental geometric DRC and programmatic editing."
description: "Browser and native IC-layout editor with incremental geometric DRC and programmatic editing. An optional model-driven propose–verify–correct workflow edits layouts against bounded checks; its SKY130 rule subset and internal comparison APIs do not constitute a product-level LVS or tape-out signoff flow."
scope:
  layout:
    ai: true
access: "Public Rust/WASM implementation; browser graphics support or native build dependencies are required, with model API access for the optional AI workflow."
addedAt: "2026-10-22"
reviewedAt: '2026-10-23'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/AlpharomeroJL/reticle"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/AlpharomeroJL/reticle/blob/67015912942fbc0972c95e0e28a279722f897ba4/README.md"
  - id: "implementation-1"
    title: "Reviewed source: crates/reticle-agent-api/src/live_loop.rs"
    url: "https://github.com/AlpharomeroJL/reticle/blob/67015912942fbc0972c95e0e28a279722f897ba4/crates/reticle-agent-api/src/live_loop.rs"
  - id: "implementation-2"
    title: "Reviewed source: crates/reticle-drc/src/erc.rs"
    url: "https://github.com/AlpharomeroJL/reticle/blob/67015912942fbc0972c95e0e28a279722f897ba4/crates/reticle-drc/src/erc.rs"
  - id: "implementation-3"
    title: "Reviewed source: crates/reticle-extract/src/lvs.rs"
    url: "https://github.com/AlpharomeroJL/reticle/blob/67015912942fbc0972c95e0e28a279722f897ba4/crates/reticle-extract/src/lvs.rs"
  - id: "implementation-4"
    title: "Reviewed source: docs/src/positioning.md"
    url: "https://github.com/AlpharomeroJL/reticle/blob/67015912942fbc0972c95e0e28a279722f897ba4/docs/src/positioning.md"
  - id: "implementation-5"
    title: "Reviewed source: docs/src/sky130-drc-coverage.md"
    url: "https://github.com/AlpharomeroJL/reticle/blob/67015912942fbc0972c95e0e28a279722f897ba4/docs/src/sky130-drc-coverage.md"
  - id: "implementation-6"
    title: "Reviewed source: docs/src/agent.md"
    url: "https://github.com/AlpharomeroJL/reticle/blob/67015912942fbc0972c95e0e28a279722f897ba4/docs/src/agent.md"
  - id: "activity"
    title: "Reviewed meaningful change: fix(io): the OASIS byte gate is decided by the bytes, not by a projection (QA-183, P1)"
    url: "https://github.com/AlpharomeroJL/reticle/commit/91c482a2f0d0d2699b45beaad4b47a012e2bbc5f"
  - id: website
    title: Official project website and documentation
    url: https://alpharomerojl.github.io/reticle/
    purpose: official
---

### Implemented operations and boundaries

The optional model workflow proposes editing commands, applies them to a private session, checks DRC and task intent, then returns feedback under iteration bounds. Product surfaces expose MOS recognition and SPICE export, but compare_layout_to_spice and compare_devices remain crate APIs with no product callers; they are not exposed full LVS. ERC and the SKY130 deck have limited geometry/rule coverage.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3); [Source 4](#source-implementation-4); [Source 5](#source-implementation-5); [Source 6](#source-implementation-6).

### Scope and activity review

The exposed operations support Layout. The AI prefix describes the optional implemented model-hosted workflow or the explicitly evaluated AI task. It does not classify the conventional checker or numerical engine as AI.

The meaningful checkpoint is 2026-08-02T02:53:33Z (`91c482a2f0d0d2699b45beaad4b47a012e2bbc5f`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
