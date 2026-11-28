---
name: "STDF-Viewer"
aliases: ["STDF Viewer Standard Test Data Format"]
description: "Desktop application for inspecting semiconductor STDF logs, comparing files and exporting reports. It provides test distributions, per-DUT results, hardware/software-bin summaries and wafer maps; functional-test plots use test flags, while numeric test values and limits depend on the record type."
scope:
  analysis: { ai: false }
access: "GPL-3.0."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/noonchen/STDF-Viewer"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/noonchen/STDF-Viewer/commit/170f5a1dc7df8f46950a1ad6b920d032e000a254"
  - id: parser
    title: "rust-stdf parser"
    url: "https://github.com/noonchen/rust-stdf"
  - id: workflow
    title: "File comparison, DUT inspection and Excel report workflow"
    url: "https://github.com/noonchen/STDF-Viewer/blob/170f5a1dc7df8f46950a1ad6b920d032e000a254/README.md"
  - id: data-interface
    title: "Record-specific values, selected files and wafer-map data"
    url: "https://github.com/noonchen/STDF-Viewer/blob/170f5a1dc7df8f46950a1ad6b920d032e000a254/deps/DataInterface.py"
  - id: parser-dependency
    title: "Current Rust helper and rust-stdf dependency"
    url: "https://github.com/noonchen/STDF-Viewer/blob/170f5a1dc7df8f46950a1ad6b920d032e000a254/deps/rust_stdf_helper/Cargo.toml"
  - id: maintenance-earlier
    title: "June 2026 repair for empty GDR/DTR report exports"
    url: "https://github.com/noonchen/STDF-Viewer/commit/5345b2cf782c6358f251eeba76f8ddee1d0376de"
  - id: tagged-release
    title: "STDF-Viewer V4.0.0 tagged binary release from December 2022"
    url: "https://github.com/noonchen/STDF-Viewer/releases/tag/V4.0.0"
  - id: related-stdfreader-summary
    title: "Separate Python bin summaries and cross-file mean comparisons"
    url: "https://github.com/showjim/STDFReader/blob/e5639bab63f20b11243dd4a43353c7390eef4834/stdf_reader/analysis.py"
---

## Scope and limits

The GUI adds file comparison, head/site selection, per-DUT inspection and Excel report export to the [parser](#source-parser). Its current Rust helper declares a rust-stdf dependency, so the two listings expose different usage interfaces rather than independent checks of parsing behavior. [Workflow](#source-workflow); [Parser dependency](#source-parser-dependency).

FTR records have no numeric measurement result: the plotting data path substitutes their test flags. Wafer maps require suitable wafer records and coordinates, and stacked fail counts follow the selected file IDs. These distinctions matter when comparing functional-test plots with parametric distributions or merging wafer results. [Data interface](#source-data-interface).

## Reviewed maintenance

June 2026 maintenance fixes GDR/DTR exports that yielded no rows when the query fit in the initial batch. October work adds file-ID selection and carries the selected files through plots and file information. These dated changes establish continued work on the application. [Export correction](#source-maintenance-earlier) · [File selection](#source-activity).

This review follows the October 2026 source. The inspected GitHub V4.0.0 binary release dates from December 2022 and predates these changes; verify the revision of a downloaded build or build the required source revision. [Tagged release](#source-tagged-release) · [Build and usage documentation](#source-workflow).

## November 28, 2026 implementation review

The wafer statistics display counts for pass, fail, unknown and superseded DUTs separately. Its displayed yield divides pass count by pass plus fail count, whereas the displayed total sums all four counts. A stacked wafer map aggregates failures over selected files but is excluded from this per-wafer statistics table. The data interface can hide infinite values as NaN or replace them by finite float32 extrema for display before calculating descriptive statistics. Verify those settings and denominators when comparing reports. STDFReader uses a separate parser lineage and its own retest and site-mean reporting workflow; the two applications do not necessarily aggregate the same population. [Data interface](#source-data-interface) · [Related reports](#source-related-stdfreader-summary).
