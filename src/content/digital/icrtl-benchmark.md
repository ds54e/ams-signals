---
name: "ICRTL-Benchmark"
aliases: ["ICRTL"]
description: "Benchmark of ten larger RTL design problems with LLM-readable specifications, testbenches and reference implementations. Open scripts combine Icarus simulation and Yosys synthesis, while an optional Synopsys flow adds VCS, Design Compiler and PrimeTime evaluation for functional and PPA-oriented experiments."
scope:
  design:
    ai: false
  synthesis:
    ai: false
  verification:
    ai: false
access: "Public benchmark source. The open path uses Icarus Verilog, Yosys and a separately installed NanGate45 library; the optional commercial evaluation path requires VCS, Design Compiler and PrimeTime."
addedAt: "2026-09-26"
reviewedAt: "2026-09-26"
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
---

### Benchmark surface

Ten challenge directories provide problem specifications, testbenches and reference implementations for accelerator, control, compression, geometry and matrix-processing designs. The repository also includes prompts intended for code-generation and PPA experiments. [Reviewed source](#source-readme)

### Evaluation paths

Each problem exposes an open Icarus/Yosys path. A separate commercial harness evaluates RTL simulation, synthesis and power/timing with Synopsys tools; those tools and a foundry library are user-provided rather than bundled. [Reviewed source](#source-readme)

### Scope classification

The benchmark defines RTL implementation tasks and executes synthesis and functional evaluation, so Design, Synthesis and Verification are all material stages. The benchmark itself does not perform model inference, so each stage remains non-AI. [Reviewed source](#source-readme)
