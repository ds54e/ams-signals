---
name: "IHP SG13G2 AMS Chip Template"
aliases: ["ihp-sg13g2-ams-chip-template"]
summary: "Makefile-driven open-source reference flow for complete mixed-signal chips in IHP SG13G2."
description: "AMS chip-design template integrating analog schematics and simulation, digital verification, macro hardening, top-level assembly and DRC/LVS/PEX for IHP SG13G2. Project-creation targets and process-specific tool recipes organize a reusable flow, while external engines and PDK versions determine checking and extraction coverage."
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
reviewedAt: "2026-10-22"
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
  - id: "review-20261022-project"
    title: "Current SG13G2 project-creation and flow targets"
    url: "https://github.com/iic-jku/ihp-sg13g2-ams-chip-template/blob/b1d4a98d0ec8ad71c57f8ec4c33344340f911dad/Makefile"
  - id: "review-20261022-cmos5l"
    title: "Related SG13CMOS5L template targets"
    url: "https://github.com/iic-jku/ihp-sg13cmos5l-ams-chip-template/blob/60166ac618be6cc312253b7fed33f8478d044a55/Makefile"
---

### Integrated flow

The template combines open-source analog and digital tools behind one Makefile-oriented project structure. Its documented path covers schematics and SPICE testbenches, RTL verification and hardening, chip assembly, physical checks and extracted/post-layout analysis. [Reviewed source](#source-readme).

### Release boundary

Release `2026.08` adds hardened digital-macro parasitic extraction paths and post-layout simulation support together with verification and flow cleanup. These are integration capabilities over the underlying tools; they do not imply a new signoff engine or process-independent accuracy claim. [Meaningful update](#source-activity).

### Review of exposed operations and limits, October 22, 2026

Current main includes make project to create a new chip from the template. The SG13CMOS5L repository shares the template operation with different process-specific assets; it is documented as a related alternative rather than automatically duplicated in the catalog. DRC/LVS/PEX are delegated recipes, and a template selecting Magic does not prove that another KPEX backend lacks an executable path. [SG13G2 targets](#source-review-20261022-project); [CMOS5L alternative](#source-review-20261022-cmos5l).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. Existing activity freshness checkpoints and development-provenance labels are preserved.
