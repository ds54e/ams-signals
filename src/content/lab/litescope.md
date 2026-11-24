---
name: "LiteScope"
aliases: ["LiteX logic analyzer"]
description: "LiteX FPGA logic analyzer for triggering on internal digital signals and capturing traces on an evaluation board. Software uploads captures and exports waveforms for inspection, with time interpretation tied to the sample clock and subsampling configuration."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the capture-upload sample accounting repair and associated software regressions."
  sources: [implementation]
  reviewedAt: "2026-11-24"
access: "BSD-2-Clause; integration requires compatible LiteX gateware and a target FPGA."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/enjoy-digital/litescope"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/enjoy-digital/litescope/commit/e2f39268820262dc358af8a135b025b4f908cfab"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/enjoy-digital/litescope/commit/0ebf9b02adeae2d19b04331e05417efeeef05bff"
---

## Scope and limits

The upload fix accounts for samples in FIFO paths. With RLE, storage words do not necessarily equal decoded samples. Software-only driver checks do not establish FPGA timing or analog edge quality.

[Reviewed upstream implementation](#source-implementation).
