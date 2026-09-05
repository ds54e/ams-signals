---
name: "AnalogForge Agent"
aliases: ["AnalogForge","analog-forge-agent"]
roles: ["agent"]
summary: "A research workbench connecting circuit specifications, topology templates, PDK mappings, and multi-objective search. It separates LLM proposals from evidence-based evaluation, but its default workflow currently uses an analytic fixture."
targets: "Template families for OTAs, comparators, LDOs, references, and oscillators"
access: "Code, contracts, templates, and research documentation are public. Native execution requires ngspice/Xyce, pre-rendered netlists, immutable PDK receipts, and model dependency manifests."
notice: "Thresholds are preregistered targets, not achieved results. Dashboard points are synthetic, all 45 PDK mappings are UNPINNED, and transistor-level benchmark, PVT, Monte Carlo, and DRC/LVS/PEX results are not claimed."
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

Default runs use analytic-fixture-v1. Native simulation is a separate explicit command with netlist and PDK-receipt checks. SKY130, GF180MCU, and IHP SG13G2 mappings are defined but not pinned. qNEHVI and LLM+BO implementations are CI proxies, not publication baselines. [Implementation status](#source-review)

### Planned evaluation

The 27-corner PVT, 100-sample Monte Carlo, and optional folded-cascode layout study are evaluation contracts, not released results. [Evaluation plan](#source-review)

Fifteen topology templates do not cover arbitrary analog design. Open simulation does not establish silicon performance, and an open layout check is not foundry signoff. [Limitations](#source-limits)
