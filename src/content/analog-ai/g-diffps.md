---
name: "G-DiffPS"
roles: ["eda-tool"]
summary: "Graph-conditioned RF phase-shifter synthesis."
description: "Selects among six RF phase-shifter topologies and predicts component values with a graph-conditioned flow policy, using analytic circuit priors and ngspice feedback to meet phase, loss and matching targets."
keywords: ["RF phase shifters","Flow matching","Graph conditioning","ngspice"]
workflow: {"generate-edit":"supporting","simulate-measure":"core","optimize":"core"}
access: "Python/PyTorch, ngspice and released policy checkpoints; optional LLM netlist paths require separate model access."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/ACADLab/G-DiffPS"
    purpose: "code"
  - id: "framework-md"
    title: "Author framework and training description"
    url: "https://github.com/ACADLab/G-DiffPS/blob/18837578cffac275f2a86ddeed69254f231b9c73/FRAMEWORK.md"
  - id: "inference-topology-select-py"
    title: "Six-topology selection implementation"
    url: "https://github.com/ACADLab/G-DiffPS/blob/18837578cffac275f2a86ddeed69254f231b9c73/inference_topology_select.py"
  - id: "env-phaseshifter-env-py"
    title: "Multi-state simulation environment"
    url: "https://github.com/ACADLab/G-DiffPS/blob/18837578cffac275f2a86ddeed69254f231b9c73/env/phaseshifter_env.py"
  - id: "results-paper-tables-appc-gnn-fix-csv"
    title: "Retained GNN ablation result table"
    url: "https://github.com/ACADLab/G-DiffPS/blob/18837578cffac275f2a86ddeed69254f231b9c73/results/paper_tables/AppC_gnn_fix.csv"
    purpose: "results"
  - id: "conference"
    title: "Official MLCAD 2026 program identifying G-DiffPS and authors"
    url: "https://mlcad.org/symposium/2026/program/"
---

### Scope

The release contains graph encoders, a conditional flow-matching policy, learned topology scoring, six netlist templates and ngspice evaluation. Component synthesis and topology selection target RF phase shifters; this is a different use case from op-amp sizing. Generation/editing is supporting because the evaluated topology choices and parameterization are constrained. Physical layout is not implied by RF transmission-line parameters. [Framework](#source-framework-md) · [Selector](#source-inference-topology-select-py) · [Environment](#source-env-phaseshifter-env-py)

### Release boundary

The latest public commit deliberately removes the manuscript PDF/TeX and several paper tables, while retaining executable source, checkpoints and one GNN ablation table. The Results link points only to that retained table; README links to deleted files are not exposed. The official conference program corroborates the paper identity. Published model/simulation results were not reproduced. [Retained results](#source-results-paper-tables-appc-gnn-fix-csv) · [Conference](#source-conference)
