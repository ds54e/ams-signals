---
name: "Open-Source Analog Circuit Sizing Benchmark Suite"
aliases: ["opensource-analog-circuits","MC-aware sizing"]
summary: "Benchmarks analog circuit sizing with ngspice and a dedicated mismatch-aware ASAP7 LDO evaluation path."
description: "Parameterized analog circuit sizing benchmark with ngspice evaluators and optional Gaussian-process optimization comparisons. Five ASAP7 LDO tasks provide size-dependent threshold-mismatch sampling, common random numbers, independent validation seeds and yield confidence intervals; their mismatch coefficients are engineering assumptions rather than calibrated process data."
scope: {"design":{"ai":true},"simulation":{"ai":false}}
access: "Public Python and circuit source; no repository-wide license was established in the reviewed tree. ngspice is required; ASAP7 tasks use the documented OSDI/Docker setup, and optional Bayesian comparisons require separately installed TuRBO or HEBO."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/jialinlu/opensource-analog-circuits"
    purpose: code
  - id: activity
    title: "August 5 mismatch-aware sizing benchmark driver and validation protocol"
    url: "https://github.com/jialinlu/opensource-analog-circuits/commit/3a6a1f9a6157f3cfbb6f13d1a3589026b7e13055"
  - id: earlier
    title: "July 25 migration of five LDO tasks to ASAP7"
    url: "https://github.com/jialinlu/opensource-analog-circuits/commit/70ae4574aa3b45c0e9f88e209322261cdb2bd521"
  - id: driver
    title: "Mismatch Monte Carlo benchmark evaluator and validation"
    url: "https://github.com/jialinlu/opensource-analog-circuits/blob/e8308aa273c1a6737a5dee89178c4d48270ff87e/benchmark/mc_benchmark.py"
  - id: mismatch
    title: "Size-dependent mismatch testbench generation"
    url: "https://github.com/jialinlu/opensource-analog-circuits/blob/e8308aa273c1a6737a5dee89178c4d48270ff87e/benchmark/gen_mc_tb.py"
  - id: contract
    title: "Mismatch-aware benchmark protocol and acceptance gates"
    url: "https://github.com/jialinlu/opensource-analog-circuits/blob/e8308aa273c1a6737a5dee89178c4d48270ff87e/MC_SIZING_BENCHMARK.md"
  - id: bo
    title: "Optional TuRBO and HEBO circuit sizing comparisons"
    url: "https://github.com/jialinlu/opensource-analog-circuits/blob/e8308aa273c1a6737a5dee89178c4d48270ff87e/benchmark/run_bo_comparison.py"
  - id: overview
    title: "Reviewed benchmark coverage and setup"
    url: "https://github.com/jialinlu/opensource-analog-circuits/blob/e8308aa273c1a6737a5dee89178c4d48270ff87e/README.md"
---

## Scope and limits

The benchmark provides parameterized ngspice circuit tasks and a numerical sizing interface. Its optional HEBO GP and TuRBO comparison workflow chooses circuit parameter candidates, supporting AI Design; SPICE and the statistical grader remain conventional. This is a different workflow from EvoLDO-Bench's LLM reasoning and controlled circuit-repair evaluation. [Overview](#source-overview) · [Bayesian comparison](#source-bo).

The five ASAP7 LDO tasks generate independent threshold-voltage mismatch draws with a size-dependent Pelgrom-style engineering assumption. The evaluator recomputes each device sigma after resizing, uses common random numbers for design comparisons, penalizes nonconverged samples and exposes a separate validation seed with Wilson yield intervals. The default training objective uses 30 samples and validation uses 500. This is mismatch-aware sizing, not foundry-calibrated statistical modeling or a high-sigma rare-event estimator. [Driver](#source-driver) · [Mismatch generation](#source-mismatch) · [Protocol](#source-contract).

## Reviewed maintenance

July 25 migrated five LDO benchmarks to ASAP7 and added a simulator setup. August 5 added the executable mismatch benchmark driver following the August 4 testbench changes. The later documentation edits remain the raw activity checkpoint. No numerical benchmark result was independently reproduced; repository-wide licensing and qualifying AI-development attribution were not established in the reviewed source. [July migration](#source-earlier) · [August implementation](#source-activity).
