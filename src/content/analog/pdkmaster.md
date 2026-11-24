---
name: "PDKMaster"
aliases: []
description: "Python framework for describing IC process rules and constructing process-specific circuits and physical layouts. It provides factories for device instances, geometry and cell libraries; usable rules depend on the supplied technology, and export tooling and foundry signoff are separate."
scope: {"design": {"ai": false}, "layout": {"ai": false}}
access: "Public Python framework; requires an applicable technology definition. The API is still changing."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
summary: "Technology-defined analog circuits and physical layouts from Python."
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://gitlab.com/Chips4Makers/PDKMaster"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://gitlab.com/Chips4Makers/PDKMaster/-/commit/99d3e6b4f0ca82019a8899fd252fae2d7786d770"
  - id: release
    title: "PDKMaster v0.12.1"
    url: "https://gitlab.com/Chips4Makers/PDKMaster/-/tree/v0.12.1"
  - id: factories
    title: "Reviewed circuit and physical layout implementation"
    url: "https://gitlab.com/Chips4Makers/PDKMaster/-/tree/99d3e6b4f0ca82019a8899fd252fae2d7786d770/pdkmaster/design"
  - id: spacing
    title: "Earlier multilayer minimum-space computation"
    url: "https://gitlab.com/Chips4Makers/PDKMaster/-/commit/22a8ddc985efeba6385f002e0f30dc14d02d58a3"
  - id: license
    title: "Repository license choices"
    url: "https://gitlab.com/Chips4Makers/PDKMaster/-/blob/99d3e6b4f0ca82019a8899fd252fae2d7786d770/LICENSE.md"
---

### Scope and maintenance

The core exposes technology objects, circuit factories and device geometry builders. Design covers user-authored connectivity using PDK primitives; Layout covers physical geometry creation informed by technology rules. A technology description is not a foundry PDK, and a companion exporter is not evidence the core performs signoff or simulation. [Factories](#source-factories).

July improved multilayer spacing logic; September reorganized routing-gauge and cell-library APIs and tests after v0.12.1. The activity capture uses the canonical GitLab repository rather than any mirror. [Earlier spacing change](#source-spacing) · [API change](#source-activity) · [Tagged release](#source-release).
