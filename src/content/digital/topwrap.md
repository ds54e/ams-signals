---
name: "Topwrap"
description: "Assembles SoC top-level hierarchy and inter-IP connections from declarative descriptions and parsed design interfaces. It emits SystemVerilog wrappers and supports FuseSoC and IP-XACT packaging or interchange; it does not perform logic synthesis."
scope:
  design:
    ai: false
access: "Apache-2.0 Python project; the optional graphical workflow uses Pipeline Manager."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/antmicro/topwrap"
    purpose: "code"
  - id: "website"
    title: "Official project documentation"
    url: "https://antmicro.github.io/topwrap/"
    purpose: "official"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/antmicro/topwrap/commit/903c39a65d029427807f160938d1600a041cb6e8"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://github.com/antmicro/topwrap/releases/tag/v0.8.0"
---

### Implemented operations and review

Topwrap assembles an SoC wrapper and consumes descriptions from IP and plugins. Omnibus separately constructs the internal interconnect implementation and adapters. The September release added IP-XACT front and back ends, October improved multi-dimensional interface mappings, and November implements parsing parameterized SystemVerilog interfaces. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).
