---
name: "LOADBench"
roles: ["benchmark","dataset-environment"]
summary: "Open op-amp data and metrics for analog machine learning."
description: "Provides 101 SKY130 op-amp topologies, ngspice testbenches and sizing/performance data, with evaluation scripts for topology generation and selection, inverse sizing and multi-objective optimization."
flow: {"design":"core","simulation":"supporting"}
access: "Public Zenodo data, Python metric scripts and SKY130/ngspice; the complete simulation archives are large."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "dataset"
    title: "LOADBench Dataset: released archives and simulation instructions"
    url: "https://zenodo.org/records/21759759"
    purpose: "official"
  - id: "paper"
    title: "LOADBench: official author-institution paper record and abstract"
    url: "https://www.it.pt/Publications/PaperConference/42000"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/FilipeAz/LOADBench-Scripts"
    purpose: "code"
  - id: "circuit-generation-coverage-py"
    title: "Generated-topology coverage evaluation"
    url: "https://github.com/FilipeAz/LOADBench-Scripts/blob/03cc45620afbbbee19652d83d625f26f3368d951/circuit_generation_coverage.py"
  - id: "inverse-sizing-py"
    title: "Inverse-sizing performance metrics"
    url: "https://github.com/FilipeAz/LOADBench-Scripts/blob/03cc45620afbbbee19652d83d625f26f3368d951/inverse_sizing.py"
  - id: "optimization-helper-py"
    title: "Pareto hypervolume evaluation"
    url: "https://github.com/FilipeAz/LOADBench-Scripts/blob/03cc45620afbbbee19652d83d625f26f3368d951/optimization_helper.py"
---

### Scope

The author-institution paper record defines six tasks: inverse sizing, topology selection, subcircuit classification, structural generation, Pareto-membership prediction and multi-objective optimization. The Zenodo release contains 31 one-stage, 44 two-stage, 18 three-stage and 8 symmetrical op-amps, totaling 101. It explicitly links the selected GitHub metric implementation. The Paper link is the institutional abstract record, not an independently retrieved full manuscript. [Paper record](#source-paper) · [Dataset](#source-dataset)

### Classification

Generation and optimization denote benchmark task scope, not an included generative model. Simulation is supporting on the dataset/evaluation side: inverse-sizing metrics consume performance CSVs after simulation, and the data release supplies ngspice testbenches. Structural matching and electrical measurements are separate metrics. Classification tasks do not by themselves establish an explicit LLM reasoning trace. Dataset sizes and results are publisher-reported; the catalog inspected the small testbench archive, not the multi-gigabyte simulation archives. [Generation metric](#source-circuit-generation-coverage-py) · [Inverse sizing](#source-inverse-sizing-py) · [Optimization](#source-optimization-helper-py)

### Flow scope

Topology generation/selection, inverse sizing and optimization are benchmark tasks. Simulation-generated performance data and evaluation scripts support them; the dataset does not imply a simulator is available to every model. [Reviewed source](#source-circuit-generation-coverage-py).
