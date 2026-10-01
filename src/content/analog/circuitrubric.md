---
name: "CircuitRubric"
aliases: ["CircuitRubric Bench","circuitrubric-bench"]
summary: "Grades generated SPICE netlists by topology connectivity and relative device sizing, without circuit simulation."
description: "Benchmarks LLM-generated analog SPICE netlists through graph matching and relative device sizing. Its fixtures and Python grader identify topology, connectivity and sizing-ratio errors without a simulator or PDK; the score describes structure rather than electrical performance."
scope:
  design:
    ai: true
targets: "Amplifiers, current mirrors, OTAs, oscillators, and related circuit structures"
access: "125 fixtures, reference netlists, ratio constraints, a Python grader and CLI, and example runs are public. Structural grading needs neither SPICE execution nor a PDK; generation requires a model."
notice: "FULL means a structural match, not a verified circuit. Bias point, gain, stability, and absolute component values are outside the evaluation scope."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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
  - id: "development-disclosure"
    title: "Project construction disclosure: AI-assisted corpus and tooling"
    url: "https://github.com/levantlabs/circuitrubric-bench/blob/f96512bf602152d1646c0cfc11ea7af8e6ade99f/NOTICE.md"
---
### Evaluation

Graph matching preserves device types and terminal roles while ignoring device and net names. Strict grading distinguishes MOS drain and source. Multiple approved reference forms may be accepted; declared W, L, M, and passive-value ratios are checked within ±1%. [Methodology](#source-method)

Credit levels distinguish wiring errors, sizing errors, and extra devices around a reference topology. The reported functional aggregate relaxes source/drain orientation; it is still a structural check, not a simulation pass rate. [Grading distinctions](#source-method)

### Prompt and result conditions

The short prompt names the topology, verbose describes its architecture, and spec supplies device-level wiring. System prompts and reasoning settings form additional experimental variables. Published scores must be read with those conditions; most reported cells are single runs. [Results and limitations](#source-review)

### Scope classification

The benchmark explicitly evaluates LLM-generated netlist topology, connectivity and relative sizing, so its evaluated operation is AI Design. The structural oracle remains deterministic; no electrical Simulation stage or circuit-performance claim follows from a full score. [Benchmark and model runner](#source-review)

The construction disclosure mentions AI assistance across corpus and tooling, but does not identify a substantial AI-implemented component or establish a major implementation role across the software. Neither development-provenance label is displayed; runtime/model-evaluation scope does not resolve that separate evidence gap. [Development disclosure](#source-development-disclosure)
