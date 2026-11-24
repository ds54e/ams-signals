---
name: "rust-stdf"
aliases: ["Standard Test Data Format STDF parser"]
description: "Rust library for reading, editing and writing STDF V4/V4-2007 semiconductor test logs. Owned and borrowed record APIs support filtering, conversion and data pipelines; typed writes validate record fields, while raw passthrough preserves encoded records when the file byte order matches."
scope:
  analysis: { ai: false }
access: "MIT."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/noonchen/rust-stdf"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/noonchen/rust-stdf/commit/5160dc3859ea1ed19c94f008a1a6133299715993"
  - id: viewer
    title: "STDF-Viewer application"
    url: "https://github.com/noonchen/STDF-Viewer"
  - id: reader-writer
    title: "Typed and raw STDF reader/writer implementation"
    url: "https://github.com/noonchen/rust-stdf/blob/5160dc3859ea1ed19c94f008a1a6133299715993/src/stdf_file.rs"
  - id: edit-example
    title: "Executable record-editing and raw-copy example"
    url: "https://github.com/noonchen/rust-stdf/blob/5160dc3859ea1ed19c94f008a1a6133299715993/example/stdf_edit_example.rs"
  - id: writer-tests
    title: "Writer validation, byte-order and passthrough regressions"
    url: "https://github.com/noonchen/rust-stdf/blob/5160dc3859ea1ed19c94f008a1a6133299715993/tests/stdf_writer_tests.rs"
  - id: formats
    title: "Record APIs, optional compression and ATDF development boundary"
    url: "https://github.com/noonchen/rust-stdf/blob/5160dc3859ea1ed19c94f008a1a6133299715993/README.md"
---

## Scope and limits

The library supplies an embeddable transformation path in addition to parsing: an editing example changes selected PTR records while copying other records through the raw API. Typed records are validated before encoding; raw writes reject mismatched byte order, while known record views can be re-encoded. The writer regressions exercise roundtrips, invalid fields and byte-order guards. These are file-processing operations, so the catalog retains Analysis alone. [Reader/writer](#source-reader-writer); [Editing example](#source-edit-example); [Writer regressions](#source-writer-tests).

The optional ATDF reader/conversion feature is explicitly under development. The [companion viewer](#source-viewer) provides a separate interactive workflow using this parser family; agreement between the two is not independent parser validation. [Formats and features](#source-formats).
