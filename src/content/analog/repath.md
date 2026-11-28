---
name: "repath"
aliases: []
summary: "Browser-local schematic editor and coupled analog/digital simulator with automatic bridges."
description: "Browser-local schematic editor and Rust/WASM mixed-signal circuit simulator. Couples modified nodal analog analysis with event-driven digital components using threshold and ramp-based domain bridges; supports DC, AC and transient experiments, but lacks sparse solving, noise/distortion analysis and advanced compact MOS models."
scope:
  design: { ai: false }
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5 is co-credited on the September 22 diode AC series-resistance correction and digital-loop error handling. The current semiconductor implementation retains the corrected series-resistance stamp."
  sources: ["earlier","diode"]
  reviewedAt: "2026-11-28"
access: "MIT; browser execution or a local Rust, Node.js and WASM build."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical repath source"
    url: "https://github.com/Agustin-Delgado/repath"
    purpose: code
  - id: readme
    title: "Browser workflow and explicit simulator limits"
    url: "https://github.com/Agustin-Delgado/repath/blob/be973dba0e7af3e16b731f536b2b07d91d6af253/README.md"
  - id: activity
    title: "November 21 interactive execution and editor integration"
    url: "https://github.com/Agustin-Delgado/repath/commit/be973dba0e7af3e16b731f536b2b07d91d6af253"
  - id: earlier
    title: "September 22 credited solver and diode AC corrections"
    url: "https://github.com/Agustin-Delgado/repath/commit/79de9a5c5db54c81890594ab9581c53b472a11c0"
  - id: diode
    title: "Retained diode small-signal stamp"
    url: "https://github.com/Agustin-Delgado/repath/blob/be973dba0e7af3e16b731f536b2b07d91d6af253/crates/repath-core/src/elements/semiconductor.rs"
  - id: bridge
    title: "Analog/digital thresholds and bridge implementations"
    url: "https://github.com/Agustin-Delgado/repath/blob/be973dba0e7af3e16b731f536b2b07d91d6af253/crates/repath-core/src/bridge.rs"
  - id: solver
    title: "Coupled transient scheduler and analog solver"
    url: "https://github.com/Agustin-Delgado/repath/blob/be973dba0e7af3e16b731f536b2b07d91d6af253/crates/repath-core/src/solver.rs"
  - id: editor
    title: "Retained browser schematic editing implementation"
    url: "https://github.com/Agustin-Delgado/repath/blob/be973dba0e7af3e16b731f536b2b07d91d6af253/web/src/lib/canvas/editor.ts"
  - id: interactive-test
    title: "Interactive execution workload"
    url: "https://github.com/Agustin-Delgado/repath/blob/be973dba0e7af3e16b731f536b2b07d91d6af253/crates/repath-core/examples/press_storm.rs"
---

### Implementation and selection

The browser editor and local WASM solver expose a direct schematic-to-simulation workflow. ADC bridges detect/interpolate threshold crossings and DAC bridges use finite transition ramps; the analog stepper considers digital events that affect analog nodes. The September diode AC and zero-delay digital-loop corrections precede the November interactive-execution and editor work. This is distinct from a browser interface over a remote SPICE server or a standalone electrical solver library. [Editor](#source-editor) · [Bridges](#source-bridge) · [Solver](#source-solver) · [Earlier repair](#source-earlier) · [Interactive workload](#source-interactive-test).

### Scope and limits

Design covers schematic editing; Simulation covers conventional analog and event-driven component execution. The reviewed scope is appropriate for circuit/behavioral experiments; it is not full HDL co-simulation, a foundry-PDK verification environment or transistor-level signoff. The README explicitly excludes sparse solving, noise and distortion analysis and advanced MOSFET models. The credited diode correction is retained in current source; development assistance is separate from runtime AI. Upstream tests and performance claims were not independently reproduced. [Overview](#source-readme) · [Diode](#source-diode) · [Integration](#source-activity).
