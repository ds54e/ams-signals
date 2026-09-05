---
name: "ZeroSim"
roles: ["eda-tool","dataset-environment"]
summary: "A transformer surrogate for analog performance prediction."
description: "Predicts amplifier performance from circuit topology and device parameters using a transformer surrogate, with training and evaluation for transfer to previously unseen topologies."
flow: {"simulation":"core"}
access: "Python/PyTorch, training data and model weights; ngspice is used by the separate dataset-generation scripts."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "ZeroSim: Zero-Shot Analog Circuit Evaluation with Unified Transformer Embeddings"
    url: "https://doi.org/10.1109/ICCAD66269.2025.11240890"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/xz-group/ZeroSim"
    purpose: "code"
  - id: "dataset"
    title: "Author-linked amplifier dataset"
    url: "https://huggingface.co/datasets/Xun49/Amplifer60"
    purpose: "official"
  - id: "model-circuitformer-py"
    title: "Topology and parameter prediction model"
    url: "https://github.com/xz-group/ZeroSim/blob/9af8a6976cf1aae9788eedcd882b7cc201ee95ef/model/circuitformer.py"
  - id: "test-py"
    title: "Performance prediction evaluation"
    url: "https://github.com/xz-group/ZeroSim/blob/9af8a6976cf1aae9788eedcd882b7cc201ee95ef/test.py"
  - id: "circuit-ga-amp-py"
    title: "Simulation-backed amplifier data generation"
    url: "https://github.com/xz-group/ZeroSim/blob/9af8a6976cf1aae9788eedcd882b7cc201ee95ef/circuit_ga/AMP.py"
---

### Scope

The model takes encoded circuit nodes and device parameters and regresses performance metrics. The test script compares predictions with held-out simulation data using mean squared error and per-metric percentage error. Separate scripts generate amplifier training data. [Model](#source-model-circuitformer-py) · [Evaluation](#source-test-py) · [Dataset](#source-dataset)

### Classification

Learned performance estimation is core Simulation under the Flow definition, while inference itself is not a SPICE solver. The paper's cross-topology accuracy and acceleration are reported research results. There is no circuit-generation, optimizer, EDA-control or layout mark merely because a surrogate could be used downstream. [Paper](#source-paper) · [Data-generation implementation](#source-circuit-ga-amp-py)

### Flow scope

Learned electrical-performance estimation is the project's central deliverable and is explicitly part of this Flow stage. It is a surrogate, not a replacement SPICE execution engine; training-data simulation is distinct from inference. [Reviewed source](#source-model-circuitformer-py).
