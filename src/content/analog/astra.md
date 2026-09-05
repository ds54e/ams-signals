---
name: "ASTRA"
roles: ["agent"]
summary: "Reasoning-guided initialization and Bayesian transistor sizing."
description: "Combines retrieved analog design knowledge and gm/ID lookup tables with LLM-selected transistor priorities to initialize sizing and focus Bayesian optimization on a two-stage OTA."
keywords: ["gm/ID","Knowledge retrieval","Bayesian sizing","OTA"]
workflow: {"reasoning":"core","generate-edit":"supporting","simulate-measure":"supporting","optimize":"core"}
access: "Python, LLM access, a knowledge database, gm/ID tables and a configured ngspice/KATO simulation environment."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "ASTRA: Automatic Sizing of Transistors with Reasoning Agents"
    url: "https://doi.org/10.1109/ICCAD66269.2025.11240675"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/IceLab-X/ASTRA"
    purpose: "code"
  - id: "readme-en-md"
    title: "Author setup and architecture"
    url: "https://github.com/IceLab-X/ASTRA/blob/dfcaf188bd1b013d392dff693af06a65fe53fa71/README_en.md"
  - id: "focalopt-optimization-core-py"
    title: "Bayesian optimization implementation"
    url: "https://github.com/IceLab-X/ASTRA/blob/dfcaf188bd1b013d392dff693af06a65fe53fa71/FocalOpt/optimization_core.py"
  - id: "examples-simulation-ota-two-py"
    title: "Two-stage OTA simulation adapter"
    url: "https://github.com/IceLab-X/ASTRA/blob/dfcaf188bd1b013d392dff693af06a65fe53fa71/examples/simulation_OTA_two.py"
---

### Scope

The author repository implements RAG-assisted initialization, transistor-priority selection and staged Bayesian optimization. The public configuration focuses on a two-stage OTA; the paper's three-circuit evaluation is a reported result, not three fully packaged examples. [Architecture](#source-readme-en-md) · [Optimizer](#source-focalopt-optimization-core-py) · [Paper](#source-paper)

### Release boundary

The simulation adapter contains real ngspice calls but imports the external KATO/lyngspice environment and references local netlists and lookup tables. Those dependencies are not all in the captured tree. Simulation is supporting scope for this partial integration; optimization and reasoning are central implemented algorithms. No EDA-session or physical-design mark follows from the MCP interface alone. [Simulation adapter](#source-examples-simulation-ota-two-py)
