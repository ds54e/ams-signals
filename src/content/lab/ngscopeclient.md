---
name: "ngscopeclient"
aliases: ["scopehal scopehal-apps"]
description: "Oscilloscope and instrument frontend with acquisition and waveform-analysis tools. It uses scopehal for instrument support and analysis, including eye diagrams and timing measurements whose interpretation depends on the reference clock and acquisition setup."
scope:
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
---

## Scope and limits

Reference selection and instrument bandwidth govern timing measurements. [scopehal](#source-scopehal) is shared implementation, not independent validation.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
