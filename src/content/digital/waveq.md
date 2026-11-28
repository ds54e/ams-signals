---
name: "WaveQ"
aliases: ["waveq"]
description: "Local Python CLI and MCP waveform-query engine with SQLite indexes, selective signal/time windows, cycle-based conditions, bounded offline property checks, histograms and first-divergence comparisons. A bundled agent skill guides targeted debugging; VCD/EVCD are native, while FST and several other formats require conversion tools."
scope:
  verification: { ai: true }
access: "AGPL-3.0-or-later; Python 3.10+ and SQLite. Optional format conversions need the documented GTKWave utilities."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical WaveQ source"
    url: "https://github.com/IshaanDugar/waveq"
    purpose: code
  - id: readme
    title: "Waveform formats, queries, cache and interpretation boundaries"
    url: "https://github.com/IshaanDugar/waveq/blob/eeb88e9045244e4816d18b0aa3d4ca1688baf0a1/README.md"
  - id: activity
    title: "November 24 property checking, coverage and windowed-index integration"
    url: "https://github.com/IshaanDugar/waveq/commit/eeb88e9045244e4816d18b0aa3d4ca1688baf0a1"
  - id: earlier
    title: "November 13 two-waveform first-divergence implementation"
    url: "https://github.com/IshaanDugar/waveq/commit/8e64234fc9d2c15da122b86af281872035309924"
  - id: engine
    title: "Retained cycle queries and offline property engine"
    url: "https://github.com/IshaanDugar/waveq/blob/eeb88e9045244e4816d18b0aa3d4ca1688baf0a1/waveq/engine.py"
  - id: conditions
    title: "Condition operands, comparison and unknown-value semantics"
    url: "https://github.com/IshaanDugar/waveq/blob/eeb88e9045244e4816d18b0aa3d4ca1688baf0a1/waveq/conditions.py"
  - id: scenarios
    title: "Executable generated waveform scenarios with expected results"
    url: "https://github.com/IshaanDugar/waveq/blob/eeb88e9045244e4816d18b0aa3d4ca1688baf0a1/tests/test_scenarios.py"
  - id: skill
    title: "Bundled waveform-debug decision and evidence workflow"
    url: "https://github.com/IshaanDugar/waveq/blob/eeb88e9045244e4816d18b0aa3d4ca1688baf0a1/skills/waveq/SKILL.md"
---

### Implementation and selection

The SQLite cache can retain selected signals and a time interval, supports clock-indexed signal predicates, and evaluates a limited implication/delay or stability contract against stored samples. The property engine distinguishes unresolved windows from completed checks. The November 13 run comparison and November 24 signal-condition/property/coverage work add a reusable operation beyond individual value extraction or a generic MCP adapter. This provides a distinct bounded trace-check workflow alongside wavepeek, wave-mcp and wavetools. [Engine](#source-engine) · [Conditions](#source-conditions) · [Scenario tests](#source-scenarios) · [Earlier implementation](#source-earlier).

### Scope and limits

The bundled agent skill directs the model to select indexing bounds, resolve names, define sampling clocks, choose failure-window and property queries, and interpret missing or ambiguous results. This supports AI Verification in that agent-hosted workflow, not an AI property evaluator. The numerical query engine is conventional. The limited offline property semantics do not implement full SVA, formal proof or complete protocol checking; unknown-value comparisons follow the documented engine convention rather than SystemVerilog expression semantics. Unrecorded signals and events cannot be recovered. Upstream tests were inspected, not executed. [Skill](#source-skill) · [Overview](#source-readme) · [Activity](#source-activity).
