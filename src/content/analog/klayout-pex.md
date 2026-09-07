---
name: "KLayout-PEX"
aliases: ["KPEX"]
summary: "Connects layout connectivity and process stacks to parasitic extraction and interconnect-model exchange."
description: "Parasitic extraction infrastructure connecting KLayout layouts and process stacks to Magic, FasterCap and experimental internal 2.5D extraction. KPEX also generates PEX25D interconnect descriptions and provides standalone validation, conversion and solver-input export; backend maturity varies and the project remains early-stage."
scope:
  layout:
    ai: false
access: "Public Python implementation; selected extraction backends, KLayout and process-specific technology/LVS data are required."
addedAt: "2026-09-07"
reviewedAt: "2026-09-07"
sources:
  - id: "site"
    title: "Official KPEX overview and backend status"
    url: "https://iic-jku.github.io/klayout-pex-website/"
    purpose: "official"
  - id: "code"
    title: "Canonical iic-jku repository"
    url: "https://github.com/iic-jku/klayout-pex"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed main revision"
    url: "https://github.com/iic-jku/klayout-pex/blob/93d50dd2265b8d954cab1e8e60b2348848cee7d7/README.md"
  - id: "extraction-cli"
    title: "Extraction dispatch and layout-to-PEX25D generation"
    url: "https://github.com/iic-jku/klayout-pex/blob/93d50dd2265b8d954cab1e8e60b2348848cee7d7/klayout_pex/kpex_cli.py"
  - id: "layout-builder"
    title: "PEX25D builder from layout connectivity and process-stack information"
    url: "https://github.com/iic-jku/klayout-pex/blob/93d50dd2265b8d954cab1e8e60b2348848cee7d7/klayout_pex/klayout/pex25d_builder.py"
  - id: "exchange-cli"
    title: "Standalone PEX25D validation, conversion, resolution and export"
    url: "https://github.com/iic-jku/klayout-pex/blob/93d50dd2265b8d954cab1e8e60b2348848cee7d7/klayout_pex/pex25d/pex25d_cli.py"
  - id: "release"
    title: "KPEX v0.4.1, August 28, 2026"
    url: "https://github.com/iic-jku/klayout-pex/releases/tag/v0.4.1"
  - id: "activity"
    title: "PEX25D API/CLI implementation merged August 28, 2026"
    url: "https://github.com/iic-jku/klayout-pex/commit/0b6cf1ff25fcf7eb794c52999b2c850448144457"
---

### Implementation context

KPEX combines layout/LVS connectivity and technology-stack information with Magic, FasterCap and internal extraction paths. It produces backend-specific parasitic results and interconnect artifacts, adding dedicated extraction orchestration beyond KLayout's general editor, PCells and DRC/LVS. [Overview and status](#source-site); [reviewed README](#source-readme).

`kpex pex25d` builds an interconnect description from layout connectivity and the process stack, then stops before invoking an extraction engine. The independent `pex25d` CLI validates, re-encodes and resolves artifacts and exports FasterCap input files. Artifact generation, standalone conversion and engine execution are distinct implemented paths; an exchange format is not itself a completed solver. [Extraction dispatch](#source-extraction-cli); [layout builder](#source-layout-builder); [standalone CLI](#source-exchange-cli).

### Release boundary

Stable v0.4.1 was published August 28, 2026, including the PEX25D API/CLI work. The reviewed main head is later release-workflow housekeeping on the same day; meaningful activity is the extraction/exchange implementation merge. [Release](#source-release); [meaningful activity](#source-activity).

The official status describes an early-stage project: Magic capacitance/RC is usable, FasterCap capacitance awaits further QA, and internal 2.5D capacitance/resistance is prototype work. FastHenry2 R/L and combined internal RC/RCC extraction remain planned. No process-independent accuracy or signoff readiness is claimed. [Backend status](#source-site).

### Scope and development provenance

Layout covers parasitic extraction and layout-to-solver/model preparation. A field solver does not establish circuit Simulation. The reviewed operations are conventional; the README, development guide and reachable history do not establish substantial AI-assisted implementation, so no development label is assigned. [Reviewed implementation](#source-readme).
