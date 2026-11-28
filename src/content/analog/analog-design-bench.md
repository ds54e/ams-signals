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
reviewedAt: "2026-11-28"
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
  - id: related-example-tasks
    title: "Separate four-task Harbor examples and authorization terms"
    url: "https://github.com/Arcadia-1/analog-design-bench-examples/blob/e7c8e9d182cebec37e147a7a5d0426eda7ef217a/README.md"
  - id: related-toolchains
    title: "Pinned shared simulator and PDK container toolchains"
    url: "https://github.com/Arcadia-1/circuit-bench-toolchains/blob/f28d9590d995778589287ba830d8c76d3a7dc2cb/README.md"
  - id: related-code-a-chip
    title: "Code-a-Chip companion notebook and author-reported results"
    url: "https://github.com/Arcadia-1/analog-design-bench-code-a-chip/blob/fecc6d1b681648f5695d579d280bd341c05d7c37/README.md"
  - id: review-20261128-full-release
    title: "September 15 complete executable V2 task release"
    url: "https://github.com/Arcadia-1/analog-design-bench/commit/83f7b8780add7b00ee9204c78811411f15de73e9"
  - id: review-20261128-ota-contract
    title: "Telescopic OTA specification and PVT acceptance contract"
    url: "https://github.com/Arcadia-1/analog-design-bench/blob/972f7cd7c95381134387b250edf18f3bd23bdd25/tasks/sky130-telescopic-cascode-ota-pvt-fix/instruction.md"
  - id: review-20261128-ota-reference
    title: "Corrected reference-result record"
    url: "https://github.com/Arcadia-1/analog-design-bench/blob/972f7cd7c95381134387b250edf18f3bd23bdd25/tasks/sky130-telescopic-cascode-ota-pvt-fix/results/reference.json"
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

### November 28, 2026 source review

The separate example repository describes four Harbor task packages across SKY130, IHP SG13G2 and GF180MCU using ngspice, Xyce and VACASK. Its README reserves use to authorized people; it is not a freely licensed addition to the original 50-task release. The companion toolchain repository supplies pinned simulator/PDK environments, while the Code-a-Chip notebook reports later benchmark evaluations. These are related artifacts rather than separate catalog implementations or evidence of activity in the original benchmark's default branch. The original public release task count and meaningful checkpoint remain unchanged. [Example tasks](#source-related-example-tasks) · [Toolchains](#source-related-toolchains) · [Companion notebook](#source-related-code-a-chip).

### Selection and checkpoint review

The September 15 full V2 package is the substantive public implementation checkpoint: the retained frozen manifest lists 50 SKY130 tasks with executable task collateral, following the earlier August release. The September 26 telescopic OTA edit corrects only a reference-result power-limit label from 600 uW to below 1 mW; the task already specifies the latter and the recorded reference passes both. The grading rule and score did not change. Retain the correction as factual result evidence, but not a later executable implementation milestone. [Full release](#source-review-20261128-full-release) · [Manifest](#source-manifest) · [Task contract](#source-review-20261128-ota-contract) · [Reference correction](#source-activity-refresh) · [Reference record](#source-review-20261128-ota-reference).

The telescopic OTA task includes 27 declared PVT combinations and separate range, settling and common-mode recovery checks. It explicitly excludes mismatch, noise, CMRR, PSRR and extracted-layout effects from graded coverage. Coverage varies by task; do not interpret the suite as a uniform analog-IP qualification flow. No simulation or model evaluation was independently performed.
