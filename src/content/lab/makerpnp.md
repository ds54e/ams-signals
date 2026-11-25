---
name: "MakerPnP"
aliases: ["PCB assembly planner","Variant Builder"]
description: "Rust tools for planning PCB assembly from EDA placement data and part-mapping rules. The planner and variant builder produce normalized placements, bills of materials and assembly plans, with Gerber views for locating components; machine operation is a separate project."
scope:
  board: { ai: false }
access: "Public source; no explicit reuse license was found in the reviewed tree. The planner GUI is work in progress."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/MakerPnP/makerpnp"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/MakerPnP/makerpnp/commit/67fb2ead2fa4aadbb112fa904f90283f58fe7fc2"
  - id: bom-output
    title: "March variant BOM generation"
    url: "https://github.com/MakerPnP/makerpnp/commit/b2dcdd5157ebff1d38a62d97ea4ef3b6fed6c4cc"
  - id: quantity
    title: "July BOM quantity-field implementation"
    url: "https://github.com/MakerPnP/makerpnp/commit/1ddbcae58c0f1ab9aed1a981eb7418729970b9c7"
  - id: variant-builder
    title: "Retained variant placement and BOM generation"
    url: "https://github.com/MakerPnP/makerpnp/blob/67fb2ead2fa4aadbb112fa904f90283f58fe7fc2/planning/variantbuilder_app/src/lib.rs"
  - id: overview
    title: "Planner and machine-project boundaries"
    url: "https://github.com/MakerPnP/makerpnp/blob/67fb2ead2fa4aadbb112fa904f90283f58fe7fc2/README.md"
---

## Scope and limits

The planner works downstream of EDA placement output, combining parts, assembly variants and operations. The variant builder implements placement and BOM generation, while the GUI relates part selections to Gerber views. This is distinct from panel geometry creation in KiKit and batch manufacturing-file generation in KiBot. The separate machine repository is not counted here, and planning an assembly does not constitute physical placement, inspection or electrical testing. [Variant implementation](#source-variant-builder) · [Project boundaries](#source-overview).

## Reviewed maintenance

March 2026 adds variant BOM creation; July extends the JLCPCB-format export with quantities, with manufacturer acceptance not established by the commit. November repairs component location in multi-side Gerber viewers when selecting BOM rows and adds UI fixture support. The reviewed variant implementation retains BOM generation and quantities. Some commit messages use an AI tag, but no actor-specific retained code attribution was established in this review. [March output](#source-bom-output) · [July quantity change](#source-quantity) · [November GUI correction](#source-activity).
