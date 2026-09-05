---
name: "Razavi-Bench"
aliases: ["Razavi Bench"]
summary: "Benchmarks reasoning about analog circuit diagrams through direct QA, agentic answers, and an experimental simulator-assisted mode."
description: "Evaluates answers to analog-circuit questions using diagrams, reference solutions, and a shared rubric. Supports direct QA and workspace-based agents, with an experimental ngspice mode for generating scratch decks and exploring circuit behavior."
scope:
  design:
    level: core
    ai: true
  simulation:
    level: supporting
    ai: false
targets: "MOS devices, small-signal circuits, feedback, oscillators, comparators, LNAs and TIAs"
access: "Prompts, figures, reference answers, grading guidance, evaluator scripts, model outputs, and supporting netlists are public. Answer and judge models are supplied separately; code and benchmark materials have different usage terms."
notice: "Reference-assisted netlists are curation artifacts, not permitted inputs to official runs."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "site"
    title: "Official project website"
    url: "https://razavi-bench.tokenzhang.com/"
    purpose: "official"
  - id: "code"
    title: "Public repository"
    url: "https://github.com/Arcadia-1/razavi-bench"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: artifacts, modes, and usage terms"
    url: "https://github.com/Arcadia-1/razavi-bench/blob/a2e90f14ff91729ff309eb4dc3f4378bcf4e10aa/README.md"
  - id: "modes"
    title: "Agentic evaluation: official inputs and simulator treatment"
    url: "https://github.com/Arcadia-1/razavi-bench/blob/a2e90f14ff91729ff309eb4dc3f4378bcf4e10aa/agentic/README.md"
  - id: "rubric"
    title: "Evaluation rubric for final answers"
    url: "https://github.com/Arcadia-1/razavi-bench/blob/a2e90f14ff91729ff309eb4dc3f4378bcf4e10aa/evaluation_rubric.md"
---
### Inputs and modes

Direct QA sends instructions and figures to the model. Agentic QA places those inputs in a workspace and collects an answer file. The experimental ngspice-SKY130 treatment adds a simulator, a limited model subset, and an operating guide. The subset is not a complete PDK; simulation supports reasoning on qualitative or underspecified questions. [Mode contract](#source-modes)

### Evaluation

All modes use the final answer, reference solution, and shared rubric. Simulator-assisted scores measure the final explanation, not circuit performance closure. Logs and scratch decks are not scored. The 0–4 guide was inferred for re-scoring new answers; historical article scores are not labels for new responses. [Rubric](#source-rubric)

### Public artifacts

Published judge scores and answers support inspection and re-grading. They do not replace expert review. Viewing and local evaluation rights should be distinguished from redistribution or training permission. [Release and usage terms](#source-review)

### Scope classification

Circuit reasoning is the central benchmark task. The optional agentic ngspice treatment supplies supporting simulation evidence; grading remains answer-based. [Reviewed source](#source-review).

The direct and workspace modes run models to answer circuit-reasoning questions, giving AI Design. The optional ngspice treatment supplies supporting numerical evidence; the reviewed benchmark still grades the answer rather than an AI simulator. [AI/stage evidence](#source-review).
