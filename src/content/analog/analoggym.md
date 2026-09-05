---
name: "AnalogGym"
aliases: ["Analog Gym"]
summary: "Provides circuit netlists, tunable variables, and simulation benches for evaluating analog sizing and optimization methods."
description: "Provides analog sizing environments and ngspice testbenches for amplifiers and LDOs, including SKY130 circuits, PVT evaluation and reinforcement-learning examples."
flow: {"design":"core","simulation":"core"}
targets: "Sensing front ends, voltage references, amplifiers, LDOs, and PLLs"
access: "A 30-topology suite and optimization examples are public. The README explicitly identifies amplifiers and LDOs as supporting ngspice and Sky130; simulator and model setup is required."
notice: "PLL inclusion does not establish identical open execution support for all 30 circuits."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "site"
    title: "Official documentation"
    url: "https://coda-team.github.io/AnalogGym/"
    purpose: "official"
  - id: "paper"
    title: "AnalogGym paper"
    url: "https://arxiv.org/abs/2409.08534"
    purpose: "paper"
  - id: "code"
    title: "Public repository"
    url: "https://github.com/CODA-Team/AnalogGym"
    purpose: "code"
  - id: "review"
    title: "Reviewed README: supported circuits, extraction, and FoM correction"
    url: "https://github.com/CODA-Team/AnalogGym/blob/0a9d1390ade361e2b4a2d33181e22367edbb8afc/README.md"
---
### Execution and evaluation

Optimizers change separate design-variable files and run the associated testbench. Public amplifier and LDO examples include performance extraction and reinforcement-learning workflows. This is not itself a test of generating circuits from prose. [Workflow](#source-review)

### Version conditions

PVT examples set process, supply, and temperature. Slew and settling metrics need transient-response processing; LDO extraction distinguishes light and heavy loads. The README recommends ngspice 42 or later because of problems in some DC sweeps and corrects an amplifier FoM penalty formula. Comparisons should match the simulator, extraction code, and metric revision. Suite membership alone establishes neither Monte Carlo nor layout coverage. [Extraction and correction](#source-review)

### Flow scope

Transistor sizing and electrical evaluation through ngspice form the benchmark environment and optimization loop. Simulator use is an explicit execution contract, not just dataset preparation. [Reviewed source](#source-review).
