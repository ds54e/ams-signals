---
name: "KLayout-PEX"
aliases: ["KPEX"]
summary: "Connects layout connectivity and process stacks to parasitic extraction and interconnect-model exchange."
description: "Layout parasitic extraction infrastructure combining KLayout connectivity and process stacks with Magic, FasterCap and an internal 2.5D engine. Device-aware terminal placement, contact resistance and process-specific well coupling feed PEX25D/RC artifacts; the GPL-3.0-or-later project remains Pre-Alpha, with backend- and technology-specific accuracy limits."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited development reworked device-terminal attachment to extracted resistor networks and implemented RC/LVS identity consistency checking. The netlist-checking module remains in the current extraction flow."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "Public Python implementation under GPL-3.0-or-later, classified Pre-Alpha by the project. Extraction backends, KLayout and process-specific technology/LVS data are required; the internal 2.5D engine remains under development."
addedAt: "2026-09-07"
reviewedAt: "2026-10-24"
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
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/iic-jku/klayout-pex/commit/fa847742905944dfc18a481efdad77055bc543fd"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/iic-jku/klayout-pex/commit/175f7d2a1d06e77c4bf61774ab11242139a18aa5"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/iic-jku/klayout-pex/blob/b858237bdcdfcc002f69b8b6c244e541546d8127/klayout_pex/rcx25/netlist_checks.py"
  - id: "review-20261022-generator"
    title: "Current IHP technology generator"
    url: "https://github.com/iic-jku/klayout-pex/blob/d3582837761b045ef330ce84737984114fe240e3/scripts/gen_tech_pb/ihp_sg13.py"
  - id: "review-20261022-cmos5l"
    title: "Version-specific SG13CMOS5L extraction bench"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/ihp-sg13cmos5l/pex_bench/README.md"
  - id: "review-20261022-gf180"
    title: "Version-specific GF180 extraction bench"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/gf180mcuD/pex_bench/README.md"
  - id: "review-20261022-sky130"
    title: "SKY130 extraction bench coverage"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/sky130A/pex_bench/README.md"
  - id: "review-20261022-ihp"
    title: "IHP extraction comparison method"
    url: "https://github.com/iic-jku/open-pdks-regression-tests/blob/3a97ca55bfbf482400f6b8d35f341b465303fe13/ihp-sg13g2/pex_bench/README.md"
  - id: "review-20261024-device-contacts"
    title: "Device contacts as vias and source/drain terminal placement"
    url: "https://github.com/iic-jku/klayout-pex/commit/5532a30100075a7925a6bd338ec035f3f83d8d28"
  - id: "review-20261024-diffusion-resistance"
    title: "SKY130 diffusion-resistor terminals and contact resistance"
    url: "https://github.com/iic-jku/klayout-pex/commit/b9e160bfa8dea19f406ed8e9ff9d4884667c5c31"
  - id: "review-20261024-isolated-wells"
    title: "GF180 isolated p-well and deep-nwell coupling"
    url: "https://github.com/iic-jku/klayout-pex/commit/4799f2e31c13e7435d88e07a57edaac357f77a69"
  - id: "review-20261024-integration"
    title: "First-parent integration including diffusion-resistor contact corrections"
    url: "https://github.com/iic-jku/klayout-pex/commit/43f6bb0989fd6e392a150f90a93f8bead01eb53e"
  - id: "review-20261024-status"
    title: "GPL-3.0-or-later license and Pre-Alpha project metadata"
    url: "https://github.com/iic-jku/klayout-pex/blob/9f26477da2df4f9c10a16853bbfde52be60701d9/pyproject.toml"
---

### Implementation context

KPEX combines layout/LVS connectivity and technology-stack information with Magic, FasterCap and internal extraction paths. It produces backend-specific parasitic results and interconnect artifacts, adding dedicated extraction orchestration beyond KLayout's general editor, PCells and DRC/LVS. [Overview and status](#source-site); [reviewed README](#source-readme).

