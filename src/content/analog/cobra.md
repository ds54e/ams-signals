---
name: "COBRA"
aliases: []
summary: "Surrogate-driven RF circuit optimization with circuit simulation and fixed-EM retuning."
description: "RFIC circuit optimizer that consumes learned ORCA component models, patches a circuit netlist and evaluates simulated responses against design goals. The reviewed source also supports retuning with fixed full-wave models; feasible surrogate inputs, simulator success and comparison with an independent reference remain separate checks."
scope: {"design": {"ai": true}, "simulation": {"ai": true}}
access: "Public Python implementation; circuit runs need Xyce or compatible VACASK setup and the relevant component models."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/DI-PASSIONATE/COBRA"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/DI-PASSIONATE/COBRA/commit/2b24532f2666b9c5a6030521c4997f8c93b9235a"
  - id: website
    title: "Maintainer documentation"
    url: "https://di-passionate.github.io/COBRA/"
    purpose: official
  - id: release
    title: "COBRA v3.2.0"
    url: "https://github.com/DI-PASSIONATE/COBRA/releases/tag/v3.2.0"
  - id: retune
    title: "Integrated circuit retuning with fixed EM models"
    url: "https://github.com/DI-PASSIONATE/COBRA/pull/75"
  - id: earlier
    title: "Earlier optimizer starting-point implementation"
    url: "https://github.com/DI-PASSIONATE/COBRA/pull/69"
---

### Scope and evidence

The optimization loop consumes learned S-parameters as numerical predictions that materially drive response evaluation and design trials. The circuit solver, vector fitting and fixed-EM retuning are numerical operations; the learned path does not make those engines model-driven. Unlike ORCA, COBRA optimizes a circuit from supplied component models rather than generating or training those models from geometry scans. No Layout label or development attribution is borrowed.

The reviewed source includes retuning and a DC-pin override with tests after v3.2.0. Neither the objective nor an upstream EM rerun establishes fabricated-circuit or out-of-domain accuracy. [Earlier optimizer work](#source-earlier) · [Version](#source-release) · [Retuning](#source-retune) · [DC-pin integration](#source-activity).
