---
name: "Omnibus"
description: "Generates synthesizable bus interconnects from YAML address maps and crossbar descriptions, inserting selected protocol adapters and clock-domain crossing components. It uses PULP RTL components and can emit SystemVerilog or integrate with Topwrap."
scope:
  design:
    ai: false
access: "Apache-2.0 Python source; the generated flow relies on selected PULP RTL components. The simulation regression path requires Verilator and cocotb."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/antmicro/omnibus"
    purpose: "code"
  - id: "website"
    title: "Official project documentation"
    url: "https://antmicro.github.io/omnibus/"
    purpose: "official"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/antmicro/omnibus/commit/8fac62a7be51cf20806d91fe7cb1f33c6a0f690f"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://antmicro.com/blog/2026/11/automated-interconnect-generation-with-omnibus"
---

### Implemented operations and review

The repository progressed from July interconnect construction to September simulations of generated RTL and October negative tests for unmapped addresses, followed by November integration and generation controls. Inserting a crossing component is not a CDC sign-off result. This is an interconnect generator, not the broader SoC assembly frontend. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).
