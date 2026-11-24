---
name: "Joulescope Driver"
aliases: ["pyjoulescope-driver"]
description: "Driver and APIs for streaming current and voltage from supported Joulescope instruments. It exposes device control, samples and statistics for automated power profiling, with acquisition limits set by the device and selected configuration."
scope:
  control: { ai: false }
  acquisition: { ai: false }
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
---

## Scope and limits

Current and energy results depend on hardware range, calibration, sample continuity and integration window. Public driver code does not imply public instrument hardware.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
