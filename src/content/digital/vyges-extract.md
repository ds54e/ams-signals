---
name: "Vyges Extract"
aliases: ["vyges-extract", "RC parasitic extraction", "SPEF extraction"]
description: "Rule-based interconnect RC extractor consuming routed DEF, layer rules and optional LEF, with GDS and KLayout connectivity front ends for custom layouts. It calculates resistance, grounded and coupling capacitance and emits SPEF; the bundled sky130 rules are correlated to OpenRCX rather than independently qualified foundry silicon."
scope:
  layout: { ai: false }
access: "Apache-2.0 Rust source; requires compatible geometry and process-specific RC rules. GDS and KLayout front ends require explicit layer mappings and may have additional dependencies."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/vyges-tools/extract"
    purpose: code
  - id: activity
    title: "November 8 same-metal mask datatype connectivity correction"
    url: "https://github.com/vyges-tools/extract/commit/76d3368dfa18e4e8d6c9b1635c606a792e4a7139"
  - id: earlier
    title: "August 6 coupling accounting and geometric shielding correction"
    url: "https://github.com/vyges-tools/extract/commit/b5278e2f9d006649c00538604b1addf097a83f2c"
  - id: engine
    title: "Retained extraction engine"
    url: "https://github.com/vyges-tools/extract/blob/487e8f01cc93de56ebef9e22311d9c917b95a305/src/engine.rs"
  - id: coupling
    title: "Retained geometry-dependent coupling computation"
    url: "https://github.com/vyges-tools/extract/blob/487e8f01cc93de56ebef9e22311d9c917b95a305/src/coupling.rs"
  - id: gds
    title: "Retained GDS tracing and mask datatype regression"
    url: "https://github.com/vyges-tools/extract/blob/487e8f01cc93de56ebef9e22311d9c917b95a305/src/gds.rs"
  - id: analog-test
    title: "Retained custom bias-block extraction tests"
    url: "https://github.com/vyges-tools/extract/blob/487e8f01cc93de56ebef9e22311d9c917b95a305/tests/analog.rs"
  - id: overview
    title: "Public rules, workflow and reference-correlation boundaries"
    url: "https://github.com/vyges-tools/extract/blob/487e8f01cc93de56ebef9e22311d9c917b95a305/README.md"
---

## Scope and limits

The primary workflow produces interconnect parasitics for routed designs and backend timing or power analysis. The rule-based model uses geometry-dependent R/C estimates with layer-specific coefficients, via models and geometric shielding; this is not general three-dimensional field solving. The optional GDS and KLayout connectivity front ends also support custom wire geometry, but feed the same extraction core. This listing therefore stays in Digital rather than duplicating the project in Analog. It complements the separate Vyges Power and timing tools by supplying interconnect parasitics, not their timing or power calculations. [Engine](#source-engine) · [Coupling](#source-coupling) · [GDS path](#source-gds) · [Custom-layout tests](#source-analog-test).

## Reviewed maintenance

August 6 corrects double counting of reference coupling capacitances and changes geometric shielding to account for the coverage of intervening conductors. November 8 groups GDS datatypes declared as the same routing layer into one conductor, with an executable regression retained in the native tracing module. The later release and build changes do not advance the substantive checkpoint. Public sky130 calibration is against OpenRCX; claimed correlation figures were not independently reproduced, and foundry-qualified proprietary decks are not supplied by this public repository. [Coupling correction](#source-earlier) · [Connectivity correction](#source-activity) · [Reference limitations](#source-overview).
