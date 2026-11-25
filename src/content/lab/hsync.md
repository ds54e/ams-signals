---
name: "HSync"
aliases: ["uiharu"]
description: "Logic analyzer application with Rust device drivers for supported DSLogic, ATK-Logic, PX-Logic and SLogic hardware, bus decoding and digital timing measurements. It also reopens saved captures for decoding and export; device support and sustained acquisition rates depend on the model, firmware and host."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "Public source with Apache-2.0 and GPL-3.0-or-later components; bundled firmware has separate terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Official user guide and device limitations"
    url: "https://github.com/HalfSweet/HSync/blob/afd04c732a7e6fe439da2429b57dfe83b65dc003/docs/user-guide.md"
    purpose: official
  - id: code
    title: "Canonical application, Rust drivers and decoder engine"
    url: "https://github.com/HalfSweet/HSync"
    purpose: code
  - id: activity
    title: "SLogic capture completion, throughput and regression fixes"
    url: "https://github.com/HalfSweet/HSync/commit/06c20b5db9f3df5076899985b562b0bced1c2256"
  - id: prior-stream-fix
    title: "Separate USB reception and conversion to prevent sample loss"
    url: "https://github.com/HalfSweet/HSync/commit/2593a6ceb5bd11ee738fe1b064d4f4d06dcd539d"
  - id: usage
    title: "Installation, supported devices and reported hardware testing"
    url: "https://github.com/HalfSweet/HSync/blob/afd04c732a7e6fe439da2429b57dfe83b65dc003/README.md"
  - id: capture-driver
    title: "SLogic USB acquisition and bounded stream processing"
    url: "https://github.com/HalfSweet/HSync/blob/afd04c732a7e6fe439da2429b57dfe83b65dc003/crates/hsync-slogic/src/acquisition.rs"
  - id: capture-regression
    title: "Emulated-device capture, overflow and teardown regressions"
    url: "https://github.com/HalfSweet/HSync/blob/afd04c732a7e6fe439da2429b57dfe83b65dc003/crates/hsync-slogic/tests/acquisition.rs"
  - id: recorded-decoding
    title: "Saved capture reopening, decoding, search and edge-count tests"
    url: "https://github.com/HalfSweet/HSync/blob/afd04c732a7e6fe439da2429b57dfe83b65dc003/crates/hsync-session/tests/decoding.rs"
  - id: licenses
    title: "Workspace license declaration"
    url: "https://github.com/HalfSweet/HSync/blob/afd04c732a7e6fe439da2429b57dfe83b65dc003/Cargo.toml"
  - id: maintenance-earlier
    title: "October 2026 SWD sampling-edge and protocol-decoder correction"
    url: "https://github.com/HalfSweet/HSync/commit/9479eef6d23e4678aaf5fefff9fdb8b633905731"
  - id: release
    title: "HSync v0.2.9 release published in November 2026"
    url: "https://github.com/HalfSweet/HSync/releases/tag/v0.2.9"
  - id: openscilab
    title: "Related instrument and simulated measurement-flow application"
    url: "https://github.com/dekajoule/openSciLab/blob/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec/README.md"
---

## Selection and scope

HSync adds a desktop workflow for external logic analyzers, with its own Rust device drivers, capture storage and uiharu decoder engine. It is useful for observing a board's configuration buses, trigger relationships and digital edge timing. The operational difference from Glasgow is the frontend and streaming support for existing analyzer families; it does not require building a programmable interface applet. The bundled demo and saved-file workflow provide a hardware-free entry point. [Installation and device support](#source-usage).

Control follows device settings and triggers; Acquisition follows the implemented USB streaming path. Analysis is independently supported by reopening saved captures, rerunning decoders, searching decoded events and counting edges. Importing simulator waveforms does not change the primary external-measurement workflow. The driver mocks and software regression tests support the implementation claims without adding a Test stage. [Acquisition implementation](#source-capture-driver) · [Capture regressions](#source-capture-regression) · [Recorded decoding](#source-recorded-decoding).

## Use and limits

The reviewed README reports testing on a DSLogic U2Pro16. Its longer supported-device table is not evidence of physical validation of every model. In particular, SLogic Combo 8 command traces and simulated captures are documented while real-device validation remains pending. Thresholds, triggers, firmware requirements and channel/rate combinations vary by model; high-rate streaming is limited by USB and host processing. [User guide](#source-website) · [Reported hardware testing](#source-usage).

Use the timing views within the analyzer's sampling, threshold and clock accuracy limits. They do not establish precision jitter or phase-noise performance. Native drivers include GPL components, and the separate firmware terms also matter when redistributing packages. [Driver provenance](#source-capture-driver) · [Workspace licenses](#source-licenses).

## Reviewed maintenance

The October 2026 SWD decoder correction changes target-bit sampling and protocol-state handling. November changes then separate USB reception from conversion and repair finite-capture completion, throughput detection and buffer reuse after unaligned triggers. Regressions cover the affected decoder and capture paths. [SWD correction](#source-maintenance-earlier) · [Stream correction](#source-prior-stream-fix) · [Capture corrections](#source-activity).

The observed corrections and public releases span October–November 2026, including v0.2.9. They show early follow-through on released workflows; the review cannot yet establish a longer maintenance record. [Release](#source-release).

## Related workflow

The related [openSciLab application](#source-openscilab) overlaps in logic capture and protocol decoding, but adds visual or Python measurement-flow execution with real and simulated devices. HSync retains its distinct native analyzer-driver and recorded-capture workflow. Device compatibility, decoding behavior and activity must be assessed separately.
