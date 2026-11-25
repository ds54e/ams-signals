---
name: "gr-signal-hound"
aliases: ["Signal Hound GNU Radio"]
description: "GNU Radio out-of-tree module for supported Signal Hound RF analyzers and signal generators. Its blocks configure hardware and expose complex I/Q streams for external signal-processing flowgraphs, with USB and model-specific network connections through the vendor device APIs."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "GPL-3.0-or-later implementation files; requires compatible GNU Radio, hardware and separate vendor SDK libraries."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/SignalHound/gr-signal-hound"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/SignalHound/gr-signal-hound/commit/7295722bbfeb59d3e3a7cfc7b20b44857fd65ef9"
  - id: ethernet-support
    title: "SM200C and SM435C integration"
    url: "https://github.com/SignalHound/gr-signal-hound/commit/4c2475fd63e415638a8208a7332f6a49647f2aec"
  - id: sm-stream
    title: "Retained SM-series I/Q streaming source"
    url: "https://github.com/SignalHound/gr-signal-hound/blob/13217d9902f240d34ac085406ddcdb92e2a1f223/lib/sm_series_impl.cc"
  - id: bb-stream
    title: "Retained BB-series device selection and streaming source"
    url: "https://github.com/SignalHound/gr-signal-hound/blob/13217d9902f240d34ac085406ddcdb92e2a1f223/lib/bb_series_impl.cc"
---

## Scope and limits

The GNU Radio block implementation configures real RF hardware and delivers complex samples to a user-authored flowgraph. This differs from remote instrument command drivers and saved-record spectral analysis. Signal processing in other GNU Radio blocks does not add an Analysis stage to this module. No calibrated phase-noise floor, cross-instrument synchronization or validated jitter measurement is implied. [SM stream](#source-sm-stream) · [BB stream](#source-bb-stream).

## Reviewed maintenance

February 2026 adds SM200C and SM435C model and network parameters to the SM-series block and bindings. September extends BB-series blocks with explicit serial-number selection, retained in the current source. These are functional additions after the October 2025 initial implementation despite sparse activity. [Network support](#source-ethernet-support) · [Serial selection](#source-activity).
