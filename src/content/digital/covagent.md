---
name: CovAgent
aliases: ["Spec2Cov"]
description: "Generates SystemVerilog testbenches from design specifications and revises them using simulator coverage feedback. The workflow runs Verilator or Questa, reports uncovered behavior and records agent turns and token use for coverage-closure analysis. Coverage improvement does not establish formal correctness."
scope:
  verification:
    ai: true
access: "Public Python implementation and experiment inputs. Requires a supported model provider and Verilator or licensed Questa for the selected workflows."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: code
    title: Canonical public CovAgent implementation
    url: https://github.com/advent-lab/CovAgent
    purpose: code
  - id: readme
    title: Reviewed workflow and explicit Spec2Cov predecessor
    url: https://github.com/advent-lab/CovAgent/blob/2f6a93189d04ca5d59957fa7be89722aaf39c5af/README.md
  - id: implementation
    title: Integrated simulation and feedback tools
    url: https://github.com/advent-lab/CovAgent/blob/2f6a93189d04ca5d59957fa7be89722aaf39c5af/src/tools/simulation.py
  - id: functional-coverage
    title: Integrated functional-coverage models and testbenches
    url: https://github.com/advent-lab/CovAgent/commit/5e00aad80d210d2cedf40fc0e0d099fde7d6f520
  - id: activity
    title: Executable coverage and agent-log analysis scripts
    url: https://github.com/advent-lab/CovAgent/commit/16a43fa58069e0bf9b609fa027269b619f16f9db
---

### Implemented workflow and scope

The model authors and revises stimulus using simulation and coverage feedback. The simulator and coverage tooling provide the underlying evidence; an uncovered region classified in an agent report is not independently proven unreachable. This supports AI Verification, not DUT design or formal proof. [Workflow](#source-readme) · [Simulation tools](#source-implementation)

### Selection and migration

The maintainer identifies Spec2Cov as the predecessor. This single entry uses CovAgent's canonical default branch without copying or summing the predecessor's activity. The integrated April implementation adds functional-coverage examples; July adds executable log, coverage and token analysis. Development on other branches is not attributed to the default branch. [Project lineage](#source-readme) · [April implementation](#source-functional-coverage) · [July analysis](#source-activity)
