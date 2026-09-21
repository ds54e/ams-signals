---
name: "AnalogXpert"
summary: "LLM agent for expertise-guided analog topology synthesis."
description: "Research implementation for analog topology synthesis that prompts an LLM with reusable circuit-design knowledge, checks generated netlists against structural rules, and iteratively asks the model to repair detected errors. The release also includes subcircuit libraries and real and synthetic evaluation data."
scope:
  design:
    ai: true
access: "Public research code and datasets. Running the scripts requires an OpenAI-compatible model endpoint and replacing repository-local site-specific paths; the release is not packaged as a turnkey flow."
addedAt: "2026-09-22"
reviewedAt: "2026-09-22"
sources:
  - id: "code"
    title: "Canonical AnalogXpert repository"
    url: "https://github.com/zhywhite/AnalogXpert"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed release"
    url: "https://github.com/zhywhite/AnalogXpert/blob/72a4e450390a1588b48376f768d0518ef7f8e652/README.md"
  - id: "agent"
    title: "Topology-synthesis and repair loop"
    url: "https://github.com/zhywhite/AnalogXpert/blob/72a4e450390a1588b48376f768d0518ef7f8e652/Analog_designer.py"
  - id: "checker"
    title: "Generated-circuit self-checking implementation"
    url: "https://github.com/zhywhite/AnalogXpert/blob/72a4e450390a1588b48376f768d0518ef7f8e652/Self_detect.py"
  - id: "activity"
    title: "Public implementation release"
    url: "https://github.com/zhywhite/AnalogXpert/commit/72a4e450390a1588b48376f768d0518ef7f8e652"
---

### Implementation context

AnalogXpert supplies an LLM topology-generation loop, domain prompts, reusable analog subcircuits and a checker that turns structural failures into repair prompts. The checked-in real and synthetic query/result material supports the paper's evaluation context rather than establishing a production PDK-qualified flow. [Agent loop](#source-agent) · [Self-checker](#source-checker)

### Release boundary

The public repository is a single July 17, 2026 release commit authored with the paper lead's PKU identity. Paths and endpoint values remain site-specific examples, so users must configure a model service and local data locations. The implementation does not invoke SPICE or physical verification; those stages are not inferred from netlist generation alone. [README](#source-readme) · [Release](#source-activity)

### Scope classification

The model proposes analog topologies and iteratively revises them from explicit circuit checks, which establishes AI Design. The released checker is conventional code and no public simulation or layout execution path is assigned. [Reviewed implementation](#source-agent).
