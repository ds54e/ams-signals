---
name: "EEZ BB3+"
aliases: [EEZ BB3 Plus, eez-bb3plus]
description: "Published KiCad and fabrication designs for a modular test-and-measurement chassis, including a 10 MHz reference fanout, module interconnects and a mixed I/O board. Schematics, PCB layouts, BOMs, Gerbers and mechanical files are available; the project is under development and requires compatible controllers, firmware, modules, assembly and validation."
scope:
  board: { ai: false }
access: "TAPR Open Hardware License v1.0 for the hardware documentation. This is a developing hardware design; controller modules, firmware and third-party components have their own dependencies and terms. The reviewed sources use KiCad 10."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical EEZ BB3+ hardware design repository"
    url: "https://github.com/eez-open/eez-bb3plus"
    purpose: code
  - id: readme
    title: "Current hardware scope, development state and companion modules"
    url: "https://github.com/eez-open/eez-bb3plus/blob/71a8d8af1d02bbbcf05235a1235fb1a7dc486990/README.md"
  - id: designs
    title: "KiCad schematic, PCB and enclosure sources"
    url: "https://github.com/eez-open/eez-bb3plus/tree/71a8d8af1d02bbbcf05235a1235fb1a7dc486990/KiCad"
  - id: fabrication
    title: "BOM, Gerber, placement and mechanical fabrication outputs"
    url: "https://github.com/eez-open/eez-bb3plus/tree/71a8d8af1d02bbbcf05235a1235fb1a7dc486990/fabrication"
  - id: clock-fanout
    title: "10 MHz TCXO and reference-clock fanout schematic"
    url: "https://github.com/eez-open/eez-bb3plus/blob/71a8d8af1d02bbbcf05235a1235fb1a7dc486990/KiCad/BB3plus%20mainboard/video_outputs.kicad_sch"
  - id: io-board
    title: "BIO2210 analog input, output and protected-rail schematic"
    url: "https://github.com/eez-open/eez-bb3plus/blob/71a8d8af1d02bbbcf05235a1235fb1a7dc486990/KiCad/BIO2210/analog_io.kicad_sch"
  - id: adapter-pcb
    title: "DIB2 adapter PCB implementation"
    url: "https://github.com/eez-open/eez-bb3plus/blob/71a8d8af1d02bbbcf05235a1235fb1a7dc486990/KiCad/DIB2%20adapter/DIB2%20adapter.kicad_pcb"
  - id: license
    title: "Hardware-documentation license"
    url: "https://github.com/eez-open/eez-bb3plus/blob/71a8d8af1d02bbbcf05235a1235fb1a7dc486990/LICENSE.TXT"
  - id: activity
    title: "Correct TCXO symbol, enable wiring and corresponding board outputs"
    url: "https://github.com/eez-open/eez-bb3plus/commit/c22ade78ec94c66ec70ac64466ba0cb55f1ceb80"
  - id: earlier-maintenance
    title: "Add physical test points and update board fabrication outputs"
    url: "https://github.com/eez-open/eez-bb3plus/commit/2001bd2646f76649d74ec91ded7468f50630ddde"
  - id: predecessor
    title: "Earlier EEZ BB3 hardware design"
    url: "https://github.com/eez-open/modular-psu"
---

### Scope and maturity

The repository supplies actual schematic and PCB sources plus fabrication and mechanical artifacts for the chassis, mainboard, display, DIB2 adapter and BIO2210 I/O module. The reference-clock schematic includes a 10 MHz TCXO and fanout to the module slots. These artifacts establish Board & Fixture independently of the controller firmware or a working acquisition application. [Design sources](#source-designs); [Fabrication outputs](#source-fabrication); [Clock schematic](#source-clock-fanout); [I/O schematic](#source-io-board); [Adapter PCB](#source-adapter-pcb).

The project describes itself as work in progress. The listing does not treat planned integration, electrical specifications, clock jitter or a certification target as independently verified hardware performance. Controller and module dependencies must be assessed for the chosen build. No board was fabricated, assembled or electrically tested for this review. [Project status and dependencies](#source-readme); [Hardware license](#source-license).

### Selection

July 2026 work added physical test points with corresponding schematic, PCB and manufacturing-output updates. November work corrected the TCXO symbol and enable wiring and regenerated the associated board outputs. These separate design revisions support inclusion beyond an initial CAD upload. Activity belongs to the BB3+ repository; the predecessor BB3 design is linked for lineage and is not combined with its history. [Earlier hardware revision](#source-earlier-maintenance); [Current hardware revision](#source-activity); [Predecessor](#source-predecessor).