`kpex pex25d` builds an interconnect description from layout connectivity and the process stack, then stops before invoking an extraction engine. The independent `pex25d` CLI validates, re-encodes and resolves artifacts and exports FasterCap input files. Artifact generation, standalone conversion and engine execution are distinct implemented paths; an exchange format is not itself a completed solver. [Extraction dispatch](#source-extraction-cli); [layout builder](#source-layout-builder); [standalone CLI](#source-exchange-cli).

### Release boundary

Stable v0.5.3 was published September 30, 2026, including SKY130 fixes, device-to-SPICE mapping and RC-netlist correctness work. The substantive implementation reconnects device terminals to extracted resistor-network nodes, preserves multi-label ports and checks the emitted netlist against LVS connectivity. Its following version bump remains release metadata rather than that implementation checkpoint. [Earlier release](#source-release) · [RC corrections](#source-activity-refresh).

Stable v0.6.1 was published October 2 UTC. It includes substrate/well-capacitance corrections, white-box/black-box capacitor handling and expanded netlist/device checks. The snapshot retains the reviewed substrate-capacitance implementation rather than promoting the later version bump to meaningful activity. [Current release](#source-release-current); [implementation](#source-activity-current).

The website status still labels combined internal RC/RCC extraction planned, while current code and regression tests already exercise emitted RC netlists. Prefer that concrete implementation evidence for current operations without treating it as completed backend qualification; the README continues to call the internal 2.5D engine under development. No process-independent accuracy or signoff readiness is claimed. [Backend status](#source-site) · [RC corrections](#source-activity-refresh) · [Current README](#source-current-readme).

### Scope and development provenance

Layout covers parasitic extraction and layout-to-solver/model preparation. A field solver does not establish circuit Simulation. The reviewed extraction operations are conventional; their runtime stage classification is separate from the AI-assisted implementation evidence below. [Reviewed implementation](#source-readme).

### Current implementation and operating boundaries

RCX25 preserves capacitance geometry and distributes capacitance to nodes along resistor networks, using area/edge intersections and nearest-node regions. Very small capacitances merge without changing the total between the same nets. Follow-up fixes connect label-only nodes, distinguish via identifiers, use the correct shapes when stack layers share GDS pairs and repair IHP/GF180 MIM terminal/dielectric handling. [Distributed-capacitance integration](#source-review-20261011-1) · [Distributor implementation](#source-review-20261011-2) · [MIM terminal regression](#source-review-20261011-3) · [MIM dielectric checkpoint](#source-review-20261011-4) · [Release v0.6.5](#source-review-20261011-5)

The reviewed tests were not run, and source coverage is not independent process/signoff accuracy validation. RC netlist output is a Layout artifact; it does not alone add Simulation. Process and backend boundaries remain explicit.

### Development provenance

The contribution changes terminal/node identity propagation through extraction summaries and netlist expansion, then checks device connectivity, net isolation, ports and capacitance accounting against the LVS reference. This is a coherent electrical-correctness implementation campaign, not a label inferred from extraction being useful to agents. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)

### Review of exposed operations and limits, October 22, 2026

Process availability and accuracy are separate questions. The SG13CMOS5L bench records missing included LVS decks through 0.4.4, an executable path from 0.4.5, and pinned results at 0.6.3. The GF180 bench records a top-metal technology-file failure through 0.5.1 and its correction in 0.5.2. The October 22 review examined upstream 0.6.10; those historical results do not qualify later development commits. The current IHP generator and the bench still require coefficient-by-coefficient review for the CMOS5L variant; no old defect count is promoted to a current universal claim. [Technology generator](#source-review-20261022-generator); [CMOS5L](#source-review-20261022-cmos5l); [GF180](#source-review-20261022-gf180); [SKY130](#source-review-20261022-sky130).

KPEX driving Magic and Magic run directly are not independent numerical references. Deck arithmetic, internal 2.5D models and FasterCap results use different assumptions and boundary/mesh choices; agreement with a PDK deck is distinct from agreement with measured silicon. A disagreement need not mean that exactly one engine is wrong. [Comparison setup](#source-review-20261022-ihp).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. Development-provenance labels are preserved.

### Device terminals and process-specific well coupling

The reviewed development changes model device contacts as vias and place source/drain terminals on their contacts, with IHP, SKY130 and GF180 device-terminal regressions. Diffusion provides an empty geometric anchor at the contact end, not a complete semiconductor geometry or device-physics model. The SKY130 diffusion-resistor change attaches terminals to their licons and applies process-specific contact resistance. [Device contacts](#source-review-20261024-device-contacts) · [Diffusion-resistor correction](#source-review-20261024-diffusion-resistance).

GF180 now distinguishes an isolated LVPWELL within DNWELL from an LVPWELL outside DNWELL that belongs to the substrate. The corresponding technology data and metal-over-well regressions connect coupling to the appropriate well nets. This is process-specific electrical connectivity and extraction work, not universal well accuracy validation. [Isolated-well implementation and cases](#source-review-20261024-isolated-wells).

The individual changes are side-branch commits integrated on October 23 UTC. The meaningful activity checkpoint is first-parent merge `43f6bb0989fd6e392a150f90a93f8bead01eb53e`, which includes the diffusion-resistor correction; later version and dependency maintenance are not substituted for this implementation evidence. These are default-branch development updates, with tagged-release inclusion and external extraction tests unverified. The project remains GPL-3.0-or-later and Pre-Alpha; Layout and its existing runtime-AI/development-provenance classification are unchanged. [Integration](#source-review-20261024-integration) · [Project status and license](#source-review-20261024-status).
