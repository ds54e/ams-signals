---
name: "VerifyRTL"
aliases: []
primary: "formal-verification"
ai: "ai-enabled"
description: "LLM-assisted verification pipeline generating plans and properties, running Icarus simulations and SymbiYosys checks, and explaining failures with trace evidence."
keywords: ["verification plan", "SVA", "SymbiYosys", "coverage", "LLM"]
areas:
  formal-verification: core
  simulation: supporting
  debug-waveform: supporting
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
---

### Scope

Planning, property generation and tool-grounded checks are core verification operations. Simulation backends and trace explanations support the loop. [Project documentation](#source-readme).

### Classification

LLMs propose verification artifacts and explanations at runtime; actual simulation and formal backends return the corresponding verdicts. [Reviewed source](#source-readme).

### Release boundary

Coverage, bounded checks and unbounded proofs are separate outcomes. Unsupported temporal property forms are not silently interpreted as equivalent same-cycle checks. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
