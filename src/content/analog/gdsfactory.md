---
name: "GDSFactory"
aliases: []
summary: "Python library for parametric chip-layout generation, hierarchical composition and electrical or photonic routing."
description: "Python library for parametric chip-layout generation, hierarchical composition and electrical or photonic routing. A released agent skill guides model-driven component generation and visual iteration; geometry export remains in the core library, while electromagnetic simulation and commercial extensions are separate integrations."
scope:
  layout:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for repairing component-sequence connections without replacing electrical ports. The retained executable sample allows cross-section mismatches while preserving the original port identities for layout export."
  sources: [activity, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python implementation; a compatible kfactory/KLayout stack and suitable PDK definitions are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/gdsfactory/gdsfactory"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/gdsfactory/gdsfactory/blob/727e64e67753810da456a9b8fcd9bfc09939c36b/README.md"
  - id: "implementation-1"
    title: "Reviewed source: gdsfactory/routing/add_electrical_pads_top.py"
    url: "https://github.com/gdsfactory/gdsfactory/blob/727e64e67753810da456a9b8fcd9bfc09939c36b/gdsfactory/routing/add_electrical_pads_top.py"
  - id: "implementation-2"
    title: "Reviewed source: docs/notebooks/04_routing_electrical.py"
    url: "https://github.com/gdsfactory/gdsfactory/blob/727e64e67753810da456a9b8fcd9bfc09939c36b/docs/notebooks/04_routing_electrical.py"
  - id: "implementation-3"
    title: "Reviewed source: .agents/skills/gdsfactory-component-designer/SKILL.md"
    url: "https://github.com/gdsfactory/gdsfactory/blob/727e64e67753810da456a9b8fcd9bfc09939c36b/.agents/skills/gdsfactory-component-designer/SKILL.md"
  - id: "activity"
    title: "Reviewed meaningful change: Feat/extrude config (#4898)"
    url: "https://github.com/gdsfactory/gdsfactory/commit/8b6fe0ae8db7eac245a9b67d1fece75fc8d3aa6a"
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/gdsfactory/gdsfactory/blob/727e64e67753810da456a9b8fcd9bfc09939c36b/gdsfactory/samples/16_component_sequence2.py
---

### Implemented operations and boundaries

The core contains electrical-pad/routing operations. A released component-designer skill specifies model-driven component generation, visualization and iterative modification, establishing optional AI Layout for that component workflow. It does not establish AI Simulation or attribute GDSFactory+ or gsim solvers to the core. The observed main is 10.0.0rc1.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Layout. The AI prefix describes the optional implemented model-hosted workflow or the explicitly evaluated AI task. It does not classify the conventional checker or numerical engine as AI.

The meaningful checkpoint is 2026-10-17T05:20:16Z (`8b6fe0ae8db7eac245a9b67d1fece75fc8d3aa6a`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for repairing component-sequence connections without replacing electrical ports. The retained executable sample allows cross-section mismatches while preserving the original port identities for layout export. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-activity) · [Retained implementation](#source-development-retained-20261022).
