---
name: "CoreSmith"
aliases: []
description: "Carries requirements through RTL generation, testbench execution, Yosys synthesis and OpenROAD/Magic physical checks toward GDS artifacts."
scope:
  design:
    level: core
    ai: true
  synthesis:
    level: core
    ai: true
  verification:
    level: core
    ai: true
  layout:
    level: core
    ai: true
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


### Implementation context

LangGraph orchestrates LLM design, verification and debug agents at runtime, with explicit interrupt and human-review paths. [Reviewed source](#source-readme).

### Release boundary

PPABench outcomes are author-reported and include waivers and a blocked design. The description does not imply fabricated silicon or universally autonomous signoff. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

The public pipeline explicitly generates RTL, runs testbenches, synthesizes with Yosys and drives OpenROAD/Magic backend stages. These are user-facing workflow deliverables, not marks inferred from installed dependencies. [Reviewed source](#source-readme).

Runtime LLMs generate RTL and testbenches, diagnose failures and drive backend script/fix loops. The pipeline has an LLM repair loop for synthesizability, and the documented backend agents adapt and execute synthesis, placement/routing and physical-check scripts. These specific operations justify AI on all four stages; this is not inferred from calling Yosys/OpenROAD alone, nor does it guarantee signoff. [AI/stage evidence](#source-readme).
