---
name: "Xschem"
aliases: []
summary: "Edits hierarchical schematics and emits simulator-ready netlists."
description: "Captures hierarchical custom-IC schematics, emits SPICE/Verilog/VHDL netlists and integrates simulator control and backannotation. Embedded waveform tools include Smith charts for complex S-parameter or impedance data, with reference-impedance conversion and frequency cursors; numerical analyses run through separately configured simulators and PDKs."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The Smith-chart contributor explicitly states that an AI coding assistant implemented the feature. The merged and retained code adds complex-expression conversion, Smith-grid and trace rendering, and frequency-linked cursor interaction."
  sources: ["development-smith-disclosure", "review-20261011-1", "development-smith-retained"]
  reviewedAt: "2026-10-18"
access: "Public C/Tcl implementation and examples; X11/Tcl-Tk and the selected simulator/PDK are configured separately."
addedAt: "2026-09-05"
reviewedAt: "2026-11-15"
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://xschem.sourceforge.io/stefan/index.html"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/StefanSchippers/xschem"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/StefanSchippers/xschem/blob/903861594d60954c7dbacf9fa80ec92dfa8787ad/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/StefanSchippers/xschem/commit/ecbcb21eb765b5069c9d72b976fcaab0db2a6a33"
  - id: "manual"
    title: "Schematic workflow and simulator integration"
    url: "https://github.com/StefanSchippers/xschem/blob/87eeb79c2c68eef08dcf982dac3842917b28a798/doc/xschem_man/xschem_man.html"
  - id: "migration"
    title: "Author-maintained Codeberg mirror"
    url: "https://codeberg.org/stef_xschem/xschem/"
  - id: "activity-refresh"
    title: "Schematic-copy and window lifecycle maintenance, September 29, 2026"
    url: "https://github.com/StefanSchippers/xschem/commit/903861594d60954c7dbacf9fa80ec92dfa8787ad"
  - id: "fork-cleanup"
    title: "Remove fork-table entries after schematic tabs are renamed"
    url: "https://github.com/StefanSchippers/xschem/commit/125da79c9f480638daafb2797e55b1d3e4125ce4"
  - id: "activity-current"
    title: "Preserve modified schematics during fork cleanup"
    url: "https://github.com/StefanSchippers/xschem/commit/c15c6c05b175de17e81e6c4dd6175e07815add28"
  - id: "review-20261011-1"
    title: "Smith-chart integration"
    url: "https://github.com/StefanSchippers/xschem/commit/35a2184b7247f872ded516ad6b885e903e7575a5"
  - id: "review-20261011-2"
    title: "Drawing/complex-data implementation"
    url: "https://github.com/StefanSchippers/xschem/blob/cbfef85df54c2f17ecbe3f2c1ddba3a466d7d3a0/src/draw.c"
  - id: "development-smith-disclosure"
    title: "Author disclosure of AI implementation for Smith-chart feature"
    url: https://github.com/StefanSchippers/xschem/pull/511
  - id: "development-smith-retained"
    title: "Retained Smith expression and plotting implementation"
    url: https://github.com/StefanSchippers/xschem/blob/7a4a73b70cca12d248b1d25e65c3c93e463cde40/src/draw.c
  - id: "activity-review-20261115"
    title: "Netlisting hierarchy and stop-attribute repair"
    url: "https://github.com/StefanSchippers/xschem/commit/beb7bcba4519ea92e1268f3feef36f043d51f50f"
  - id: "implementation-review-20261115"
    title: "Current SPICE hierarchy and stop-attribute implementation"
    url: "https://github.com/StefanSchippers/xschem/blob/beb7bcba4519ea92e1268f3feef36f043d51f50f/src/spice_netlist.c"
  - id: "tests-review-20261115"
    title: "Existing multi-format netlisting regression driver"
    url: "https://github.com/StefanSchippers/xschem/blob/beb7bcba4519ea92e1268f3feef36f043d51f50f/tests/netlisting.tcl"
  - id: "readme-review-20261115"
    title: "Current author-maintained exact-mirror notice"
    url: "https://github.com/StefanSchippers/xschem/blob/beb7bcba4519ea92e1268f3feef36f043d51f50f/README.md"
  - id: "smith-review-20261115"
    title: "Current retained Smith plotting and complex-expression code"
    url: "https://github.com/StefanSchippers/xschem/blob/beb7bcba4519ea92e1268f3feef36f043d51f50f/src/draw.c"
