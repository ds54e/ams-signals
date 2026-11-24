---
name: "gLayout"
aliases: ["Glayout"]
summary: "PDK-aware Python framework for analog layout generation with an LLM-oriented PCell code path."
description: "Generates analog layouts from reusable Python primitives, placement and routing utilities, with an optional LLM path for PCell code generation and repair. Mapped planar PDKs are joined by an experimental ASAP7 FinFET backend with grid, threshold-flavor and extracted-connectivity checks; its partial rule deck and uncalibrated MOM capacitors limit physical verification."
scope:
  layout:
    ai: true
targets: "Analog layout generators and PCells for mapped open PDKs including SKY130, GF180 and IHP130, plus an experimental ASAP7 FinFET mapping."
access: "MIT-licensed public Python source; core layout generation is installable without an LLM, while the LLM path requires the documented model/inference environment."
addedAt: "2026-09-14"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical gLayout repository"
    url: "https://github.com/ReaLLMASIC/gLayout"
    purpose: "code"
  - id: "readme"
    title: "Project README at the reviewed revision"
    url: "https://github.com/ReaLLMASIC/gLayout/blob/3e129ede58b4d21509dad682e56b9d573cefe8ab/README.md"
  - id: "llm"
    title: "LLM inference path and PCELL-GPT prompt"
    url: "https://github.com/ReaLLMASIC/gLayout/blob/3e129ede58b4d21509dad682e56b9d573cefe8ab/llm-finetuning/scripts/inference/README.md"
  - id: "ihp"
    title: "Current IHP130 mapped PDK implementation"
    url: "https://github.com/ReaLLMASIC/gLayout/tree/3e129ede58b4d21509dad682e56b9d573cefe8ab/src/glayout/pdk/ihp130_mapped"
  - id: "activity"
    title: "Allow narrow devices via dogbone diffusion"
    url: "https://github.com/ReaLLMASIC/gLayout/commit/3e129ede58b4d21509dad682e56b9d573cefe8ab"
  - id: asap7-boundaries
    title: "Integrated ASAP7 proof-of-concept workflow and limitations"
    url: https://github.com/ReaLLMASIC/gLayout/blob/97276267411c193037f9844716f376fcb126c3e6/docs/asap7.md
  - id: finfet-lattice
    title: "Fin-count conversion, placement lattice and GDS export guards"
    url: https://github.com/ReaLLMASIC/gLayout/blob/97276267411c193037f9844716f376fcb126c3e6/src/glayout/pdk/finfet.py
  - id: finfet-primitives
    title: "FinFET primitive geometry and explicit nfin reference netlists"
    url: https://github.com/ReaLLMASIC/gLayout/blob/97276267411c193037f9844716f376fcb126c3e6/src/glayout/primitives/finfet.py
  - id: finfet-flavor-tests
    title: "Threshold-mask and reference-model negative tests"
    url: https://github.com/ReaLLMASIC/gLayout/blob/97276267411c193037f9844716f376fcb126c3e6/tests/test_finfet_flavors.py
---

### Layout scope

The current implementation provides device primitives, composite cells, placement/routing helpers, mapped PDK data and DRC/LVS-oriented tests. IHP130 is present alongside the established SKY130 and GF180 mappings in the reviewed tree. [Project](#source-readme) · [IHP mapping](#source-ihp).

### AI path

The released LLM tooling asks models to generate Python PCell code and includes a separate master-model path for analyzing and fixing generated code before fine-tuning. This is a runtime AI contribution to Layout, not evidence that every deterministic gLayout generator is AI-driven. [LLM path](#source-llm).

### Experimental FinFET boundary

The integrated ASAP7 backend reuses the existing circuit generators through a FinFET device primitive. `nfin` is an integer fin count; a supplied width is rounded up to occupied fin tracks rather than interpreted as BSIM-CMG effective perimeter width. Placement and export enforce the fin/gate lattice and manufacturing grid, while the reference netlist emits the selected threshold model with explicit `nfin`. [Lattice implementation](#source-finfet-lattice) · [Device and netlist implementation](#source-finfet-primitives).

The implementation offers NMOS/PMOS RVT, LVT, SLVT and SRAM flavors. Reviewed tests reject missing, overlapping or partial threshold masks and wrong reference models. The documented DRC/LVS results cover the project's open rule subset and structural extraction; virtual body-contact markers, unsupported isolated NMOS body biases and an uncalibrated MOM capacitance model preclude treating this as foundry-qualified 7 nm support. Upstream result counts were not independently rerun. [Flavor tests](#source-finfet-flavor-tests) · [Proof-of-concept limits](#source-asap7-boundaries).

### Activity

The August 2026 head includes a physical-layout change allowing narrow FETs through dogbone diffusion, keeping the underlying layout framework within the catalog's current-activity window. [Meaningful update](#source-activity).
