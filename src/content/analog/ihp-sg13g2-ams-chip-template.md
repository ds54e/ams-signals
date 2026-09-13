---
name: "IHP SG13G2 AMS Chip Template"
aliases: ["ihp-sg13g2-ams-chip-template"]
summary: "Makefile-driven open-source reference flow for complete mixed-signal chips in IHP SG13G2."
description: "Provides a reproducible AMS chip template spanning analog schematics and simulation, cocotb/SystemVerilog digital verification, macro hardening, top-level assembly, DRC/LVS and extraction in IHP SG13G2. The 2026.08 release extends post-layout and parasitic-aware paths while keeping the project as an integration template rather than a new simulator or layout engine."
scope:
  design:
    ai: false
  simulation:
    ai: false
  layout:
    ai: false
targets: "Mixed-signal chips using the IHP SG13G2 Open-PDK and the IIC-OSIC-TOOLS environment."
access: "Public template and tutorial; documented baseline is IIC-OSIC-TOOLS 2026.08 or newer with the IHP SG13G2 Open-PDK."
addedAt: "2026-09-14"
reviewedAt: "2026-09-14"
sources:
  - id: "code"
    title: "Canonical IHP SG13G2 AMS chip template repository"
    url: "https://github.com/iic-jku/ihp-sg13g2-ams-chip-template"
    purpose: "code"
  - id: "readme"
    title: "Project README at release 2026.08"
    url: "https://github.com/iic-jku/ihp-sg13g2-ams-chip-template/blob/6524ffdd01daf7065d1669f268091b40cc4e3c21/README.md"
  - id: "activity"
    title: "Release 2026.08 merge"
    url: "https://github.com/iic-jku/ihp-sg13g2-ams-chip-template/commit/6524ffdd01daf7065d1669f268091b40cc4e3c21"
---

### Integrated flow

The template combines open-source analog and digital tools behind one Makefile-oriented project structure. Its documented path covers schematics and SPICE testbenches, RTL verification and hardening, chip assembly, physical checks and extracted/post-layout analysis. [Reviewed source](#source-readme).

### Release boundary

Release `2026.08` adds hardened digital-macro parasitic extraction paths and post-layout simulation support together with verification and flow cleanup. These are integration capabilities over the underlying tools; they do not imply a new signoff engine or process-independent accuracy claim. [Meaningful update](#source-activity).
