---
name: "EquivSVA"
aliases: []
description: "Benchmark and evaluator for LLM-generated SystemVerilog assertions across equivalent RTL variants. Behavior families provide interface-level gold properties, controlled mutants and family-separated splits, with code for RTL equivalence, gold-property reachability, assertion soundness and mutation checks. The evaluator supports a bounded assertion subset."
scope:
  verification:
    ai: true
access: "Apache-2.0 code; CC BY 4.0 dataset. The formal workflow needs OSS CAD Suite/Yosys/SymbiYosys/Bitwuzla; generation uses the documented Transformers/PyTorch or MLX model environment. Model terms are separate."
addedAt: "2026-10-11"
reviewedAt: "2026-10-11"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/aditigupta96/EquivSVA"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/aditigupta96/EquivSVA/blob/71b93e6c62b81fadac87d2e6e097cf005bf1ce99/README.md"
  - id: "model-runner"
    title: "Model runner"
    url: "https://github.com/aditigupta96/EquivSVA/blob/71b93e6c62b81fadac87d2e6e097cf005bf1ce99/experiments/run_model.py"
  - id: "formal-scorer"
    title: "Formal scorer"
    url: "https://github.com/aditigupta96/EquivSVA/blob/71b93e6c62b81fadac87d2e6e097cf005bf1ce99/experiments/score_formal.py"
  - id: "assertion-lowerer"
    title: "Assertion lowerer"
    url: "https://github.com/aditigupta96/EquivSVA/blob/71b93e6c62b81fadac87d2e6e097cf005bf1ce99/experiments/lower_sva.py"
  - id: "family-validator"
    title: "Family validator"
    url: "https://github.com/aditigupta96/EquivSVA/blob/71b93e6c62b81fadac87d2e6e097cf005bf1ce99/scripts/validate_family.py"
  - id: "dataset-license"
    title: "Dataset license"
    url: "https://github.com/aditigupta96/EquivSVA/blob/71b93e6c62b81fadac87d2e6e097cf005bf1ce99/LICENSE-DATASET"
  - id: "paper"
    title: "EquivSVA paper and task methodology"
    url: "https://arxiv.org/abs/2609.26751"
    purpose: "paper"
  - id: "activity"
    title: "Reviewed substantive first-parent implementation update"
    url: "https://github.com/aditigupta96/EquivSVA/commit/cfa118a97b992013891dd98211877d21ea52026c"
---

## Implementation and Scope

Public model runners generate interface-level SystemVerilog assertions. The evaluator checks equivalent implementations, soundness and controlled mutants. A generated DUT inside benchmark construction is fixture preparation; the user-facing model task is assertion generation. The reviewed implementation is described in the [README](#source-readme) and [Model runner](#source-model-runner), [Formal scorer](#source-formal-scorer), [Assertion lowerer](#source-assertion-lowerer).

Separates assertion quality from incidental RTL structure. The v2 dataset has 120 behavior families in 12 categories, four equivalent RTL variants and three controlled mutants per family. Public scripts and recorded outputs allow artifact inspection rather than relying on paper claims alone.

## Evidence and operating boundaries

The assertion lowerer handles a bounded subset, including invariants and short implications; unsupported expressions, UNKNOWN, compilation failures and internal-signal violations remain distinct. Gold-property reachability checks do not establish non-vacuity or usefulness for every generated assertion. Recorded results are author experiments, not new formal runs.

Apache-2.0 code; CC BY 4.0 dataset. The formal workflow needs OSS CAD Suite/Yosys/SymbiYosys/Bitwuzla; generation uses the documented Transformers/PyTorch or MLX model environment. Model terms are separate. See the [README](#source-readme) for setup and the linked source materials for their own terms.

## Reviewed public activity

The meaningful checkpoint is cfa118a97b992013891dd98211877d21ea52026c (2026-09-16 UTC), verified on the captured default branch's first-parent chain. The [implementation update](#source-activity) supports the meaningful date; the latest head is separately retained for activity ordering.
