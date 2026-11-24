---
name: "ThunderScope / TS.NET"
aliases: []
description: "Capture and control stack for the ThunderScope oscilloscope. TS.NET consumes the hardware ADC stream, applies trigger processing and serves acquisition data to clients; usable rates and calibration depend on the board, firmware, DMA driver and host."
scope: {"control": {"ai": false}, "acquisition": {"ai": false}}
access: "Public TS.NET source; requires supported ThunderScope hardware and compatible firmware/host drivers."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/EEVengers/TS.NET"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/EEVengers/TS.NET/commit/e9bd916631807ce09c91caf15e1916c9579db367"
  - id: website
    title: "ThunderScope official setup guide"
    url: "https://docs.eevengers.com/ThunderScope/latest/Getting-Started.html"
    purpose: official
  - id: release
    title: "TS.NET v0.3.1"
    url: "https://github.com/EEVengers/TS.NET/releases/tag/v0.3.1"
  - id: sequence
    title: "Acquisition sequence number preservation"
    url: "https://github.com/EEVengers/TS.NET/commit/0c83e8875c476e7e50a11d4f5e78da54a74dd222"
---

### Scope and evidence

This entry follows the TS.NET implementation and links to the associated hardware documentation. It describes ADC-stream and trigger/control behavior, not fabrication files or a distinct saved-waveform analysis application. ngscopeclient is a separate frontend. The reviewed main incorporates user calibration loading after the documented v0.3.1 package; that change is not an independent instrument calibration. [Setup](#source-website) · [Release](#source-release) · [Sequence](#source-sequence) · [Calibration loading](#source-activity).
