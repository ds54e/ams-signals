---
name: "OpenADA"
aliases: []
description: "Agent skills and local EDA drivers for evidence-backed RTL review, Liberty-mapped synthesis, timing analysis and incremental layout checks. Hosted models diagnose results and select controlled experiments through implemented CLI operations; Yosys, Verilator, OpenSTA, KLayout and Netgen retain responsibility for execution and engineering verdicts."
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
reviewedAt: "2026-10-01"
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
---


### Implementation context

Agent skills consume implemented local CLI operations and structured results. The normative MCP binding remains future work. [Reviewed source](#source-readme).

### Release boundary

Experimental oscillator/testbench profiles are bounded. The reverted knowledge-graph spike and planned remote/MCP adapters are not counted as implemented scope. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

The released synthesis skill interprets mapping/inference evidence and chooses controlled experiments; the RTL-review skill diagnoses lint and structural results; the layout skill selects and reviews geometry increments and repairs from DRC/LVS evidence. These substantive model-hosted workflows connect to implemented operations and establish AI Synthesis, AI Verification and AI Layout. The driver/kernel verdicts remain conventional. [Synthesis skill](#source-synthesis-skill); [RTL review](#source-rtl-skill); [Layout skill](#source-layout-skill); [Mapped synthesis](#source-synthesis-implementation).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The maintainer explicitly credits Codex implementation of the experiment operation and conformance campaign. Inspected code supplies substantial orchestration/artifact validation and receipt verification, retained as current modules. [Experiment implementation](#source-development-1); [Conformance campaign](#source-development-2); [Current experiment operation](#source-development-3).

### Current-source review

Reviewed 2026-10-01. The AI prefixes refer to the packaged host-agent skills, not to the transport or an embedded model inside deterministic drivers. Local CLI integration is implemented; the normative MCP binding is still future work. Ideal-interconnect timing and bounded physical checks are not comprehensive signoff. [README](#source-readme); [Layout implementation](#source-implementation).
