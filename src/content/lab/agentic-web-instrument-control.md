---
name: "Agentic Web Instrument Control"
aliases: ["AWIC"]
description: "Rust instrument server with native USB drivers for supported FX2 oscilloscopes and logic analyzers. Browser, SCPI and MCP clients share instrument state, capture storage, protocol decoding and measurements. A seeded virtual bench provides reproducible diagnostic exercises with injected faults; physical scope amplitude calibration has explicit limits."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is co-credited for the October 15 correction of decimated-frame timing and sparse digital-channel selection. The reviewed graph implementation retains executable regression tests for frame placement."
  sources: ["earlier","graph-tests"]
  reviewedAt: "2026-11-28"
access: "MPL-2.0; compatible FX2 instruments, USB access and the appropriate separate firmware are required for physical capture. Virtual bench available."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical AWIC source"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl"
    purpose: code
  - id: readme
    title: "Supported physical and virtual instruments"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/blob/961a9886084f02d2759bdf94503de5532837099a/README.md"
  - id: activity
    title: "November 20 shared serial-session force-close integration"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/commit/961a9886084f02d2759bdf94503de5532837099a"
  - id: earlier
    title: "October 15 credited capture-display timing and channel corrections"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/commit/f8aee115a9fac59437064b042aa6d4671ae964cf"
  - id: graph-tests
    title: "Retained executable frame-placement regressions"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/blob/961a9886084f02d2759bdf94503de5532837099a/web/src/modules/graph/traces.test.ts"
  - id: driver
    title: "Native USB scope acquisition and sample-rate validation"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/blob/961a9886084f02d2759bdf94503de5532837099a/crates/awic-native/src/fx2scope/driver.rs"
  - id: decoder
    title: "UART decoding implementation"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/blob/961a9886084f02d2759bdf94503de5532837099a/crates/awic-decode/src/uart.rs"
  - id: features
    title: "Implemented and planned instrument operations and calibration limits"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/blob/961a9886084f02d2759bdf94503de5532837099a/docs/FEATURES.md"
  - id: recording
    title: "November 19 recording and decoder-summary integration"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/commit/e33cc204bf5a70f4945f64afa194d9bee82f335e"
  - id: virtual-bench
    title: "Repeatable virtual bench and externally observable diagnostic exercises"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/blob/961a9886084f02d2759bdf94503de5532837099a/docs/DEMOS.md"
  - id: virtual-tests
    title: "Server integration tests for simulated instrument power and fault control"
    url: "https://github.com/mrn2se/AgenticWebInstrumentControl/blob/961a9886084f02d2759bdf94503de5532837099a/crates/awic-server/tests/sim_bench.rs"
---

## Scope and limits

The native FX2 capture driver and shared instrument core are distinct from general SCPI wrappers or MCP adapters over a vendor GUI. The browser and programmatic interfaces use the same device state. Captures support measurements, decoding and pattern queries. October corrects decimated-frame time spans and channel selection; November adds recording and decoder summaries and a shared serial-session release operation. [Native driver](#source-driver) · [Decoder](#source-decoder) · [Earlier correction](#source-earlier) · [Recording](#source-recording) · [Activity](#source-activity).

Control, Acquisition and Analysis concern implemented instrument operations. The MCP endpoint lets an external model select tools, but the deterministic driver and measurement/decoder operations do not by themselves establish a distinct implemented model-driven workflow. The credited executable frame corrections and retained tests support AI-ASSISTED development. [Features](#source-features) · [Graph tests](#source-graph-tests).

The oscilloscope's absolute amplitude offset calibration is incomplete; supported sample-rate and transport behavior is device-specific. Captures may be decimated, and missing transitions cannot be reconstructed from aggregate buckets. The project is early; hardware claims and regressions were not independently reproduced. [Overview](#source-readme) · [Features](#source-features).

## November 28, 2026 implementation review

Test covers the user-facing `awic --sim` virtual bench, not the project's ordinary unit tests. The simulated trainer board supplies UART, I2C, SPI and analog signals through the same instrument interfaces used for physical captures. A seed controls wiring and fault timing; users can inject faults or run blind diagnostic exercises. Server integration tests exercise virtual USB hotplug and fault configuration. This is a bounded, repeatable instrument/system-test fixture distinct from a generic VISA response simulator or programmable device state-machine framework. The operator controls the scenario; an external agent uses the ordinary MCP tools, so no autonomous model-driven test evaluator is claimed. No physical instrument, upstream test suite or modeled fault accuracy was independently validated. [Virtual bench](#source-virtual-bench) · [Integration tests](#source-virtual-tests).
