---
name: "wavetools"
aliases: []
description: "Command-line tools for extracting and comparing selected signals from RTL simulation waveforms in VCD or FST. They support scripted regression triage without opening a viewer; matching traces under the selected names, time normalization and value tolerances does not establish formal equivalence."
scope: {"verification": {"ai": false}}
access: "Public Rust tools; operations and supported value handling vary by command and format."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/hudson-trading/wavetools"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/hudson-trading/wavetools/commit/5345b6bd6d377ec263c9bc5d0441d1a08fcf6142"
  - id: release
    title: "Published releases including v0.1.3"
    url: "https://github.com/hudson-trading/wavetools/releases"
  - id: read-ahead
    title: "Bounded comparison read-ahead"
    url: "https://github.com/hudson-trading/wavetools/commit/2a0bf2f868e02107d22753464e1d89b2cf21abde"
---

### Scope and evidence

Scriptable extraction and comparison of RTL traces is Verification, distinct from interactive browsing in a waveform viewer. Check name matching, timescale, X/Z handling and the real-value tolerance when interpreting a difference. November read-ahead and equal-infinity fixes are default-branch changes after the reviewed v0.1.3 release, not features attributed to that release. [Release history](#source-release) · [Read-ahead](#source-read-ahead) · [Real comparison](#source-activity).
