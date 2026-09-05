---
name: "CoreSmith"
aliases: []
primary: "flow-physical"
ai: "ai-enabled"
description: "Agentic chip-design workflow taking requirements through RTL generation, testbench simulation, synthesis and physical-design checks toward GDS artifacts."
keywords: ["prompt-to-GDS", "RTL", "verification", "Yosys", "OpenROAD"]
areas:
  flow-physical: core
  formal-verification: core
  simulation: supporting
  frontend-synthesis: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical CoreSmith repository"
    url: "https://github.com/facebookexperimental/coresmith"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/facebookexperimental/coresmith/blob/7ef5ce053a2f4c45ae5ea15eb236928dc42a606a/README.md"
  - id: "implementation"
    title: "Reviewed implementation: orchestrator/langgraph/pipeline_graph.py"
    url: "https://github.com/facebookexperimental/coresmith/blob/7ef5ce053a2f4c45ae5ea15eb236928dc42a606a/orchestrator/langgraph/pipeline_graph.py"
  - id: "activity"
    title: "Merge pull request #92 from facebookexperimental/port/chip-lead-and-fixes"
    url: "https://github.com/facebookexperimental/coresmith/commit/7ef5ce053a2f4c45ae5ea15eb236928dc42a606a"
  - id: "results"
    title: "Author-reported results"
    url: "https://github.com/facebookexperimental/coresmith/blob/7ef5ce053a2f4c45ae5ea15eb236928dc42a606a/README.md#ppabench-results"
    purpose: "results"
---

### Scope

Coverage-driven verification and backend implementation/check loops are central workflow gates. External simulators and synthesis tools support them. [Project documentation](#source-readme).

### Classification

LangGraph orchestrates LLM design, verification and debug agents at runtime, with explicit interrupt and human-review paths. [Reviewed source](#source-readme).

### Release boundary

PPABench outcomes are author-reported and include waivers and a blocked design. The description does not imply fabricated silicon or universally autonomous signoff. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
