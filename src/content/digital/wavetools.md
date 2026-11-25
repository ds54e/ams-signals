---
name: "wavetools"
aliases: []
description: "Command-line tools for extracting and comparing selected signals from RTL simulation waveforms in VCD or FST. They support scripted regression triage without opening a viewer; use matching timescales and check same-time event ordering before interpreting comparison results."
scope: {"verification": {"ai": false}}
access: "Public Rust tools; operations and supported value handling vary by command and format."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/hudson-trading/wavetools"
    purpose: code
  - id: activity
    title: "November 24 abbreviated VCD vector comparison correction"
    url: "https://github.com/hudson-trading/wavetools/commit/0c4d501f0273b2cd4d4b71a03f3d962737a79ca9"
  - id: real-infinity
    title: "November 18 equal-infinity real sample comparison correction"
    url: "https://github.com/hudson-trading/wavetools/commit/5345b6bd6d377ec263c9bc5d0441d1a08fcf6142"
  - id: release
    title: "Published releases including v0.1.3"
    url: "https://github.com/hudson-trading/wavetools/releases"
  - id: read-ahead
    title: "Bounded comparison read-ahead"
    url: "https://github.com/hudson-trading/wavetools/commit/2a0bf2f868e02107d22753464e1d89b2cf21abde"
  - id: timescale
    title: "Open fix for mismatched timescales"
    url: "https://github.com/hudson-trading/wavetools/pull/41"
  - id: delta-order
    title: "Open fix for same-time event ordering"
    url: "https://github.com/hudson-trading/wavetools/pull/42"
  - id: vector-width
    title: "Merged fix for abbreviated VCD vectors"
    url: "https://github.com/hudson-trading/wavetools/pull/43"
  - id: comparison-code
    title: "Reviewed timestamp, event and value comparison implementation"
    url: "https://github.com/hudson-trading/wavetools/blob/ebbd304b6c62bc7390a3f8d06c0b699e0e8dcbfb/src/diff.rs"
  - id: vector-tests
    title: "Retained VCD/FST round-trip comparison regression"
    url: "https://github.com/hudson-trading/wavetools/blob/ebbd304b6c62bc7390a3f8d06c0b699e0e8dcbfb/tests/output_tests.rs"
---

### Scope and evidence

Scriptable extraction and comparison of RTL traces is Verification, distinct from interactive browsing in a waveform viewer. Check name matching, timescale, X/Z handling and the real-value tolerance when interpreting a difference. November read-ahead and equal-infinity fixes are default-branch changes after the reviewed v0.1.3 release, not features attributed to that release. [Release history](#source-release) · [Read-ahead](#source-read-ahead) · [Real comparison](#source-real-infinity).

November 24 integrates left-extension of abbreviated VCD four-state values, including X and Z, in the comparison path and adds a cross-format regression. The reviewed code retains this correction; use compatible declared signal widths. The separate timescale and same-time event-order fixes remain open: comparison still uses raw timestamps and same-time buffering can yield false matches or differences. Matching traces do not establish formal equivalence. [Integrated change](#source-activity) · [Reviewed implementation](#source-comparison-code) · [Round-trip regression](#source-vector-tests) · [Timescale](#source-timescale) · [Event ordering](#source-delta-order) · [Vector width](#source-vector-width). No regression or simulator run was independently executed.
