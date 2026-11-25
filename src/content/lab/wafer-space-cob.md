---
name: "wafer.space COB PCBs"
aliases: ["Chip-on-Board Wire-Bonded PCBs"]
description: "KiCad designs for mounting bare integrated-circuit dies on wire-bonded breakout and mezzanine PCBs. Run-specific board layouts, pad and connector documentation, panelization and manufacturing outputs support access to open-silicon dies through compatible motherboards."
scope:
  board: { ai: false }
access: "Apache-2.0; requires the matching die, padframe, wire-bonding process and fabrication capabilities. Run-specific layouts are not interchangeable without review."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/wafer-space/chip-on-board-wire-bonded-pcbs"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/wafer-space/chip-on-board-wire-bonded-pcbs/commit/5cb466897372ac6c9df03142287858c1c8b1c9a7"
  - id: earlier
    title: "August half-slot panel and manufacturing outputs"
    url: "https://github.com/wafer-space/chip-on-board-wire-bonded-pcbs/commit/ab927324608bacfedf7cc474a93b90e54f719402"
  - id: board-layout
    title: "Reviewed Run 2 mezzanine layout"
    url: "https://github.com/wafer-space/chip-on-board-wire-bonded-pcbs/blob/5cb466897372ac6c9df03142287858c1c8b1c9a7/run-2/1x1-cob/1x1-mezzanine.kicad_pcb"
  - id: run-docs
    title: "Run-specific board and wire-bonding documentation"
    url: "https://github.com/wafer-space/chip-on-board-wire-bonded-pcbs/blob/5cb466897372ac6c9df03142287858c1c8b1c9a7/README.md"
---

## Scope and limits

The repository provides physical board designs for attaching bare dies and breaking out their connections, rather than only a chip pinout or packaging model. Run-specific mezzanines and panel files support a manufactured assembly workflow. The maintainers report delivery of wire-bonded parts from Run 1; the reviewed Run 2 documentation labels its generated renders unreleased. This is not a calibrated ATE load board or wafer probe card. The design does not establish wire-bond parasitics, thermal behavior or high-speed measurement performance for another device. [Layout](#source-board-layout) · [Run documentation](#source-run-docs).

## Reviewed maintenance

August 2026 adds a half-slot PCB panel with manufacturing netlist, placement and fabrication outputs. October corrects a clearance violation in the Run 2 full-slot mezzanine and updates the associated panel and production files. The PCB source remains in the reviewed revision. [Panel integration](#source-earlier) · [Clearance correction](#source-activity).
