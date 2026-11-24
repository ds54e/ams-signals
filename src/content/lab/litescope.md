---
name: "LiteScope"
aliases: ["LiteX logic analyzer"]
description: "LiteX FPGA logic analyzer for triggering on internal digital signals and capturing traces on an evaluation board. Software uploads captures and exports waveforms for inspection, with time interpretation tied to the sample clock and subsampling configuration."
scope:
  control: { ai: false }
  acquisition: { ai: false }
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
  - id: capture-workflow
    title: "Reviewed capture and export workflow"
    url: "https://github.com/enjoy-digital/litescope/blob/b28dcccea1009fa983684cabd55e61e4082d53a1/README.md"
  - id: litex-platform
    title: "Related LiteX FPGA SoC builder"
    url: "https://github.com/enjoy-digital/litex"
---

## Scope and limits

The upload fix accounts for samples in FIFO paths. With RLE, storage words do not necessarily equal decoded samples. Software-only driver checks do not establish FPGA timing or analog edge quality.

[Reviewed upstream implementation](#source-implementation).

The reviewed core, driver and CLI acquire, decode and export traces. Viewing or interpreting the exported traces with another tool is not a separate LiteScope Analysis capability. [Capture workflow](#source-capture-workflow).

LiteX supplies the SoC and FPGA flow; LiteScope supplies the separately usable triggered trace-capture workflow. The two entries do not count the same operation as bench acquisition. [SoC builder](#source-litex-platform).
