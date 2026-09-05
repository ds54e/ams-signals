---
name: "AnalogSAGE"
summary: "Analog design agents with simulation-grounded memory."
description: "Coordinates topology exploration, transistor sizing and reflection for SKY130 op-amps, combining retrieved circuit knowledge with ngspice feedback and memory of earlier design attempts."
flow: {"design":"core","simulation":"supporting"}
access: "Python, LLM access, knowledge/topology databases, SKY130 and a configured ngspice simulation workspace."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "AnalogSAGE: Self-evolving Analog Design Multi-Agents with Stratified Memory and Grounded Experience"
    url: "https://arxiv.org/abs/2512.22435"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/wznmickey/AnalogSAGE"
    purpose: "code"
  - id: "paper-repository"
    title: "Paper-linked lab fork and upstream identity"
    url: "https://github.com/xz-group/AnalogSAGE"
  - id: "tolology-py"
    title: "Topology exploration and memory loop"
    url: "https://github.com/wznmickey/AnalogSAGE/blob/dc6dd652efeff9918497d4b19f18ceda8cf08b5d/tolology.py"
  - id: "sizing-py"
    title: "LLM-guided sizing-range loop"
    url: "https://github.com/wznmickey/AnalogSAGE/blob/dc6dd652efeff9918497d4b19f18ceda8cf08b5d/sizing.py"
  - id: "bo-py"
    title: "Bayesian sizing and ngspice calls"
    url: "https://github.com/wznmickey/AnalogSAGE/blob/dc6dd652efeff9918497d4b19f18ceda8cf08b5d/BO.py"
---

### Repository identity

The paper links the lab's `xz-group/AnalogSAGE`, which GitHub identifies as a fork of the author's `wznmickey/AnalogSAGE`. The latter is the original public repository and contains the newer May 2026 implementation changes. Only that upstream default branch supplies activity; the fork is not counted. [Paper](#source-paper) · [Lab fork](#source-paper-repository) · [Author implementation](#source-code)

### Scope and release

Topology proposals, reflection/memory and numerical sizing are implemented in public Python files. `BO.py` writes parameter files, invokes ngspice and scores measured specifications. The surrounding research scripts retain local task/database paths and a `simulation` adapter import not shipped as that module. Simulation receives a supporting mark for this integration boundary; the ten-task paper results are not independently reproduced or a turnkey-release claim. [Topology loop](#source-tolology-py) · [Sizing loop](#source-sizing-py) · [Numerical backend](#source-bo-py)

### Flow scope

Topology selection, sizing and accumulated design knowledge drive the agent. Simulation feedback supports that process, while the released integration still depends on an external evaluation adapter. [Reviewed source](#source-tolology-py).
