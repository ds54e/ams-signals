---
name: GATOR
description: Reinforcement-learning sizing of fixed-topology analog circuits using a graph-based policy and simulator feedback. Spectre and ngspice paths evaluate nominal schematic performance; published code excludes trained weights, and the workflow does not provide process-corner, Monte Carlo or layout verification.
scope:
  design:
    ai: true
  simulation:
    ai: false
  aiDevelopment: assisted
access: Public source; runs require a supported simulator and circuit models. Cloned training starts without pretrained weights; Spectre use additionally requires licensed Cadence access.
addedAt: '2026-11-16'
reviewedAt: "2026-11-28"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/FengyanWong/gator
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/FengyanWong/gator/blob/3157d5373e074e022816b4e079a4984ad8493b7b/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/FengyanWong/gator/commit/936bf1f05d7a8643e950907b44ebf7d4e514a500
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/FengyanWong/gator/commit/1ea748d5b34b44e51fb7014cdc35363ea755283b
- id: retained
  title: Current implementation at review
  url: https://github.com/FengyanWong/gator/blob/3157d5373e074e022816b4e079a4984ad8493b7b/src/gator_workbench/connection.py
- id: november-test-integration
  title: "November 12 integration of public checkout test infrastructure"
  url: https://github.com/FengyanWong/gator/commit/3157d5373e074e022816b4e079a4984ad8493b7b
- id: checkout-tests
  title: "Retained fresh-checkout CI and ngspice test setup"
  url: https://github.com/FengyanWong/gator/blob/3157d5373e074e022816b4e079a4984ad8493b7b/.github/workflows/tests.yml
summary: Reinforcement-learning sizing of fixed-topology analog circuits using a graph-based policy and simulator feedback.
developmentEvidence:
  summary: The reviewed implementation commit credits Claude for connection-gating corrections and regression tests. The attributed executable changes are integrated and retained in the pinned source; this does not attribute unrelated project code.
  sources:
  - implementation
  - retained
  reviewedAt: '2026-11-16'
- id: related-analoggym-opt
  title: "Separate GRPO sizing entry and PVT mode selection"
  url: "https://github.com/Computing-Intelligent-Decision-Team/AnalogGym-Opt/blob/10093e3496ef2c7d06494d91d131b0cc5de6c25b/main_AMP_grpo.py"
---

### Implementation and selection

Completed research experiments do not imply abandoned software: later connection-gating corrections and tests establish substantive maintenance. Learned candidate selection is AI Design; conventional electrical evaluation remains Simulation. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

### Development provenance

The credited Claude identity, executable diff, canonical integration and retained implementation were checked together. This is development assistance, separate from runtime stage classification. [Attributed change](#source-implementation) · [Current code](#source-retained).

### Continued verification maintenance

The November 12 first-parent integration adds fresh-checkout CI that installs ngspice, builds the browser workbench and runs its Python tests, with a serial retry of initially failed tests and a warning when a retry is needed. Tests requiring absent recorded evidence remain skipped; this does not qualify learned sizing performance, PDK coverage or a full Spectre workflow. The same integration repairs a filesystem fixture's dependence on an existing local path. This is substantive test maintenance after the November 6 connection-gating repair and supersedes that earlier checkpoint within the saved capture. [Integrated changes](#source-november-test-integration) · [Retained workflow](#source-checkout-tests).

### Selection boundary

The current source documents Soft Actor-Critic with a graph-transformer policy by default, a local workbench and nominal schematic runs in Spectre or ngspice. Its supplied repository does not include trained weights or PVT/Monte Carlo evaluation. AnalogGym-Opt uses a distinct GRPO policy and configured SKY130 amplifier/LDO environments with separate PVT modes. The fixed-topology sizing goal alone does not make the implementations duplicates. No claim of comparative optimizer superiority or independently reproduced performance is made. [Workflows and limitations](#source-readme) · [Related GRPO workflow](#source-related-analoggym-opt).
