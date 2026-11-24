---
name: "tsmap"
aliases: ["wafermap wafer map"]
description: "Desktop and browser application for comparing semiconductor wafer maps and test results from STDF, ATDF, CSV, JSON and Parquet files. It offers column mapping, test selection and multi-wafer loading for spatial review; coordinates, bin definitions and the selected measurements determine how records are interpreted."
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
  - id: load-pipeline
    title: "Implemented format mapping, test selection and multi-file loading"
    url: "https://github.com/wafertools/tsmap/blob/d343fe9bd609a080184c3bfdbd512ed7a50cbbb0/src/loadPipeline.ts"
  - id: desktop-browser
    title: "Desktop and browser parser adapters"
    url: "https://github.com/wafertools/tsmap/blob/d343fe9bd609a080184c3bfdbd512ed7a50cbbb0/src/platform.ts"
  - id: parsers
    title: "Bundled native and WASM format parsers"
    url: "https://github.com/wafertools/tsmap/blob/d343fe9bd609a080184c3bfdbd512ed7a50cbbb0/packages/parsers/src/lib.rs"
---

## Scope and limits

Validate coordinates, orientation and bins independently. Visualizations using the same [wafermap engine](#source-wafermap) are not independent validation.

The retained workflow is interactive multi-file and multi-format wafer review, including a browser build. The load pipeline maps CSV/JSON/Parquet columns, selects tests before full STDF/ATDF loading and combines chosen wafers for display. Its bundled parsers target native and WASM execution; the rendering engine is a separate dependency. Browser access and mapped imports are distinct reasons to choose this workflow alongside parser APIs and STDF-focused desktop viewers. [Load pipeline](#source-load-pipeline) · [Desktop/browser adapters](#source-desktop-browser) · [Parser implementations](#source-parsers).

The [implementation checkpoint](#source-activity) corrects loading of multiple sessions as distinct files. Repository activity does not establish hardware accuracy or independent validation of the input records.
