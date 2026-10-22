---
name: "Vyges LVS"
aliases: []
summary: "Experimental layout-versus-schematic netlist comparator with structural refinement, explicit device/net bijection and divergence diagnostics."
description: "Experimental layout-versus-schematic netlist comparator with structural refinement, explicit device/net bijection and divergence diagnostics. It checks supported SPICE primitives and shared device parameters, while extraction coverage, parameter availability and matching assumptions limit its use as an independent development-time comparison path."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing the release workflow guard that checks a tag against the crate version. The canonical workflow retains this executable build check; it does not establish AI authorship of the shared extraction dependency."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Rust implementation; supported SPICE inputs or separately prepared extraction artifacts are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/vyges-tools/lvs"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/vyges-tools/lvs/blob/e88382a0a14e7988492f57ba0d389401444b6c1e/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/compare.rs"
    url: "https://github.com/vyges-tools/lvs/blob/e88382a0a14e7988492f57ba0d389401444b6c1e/src/compare.rs"
  - id: "implementation-2"
    title: "Reviewed source: src/main.rs"
    url: "https://github.com/vyges-tools/lvs/blob/e88382a0a14e7988492f57ba0d389401444b6c1e/src/main.rs"
  - id: "activity"
    title: "Reviewed meaningful change: CLI diagnostics through vyges-events: errors and warnings as structured events under this engine's own codes, the usage plain"
    url: "https://github.com/vyges-tools/lvs/commit/e5c882dd541a600fce48fc48d0aa721535a16bb7"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/vyges-tools/lvs/commit/e59538bdb1b2744e9e49f46e22b888d24052f99b
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/vyges-tools/lvs/blob/94a82bf411d0bfa3e40091f2d4bbeb83133eb146/.github/workflows/release.yml
---

### Implemented operations and boundaries

The comparator confirms structural refinement with an explicit bijection. Device parameters are compared only when present on both sides, with supported primitive/engineering-suffix handling and stated tolerance; omitted values are not proven equivalent. Layout extraction is a separate or limited front-end operation.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Layout. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-16T18:48:09Z (`e5c882dd541a600fce48fc48d0aa721535a16bb7`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing the release workflow guard that checks a tag against the crate version. The canonical workflow retains this executable build check; it does not establish AI authorship of the shared extraction dependency. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
