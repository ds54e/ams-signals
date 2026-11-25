---
name: "AnalogToBi"
summary: "Circuit-type-conditioned generation of device-net graphs."
description: "Generates transistor-level circuit topologies from circuit-type tokens with a grammar-constrained language model. Device-net graphs undergo structural checks, while a separate released testbench flow converts supported categories to Spectre and measures electrical performance using configured models and simulator access."
scope:
  design:
    ai: true
  simulation:
    ai: false
access: "Python/PyTorch, released topology data and trained weights support generation. Electrical evaluation additionally requires Cadence Spectre, a license server and the configured GPDK045 model file."
addedAt: "2026-09-05"
reviewedAt: "2026-11-25"
sources:
  - id: "paper"
    title: "AnalogToBi: Device-Level Analog Circuit Topology Generation via Bipartite Graph and Grammar Guided Decoding"
    url: "https://arxiv.org/abs/2603.08720"
    purpose: "paper"
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/Seungmin0825/AnalogToBi"
    purpose: "code"
  - id: "gpt-inference-grammar-py"
    title: "Grammar-masked topology generation"
    url: "https://github.com/Seungmin0825/AnalogToBi/blob/89446afdcbe4c5601c83855b61e8bbfffebf81d7/GENERATE.py"
  - id: "erc-py"
    title: "Electrical-rule connectivity checks"
    url: "https://github.com/Seungmin0825/AnalogToBi/blob/89446afdcbe4c5601c83855b61e8bbfffebf81d7/CORE_ERC.py"
  - id: "metric-novelty-py"
    title: "Topology novelty evaluation"
    url: "https://github.com/Seungmin0825/AnalogToBi/blob/89446afdcbe4c5601c83855b61e8bbfffebf81d7/METRIC_Novelty.py"
  - id: "meaningful-implementation"
    title: "Reviewed substantive implementation or technical maintenance"
    url: "https://github.com/Seungmin0825/AnalogToBi/commit/7c7d89d8a4cf4c7aeae190b93b5bf6740df734be"
  - id: simulation-opamp
    title: "Released amplifier testbench and electrical measurements"
    url: https://github.com/Seungmin0825/AnalogToBi/blob/89446afdcbe4c5601c83855b61e8bbfffebf81d7/SPICE_translation/run_tb_opamp.py
  - id: simulation-runner
    title: "Spectre execution, model configuration and waveform parsing"
    url: https://github.com/Seungmin0825/AnalogToBi/blob/89446afdcbe4c5601c83855b61e8bbfffebf81d7/SPICE_translation/tb_common.py
  - id: camera-ready-code
    title: "October 27 research-code release"
    url: https://github.com/Seungmin0825/AnalogToBi/commit/19b42da3d31facc97e33e952768098288e98762d
  - id: classifier-update
    title: "November 7 camera-ready classifier and circuit-level split"
    url: https://github.com/Seungmin0825/AnalogToBi/commit/89446afdcbe4c5601c83855b61e8bbfffebf81d7
  - id: classifier-training
    title: "Retained GAT classifier training and class-weighted objective"
    url: https://github.com/Seungmin0825/AnalogToBi/blob/89446afdcbe4c5601c83855b61e8bbfffebf81d7/TRAIN_GAT.py
  - id: split-reconstruction
    title: "Retained reconstruction and SHA-256 checks of classifier input arrays"
    url: https://github.com/Seungmin0825/AnalogToBi/blob/89446afdcbe4c5601c83855b61e8bbfffebf81d7/UNPACK_DATASET.py
---

### Generation and structural checks

The trained language model generates device-net bipartite graphs with grammar constraints. Connectivity/ERC and novelty checks assess the resulting topology; their scores remain separate from electrical-performance success. These learned generation operations support AI Design. [Generator](#source-gpt-inference-grammar-py) · [Connectivity checks](#source-erc-py) · [Novelty](#source-metric-novelty-py).

### Released electrical evaluation

The current SPICE_translation flow supplies category-specific testbenches and a shared Spectre runner. The reviewed amplifier implementation writes operating-point and AC decks and extracts gain, bandwidth, gain-bandwidth and power from simulator results. This independently executable conventional evaluation path adds Simulation; it does not establish that all generated circuits meet specifications or that sizing is part of the learned generation loop. [Amplifier evaluation](#source-simulation-opamp) · [Runner and model dependencies](#source-simulation-runner).

The runner expects configured Spectre, a Cadence license server and GPDK045 models. Review covered the public implementation and source history; licensed simulations and reported model performance were not independently reproduced. [Implementation activity](#source-meaningful-implementation).

### Continued research implementation

Following the May preprocessing and evaluation changes, October 27 releases the camera-ready topology generation, metrics and SPICE evaluation code. November 7 replaces the GAT type classifier checkpoint and training recipe with a circuit-level train/validation split and inverse-frequency class weighting; the unpacker reconstructs the classifier arrays from stored row indices and verifies their SHA-256 hashes. This is substantive reproducibility and evaluation maintenance beyond the initial release. It does not independently establish absence of overlap with every external dataset or demonstrate electrical design closure. The reported type-classification result is not a simulator success rate and was not reproduced here. November 7 is the meaningful checkpoint within the saved main capture. [October release](#source-camera-ready-code) · [Classifier change](#source-classifier-update) · [Training](#source-classifier-training) · [Reconstruction](#source-split-reconstruction).
