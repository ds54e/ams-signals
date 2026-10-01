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
reviewedAt: "2026-10-01"
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
---

### Benchmark surface

Ten challenge directories provide problem specifications, testbenches and reference implementations for accelerator, control, compression, geometry and matrix-processing designs. The repository also includes prompts intended for code-generation and PPA experiments. [Reviewed source](#source-readme)

### Evaluation paths

Each problem exposes an open Icarus/Yosys path. A separate commercial harness evaluates RTL simulation, synthesis and power/timing with Synopsys tools; those tools and a foundry library are user-provided rather than bundled. [Reviewed source](#source-readme)

### Scope classification

The released prompts explicitly evaluate model-generated and optimized RTL against specifications and correctness/PPA goals. AI Design identifies that model task. Icarus/Yosys and the optional VCS/DC/PrimeTime flow provide conventional Verification and Synthesis grading; model-authored RTL alone does not give those graders an AI prefix. [Benchmark](#source-readme); [Task contract](#source-task-contract).

### Current-source review

Reviewed 2026-10-01. The task prompt separates model-side RTL optimization and executable-reference comparisons from later HDL-tool evaluation. The benchmark role, rather than inference inside its scripts, is the basis for the AI Design label. [Task contract](#source-task-contract).
