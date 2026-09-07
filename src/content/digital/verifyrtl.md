---
name: "VerifyRTL"
aliases: []
description: "Generates verification plans and properties with an LLM, runs Icarus simulations and SymbiYosys formal checks, and explains failures from execution traces. Simulator and solver results determine the verdicts, keeping coverage, bounded checks and unbounded proofs distinct."
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
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical VerifyRTL repository"
    url: "https://github.com/nimishadeepak10/verify-rtl"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/nimishadeepak10/verify-rtl/blob/c455810d41412873ae549c0131dcf18c50755662/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/rtl_verify/simulator.py"
    url: "https://github.com/nimishadeepak10/verify-rtl/blob/c455810d41412873ae549c0131dcf18c50755662/src/rtl_verify/simulator.py"
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
