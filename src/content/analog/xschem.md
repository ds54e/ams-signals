---
name: "Xschem"
aliases: []
summary: "Edits hierarchical schematics and emits simulator-ready netlists."
description: "Schematic capture and netlisting environment for hierarchical custom-IC designs, with Tcl scripting and open-PDK examples. It emits SPICE, Verilog and VHDL netlists and integrates simulator run control, waveform inspection and result backannotation with tools such as ngspice and Xyce."
scope:
  design:
    ai: false
  simulation:
    ai: false
access: "Public C/Tcl implementation and examples; X11/Tcl-Tk and the selected simulator/PDK are configured separately."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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
---

### Scope

Edits hierarchical, parameterized schematics and produces SPICE, Verilog and VHDL netlists. Simulator invocation and backannotation support the editing workflow. Design covers schematic editing; Simulation covers integrated run control, waveform inspection and result backannotation. [Manual](#source-manual).

### Release boundary

The current README identifies GitHub and Codeberg as exact mirrors, replacing the earlier migration warning. This catalog continues to capture only the author-maintained GitHub repository and does not combine host histories. [Mirror notice](#source-readme); [Codeberg mirror](#source-migration).

The September 29 changes correct fork-table cleanup when schematic names change and preserve hierarchy transforms during schematic copying, alongside window/tab lifecycle maintenance. These are schematic-workflow implementation changes rather than a new simulation engine. [Cleanup correction](#source-fork-cleanup); [latest reviewed change](#source-activity-refresh).

### Scope classification

Schematic capture and hierarchical netlisting are central. Simulator launch and result back-annotation support circuit analysis through external ngspice/Xyce tools. [Reviewed source](#source-readme).

Schematic/netlist editing is conventional Design; simulator launch and back-annotation serve Simulation. Neither scripting nor external solver integration establishes AI inference. [AI/stage evidence](#source-readme).
