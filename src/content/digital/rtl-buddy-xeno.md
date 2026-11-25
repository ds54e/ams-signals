---
name: "rtl-buddy-xeno"
aliases: ["Xeno", "SystemVerilog mutation generator"]
description: "SystemVerilog source-mutation library for seeded expression and CDC/RDC structural fault injection. Its standalone API enumerates candidate sites and emits modified source with predicted effects, while downstream simulation, formal and CDC oracles determine whether mutations are detected."
scope:
  verification: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for expanding asynchronous-reset synchronizer recognition and preserving reset behavior in generated stage-insertion mutants. The retained implementation and regression cases cover these changes."
  sources: [activity, chain-helpers, structural-tests]
  reviewedAt: "2026-11-25"
access: "BSD-3-Clause Python source; Python 3.11 or newer. Most operators require the Verible and/or pyslang extras; external verification engines are required to score mutants."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/rtl-buddy/rtl-buddy-xeno"
    purpose: code
  - id: activity
    title: "September 16 asynchronous-reset mutation support and regression integration"
    url: "https://github.com/rtl-buddy/rtl-buddy-xeno/commit/19c9f54d9e6a58a4f691652c54b31ab74b062c52"
  - id: earlier
    title: "May 26 executable expression-mutation operators"
    url: "https://github.com/rtl-buddy/rtl-buddy-xeno/commit/711ff0729a638191ae564519c32fa98d0e2d2e44"
  - id: mutator
    title: "Retained standalone candidate and mutation API"
    url: "https://github.com/rtl-buddy/rtl-buddy-xeno/blob/19c9f54d9e6a58a4f691652c54b31ab74b062c52/src/rtl_buddy_xeno/mutator.py"
  - id: chain-helpers
    title: "Retained synchronizer shape recognition"
    url: "https://github.com/rtl-buddy/rtl-buddy-xeno/blob/19c9f54d9e6a58a4f691652c54b31ab74b062c52/src/rtl_buddy_xeno/operators/_chain_helpers.py"
  - id: structural-tests
    title: "Retained structural mutation regression cases"
    url: "https://github.com/rtl-buddy/rtl-buddy-xeno/blob/19c9f54d9e6a58a4f691652c54b31ab74b062c52/tests/test_structural_operators.py"
  - id: overview
    title: "Reviewed mutation operators, consumer boundaries and parser requirements"
    url: "https://github.com/rtl-buddy/rtl-buddy-xeno/blob/19c9f54d9e6a58a4f691652c54b31ab74b062c52/README.md"
---

### Implemented operation and limits

The library has independent candidate enumeration and seeded source generation, distinct from RTL Buddy's campaign execution and rtl-buddy-cdc's structural checks. Its fourteen implemented operators include expression, port-binding, assignment and reset mutations, synchronizer depth changes and inter-stage combinational logic. Operators use source ranges from regex, Verible CST and optional pyslang analysis according to the operator; output is a source edit rather than synthesized gate-level mutation. Predictions are deliberately conservative annotations, not equivalence proofs or guaranteed findings. External oracles determine observability and detection; equivalent or invalid mutants and failing baselines require separate treatment. [Mutator API](#source-mutator) · [Operator boundaries](#source-overview).

### Reviewed maintenance and provenance

May 26 implements expression operators. September 16 adds recognition of a restricted asynchronous-reset synchronizer shape, including preservation of the reset condition and literal reset value for stage insertion. The depth-perturb operator still limits itself to reset-free stages. The integrated change credits Claude and retains the executable recognition and regression code, supporting AI-assisted development without assigning runtime AI. No generated mutants, HDL builds, proof campaign or coverage result were independently executed. [Earlier operators](#source-earlier) · [Credited integration](#source-activity) · [Retained recognizer](#source-chain-helpers) · [Regression cases](#source-structural-tests).
