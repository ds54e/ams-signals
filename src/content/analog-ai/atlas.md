---
name: "ATLAS"
aliases: ["ATLAS SAR ADC"]
roles: ["agent"]
summary: "A paper-described SAR ADC design flow that grounds LLM planning and netlist assembly in expert-curated component templates. It combines modification, integration, testbench creation, and simulation-guided sizing."
targets: "SAR ADCs assembled from comparator, DAC, and SAR-logic templates"
access: "Paper available; a public ATLAS implementation was not verified. Main experiments use GPT-4o, Cadence Spectre, and GPDK45."
notice: "Human experts check agent components and rectify testbenches. The reported work excludes layout."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "paper"
    title: "Paper v1: ATLAS architecture, experiments, and human involvement"
    url: "https://arxiv.org/pdf/2607.14165v1"
    purpose: "paper"
---
### Design strategy

Retrieved design knowledge guides template selection and parameterization. Agents modify bit width, connect components, adapt a testbench template, and debug simulation errors. A sizing agent selects parameters and search ranges for an external multi-objective Bayesian optimizer. [Stages 1–3](#source-paper)

### Reported scope

The authors report an eight-bit SAR ADC simulation meeting their selected specifications, plus additional case studies. This supports a constrained design strategy with expert intervention, not unrestricted topology synthesis, full autonomy, or fabricated-silicon performance. [Experiments and limitations](#source-paper)
