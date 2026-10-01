---
name: "HAVEN"
aliases: []
description: "Uses an LLM to turn protocol specifications into UVM testbenches through a constrained DSL. Structured JSON intent is translated into SystemVerilog, then VCS execution and VC Formal feedback guide repair and testing of uncovered behavior."
scope:
  verification:
    ai: true
access: "Public Python/LangGraph framework and 16-design benchmark suite. Generation requires an OpenAI-compatible model setup; the documented compile, coverage and formal-refinement paths require Synopsys VCS/URG and VC Formal."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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

### Current-source review

Reviewed 2026-10-01. The generation path combines ten template-based UVM components with LLM-produced semantic components and sequence intent; the refinement path adds Bayesian constraint tuning and VC Formal dead-code exclusion. AI Verification describes the model-authored test content and feedback loop, not the deterministic DSL emitter or solver verdict. [Pipeline and requirements](#source-readme); [Formal wrapper](#source-implementation).
