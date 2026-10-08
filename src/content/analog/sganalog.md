---
name: "SGAnalog"
summary: "Evaluates AI schematic transcription and fixed-topology device sizing using commit-pinned Tiny Tapeout circuits."
description: "Benchmark built from commit-pinned, human-designed Tiny Tapeout circuits. Evaluates AI schematic-to-SPICE transcription with device–net graph matching and fixed-topology sizing with ngspice against human-reference performance; public code includes circuit data, evaluation scripts and a pinned open-PDK environment."
scope:
  design:
    ai: true
  simulation:
    ai: false
targets: "Analog and mixed-signal schematic transcription, transistor sizing, and human-reference circuit evaluation"
access: "Benchmark code and redistributed circuit data are Apache-2.0, with per-repository attribution. Simulation uses Docker and a digest-pinned IIC-OSIC-TOOLS image with ngspice and open PDKs; new model evaluations require provider access."
notice: "Model scores are author-reported. Tapeout provenance does not establish measured-silicon performance, and the sizing score includes convergence-only tasks."
addedAt: "2026-10-08"
reviewedAt: "2026-10-08"
sources:
  - id: "code"
    title: "Public SGAnalog implementation and circuit data"
    url: "https://github.com/Li-Yueting/SGAnalog"
    purpose: "code"
  - id: "paper"
    title: "SGAnalog: An End-to-End Circuit Benchmark from Open-Source Silicon Tapeouts"
    url: "https://arxiv.org/abs/2610.03934"
    purpose: "paper"
  - id: "review"
    title: "Reviewed task contracts, reported results, and limitations"
    url: "https://github.com/Li-Yueting/SGAnalog/blob/ebd7e694b79cbe8475c42bd41cf4620c5d537a0f/README.md"
  - id: "transcription"
    title: "Implemented model evaluation harness"
    url: "https://github.com/Li-Yueting/SGAnalog/blob/ebd7e694b79cbe8475c42bd41cf4620c5d537a0f/eval.py"
  - id: "comparator"
    title: "Device–net graph comparator and structural self-tests"
    url: "https://github.com/Li-Yueting/SGAnalog/blob/ebd7e694b79cbe8475c42bd41cf4620c5d537a0f/scripts/vlm_compare.py"
  - id: "sizing"
    title: "Implemented topology stripping, sizing, simulation, and scoring harness"
    url: "https://github.com/Li-Yueting/SGAnalog/blob/ebd7e694b79cbe8475c42bd41cf4620c5d537a0f/scripts/sizing_eval.py"
  - id: "environment"
    title: "Digest-pinned simulation environment"
    url: "https://github.com/Li-Yueting/SGAnalog/blob/ebd7e694b79cbe8475c42bd41cf4620c5d537a0f/env/Dockerfile"
  - id: "activity"
    title: "Initial public benchmark implementation and dataset"
    url: "https://github.com/Li-Yueting/SGAnalog/commit/ebd7e694b79cbe8475c42bd41cf4620c5d537a0f"
---
### Dataset and implementation

The released collection contains 933 circuits from 125 contributing repositories, including 273 topologically distinct top-level designs after graph deduplication. Sources are pinned to the revisions recorded for Tiny Tapeout shuttle submissions. Schematic images and SPICE netlists are exported from the same source files, while author testbenches provide the sizing evaluation context. [Reviewed release](#source-review) · [Paper](#source-paper)

The public repository includes an executable model harness, a structural comparator, a sizing/simulation/scoring script and a digest-pinned environment. These implemented paths establish a benchmark contribution beyond a paper or circuit dataset alone. [Transcription harness](#source-transcription) · [Comparator](#source-comparator) · [Sizing harness](#source-sizing) · [Environment](#source-environment)

### Evaluation and limits

Transcription compares generated SPICE with reference device–net graphs rather than literal netlist text. Net names and equivalent MOS drain/source assignments need not match the reference spelling or ordering. The reported baseline uses 66 tasks; it evaluates schematic interpretation separately from sizing. [Comparator](#source-comparator) · [Reviewed results](#source-review)

The sizing harness removes device dimensions from a reference topology, requests replacement values, patches the circuit and runs ngspice with the author's analyses. The released 17-task baseline compares circuit metrics with the human reference. Seven tasks score convergence alone; therefore its aggregate score is not a general specification-closure or sizing-success rate. The README's task table still marks broader device sizing as gated on per-class measurements despite the implemented baseline harness and results. [Sizing harness](#source-sizing) · [Task status and results](#source-review)

The authors report a best aggregate sizing score of 91.2/100, falling to 73.6 when proposals flagged as full reference copies are scored zero. Commit dates and pre/post-training-cutoff comparisons support exposure analysis but do not prove an absence of training-data contamination. These are author-reported experiments; no model run or EDA evaluation was independently reproduced for the catalog. [Reported diagnostics](#source-review)

The full collection is larger than either evaluation subset, and many harvested testbenches do not execute successfully. Circuit provenance identifies shuttle-submitted designs; it does not guarantee measured-silicon behavior for every extracted circuit. Evaluation is primarily at schematic level. Topology generation is a roadmap item, not a released free-topology design benchmark. [Known limitations and roadmap](#source-review) · [Paper](#source-paper)

### Scope classification

The benchmark explicitly evaluates AI models performing schematic-to-netlist transcription and device sizing, supporting AI Design. This label describes the evaluated model's circuit operation, not AI inside the structural grader. [Task contract](#source-review) · [Implemented sizing](#source-sizing)

The ngspice harness and open-PDK environment supply conventional electrical evaluation, supporting Simulation. AI-generated sizes alone do not establish AI Simulation, and tapeout-derived data do not establish a released layout-generation workflow. [Sizing harness](#source-sizing) · [Environment](#source-environment)
