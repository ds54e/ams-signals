---
name: "RTLScout"
aliases: ["RTL Scout"]
description: "LLM RTL generation and optimization harness for Verilog/SystemVerilog, Spire HDL and Amaranth, using fixed correctness and PPA evaluators. Its optional OpenCode design-library workflow also delegates directed-stimulus authoring to a verification agent before freezing an acceptance oracle; independent re-evaluation guards candidate admission."
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited development implemented the OpenCode execution backend and the sandboxed advisory/authoritative evaluation split. The current orchestration retains backend execution, evaluation storage and post-run rescoring."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "BSD-3-Clause-Clear public source; Docker/devcontainer toolchain is provided and real agent runs require a supported LLM provider."
addedAt: "2026-09-14"
reviewedAt: "2026-10-11"
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
    url: "https://github.com/huawei-csl/rtlscout/blob/9f95d9576c78863a844adc8cc6594c6503426074/README.md"
  - id: "activity"
    title: "Artifacts and campaign/re-evaluation integration merge"
    url: "https://github.com/huawei-csl/rtlscout/commit/bfeb165ee8c4ba8dc47a6fe575730e002da5092b"
  - id: "dv-skill"
    title: "Directed-stimulus preparation and frozen-oracle contract"
    url: "https://github.com/huawei-csl/rtlscout/blob/9f95d9576c78863a844adc8cc6594c6503426074/core/skills/design-db-dv-prep/SKILL.md"
  - id: "agent-integration"
    title: "Executable skill provisioning and verification subagent definitions"
    url: "https://github.com/huawei-csl/rtlscout/blob/9f95d9576c78863a844adc8cc6594c6503426074/core/design_db_skills.py"
  - id: "activity-review"
    title: "RTLRewriter benchmark refresh and gate-netlist evaluation corrections"
    url: "https://github.com/huawei-csl/rtlscout/commit/9f95d9576c78863a844adc8cc6594c6503426074"
  - id: "ppa-template"
    title: "OpenROAD post-synthesis STA and power template"
    url: "https://github.com/huawei-csl/rtlscout/blob/9f95d9576c78863a844adc8cc6594c6503426074/deps/tech_eval/src/tech_eval/ppa_extract/core/template.py"
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/huawei-csl/rtlscout/commit/9bb5683747dafc8722b680140070ace3c5ffceab"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/huawei-csl/rtlscout/commit/a1d307788137ff47e0edaf6c822e486f8a82599c"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/huawei-csl/rtlscout/commit/aac5ea21346bf6e563ba6e5761f5c8cae4775ea9"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/huawei-csl/rtlscout/blob/1c88113fb1111837349adee2a9aa9bcea541e06d/core/opencode_backend.py"
---

### Agent loop

RTLScout can start from a specification or an existing design, compile supported HDL forms, run Verilator-based correctness evaluation and optimize a chosen implementation cost. Multi-run flows retain elite designs and can build Pareto fronts rather than relying on one agent trajectory. [Reviewed source](#source-readme).

### Tool verdicts

The model changes the design, giving AI Design. Verilator and synthesis/PPA tools provide deterministic checks and metrics. The separate design-DB stimulus-authoring agent adds AI Verification; synthesis/PPA grading stays conventional. The OpenROAD PPA template reads libraries and the synthesized netlist, applies clock/I/O constraints and reports timing, area and optional VCD-derived power. It performs no floorplanning, placement, routing or parasitic extraction, so no Layout scope is assigned. [PPA implementation](#source-ppa-template).

### Integrity boundary

The external OpenCode mode can run with a shell, but the framework re-evaluates candidates against benchmark-owned inputs before authoritative results enter the elite pool. The September 17 merge refreshes the RTLRewriter evaluation artifacts and corrects lint/build timeout handling for larger gate-level candidates; it is the current meaningful-activity checkpoint. [Reviewed update](#source-activity-review).

### Current-source review

Reviewed 2026-10-01. The main optimization loop is AI Design with deterministic synthesis/PPA measurements. The optional OpenCode design-DB integration additionally provisions rtl-dv-prep to write stimulus, dry-run it and deliver it for a one-shot oracle freeze; this is substantive AI Verification even though golden simulation supplies expected outputs. Synthesis stays conventional; the inspected OpenROAD path is post-synthesis STA/power rather than physical implementation. [Verification skill](#source-dv-skill); [Provisioning and subagent](#source-agent-integration).

### Current implementation and operating boundaries

The reviewed technology-evaluation path controls FA/HA mapping and runs opt_clean -purge before techmapping, so unused $fa cells do not inflate area estimates. Area results depend on that corrected measurement path; numerical author-reported gains were not reproduced. [Reviewed implementation integration](#source-review-20261011-1)

Runtime Scope classifications are preserved. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.

### Development provenance

The patches implement an execution backend, sandbox protocol, independent re-evaluation and persisted evaluation artifacts, rather than merely configuring an agent. These are substantial orchestration and evaluation subsystems in RTLScout; provenance remains separate from its runtime model-driven RTL transformations. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)
