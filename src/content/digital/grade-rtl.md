---
name: "GRADE-RTL"
aliases: []
description: "Evaluates and refines LLM-generated RTL through port checks, compilation, elaboration, module-completeness checks and formal equivalence. Live, replay and synthetic-fixture modes preserve response provenance and tool evidence; optional Yosys synthesis produces generic netlists and statistics, while the release contains three smoke designs rather than the full paper archive."
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: false
access: "MIT. Python 3.10+, Icarus Verilog and Yosys for the public smoke workflow; a selected model provider is needed only for live mode. Proprietary implementation environments and their artifacts are outside this released smoke package."
addedAt: "2026-10-11"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/hsc-research/GRADE-RTL"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/hsc-research/GRADE-RTL/blob/0327b8592c3ac0617c854b6731c2034bfbf5670f/README.md"
  - id: "artifact-boundary"
    title: "Artifact boundary"
    url: "https://github.com/hsc-research/GRADE-RTL/blob/0327b8592c3ac0617c854b6731c2034bfbf5670f/ARTIFACT_STATUS.md"
  - id: "model-refinement-runner"
    title: "Model/refinement runner"
    url: "https://github.com/hsc-research/GRADE-RTL/blob/0327b8592c3ac0617c854b6731c2034bfbf5670f/src/llm_rtl_eval/runner.py"
  - id: "fixed-grading-stages"
    title: "Fixed grading stages"
    url: "https://github.com/hsc-research/GRADE-RTL/blob/0327b8592c3ac0617c854b6731c2034bfbf5670f/src/llm_rtl_eval/stages.py"
  - id: "generic-synthesis"
    title: "Generic synthesis"
    url: "https://github.com/hsc-research/GRADE-RTL/blob/0327b8592c3ac0617c854b6731c2034bfbf5670f/src/llm_rtl_eval/synthesis.py"
  - id: "implementation-checkpoint"
    title: "Implementation checkpoint"
    url: "https://github.com/hsc-research/GRADE-RTL/commit/ad5662e333e9f88b8241bddfb93b60a90182a3cc"
  - id: "license"
    title: "License"
    url: "https://github.com/hsc-research/GRADE-RTL/blob/0327b8592c3ac0617c854b6731c2034bfbf5670f/LICENSE"
---

## Implementation and Scope

A model generates and refines DUT RTL from failed-stage diagnostics. Fixed stages check ports, compilation, elaboration, module completeness and formal equivalence. An optional Yosys path produces generic synthesized netlists and statistics. The reviewed implementation is described in the [README](#source-readme) and [Artifact boundary](#source-artifact-boundary), [Model/refinement runner](#source-model-refinement-runner), [Fixed grading stages](#source-fixed-grading-stages).

The released implementation distinguishes live, replay and synthetic-fixture response provenance, separately from EDA tool modes. Code and tests cover provider adapters, replay-bundle validation and stage evidence, giving the catalog a useful example of auditable RTL grading.

## Evidence and operating boundaries

AI belongs to Design. The fixed synthesis/equivalence graders do not establish AI Synthesis or AI Verification. The release includes three smoke designs and aggregate manuscript artifacts, with no complete nine-model/ten-design response and tool-log archive, trusted reference trees, FPGA projects or proprietary ASIC reports/libraries. A Genus template is not a finished physical flow.

MIT. Python 3.10+, Icarus Verilog and Yosys for the public smoke workflow; a selected model provider is needed only for live mode. Proprietary implementation environments and their artifacts are outside this released smoke package. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is ad5662e333e9f88b8241bddfb93b60a90182a3cc (2026-08-23 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-implementation-checkpoint) supports the meaningful date; the latest head is separately retained for activity ordering.

The author-linked canonical project is the public hsc-research fork of anonrtl28/LLM_FOR_RTL. Its implementation additions and independent repository ID were manually reviewed. Retain one catalog identity. The automated refresh's fork guard requires a renewed manual identity review for this repository rather than substituting the parent or relaxing the guard.
