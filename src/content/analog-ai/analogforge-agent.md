---
name: "AnalogForge Agent"
aliases: ["AnalogForge","analog-forge-agent"]
roles: ["agent"]
summary: "An experimental workbench for template-based circuit proposals and multi-objective search, with analytic fixtures as its default execution path."
description: "Explores template-based proposals for OTAs, comparators, LDOs, references, and oscillators using analytic-fixture search. A separate native-simulation command checks netlists and PDK receipts before running a candidate."
keywords: ["Templates", "Multi-objective", "Analytic default", "Experimental"]
workflow:
  reasoning: supporting
  generate-edit: supporting
  simulate-measure: supporting
  optimize: supporting
targets: "Template families for OTAs, comparators, LDOs, references, and oscillators"
access: "Code, contracts, templates, and research documentation are public. Native execution requires ngspice/Xyce, pre-rendered netlists, immutable PDK receipts, and model dependency manifests."
notice: "Dashboard points are synthetic and native PDK mappings remain unpinned. Published thresholds are targets, not achieved results."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/appleweiping/analog-forge-agent"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: implementation, targets, and research status"
    url: "https://github.com/appleweiping/analog-forge-agent/blob/70d98cfabb883156588c3302c1aeb56c547e3979/README.md"
  - id: "limits"
    title: "Limitations and non-claims: models, statistics, and layout"
    url: "https://github.com/appleweiping/analog-forge-agent/blob/70d98cfabb883156588c3302c1aeb56c547e3979/docs/limitations.md"
---
### Implemented and experimental paths

Default runs use analytic-fixture-v1. Native simulation is a separate explicit command with netlist and PDK-receipt checks. All 45 mappings across SKY130, GF180MCU, and IHP SG13G2 remain unpinned; no transistor-level benchmark results are claimed. qNEHVI and LLM+BO implementations are CI proxies, not publication baselines. [Implementation status](#source-review)

### Planned evaluation

The 27-corner PVT, 100-sample Monte Carlo, and optional folded-cascode layout study are evaluation contracts, not released results. [Evaluation plan](#source-review)

Fifteen topology templates do not cover arbitrary analog design. Open simulation does not establish silicon performance, and an open layout check is not foundry signoff. [Limitations](#source-limits)

### Landscape scope

All marks are constrained: proposal/diagnosis contracts and topology templates support the workbench; native simulation is separately invoked, and default search uses analytic fixtures with proxy methods. Planned PVT, Monte Carlo, and layout studies do not establish additional implemented scope. [Status](#source-review) · [Limits](#source-limits)
