---
name: "Palace"
aliases: []
summary: "Parallel finite-element electromagnetic solver for eigenmode, driven-frequency, transient, electrostatic and magnetostatic analyses."
description: "Parallel finite-element electromagnetic solver for eigenmode, driven-frequency, transient, electrostatic and magnetostatic analyses. Configured meshes, materials and boundary conditions yield field responses and capacitance or inductance matrices, with explicit geometry preparation and numerical convergence requirements separating it from automatic layout signoff."
scope:
  simulation:
    ai: false
access: "Public C++ implementation; its MPI/MFEM/libCEED-based build or supported packaged environment and prepared meshes are required."
addedAt: "2026-10-22"
reviewedAt: "2026-10-22"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/awslabs/palace"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/awslabs/palace/blob/29ad351f916e47e005a43730513f155eeb634e3e/README.md"
  - id: "implementation-1"
    title: "Reviewed source: palace/driver.cpp"
    url: "https://github.com/awslabs/palace/blob/29ad351f916e47e005a43730513f155eeb634e3e/palace/driver.cpp"
  - id: "implementation-2"
    title: "Reviewed source: docs/src/guide/problem.md"
    url: "https://github.com/awslabs/palace/blob/29ad351f916e47e005a43730513f155eeb634e3e/docs/src/guide/problem.md"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #952 from awslabs/hughcars/driven-sampling-validation"
    url: "https://github.com/awslabs/palace/commit/29ad351f916e47e005a43730513f155eeb634e3e"
---

### Implemented operations and boundaries

The solver exposes driven, eigenmode, transient, electrostatic and magnetostatic problems. GDS/PDK conversion, material assumptions and numerical convergence are separate from solving the resulting finite-element problem.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-21T19:09:06Z (`29ad351f916e47e005a43730513f155eeb634e3e`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.
