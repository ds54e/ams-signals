---
name: "STDF-Viewer"
aliases: ["STDF Viewer Standard Test Data Format"]
description: "Desktop viewer for semiconductor Standard Test Data Format files. It enables interactive inspection of production-test records, distributions, bins and wafer results without writing a parser, and shares its parser lineage with rust-stdf."
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
---

## Scope and limits

The GUI and its [parser lineage](#source-parser) are distinct usage interfaces, not independent checks of parsing behavior.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
