---
name: "VeriBugBench"
aliases: []
description: "RTL debugging benchmark and construction framework with 45 projects and 2,608 selected single-fault instances. Frozen replay, mutation filtering and coverage analysis are deterministic; an optional model-backed helper regenerates design-specific test stimulus from clean RTL and an existing testbench for separately configured enhancement experiments."
scope:
  verification:
    ai: true
access: "MIT-licensed framework and v1.0 dataset. Synopsys VCS/URG with the matching Verdi PLI is the reference experimental backend; Icarus Verilog supports only a limited compatibility path and does not reproduce the full VCS workflow."
addedAt: "2026-09-26"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical VeriBugBench repository"
    url: "https://github.com/wndif/VeriBugBench"
    purpose: "code"
  - id: "paper"
    title: "VeriBugBench paper"
    url: "https://arxiv.org/abs/2609.18022"
    purpose: "paper"
  - id: "readme"
    title: "README at the reviewed release"
    url: "https://github.com/wndif/VeriBugBench/blob/463d490e261dff247eb6ef82b07b6e924fee19e8/README.md"
  - id: "activity"
    title: "Initial public release"
    url: "https://github.com/wndif/VeriBugBench/commit/463d490e261dff247eb6ef82b07b6e924fee19e8"
  - id: "stimulus-generator"
    title: "Optional model-backed testbench-enhancement implementation"
    url: "https://github.com/wndif/VeriBugBench/blob/463d490e261dff247eb6ef82b07b6e924fee19e8/src/veribugbench/llm.py"
  - id: "workflow"
    title: "Frozen replay and optional-regeneration boundary"
    url: "https://github.com/wndif/VeriBugBench/blob/463d490e261dff247eb6ef82b07b6e924fee19e8/docs/BENCHMARK_WORKFLOW.md"
---

### Benchmark construction

The framework imports complete RTL projects, applies structural mutation operators, runs candidates against the same reference testbench and retains only faults whose output differs from the golden run. It separately parses URG coverage reports into time-windowed coverage matrices. [Reviewed source](#source-readme)

### AI boundary

Frozen v1.0 replay uses committed testbenches and deterministic execution. The optional model-backed enhancement helper and the paper's evaluated generation workflow provide the distinct AI Verification path; this does not imply model inference during ordinary replay. [Implementation](#source-stimulus-generator); [Paper](#source-paper).

### Scope classification

Fault injection, reference/mutant execution, output comparison and coverage matrices are Verification. The optional request_enhancement helper constructs a clean-DUT/testbench-specific stimulus prompt and calls a model endpoint; the paper describes and evaluates that testbench-generation method. AI Verification identifies this bounded optional generation path, not AI inside frozen replay or an implemented autonomous fault-localization agent. [Stimulus generator](#source-stimulus-generator); [Workflow boundary](#source-workflow); [Method and results](#source-paper).

### Current-source review

Reviewed 2026-10-01. The helper returns the provider response; it does not itself sanitize, insert or validate the generated Verilog through the benchmark CLI. Using it requires the optional llm dependency and configured endpoint credentials. Generated testbench history alone is not development-provenance evidence. [Implementation](#source-stimulus-generator).
