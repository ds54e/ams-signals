---
name: "VerifyRTL"
aliases: []
description: "LLM-assisted RTL verification combines simulation, property generation and formal checking with a goal-aware proof strategy planner and executor. Counterexample replay, abstraction labels, helper invariants, assumption checks and bounded progress analysis help interpret tool-produced results and select techniques for unresolved properties."
scope:
  verification:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-credited campaign implemented the Vivado XSim backend, RTL profiling and synthesis checks, with verification-pipeline integration. The backend and profiling modules remain in the project."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical VerifyRTL repository"
    url: "https://github.com/nimishadeepak10/verify-rtl"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/nimishadeepak10/verify-rtl/blob/bfb0cf72955138b0ee790a05c96499aa2853264e/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/rtl_verify/simulator.py"
    url: "https://github.com/nimishadeepak10/verify-rtl/blob/bfb0cf72955138b0ee790a05c96499aa2853264e/src/rtl_verify/simulator.py"
  - id: "activity"
    title: "Complete Stage 7 RVFI checks: 57/57 PROVEN across full RV32I ISA"
    url: "https://github.com/nimishadeepak10/verify-rtl/commit/c455810d41412873ae549c0131dcf18c50755662"
  - id: "development-1"
    title: "Backend and profiling implementation"
    url: "https://github.com/nimishadeepak10/verify-rtl/commit/51e4d4578d741c169da3b71b55f3fea85390694f"
  - id: "development-2"
    title: "Current Vivado backend"
    url: "https://github.com/nimishadeepak10/verify-rtl/blob/c455810d41412873ae549c0131dcf18c50755662/src/rtl_verify/backends/vivado.py"
  - id: "development-3"
    title: "Current RTL profiling"
    url: "https://github.com/nimishadeepak10/verify-rtl/blob/c455810d41412873ae549c0131dcf18c50755662/src/rtl_verify/rtl_profile.py"
  - id: "activity-refresh"
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/nimishadeepak10/verify-rtl/commit/2023fdefe5c9ef45d1fb114d47f0f90982b8cb58"
  - id: "mutation-adequacy"
    title: "Property-set mutation testing and equivalence limitation"
    url: "https://github.com/nimishadeepak10/verify-rtl/blob/bfb0cf72955138b0ee790a05c96499aa2853264e/src/rtl_verify/mutation_adequacy.py"
  - id: "activity-review"
    title: "Constant-mutation implementation and AES verification regressions"
    url: "https://github.com/nimishadeepak10/verify-rtl/commit/bfb0cf72955138b0ee790a05c96499aa2853264e"
  - id: "review-20261011-1"
    title: "Recommend-only planner"
    url: "https://github.com/nimishadeepak10/verify-rtl/commit/57364bb1568c933902ba2c9136d358064a975ee1"
  - id: "review-20261011-2"
    title: "Plan executor"
    url: "https://github.com/nimishadeepak10/verify-rtl/commit/4af87169929ec4da12ba6a8761d798cb4c531820"
  - id: "review-20261011-3"
    title: "Known-truth benchmark"
    url: "https://github.com/nimishadeepak10/verify-rtl/commit/c986b535a36c2b7648dc332d9181334bd9dab28d"
---


### Implementation context

LLMs propose verification artifacts and explanations at runtime; actual simulation and formal backends return the corresponding verdicts. [Reviewed source](#source-readme).

### Release boundary

Coverage, bounded checks and unbounded proofs are separate outcomes. Unsupported temporal property forms are not silently interpreted as equivalent same-cycle checks. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Plans, properties, Icarus runs, SymbiYosys checks and trace explanations serve verification. Coverage and bounded/unbounded proof outcomes remain distinct. [Reviewed source](#source-readme).

Models generate plans/properties and explain trace failures, giving AI Verification. Icarus and formal engines still determine the simulation/proof outcomes. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The attributed implementation adds a backend, substantial RTL-profile and assertion-generation modules, plus pipeline synthesis checking. These are important executable additions still present; generated tests/examples alone are not counted. [Backend and profiling implementation](#source-development-1); [Current Vivado backend](#source-development-2); [Current RTL profiling](#source-development-3).

### Current-source review

Reviewed 2026-10-01. Current formal review adds assumption consistency, vacuity, pattern/scope summaries, cone-of-influence analysis and bounded mutation adequacy. The mutation checker lacks an equivalence filter, so an uncaught mutant may be behaviorally inert rather than evidence of a missing property. These are verification diagnostics, not a DUT optimization/design deliverable. [Current pipeline](#source-readme); [Mutation implementation](#source-mutation-adequacy).

### Current implementation and operating boundaries

A deterministic planner selects applicable proof techniques according to the design and goal. The executor runs exact transforms first and reserve techniques on unresolved properties, labels abstraction outcomes and replays counterexamples. New code also supports counter/parameter reduction, data-independence checks, helper-invariant mining, assumption-necessity checking and bounded progress properties. [Recommend-only planner](#source-review-20261011-1) · [Plan executor](#source-review-20261011-2) · [Known-truth benchmark](#source-review-20261011-3)

The planner itself runs no solver and is recommend-only. The executor is a separate path. A counterexample under abstraction is unconfirmed until replayed; parameter reduction is a bounded-configuration result; progress checks establish the stated bound, not unrestricted liveness. The known-truth technique-selection benchmark is newly implemented, not a measured general superiority claim.
