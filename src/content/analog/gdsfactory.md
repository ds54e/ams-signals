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
reviewedAt: "2026-11-15"
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
  - id: website
    title: Official project website and documentation
    url: https://gdsfactory.github.io/gdsfactory/
    purpose: official
  - id: "activity-review-20261115"
    title: "Restore PDK layer indexes on reactivation"
    url: "https://github.com/gdsfactory/gdsfactory/commit/596617d115aaddda8424888b34b685f5a9750c9e"
  - id: "implementation-review-20261115"
    title: "Retained PDK layer-restoration implementation"
    url: "https://github.com/gdsfactory/gdsfactory/blob/946864e77860dbe1ab81135e597b5d499af2f93e/gdsfactory/pdk.py"
  - id: "tests-review-20261115"
    title: "PDK reactivation and geometry-preservation regressions"
    url: "https://github.com/gdsfactory/gdsfactory/blob/946864e77860dbe1ab81135e597b5d499af2f93e/tests/test_pdk.py"
  - id: "release-review-20261115"
    title: "Published stable GDSFactory v9.51.0"
    url: "https://github.com/gdsfactory/gdsfactory/releases/tag/v9.51.0"
  - id: "skill-release-review-20261115"
    title: "Component-designer skill at the stable release commit"
    url: "https://github.com/gdsfactory/gdsfactory/blob/d3b218d916fe8d8601c46ff49edf9e32bca65cef/.agents/skills/gdsfactory-component-designer/SKILL.md"
  - id: "helper-release-review-20261115"
    title: "Executable component-visualization helper at the stable release commit"
    url: "https://github.com/gdsfactory/gdsfactory/blob/d3b218d916fe8d8601c46ff49edf9e32bca65cef/.agents/skills/gdsfactory-component-designer/scripts/visualize_component.py"
---

### Implemented operations and boundaries

The core contains electrical-pad/routing operations. A released component-designer skill specifies model-driven component generation, visualization and iterative modification, establishing optional AI Layout for that component workflow. It does not establish AI Simulation or attribute GDSFactory+ or gsim solvers to the core. The reviewed main declares 10.0.0rc1; its new fixes are development work, separate from stable v9.51.0.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2); [Source 3](#source-implementation-3).

### Scope and activity review

The exposed operations support Layout. The AI prefix describes the optional implemented model-hosted workflow or the explicitly evaluated AI task. It does not classify the conventional checker or numerical engine as AI.

The meaningful checkpoint is the November 12 PDK reactivation repair (`596617d115aaddda8424888b34b685f5a9750c9e`), reviewed from its implementation and regressions. The later material-card commit remains the raw head. [Implementation activity](#source-activity-review-20261115).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for repairing component-sequence connections without replacing electrical ports. The retained executable sample allows cross-section mismatches while preserving the original port identities for layout export. This supports AI-ASSISTED. [Credited change](#source-activity) · [Retained implementation](#source-development-retained-20261022).

### Current development and release boundary

The PDK reactivation repair restores layer-enum indexes, relocates foreign layers with their shapes, merges duplicate registrations and temporarily unlocks cells before restoring their lock state. Published regressions cover occupied, swapped, missing and duplicate layer registrations and retained geometry; they were inspected, not executed. Switching to a different PDK still clears cached cells, so this repair does not promise that existing components survive a PDK switch. [Implementation](#source-implementation-review-20261115) · [Regressions](#source-tests-review-20261115).

The stable v9.51.0 tag and reviewed main have diverged; these development fixes are not attributed to that release. The tagged source already contains the component-designer skill and its executable visualization helper: the model chooses component parameters and modifications, while the helper invokes the library and renders geometry. This supports the existing optional AI Layout classification, independently of development attribution or generic AI configuration files. It adds no AI Simulation claim. [Stable release](#source-release-review-20261115) · [Released task workflow](#source-skill-release-review-20261115) · [Executable helper](#source-helper-release-review-20261115).
