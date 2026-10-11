---
name: "CoreSmith"
aliases: []
description: "Agent-driven ASIC flow generating architecture, RTL and testbenches, with synthesis and OpenROAD physical implementation repair loops. Persistent architect sessions and module builds track input identities, block contracts and tool-grounded acceptance; a resumed build rejects changed inputs before continuing toward SoC integration and GDS."
scope:
  design:
    ai: true
  synthesis:
    ai: true
  verification:
    ai: true
  layout:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited implementation added interface-contract checking and repair, then integrated it into the per-block RTL flow before testbench generation. The current pipeline calls this conformance stage."
  sources: ["development-1", "development-2", "implementation"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical CoreSmith repository"
    url: "https://github.com/facebookexperimental/coresmith"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/facebookexperimental/coresmith/blob/4f5f94996db3ea11f39c62f469249dbed43ab6ab/README.md"
  - id: "implementation"
    title: "Reviewed implementation: orchestrator/langgraph/pipeline_graph.py"
    url: "https://github.com/facebookexperimental/coresmith/blob/4f5f94996db3ea11f39c62f469249dbed43ab6ab/orchestrator/langgraph/pipeline_graph.py"
  - id: "activity"
    title: "Merge pull request #92 from facebookexperimental/port/chip-lead-and-fixes"
    url: "https://github.com/facebookexperimental/coresmith/commit/7ef5ce053a2f4c45ae5ea15eb236928dc42a606a"
  - id: "results"
    title: "Author-reported results"
    url: "https://github.com/facebookexperimental/coresmith/blob/7ef5ce053a2f4c45ae5ea15eb236928dc42a606a/README.md#ppabench-results"
    purpose: "results"
  - id: "development-1"
    title: "Conformance implementation merge"
    url: "https://github.com/facebookexperimental/coresmith/commit/d51fbeda66b34b4a78bff38d775a910b882fb1a9"
  - id: "development-2"
    title: "Per-block conformance integration"
    url: "https://github.com/facebookexperimental/coresmith/commit/3eb681cb3f113ccb68f8b5f24049969dc9defe42"
  - id: "activity-refresh"
    title: "Previously reviewed meaningful implementation update"
    url: "https://github.com/facebookexperimental/coresmith/commit/74965147fbf41f0cdb693d45f52aeb5fc982929e"
  - id: "soc-stages"
    title: "SoC stages, implementation boundaries and architect session"
    url: "https://github.com/facebookexperimental/coresmith/blob/4f5f94996db3ea11f39c62f469249dbed43ab6ab/docs/SOC_STAGES.md"
  - id: "activity-review"
    title: "SoC stages and persistent architect-session implementation"
    url: "https://github.com/facebookexperimental/coresmith/commit/4f5f94996db3ea11f39c62f469249dbed43ab6ab"
  - id: "review-20261011-1"
    title: "Module-build implementation checkpoint"
    url: "https://github.com/facebookexperimental/coresmith/commit/06dc6d8acc69eae04ea8f9dc8a63a51fe07de1d3"
  - id: "review-20261011-2"
    title: "Build orchestration"
    url: "https://github.com/facebookexperimental/coresmith/blob/da5b2acb3e0b1b19b2d801c40ffa5797a6086083/orchestrator/module_build.py"
  - id: "review-20261011-3"
    title: "Input-contract tests"
    url: "https://github.com/facebookexperimental/coresmith/blob/da5b2acb3e0b1b19b2d801c40ffa5797a6086083/orchestrator/tests/test_module_input_contracts.py"
  - id: "review-20261011-4"
    title: "Release v1.0.0"
    url: "https://github.com/facebookexperimental/coresmith/releases/tag/v1.0.0"
---


### Implementation context

LangGraph orchestrates LLM design, verification and debug agents at runtime, with explicit interrupt and human-review paths. [Reviewed source](#source-readme).

### Release boundary

PPABench outcomes are author-reported and include waivers and a blocked design. The description does not imply fabricated silicon or universally autonomous signoff. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

The public pipeline explicitly generates RTL, runs testbenches, synthesizes with Yosys and drives OpenROAD/Magic backend stages. These are user-facing workflow deliverables, not marks inferred from installed dependencies. [Reviewed source](#source-readme).

Runtime LLMs generate RTL and testbenches, diagnose failures and drive backend script/fix loops. The pipeline has an LLM repair loop for synthesizability, and the documented backend agents adapt and execute synthesis, placement/routing and physical-check scripts. These specific operations justify AI on all four stages; this is not inferred from calling Yosys/OpenROAD alone, nor does it guarantee signoff. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The credited implementation adds conformance checking/repair and wires it before testbench generation, with persisted results and fail/park behavior. This is a substantial integration safeguard, distinct from the runtime agents it serves. [Conformance implementation merge](#source-development-1); [Per-block conformance integration](#source-development-2); [Current pipeline integration](#source-implementation).

### Current-source review

Reviewed 2026-10-01. The current SoC path adds generated bus fabrics, timed interface contracts, per-block VIP, incremental shell integration and agent-authored SystemC evaluation harnesses. The documented remaining work includes real-versus-real assembled-shell VIP stimulus and using the SystemC model as the block golden; these are not treated as delivered cross-block verification. [SoC stages](#source-soc-stages).

### Current implementation and operating boundaries

Module build admission checks readiness and binds source/specification/model/tool/worker identities before dispatch. Persisted build state is shared by CLI, daemon and MCP paths. Resume checks reject changed inputs as BUILD_STALE; operation locking, recovery and final publication keep build provenance tied to the admitted inputs. [Module-build implementation checkpoint](#source-review-20261011-1) · [Build orchestration](#source-review-20261011-2) · [Input-contract tests](#source-review-20261011-3) · [Release v1.0.0](#source-review-20261011-4)

This is orchestration integrity evidence, not proof of physical signoff or silicon correctness. No EDA run or resume/recovery test was executed in this research. The four AI stages are retained from their existing evidence; this one patch does not independently re-establish all of them.
