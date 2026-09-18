---
name: "AnalogMaster"
summary: "LLM-assisted analog flow from circuit images through netlist reconstruction and sizing to placement and routing."
description: "Paper-described framework that converts circuit images into structured analog designs, refines device parameters, and continues into physical implementation. The public repository supplies circuit-image data, SKY130 model collateral, placement logic and A* routing code; its README explicitly says code and data are still being progressively refined."
scope:
  design:
    ai: true
  layout:
    ai: false
targets: "Analog IC circuits reconstructed from circuit images and carried toward physical layout."
access: "MIT-licensed public code and data plus the paper; the repository states that its released code and data remain under progressive refinement."
addedAt: "2026-09-18"
reviewedAt: "2026-09-18"
sources:
  - id: "code"
    title: "Canonical AnalogMaster repository"
    url: "https://github.com/sjjjoaps/AnalogMaster"
    purpose: "code"
  - id: "paper"
    title: "AnalogMaster: A Large Language Model-Based Framework for Automated Analog IC Design from Circuit Images to Layout"
    url: "https://arxiv.org/abs/2604.20916"
    purpose: "paper"
  - id: "journal"
    title: "Expert Systems with Applications journal version"
    url: "https://www.sciencedirect.com/science/article/pii/S0957417426030927"
  - id: "readme"
    title: "README at the reviewed repository revision"
    url: "https://github.com/sjjjoaps/AnalogMaster/blob/092b3b6dd0e90c36cfcd07f5c93f9a4a2d98d2cd/readme.md"
  - id: "activity"
    title: "Latest reviewed dataset update"
    url: "https://github.com/sjjjoaps/AnalogMaster/commit/092b3b6dd0e90c36cfcd07f5c93f9a4a2d98d2cd"
---

### Framework boundary

The paper describes an LLM-centered path from circuit-image understanding through circuit reconstruction and parameter decisions toward layout. The checked-in repository exposes data, device-model collateral, simulated-annealing placement and A* routing utilities, but its README says the released code and data remain under refinement. [Paper](#source-paper) · [Repository notice](#source-readme)

### Public physical flow

The released physical code parses circuit connectivity and placement data, converts nets to routing-grid input, executes A* routing and checks generated routing artifacts. These deterministic physical algorithms support the reported end-to-end direction without establishing full DRC/LVS/PEX signoff or complete parity with every stage described in the paper. [Public code](#source-code)

### Scope classification

The paper assigns LLMs to circuit interpretation and design decisions, giving AI Design. The reviewed public placement/routing implementation is conventional, so Layout is present without an AI prefix. Simulation is not assigned merely because SPICE-format models and netlists are present. [Reviewed sources](#source-paper)
