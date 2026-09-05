---
name: "HAVEN"
aliases: []
primary: "formal-verification"
ai: "ai-enabled"
description: "Spec-driven UVM generator translating LLM protocol intent through a constrained DSL, then using VCS coverage and VC Formal feedback to refine stimulus."
keywords: ["UVM generation", "protocol DSL", "coverage closure", "VCS", "VC Formal"]
areas:
  formal-verification: core
  simulation: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical HAVEN repository"
    url: "https://github.com/mcc311/haven"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/mcc311/haven/blob/b2beffbdeb940cbc84637f3425eee4b0e2fbe142/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/haven/eda/vc_formal_utils.py"
    url: "https://github.com/mcc311/haven/blob/b2beffbdeb940cbc84637f3425eee4b0e2fbe142/src/haven/eda/vc_formal_utils.py"
  - id: "activity"
    title: "Initial commit: HAVEN framework + 16-design HDL benchmark suite"
    url: "https://github.com/mcc311/haven/commit/b2beffbdeb940cbc84637f3425eee4b0e2fbe142"
  - id: "results"
    title: "Author-reported results"
    url: "https://github.com/mcc311/haven/blob/b2beffbdeb940cbc84637f3425eee4b0e2fbe142/README.md#coverage-results"
    purpose: "results"
---

### Scope

LLM planning and DSL-to-UVM code generation feed simulation and coverage-directed stimulus refinement. VC Formal identifies unreachable coverage targets. [Project documentation](#source-readme).

### Classification

LLM inference is an operating component of the generation and coverage loop, so the project is AI-enabled. [Reviewed source](#source-readme).

### Release boundary

The released framework includes a 16-design suite. Coverage results are author-reported, and formal exclusion of unreachable targets is not proof of overall DUT correctness. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
