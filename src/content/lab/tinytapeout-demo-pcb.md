---
name: "Tiny Tapeout Demo Board"
aliases: ["Tiny Tapeout ASIC evaluation board"]
description: "Open KiCad evaluation-board designs for Tiny Tapeout ASICs. The board connects the ASIC to an onboard RP2350 controller, manual controls, PMOD expansion and analog headers, allowing access to selected projects and external test circuits."
scope:
  board: { ai: false }
access: "Apache-2.0 PCB designs; documentation CC0. Requires compatible Tiny Tapeout hardware and separate controller firmware."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/TinyTapeout/tt-demo-pcb"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/TinyTapeout/tt-demo-pcb/commit/ecb636aced1a431edb12ec634f3f88c586f39cf4"
  - id: prototype
    title: "December 2025 prototype schematic and PCB integration"
    url: "https://github.com/TinyTapeout/tt-demo-pcb/commit/d830790ca1dc9b7cfdb0bc341b329b2fcda0a943"
  - id: board-layout
    title: "Retained evaluation-board PCB design"
    url: "https://github.com/TinyTapeout/tt-demo-pcb/blob/bbf3dd1f771d5aed249b07ddf130b3ddc8261d60/tinytapeout-demo.kicad_pcb"
  - id: overview
    title: "Reviewed board interfaces and analog access documentation"
    url: "https://github.com/TinyTapeout/tt-demo-pcb/blob/bbf3dd1f771d5aed249b07ddf130b3ddc8261d60/README.md"
---

## Scope and limits

This project implements an evaluation motherboard for selecting and exercising Tiny Tapeout ASIC projects, distinct from bare-die mounting and wire-bond breakout designs. It exposes manual, microcontroller and external instrument connections. The reviewed schematic and PCB change history and the retained tree establish Board & Fixture; controller firmware and automated test programs belong to separate projects. The board is not a commercial ATE interface and does not establish calibrated analog bandwidth or measurement uncertainty. [Board overview](#source-overview) · [PCB design](#source-board-layout).

## Reviewed maintenance

December 2025 integrates the v3.2 prototype schematic and board files. June 2026 records revisions to manual clocking, the analog reference-current source and analog-line protection, modifying the KiCad schematic and layout. These are hardware design changes after earlier usable board versions; the August README edit does not advance the meaningful activity checkpoint. The reviewed tree retains the design files, although the full current large layout was not retrieved for detailed electrical review. [Prototype integration](#source-prototype) · [Hardware revision](#source-activity).
