---
name: "G-DiffPS"
summary: "Graph-conditioned RF phase-shifter synthesis."
description: "Selects among six RF phase-shifter topologies and predicts component values with a graph-conditioned flow policy. Analytic circuit priors and ngspice evaluations guide training and candidate checking against phase, loss and matching targets; deployed predictions depend on the trained policy and covered specification range."
scope:
  design:
    ai: true
  simulation:
    ai: false
access: "Python/PyTorch, ngspice and released policy checkpoints; optional LLM netlist paths require separate model access."
addedAt: "2026-09-05"
reviewedAt: "2026-11-24"
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
  - id: "meaningful-implementation"
    title: "Reviewed substantive implementation or technical maintenance"
    url: "https://github.com/ACADLab/G-DiffPS/commit/496fb22a85000a2cbf30ecc8a6326021596ed576"
  - id: review-20261103-development
    title: Development-branch correction to training-bound inference
    url: https://github.com/ACADLab/G-DiffPS/commit/36fc6111563b37062a33da187fe98a8a16606198
  - id: development-branch
    title: Separate September development work on the SKY130 harness
    url: https://github.com/ACADLab/G-DiffPS/commit/bab150c9dcc93cc3010324e656310890355b8a7b
  - id: unmerged-backup
    title: Separate November working-tree backup
    url: https://github.com/ACADLab/G-DiffPS/commit/47ee13d5dbfbf3eef48f8237455bac6b65925a08
---

### Scope

The release contains graph encoders, a conditional flow-matching policy, learned topology scoring, six netlist templates and ngspice evaluation. Component synthesis and topology selection target RF phase shifters; this is a different use case from op-amp sizing. Design covers the explicit topology-selection and parameter-generation task; the choices remain constrained to the evaluated templates. Physical layout is not implied by RF transmission-line parameters. [Framework](#source-framework-md) · [Selector](#source-inference-topology-select-py) · [Environment](#source-env-phaseshifter-env-py)

### Release boundary

The latest public commit deliberately removes the manuscript PDF/TeX and several paper tables, while retaining executable source, checkpoints and one GNN ablation table. The Results link points only to that retained table; README links to deleted files are not exposed. The official conference program corroborates the paper identity. Published model/simulation results were not reproduced. [Retained results](#source-results-paper-tables-appc-gnn-fix-csv) · [Conference](#source-conference)

### Scope classification

Selecting RF phase-shifter topology and component values is coupled to an explicit ngspice reward/evaluation path. Graph coordinates do not constitute physical layout. [Reviewed source](#source-framework-md).

The trained graph-conditioned policy selects RF topology and continuous component values, so Design is AI. ngspice performance/reward calculation remains conventional Simulation. [AI/stage evidence](#source-framework-md).

### Retention and branch boundary

The default branch remains a curated August research release. Its separate dev/nuerips_workshop branch contains subsequent executable circuit-encoder, coordinate, area-reward and inference-bound corrections; the reviewed training-bound repair is dated September 13, 2026. Those inspected development changes support retention under the same selection rule used for new projects; they are not promoted into default-branch monthly counts or claimed as released capabilities. The September 15 branch tip changes IDE/commit-policy files. A separate November 20 working-tree backup is also unmerged; neither that backup date nor the later review date establishes a newer released implementation. The existing description and Scope remain on their integrated evidence. [Development implementation](#source-review-20261103-development) · [Separate backup](#source-unmerged-backup).

The September SKY130 harness and input changes supply an additional example of executable work on that development line. [SKY130 harness](#source-development-branch).
