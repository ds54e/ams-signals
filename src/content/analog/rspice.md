---
name: RSpice
summary: Rust circuit simulator with schematic editing, SPICE netlist execution and waveform analysis through desktop, browser, CLI and Python interfaces.
description: "Rust SPICE and mixed-signal simulator with schematic editing, Verilog-AMS/wreal, HDL tracing, circuit assertions and selected LTspice special-function devices. SystemVerilog support remains a subset without custom real-net resolution functions; its personal-use license restricts commercial evaluation, prototyping and redistribution without separate permission."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: A commit coauthored with Claude Opus 5 connected solver controls to netlist parsing and executable engine configuration. The current source retains the continuation, damping, solver-backend and timestep handling.
  sources:
  - development-solver-implementation
  - development-solver-retained
  reviewedAt: '2026-10-18'
access: "Public source under RSpice Personal Use License v1.1. Commercial evaluation, prototyping and redistribution are prohibited without express written permission; Rust builds and device/model support remain interface- and platform-specific."
addedAt: '2026-10-18'
reviewedAt: '2026-11-23'
sources:
- id: "official"
  title: "Official project website"
  url: "https://rspice.app/"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/JaimeHW/RSpice
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/README.md
- id: activity
  title: 'Internal HDL variable tracing through .ESAVE'
  url: https://github.com/JaimeHW/RSpice/commit/b7a089985ebd82199950ff35ee1b4086fabfdc9a
- id: implementation-1
  title: 'Reviewed implementation: crates/rspice-core/src/lib.rs'
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/crates/rspice-core/src/lib.rs
- id: implementation-2
  title: 'Reviewed implementation: LICENSE'
  url: https://github.com/JaimeHW/RSpice/blob/b2a4ae3e3d3631c6a1856108d804131fe49a900d/LICENSE
- id: development-solver-implementation
  title: Claude-coauthored solver-control implementation
  url: https://github.com/JaimeHW/RSpice/commit/ffc2332b4e6a76e01261a5887e7da62b5d79bcbb
- id: development-solver-retained
  title: Retained solver-option configuration handling
  url: https://github.com/JaimeHW/RSpice/blob/d22a98635a59592cd184bf713f800bc92929c0af/crates/rspice-core/src/engine/config_resolver.rs
- id: review-20261024-assertions
  title: CLI assertion reports and failing ERROR exit status
  url: https://github.com/JaimeHW/RSpice/commit/52134f205f07a32d31779ca43641b9e567433c14
- id: review-20261024-hdl-traces
  title: Internal HDL variable traces and transient checkpoint handling
  url: https://github.com/JaimeHW/RSpice/commit/b7a089985ebd82199950ff35ee1b4086fabfdc9a
- id: review-20261024-cli
  title: Assertion and HDL diagnostic CLI contract at the reviewed revision
  url: https://github.com/JaimeHW/RSpice/blob/b7a089985ebd82199950ff35ee1b4086fabfdc9a/crates/rspice-cli/README.md
- id: review-20261024-license
  title: RSpice Personal Use License v1.1
  url: https://github.com/JaimeHW/RSpice/blob/b7a089985ebd82199950ff35ee1b4086fabfdc9a/LICENSE
- id: review-20261031-packages
  title: "Implemented package imports and real nettypes"
  url: https://github.com/JaimeHW/RSpice/commit/a512951cc6b865d7b37fde7b0976d1cfcb4da59f
- id: review-20261031-runtime
  title: "Real-nettype execution plan integration"
  url: https://github.com/JaimeHW/RSpice/commit/10186eb7a7d47b5e15e0ed2df28bf6775f4904f9
- id: review-20261031-regression
  title: "Mixed-signal real-nettype versus wreal regression"
  url: https://github.com/JaimeHW/RSpice/blob/e0c2b7e47980e5889b78f19938776eeadc33519a/crates/rspice-core/tests/veriloga_mixed_signal_hardening.rs
- id: review-20261031-boundaries
  title: "Current mixed-language and connect-module boundaries"
  url: https://github.com/JaimeHW/RSpice/blob/e0c2b7e47980e5889b78f19938776eeadc33519a/README.md
- id: review-20261103-timing
  title: "Coupled XSPICE event rounding correction and regressions"
  url: https://github.com/JaimeHW/RSpice/commit/feab81ca22ad61d2de5d23c08cfb7753a300ce38
