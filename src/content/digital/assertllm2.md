---
name: "AssertLLM2"
aliases: []
description: "Benchmark and execution framework evaluating language-model-generated SystemVerilog assertions from design specifications. Its pipeline combines syntax and formal checks, coverage and mutation-based bug detection through JasperGold, separating generated-property validity from usefulness against injected design faults and requiring licensed tools and model access. The Lite subset narrows the cases used by the same framework."
scope:
  verification:
    ai: true
access: "Public Python benchmark/evaluator; Cadence JasperGold and configured model/API access are required."
addedAt: "2026-10-22"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/hkust-zhiyao/AssertLLM2"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/hkust-zhiyao/AssertLLM2/blob/f66fd20679dfff1de2f6d6e90bc4922d04e6ff62/README.md"
  - id: "implementation-1"
    title: "Reviewed source: AssertLLM2/assertbench/core/pipeline.py"
    url: "https://github.com/hkust-zhiyao/AssertLLM2/blob/f66fd20679dfff1de2f6d6e90bc4922d04e6ff62/AssertLLM2/assertbench/core/pipeline.py"
  - id: "implementation-2"
    title: "Reviewed source: AssertLLM2/assertbench/cli.py"
    url: "https://github.com/hkust-zhiyao/AssertLLM2/blob/f66fd20679dfff1de2f6d6e90bc4922d04e6ff62/AssertLLM2/assertbench/cli.py"
  - id: "implementation-3"
    title: "Reviewed source: AssertLLM2/assertbench/formal/jasper.py"
    url: "https://github.com/hkust-zhiyao/AssertLLM2/blob/f66fd20679dfff1de2f6d6e90bc4922d04e6ff62/AssertLLM2/assertbench/formal/jasper.py"
  - id: "activity"
    title: "Lite subset configuration and runner changes"
    url: "https://github.com/hkust-zhiyao/AssertLLM2/commit/01a1f85a9a17d3e949ec446044701b8607c6c2e2"
---

### Implemented operations and boundaries

The pipeline separates assertion generation, syntax/FPV checks, coverage and mutation-based bug detection. JasperGold and model access remain dependencies; the benchmark task qualifies for Verification with the internal AI flag without attributing AI to its grader. Property counts or PROVED counts alone do not establish verification effectiveness.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Verification. The internal AI flag describes the optional implemented model-hosted workflow or the explicitly evaluated AI task. It does not classify the conventional checker or numerical engine as AI.

The November 1 Lite subset adds executable runner changes as well as subset configuration. It is a narrower selection for the existing evaluation framework, not a separately reproduced benchmark result. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
