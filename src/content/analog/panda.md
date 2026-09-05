---
name: "PANDA"
summary: "A staged design-intent-to-layout analog flow."
description: "Turns design intent into topology and sizing artifacts, then coordinates Virtuoso/Spectre execution, placement, routing and post-layout feedback through a staged analog design flow."
scope:
  design:
    level: core
    ai: true
  simulation:
    level: core
    ai: false
  layout:
    level: core
    ai: false
access: "Configured Cadence/Virtuoso/Spectre host, PDK/PCells and placement/routing/verification backends; public code uses a noncommercial license."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "PANDA: An LLM-Enhanced Performance-Driven Analog Design Framework Bridging Design Intent and Layout Generation"
    url: "https://arxiv.org/abs/2606.15052"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/PKU-IDEA/PANDA"
    purpose: "code"
  - id: "analogxpert-topology-templates-py"
    title: "Constrained topology generation"
    url: "https://github.com/PKU-IDEA/PANDA/blob/9e53e43c0d29bdc8c0f326640b9d66c7075e841b/analogxpert/topology_templates.py"
  - id: "docs-paper-gap-analysis-md"
    title: "Public implementation and external backend contracts"
    url: "https://github.com/PKU-IDEA/PANDA/blob/9e53e43c0d29bdc8c0f326640b9d66c7075e841b/docs/paper_gap_analysis.md"
  - id: "docs-panda-real-chain-repro-md"
    title: "Author-reported comparator and OTA runs"
    url: "https://github.com/PKU-IDEA/PANDA/blob/9e53e43c0d29bdc8c0f326640b9d66c7075e841b/docs/panda_real_chain_repro.md"
    purpose: "results"
  - id: "sizing-spectre-backend-py"
    title: "Spectre sizing backend"
    url: "https://github.com/PKU-IDEA/PANDA/blob/9e53e43c0d29bdc8c0f326640b9d66c7075e841b/sizing/spectre_backend.py"
  - id: "place-py"
    title: "Placement orchestration"
    url: "https://github.com/PKU-IDEA/PANDA/blob/9e53e43c0d29bdc8c0f326640b9d66c7075e841b/place.py"
---

### Scope

The author-linked repository implements stage contracts, constrained topology generation, sizing artifacts, true-PCell export and placement/routing orchestration. It exposes LVS, PEX and post-layout simulation adapters. Layout refers to the implemented physical flow and documented runs, not a claim of universal signoff. The generic sizing flow can delegate to an external optimization backend. [Paper](#source-paper) · [Templates](#source-analogxpert-topology-templates-py) · [Backends](#source-docs-paper-gap-analysis-md) · [Placement](#source-place-py)

### Reported results

The authors document a StrongARM comparator and a three-stage OTA. The OTA post-PEX measurements use a layout-matched netlist; exact LVS against the original topology still has a PCell property-expression mismatch. A zero wrapper exit code alone does not establish clean DRC. These are source-reported runs, not catalog reproductions. The public release is source-available under a noncommercial license. [Run report](#source-docs-panda-real-chain-repro-md) · [Simulator backend](#source-sizing-spectre-backend-py)

### Scope classification

Topology construction, simulator-backed sizing, placement/routing and post-layout checks are explicit workflow deliverables. Their inclusion describes scope, not independently reproduced signoff or automatic success on every example. [Reviewed source](#source-analogxpert-topology-templates-py).

LLM-guided topology generation establishes AI Design. The reviewed sizing/Spectre adapters and constraint-driven placement/routing kernels provide conventional Simulation and Layout; a common agent/Skill boundary alone does not make those stages AI. [Agent workflow](#source-paper) · [Backend boundaries](#source-docs-paper-gap-analysis-md).
