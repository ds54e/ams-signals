---
name: "vitamin"
aliases: []
description: "Rust simulator for four-state Verilog/SystemVerilog execution with a native backend and VCD/FST waveform output. A source-to-runtime pipeline handles RTL and selected verification features, with differential tests against Icarus used to check behavior as language support expands."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude-credited implementation added SystemVerilog package-variable storage and import resolution, then extended package array parameters and initialization. Current elaboration code and regressions retain this package-support work."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
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
  - id: "development-1"
    title: "Package-storage implementation"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/commit/f24f012b08542ec2f34c786cfb76c7a535d14c5a"
  - id: "development-2"
    title: "Package-initialization implementation"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/commit/0079d9764893e8e8c6dc693a704de209d07c7f27"
  - id: "development-3"
    title: "Current package storage"
    url: "https://github.com/tjddnr0912/vitamin-rtl-simulator/blob/43e9286c51add3cd5226bf4a1cd38918bdebd608/crates/elaborate/src/lib.rs"
---


### Implementation context

Sustained Claude co-authorship appears on parser, constant-folding, elaboration and runtime commits. The development history also records the bytecode VM and subsequent language work. These credits and progress records do not establish whole-simulator implementation responsibility; the AI-ASSISTED decision instead rests on the specific package-support campaign described below. [Parser contribution](#source-ai-development); [development history](#source-development-history); [current elaborator/runtime contribution](#source-development-sample).

### Release boundary

Public conformance tests establish their tested subset; they do not establish unrestricted SystemVerilog support or universal speedups. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Four-state RTL execution and differential conformance testing serve simulation/verification. Internal parser, elaborator and native compiler stages receive no independent Design mark. [Reviewed source](#source-readme).

Four-state execution and differential checks are conventional Verification. Development assistance does not introduce AI into the simulator's execution, and the package-support AI-ASSISTED classification does not alter that runtime behavior. [Development evidence](#source-development-history).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The credited package-support campaign implements shared package storage, import aliases and initialization across elaboration/runtime paths, with differential regressions; current storage fields/tests remain. This identifies a substantial language-support subsystem independently of ambiguous whole-project credits. [Package-storage implementation](#source-development-1); [Package-initialization implementation](#source-development-2); [Current package storage](#source-development-3).
