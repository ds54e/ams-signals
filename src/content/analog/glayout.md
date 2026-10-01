---
name: "gLayout"
aliases: ["Glayout"]
summary: "PDK-aware Python framework for analog layout generation with an LLM-oriented PCell code path."
description: "Generates analog device and circuit layouts from reusable Python primitives, placement and routing utilities, with DRC/LVS-oriented verification support across mapped open PDKs. The repository also includes an LLM fine-tuning and inference path that generates or repairs Python PCell code, so AI materially participates in the layout-generation workflow."
scope:
  layout:
    ai: true
targets: "Analog layout generators and PCells for mapped open PDKs including SKY130, GF180 and the repository's IHP130 mapping."
access: "MIT-licensed public Python source; core layout generation is installable without an LLM, while the LLM path requires the documented model/inference environment."
addedAt: "2026-09-14"
reviewedAt: "2026-09-14"
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
---

### Layout scope

The current implementation provides device primitives, composite cells, placement/routing helpers, mapped PDK data and DRC/LVS-oriented tests. IHP130 is present alongside the established SKY130 and GF180 mappings in the reviewed tree. [Project](#source-readme) · [IHP mapping](#source-ihp).

### AI path

The released LLM tooling asks models to generate Python PCell code and includes a separate master-model path for analyzing and fixing generated code before fine-tuning. This is a runtime AI contribution to Layout, not evidence that every deterministic gLayout generator is AI-driven. [LLM path](#source-llm).

### Activity

The August 2026 head includes a physical-layout change allowing narrow FETs through dogbone diffusion, keeping the underlying layout framework within the catalog's current-activity window. [Meaningful update](#source-activity).
