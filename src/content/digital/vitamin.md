---
name: "vitamin"
aliases: []
description: "Rust simulator for four-state Verilog/SystemVerilog execution with a native backend and VCD/FST waveform output. A source-to-runtime pipeline handles RTL and selected verification features, with differential tests against Icarus used to check behavior as language support expands."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-06"
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
  - id: "development-history"
    title: "Development history spanning the VM and later language implementation"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/blob/830bea95dd89e2a7dbba13f0bda5054efdf83cb0/docs/DEVLOG.md"
  - id: "development-sample"
    title: "Current elaborator and runtime work with Claude co-authorship"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/commit/1af12ffb035b8a3ac593ccbcdca340582a3dacba"
---


### Implementation context

Sustained Claude co-authorship appears on parser, constant-folding, elaboration and runtime commits. The development history also records the bytecode VM and subsequent language work. This is meaningful implementation assistance, but the credits and progress records do not establish the extent of AI's implementation responsibility clearly enough for a project-level AI-built badge. [Parser contribution](#source-ai-development); [development history](#source-development-history); [current elaborator/runtime contribution](#source-development-sample).

### Release boundary

Public conformance tests establish their tested subset; they do not establish unrestricted SystemVerilog support or universal speedups. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Four-state RTL execution and differential conformance testing serve simulation/verification. Internal parser, elaborator and native compiler stages receive no independent Design mark. [Reviewed source](#source-readme).

Four-state execution and differential checks are conventional Verification. Development assistance does not introduce AI into the simulator's execution, and the stronger project-level AI-built classification is omitted. [Development evidence](#source-development-history).
