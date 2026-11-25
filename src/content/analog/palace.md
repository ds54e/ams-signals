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
reviewedAt: "2026-11-25"
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
  - id: website
    title: Official project website and documentation
    url: https://awslabs.github.io/palace/
    purpose: official
  - id: "activity-20261115"
    title: "Match saved and PROM frequencies to sample frequencies"
    url: "https://github.com/awslabs/palace/commit/6e185f2413d6c4c8c16e0953f0be345342a95e95"
  - id: "config-20261115"
    title: "Nearest-sample matching before frequency index scans"
    url: "https://github.com/awslabs/palace/blob/6e185f2413d6c4c8c16e0953f0be345342a95e95/palace/utils/configfile.cpp"
  - id: "tests-20261115"
    title: "Rounding regression for saved and PROM frequencies"
    url: "https://github.com/awslabs/palace/blob/6e185f2413d6c4c8c16e0953f0be345342a95e95/test/unit/test-config.cpp"
  - id: "requirements-20261115"
    title: "Current compiler, MPI and optional GPU requirements"
    url: "https://github.com/awslabs/palace/blob/6e185f2413d6c4c8c16e0953f0be345342a95e95/README.md"
  - id: "release-20261115"
    title: "Palace v0.19.0 stable release"
    url: "https://github.com/awslabs/palace/releases/tag/v0.19.0"
  - id: adaptive-certification
    title: "November 19 integration of adaptive sweep PROM certification"
    url: "https://github.com/awslabs/palace/commit/0ed2f3306d0ca4755296a2edcd5c6e0635b3e623"
  - id: adaptive-driver
    title: "Retained certification and full-order fallback"
    url: "https://github.com/awslabs/palace/blob/49bb1d479c2dfa1fc517bea578afeb969929333f/palace/drivers/drivensolver.cpp"
  - id: adaptive-tests
    title: "Retained reduced-model and certification tests"
    url: "https://github.com/awslabs/palace/blob/49bb1d479c2dfa1fc517bea578afeb969929333f/test/unit/test-romoperator.cpp"
  - id: parallel-mesh
    title: "November 19 parallel nonconforming mesh I/O"
    url: "https://github.com/awslabs/palace/commit/158836ecbd371d189b378806b21010b1d7c872c5"
---

### Implemented operations and boundaries

The solver exposes driven, eigenmode, transient, electrostatic and magnetostatic problems. GDS/PDK conversion, material assumptions and numerical convergence are separate from solving the resulting finite-element problem.

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The earlier reviewed checkpoint was 2026-10-21T19:09:06Z (`29ad351f916e47e005a43730513f155eeb634e3e`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun. Development provenance was not assigned without a separate retained-code attribution review.

### Current implementation and release boundary

The November 13 main revision matches saved and PROM frequencies to the nearest sampled frequency before exact index scans. This prevents driven sweeps from aborting when overlapping sample ranges differ only by floating-point rounding. The regression uses adjacent representable values and checks both saved and PROM indices. This is conventional Simulation maintenance. [Repair](#source-activity-20261115); [implementation](#source-config-20261115); [regression](#source-tests-20261115).

The latest verified stable release is v0.19.0, published November 3; the reviewed repair follows that tag. Current source requires CMake 3.27 or newer, a C++20 compiler, MPI and BLAS/LAPACK; GPU execution additionally requires CUDA or ROCm. The finite-element dependencies and prepared-mesh/convergence requirements remain. This static review did not build Palace, acquire its dependencies or run its numerical tests. [Stable release](#source-release-20261115); [requirements](#source-requirements-20261115).

### November 19 implementation

The adaptive driven sweep uses a projection-based reduced-order model (PROM) solution as the initial guess of a full-order solve. Certification requires convergence and a sufficiently small correction; failed certification falls back to a solve from zero. Tests distinguish the solver tolerance, correction limit and basis dependence. The same day integrates parallel I/O for supported adapted nonconforming meshes, avoiding a full mesh gather at the root rank on that path; unsupported meshes retain a gather fallback. November 19 supersedes the November 13 checkpoint in the saved capture. These are development-source changes; no solver run, numerical accuracy or memory benchmark was independently reproduced. [Adaptive integration](#source-adaptive-certification) · [Driver](#source-adaptive-driver) · [Tests](#source-adaptive-tests) · [Mesh integration](#source-parallel-mesh).
