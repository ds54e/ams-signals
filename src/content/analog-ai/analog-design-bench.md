---
name: "Analog Design Bench"
aliases: ["Analog Design Bench V2"]
roles: ["benchmark"]
summary: "Benchmarks agents that edit circuit files and iterate with simulation to meet analog and RF electrical specifications."
description: "Agents edit a supplied circuit and use development benches to meet electrical specifications. Tasks span RF filters, references, LDOs, amplifiers, and data converters, with automated measurements and task-specific PVT or Monte Carlo checks."
keywords: ["RF / AMS", "ngspice", "SKY130", "Partial release"]
workflow:
  generate-edit: core
  simulate-measure: core
  optimize: core
targets: "RF filters and matching networks, references, LDOs, amplifiers, ADCs and DACs"
access: "Task packages, starter circuits, development benches, verifiers, and environment definitions are being released progressively. Public tasks require ngspice and, where specified, SKY130 models and a container environment."
notice: "The V2 website lists 50 tasks, but the reviewed public repository contains 16 task directories. That public subset is not a complete release of the website evaluation."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
    url: "https://github.com/Arcadia-1/analog-design-bench/tree/33d5ff178704dcb3f2e40e2ae45070451ea9b72f/tasks"
  - id: "contract"
    title: "Bandgap task: deliverable, constraints, and timeout rules"
    url: "https://github.com/Arcadia-1/analog-design-bench/blob/33d5ff178704dcb3f2e40e2ae45070451ea9b72f/tasks/sky130-bandgap-reference-pvt/instruction.md"
  - id: "grader"
    title: "RF band-pass verifier: check results and partial credit"
    url: "https://github.com/Arcadia-1/analog-design-bench/blob/33d5ff178704dcb3f2e40e2ae45070451ea9b72f/tasks/rlc-rf-bandpass-100mhz/tests/utils.py"
---
### Task contract

Agents edit the declared DUT and use supplied development benches. Model libraries and evaluation fixtures are protected. The bandgap task, for example, targets a high-impedance reference core; precision trimming and DC load drive are excluded. [Task contract](#source-contract)

### Evaluation

On timeout, the evaluator uses the deliverable as it stands; missing or empty files receive zero reward. The public RF band-pass grader emits the fraction of checks passed as partial credit. This task-level reward is distinct from the website's Pass@1 aggregate. [Grader](#source-grader)

### Coverage and results

Some tasks include PVT or fixed-seed Monte Carlo checks, with task-specific limits. The bandgap robustness screen is not a production-yield claim. Website scores are author-reported evaluations; the catalog has not reproduced them. [Public tasks](#source-tasks) · [Results](#source-site)

### Landscape scope

Generation/editing, simulation, and specification-driven optimization are core task scope. Public development benches are available to agents; final verification is separate. Reasoning is not a separately graded deliverable, and using ngspice alone is not an EDA-session integration claim. [Task contract](#source-contract)
