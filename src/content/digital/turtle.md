---
name: "TuRTLe"
aliases: []
description: "LLM RTL-generation benchmark framework covering specification-to-RTL, module completion and line completion. It combines API or local inference with simulation, equivalence, synthesis and physical-design PPA evaluation, including the NotSoTiny collection derived from real Tiny Tapeout designs."
scope:
  design:
    ai: true
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
access: "Public framework with API or local-model inference. Evaluation needs its documented EDA/container environment; local inference may require GPU or cluster resources."
addedAt: "2026-10-01"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical TuRTLe repository"
    url: "https://github.com/HPAI-BSC/TuRTLe"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/HPAI-BSC/TuRTLe/blob/6a32467e79d7a6cfbf3a6c579c24f20662475101/README.md"
  - id: "implementation"
    title: "Reviewed implementation"
    url: "https://github.com/HPAI-BSC/TuRTLe/blob/6a32467e79d7a6cfbf3a6c579c24f20662475101/turtle/src/turtle.py"
  - id: "activity"
    title: "Integrate NotSoTiny module-completion evaluation"
    url: "https://github.com/HPAI-BSC/TuRTLe/commit/3f4d7fc179ea0ef73acf055ca7872539bbc9dba3"
  - id: "paper"
    title: "TuRTLe evaluation paper"
    url: "https://arxiv.org/abs/2504.01986"
    purpose: "paper"
  - id: "results"
    title: "TuRTLe leaderboard"
    url: "https://huggingface.co/spaces/HPAI-BSC/TuRTLe-Leaderboard"
    purpose: "results"
---

### Evaluation surface

TuRTLe integrates VerilogEval, RTLLM, VGen, RTL-Repo and NotSoTiny task families. API-based and local-model inference feed the same evaluation framework; previously generated artifacts can also be evaluated without new inference. The February 2026 integration adds NotSoTiny module completion derived from more than 1,000 Tiny Tapeout designs. [Reviewed README](#source-readme); [Runner](#source-implementation); [Integration](#source-activity).

### Scope classification

The evaluated model generates or completes RTL, establishing AI Design under the benchmark task rule. Icarus/Verilator syntax and functionality checks and Yosys equivalence establish conventional Verification. Yosys synthesis and LibreLane/OpenROAD PPA evaluation establish conventional Synthesis and Layout. The physical tools measure generated candidates; the reviewed evidence does not establish model-authored placement/routing decisions or AI verification generation. [Reviewed README](#source-readme).

### Activity and results boundary

The July head updates the README and citation; meaningful implementation evidence is the February NotSoTiny integration. The leaderboard and publication are project-reported evaluations, not reproduced results from this review. [Integration](#source-activity); [Results](#source-results); [Paper](#source-paper).
