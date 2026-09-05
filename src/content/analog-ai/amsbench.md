---
name: "AMSbench"
aliases: ["AMS Bench"]
roles: ["benchmark","dataset-environment"]
summary: "Evaluates schematic perception, circuit analysis, and circuit or testbench generation as separate tasks. Alongside visual and textual QA, design evaluation includes simulation checks rather than a single answer-accuracy metric."
targets: "Component and connectivity recognition, circuit functions and trade-offs, circuit generation"
access: "Paper, Hugging Face data, and model/evaluation scripts are public. Design code uses PySpice and requires model endpoints."
notice: "Design scripts require task and prompt files that are not bundled in the code repository."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "site"
    title: "Official project page"
    url: "https://amsbench.github.io/"
    purpose: "official"
  - id: "paper"
    title: "Paper v1: task evaluation and planned extensions"
    url: "https://arxiv.org/html/2505.24138v1"
    purpose: "paper"
  - id: "code"
    title: "Author-released evaluation and design scripts"
    url: "https://github.com/Why0912/AMSBench"
    purpose: "code"
  - id: "data"
    title: "Author-released dataset"
    url: "https://huggingface.co/datasets/wwhhyy/AMSBench"
  - id: "design"
    title: "Circuit generation script at the reviewed revision"
    url: "https://github.com/Why0912/AMSBench/blob/4f9867ca03fcf67f548ae7c1bdab0cd2cc11742f/CKT_design.py"
---
### Evaluation

Perception covers components, connections, and netlist extraction. Analysis covers functions, subcircuits, reasoning, and performance trade-offs. Design checks generated circuits with simulation; testbench evaluation distinguishes executable syntax from correct measurements. [Paper](#source-paper)

Evaluator-side simulation should be distinguished from tools made available to the model. Reported experiments are not interchangeable with unrestricted tool-using agent runs. The paper defines pass@k as the fraction of k generated answers passing simulation, which differs from other benchmarks using that name. [Metric definition](#source-paper)

### Public artifacts and planned work

The released generation script refers to a task table and prompt files absent from the code repository. Those inputs must be arranged separately. [Dataset](#source-data) · [Implementation](#source-design)

The paper describes sizing, layout, and interpreting simulation statistics and plots as future extensions. These are not included as implemented evaluation capabilities here. [Future work](#source-paper)
