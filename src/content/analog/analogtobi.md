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
reviewedAt: "2026-11-24"
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
---

### Generation and structural checks

The trained language model generates device-net bipartite graphs with grammar constraints. Connectivity/ERC and novelty checks assess the resulting topology; their scores remain separate from electrical-performance success. These learned generation operations support AI Design. [Generator](#source-gpt-inference-grammar-py) · [Connectivity checks](#source-erc-py) · [Novelty](#source-metric-novelty-py).

### Released electrical evaluation

The current SPICE_translation flow supplies category-specific testbenches and a shared Spectre runner. The reviewed amplifier implementation writes operating-point and AC decks and extracts gain, bandwidth, gain-bandwidth and power from simulator results. This independently executable conventional evaluation path adds Simulation; it does not establish that all generated circuits meet specifications or that sizing is part of the learned generation loop. [Amplifier evaluation](#source-simulation-opamp) · [Runner and model dependencies](#source-simulation-runner).

The runner expects configured Spectre, a Cadence license server and GPDK045 models. Review covered the public implementation and source history; licensed simulations and reported model performance were not independently reproduced. [Implementation activity](#source-meaningful-implementation).
