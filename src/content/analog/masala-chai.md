---
name: "Masala-CHAI"
roles: ["agent","dataset-environment"]
summary: "Schematic-image reconstruction into SPICE netlists."
description: "Reconstructs SPICE netlists from schematic images using component detection and multimodal connectivity reasoning, with a V2 agent loop that revises candidates from judge feedback and optional ngspice simulation."
flow: {"design":"core","simulation":"supporting"}
access: "Python, object-detection weights and multimodal LLM access; install ngspice for actual simulation feedback."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "Masala-CHAI: A Large-Scale SPICE Netlist Dataset for Analog Circuits by Harnessing AI"
    url: "https://arxiv.org/abs/2411.14299"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/jitendra-bhandari/Masala-CHAI"
    purpose: "code"
  - id: "agents-v2-workflow-py"
    title: "V2 feedback and revision loop"
    url: "https://github.com/jitendra-bhandari/Masala-CHAI/blob/fc61c0404f45e5385bc0159d834544bb148643de/agents_v2/workflow.py"
  - id: "agents-v2-agents-netlist-agent-py"
    title: "SPICE generation and optional ngspice execution"
    url: "https://github.com/jitendra-bhandari/Masala-CHAI/blob/fc61c0404f45e5385bc0159d834544bb148643de/agents_v2/agents/netlist_agent.py"
  - id: "readme-md"
    title: "V2 release and dataset availability"
    url: "https://github.com/jitendra-bhandari/Masala-CHAI/blob/fc61c0404f45e5385bc0159d834544bb148643de/README.md"
---

### Scope

The current V2 code corrects component detections, infers connectivity, generates netlists and revises them using judge feedback, including simulation logs when ngspice is installed. It emits netlists and structured processing records suitable for dataset construction. This is schematic reconstruction, distinct from EEschematic's reverse netlist-to-diagram direction. [Workflow](#source-agents-v2-workflow-py) · [Netlist agent](#source-agents-v2-agents-netlist-agent-py)

### Version and simulation boundaries

The paper's 7,500-schematic corpus and downstream model results predate V2; the current README still says the updated dataset will be available later. Do not claim that the complete refreshed corpus is downloadable. The V2 netlist runner marks a missing-ngspice path successful while logging that simulation was skipped. Simulation is consequently supporting/optional scope, and that status alone is not electrical verification. [Paper](#source-paper) · [Release state](#source-readme-md) · [Runner](#source-agents-v2-agents-netlist-agent-py)

### Flow scope

Schematic-image interpretation and SPICE reconstruction are central. Optional ngspice logs provide feedback to the V2 revision loop; a skipped simulator path is not a successful electrical check. [Reviewed source](#source-readme-md).
