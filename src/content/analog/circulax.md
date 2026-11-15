---
name: "Circulax"
aliases: []
summary: "Differentiable electronic and photonic circuit simulation with gradient-based parameter-design examples."
description: "JAX-based electronic and photonic circuit simulator for DC, transient, small-signal, S-parameter and harmonic-balance analyses, with gradient-based parameter optimization examples. It compiles component equations and netlists into differentiable numerical solvers; optional Verilog-A and file-input paths require additional model, compiler or parser dependencies."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-coauthored correction implements fused KLU refactor-and-solve calls and dependency-ordered numeric-handle cleanup, with a JIT regression test. The change is merged and retained in the canonical development branch."
  sources: ["claude-implementation", "solver-pr", "linear-solver"]
  reviewedAt: "2026-11-15"
access: "Apache-2.0 Python source; requires Python >=3.12, JAX and its numerical dependencies, including klujax>=0.5.3,<0.6. Optional Verilog-A uses bosdi and separately compiled models; full file parsing uses a development-pinned NetlistParse dependency. The inverse-design example also imports Optax."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "official"
    title: "Circulax documentation"
    url: "https://gdsfactory.github.io/circulax/"
    purpose: "official"
  - id: "code"
    title: "Canonical Circulax repository"
    url: "https://github.com/gdsfactory/circulax"
    purpose: "code"
  - id: "overview"
    title: "Circuit API and supported numerical analyses"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/ReadMe.md"
  - id: "circuit"
    title: "Implemented circuit compilation and analysis methods"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/circulax/circuit.py"
  - id: "inverse-design"
    title: "Executable LC filter parameter optimization using JAX gradients and Optax"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/examples/inverse_design/01_lc_filter_synthesis.ipynb"
  - id: "small-signal-integration"
    title: "November 3 callable small-signal model implementation and tests"
    url: "https://github.com/gdsfactory/circulax/commit/614d59dc8f8099e3be8c455b837d17c021a28761"
  - id: "small-signal"
    title: "Retained source-driven linearization and response implementation"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/circulax/small_signal.py"
  - id: "activity"
    title: "November 6 integration of the transient refactorization correctness repair"
    url: "https://github.com/gdsfactory/circulax/commit/ed64961f112061dcc34256b6c9fe27f380231faa"
  - id: "claude-implementation"
    title: "Claude-credited executable solver correction and regression test"
    url: "https://github.com/gdsfactory/circulax/commit/341c3215a464ad022ba4408832ac67196a61223e"
  - id: "solver-pr"
    title: "Merged PR 108 with explicit Claude Code attribution and solver limitations"
    url: "https://github.com/gdsfactory/circulax/pull/108"
  - id: "linear-solver"
    title: "Retained KLUSplitQuadratic fused refactor-and-solve implementation"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/circulax/solvers/linear.py"
  - id: "transient"
    title: "Retained transient solver dispatch and numeric-handle cleanup"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/circulax/solvers/transient.py"
  - id: "solver-test"
    title: "Retained JIT refactorization regression against fresh factorization"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/tests/test_transient.py"
  - id: "dependency-integration"
    title: "November 6 klujax lower-bound and lockfile change"
    url: "https://github.com/gdsfactory/circulax/commit/37767e35117690f33035e83ed23ca8a3e9487eed"
  - id: "dependencies"
    title: "Python, numerical dependencies and optional parser/model setup"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/pyproject.toml"
  - id: "license"
    title: "Apache License version 2.0"
    url: "https://github.com/gdsfactory/circulax/blob/2d202ec4475e87af400aa16613b999cd9e319af2/LICENSE"
  - id: "release"
    title: "Circulax v0.2.7, November 6, 2026"
    url: "https://github.com/gdsfactory/circulax/releases/tag/v0.2.7"
---

### Implementation and selection

Circulax implements circuit-equation compilation and DC, transient, small-signal, S-parameter and harmonic-balance analysis. Its LC-filter notebook adjusts component values through a differentiable electrical loss and an executable Adam loop, supporting Design as well as Simulation. Automatic differentiation and numerical parameter optimization alone do not establish runtime AI, and no AI benchmark task or Layout workflow is claimed. [Circuit methods](#source-circuit) · [Parameter-design example](#source-inverse-design)

Selection rests on distinct substantive integrations: November 3 adds reusable source-driven small-signal models, physical response extraction and tests; November 6 repairs KLU refactorization under JIT and adds a regression against fresh factorization. These are reviewed code changes beyond repository creation or release bookkeeping. Circulax has its own circuit compiler and solvers; its SAX-style interface and GDSFactory organization do not make it another record for GDSFactory layout or gsim electromagnetic orchestration. [Small-signal integration](#source-small-signal-integration) · [Retained model](#source-small-signal) · [Solver integration](#source-activity) · [Overview](#source-overview)

### Release, license and dependencies

The actual default is development. The reviewed v0.2.7 tag resolves to the same head, so the solver repair is integrated in that release. The proposed November 6 checkpoint 37767e3 changes a dependency lower bound and lockfile; the meaningful implementation checkpoint instead uses the preceding solver integration ed64961. [Release](#source-release) · [Dependency-only integration](#source-dependency-integration) · [Implementation integration](#source-activity)

The toolkit is Apache-2.0 and declares Python >=3.12. Direct dependencies include NumPy, SciPy, scikit-rf, JAX, Diffrax, SAX, matplotlib, typing-extensions, Lineax, Equinox, Optimistix, klujax and kfnetlist. The reviewed constraints include JAX >=0.7.2,<0.10.0, Lineax 0.1.0 and klujax >=0.5.3,<0.6. The bosdi Verilog-A extra further caps JAX below 0.8; compatible compiled device models are separate requirements. Full file parsing relies on a development-only NetlistParse source pin, despite an empty netlists extra. The LC optimization notebook imports Optax, which is not a declared core dependency. Dependency and model terms remain separate from the toolkit license. [Package declaration](#source-dependencies) · [Example imports](#source-inverse-design) · [License](#source-license)

### Development provenance and limits

Commit 341c321 explicitly credits Claude as coauthor, and merged PR 108 identifies Claude Code. Its executable diff adds fused refactor-and-solve, forwards the cleanup dependency and tests changed Jacobian values inside JIT. The corresponding method, dispatch, cleanup and regression remain at the pinned head. This supports AI-assisted development for that correction, without attributing the project or dependencies as a whole to AI. The separate dependency declaration is not the basis for this label. [Attribution and diff](#source-claude-implementation) · [Merged PR](#source-solver-pr) · [Retained method](#source-linear-solver) · [Dispatch and cleanup](#source-transient) · [Regression](#source-solver-test)

The PR reports a c6288 comparison, which was not independently reproduced here, and discloses that the fused KLU primitive lacks a vmap batching rule. The package remains declared alpha; these sources do not establish unrestricted model coverage or a production-qualified replacement for every SPICE flow. [PR results and boundary](#source-solver-pr) · [Package status](#source-dependencies)

### Activity capture

The activity record pins the actual development head and counts UTC committer dates along its complete 170-commit first-parent chain to the root, reconstructed from public GitHub metadata. Both the proposed dependency checkpoint and the selected solver integration occur on that chain. Merge integrations count once and side branches are excluded. Commit dates are not independently verified push times; November is partial. [Canonical repository](#source-code) · [Meaningful integration](#source-activity)