- id: review-20261107-implementation
  title: "LTspice special-function device implementation and transient regression probes"
  url: https://github.com/JaimeHW/RSpice/commit/eea15a3ef0aa70ab043fa078c5e4807d8b526283
- id: review-20261107-retained
  title: "Retained analog behavioral hosts and device boundaries"
  url: https://github.com/JaimeHW/RSpice/blob/d76b884bb5bde2db76831d9ff919689064ebd4fa/crates/rspice-core-devices/src/device/special_function/mixed.rs
- id: review-20261112-activity
  title: "Preserve mixed-signal converter crossing times across rollback"
  url: https://github.com/JaimeHW/RSpice/commit/37014c3fd64b676750e2db5e782acfa53dd42d60
- id: review-20261112-implementation
  title: "Coupled mixed-signal crossing and event ledger"
  url: https://github.com/JaimeHW/RSpice/blob/37014c3fd64b676750e2db5e782acfa53dd42d60/crates/rspice-core/src/xspice/verilog/mixed.rs
- id: review-20261112-tests
  title: "Converter edge, delayed transition and unknown-band regressions"
  url: https://github.com/JaimeHW/RSpice/blob/37014c3fd64b676750e2db5e782acfa53dd42d60/crates/rspice-core/tests/tri_family_events.rs
- id: review-20261115-event-orbit
  title: PSTB consumes a retained event-shooting orbit
  url: https://github.com/JaimeHW/RSpice/commit/5c083739910060cd16d6add540fc2921b4aa35ea
- id: review-20261115-activity
  title: Refuse unsupported state-controlled switch crossings in PSTB
  url: https://github.com/JaimeHW/RSpice/commit/1aeee91db676d6f34dc2315f19ab9068a3edd7c3
- id: review-20261115-implementation
  title: Retained periodic-stability analysis and carrier restrictions
  url: https://github.com/JaimeHW/RSpice/blob/1aeee91db676d6f34dc2315f19ab9068a3edd7c3/crates/rspice-core/src/engine/pstb.rs
- id: review-20261115-tests
  title: Switched-RL stability and unsupported-crossing regressions
  url: https://github.com/JaimeHW/RSpice/blob/1aeee91db676d6f34dc2315f19ab9068a3edd7c3/crates/rspice-core/tests/periodic/pss_shooting.rs
- id: review-20261123
  title: "SPICE deck editor parameter completion"
  url: "https://github.com/JaimeHW/RSpice/commit/e2dd8f1102f2f87bd4056d8b80baf731000c685c"
---

### Implementation and boundaries

The public core exposes circuit storage, sparse/Newton solvers and analysis engines; the application adds schematic authoring. These are conventional Design and Simulation. GPU, Rust or automation terminology does not establish runtime AI. No simulator accuracy, RF performance or signoff result was reproduced. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The earlier reviewed checkpoint was `b7a089985ebd82199950ff35ee1b4086fabfdc9a` (October 24, 2026 UTC), verified on the captured canonical default branch's first-parent history. It implements internal HDL signal tracing; the preceding October 22 assertion-reporting change is also retained on that history. Latest raw activity and twelve UTC monthly buckets remain separate from the manually reviewed implementation checkpoint. [Meaningful tracing change](#source-activity) · [Assertion implementation](#source-review-20261024-assertions).

### Development provenance

