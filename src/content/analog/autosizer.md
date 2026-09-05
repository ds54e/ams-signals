---
name: "AutoSizer"
aliases: ["AMS-SizingBench"]
summary: "LLM-guided sizing strategies with AMS-SizingBench."
description: "Uses an LLM to choose sizing variables, ranges and optimization strategies, then runs ngspice-backed search across the AMS-SizingBench circuit configurations."
flow: {"design":"core","simulation":"core"}
access: "Python, LLM access, SKY130 and ngspice; optional layout/PEX paths require separately supplied tool adapters."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "AutoSizer: Automatic Sizing of Analog and Mixed-Signal Circuits via Large Language Model Agents"
    url: "https://arxiv.org/abs/2602.02849"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/yuxi120407/AutoSizer"
    purpose: "code"
  - id: "llm-guided-ota-optimization-test-py"
    title: "LLM search-space and strategy loop"
    url: "https://github.com/yuxi120407/AutoSizer/blob/1b9b8f6498e2c7ad3b650bbbc78c8e3b0e1205e1/llm_guided_ota_optimization_test.py"
  - id: "iterative-ota-optimization-test-py"
    title: "Iterative sizing and simulation orchestration"
    url: "https://github.com/yuxi120407/AutoSizer/blob/1b9b8f6498e2c7ad3b650bbbc78c8e3b0e1205e1/iterative_ota_optimization_test.py"
  - id: "benchmark"
    title: "The 24 maintained benchmark configurations"
    url: "https://github.com/yuxi120407/AutoSizer/tree/1b9b8f6498e2c7ad3b650bbbc78c8e3b0e1205e1/AMS-SizingBench"
  - id: "test-magic-pex-py"
    title: "Optional external Magic PEX tool contract"
    url: "https://github.com/yuxi120407/AutoSizer/blob/1b9b8f6498e2c7ad3b650bbbc78c8e3b0e1205e1/test_magic_pex.py"
---

### Scope

AutoSizer and AMS-SizingBench share one release and are cataloged together. The outer LLM loop proposes parameter importance, ranges and algorithms; the inner numerical search evaluates candidate sizings and returns circuit metrics. The repository contains 24 benchmark YAML configurations covering analog and mixed-signal blocks. [Optimization loop](#source-llm-guided-ota-optimization-test-py) · [Benchmark](#source-benchmark) · [Paper](#source-paper)

### Release boundary

The public batch entry uses pre-layout optimization. Optional ALIGN/PEX calls do not establish a complete released physical flow: the Magic example imports `app.tool.magic_pex`, absent from the captured tree. Layout is omitted. Sizing decisions and simulation-backed search are central Design and Simulation operations. Benchmark results in the paper are reported, not reproduced here. [Iteration implementation](#source-iterative-ota-optimization-test-py) · [PEX contract](#source-test-magic-pex-py)

### Flow scope

The outer LLM chooses sizing variables, ranges and search strategies; the inner optimizer repeatedly evaluates circuits with ngspice. Both stages are central. Optional PEX hooks do not establish a released layout flow. [Reviewed source](#source-llm-guided-ota-optimization-test-py).
