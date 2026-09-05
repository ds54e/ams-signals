---
name: "vitamin"
aliases: []
description: "Rust four-state SystemVerilog simulator with native execution and parser, elaboration and runtime semantics checked against Icarus and Verilator differential tests."
flow: {"verification":"core"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical vitamin repository"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/blob/c311eb6c0763e8940ec7358576e4d87ef1df7199/README.md"
  - id: "implementation"
    title: "Reviewed implementation: crates/cli/src/pipeline.rs"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/blob/c311eb6c0763e8940ec7358576e4d87ef1df7199/crates/cli/src/pipeline.rs"
  - id: "activity"
    title: "Multi-dimensional packed tf-port formals, a based literal as a parse-time constant, a member width folded at its §11.6 width — the parser rung behind ibex's whole design (§3 ⑤)"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/commit/c311eb6c0763e8940ec7358576e4d87ef1df7199"
  - id: "ai-development"
    title: "Core parser work with repeated AI co-authorship"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/commit/02f507d0dac686055c32c64be0e28ff7f0c68306"
---


### Implementation context

Sustained Claude co-authorship appears on core parser, constant-folding, elaboration and runtime commits, including the reviewed implementation change. This is material core development, not an isolated documentation contribution. [Reviewed source](#source-ai-development).

### Release boundary

Public conformance tests establish their tested subset; they do not establish unrestricted SystemVerilog support or universal speedups. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Four-state RTL execution and differential conformance testing serve simulation/verification. Internal parser, elaborator and native compiler stages receive no independent Design mark. [Reviewed source](#source-readme).