The solver-control implementation explicitly credits Claude Opus 5 as coauthor; its actual parser and engine-configuration changes are integrated in canonical history and retained in the current source. This supports AI-ASSISTED for the retained code contribution. Runtime Design and Simulation remain conventional. [Credited implementation](#source-development-solver-implementation) · [Retained configuration](#source-development-solver-retained).

### Assertions and internal HDL traces

The CLI reports `.ASSERT` checks for operating-point, DC and transient runs. An ERROR-level violation, or an assertion that cannot be evaluated, fails the run with exit code 3 while retaining simulation results; NOTICE/WARNING violations are reported without that failure policy. JSON summary schema 2 includes assertions and HDL diagnostics. These circuit assertions do not establish general SystemVerilog Assertion support. [CLI implementation](#source-review-20261024-assertions) · [Documented report/exit contract](#source-review-20261024-cli).

`.ESAVE` can select internal HDL registers, real variables and vectors by instance path, rejects unknown names, and integrates trace state with transient rollback/checkpoint handling. This extends observable mixed-signal waveforms rather than adding an AI runtime. [Tracing implementation and regression cases](#source-review-20261024-hdl-traces).

These are reviewed default-branch development commits, not independently reproduced simulator results or verified tagged-release coverage. The Personal Use License v1.1 prohibits commercial evaluation/prototyping and redistribution without express written permission; source availability is not an unrestricted open-source grant. Design, Simulation and the existing AI-assisted development classification remain unchanged. [License terms](#source-review-20261024-license).

Package/import binding and real-nettype handling extend beyond syntax parsing into the digital execution plan. A retained mixed-signal regression runs the SystemVerilog real-nettype biquad and compares accepted times, node/branch traces, event traces and prints with its wreal counterpart. This is upstream executable evidence, not a test independently run for the catalog. [Package implementation](#source-review-20261031-packages) · [Execution integration](#source-review-20261031-runtime) · [Regression](#source-review-20261031-regression).

Real-nettype nets accept one driver; custom resolution functions and `interconnect` are rejected. Automatic connect modules apply at deck-node boundaries, while discrete-to-analog boundaries wholly inside HDL hierarchy require exposure at a deck node or an ordinary converter instance. Direct instantiation of a `connectmodule` is refused. These restrictions do not establish full SystemVerilog or Verilog-AMS conformance. The Personal Use License v1.1 restrictions remain unchanged. [Current language boundaries](#source-review-20261031-boundaries) · [License](#source-review-20261024-license).

### Selection and current source review

Continued implementation includes harmonic-balance numerical changes, control-language compatibility work and a coupled XSPICE/HDL event-lattice correction. The reviewed correction prevents rounding a zero-delay code-model output across the instant that scheduled it and updates executable boundary regressions. This supports retention and a new meaningful checkpoint without changing the already adequate description or relaxing its single-driver real-nettype, connect-module and license limits. No RF accuracy, simulator comparison or standards-conformance campaign was independently reproduced. [Timing correction and tests](#source-review-20261103-timing).

### November implementation review

The new LTspice special-function path implements PHASEDET, SAMPLEHOLD, MODULATOR and VARISTOR through analog behavioral hosts, with parameter checks and transient regression probes. Tests include upstream-recorded LTspice reference values, which were not independently reproduced. The implementation explicitly accepts Td without applying a delay for these four devices, and requires exactly one SAMPLEHOLD control mode. This does not establish complete LTspice compatibility. The later corpus-status update marks a PSpice deck accepted/ready without establishing electrical equivalence. [Implementation and regressions](#source-review-20261107-implementation) · [Retained device code](#source-review-20261107-retained).


### November 12, 2026 implementation review

The November 12 correction preserves located converter crossings across rollback and schedules converter events at the crossing plus delay instead of a rounded landing sample. XSPICE bridges, the event ledger and participating coupled HDL paths are covered by regressions for repeated converter edges, delayed register transitions and unknown-band crossings on long timesteps. These are source-inspected tests, not independently reproduced measurements or general SystemVerilog conformance. Existing scope, provenance and commercial-access restrictions remain unchanged. [Integrated activity](#source-review-20261112-activity). [Coupled mixed-signal crossing and event ledger](#source-review-20261112-implementation) · [Converter edge, delayed transition and unknown-band regressions](#source-review-20261112-tests).

### Periodic-stability implementation

Current main extends `.PSTB` Floquet stability analysis to retained driven orbits solved by event shooting, using an inductor loop probe and reducing algebraic or dependent coordinates before reading the multipliers. The switched-RL regression checks one multiplier against `exp(-0.75)` and full probe participation. This is upstream executable evidence, not an independently reproduced stability result. [Event-orbit implementation](#source-review-20261115-event-orbit) · [Retained analysis](#source-review-20261115-implementation) · [Regressions](#source-review-20261115-tests).

PSTB explicitly refuses an event orbit crossing an ideal switch controlled by circuit state when the discrete map lacks the required switching-time sensitivity correction (saltation), and names the switch. PSS can still report that orbit. Harmonic-balance carriers remain unsupported by this PSTB entry point. These are default-branch development changes, with no tagged-release inclusion or general accuracy/conformance result established. The existing Design/Simulation scope, separately sourced AI-development provenance and personal-use restrictions remain unchanged. [Integrated refusal and test](#source-review-20261115-activity) · [Carrier boundary](#source-review-20261115-implementation).

### November 23 source review

The deck editor now pulls supported model and instance parameter completions from the simulator tables. Completion is limited by those tables; the update is not evidence of wider SPICE or Verilog-A compatibility. [Reviewed implementation](#source-review-20261123).
