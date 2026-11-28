---
name: "sindr"
aliases: ["sindr-rs"]
summary: "Embeddable typed Rust analog solver with externally stepped transient sessions."
description: "Embeddable Rust circuit simulator with typed circuit and result APIs, SPICE-subset import, DC, transient, AC, noise and sensitivity analyses. An externally stepped transient session supports changing inputs and stopping at threshold crossings; device ratings and specification checks are exposed, but MOSFET models are Level 1 rather than BSIM."
scope:
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is co-credited on the November 25 integration exposing complex branch currents in AC results and adding executable regression coverage. The reviewed implementation retains the AC result accessors."
  sources: ["activity","ac-results"]
  reviewedAt: "2026-11-28"
access: "Public Rust crates, MIT or Apache-2.0; native and WebAssembly builds. Reference comparisons require ngspice."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical sindr repository"
    url: "https://github.com/steffendybvik/sindr-rs"
    purpose: code
  - id: readme
    title: "Typed circuit API, supported analyses and comparison summaries"
    url: "https://github.com/steffendybvik/sindr-rs/blob/2205aa6d923d98f7bf834dadf782e6ffde4d7f04/README.md"
  - id: activity
    title: "Version 0.3.1 solver corrections and AC branch-current integration"
    url: "https://github.com/steffendybvik/sindr-rs/commit/2205aa6d923d98f7bf834dadf782e6ffde4d7f04"
  - id: earlier
    title: "June 25 SPICE parser and input validation changes"
    url: "https://github.com/steffendybvik/sindr-rs/commit/2be3018c91b6fa9f7fc07ef12d438d544f97d6bf"
  - id: library
    title: "Public library operation and data model"
    url: "https://github.com/steffendybvik/sindr-rs/blob/2205aa6d923d98f7bf834dadf782e6ffde4d7f04/sindr/src/lib.rs"
  - id: session
    title: "Externally stepped transient session"
    url: "https://github.com/steffendybvik/sindr-rs/blob/2205aa6d923d98f7bf834dadf782e6ffde4d7f04/sindr/src/session.rs"
  - id: session-tests
    title: "Transient session waveform and event regressions"
    url: "https://github.com/steffendybvik/sindr-rs/blob/2205aa6d923d98f7bf834dadf782e6ffde4d7f04/sindr/tests/transient_session.rs"
  - id: ac-results
    title: "AC result and branch-current implementation"
    url: "https://github.com/steffendybvik/sindr-rs/blob/2205aa6d923d98f7bf834dadf782e6ffde4d7f04/sindr/src/ac_analysis.rs"
  - id: limitations
    title: "Model and analysis limitations"
    url: "https://github.com/steffendybvik/sindr-rs/blob/2205aa6d923d98f7bf834dadf782e6ffde4d7f04/LIMITATIONS.md"
  - id: accuracy
    title: "Author-reported reference comparison scope"
    url: "https://github.com/steffendybvik/sindr-rs/blob/2205aa6d923d98f7bf834dadf782e6ffde4d7f04/docs/ACCURACY.md"
---

### Implementation and selection

The independent value is an embeddable, typed circuit and result interface with a persistent transient session. The caller can advance the analog solver to a specified time, change sources or parameters and return early at a threshold event, without constructing a separate SPICE process for each call. This is a useful external coupling interface, not an HDL simulator or a bundled firmware co-simulator. Tests compare stepped and uninterrupted RC transients and exercise source changes and events. June parser development and November solver/API improvements demonstrate substantive follow-through. [Library](#source-library) · [Session](#source-session) · [Session tests](#source-session-tests) · [Earlier change](#source-earlier) · [Activity](#source-activity).

### Scope and limits

Simulation is conventional. Rating checks and specification measurements are numerical post-processing of modeled circuits. Model cards are restricted; the MOSFET model is Level 1 with the body tied to the source, not a four-terminal foundry BSIM model. Verilog-A and general HDL ingestion are absent. Published ngspice comparisons are restricted to the tested examples; this review did not reproduce accuracy, performance or hardware ratings. [Limitations](#source-limitations) · [Accuracy](#source-accuracy).

The reviewed integration explicitly credits Claude for AC branch-current accessors and other executable changes. The retained implementation supports the AI-ASSISTED development label separately from numerical runtime behavior. [Activity](#source-activity) · [AC results](#source-ac-results).
