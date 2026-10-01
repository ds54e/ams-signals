---
name: "RTL-BenchMT"
aliases: []
description: "RTL-generation benchmark maintenance artifacts and an LLM evaluation harness comparing original and revised prompts. Version 2 publishes fixes for 47 ambiguous cases across six datasets and 438 expanded RTL variants; pluggable model backends feed Icarus or cocotb-based functional checks."
scope:
  design:
    ai: true
  verification:
    ai: false
access: "Public datasets, per-case analyses and evaluation code. Revised prompts retain upstream benchmark licensing; evaluation requires model access and Icarus, with cocotb for the CVDP subsets."
addedAt: "2026-10-01"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical RTL-BenchMT repository"
    url: "https://github.com/hkust-zhiyao/RTL-BenchMT"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/hkust-zhiyao/RTL-BenchMT/blob/4a773170f80b80a216a6ecb6b5948f53684eee22/README.md"
  - id: "implementation"
    title: "Reviewed implementation"
    url: "https://github.com/hkust-zhiyao/RTL-BenchMT/blob/4a773170f80b80a216a6ecb6b5948f53684eee22/eval/evaluate.py"
  - id: "activity"
    title: "Release version 2 benchmark revisions and expanded cases"
    url: "https://github.com/hkust-zhiyao/RTL-BenchMT/commit/4a773170f80b80a216a6ecb6b5948f53684eee22"
  - id: "evaluation"
    title: "Evaluation setup and task contracts"
    url: "https://github.com/hkust-zhiyao/RTL-BenchMT/blob/4a773170f80b80a216a6ecb6b5948f53684eee22/eval/README.md"
---

### Released artifacts

The v2 release includes original/revised prompts, per-case ambiguity analyses, expanded design variants and an evaluation CLI. Its six dataset slices comprise VerilogEval variants, RTLLM and two CVDP RTL-generation categories. The upstream project describes SpecIR-guided agentic maintenance with human review; this entry does not imply that the complete maintenance pipeline is released merely because its outputs are public. [Reviewed README](#source-readme); [Evaluation contract](#source-evaluation).

### Scope classification

The explicit model task is RTL generation, establishing AI Design. The evaluation harness extracts generated Verilog and runs fixed Icarus or cocotb checks, establishing conventional Verification. Agent-assisted corpus repair is distinct from evaluated AI testbench generation or model-driven simulator diagnosis, neither of which is established by this released evaluation path. [Evaluation contract](#source-evaluation); [Implementation](#source-implementation).

### Activity and results boundary

The September 3, 2026 version 2 release supplies substantive dataset and evaluation activity. Counts describe project-reported released artifacts, not independently reproduced accuracy or pass rates. No development-provenance badge is inferred from agent-assisted benchmark construction. [Release commit](#source-activity); [Reviewed README](#source-readme).
