---
name: "Chisel"
aliases: []
description: "Scala-embedded hardware construction language for reusable, parameterized RTL generators. Chisel elaborates typed designs through FIRRTL/CIRCT to SystemVerilog, with integrated svsim simulation control and a current-branch bounded formal-checking path using BTOR2 and the external btormc model checker."
scope:
  design:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Code is credited for updating executable Scala domain tests to preserve domains with the new firtool option. The canonical commit and current tests retain the changes."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: "Apache-2.0 public source and published Scala artifacts; SystemVerilog simulation uses documented external backends such as Verilator or VCS."
addedAt: "2026-09-22"
reviewedAt: "2026-10-18"
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
    url: "https://github.com/chipsalliance/chisel/blob/8de081e1fa7d9c0d6131841e2409c8cfe0490183/README.md"
  - id: "svsim"
    title: "Integrated SystemVerilog simulation-control library"
    url: "https://github.com/chipsalliance/chisel/blob/8de081e1fa7d9c0d6131841e2409c8cfe0490183/svsim/README.md"
  - id: "activity"
    title: "Correct Scala 3 return type for pad"
    url: "https://github.com/chipsalliance/chisel/commit/10e16af329e430a2704f6d82af7540f6cd790fe2"
  - id: "activity-refresh"
    title: "Explain unsupported Bool resizing and test the diagnostic"
    url: "https://github.com/chipsalliance/chisel/commit/8de081e1fa7d9c0d6131841e2409c8cfe0490183"
  - id: "formal"
    title: "Current bounded formal-checking implementation"
    url: "https://github.com/chipsalliance/chisel/blob/8de081e1fa7d9c0d6131841e2409c8cfe0490183/src/main/scala/chiseltest/formal/package.scala"
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/chipsalliance/chisel/commit/bbb0cce272b1f3b12b7ed82a5e3d6546382c625c"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/chipsalliance/chisel/blob/4929e69faeed44018dca43eb4286a2d41457ade8/src/test/scala/chiselTests/DomainSpec.scala"
---

### Implementation context

Chisel adds hardware primitives to Scala so generators can build parameterized RTL with typed interfaces and reusable libraries. Its frontend elaborates hardware structures before CIRCT's FIRRTL flow emits SystemVerilog. This is RTL construction and compilation, not technology mapping or physical implementation. [Project overview](#source-readme)

The repository's svsim library compiles and controls generated SystemVerilog with supported external simulators. This establishes a user-facing verification path without attributing the simulators' engines to Chisel. [Simulation library](#source-svsim)

### Release boundary

Reviewed October 1, 2026 at `8de081e1fa7d9c0d6131841e2409c8cfe0490183`. The October 1 head improves the Bool-resizing error and adds a regression test. A separate October 1 change implements bounded formal checking through CIRCT BTOR2 emission and the external btormc backend; this is current-branch functionality, not a claim about every released artifact. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Design covers hardware construction, elaboration and RTL emission. Verification covers svsim simulation control and the current bounded-checking implementation, which emits BTOR2 through CIRCT and invokes btormc at a selected depth. A bounded result is not an unbounded proof; other compatibility API methods remain placeholders. Synthesis and Layout are omitted because downstream tools supply those operations. [Simulation library](#source-svsim); [formal implementation](#source-formal).

Both runtime flags remain false. The Bool diagnostic repair explicitly credits Claude Code; its bounded scope does not exclude it from AI-assisted development. [Reviewed repair](#source-activity-refresh).

### Development provenance

Claude Code is credited for updating executable Scala domain tests to preserve domains with the new firtool option. The canonical commit and current tests retain the changes. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
