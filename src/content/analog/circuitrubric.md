---
name: "CircuitRubric"
aliases: ["CircuitRubric Bench","circuitrubric-bench"]
summary: "Grades generated SPICE netlists by topology connectivity and relative device sizing, without circuit simulation."
description: "Grades generated analog netlists by graph matching and relative device sizing, identifying topology and connectivity errors through structural scoring."
scope:
  design:
    level: core
    ai: false
targets: "Amplifiers, current mirrors, OTAs, oscillators, and related circuit structures"
access: "125 fixtures, reference netlists, ratio constraints, a Python grader and CLI, and example runs are public. Structural grading needs neither SPICE execution nor a PDK; generation requires a model."
notice: "FULL means a structural match, not a verified circuit. Bias point, gain, stability, and absolute component values are outside the evaluation scope."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/levantlabs/circuitrubric-bench"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: fixtures, prompts, and limitations"
    url: "https://github.com/levantlabs/circuitrubric-bench/blob/f96512bf602152d1646c0cfc11ea7af8e6ade99f/README.md"
  - id: "method"
    title: "Methodology: graph matching and sizing ratios"
    url: "https://github.com/levantlabs/circuitrubric-bench/blob/f96512bf602152d1646c0cfc11ea7af8e6ade99f/docs/methodology.md"
---
### Evaluation

Graph matching preserves device types and terminal roles while ignoring device and net names. Strict grading distinguishes MOS drain and source. Multiple approved reference forms may be accepted; declared W, L, M, and passive-value ratios are checked within ±1%. [Methodology](#source-method)

Credit levels distinguish wiring errors, sizing errors, and extra devices around a reference topology. The reported functional aggregate relaxes source/drain orientation; it is still a structural check, not a simulation pass rate. [Grading distinctions](#source-method)

### Prompt and result conditions

The short prompt names the topology, verbose describes its architecture, and spec supplies device-level wiring. System prompts and reasoning settings form additional experimental variables. Published scores must be read with those conditions; most reported cells are single runs. [Results and limitations](#source-review)

### Scope classification

The task generates circuit netlists and grades topology and relative device sizing. Structural graph scoring is not electrical simulation or specification-driven sizing optimization. [Reviewed source](#source-review).

Generated topology/netlist structure and relative sizing are the graded Design task. The structural oracle is deterministic; evaluating LLM submissions does not make it an AI generator. [AI/stage evidence](#source-review).
