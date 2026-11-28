---
name: "KiBot"
aliases: ["KiCad automation"]
description: "Batch automation for producing KiCad board manufacturing, assembly and review outputs. It generates artifacts such as fabrication files, BOMs and documentation from versioned configuration, supporting repeatable evaluation-board and fixture releases."
scope:
  design: { ai: false }
access: "AGPL-3.0; requires KiCad, with separate terms for optional tools."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/INTI-CMNB/KiBot"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/INTI-CMNB/KiBot/commit/6f93e6a365f83647cbe5ee569953a9c665f273c2"
  - id: ibom
    title: "InteractiveHtmlBom"
    url: "https://github.com/openscopeproject/InteractiveHtmlBom"
  - id: ibom-integration
    title: "Retained InteractiveHtmlBom output integration"
    url: "https://github.com/INTI-CMNB/KiBot/blob/b81caf648b7eaf687b14c4290cc7e50d66eede33/kibot/out_ibom.py"
  - id: related-makerpnp
    title: "Related independent PCB assembly planning implementation"
    url: "https://github.com/MakerPnP/makerpnp"
  - id: related-makerpnp-planning
    title: "Related variant builder implementation"
    url: "https://github.com/MakerPnP/makerpnp/blob/67fb2ead2fa4aadbb112fa904f90283f58fe7fc2/planning/variantbuilder_app/src/lib.rs"
  - id: board-preflight
    title: "Reviewed PCB design-rule preflight"
    url: "https://github.com/INTI-CMNB/KiBot/blob/b81caf648b7eaf687b14c4290cc7e50d66eede33/kibot/pre_drc.py"
  - id: maintenance-earlier
    title: "July 2026 correction to multi-page PDF assembly"
    url: "https://github.com/INTI-CMNB/KiBot/commit/6fb22377c721bd29515420eb316017cb68f681bd"
  - id: development-fix
    title: "November 2026 compute_dnp compatibility correction on dev"
    url: "https://github.com/INTI-CMNB/KiBot/commit/32ff896cb60053b38f9fa7b2605a5069dcb037e1"
  - id: release
    title: "KiBot v1.9.1 release and integrated development branch"
    url: "https://github.com/INTI-CMNB/KiBot/releases/tag/v1.9.1"
  - id: dev-variant-refactor
    title: "November 27 development-branch variant layer handling"
    url: "https://github.com/INTI-CMNB/KiBot/commit/901c707c0bc43d2527635e345ae5c7b29e4035a0"
  - id: dev-variant-retained
    title: "Development-branch paste and mask removal implementation"
    url: "https://github.com/INTI-CMNB/KiBot/blob/901c707c0bc43d2527635e345ae5c7b29e4035a0/kibot/out_base.py"
---

## Scope and limits

Pin KiCad and output options. Generated output does not by itself verify electrical behavior or fabrication. [InteractiveHtmlBom](#source-ibom) is an independently maintained assembly-review plugin, invoked through KiBot's optional IBoM output integration rather than implemented by KiBot itself. Its standalone component-location and placement-tracking workflow is retained here as a related resource. [Integration](#source-ibom-integration).

[MakerPnP](#source-related-makerpnp) is a separate assembly-planning tool whose variant builder produces placements and BOMs from existing EDA outputs. It is not a KiBot dependency or an electrical test-fixture design tool; keep it as a related downstream assembly resource rather than a separate catalog row. [Variant builder](#source-related-makerpnp-planning).

Design describes the manufacturing and assembly outputs, including their configured ERC/DRC preflight checks. Those checks validate board design artifacts; they are not a separate instrument or DUT test procedure. [PCB preflight](#source-board-preflight).

## Reviewed maintenance

The July 2026 PDF correction preserves every input page and was followed by the v1.9.1 release. November work on `master` repairs configuration-schema validation. The `dev` branch also corrects the legacy schematic `compute_dnp` signature for variant handling; that development-branch fix is separate from the reviewed `master` activity and the July release. Branch and tag selection determine which changes are available. [PDF correction](#source-maintenance-earlier) · [Release](#source-release) · [Master schema](#source-activity) · [Development fix](#source-development-fix).

## November 28, 2026 retention review

The maintained fork's dev branch has later executable development than master: November 27 refactors the paste, mask and adhesive removal operations for unpopulated parts and introduces layer-list adapter functions. The retained removal path still rejects the configuration without the legacy pcbnew API, so this is not evidence that variant paste removal is already implemented for the new API. Keep the November 10 master checkpoint and captured history unchanged; this branch evidence supports continued development, not released functionality. [Development change](#source-dev-variant-refactor) · [Retained code](#source-dev-variant-retained).
