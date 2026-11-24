---
name: "STDF-Viewer"
aliases: ["STDF Viewer Standard Test Data Format"]
description: "Desktop application for inspecting semiconductor STDF logs, comparing files and exporting reports. It provides test distributions, per-DUT results, hardware/software-bin summaries and wafer maps; functional-test plots use test flags, while numeric test values and limits depend on the record type."
scope:
  analysis: { ai: false }
access: "GPL-3.0."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
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
---

## Scope and limits

The GUI adds file comparison, head/site selection, per-DUT inspection and Excel report export to the [parser](#source-parser). Its current Rust helper declares a rust-stdf dependency, so the two listings expose different usage interfaces rather than independent checks of parsing behavior. [Workflow](#source-workflow); [Parser dependency](#source-parser-dependency).

FTR records have no numeric measurement result: the plotting data path substitutes their test flags. Wafer maps require suitable wafer records and coordinates, and stacked fail counts follow the selected file IDs. These distinctions matter when comparing functional-test plots with parametric distributions or merging wafer results. [Data interface](#source-data-interface).
