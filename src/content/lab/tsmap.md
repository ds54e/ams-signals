---
name: "tsmap"
aliases: ["wafermap wafer map"]
description: "Application for inspecting wafer and semiconductor test data in mapped views. It uses the wafermap ecosystem to visualize results and support review of spatial patterns; interpretation still depends on the input coordinate system, bin definitions and missing-die conventions."
scope:
  analysis: { ai: false }
access: "MIT; underlying dependencies have separate terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Project documentation"
    url: "https://wafertools.github.io/tsmap/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/wafertools/tsmap"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/wafertools/tsmap/commit/8cda82b0094acb9add38225ff36a6d0eb1674624"
  - id: wafermap
    title: "wafermap engine"
    url: "https://github.com/wafertools/wafermap"
---

## Scope and limits

Validate coordinates, orientation and bins independently. Visualizations using the same [wafermap engine](#source-wafermap) are not independent validation.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
