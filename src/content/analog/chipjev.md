---
name: "ChipJev"
aliases: []
summary: "Selects analog circuit topologies and device sizes, with model-guided SKY130 physical design."
description: "Uses a typed decision model and GPU Bayesian search to select circuit topologies and size devices, with ngspice evaluation on PTM 45 nm and SKY130. A model-guided SKY130 Magic flow proposes layout changes and accepts them through DRC, LVS, RC extraction and post-layout simulation."
scope:
  design:
    ai: true
  simulation:
    ai: false
  layout:
    ai: true
access: "Apache-2.0 project code, with separate MIT notices for derived model layers and separate checkpoint/model terms. Python 3.13, numerical/model packages, ngspice and the selected model/PDK are required; physical work adds Magic and SKY130. PDK-dependent integration tests can be skipped when the environment is absent."
addedAt: "2026-10-11"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/lab-emi/ChipJev"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/lab-emi/ChipJev/blob/6389189d8cc40393eca97e8776638aaba5038b95/README.md"
  - id: "typed-decisions"
    title: "Typed decisions"
    url: "https://github.com/lab-emi/ChipJev/blob/6389189d8cc40393eca97e8776638aaba5038b95/src/chipjev/decisions/typed.py"
  - id: "layout-decisions"
    title: "Layout decisions"
    url: "https://github.com/lab-emi/ChipJev/blob/6389189d8cc40393eca97e8776638aaba5038b95/src/chipjev/decisions/pro_layout.py"
  - id: "physical-boundaries"
    title: "Physical boundaries"
    url: "https://github.com/lab-emi/ChipJev/blob/6389189d8cc40393eca97e8776638aaba5038b95/docs/analog-layout-usage.md"
  - id: "third-party-notices"
    title: "Third-party notices"
    url: "https://github.com/lab-emi/ChipJev/blob/6389189d8cc40393eca97e8776638aaba5038b95/THIRD_PARTY_NOTICES.md"
  - id: "project-license"
    title: "Project license"
    url: "https://github.com/lab-emi/ChipJev/blob/6389189d8cc40393eca97e8776638aaba5038b95/LICENSE"
  - id: "activity"
    title: "Reviewed substantive first-parent implementation update"
    url: "https://github.com/lab-emi/ChipJev/commit/6389189d8cc40393eca97e8776638aaba5038b95"
---

## Implementation and Scope

Typed model decisions select a prior over a finite topology grammar; GPU Bayesian search sizes candidates; ngspice supplies electrical acceptance. A separate model-guided Magic layout loop ranks physical actions using measured feedback. The reviewed implementation is described in the [README](#source-readme) and [Typed decisions](#source-typed-decisions), [Layout decisions](#source-layout-decisions), [Physical boundaries](#source-physical-boundaries).

It adds a concrete alternative to token-by-token netlist generation: constrained decisions plus numerical search. Public topology, simulator, model-decision and layout code supports a catalog entry; the repository is not just a paper or results archive.

## Evidence and operating boundaries

SKY130 layout and PTM 45 nm schematic studies have separate boundaries. Layout demonstrations are development examples; the flash ADC encoder is behavioral. Reported speed/quality ratios are author results under specific budgets and hardware, not independently reproduced findings. The surrogate helps candidate selection and does not by itself make Simulation an AI stage.

Apache-2.0 project code, with separate MIT notices for derived model layers and separate checkpoint/model terms. Python 3.13, numerical/model packages, ngspice and the selected model/PDK are required; physical work adds Magic and SKY130. PDK-dependent integration tests can be skipped when the environment is absent. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is 6389189d8cc40393eca97e8776638aaba5038b95 (2026-10-01 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-activity) supports the meaningful date; the latest head is separately retained for activity ordering.
