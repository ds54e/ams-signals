---
name: "AssertLLM2"
aliases: []
description: "Benchmark and execution framework evaluating language-model-generated SystemVerilog assertions from design specifications. Its pipeline combines syntax and formal checks, coverage and mutation-based bug detection through JasperGold, separating generated-property validity from usefulness against injected design faults and requiring licensed tools and model access."
scope:
  verification:
    ai: true
access: "Public Python benchmark/evaluator; Cadence JasperGold and configured model/API access are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
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
    title: "Reviewed meaningful change: Update spec_input.py"
    url: "https://github.com/hkust-zhiyao/AssertLLM2/commit/17cef8b8c4ca0a2ec9eea67c6e8ee53625d6e25b"
---

### Implemented operations and boundaries

The pipeline separates assertion generation, syntax/FPV checks, coverage and mutation-based bug detection. JasperGold and model access remain dependencies; the benchmark task justifies AI Verification without attributing AI to its grader. Property counts or PROVED counts alone do not establish verification effectiveness.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Verification. The AI prefix describes the optional implemented model-hosted workflow or the explicitly evaluated AI task. It does not classify the conventional checker or numerical engine as AI.

The meaningful checkpoint is 2026-04-30T10:41:51Z (`17cef8b8c4ca0a2ec9eea67c6e8ee53625d6e25b`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
