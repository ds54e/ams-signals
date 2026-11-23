---
name: "ACTsim"
summary: "Simulates asynchronous ACT models at behavioral and production-rule levels."
description: "Simulates asynchronous ACT models at behavioral and production-rule levels. An optional Xyce-linked build can run selected blocks at transistor level or use external SPICE subcircuits, including netlists with extracted parasitics, alongside digital ACT behavior."
scope:
  simulation:
    ai: false
access: "Public ACT simulator source; the mixed-signal path needs an ACT setup and a compatible Xyce-linked build."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/rmanohar/actsim"
    purpose: "code"
  - id: "website"
    title: "Official project documentation"
    url: "https://avlsi.csl.yale.edu/act/doku.php?id=tools:actsim"
    purpose: "official"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/rmanohar/actsim/commit/0eb0dcb0c22d997766c5f49cd4f34226876f3a44"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://github.com/ThomasJagielski/Analog-ACT-Example"
---

### Implemented operations and review

The Yale documentation links a three-inverter example mixing digital simulation, a production-rule-derived device netlist and a SPICE black box. The October implementation adds mixed-signal watch/break facilities; the November array correction has three regression fixtures. This is ACT-centric co-simulation, not general SystemVerilog or RNM support. The published example was reviewed but not rerun. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).
