---
name: "Netlist Crawler"
aliases: ["netlist-crawler","analog-netlist-crawl"]
summary: "Structural netlist analysis, dialect translation and parasitic-network reduction."
description: "Python CLI for SPICE/Spectre hierarchy and connectivity queries, analog pattern detection and structured circuit IR. Converts supported netlist dialect subsets with structural consistency checks, and derives effective-resistance and coupling-capacitance prescriptions from extracted netlists for schematic injection."
scope:
  design: { ai: false }
  simulation: { ai: false }
access: "Public Python source and CLI; supports documented netlist subsets and optional explicit PDK translation profiles. Does not require an LLM or a simulator for the structural operations."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical Netlist Crawler repository"
    url: "https://github.com/Arcadia-1/netlist-crawler"
    purpose: code
  - id: readme
    title: "Project scope and independent CLI"
    url: "https://github.com/Arcadia-1/netlist-crawler/blob/73dfdd49a51b86dd1822af91811f756ded05d8e2/README.md"
  - id: activity
    title: "August 3 Spectre-SPICE translation implementation and regressions"
    url: "https://github.com/Arcadia-1/netlist-crawler/commit/73dfdd49a51b86dd1822af91811f756ded05d8e2"
  - id: parser-maintenance
    title: "June 23 BJT model parsing correction"
    url: "https://github.com/Arcadia-1/netlist-crawler/commit/764a21efb8467f1e0ed7809adc47d4db350e712c"
  - id: cli
    title: "Structural and parasitic CLI entry points"
    url: "https://github.com/Arcadia-1/netlist-crawler/blob/73dfdd49a51b86dd1822af91811f756ded05d8e2/src/netlist_crawler/cli.py"
  - id: translation
    title: "Deterministic dialect translation and diagnostics"
    url: "https://github.com/Arcadia-1/netlist-crawler/blob/73dfdd49a51b86dd1822af91811f756ded05d8e2/src/netlist_crawler/translate/core.py"
  - id: translation-tests
    title: "Translation and explicit-profile regressions"
    url: "https://github.com/Arcadia-1/netlist-crawler/blob/73dfdd49a51b86dd1822af91811f756ded05d8e2/tests/test_translate.py"
  - id: prescription
    title: "Effective-resistance and coupling-capacitance model construction"
    url: "https://github.com/Arcadia-1/netlist-crawler/blob/73dfdd49a51b86dd1822af91811f756ded05d8e2/src/netlist_crawler/parasitics/prescribe.py"
---

### Implementation and selection

The independent project extends the analog-netlist-crawl implementation from analog-agents with persistent circuit IR, hierarchy and path queries, semantic device/net annotation, and deterministic dialect conversion. The CLI returns evidence to an agent or engineer without relying on a model to perform graph algorithms. This is a distinct reusable operation rather than an EDA session bridge or schematic renderer. [Overview](#source-readme) · [CLI](#source-cli).

The June parser maintenance and August translation implementation, including executable tests, show technical work beyond the initial release. Translation is restricted to supported syntax and explicit profiles; its round-trip check tests structural consistency, not electrical equivalence of simulator behavior. [Parser maintenance](#source-parser-maintenance) · [Translation](#source-translation) · [Tests](#source-translation-tests).

### Scope and limits

Structural circuit understanding and netlist transformations support conventional Design. The parasitic prescription computes per-pin driving-point resistance and coupling distributions from already extracted data, supporting conventional electrical model evaluation in Simulation. It does not run SPICE or extract parasitics from layout geometry. The presence of agent-readable JSON does not establish model-driven operations in the tool itself. [Prescription](#source-prescription). Source and tests were reviewed without running the upstream suite; no qualifying AI development attribution was established.
