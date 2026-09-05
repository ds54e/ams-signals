---
name: "AnalogToBi"
roles: ["eda-tool"]
summary: "Circuit-type-conditioned generation of device-net graphs."
description: "Generates transistor-level circuit connectivity from circuit-type tokens using device-net bipartite graphs and grammar-constrained decoding, with structural validity and novelty checks."
keywords: ["Topology generation","Bipartite graphs","Grammar decoding","ERC"]
workflow: {"generate-edit":"core"}
access: "Python/PyTorch, the released topology data and trained generator/classifier weights."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
    url: "https://github.com/Seungmin0825/AnalogToBi/blob/e2033e9e5347dd0b702d24a8809de0c0f5470f87/GPT_Inference_Grammar.py"
  - id: "erc-py"
    title: "Electrical-rule connectivity checks"
    url: "https://github.com/Seungmin0825/AnalogToBi/blob/e2033e9e5347dd0b702d24a8809de0c0f5470f87/ERC.py"
  - id: "metric-novelty-py"
    title: "Topology novelty evaluation"
    url: "https://github.com/Seungmin0825/AnalogToBi/blob/e2033e9e5347dd0b702d24a8809de0c0f5470f87/METRIC_Novelty.py"
---

### Scope

The authors' repository releases generator training, grammar-masked inference, circuit-type classification and graph metrics. Decoding alternates devices and nets while enforcing pin-use and connectivity constraints. The paper explicitly identifies this repository. [Generation](#source-gpt-inference-grammar-py) · [Paper](#source-paper)

### Evaluation boundary

ERC and novelty checks assess generated graph structure. They do not measure gain, bandwidth or power. The paper also discusses selected SPICE case studies, but the captured generation path does not expose simulation or numerical sizing in its loop, so those columns remain blank. Reported validity/novelty rates are not electrical-performance success rates. [ERC](#source-erc-py) · [Novelty](#source-metric-novelty-py)
