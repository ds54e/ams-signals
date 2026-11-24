---
name: "ACTsim"
summary: "Simulates asynchronous ACT models at behavioral and production-rule levels."
description: "Mixed-signal ACT simulator coupling behavioral and production-rule digital models with transistor-level Xyce blocks. Its optional Xyce integration exchanges events and voltages with selected external SPICE subcircuits, including extracted netlists; it requires an ACT setup and compatible solver build."
scope:
  simulation:
    ai: false
access: "Public ACT simulator source; the mixed-signal path needs an ACT setup and a compatible Xyce-linked build."
addedAt: "2026-11-23"
reviewedAt: "2026-11-24"
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
  - id: "coupling"
    title: "Implemented Xyce time stepping and ADC/DAC event exchange"
    url: "https://github.com/rmanohar/actsim/blob/0eb0dcb0c22d997766c5f49cd4f34226876f3a44/xycesim.cc"
  - id: "build"
    title: "ACT and optional Xyce build requirements"
    url: "https://github.com/rmanohar/actsim/blob/0eb0dcb0c22d997766c5f49cd4f34226876f3a44/README.md"
---

### Implemented operations and review

The Yale documentation links a three-inverter example mixing digital simulation, a production-rule-derived device netlist and a SPICE black box. The October implementation adds mixed-signal watch/break facilities; the November array correction has three regression fixtures. Analog Simulation is supported by the implemented electrical interface to Xyce, not simply by the description of asynchronous digital primitives. This is ACT-centric co-simulation, not general SystemVerilog or RNM support. The published example was reviewed but not rerun. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).

The reviewed integration generates Xyce ADC/DAC interfaces, advances the electrical solver to digital event times, and returns thresholded voltage changes to ACT's event queue. This coupled electrical workflow supports Analog Simulation even though ACT also offers purely digital abstraction levels. Solver availability is a build-time requirement for the electrical path. [Coupling implementation](#source-coupling) · [Build requirements](#source-build).
