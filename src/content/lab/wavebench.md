---
name: "WaveBench"
aliases: ["Python measurement bench"]
description: "Python toolkit for auditable instrument measurements using explicit run plans, capability-aware control and capture packages. It supports offline plan checks, measurement execution, saved-waveform processing recipes and reports; physical instrument coverage depends on the installed drivers and plugins."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "MIT; requires supported VISA interfaces or installed instrument plugins for physical operation."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/Scaxlibur/WaveBench"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Scaxlibur/WaveBench/commit/7677f886e748e6acdb254d069a837e578596d482"
  - id: sweep-session
    title: "July source sweep session correction and tests"
    url: "https://github.com/Scaxlibur/WaveBench/commit/6a18ff59ff1921b96535a4a3faf372f837aadf24"
  - id: signal-pipeline
    title: "September signal-processing pipeline integration"
    url: "https://github.com/Scaxlibur/WaveBench/commit/2499c16e2971f49fa0dcfd5d3a76fbe53443b8a7"
  - id: run-plan
    title: "Retained run-plan schema and capture operations"
    url: "https://github.com/Scaxlibur/WaveBench/blob/7677f886e748e6acdb254d069a837e578596d482/src/wavebench/services/run_plan.py"
  - id: offline-analysis
    title: "Retained saved-capture recipe execution"
    url: "https://github.com/Scaxlibur/WaveBench/blob/7677f886e748e6acdb254d069a837e578596d482/src/wavebench/services/analysis_service.py"
  - id: advisor-boundary
    title: "Advisor run evidence binding without advisor execution"
    url: "https://github.com/Scaxlibur/WaveBench/blob/7677f886e748e6acdb254d069a837e578596d482/src/wavebench/services/advisor_run_binding.py"
---

## Scope and limits

Explicit run plans coordinate supported instruments and produce capture packages and reports. The separate offline analysis service loads a saved waveform and executes recipe-defined operations without opening a physical instrument. This is distinct from a driver-only toolkit or a live waveform viewer. The advisor binding code prepares and revalidates evidence snapshots, but does not itself execute an advisor; no model-driven stage is established by that component. [Run-plan operations](#source-run-plan) · [Offline analysis](#source-offline-analysis) · [Advisor boundary](#source-advisor-boundary).

Plan validation does not establish wiring, electrical safety, synchronized acquisition or calibrated results. Check the instrument plugin, resource limits and physical conditions.

## Reviewed maintenance

July 2026 binds manual source sweep authorization to a persistent instrument session, with regression tests. September integrates signal-processing pipelines and verified source restoration. October integrates scope observation contract corrections and plugin installation lifecycle changes in the 0.8.28 release merge. [Session correction](#source-sweep-session) · [Pipeline integration](#source-signal-pipeline) · [October release integration](#source-activity).
