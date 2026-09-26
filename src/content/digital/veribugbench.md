---
name: "VeriBugBench"
aliases: []
description: "Executable RTL debugging benchmark and construction framework with 45 projects and 2,608 selected single-fault instances. It imports complete upstream trees, generates structured mutants, runs reference and mutant simulations, retains observable faults and builds coverage matrices for reproducible debugging evaluation."
scope:
  verification:
    ai: false
access: "MIT-licensed framework and v1.0 dataset. Synopsys VCS/URG with the matching Verdi PLI is the reference experimental backend; Icarus Verilog supports only a limited compatibility path and does not reproduce the full VCS workflow."
addedAt: "2026-09-26"
reviewedAt: "2026-09-26"
sources:
  - id: "code"
    title: "Canonical VeriBugBench repository"
    url: "https://github.com/wndif/VeriBugBench"
    purpose: "code"
  - id: "paper"
    title: "VeriBugBench paper"
    url: "https://arxiv.org/abs/2609.18022"
    purpose: "paper"
  - id: "readme"
    title: "README at the reviewed release"
    url: "https://github.com/wndif/VeriBugBench/blob/463d490e261dff247eb6ef82b07b6e924fee19e8/README.md"
  - id: "activity"
    title: "Initial public release"
    url: "https://github.com/wndif/VeriBugBench/commit/463d490e261dff247eb6ef82b07b6e924fee19e8"
---

### Benchmark construction

The framework imports complete RTL projects, applies structural mutation operators, runs candidates against the same reference testbench and retains only faults whose output differs from the golden run. It separately parses URG coverage reports into time-windowed coverage matrices. [Reviewed source](#source-readme)

### AI boundary

The paper reports LLM-based testbench enhancement when constructing the frozen benchmark corpus. The released v1.0 execution and mutation framework is itself deterministic, and the catalog does not infer runtime AI Verification from corpus-construction history. [Paper](#source-paper) · [Release](#source-readme)

### Scope classification

Fault injection, reference/mutant execution, output comparison, coverage analysis and debugging-ground-truth packaging are Verification operations. Their released runtime path remains conventional. [Reviewed source](#source-readme)
