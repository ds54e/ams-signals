---
summary: Benchmark framework for AI agents generating IC layouts from transistor netlists and process constraints.
name: ICLayout-Bench
description: Benchmark framework for AI agents generating IC layouts from transistor netlists and process constraints. It isolates EDA execution and independently evaluates submitted geometry with DRC, LVS, extraction and electrical measurements; the public dataset and available toolchains cover a subset of the broader reported study.
scope:
  simulation:
    ai: false
  layout:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is co-credited on executable participant-orchestration refactoring and tests. The current runner retains injected service, process and clock boundaries; this evidence concerns benchmark infrastructure, separate from the evaluated agents and conventional grading."
  sources: [development-20261124-code, development-20261124-retained]
  reviewedAt: '2026-11-24'
access: Public framework; Linux, container/isolation tooling, an agent, dataset and compatible PDK/toolchains are required.
addedAt: '2026-11-16'
reviewedAt: "2026-11-24"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/lizhangmai/ICLayout-Bench
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/lizhangmai/ICLayout-Bench/blob/de0910856777cbdc87452678a40bafe0288274a9/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/lizhangmai/ICLayout-Bench/commit/069b1dd250722f49ca26a56c715a1a1f58bbc492
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/lizhangmai/ICLayout-Bench/commit/069b1dd250722f49ca26a56c715a1a1f58bbc492
- id: retained
  title: Retained evaluation runner and measurement validation
  url: https://github.com/lizhangmai/ICLayout-Bench/blob/de0910856777cbdc87452678a40bafe0288274a9/benchmarking/evaluation/runner.py
- id: extraction
  title: Retained KPEX extraction and interface validation
  url: https://github.com/lizhangmai/ICLayout-Bench/blob/de0910856777cbdc87452678a40bafe0288274a9/benchmarking/eda/_scripts/kpex_runner.py
- id: development-20261124-code
  title: "Credited executable implementation and tests"
  url: https://github.com/lizhangmai/ICLayout-Bench/commit/06aeecd2e213f56746cfa98537158af55962b3be
- id: development-20261124-retained
  title: "Retained credited implementation at the reviewed head"
  url: https://github.com/lizhangmai/ICLayout-Bench/blob/06aeecd2e213f56746cfa98537158af55962b3be/benchmarking/participants/attempt/boundaries.py
---

### Implementation and selection

AI Layout describes the evaluated agent task, not an AI grader. Conventional post-layout electrical evaluation supports Simulation. Public scope is 92 tasks across four open PDKs, distinct from the full paper study; native evidence-contract and extraction changes include tests. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Evaluation runner](#source-retained) · [KPEX extraction](#source-extraction).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### November 24, 2026 development-provenance review

Claude Opus 5.5 is co-credited on executable participant-orchestration refactoring and tests. The current runner retains injected service, process and clock boundaries; this evidence concerns benchmark infrastructure, separate from the evaluated agents and conventional grading. [Credited change](#source-development-20261124-code) · [Retained code](#source-development-20261124-retained).
