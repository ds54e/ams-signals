---
name: "Vyges Syn"
aliases: ["vyges-syn"]
description: "Rust logic synthesis tool using slang elaboration, a graph IR, ABC restructuring and Liberty-based combinational/sequential cell mapping. Exposes structural Verilog output and a separate timing-driven netlist resynthesis operation; the generic job runner remains unimplemented and the reviewed timing path omits wire parasitics."
scope:
  design: { ai: false }
  synthesis: { ai: false }
access: "Apache-2.0 source; requires the documented Rust toolchain, sibling Vyges/ABC dependencies and compatible Liberty and LEF data."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical Vyges Syn implementation"
    url: "https://github.com/vyges-tools/syn"
    purpose: code
  - id: readme
    title: "Implemented commands and refused job runner"
    url: "https://github.com/vyges-tools/syn/blob/032a7b8bc71868c1238cf69bd5ec0e66fb8f894e/README.md"
  - id: activity
    title: "November 21 arithmetic constant-folding correction"
    url: "https://github.com/vyges-tools/syn/commit/29ac691c68c0a38c6dfd8fb7bad4a1a798be4135"
  - id: earlier-tests
    title: "November 18 independent per-pass evaluator and exhaustive checks"
    url: "https://github.com/vyges-tools/syn/commit/30c5acafaeb7b457153f10e6df11c669a388105b"
  - id: cli
    title: "User-facing command dispatch and limits"
    url: "https://github.com/vyges-tools/syn/blob/032a7b8bc71868c1238cf69bd5ec0e66fb8f894e/src/main.rs"
  - id: pipeline
    title: "Retained RTL elaboration, bitblasting and cell mapping pipeline"
    url: "https://github.com/vyges-tools/syn/blob/032a7b8bc71868c1238cf69bd5ec0e66fb8f894e/src/synthesis.rs"
  - id: constant-fold
    title: "Retained arithmetic graph transformation"
    url: "https://github.com/vyges-tools/syn/blob/032a7b8bc71868c1238cf69bd5ec0e66fb8f894e/src/flow/constant_fold.rs"
  - id: evaluator
    title: "Test-only graph evaluator"
    url: "https://github.com/vyges-tools/syn/blob/032a7b8bc71868c1238cf69bd5ec0e66fb8f894e/src/ir/eval.rs"
---

### Implementation and selection

The standalone command path elaborates SystemVerilog, normalizes its graph IR, invokes ABC restructuring, and maps combinational and sequential logic to characterized library cells. Separate IR commands expose elaborated representations and passes, supporting Design as well as Synthesis. The November 18 test-only three-valued evaluator and per-pass checks precede the November 21 carry-chain constant-folding change; executable graph transformations rather than a frontend-only scaffold establish useful follow-through. [Pipeline](#source-pipeline) · [Evaluator integration](#source-earlier-tests) · [Constant folding](#source-constant-fold).

### Scope and limits

The implemented commands are distinct from the related Vyges power and extraction tools. The generic job runner still refuses to run; the CLI documents that timing-driven resynthesis uses one timing scene without wire parasitics. This does not establish a complete backend flow, placement/routing or post-route timing closure. The evaluator is test-only and not an independently exposed formal-verification tool. Source and tests were inspected without executing synthesis or independently measuring equivalence or PPA. [CLI](#source-cli) · [Overview](#source-readme) · [Activity](#source-activity).
