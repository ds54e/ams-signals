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
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited implementation added hierarchical wired-Xschem schematic generation and physical-layout/post-extraction support for SAR, flash and sampler circuit families. The current source retains the schematic geometry/connectivity layer."
  sources: ["development-audit-implementation", "development-audit-extension", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "Apache-2.0 project code, with separate MIT notices for derived model layers and separate checkpoint/model terms. Python 3.13, numerical/model packages, ngspice and the selected model/PDK are required; physical work adds Magic and SKY130. PDK-dependent integration tests can be skipped when the environment is absent."
addedAt: "2026-10-11"
reviewedAt: '2026-10-23'
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
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/lab-emi/ChipJev/commit/3eccd4f142d55f84785b62e8a8ba8fa9c34db8f4"
  - id: "development-audit-extension"
    title: "Reviewed coordinated implementation extension"
    url: "https://github.com/lab-emi/ChipJev/commit/3b50dfe4184f4db9f4f4ddeeeb51436b3b25e070"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/lab-emi/ChipJev/blob/6389189d8cc40393eca97e8776638aaba5038b95/src/chipjev/schematic/sheet.py"
  - id: website
    title: Official project website and documentation
    url: https://chipjev.com/
    purpose: official
---

## Implementation and Scope

Typed model decisions select a prior over a finite topology grammar; GPU Bayesian search sizes candidates; ngspice supplies electrical acceptance. A separate model-guided Magic layout loop ranks physical actions using measured feedback. The reviewed implementation is described in the [README](#source-readme) and [Typed decisions](#source-typed-decisions), [Layout decisions](#source-layout-decisions), [Physical boundaries](#source-physical-boundaries).

It adds a concrete alternative to token-by-token netlist generation: constrained decisions plus numerical search. Public topology, simulator, model-decision and layout code supports a catalog entry; the repository is not just a paper or results archive.

## Evidence and operating boundaries

SKY130 layout and PTM 45 nm schematic studies have separate boundaries. Layout demonstrations are development examples; the flash ADC encoder is behavioral. Reported speed/quality ratios are author results under specific budgets and hardware, not independently reproduced findings. The surrogate helps candidate selection and does not by itself make Simulation an AI stage.

Apache-2.0 project code, with separate MIT notices for derived model layers and separate checkpoint/model terms. Python 3.13, numerical/model packages, ngspice and the selected model/PDK are required; physical work adds Magic and SKY130. PDK-dependent integration tests can be skipped when the environment is absent. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is 6389189d8cc40393eca97e8776638aaba5038b95 (2026-10-01 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-activity) supports the meaningful date; the latest head is separately retained for activity ordering.

### Development provenance

The attributed changes introduce netlist parsing, hierarchy checking, symbols, wired sheets and circuit-specific drawing templates, plus executable family layout/bench integration. These establish substantial implementation contributions beyond demonstration captions or generated circuit examples. [Implementation](#source-development-audit-implementation) · [Implementation](#source-development-audit-extension) · [Retained code](#source-development-audit-retained)
