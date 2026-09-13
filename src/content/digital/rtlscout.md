---
name: "RTLScout"
aliases: ["RTL Scout"]
description: "LLM-driven RTL generation and optimization harness for Verilog/SystemVerilog, Spire HDL and Amaranth. Agents iterate against Verilator correctness checks and configurable Yosys/ABC, OpenROAD or AIG-derived cost metrics, with single-run, elite-pool and Pareto-search workflows plus an isolated re-evaluation path for shell-capable agents."
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: false
access: "BSD-3-Clause-Clear public source; Docker/devcontainer toolchain is provided and real agent runs require a supported LLM provider."
addedAt: "2026-09-14"
reviewedAt: "2026-09-14"
sources:
  - id: "code"
    title: "Canonical RTLScout repository"
    url: "https://github.com/huawei-csl/rtlscout"
    purpose: "code"
  - id: "paper"
    title: "RTLScout paper"
    url: "https://arxiv.org/abs/2606.06530"
    purpose: "paper"
  - id: "readme"
    title: "RTLScout README at the reviewed revision"
    url: "https://github.com/huawei-csl/rtlscout/blob/bfeb165ee8c4ba8dc47a6fe575730e002da5092b/README.md"
  - id: "activity"
    title: "Artifacts and campaign/re-evaluation integration merge"
    url: "https://github.com/huawei-csl/rtlscout/commit/bfeb165ee8c4ba8dc47a6fe575730e002da5092b"
---

### Agent loop

RTLScout can start from a specification or an existing design, compile supported HDL forms, run Verilator-based correctness evaluation and optimize a chosen implementation cost. Multi-run flows retain elite designs and can build Pareto fronts rather than relying on one agent trajectory. [Reviewed source](#source-readme).

### Tool verdicts

The model changes the design, giving AI Design. Verilator and synthesis/PPA tools provide deterministic checks and metrics, so Verification and Synthesis remain non-AI stages. OpenROAD may contribute a cost metric, but the reviewed workflow does not establish routed layout as the project deliverable, so no Layout scope is assigned. [Reviewed source](#source-readme).

### Integrity boundary

The external OpenCode mode can run with a shell, but the framework re-evaluates candidates against benchmark-owned inputs before authoritative results enter the elite pool. The August merge includes campaign, measurement and re-evaluation support and is used as the meaningful-activity checkpoint. [Meaningful update](#source-activity).
