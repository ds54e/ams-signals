---
name: "gsim"
aliases: []
summary: "Simulation interface connecting GDSFactory layouts to electromagnetic solvers through geometry, meshing and port setup."
description: "Connects GDSFactory layouts to electromagnetic solvers through geometry, meshes, ports, network responses and capacitance/inductance matrices. Palace and Meep support local execution with suitable runtimes; authenticated cloud jobs remain separate. The reviewed package requires GDSFactory 9, with optional FEMwell and DEVSIM workflows."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing conversion from SParams to a scikit-rf Network. The canonical result adapter retains frequency-unit conversion and complex multiport matrix construction."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public Python implementation requiring Python 3.12 and the declared GDSFactory/GDSFactory+ versions. Local Palace supports a supplied binary or Linux x86_64 runtime download; local Meep requires a suitable Python environment. Authenticated cloud execution and optional solver extras have separate requirements."
addedAt: "2026-10-22"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/gdsfactory/gsim"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/README.md"
  - id: "implementation-1"
    title: "Reviewed source: pyproject.toml"
    url: "https://github.com/gdsfactory/gsim/blob/30b1659f49e4e2ec3eac259aa9fc94abcb4c99be/pyproject.toml"
  - id: "implementation-2"
    title: "Reviewed source: src/gsim/palace/__init__.py"
    url: "https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/src/gsim/palace/__init__.py"
  - id: "activity"
    title: "Reviewed meaningful change: contain disconnected sidewalls in the FDTD physical domain (#418)"
    url: "https://github.com/gdsfactory/gsim/commit/fe55668055bd3aaea944a4e8fde03a73f728cd1d"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/gdsfactory/gsim/commit/d7a33127dcd4b1d18db2a0a05e2199ab457f86cf
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/gdsfactory/gsim/blob/0b3a3a1c9d8e9e2fe54ff0e766a9b11064dfc97a/src/gsim/palace/results.py
  - id: website
    title: Official project website and documentation
    url: https://gdsfactory.github.io/gsim/
    purpose: official
  - id: review-20261031-stack
    title: "PDK-authoritative layer-stack resolution for Palace and Meep"
    url: https://github.com/gdsfactory/gsim/commit/b5d858801191920ec502fe7a2bedfb4226abfe15
  - id: review-20261031-ports
    title: "Terminal S-parameters assembled from multimode wave-port runs"
    url: https://github.com/gdsfactory/gsim/blob/9f31460946f5c3f036fb91bc32a2ed1bc38245ce/src/gsim/palace/terminal_ports/assembly.py
  - id: review-20261031-electrooptic
    title: "Optional FEMwell adapter and TCAD-driven traveling-wave modulator workflow"
    url: https://github.com/gdsfactory/gsim/commit/16c7ac6a3d760570944dde79f018a0cc7cef9bc9
  - id: review-20261031-dependencies
    title: "Current dependency and optional-extra constraints"
    url: https://github.com/gdsfactory/gsim/blob/9f31460946f5c3f036fb91bc32a2ed1bc38245ce/pyproject.toml
  - id: runtime-dependencies
    title: "Current Python, GDSFactory and optional solver requirements"
    url: https://github.com/gdsfactory/gsim/blob/af7487391abcf45636cbc9228772e733b7662a8e/pyproject.toml
  - id: palace-runtime
    title: "Local Palace executable resolution and optional runtime download"
    url: https://github.com/gdsfactory/gsim/blob/af7487391abcf45636cbc9228772e733b7662a8e/src/gsim/palace/runtime.py
  - id: meep-local
    title: "Local Meep script execution and S-parameter result loading"
    url: https://github.com/gdsfactory/gsim/blob/af7487391abcf45636cbc9228772e733b7662a8e/src/gsim/meep/simulation.py
  - id: magnetostatic-integration
    title: "November 11 magnetostatic simulation and inductance extraction"
    url: "https://github.com/gdsfactory/gsim/commit/76d4bdcf587e98333337e4c00e362c53eb83bc64"
  - id: inductance-results
    title: "Retained inductance matrix loader and checks"
    url: "https://github.com/gdsfactory/gsim/blob/17326e9f659681fecc57fe159eecabe87d78c059/src/gsim/palace/inductance.py"
  - id: complex-mode-integration
    title: "November 17 complex boundary-mode impedance repair"
    url: "https://github.com/gdsfactory/gsim/commit/46253ac33783f71787cdfbfa1b5dc08ccc0d9c7a"
  - id: complex-mode-tests
    title: "Retained complex and legacy impedance regression cases"
    url: "https://github.com/gdsfactory/gsim/blob/17326e9f659681fecc57fe159eecabe87d78c059/tests/palace/test_complex_mode_impedance.py"
