---
name: "Vyges Power"
aliases: ["vyges-power","gate-level power analysis"]
description: "Gate-level power estimation using structural Verilog, Liberty cell data, optional SPEF wire capacitance and VCD, SAIF or FST switching activity. It reports leakage, internal and net-switching power by instance or group, with VCD time-window analysis and current/activity maps for downstream physical power-grid analysis."
scope:
  layout: { ai: false }
access: "Apache-2.0 Rust source; requires suitable gate netlists, characterized libraries and activity or explicit fallback assumptions. Physical estimates also require appropriate parasitic data."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/vyges-tools/power"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/vyges-tools/power/commit/3953953c3b9a19c90486b0c271b5acdd025a3f3a"
  - id: earlier
    title: "August workload-window power and peak-window integration"
    url: "https://github.com/vyges-tools/power/commit/0f1db6bc260b12e310a778e23cb2b386b1e098ba"
  - id: engine
    title: "Retained activity annotation, analysis and window sweep"
    url: "https://github.com/vyges-tools/power/blob/db61c9ef346f129a914931baa26d85850598a81b/src/engine.rs"
  - id: power-model
    title: "Retained per-instance power and current-map model"
    url: "https://github.com/vyges-tools/power/blob/db61c9ef346f129a914931baa26d85850598a81b/src/power.rs"
---

## Scope and limits

The tool performs backend digital power analysis using characterized standard cells and net activity, with optional physical wire capacitance. Layout refers to this analysis of implemented netlists and parasitics, not placement or routing. It complements the separate Vyges EM-IR solver by generating per-instance average-current and switching-rate inputs. The tool does not solve analog block currents, infer transistor-level noise or implement general glitch power. Representative internal switching energy and uniform fallback activity are explicit approximations. [Analysis engine](#source-engine) · [Power model](#source-power-model).

## Reviewed maintenance

August 2026 implements windowed VCD activity sweeps and peak-window power-map export. October changes the engine's activity annotation path to use port and instance-pin mappings, retained through the ByPins wrapper in the reviewed revision. Later dependency and release changes do not by themselves advance the meaningful checkpoint. Use matching netlist hierarchy and inspect annotation coverage before interpreting the results. No accuracy comparison was independently run. [Window integration](#source-earlier) · [Annotation change](#source-activity).
