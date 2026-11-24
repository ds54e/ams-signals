---
name: "ngscopeclient"
aliases: ["scopehal scopehal-apps"]
description: "Oscilloscope and instrument frontend for configuring supported hardware, acquiring traces and analyzing waveforms. It provides instrument timebase and trigger controls alongside analysis tools such as eye diagrams and timing measurements; available settings depend on the connected instrument and driver."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "BSD-3-Clause application; drivers and supported instruments determine access."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://www.ngscopeclient.org/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/ngscopeclient/scopehal-apps"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/ngscopeclient/scopehal-apps/commit/40673ea2beef99ff2844845f804ed753cdb321cd"
  - id: scopehal
    title: "scopehal instrument and analysis library"
    url: "https://github.com/ngscopeclient/scopehal"
  - id: trigger-controls
    title: "Implemented oscilloscope trigger controls"
    url: "https://github.com/ngscopeclient/scopehal-apps/blob/4841cc8f19f1fcd6dceba146fd0c306bcb5b543f/src/ngscopeclient/TriggerPropertiesDialog.cpp"
---

## Scope and limits

Reference selection and instrument bandwidth govern timing measurements. [scopehal](#source-scopehal) is shared implementation, not independent validation.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

The trigger dialog controls instrument settings, rather than merely viewing previously captured waveforms. [Implemented controls](#source-trigger-controls).
