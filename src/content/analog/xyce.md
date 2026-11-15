---
name: "Xyce"
aliases: []
summary: "Runs SPICE-compatible circuit analyses on serial and parallel platforms."
description: "Sandia-developed SPICE-compatible circuit simulator with DC, transient, AC, noise and harmonic-balance analyses. Its C++ implementation supports MPI-based parallel execution and compact-device models, with an XDM netlist translator for adapting supported external SPICE syntax."
scope:
  simulation:
    ai: false
access: "Public C++ implementation; build and solver-library requirements are documented by Sandia."
addedAt: "2026-09-05"
reviewedAt: "2026-11-15"
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://xyce.sandia.gov/"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/Xyce/Xyce"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/Xyce/Xyce/blob/6243c628a36dbf6431424722d7f5265e22752c4a/README.md"
  - id: "activity"
    title: "GeneralExternal error-weight masks and optional dependency discovery, September 21, 2026"
    url: "https://github.com/Xyce/Xyce/commit/6243c628a36dbf6431424722d7f5265e22752c4a"
  - id: "review-20261115-integration"
    title: "October 19 master correctness and Python-interface integration"
    url: "https://github.com/Xyce/Xyce/commit/e5b7b9bb5b221630c66654c059fc2d33524f5b21"
  - id: "review-20261115-analysis"
    title: "Retained missing-primary-analysis guard"
    url: "https://github.com/Xyce/Xyce/blob/e5b7b9bb5b221630c66654c059fc2d33524f5b21/src/AnalysisPKG/N_ANP_AnalysisManager.C"
  - id: "review-20261115-expression"
    title: "Retained node-versus-device expression lookup"
    url: "https://github.com/Xyce/Xyce/blob/e5b7b9bb5b221630c66654c059fc2d33524f5b21/src/UtilityPKG/ExpressionSrc/deviceExpressionGroup.C"
  - id: "review-20261115-pymi"
    title: "Retained nanobind Python-model harness"
    url: "https://github.com/Xyce/Xyce/blob/e5b7b9bb5b221630c66654c059fc2d33524f5b21/src/test/GenExtTestHarnesses/Xyce-PyMi.C.in"
  - id: "review-20261115-base-device"
    title: "Attribute-based model interface, legacy adapter and existing tests"
    url: "https://github.com/Xyce/Xyce/blob/e5b7b9bb5b221630c66654c059fc2d33524f5b21/utils/PythonModelInterface/BaseDevice.py"
  - id: "review-20261115-pymi-build"
    title: "Optional Python-model interpreter build requirements"
    url: "https://github.com/Xyce/Xyce/blob/e5b7b9bb5b221630c66654c059fc2d33524f5b21/src/test/GenExtTestHarnesses/CMakeLists.txt"
  - id: "review-20261115-release"
    title: "Published Xyce 7.10 GitHub release, July 21, 2025"
    url: "https://github.com/Xyce/Xyce/releases/tag/Release-7.10.0"
  - id: "review-20261115-readme"
    title: "Current master history restart and binary/source boundary"
    url: "https://github.com/Xyce/Xyce/blob/e5b7b9bb5b221630c66654c059fc2d33524f5b21/README.md"
---

### Scope

Takes circuit netlists and device models into numerical analyses, including harmonic balance and sensitivity calculations. These are Simulation operations. Parallel execution is implemented through MPI and solver interfaces. [Project scope](#source-readme).

### Release boundary

The GitHub source is the open implementation; proprietary models supplied in some binary installers are not attributed to this tree. The project restarted its master history from the 7.9 release; activity uses only the current first-parent history, without grafting old_master. [Repository boundary](#source-readme).

The September 21 master integration adds time-integrator error-weight masks for GeneralExternal internal variables, exposes them through Xyce-PyMi and optionally discovers the Xyce_Dependencies CMake package. This was the meaningful checkpoint at the earlier review, distinct from the preceding August build-system integration; the November 15 review below supersedes it. [Reviewed implementation](#source-activity).

### Scope classification

SPICE-compatible analyses, compact models and parallel circuit execution are the central user-facing capabilities. [Reviewed source](#source-readme).

Parallel SPICE-compatible analyses and compact-device evaluation are conventional Simulation. Parallel numerical algorithms do not imply AI. [AI/stage evidence](#source-readme).

### Reviewed master integration, November 15, 2026

The October 19 master integration is substantive: expression lookup now distinguishes voltage-node names from device-instance names, and missing primary analysis allocation returns failure before solver initialization. It also migrates the optional Xyce-PyMi harness to nanobind and an attribute-based Python model interface with a legacy-signature adapter and explicit finalization. The retained harness and BaseDevice tests were inspected as source; no simulator or upstream test execution was performed. This integration supersedes September 21 as the manually reviewed meaningful checkpoint. [Integrated diff](#source-review-20261115-integration) · [Analysis guard](#source-review-20261115-analysis) · [Typed lookup](#source-review-20261115-expression) · [Harness](#source-review-20261115-pymi) · [Interface and tests](#source-review-20261115-base-device).

The optional interpreter requires Python 3.10 or newer and nanobind, with static Python libraries rejected by its build configuration. These are master-source changes; the latest listed GitHub release remains 7.10, published July 21, 2025, and later binary-release inclusion is not established here. The current master tip still equals the previously captured head, so all twelve repository counts, its October 19 latest date and its November 3 capture timestamp are retained. The 7.9 history restart is preserved without grafting old_master. Conventional Simulation, public description and existing provenance classification are unchanged. [Build boundary](#source-review-20261115-pymi-build) · [Published release](#source-review-20261115-release) · [Source/history boundary](#source-review-20261115-readme).
