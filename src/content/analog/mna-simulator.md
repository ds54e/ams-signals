---
name: "MNA Simulation"
aliases: ["MNA-Simulator", "mna-simulation"]
summary: "Circuit simulation with selected-output linear and nonlinear model-order reduction."
description: "Circuit simulator with a Python front end and C++ numerical core, including selected-output rational Krylov reduction for AC and linearized transient analyses and trajectory piecewise-linear/POD reduction for nonlinear transients. Reduced models execute internally; selected outputs, reference trajectories and error validation bound their applicability."
scope:
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable is co-credited for reorthogonalizing candidate Krylov vectors and adding numerical regression cases. The current C++ basis kernel retains the two-pass projection."
  sources: [basis-fix, basis, mor-tests]
  reviewedAt: "2026-11-25"
access: "Public source; no project-wide reuse license was found in the reviewed tree or project metadata. Third-party dependencies retain their own license notices. Python 3.12 or newer and the native extension are required for the documented current workflow."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/miracleNico/MNA-Simulator"
    purpose: code
  - id: activity
    title: "October 13 transient table-source and stimulus integration"
    url: "https://github.com/miracleNico/MNA-Simulator/commit/dcbdeb5e497a12d973d68ae15c809308c0599af4"
  - id: earlier
    title: "May 23 sparse solver and regression implementation"
    url: "https://github.com/miracleNico/MNA-Simulator/commit/d843c419f27b1e5bb68d5331a29d685e00e011fe"
  - id: native-mor
    title: "October 11 native model-order-reduction kernels"
    url: "https://github.com/miracleNico/MNA-Simulator/commit/3578aae5b4782af9723bc1c18eff554ed5a62cf7"
  - id: basis-fix
    title: "October 11 credited basis reorthogonalization and regression correction"
    url: "https://github.com/miracleNico/MNA-Simulator/commit/04c46a36f4da4f4cfc8500e7a664c282ea1443bd"
  - id: basis
    title: "Retained C++ Krylov basis construction"
    url: "https://github.com/miracleNico/MNA-Simulator/blob/cf0668083b5f1d8906cabcb9daa2cd9d242b5b40/cpp/src/mor/krylov_basis.cpp"
  - id: linear
    title: "Retained selected-output linear reduction interface"
    url: "https://github.com/miracleNico/MNA-Simulator/blob/cf0668083b5f1d8906cabcb9daa2cd9d242b5b40/mna_simulation/mor/linear.py"
  - id: tpwl
    title: "Retained nonlinear trajectory reduction and cache"
    url: "https://github.com/miracleNico/MNA-Simulator/blob/cf0668083b5f1d8906cabcb9daa2cd9d242b5b40/mna_simulation/mor/tpwl.py"
  - id: mor-tests
    title: "Retained native reduction and reference-comparison regressions"
    url: "https://github.com/miracleNico/MNA-Simulator/blob/cf0668083b5f1d8906cabcb9daa2cd9d242b5b40/tests/test_native_mor.py"
  - id: overview
    title: "Analysis coverage and model boundaries"
    url: "https://github.com/miracleNico/MNA-Simulator/blob/cf0668083b5f1d8906cabcb9daa2cd9d242b5b40/README.md"
  - id: packaging
    title: "Python packaging metadata and third-party license notices"
    url: "https://github.com/miracleNico/MNA-Simulator/blob/cf0668083b5f1d8906cabcb9daa2cd9d242b5b40/pyproject.toml"
---

### Implemented operation and limits

The simulator assembles circuit equations and executes optional selected-output reduction. The linear path constructs an input- and output-aware rational Krylov basis and projects the conductance and capacitance matrices; the nonlinear path obtains a full-order training trajectory, derives a POD basis and local linearized models, and caches the resulting TPWL representation for reduced transient evaluation. These are numerical approximation methods, not runtime AI. The result is an internal reduced solve, not a standalone reduced SPICE netlist or a demonstrated passive macromodel synthesis workflow. Model fidelity depends on selected outputs, model order, operating region and the training trajectory; full-order validation or fallback is not proof of accuracy at arbitrary stimuli. [Linear reduction](#source-linear) · [Nonlinear reduction](#source-tpwl) · [Reference regressions](#source-mor-tests).

### Reviewed maintenance and provenance

May adds sparse Krylov execution and tests. October 11 introduces native MOR kernels and corrects nearly dependent basis directions using two passes of classical Gram-Schmidt; the associated change explicitly credits Claude Fable and its implementation remains in the current C++ kernel. October 13 integrates table-based transient stimuli and breakpoint handling. This supports conventional Simulation and AI-assisted development, not independent accuracy or performance certification. The project also includes limited SPICE model-card parsing and physical device equations; it is not a general Verilog-A or foundry compact-model simulator. [May change](#source-earlier) · [Native kernels](#source-native-mor) · [Attributed correction](#source-basis-fix) · [Retained basis](#source-basis) · [October stimulus integration](#source-activity).

The reviewed repository exposes its source, but the project metadata and root tree do not declare a project-wide license. The packaging file lists third-party license notices only; no permission to redistribute the project's own code is inferred. No solver, reduction benchmark, or regression was independently executed. [Packaging](#source-packaging) · [Workflow](#source-overview).
