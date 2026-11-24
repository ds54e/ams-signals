---
name: "FasterCap"
aliases: ["IIC-JKU FasterCap"]
summary: "Extracts electrostatic capacitance matrices from discretized conductors and dielectric boundaries."
description: "Boundary-element solver for extracting electrostatic capacitance matrices from conductors and dielectric interfaces. The maintained IIC-JKU implementation supports geometry discretization and iterative solution for capacitance extraction workflows, including use with separate layout-to-geometry tooling."
scope:
  layout: { ai: false }
access: "LGPL-2.1-or-later; this entry covers the IIC-JKU maintained implementation."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/iic-jku/FasterCap"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/iic-jku/FasterCap/commit/4d5d52a2d93433d84770ad84f0a7890e86872ac8"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/iic-jku/FasterCap/commit/60a6d579ade05797cc6e43e4812e51c36650991c"
  - id: lineage
    title: "Original FasterCap implementation"
    url: "https://github.com/ediloren/FasterCap"
  - id: release
    title: "IIC-JKU FasterCap v6.4.0"
    url: "https://github.com/iic-jku/FasterCap/releases/tag/v6.4.0"
  - id: convergence
    title: "Algebraic and mesh convergence boundaries"
    url: "https://github.com/iic-jku/FasterCap/blob/171f2462fc33b1e67e8d02227c7d141fe95ee3ee/doc/automatic-convergence.md"
---

## Scope and limits

Version 6.4.0 improves boundary handling and numerical checks. Small residuals do not establish physical accuracy; a nonzero exit can accompany an emitted matrix. Keep the solver version, geometry and convergence settings with results.

[Reviewed upstream implementation](#source-implementation).

Additional context: [Original FasterCap implementation](#source-lineage); [IIC-JKU FasterCap v6.4.0](#source-release); [Algebraic and mesh convergence boundaries](#source-convergence).