---

### Implemented operations and boundaries

The current source declares version 0.10.0, Python `~=3.12.0`, `gdsfactory>=9,<10` and `gdsfactoryplus>=1.8.20,<3`. Its supported dependency range must be checked against the chosen GDSFactory installation; the catalog's separate GDSFactory listing does not guarantee cross-version compatibility. [Current package requirements](#source-runtime-dependencies).

[Project overview](#source-readme); [Source 1](#source-implementation-1); [Source 2](#source-implementation-2).

### Scope and activity review

The exposed operations support Simulation. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

Sidewall-domain clipping and PDK-stack integration provide substantive implementation evidence. Source review and package versions remain separate from the captured repository history and its meaningful checkpoint. [Sidewall implementation](#source-activity) · [Stack integration](#source-review-20261031-stack).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for implementing conversion from SParams to a scikit-rf Network. The canonical result adapter retains frequency-unit conversion and complex multiport matrix construction. This supports AI-ASSISTED. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).

The opt-in PDK-authoritative stack preserves layer elevation, thickness, material and mesh order instead of reconstructing them from generic assumptions. The Palace terminal-port pipeline joins driven-run modal S-parameters with aligned two-dimensional voltage/current matrices; its mode ordering and gauge requirements still apply. [Stack integration](#source-review-20261031-stack) · [Terminal assembly](#source-review-20261031-ports).

The optional FEMwell adapter and DEVSIM-based traveling-wave modulator examples add mode solving, carrier-dependent material transfer and electro-optic response calculations. These are implementation and example workflows, not independent validation against silicon. The current TCAD extra requires DEVSIM plus a BLAS/LAPACK provider, with platform constraints documented in the package declaration. [Electro-optic workflow](#source-review-20261031-electrooptic) · [Current dependencies](#source-runtime-dependencies).

### Local and cloud execution

Palace runtime resolution accepts a user-supplied executable, then supported packaged or cached paths; on Linux x86_64 it can download and cache a prebuilt CPU runtime when enabled. The resolver and launcher expose failures instead of making the cloud service a prerequisite for all Palace work. Local Meep writes a configuration, layout and runner script, executes them with a Python environment containing Meep, and reads S-parameter results; MPI execution additionally needs its launcher. Authenticated cloud submission remains a separate path. [Palace runtime](#source-palace-runtime) · [Local Meep execution](#source-meep-local).

### November implementation

November 11 adds a Palace magnetostatic workflow with current-source setup, inductance matrix loading, self/mutual inductance, coupling and convergence/physical-consistency checks. These are magnetostatic results, not frequency-dependent winding resistance or independently calibrated inductor models. November 17 corrects complex boundary-mode impedance parsing and calculation, retaining legacy scalar input without inventing its missing phase. Tests cover indices, complex values and unavailable-data behavior. November 17 supersedes the earlier checkpoint within the saved capture. The project remains a general simulation interface rather than an independent solver. No Palace run or numerical comparison was independently performed. [Magnetostatic integration](#source-magnetostatic-integration) · [Inductance results](#source-inductance-results) · [Impedance correction](#source-complex-mode-integration) · [Regression cases](#source-complex-mode-tests).
