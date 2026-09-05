---
name: "Xschem"
aliases: []
roles: ["eda-tool"]
summary: "Edits hierarchical schematics and emits simulator-ready netlists."
description: "Schematic capture and netlisting environment for hierarchical custom-IC designs, with Tcl scripting, open-PDK examples and integration with ngspice and Xyce."
flow: {"design":"core","simulation":"supporting"}
access: "Public C/Tcl implementation and examples; X11/Tcl-Tk and the selected simulator/PDK are configured separately."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
    url: "https://github.com/StefanSchippers/xschem/blob/87eeb79c2c68eef08dcf982dac3842917b28a798/README.md"
  - id: "activity"
    title: "Reviewed substantive default-branch update"
    url: "https://github.com/StefanSchippers/xschem/commit/ecbcb21eb765b5069c9d72b976fcaab0db2a6a33"
  - id: "manual"
    title: "Schematic workflow and simulator integration"
    url: "https://github.com/StefanSchippers/xschem/blob/87eeb79c2c68eef08dcf982dac3842917b28a798/doc/xschem_man/xschem_man.html"
  - id: "migration"
    title: "Author Codeberg repository named in the migration notice"
    url: "https://codeberg.org/stef_xschem/xschem/"
---

### Scope

Edits hierarchical, parameterized schematics and produces SPICE, Verilog and VHDL netlists. Simulator invocation and backannotation support the editing workflow. Design is core, with supporting Simulation through these external tools. [Manual](#source-manual).

### Release boundary

The author advertises both GitHub and Codeberg during a migration. This snapshot uses only the explicitly requested, still-updated author GitHub repository; it does not combine host histories. Re-check the canonical host before refreshing after the transition. [Migration notice](#source-readme) and [official site](#source-site).

### Flow scope

Schematic capture and hierarchical netlisting are central. Simulator launch and result back-annotation support circuit analysis through external ngspice/Xyce tools. [Reviewed source](#source-readme).
