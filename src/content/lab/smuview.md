---
name: "SmuView"
aliases: ["SMU View"]
description: "Graphical application for logging and controlling instruments such as meters, power supplies and electronic loads. It captures and plots low-rate measurements and derives channels such as integrated charge or energy; it is not an oscilloscope acquisition frontend."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "GPL-3.0-or-later application; supported functions depend on the device driver."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/knarfS/smuview"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/knarfS/smuview/commit/6f35ca9698c0d595e8759d9b6dcb40306e934727"
---

## Scope and limits

Interpolated rows are not proof of trigger-level synchronization. Summed charge or energy does not establish aperture-level current accuracy.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
