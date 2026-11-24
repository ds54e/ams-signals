---
name: "general-simulator"
summary: "Rust PWL circuit and control-block simulation with measured-waveform comparison."
description: "Simulates piecewise-linear circuits and control-block systems in Rust, using a linear-complementarity solver for device conduction states. It can replay measured waveforms and compare modeled outputs with captured traces; ideal diodes and switches support converter and control-loop studies, with semiconductor compact-model physics outside the implemented device scope."
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for implementing file-backed waveform evaluation, shared binary-search interpolation and additional output-channel export. The canonical runtime and CLI retain these executable changes."
  sources: [activity, block-runtime, cli]
  reviewedAt: "2026-11-24"
access: "Public Rust implementation under AGPL-3.0-or-later; published CLI or release binaries provide an entry point. A source checkout also needs the sibling parser, MNA and waveform-measurement crates; embedded Python blocks are optional."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: Canonical public implementation
    url: https://github.com/GLODI-Engineering/general-simulator
    purpose: code
  - id: readme
    title: CLI workflow, dependencies and simulator scope
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/README.md
  - id: activity
    title: Integrated waveform evaluation, output-channel fixes and regression tests
    url: https://github.com/GLODI-Engineering/general-simulator/commit/9e0ca26be76087a2ad2ab158250bba5f7e86cf27
  - id: lcp-solver
    title: Lemke linear-complementarity solver and failure modes
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/crates/lcp-solver/src/lemke.rs
  - id: lcp-tests
    title: Independently derived complementarity fixtures
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/crates/lcp-solver/tests/fixtures.rs
  - id: block-runtime
    title: Circuit/block graph evaluation, capture interpolation and coverage checks
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/crates/dae-runtime/src/block_graph.rs
  - id: cli
    title: CLI execution and additional capture-channel output
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/crates/general-simulator-cli/src/main.rs
  - id: capture-tests
    title: Capture interpolation, end-of-data behavior and inline-waveform equivalence
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/crates/dae-runtime/tests/file_backed_source.rs
  - id: measured-waveforms
    title: Measured-input simulation and reference-waveform comparison workflow
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/book/user-guide/src/measured-waveforms.md
  - id: device-boundary
    title: Implemented ideal-diode and ideal-switch models
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/book/user-guide/src/pwl-devices.md
  - id: vco
    title: Frequency-commanded phase-ramp block and unit tests
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/crates/continuous-blocks/src/vco.rs
  - id: manifest
    title: CLI package license, optional Python support and sibling dependencies
    url: https://github.com/GLODI-Engineering/general-simulator/blob/9e0ca26be76087a2ad2ab158250bba5f7e86cf27/crates/general-simulator-cli/Cargo.toml
---

### Implemented operation and selection

The reusable operation is electrical simulation of a circuit coupled to control blocks. Lemke's algorithm resolves the conducting segment of piecewise-linear devices, while the block runtime handles signals and state. This adds a converter/control-system modeling approach alongside conventional nonlinear SPICE engines. Hand-solved complementarity fixtures exercise the numerical primitive, including failure paths. [Solver](#source-lcp-solver) · [Fixtures](#source-lcp-tests) · [Runtime](#source-block-runtime).

A file-backed source can replay captured stimulus and expose multiple measured channels for comparison with a modeled output. Its interpolation, tail behavior and equivalence to inline waveform points are covered by regression tests. The capture supplies samples to an electrical model; it does not establish a live instrument-control or acquisition workflow, so this entry remains Analog Simulation. [Comparison workflow](#source-measured-waveforms) · [Capture tests](#source-capture-tests).

### Modeling and access boundaries

The implemented active devices are ideal diodes and ideal switches with piecewise-linear behavior, including a switch's body diode. BSIM semiconductor physics is outside this scope. The VCO block integrates a frequency command into a periodic phase ramp for control-loop simulation; it does not establish transistor-level oscillator or phase-noise analysis. [Device models](#source-device-boundary) · [VCO implementation](#source-vco).

The CLI is available as a published crate or release binary. Building a checkout requires the documented sibling parser, MNA and waveform-measurement repositories. Python-backed custom blocks additionally require the optional embedded-interpreter build. [Entry points](#source-readme) · [Dependencies](#source-manifest).

### Activity and development provenance

The reviewed first-parent checkpoint is 2026-11-19T10:31:36Z: file-waveform evaluation, bounded lookup and additional channel export were implemented with regression tests. The same integrated commit credits Claude Opus 5 as a coauthor, and its runtime and CLI changes are retained at the reviewed head. This supports AI-ASSISTED; the reviewed simulation operations are conventional. [Credited implementation](#source-activity) · [Retained runtime](#source-block-runtime) · [Retained CLI](#source-cli).

Review was static. Implementation and tests were inspected; upstream tests, reported converter results and physical-board correlation were not independently rerun.
