---
name: "Analog Design Bench"
aliases: ["Analog Design Bench V2"]
summary: "Benchmarks agents that edit circuit files and iterate with simulation to meet analog and RF electrical specifications."
description: "Benchmarks long-horizon AI agents on 50 transistor-level analog, RF and mixed-signal design tasks. Public SKY130 task packages combine editable netlists and development benches with isolated, specification-based ngspice verifiers, including task-specific PVT sweeps and Monte Carlo checks."
scope:
  design:
    ai: true
  simulation:
    ai: false
targets: "References, LDOs, amplifiers, ADCs, DACs, oscillators, RF blocks and mixed-signal circuits"
access: "All 50 task directories, development benches, verifiers and environment definitions are public, with a Hugging Face dataset mirror. Tasks require ngspice, SKY130 models and the specified container environment; software is Apache-2.0 and benchmark content is CC BY-NC 4.0."
notice: "Paper and website results are author-reported. Public task availability does not establish independent reproduction of the reported agent evaluations."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "site"
    title: "Official V2 task count and author-reported results"
    url: "https://analog-design-bench.tokenzhang.com/"
    purpose: "official"
  - id: "code"
    title: "Public repository"
    url: "https://github.com/Arcadia-1/analog-design-bench"
    purpose: "code"
  - id: "tasks"
    title: "Public task tree at the reviewed revision"
    url: "https://github.com/Arcadia-1/analog-design-bench/tree/972f7cd7c95381134387b250edf18f3bd23bdd25/tasks"
  - id: "contract"
    title: "Bandgap task: deliverable, constraints, and timeout rules"
    url: "https://github.com/Arcadia-1/analog-design-bench/blob/972f7cd7c95381134387b250edf18f3bd23bdd25/tasks/sky130-bandgap-reference-pvt/instruction.md"
  - id: "manifest"
    title: "Frozen V2 manifest listing 50 tasks"
    url: "https://github.com/Arcadia-1/analog-design-bench/blob/972f7cd7c95381134387b250edf18f3bd23bdd25/tasks/benchmark.toml"
  - id: "release"
    title: "Current release, dataset mirror and usage terms"
    url: "https://github.com/Arcadia-1/analog-design-bench/blob/972f7cd7c95381134387b250edf18f3bd23bdd25/README.md"
  - id: "paper"
    title: "Long-Horizon Analog Design Bench"
    url: "https://arxiv.org/abs/2609.33356"
    purpose: "paper"
  - id: "activity-refresh"
    title: "Correct the published telescopic OTA reference power specification"
    url: "https://github.com/Arcadia-1/analog-design-bench/commit/9a3113c3a94b4212e4dcc62b001b8f6c141c833e"
---
### Task contract

Agents edit the declared DUT and use supplied development benches. Model libraries and evaluation fixtures are protected. The bandgap task, for example, targets a high-impedance reference core; precision trimming and DC load drive are excluded. [Task contract](#source-contract)

### Evaluation

On timeout, the evaluator uses the deliverable as it stands; missing or empty files receive zero reward. The September 27 paper evaluates 15 agent configurations over 2,250 two-hour attempts using full-specification electrical acceptance. These are author-reported experiments, not a reproduction by the catalog. [Task contract](#source-contract) · [Paper](#source-paper)

### Coverage and results

The frozen V2 manifest and public task tree both contain 50 tasks; the previous 16-directory public-subset limitation is no longer current. Software and benchmark-content licenses differ. [Manifest](#source-manifest) · [Release](#source-release)

Some tasks include PVT or fixed-seed Monte Carlo checks, with task-specific limits. The bandgap robustness screen is not a production-yield claim. Website scores are author-reported evaluations; the catalog has not reproduced them. [Public tasks](#source-tasks) · [Results](#source-site)

### Scope classification

Tasks explicitly evaluate AI agents that edit circuit netlists to meet electrical specifications, supporting AI Design for this benchmark. The tag describes the evaluated design operation, not an autonomous designer inside the task package. [Task contract](#source-contract) · [Benchmark purpose](#source-paper)

Runnable ngspice benches and isolated verifiers provide conventional electrical evaluation, including task-specific PVT checks. Their support for AI design does not itself establish AI Simulation. [Task contract](#source-contract)
