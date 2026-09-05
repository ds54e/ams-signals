---
name: "AMS-IO-Agent"
aliases: ["AMS-IO-Bench"]
summary: "Structured-intent generation of AMS I/O rings."
description: "Converts pin plans and design intent into AMS I/O-ring schematics and layouts, using structured intent graphs, Virtuoso SKILL generation and Calibre DRC/LVS checks; includes the companion AMS-IO-Bench cases."
flow: {"design":"core","layout":"core"}
access: "Configured Virtuoso/Calibre environment and matching foundry I/O libraries; the public repository is not an unrestricted open-source PDK release."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "AMS-IO-Bench and AMS-IO-Agent: Benchmarking and Structured Reasoning for Analog and Mixed-Signal Integrated Circuit Input/Output Design"
    url: "https://arxiv.org/abs/2512.21613"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/Arcadia-1/AMS-IO-Agent"
    purpose: "code"
  - id: "benchmark"
    title: "Author-maintained companion AMS-IO-Bench"
    url: "https://github.com/Arcadia-1/AMS-IO-Bench"
  - id: "src-app-layout-t28-layout-generator-py"
    title: "28nm I/O-ring layout generation"
    url: "https://github.com/Arcadia-1/AMS-IO-Agent/blob/046a2e3edccd76322ab3e47c4dd9a5a1eded1e8a/src/app/layout/T28/layout_generator.py"
  - id: "src-app-schematic-schematic-generator-t28-py"
    title: "28nm schematic generation"
    url: "https://github.com/Arcadia-1/AMS-IO-Agent/blob/046a2e3edccd76322ab3e47c4dd9a5a1eded1e8a/src/app/schematic/schematic_generator_T28.py"
  - id: "src-tools-drc-runner-tool-py"
    title: "Agent-accessible Calibre DRC"
    url: "https://github.com/Arcadia-1/AMS-IO-Agent/blob/046a2e3edccd76322ab3e47c4dd9a5a1eded1e8a/src/tools/drc_runner_tool.py"
  - id: "src-tools-lvs-runner-tool-py"
    title: "Agent-accessible Calibre LVS"
    url: "https://github.com/Arcadia-1/AMS-IO-Agent/blob/046a2e3edccd76322ab3e47c4dd9a5a1eded1e8a/src/tools/lvs_runner_tool.py"
---

### Scope and inventory

The paper explicitly identifies both repositories. The agent and companion cases form one design/evaluation project, with activity measured only in the agent repository. The paper evaluates 30 cases; the current benchmark release contains 60 pin-plan files, 30 each for 28nm and 180nm. Intent graphs drive pad placement, domain isolation, fillers, schematic generation and Calibre verification. [Paper](#source-paper) · [Benchmark](#source-benchmark) · [Layout](#source-src-app-layout-t28-layout-generator-py) · [Schematic](#source-src-app-schematic-schematic-generator-t28-py)

### Physical evidence

The paper reports a fabricated 28nm mixed-signal prototype with 48 pads: humans designed the AMS core and the agent generated the I/O ring. It reports silicon functionality, not autonomous whole-chip design. The released DRC/LVS wrappers support physical verification but require licensed tools, libraries and decks. Layout is core; DRC/LVS is not electrical simulation or performance optimization. [DRC](#source-src-tools-drc-runner-tool-py) · [LVS](#source-src-tools-lvs-runner-tool-py) · [Reported case study](#source-paper)

### Flow scope

Pin-plan interpretation, I/O schematic generation and pad-ring layout with physical checks are central deliverables. Electrical simulation is not established as a separate reviewed operation. [Reviewed source](#source-src-app-layout-t28-layout-generator-py).
