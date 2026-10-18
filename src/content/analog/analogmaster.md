---
name: "AnalogMaster"
summary: "Public placement and routing utilities from a broader analog image-to-layout research framework."
description: "Provides analog device-placement optimization and A* routing utilities, with SPICE connectivity parsing and placement-to-routing conversion. The accompanying paper describes LLM-driven circuit-image reconstruction and transistor sizing, but the released code chiefly covers the physical stage and does not establish a runnable end-to-end AI design or simulation flow."
scope:
  layout:
    ai: false
targets: "Transistor-level analog placement and routing from circuit connectivity and device-location inputs."
access: "MIT-licensed public code and data plus the paper; the repository states that its released code and data remain under progressive refinement."
addedAt: "2026-09-18"
reviewedAt: "2026-10-18"
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
  - id: "placement-code"
    title: "Published simulated-annealing placement implementation"
    url: "https://github.com/sjjjoaps/AnalogMaster/blob/092b3b6dd0e90c36cfcd07f5c93f9a4a2d98d2cd/src/SA.py"
  - id: "routing-code"
    title: "Published connectivity-to-routing conversion implementation"
    url: "https://github.com/sjjjoaps/AnalogMaster/blob/092b3b6dd0e90c36cfcd07f5c93f9a4a2d98d2cd/src/complete_converter.py"
  - id: "physical-release"
    title: "Public placement and routing implementation release"
    url: "https://github.com/sjjjoaps/AnalogMaster/commit/5c6cb29468b672a2476438084a127f434cce6d18"
---

### Framework boundary

The paper describes an LLM-centered path from circuit-image understanding through reconstruction and transistor sizing to layout. The released source contains device-model/data collateral and conventional placement and routing modules, but does not expose a comparable runnable implementation for the paper's image-to-netlist and model-driven sizing stages. Its README states that the code and data remain under refinement. [Paper](#source-paper) · [Repository notice](#source-readme) · [Placement source](#source-placement-code)

### Public physical flow

The released physical code parses circuit connectivity and placement data, converts nets to routing-grid input, executes A* routing and checks generated routing artifacts. Simulated annealing supplies a placement optimizer. These deterministic physical algorithms do not establish full DRC/LVS/PEX signoff or complete parity with the paper's broader flow. [Placement source](#source-placement-code) · [Routing source](#source-routing-code)

### Scope classification

The public implementation currently supports a conventional Layout stage through simulated-annealing placement and A* routing. An AI Design stage or electrical Simulation stage cannot be assigned solely from the accompanying paper without a supporting public implementation. These exclusions do not deny the paper's reported results; they distinguish the published code from the described research system. [Public code](#source-code) · [Paper](#source-paper)

The meaningful activity date follows the June 22 physical-code release, not the later circuit-image dataset upload. The selected release is present in the captured first-parent chain. [Physical implementation release](#source-physical-release)
