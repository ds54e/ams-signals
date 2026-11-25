---
name: "tsmap"
aliases: ["wafermap wafer map"]
description: "Desktop and browser application for comparing semiconductor wafer maps and test results from STDF, ATDF, CSV, JSON and Parquet files. It offers column mapping, test selection and multi-wafer loading for spatial review; coordinates, bin definitions and the selected measurements determine how records are interpreted."
scope:
  analysis: { ai: false }
access: "MIT; underlying dependencies have separate terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
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
  - id: maintenance-earlier
    title: "August 2026 coordinate-less die and wafer import implementation"
    url: "https://github.com/wafertools/tsmap/commit/d6ad5dff582aaab286c8b9a2ff69a4ff423bf115"
  - id: wafermap-api
    title: "Independent package exports for embedding the shared engine"
    url: "https://github.com/wafertools/wafermap/blob/28a2479e67ba601aff3a70a6809a8c7d46f5fe0c/package.json"
---

## Scope and limits

Validate coordinates, orientation and bins independently. Visualizations using the same [wafermap engine](#source-wafermap) are not independent validation.

The retained workflow is interactive multi-file and multi-format wafer review, including a browser build. The load pipeline maps CSV/JSON/Parquet columns, selects tests before full STDF/ATDF loading and combines chosen wafers for display. Its bundled parsers target native and WASM execution; the rendering engine is a separate dependency. Browser access and mapped imports are distinct reasons to choose this workflow alongside parser APIs and STDF-focused desktop viewers. [Load pipeline](#source-load-pipeline) · [Desktop/browser adapters](#source-desktop-browser) · [Parser implementations](#source-parsers).

## Reviewed maintenance

August 2026 work preserves dies without reported coordinates across the STDF, ATDF and mapped-import paths. November work replaces concatenated multi-session example files with a zip of separate session files and updates the load pipeline and regressions to keep each wafer's source while opening the lot together. These are successive parser and workflow corrections; the examples remain synthetic data. [Coordinate-less imports](#source-maintenance-earlier) · [Session-file and load correction](#source-activity).

## Related workflow

The wafermap package can be embedded in other applications through its separate core, statistics and rendering exports. It is the shared rendering and analysis engine, not a separate end-to-end wafer-file review application. Keep this alternative integration path linked here rather than counting the same analysis implementation as a second independent listing. Engine maintenance is not included in the tsmap repository's activity. [Package exports](#source-wafermap-api).
