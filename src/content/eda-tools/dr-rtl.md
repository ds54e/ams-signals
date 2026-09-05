---
name: "Dr. RTL"
aliases: []
primary: "frontend-synthesis"
ai: "ai-enabled"
description: "Agentic RTL optimization loop that reads synthesis timing feedback, rewrites critical logic and uses sequential equivalence checks to select improved implementations."
keywords: ["RTL optimization", "timing", "SEC", "PPA", "coding agents"]
areas:
  frontend-synthesis: core
  formal-verification: core
  flow-physical: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical Dr. RTL repository"
    url: "https://github.com/hkust-zhiyao/DR_RTL"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/hkust-zhiyao/DR_RTL/blob/62b95a57223e8fb187d8b8ec1dcb3d193ef20c6b/README.md"
  - id: "implementation"
    title: "Reviewed implementation: syn_flow_eda/run_design.py"
    url: "https://github.com/hkust-zhiyao/DR_RTL/blob/62b95a57223e8fb187d8b8ec1dcb3d193ef20c6b/syn_flow_eda/run_design.py"
  - id: "activity"
    title: "update"
    url: "https://github.com/hkust-zhiyao/DR_RTL/commit/62b95a57223e8fb187d8b8ec1dcb3d193ef20c6b"
  - id: "paper"
    title: "Author paper"
    url: "https://arxiv.org/abs/2604.14989"
    purpose: "paper"
---

### Scope

Rewriting and sequential equivalence form the core optimization loop. Physical scope is supporting timing/PPA feedback from the configured commercial flow. [Project documentation](#source-readme).

### Classification

LLM agents perform critical-path analysis, rewrite candidates and use tool feedback at runtime. The latest agent scoring-contract correction changes how candidates are compared. [Reviewed source](#source-readme).

### Release boundary

The paper reports optimization results; the catalog does not reproduce them or infer completed routed layouts from synthesis timing. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