---

### Scope

Edits hierarchical, parameterized schematics and produces SPICE, Verilog and VHDL netlists. Simulator invocation and backannotation support the editing workflow. Design covers schematic editing; Simulation covers integrated run control, waveform inspection and result backannotation. [Manual](#source-manual).

### Release boundary

The current README identifies GitHub and Codeberg as exact mirrors, replacing the earlier migration warning. This catalog continues to capture only the author-maintained GitHub repository and does not combine host histories. [Mirror notice](#source-readme); [Codeberg mirror](#source-migration).

The September 29 changes correct fork-table cleanup when schematic names change and preserve hierarchy transforms during schematic copying, alongside window/tab lifecycle maintenance. These are schematic-workflow implementation changes rather than a new simulation engine. [Cleanup correction](#source-fork-cleanup); [latest reviewed change](#source-activity-refresh).

### Scope classification

Schematic capture and hierarchical netlisting are central. Simulator launch and result back-annotation support circuit analysis through external ngspice/Xyce tools. [Reviewed source](#source-readme).

Schematic/netlist editing is conventional Design; simulator launch and back-annotation serve Simulation. Neither scripting nor external solver integration establishes AI inference. [AI/stage evidence](#source-readme).

### Current implementation and operating boundaries

The merged Smith-chart path plots complex data in the reflection-coefficient plane. For impedance inputs, imp() maps Z to (Z−Z0)/(Z+Z0), with a per-graph reference impedance and frequency cursors. Source, operating documentation and smoke/geometry/cursor regression scripts were inspected. [Smith-chart integration](#source-review-20261011-1) · [Drawing/complex-data implementation](#source-review-20261011-2)

No new numerical solver or AI stage is established. The plot uses a fixed reflection-coefficient window with clipping; zoom/pan and active-device values outside it have documented limits. Z0 conversion is not automatic renormalization of already stored S-parameter data. Tests were inspected, not executed. No tagged release was verified for the newly reviewed netlisting repair. [Current development change](#source-activity-review-20261115).

### Development provenance

The merged Smith-chart PR explicitly discloses that opencode implemented the feature. Its retained complex-expression evaluation, impedance-to-reflection conversion, grid/trace plotting and cursor interaction establish substantial feature implementation; tests, manuals and the general AI contribution policy are not the attribution basis. [Author disclosure](#source-development-smith-disclosure) · [Retained plotting implementation](#source-development-smith-retained).

### Current default-branch maintenance

The November 14 repair loads additional symbols before incrementing the schematic hierarchy level and suppresses additional-symbol loading for stopped SPICE, Spectre and Verilog blocks. The reviewed diff also corrects call ordering in the VHDL and tEDAx netlisters. This maintains schematic/netlist correctness within existing Design and Simulation coverage; it supplies no numerical solver or runtime AI. [Reviewed repair](#source-activity-review-20261115) · [Retained SPICE implementation](#source-implementation-review-20261115).

The existing regression driver exercises SPICE, Verilog, VHDL and tEDAx netlisting; the repair adds no targeted test. The Smith-chart implementation and its expression regressions remain present. Tests were read, not run, and the new repair is treated as master-branch development. The current README still identifies GitHub and Codeberg as exact mirrors; only GitHub history is captured. [Netlisting tests](#source-tests-review-20261115) · [Retained Smith code](#source-smith-review-20261115) · [Mirror notice](#source-readme-review-20261115).
