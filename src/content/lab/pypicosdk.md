---
name: "pyPicoSDK"
aliases: []
description: "Pico Technology’s Python interface for configuring supported PicoScope oscilloscopes and collecting block or streamed samples through PicoSDK. Capture modes and limits depend on the model, driver and buffers; returning samples or driver timing estimates does not establish calibrated accuracy."
scope: {"control": {"ai": false}, "acquisition": {"ai": false}}
access: "Public Python wrapper; compatible PicoScope hardware and separate PicoSDK native drivers are required."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/picotech/pyPicoSDK"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/picotech/pyPicoSDK/commit/2ad6ac4b255fd36dc107e16f74b1f8239e0159be"
  - id: website
    title: "Pico Technology’s official pyPicoSDK guide"
    url: "https://www.picotech.com/library/knowledge-bases/oscilloscopes/pypicosdk-get-started"
    purpose: official
  - id: release
    title: "Published pyPicoSDK 1.7.5"
    url: "https://pypi.org/project/pypicosdk/1.7.5/"
  - id: stream
    title: "Streaming session implementation"
    url: "https://github.com/picotech/pyPicoSDK/commit/1c5673eb8cbf2b096008855bf95d43c65a568209"
  - id: trigger
    title: "Trigger metadata correction across segments"
    url: "https://github.com/picotech/pyPicoSDK/commit/c77885160ec19dd7ef7c53acdadea723e87eddb3"
---

### Scope and maintenance

Control covers instrument settings and triggers; Acquisition covers requesting samples from an active instrument. This is not a saved-waveform decoder or an independent electrical analysis package. Select the newer pyPicoSDK API as the catalog entry; the official guide distinguishes the older low-level wrapper. No hardware run or calibration was performed. [Official guide](#source-website).

July added a streaming session loop; August fixed segment trigger metadata; October corrected the type used for the driver’s block-capture timing estimate on selected families. The October source fix is not part of the reviewed 1.7.5 distribution. [Streaming](#source-stream) · [Segments](#source-trigger) · [Block capture](#source-activity) · [Published version](#source-release).
