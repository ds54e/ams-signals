---
name: "OpenADA"
aliases: []
description: "Local agent-to-EDA interface for circuit simulation, measurement, synthesis and DRC/LVS operations. Drivers translate structured intent into native tool actions, including ngspice/Xyce, Yosys and KLayout paths, and return evidence while preserving the original design and result files."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer credits Codex with implementing the experiment runner and conformance-receipt verification work. These additions provide experiment orchestration and validation of recorded execution evidence within OpenADA."
  sources: ["development-1", "development-2", "development-3"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
    title: "Merge bet2/tbplan-ir: testbench-plan IR (closed schema, deterministic compiler w/ DUT sealing, comparator implementing the 12 ratified pll2 meta-rows, execution runner w/ per-condition receipts, CLI + conformance) integrated with osc-primitives main; all seven signed semantic receipts regenerated via the native workflow; 107 domain + 40 osc + 50 semantic-coverage tests pass, release verifier 279 rows zero gaps"
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
---


### Implementation context

Agent skills consume implemented local CLI operations and structured results. The normative MCP binding remains future work. [Reviewed source](#source-readme).

### Release boundary

Experimental oscillator/testbench profiles are bounded. The reverted knowledge-graph spike and planned remote/MCP adapters are not counted as implemented scope. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Explicit drivers expose RTL checks/tests and layout DRC/LVS with retained evidence. Mapped Yosys synthesis is an exposed operation with netlist and evidence outputs; synthesis-stage timing is not physical closure. No RTL editing is inferred from netlisting or tool integration. [Reviewed source](#source-readme).

Deterministic drivers expose synthesis, verification and physical-check operations to external agents. The contract/interface itself does not implement an AI decision-maker for those stages; future MCP plans do not change that assessment. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The maintainer explicitly credits Codex implementation of the experiment operation and conformance campaign. Inspected code supplies substantial orchestration/artifact validation and receipt verification, retained as current modules. [Experiment implementation](#source-development-1); [Conformance campaign](#source-development-2); [Current experiment operation](#source-development-3).
