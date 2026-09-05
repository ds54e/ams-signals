---
name: "ARCS"
roles: ["eda-tool"]
summary: "Joint circuit-topology and component-value generation."
description: "Generates circuit connectivity and component values from target specifications, then uses ngspice evaluation and simulation-reward training to improve candidates across power-converter, amplifier and filter families."
flow: {"design":"core","simulation":"core"}
access: "Python/PyTorch and ngspice; generation and training depend on the selected released model and dataset configuration."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/tusharpathaknyu/ARCS"
    purpose: "code"
  - id: "paper-arcs-paper-tex"
    title: "Author manuscript in LaTeX"
    url: "https://github.com/tusharpathaknyu/ARCS/blob/b14a1f2afcced3d3a339ecb4d0927be4305c426d/paper/arcs_paper.tex"
  - id: "src-arcs-model-py"
    title: "Autoregressive model implementation"
    url: "https://github.com/tusharpathaknyu/ARCS/blob/b14a1f2afcced3d3a339ecb4d0927be4305c426d/src/arcs/model.py"
  - id: "src-arcs-simulate-py"
    title: "Decoded circuit evaluation and rewards"
    url: "https://github.com/tusharpathaknyu/ARCS/blob/b14a1f2afcced3d3a339ecb4d0927be4305c426d/src/arcs/simulate.py"
  - id: "src-arcs-spice-py"
    title: "ngspice runner"
    url: "https://github.com/tusharpathaknyu/ARCS/blob/b14a1f2afcced3d3a339ecb4d0927be4305c426d/src/arcs/spice.py"
  - id: "src-arcs-templates-py"
    title: "Circuit families and netlist templates"
    url: "https://github.com/tusharpathaknyu/ARCS/blob/b14a1f2afcced3d3a339ecb4d0927be4305c426d/src/arcs/templates.py"
  - id: "results-arch-multiseed-json"
    title: "Released multi-seed architecture evaluation"
    url: "https://github.com/tusharpathaknyu/ARCS/blob/b14a1f2afcced3d3a339ecb4d0927be4305c426d/results/arch_multiseed.json"
    purpose: "results"
---

### Scope

The current implementation is under `src/arcs`, alongside an older `circuitgenie` tree. It includes autoregressive topology/value models, SPICE conversion, simulation rewards and candidate search. Generation can encode connectivity, while electrical evaluation maps decoded circuits to supported circuit-family templates. This is not unrestricted transistor-level IC synthesis. [Model](#source-src-arcs-model-py) · [Templates](#source-src-arcs-templates-py) · [Evaluation](#source-src-arcs-simulate-py)

### Results

The repository contains a manuscript and recorded multi-seed comparisons. These are author-produced experiments; the catalog did not retrain models or reproduce the numbers. Generation, simulation and component optimization are core reviewed operations. No LLM reasoning or physical-layout mark is inferred from the generator. [Manuscript](#source-paper-arcs-paper-tex) · [Results](#source-results-arch-multiseed-json) · [Simulator](#source-src-arcs-spice-py)

### Flow scope

Learned topology/component-value generation and SPICE-based candidate evaluation are explicit parts of the released generation and ranking pipeline. [Reviewed source](#source-paper-arcs-paper-tex).
