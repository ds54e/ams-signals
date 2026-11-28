---
name: "STDFReader"
aliases: ["stdf-reader","PySTDF-based test data analysis"]
description: "Python command-line and graphical application for converting semiconductor STDF records to CSV or spreadsheets and analyzing production test data. Uses a PySTDF-derived parser and reports test statistics, bins, wafer maps and cross-file or site-to-site mean shifts."
scope:
  analysis: { ai: false }
access: "GPL-2.0-only; graphical operation requires the optional GUI dependencies. File compatibility depends on the implemented record handling."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/showjim/STDFReader"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/showjim/STDFReader/commit/47e09172daa6e456335d39b1d1a61efecfe0c235"
  - id: earlier
    title: "May first MPR test-number handling correction"
    url: "https://github.com/showjim/STDFReader/commit/ada6d9fc0c91165034fdad5d409735c77d6d7a35"
  - id: reader
    title: "Retained PySTDF-based record extraction and MPR handling"
    url: "https://github.com/showjim/STDFReader/blob/e5639bab63f20b11243dd4a43353c7390eef4834/stdf_reader/FileRead.py"
  - id: correlation
    title: "Retained cross-file and site-to-site correlation implementation"
    url: "https://github.com/showjim/STDFReader/blob/e5639bab63f20b11243dd4a43353c7390eef4834/stdf_reader/analysis.py"
---

## Scope and limits

STDFReader processes saved production-test records, with a command-line record extraction workflow and separate cross-file and site-to-site correlation reports. Its PySTDF-derived parser is distinct from the rust-stdf implementation used by STDF-Viewer. This adds a Python-based analysis and interoperability check option rather than duplicating the same Rust parser through another frontend. Agreement between parsers is not proof of complete STDF conformance. It requires appropriate test identifiers, site definitions, units and corresponding populations for correlation. [Reader implementation](#source-reader) · [Correlation implementation](#source-correlation).

## Reviewed maintenance

May 2026 corrects the first multiple-result record's test-number lookup. October generalizes record-type resolution and extraction to additional STDF records, including MIR, through the command-line and graphical entry points. Both changes remain in the reviewed source. These are changes to an existing usable file-processing workflow; no vendor file coverage or hardware results were independently reproduced. [MPR correction](#source-earlier) · [Record extraction](#source-activity).

## November 28, 2026 implementation review

The named correlation reports compare per-test means rather than calculating paired-observation correlation coefficients. The site-to-site path computes the range of site means; the cross-file path computes the second file's mean minus the first file's mean even when more than two files are loaded and labels that column as a maximum-minus-minimum difference. Its normalized comparisons divide by the specification span or first-file mean without an explicit zero-denominator guard. The bin summary removes first-pass rows at coordinates with a retest row, while the wafer-map pivot selects the last value at each coordinate; multiple retests are not reduced to a single row by the bin-summary filter. These are specific implementation limits to account for before using the reports for site matching or yield decisions. [Report implementation](#source-correlation).
