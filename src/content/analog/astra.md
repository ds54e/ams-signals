---
name: "ASTRA"
summary: "Reasoning-guided initialization and Bayesian transistor sizing."
description: "Research implementation of LLM-guided gm/ID initialization and staged Bayesian transistor sizing. The optimizer and two-stage OTA simulation adapter are public, but the released MCP server needs an import repair and separately supplied KATO, netlist and lookup-table dependencies before the documented flow can run."
scope:
  design:
    ai: true
  simulation:
    ai: false
access: "Python, LLM access, a knowledge database, gm/ID tables and a configured ngspice/KATO simulation environment."
addedAt: "2026-09-05"
reviewedAt: "2026-10-18"
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
  - id: "meaningful-implementation"
    title: "Reviewed substantive implementation or technical maintenance"
    url: "https://github.com/IceLab-X/ASTRA/commit/cf1f3361d6286a6ba5c771fc6f2ae65d55c696e8"
  - id: "server-path"
    title: "Released MCP server and unresolved optimizer import"
    url: "https://github.com/IceLab-X/ASTRA/blob/63dd09abd42d77852394e71317004577007995a7/astra_mcp_server.py"
---

### Scope

The author repository implements RAG-assisted initialization, transistor-priority selection and staged Bayesian optimization. The public configuration focuses on a two-stage OTA; the paper's three-circuit evaluation is a reported result, not three fully packaged examples. [Architecture](#source-readme-en-md) · [Optimizer](#source-focalopt-optimization-core-py) · [Paper](#source-paper)

### Release boundary

The current server imports `FocalOpt.focal_opt_logic`, while the released implementation is `FocalOpt/focal_opt_main.py`. This is an unresolved execution blocker in the advertised server path, rather than an ordinary installation step. The independently inspectable optimizer remains useful research code; no end-to-end reproduction is claimed. [Server import](#source-server-path)


The simulation adapter contains real ngspice calls but imports the external KATO/lyngspice environment and references local netlists and lookup tables. Those dependencies are not all in the captured tree. Simulation is retained for the implemented execution/measurement loop, with the external environment configured separately. Optimization and reasoning are implemented design algorithms. No EDA-session or physical-design mark follows from the MCP interface alone. [Simulation adapter](#source-examples-simulation-ota-two-py)

### Scope classification

Design-knowledge retrieval, gm/ID initialization and Bayesian transistor sizing are central. The integrated simulator executes candidates and returns electrical measurements. [Reviewed source](#source-readme-en-md).

LLM reasoning, retrieved gm/ID knowledge and search prioritization materially choose transistor-sizing decisions. The external simulator interface remains conventional Simulation. [AI/stage evidence](#source-readme-en-md).
