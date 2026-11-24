---
name: "tm_data_types"
aliases: ["tm data types"]
description: "Python data types and file readers and writers for Tektronix WFM and CSV waveforms. Analog and digital FastFrame data and waveform metadata support offline inspection, conversion and reuse of acquired traces."
scope:
  analysis: { ai: false }
access: "Apache-2.0; format coverage depends on the saved waveform type."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://tm-data-types.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/tektronix/tm_data_types"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/tektronix/tm_data_types/commit/6d135b97d8eb2b1289c4b4fd7b03b2814e16f9e0"
  - id: csv-header
    title: "Model label in the reviewed CSV writer"
    url: "https://github.com/tektronix/tm_data_types/blob/7a0bfc4d4fd23cfff0b70296431f6d2252a3dce1/src/tm_data_types/files_and_formats/csv/csv.py"
---

## Scope and limits

Version 0.6.0 includes fixed-length string and parallel I/O repairs. Generic TEKSCOPE CSV output writes a fixed model label; retain actual instrument identity and frame timestamps separately.

[Reviewed upstream implementation](#source-activity).

Additional context: [Model label in the reviewed CSV writer](#source-csv-header).

Scope is Analysis: readers, writers and waveform objects handle saved data. They are not the instrument I/O path used to acquire the waveform.
