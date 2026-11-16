---
name: ICLayout-Bench
description: Benchmark framework for AI agents generating IC layouts from transistor netlists and process constraints. It isolates EDA execution and independently evaluates submitted geometry with DRC, LVS, extraction and electrical measurements; the public dataset and available toolchains cover a subset of the broader reported study.
scope:
  simulation:
    ai: false
  layout:
    ai: true
access: Public framework; Linux, container/isolation tooling, an agent, dataset and compatible PDK/toolchains are required.
addedAt: '2026-11-16'
reviewedAt: '2026-11-16'
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
  title: Current implementation at review
  url: https://github.com/lizhangmai/ICLayout-Bench/blob/de0910856777cbdc87452678a40bafe0288274a9/README.md
summary: Benchmark framework for AI agents generating IC layouts from transistor netlists and process constraints.
---

### Implementation and selection

AI Layout describes the evaluated agent task, not an AI grader. Conventional post-layout electrical evaluation supports Simulation. Public scope is 92 tasks across four open PDKs, distinct from the full paper study; native evidence-contract and extraction changes include tests. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).
