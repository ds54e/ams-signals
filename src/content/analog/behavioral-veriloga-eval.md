---
name: "vaBench"
aliases: ["behavioral-veriloga-eval","Behavioral Verilog-A benchmark"]
summary: "Behavioral Verilog-A model, repair and testbench tasks."
description: "Benchmarks behavioral Verilog-A model generation, bug repair and testbench writing across 400 circuit families and 1,200 tasks. A task-isolated Bash/EVAS runtime lets agents exercise visible tests, with a matched no-EVAS mode for comparing tool access."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer merged an explicitly autonomous Codex implementation campaign that added bridge preflight, dual-simulator execution and EVAS evaluation runners. These runners remain part of vaBench."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-09-07"
access: "Public task bundles and Python/Docker tooling; the r53 runtime pins EVAS 0.8.7. Model access is supplied separately."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval"
    purpose: "code"
  - id: "benchmark-vabench-release-v4-release-benchmarkv4-r53-manifest-json"
    title: "Current r53 release manifest"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval/blob/7b5616dc52195ec275ec6d21c71d7763613702cd/benchmark-vabench-release-v4/release/benchmarkv4-r53/MANIFEST.json"
  - id: "benchmark-vabench-release-v4-public-agent-runtime-readme-md"
    title: "Agent-accessible EVAS runtime"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval/blob/7b5616dc52195ec275ec6d21c71d7763613702cd/benchmark-vabench-release-v4/public-agent-runtime/README.md"
  - id: "benchmark-vabench-release-v4-release-benchmarkv4-r53-tasks-002-capacitive-sar-feedback-dac-public-contract-json"
    title: "Representative capacitive SAR DAC task"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval/blob/7b5616dc52195ec275ec6d21c71d7763613702cd/benchmark-vabench-release-v4/release/benchmarkv4-r53/tasks/002-capacitive-sar-feedback-dac/public_contract.json"
  - id: "benchmark-vabench-release-v4-r53-release-certification-md"
    title: "r53 runtime and certification scope"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval/blob/7b5616dc52195ec275ec6d21c71d7763613702cd/benchmark-vabench-release-v4/R53_RELEASE_CERTIFICATION.md"
  - id: "docs-data-site-summary-json"
    title: "Legacy 300-row public dashboard data"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval/blob/7b5616dc52195ec275ec6d21c71d7763613702cd/docs/data/site_summary.json"
  - id: "development-1"
    title: "Codex implementation campaign"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval/commit/4e6c221177912b140075eb6bdfa24188a848f6b7"
  - id: "development-2"
    title: "Current implementation"
    url: "https://github.com/Arcadia-1/behavioral-veriloga-eval/blob/7b5616dc52195ec275ec6d21c71d7763613702cd/runners/run_gold_dual_suite.py"
---

### Current tasks

The captured v4/r53 manifest and task index contain 400 families in three forms: DUT generation, bugfix and testbench construction, 1,200 tasks total. Examples include capacitive SAR feedback DACs, comparators, pipeline ADC stages, filters and clock/control logic. These are behavioral model and verification artifacts, not transistor-level sizing. [Manifest](#source-benchmark-vabench-release-v4-release-benchmarkv4-r53-manifest-json) · [SAR DAC contract](#source-benchmark-vabench-release-v4-release-benchmarkv4-r53-tasks-002-capacitive-sar-feedback-dac-public-contract-json)

### Simulation and release surfaces

The public runtime gives an agent Bash and EVAS for visible tests; a matched no-EVAS arm also exists. Simulation is therefore a user-facing tool-track operation, not merely an evaluator-only assumption. EVAS is a separately maintained simulator/package and receives its own catalog entry. [Runtime](#source-benchmark-vabench-release-v4-public-agent-runtime-readme-md)

The root README and legacy dashboard describe older releases; the dashboard's 300 rows must not replace r53's task counts. r53 reuses source-bound certification and does not claim a fresh full-suite simulation or Spectre gate. No current r53 model leaderboard was verified, so the catalog does not expose legacy dashboard data as current Results. [Release note](#source-benchmark-vabench-release-v4-r53-release-certification-md) · [Legacy dashboard](#source-docs-data-site-summary-json)

### Scope classification

Behavioral Verilog-A generation/repair and simulator-based evaluation define the benchmark. EVAS availability is track-specific; evaluator simulation does not make every model track tool-enabled. [Reviewed source](#source-benchmark-vabench-release-v4-public-agent-runtime-readme-md).

The released runtime supplies Bash/EVAS to an externally supplied agent, alongside deterministic task and scoring contracts. A container that can host a model is not itself an implemented AI stage; behavioral generation/repair tasks and simulation remain unprefixed. [AI/stage evidence](#source-benchmark-vabench-release-v4-public-agent-runtime-readme-md).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The explicitly autonomous Codex branch supplies substantive runner software: bridge preflight, paired execution and EVAS evaluation, with retained integration. Generated benchmark inputs are excluded from the qualifying contribution. [Codex implementation campaign](#source-development-1); [Current implementation](#source-development-2).
