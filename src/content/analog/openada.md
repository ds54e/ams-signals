---
name: "OpenADA"
summary: "Model-hosted circuit reasoning, SPICE characterization and incremental custom-layout review through local EDA operations."
description: "Agent-hosted workflows for circuit interpretation, analog characterization and incremental custom-layout review. Skills choose supported SPICE analyses, interpret typed measurement evidence and diagnose geometry through implemented ngspice/Xyce, KLayout and Netgen operations; native toolchains and PDKs remain required, with unavailable metrics and extraction capabilities kept explicit."
scope:
  design:
    ai: true
  simulation:
    ai: true
  layout:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer credits Codex with implementing the experiment runner and conformance-receipt verification work. These additions provide experiment orchestration and validation of recorded execution evidence within OpenADA."
  sources: ["development-1", "development-2", "experiment"]
  reviewedAt: "2026-11-24"
access: "Public MIT source. Model-hosted skills require a compatible agent; local EDA executables, appropriate PDKs/models and declared analysis collateral remain necessary. The reviewed default branch is a preview, with experimental workflows and bounded conformance cases."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical OpenADA repository"
    url: "https://github.com/simra-tech/OpenADA"
    purpose: "code"
  - id: "readme"
    title: "Implemented preview operations and native-tool boundaries"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/README.md"
  - id: "characterization"
    title: "Analog characterization and analysis-selection workflow"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/skills/characterize-analog-block/SKILL.md"
  - id: "reasoning"
    title: "Circuit topology, state and sizing-tradeoff reasoning"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/skills/characterize-analog-block/references/qualitative-reasoning.md"
  - id: "experiment"
    title: "Implemented experiment validation, SPICE execution, extraction and measurement"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/src/openada/operations/experiment.py"
  - id: "layout-skill"
    title: "Incremental geometry diagnosis and physical-check workflow"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/skills/close-layout-incrementally/SKILL.md"
  - id: "layout-implementation"
    title: "KLayout execution and fresh-report validation"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/src/openada/engines/klayout_engine.py"
  - id: "engineering-skills"
    title: "Packaged domain workflows, maturity and unsupported operations"
    url: "https://github.com/simra-tech/OpenADA/blob/ff9415e24fe6407820ca23147e3cf42625dd69b7/docs/ENGINEERING_SKILLS.md"
  - id: "activity"
    title: "Integrated testbench-plan compiler, execution and semantic-receipt verification"
    url: "https://github.com/simra-tech/OpenADA/commit/3bd838c0f1db15e6d38c26d43ece68402e841005"
  - id: "development-1"
    title: "Codex-credited experiment implementation"
    url: "https://github.com/simra-tech/OpenADA/commit/5ee5f1133956fa8a79c4d9ef3ddbf1ce283198bf"
  - id: "development-2"
    title: "Codex-credited conformance campaign"
    url: "https://github.com/simra-tech/OpenADA/commit/dff55d2cca12985ff167d58d8b01b46e0ab3bce0"
  - id: "maintenance-experiment"
    title: "July 28 fixes for experiment integrity and captured PDK inputs"
    url: "https://github.com/simra-tech/OpenADA/commit/be174a0761d8a06851c90432632c1b09b75698ba"
  - id: "maintenance-cosim"
    title: "August 3 correction of co-simulation context lifetime and instance state"
    url: "https://github.com/simra-tech/OpenADA/commit/a0128406e23be22a2734fac77523f3dd5a5d7b0a"
---

### Analog scope

The packaged characterization skill asks the model to interpret supplied topology and switching state, trace parameter dependencies and assess sizing tradeoffs. That circuit-understanding operation establishes Design; it is not a claim of an autonomous sizing optimizer. The same workflow separately chooses supported analyses, testbench conditions and the next diagnostic experiment, then uses implemented simulation, extraction and measurement operations. Those stage-specific decisions establish AI Simulation even though native solvers and metric kernels remain deterministic. [Circuit reasoning](#source-reasoning); [Characterization](#source-characterization); [Experiment implementation](#source-experiment).

The layout skill makes the model choose and inspect one geometry increment, localize DRC/LVS failures and select a repair or revert. It connects those decisions to implemented KLayout/Netgen checks and a rendering helper, establishing Layout. Missing PEX, routed timing or other native capabilities remain explicit gaps rather than implemented coverage. [Layout workflow](#source-layout-skill); [KLayout driver](#source-layout-implementation); [Workflow boundaries](#source-engineering-skills).

### Evidence and operating boundaries

Native execution, valid simulation evidence, derived measurements and specification verdicts are separate results. Available transient oscillator metrics do not establish phase-noise analysis. The reviewed preview and experimental skills require external tools and authoritative collateral; project conformance claims were inspected, and no EDA or model campaign was reproduced for this catalog review. [Implemented operations](#source-readme); [Engineering boundaries](#source-engineering-skills).

The Analog and Digital entries cover independently usable workflows in one canonical repository. The Digital entry covers RTL review, mapped synthesis and physical checks. Both retain the same repository identity and activity observation, not independent project histories. [Domain workflows](#source-engineering-skills).

### Maintenance evidence

Follow-up after the July public implementation includes the July 28 correction of captured PDK inputs and experiment-result integrity, followed by the August 3 repair of Verilator context lifetime and per-instance co-simulation state. These are implemented responses to concrete correctness problems and remain on the reviewed default branch. The public implementation history inspected on November 24 ends on August 12; the other published branches and release/tag evidence did not establish later implementation. Retention rests on this observed follow-through, with a short maintenance record and no claim of continuing frequent updates. [Experiment fixes](#source-maintenance-experiment); [Co-simulation fix](#source-maintenance-cosim); [August integration](#source-activity).

### Development provenance

The experiment and conformance changes explicitly credit Codex, include executable orchestration and evidence-validation logic, and remain integrated in the reviewed implementation. This evidence establishes AI-ASSISTED development separately from the model-hosted runtime skills. [Experiment credit](#source-development-1); [Conformance credit](#source-development-2); [Retained operation](#source-experiment).
