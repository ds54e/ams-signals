---
name: "AnalogCoder-Pro"
aliases: ["AnalogCoderPro"]
roles: ["benchmark","agent"]
summary: "Combines circuit generation, waveform-image diagnosis and repair, and device sizing in a multimodal LLM research framework. Public tasks and testbenches support checking the behavior of generated circuits."
targets: "Amplifiers, mixers, comparators, oscillators, filters, and related circuits"
access: "Task tables, sample circuits, testbenches, LLM run scripts, and waveform examples are public. Requires Python, ngspice, PySpice, and a separately configured model endpoint."
notice: "The reviewed checklist still leaves Bayesian optimization updates and some ablation prompts unfinished. The complete optimization workflow described by the research should not be assumed reproducible from the public code."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Public repository"
    url: "https://github.com/laiyao1/AnalogCoderPro"
    purpose: "code"
  - id: "paper"
    title: "AnalogCoder-Pro: TCAD paper"
    url: "https://ieeexplore.ieee.org/document/11432899"
    purpose: "paper"
  - id: "review"
    title: "Reviewed README: workflow, released artifacts, and unfinished items"
    url: "https://github.com/laiyao1/AnalogCoderPro/blob/05542af46020e5c37d5a7e3ca79da9f24626e1c9/README.md"
  - id: "tasks"
    title: "Public task table: circuit requests and input/output ports"
    url: "https://github.com/laiyao1/AnalogCoderPro/blob/05542af46020e5c37d5a7e3ca79da9f24626e1c9/problem_set.tsv"
---
### Inputs and workflow

Tasks specify a circuit request and its input/output ports. Sample designs and checking programs are separate artifacts. The framework describes generation, diagnosis using specifications and waveform images, parameter extraction, and search-space construction. [Task table](#source-tasks) · [Workflow](#source-review)

### Release status

Run scripts and waveform examples are available, while the checklist retains unfinished BO and ablation-prompt work. Individual waveform examples do not establish successful autonomous optimization across all tasks. [Reviewed release](#source-review)

This entry does not reuse results from the preceding AnalogCoder project as Pro results. Any numerical comparison needs the matching model, trial budget, checks, and implementation revision.
