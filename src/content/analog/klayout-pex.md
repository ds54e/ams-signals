---
name: "KLayout-PEX"
aliases: ["KPEX"]
summary: "Connects layout connectivity and process stacks to parasitic extraction and interconnect-model exchange."
description: "Parasitic extraction infrastructure linking KLayout connectivity and process stacks to Magic, FasterCap and an internal 2.5D engine. It emits PEX25D artifacts and RC netlists with geometry-based capacitance distribution along resistor networks; process-layer and MIM-terminal handling remain backend- and technology-specific."
scope:
  layout:
    ai: false
access: "Public Python implementation; selected extraction backends, KLayout and process-specific technology/LVS data are required."
addedAt: "2026-09-07"
reviewedAt: "2026-10-11"
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
    title: "KPEX v0.5.3, September 30, 2026"
    url: "https://github.com/iic-jku/klayout-pex/releases/tag/v0.5.3"
  - id: "activity"
    title: "PEX25D API/CLI implementation merged August 28, 2026"
    url: "https://github.com/iic-jku/klayout-pex/commit/0b6cf1ff25fcf7eb794c52999b2c850448144457"
  - id: "activity-refresh"
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/iic-jku/klayout-pex/commit/2633399296cb80b935598d6dbc93abdcad658a74"
  - id: "current-readme"
    title: "Current engine and installation overview"
    url: "https://github.com/iic-jku/klayout-pex/blob/a575c97c332fed89aa42cc376315e404f75876da/README.md"
  - id: "activity-current"
    title: "Substrate and well capacitance extraction with regression coverage"
    url: "https://github.com/iic-jku/klayout-pex/commit/dbfebf4a47582801df912f6288f240b3ac65d623"
  - id: "release-current"
    title: "KPEX v0.6.1 stable release, October 2, 2026 UTC"
    url: "https://github.com/iic-jku/klayout-pex/releases/tag/v0.6.1"
  - id: "review-20261011-1"
    title: "Distributed-capacitance integration"
    url: "https://github.com/iic-jku/klayout-pex/commit/0938f4a3e29c4eaeb8fd7f8ac1c45b0fc051dfb4"
  - id: "review-20261011-2"
    title: "Distributor implementation"
    url: "https://github.com/iic-jku/klayout-pex/blob/b858237bdcdfcc002f69b8b6c244e541546d8127/klayout_pex/rcx25/capacitance_distributor.py"
  - id: "review-20261011-3"
    title: "MIM terminal regression"
    url: "https://github.com/iic-jku/klayout-pex/blob/b858237bdcdfcc002f69b8b6c244e541546d8127/tests/pex25d/pex25d_mim_cap_terminals_test.py"
  - id: "review-20261011-4"
    title: "MIM dielectric checkpoint"
    url: "https://github.com/iic-jku/klayout-pex/commit/78570a9e6cf38f938685194f4ebb6db91a1521c7"
  - id: "review-20261011-5"
    title: "Release v0.6.5"
    url: "https://github.com/iic-jku/klayout-pex/releases/tag/v0.6.5"
---

### Implementation context

KPEX combines layout/LVS connectivity and technology-stack information with Magic, FasterCap and internal extraction paths. It produces backend-specific parasitic results and interconnect artifacts, adding dedicated extraction orchestration beyond KLayout's general editor, PCells and DRC/LVS. [Overview and status](#source-site); [reviewed README](#source-readme).

`kpex pex25d` builds an interconnect description from layout connectivity and the process stack, then stops before invoking an extraction engine. The independent `pex25d` CLI validates, re-encodes and resolves artifacts and exports FasterCap input files. Artifact generation, standalone conversion and engine execution are distinct implemented paths; an exchange format is not itself a completed solver. [Extraction dispatch](#source-extraction-cli); [layout builder](#source-layout-builder); [standalone CLI](#source-exchange-cli).

### Release boundary

Stable v0.5.3 was published September 30, 2026, including SKY130 fixes, device-to-SPICE mapping and RC-netlist correctness work. The substantive implementation reconnects device terminals to extracted resistor-network nodes, preserves multi-label ports and checks the emitted netlist against LVS connectivity. Its following version bump remains release metadata rather than that implementation checkpoint. [Earlier release](#source-release) · [RC corrections](#source-activity-refresh).

Stable v0.6.1 was published October 2 UTC. It includes substrate/well-capacitance corrections, white-box/black-box capacitor handling and expanded netlist/device checks. The snapshot retains the reviewed substrate-capacitance implementation rather than promoting the later version bump to meaningful activity. [Current release](#source-release-current); [implementation](#source-activity-current).

The website status still labels combined internal RC/RCC extraction planned, while current code and regression tests already exercise emitted RC netlists. Prefer that concrete implementation evidence for current operations without treating it as completed backend qualification; the README continues to call the internal 2.5D engine under development. No process-independent accuracy or signoff readiness is claimed. [Backend status](#source-site) · [RC corrections](#source-activity-refresh) · [Current README](#source-current-readme).

### Scope and development provenance

Layout covers parasitic extraction and layout-to-solver/model preparation. A field solver does not establish circuit Simulation. The reviewed operations are conventional; the README, development guide and reachable history do not establish substantial AI-assisted implementation, so no development label is assigned. [Reviewed implementation](#source-readme).

### Current implementation and operating boundaries

RCX25 preserves capacitance geometry and distributes capacitance to nodes along resistor networks, using area/edge intersections and nearest-node regions. Very small capacitances merge without changing the total between the same nets. Follow-up fixes connect label-only nodes, distinguish via identifiers, use the correct shapes when stack layers share GDS pairs and repair IHP/GF180 MIM terminal/dielectric handling. [Distributed-capacitance integration](#source-review-20261011-1) · [Distributor implementation](#source-review-20261011-2) · [MIM terminal regression](#source-review-20261011-3) · [MIM dielectric checkpoint](#source-review-20261011-4) · [Release v0.6.5](#source-review-20261011-5)

The reviewed tests were not run, and source coverage is not independent process/signoff accuracy validation. RC netlist output is a Layout artifact; it does not alone add Simulation. Process and backend boundaries remain explicit.
