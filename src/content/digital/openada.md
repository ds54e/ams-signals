---
name: "OpenADA"
aliases: []
description: "Agent skills and local EDA drivers for RTL diagnostics, Liberty-mapped synthesis and checks of custom digital layouts. Hosted models interpret tool evidence and select experiments; native tools perform execution, while synthesis-stage timing uses ideal interconnect and does not establish routed timing or complete physical implementation."
scope:
  synthesis:
    ai: true
  verification:
    ai: true
  layout:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer credits Codex with implementing the experiment runner and conformance-receipt verification work. These additions provide experiment orchestration and validation of recorded execution evidence within OpenADA."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical OpenADA repository"
    url: "https://github.com/simra-tech/OpenADA"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/openada/engines/klayout_engine.py"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/src/openada/engines/klayout_engine.py"
  - id: "activity"
    title: "Integrated typed testbench-plan compiler and execution validation"
    url: "https://github.com/simra-tech/OpenADA/commit/3bd838c0f1db15e6d38c26d43ece68402e841005"
  - id: "development-1"
    title: "Experiment implementation"
    url: "https://github.com/simra-tech/OpenADA/commit/5ee5f1133956fa8a79c4d9ef3ddbf1ce283198bf"
  - id: "development-2"
    title: "Conformance campaign"
    url: "https://github.com/simra-tech/OpenADA/commit/dff55d2cca12985ff167d58d8b01b46e0ab3bce0"
  - id: "development-3"
    title: "Current experiment operation"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/src/openada/operations/experiment.py"
  - id: "synthesis-skill"
    title: "Agent synthesis and hardware-inference review workflow"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/skills/assess-synthesis-and-inference/SKILL.md"
  - id: "rtl-skill"
    title: "Agent RTL diagnostic and structural-review workflow"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/skills/review-rtl-architecture/SKILL.md"
  - id: "layout-skill"
    title: "Agent incremental physical-closure workflow"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/skills/close-layout-incrementally/SKILL.md"
  - id: "synthesis-implementation"
    title: "Mapped synthesis and evidence implementation"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/src/openada/engines/yosys.py"
  - id: "workflow-boundaries"
    title: "Digital workflow maturity and unavailable physical operations"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/docs/ENGINEERING_SKILLS.md"
  - id: "maintenance-experiment"
    title: "July 28 fixes for experiment integrity and captured PDK inputs"
    url: "https://github.com/simra-tech/OpenADA/commit/be174a0761d8a06851c90432632c1b09b75698ba"
  - id: "maintenance-cosim"
    title: "August 3 correction of co-simulation context lifetime and instance state"
    url: "https://github.com/simra-tech/OpenADA/commit/a0128406e23be22a2734fac77523f3dd5a5d7b0a"
---


### Implemented workflow and scope

The synthesis skill interprets mapping and inference results and chooses controlled experiments; the RTL-review skill diagnoses lint and structural results. The Yosys driver performs actual Liberty mapping, validates the emitted netlist and preserves its input lineage. These independently usable digital operations justify retaining this entry alongside the same repository's Analog workflows. Both entries share one canonical identity and repository history. [Synthesis skill](#source-synthesis-skill); [RTL review](#source-rtl-skill); [Mapped implementation](#source-synthesis-implementation).

Layout covers the model-guided review and repair of small custom-digital geometry increments, using KLayout/Netgen checks. The skill explicitly includes custom digital cells and hard-macro interfaces. This is separate from the ideal-interconnect synthesis-stage timing operation; neither that timing result nor tool discovery establishes an implemented standard-cell place-and-route flow. [Layout workflow](#source-layout-skill); [KLayout implementation](#source-implementation); [Workflow boundaries](#source-workflow-boundaries).

The stage AI flags refer to these packaged model-hosted decisions. Native tools still execute the operations and determine their engineering results. Local CLI integration is implemented; remote execution and a normative MCP binding remain future work. Experimental oscillator and testbench profiles are bounded, and the reverted knowledge-graph spike is not included as capability. [Implemented preview](#source-readme); [Typed testbench implementation](#source-activity).

### Maintenance evidence

Follow-up after the July public implementation includes the July 28 correction of captured PDK inputs and experiment-result integrity, followed by the August 3 repair of Verilator context lifetime and per-instance co-simulation state. These are implemented responses to concrete correctness problems and remain on the reviewed default branch. The public implementation history inspected on November 24 ends on August 12; the other published branches and release/tag evidence did not establish later implementation. Retention rests on this observed follow-through, with a short maintenance record and no claim of continuing frequent updates. This is shared repository evidence, not a separate Digital development history. [Experiment fixes](#source-maintenance-experiment); [Co-simulation fix](#source-maintenance-cosim); [August integration](#source-activity).

### Development provenance and validation limits

The maintainer explicitly credits Codex for the experiment operation and conformance campaign. The retained code supplies orchestration, artifact validation and execution-record verification, supporting AI-ASSISTED independently of runtime classification. Source and test logic were inspected; no external EDA or model campaign was rerun for this catalog review. [Credited experiment](#source-development-1); [Credited conformance work](#source-development-2); [Retained operation](#source-development-3).
