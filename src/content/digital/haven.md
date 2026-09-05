---
name: "HAVEN"
aliases: []
description: "Generates UVM environments from protocol specifications through a constrained DSL, then refines coverage using VCS simulation and VC Formal feedback."
scope:
  verification:
    level: core
    ai: true
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


### Implementation context

LLM inference is an operating component of the generation and coverage loop. [Reviewed source](#source-readme).

### Release boundary

The released framework includes a 16-design suite. Coverage results are author-reported, and formal exclusion of unreachable targets is not proof of overall DUT correctness. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Generated protocol sequences, UVM testbenches, coverage feedback and formal dead-code checks all serve verification. Creating a testbench is not generating the DUT design. [Reviewed source](#source-readme).

LLMs generate protocol intent/testbench elements and refine coverage using simulator/formal feedback, so Verification is AI. Deterministic DSL emission and solver verdicts remain distinct from model proposals. [AI/stage evidence](#source-readme).
