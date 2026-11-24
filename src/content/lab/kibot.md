---
name: "KiBot"
aliases: ["KiCad automation"]
description: "Batch automation for producing KiCad board manufacturing, assembly and review outputs. It generates artifacts such as fabrication files, BOMs and documentation from versioned configuration, supporting repeatable evaluation-board and fixture releases."
scope:
  board: { ai: false }
  test: { ai: false }
access: "AGPL-3.0; requires KiCad, with separate terms for optional tools."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
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
  - id: board-preflight
    title: "Reviewed PCB design-rule preflight"
    url: "https://github.com/INTI-CMNB/KiBot/blob/b81caf648b7eaf687b14c4290cc7e50d66eede33/kibot/pre_drc.py"
---

## Scope and limits

Pin KiCad and output options. Generated output does not by itself verify electrical behavior or fabrication. [InteractiveHtmlBom](#source-ibom) is a separate review workflow, also usable from KiBot.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

Board & Fixture describes the manufacturing and assembly outputs; Test Automation describes explicitly configured automated preflight checks, not the existence of an export script. [PCB preflight](#source-board-preflight).
