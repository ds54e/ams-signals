---
name: "Joulescope Driver"
aliases: ["pyjoulescope-driver"]
description: "Driver and APIs for streaming current and voltage from supported Joulescope instruments. It exposes device control, samples and statistics for automated power profiling, with acquisition limits set by the device and selected configuration."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for fixing streams that stall after a sample-ID restart or a dead USB read pipe. The reviewed buffer implementation retains restart handling."
  sources: [activity, development-retained]
  reviewedAt: "2026-11-24"
access: "Apache-2.0 driver; Joulescope measurement hardware is separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/jetperch/joulescope_driver"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/jetperch/joulescope_driver/commit/0ed3d68081db4097ab338f505b03a50b78c7adbe"
  - id: development-retained
    title: "Retained buffer restart and gap handling"
    url: "https://github.com/jetperch/joulescope_driver/blob/0ed3d68081db4097ab338f505b03a50b78c7adbe/src/buffer_signal.c"
---

## Scope and limits

Current and energy results depend on hardware range, calibration, sample continuity and integration window. Public driver code does not imply public instrument hardware.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

The host buffer fills retained gaps with NaN for float samples and zero for packed integer samples; the base-level float summary excludes NaNs. A finite average or zero-valued digital sample does not establish gap-free acquisition. Check sample IDs, coverage and the integration interval separately. [Buffer implementation](#source-development-retained).
