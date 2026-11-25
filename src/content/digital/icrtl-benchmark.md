---
name: "ICRTL-Benchmark"
aliases: ["ICRTL"]
description: "Benchmark for LLM RTL generation and PPA-oriented optimization across ten design problems, with specifications, testbenches, reference implementations and task prompts. Fixed Icarus/Yosys scripts evaluate candidates; an optional Synopsys flow adds VCS, Design Compiler and PrimeTime measurements without making the grader model-driven."
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: false
access: "Public benchmark source. The open path uses Icarus Verilog, Yosys and a separately installed NanGate45 library; the optional commercial evaluation path requires VCS, Design Compiler and PrimeTime."
addedAt: "2026-09-26"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical ICRTL-Benchmark repository"
    url: "https://github.com/weiber2002/ICRTL-Benchmark"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/weiber2002/ICRTL-Benchmark/blob/d87c7cfe58ae4af79a4aecf13720b0c6f73df7ae/README.md"
  - id: "activity"
    title: "Reset-signal correctness update"
    url: "https://github.com/weiber2002/ICRTL-Benchmark/commit/d87c7cfe58ae4af79a4aecf13720b0c6f73df7ae"
  - id: "task-contract"
    title: "Model RTL generation/optimization task contract"
    url: "https://github.com/weiber2002/ICRTL-Benchmark/blob/d87c7cfe58ae4af79a4aecf13720b0c6f73df7ae/PROMPT_Generate/02_RTL_Generation_Prompt.md"
  - id: open-testbench-update
    title: "June 25 single-run Icarus-compatible benchmark testbenches"
    url: "https://github.com/weiber2002/ICRTL-Benchmark/commit/d7b66514ff6dff0788030c15d99fea0c912343e8"
  - id: commercial-wns-update
    title: "July 3 WNS reporting in commercial evaluation"
    url: "https://github.com/weiber2002/ICRTL-Benchmark/commit/9cea7a16c8d8d1180ca3ec18fc23620eca332e90"
  - id: commercial-eval-retained
    title: "Retained commercial simulation, synthesis and report evaluator"
    url: "https://github.com/weiber2002/ICRTL-Benchmark/blob/d87c7cfe58ae4af79a4aecf13720b0c6f73df7ae/VCS/eval/eval.py"
---

### Benchmark surface

Ten challenge directories provide problem specifications, testbenches and reference implementations for accelerator, control, compression, geometry and matrix-processing designs. The repository also includes prompts intended for code-generation and PPA experiments. [Reviewed source](#source-readme)

### Evaluation paths

Each problem exposes an open Icarus/Yosys path. A separate commercial harness evaluates RTL simulation, synthesis and power/timing with Synopsys tools; those tools and a foundry library are user-provided rather than bundled. [Reviewed source](#source-readme)

### Scope classification

The released prompts explicitly evaluate model-generated and optimized RTL against specifications and correctness/PPA goals. AI Design identifies that model task. Icarus/Yosys and the optional VCS/DC/PrimeTime flow provide conventional Verification and Synthesis grading; model-authored RTL alone does not give those graders an AI prefix. [Benchmark](#source-readme); [Task contract](#source-task-contract).

### Current-source review

Reviewed 2026-10-01. The task prompt separates model-side RTL optimization and executable-reference comparisons from later HDL-tool evaluation. The benchmark role, rather than inference inside its scripts, is the basis for the AI Design label. [Task contract](#source-task-contract).

### Reviewed implementation and retention, November 25, 2026

The public history includes January evaluator work, then June expansion of the design problems and June 25 single-run Icarus-compatible testbench corrections for Q6–Q9. July 3 adds WNS reporting to the commercial evaluator, followed by the retained reset/clock naming corrections. The benchmark's contest-scale RTL problems and paired open/commercial PPA-oriented evaluation paths distinguish it from broader comprehension and agentic task corpora. The canonical public history was quiet after July 3; no additional branch, release or pull request established later implementation in this review. Retention rests on these separate technical periods, not on an assumption of ongoing frequent development. [Testbench changes](#source-open-testbench-update) · [WNS change](#source-commercial-wns-update) · [Evaluator](#source-commercial-eval-retained).

Source inspection only; no EDA or model experiment was independently reproduced.
