---
name: "Chisel"
aliases: []
description: "Scala-embedded hardware construction language for reusable, parameterized RTL generators. Chisel elaborates typed generator code and uses FIRRTL/CIRCT infrastructure to emit synthesizable Verilog or SystemVerilog; the repository also includes the lightweight svsim simulation-control library."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Apache-2.0 public source and published Scala artifacts; SystemVerilog simulation uses documented external backends such as Verilator or VCS."
addedAt: "2026-09-22"
reviewedAt: "2026-09-22"
sources:
  - id: "official"
    title: "Official Chisel documentation"
    url: "https://www.chisel-lang.org/"
    purpose: "official"
  - id: "code"
    title: "Canonical Chisel repository"
    url: "https://github.com/chipsalliance/chisel"
    purpose: "code"
  - id: "readme"
    title: "Language, compiler and verification overview at the reviewed revision"
    url: "https://github.com/chipsalliance/chisel/blob/33fe25e24440c159b91cf916757505eb8092462a/README.md"
  - id: "svsim"
    title: "Integrated SystemVerilog simulation-control library"
    url: "https://github.com/chipsalliance/chisel/tree/33fe25e24440c159b91cf916757505eb8092462a/svsim"
  - id: "activity"
    title: "Correct Scala 3 return type for pad"
    url: "https://github.com/chipsalliance/chisel/commit/10e16af329e430a2704f6d82af7540f6cd790fe2"
---

### Implementation context

Chisel adds hardware primitives to Scala so generators can build parameterized RTL with typed interfaces and reusable libraries. Its frontend elaborates hardware structures before CIRCT's FIRRTL flow emits SystemVerilog. This is RTL construction and compilation, not technology mapping or physical implementation. [Project overview](#source-readme)

The repository's svsim library compiles and controls generated SystemVerilog with supported external simulators. This establishes a user-facing verification path without attributing the simulators' engines to Chisel. [Simulation library](#source-svsim)

### Release boundary

The September 10 tip updates GitHub Actions. The latest reviewed substantive first-parent change is the September 9 Scala 3 API correction; automated and infrastructure changes remain visible in the raw activity strip but do not renew meaningful freshness. [Meaningful activity](#source-activity)

### Scope classification

Design covers the hardware construction language, elaboration and RTL emission. Verification covers the included simulation-control library. Synthesis and Layout are omitted because downstream CIRCT, synthesis and physical tools supply those operations. The reviewed runtime is conventional, so both stage AI flags are false.
