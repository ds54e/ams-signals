---
name: "Pono"
aliases: []
description: "SMT-based formal model checker for safety and liveness properties, with bounded, inductive and IC3-style algorithms. Its C++ implementation uses the Smt-Switch solver interface, with transition-system APIs for building verification applications and inspecting proof or counterexample outcomes."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical Pono repository"
    url: "https://github.com/stanford-centaur/pono"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/stanford-centaur/pono/blob/8f2aa66583e91db400928be1620864938f0448e1/README.md"
  - id: "implementation"
    title: "Reviewed implementation: engines/kliveness.cpp"
    url: "https://github.com/stanford-centaur/pono/blob/8f2aa66583e91db400928be1620864938f0448e1/engines/kliveness.cpp"
  - id: "activity"
    title: "build: Pin smt-switch and fmt by commit hash (#614)"
    url: "https://github.com/stanford-centaur/pono/commit/059f9b826847aa42a75b7e90aa0aeec78287645a"
  - id: "paper"
    title: "Author paper"
    url: "https://doi.org/10.1007/978-3-032-26220-2_1"
    purpose: "paper"
  - id: "results"
    title: "Author-reported results"
    url: "https://doi.org/10.5281/zenodo.18680797"
    purpose: "results"
  - id: "activity-refresh"
    title: "Guard failed lookups and empty unroller inputs in release builds"
    url: "https://github.com/stanford-centaur/pono/commit/0648dc75a82260241cd9a4c002eeeb98e2198ee2"
---


### Implementation context

Pono exposes C++ transition-system and model-checking APIs through Smt-Switch. Safety and liveness engines include bounded, induction-based and IC3-style procedures; frontend and solver requirements vary by algorithm. Proof and counterexample outcomes concern the supplied transition system and properties. [Project overview](#source-readme); [liveness implementation](#source-implementation).

### Release boundary

Reviewed October 1, 2026 at `8f2aa66583e91db400928be1620864938f0448e1`. The September 21 meaningful change replaces assert-only/unchecked lookup paths with runtime checks, handles empty unroller variable sets and fixes option-parser assumptions. Later warning/style cleanups are not the basis for freshness. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

Model checking, safety/liveness algorithms and counterexamples establish Verification. Input-model preparation is not a separate RTL-authoring stage. Algorithms execute conventionally, so the stage AI flag remains false. The reviewed Claude-credited lookup repair and nearby warning cleanups are bounded correctness/maintenance changes, not a substantial AI-implemented model-checking subsystem; no provenance label is assigned. [Functional evidence](#source-readme); [attributed repair](#source-activity-refresh).
