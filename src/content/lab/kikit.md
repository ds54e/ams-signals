---
name: "KiKit"
aliases: ["KiCad panelization"]
description: "Python library, command-line tool and KiCad plugin for repeatable PCB panelization and manufacturing preparation. It combines boards into configurable panels, generates separation geometry and exports manufacturing data, supporting evaluation-board and fixture production."
scope:
  design: { ai: false }
access: "MIT; requires a compatible KiCad installation."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://yaqwsx.github.io/KiKit/latest/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/yaqwsx/KiKit"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/yaqwsx/KiKit/commit/2aa564ff6019560e18553b2c7d16c875fa417d63"
  - id: variant-handling
    title: "KiCad 10 variant transfer and tests"
    url: "https://github.com/yaqwsx/KiKit/commit/958abd031e3d254d9777f6c192badbdb1c1c3757"
  - id: kibot
    title: "Related batch manufacturing-output workflow"
    url: "https://github.com/INTI-CMNB/KiBot"
---

## Scope and limits

KiKit creates panel geometry and related board artifacts, adding a board-transformation operation distinct from KiBot's batch output generation. Both can export manufacturing data; neither a generated panel nor a fabrication file establishes electrical correctness, manufacturability or assembly yield. [Related output workflow](#source-kibot).

## Reviewed maintenance

October 2026 implements transfer of KiCad 10 assembly variants into generated panels with regression tests. November 2026 avoids unnecessary temporary outline construction during saves that do not require zone refill; tests compare saved panel geometry and settings with the refill path. [Variant handling](#source-variant-handling) · [Panel save implementation](#source-activity).
