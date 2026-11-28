---
name: "tm_data_types"
aliases: ["tm data types"]
description: "Python data types and file readers and writers for Tektronix WFM and CSV waveforms, including analog and digital FastFrame data. TSS archive reading and waveform metadata support offline inspection, conversion and reuse of acquired traces."
scope:
  analysis: { ai: false }
access: "Apache-2.0; reviewed source requires Python 3.11 through 3.15. Format coverage depends on the saved waveform type."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
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
  - id: maintenance-earlier
    title: "April 2026 MAT waveform axis-unit correction"
    url: "https://github.com/tektronix/tm_data_types/commit/343af99af17949c5b2b5c8500fab3bd8442ec34f"
  - id: tss-reader
    title: "Public TSS archive reader"
    url: "https://github.com/tektronix/tm_data_types/blob/7a0bfc4d4fd23cfff0b70296431f6d2252a3dce1/src/tm_data_types/files_and_formats/tss/tss_reader.py"
  - id: tss-tests
    title: "Retained TSS archive waveform read tests"
    url: "https://github.com/tektronix/tm_data_types/blob/7a0bfc4d4fd23cfff0b70296431f6d2252a3dce1/tests/test_tss_reader.py"
  - id: related-tm-devices
    title: "Separate live Tektronix curve acquisition"
    url: "https://github.com/tektronix/tm_devices/blob/eb4969cd15795999b9184e679b1b65d847ac8e01/examples/scopes/tekscope/basic_curve_query.py"
  - id: compatibility-20261110
    title: "November 10 Python and serialization compatibility integration"
    url: "https://github.com/tektronix/tm_data_types/commit/8e07d77899854856e1edcce46cfe1283640c32c1"
  - id: compatibility-retained
    title: "Retained class-level structured-data annotation lookup"
    url: "https://github.com/tektronix/tm_data_types/blob/7a0bfc4d4fd23cfff0b70296431f6d2252a3dce1/src/tm_data_types/helpers/byte_data_class.py"
  - id: python-requirements
    title: "Retained Python compatibility range"
    url: "https://github.com/tektronix/tm_data_types/blob/7a0bfc4d4fd23cfff0b70296431f6d2252a3dce1/pyproject.toml"
---

## Scope and limits

Version 0.6.0 includes fixed-length string and parallel I/O repairs. Generic TEKSCOPE CSV output writes a fixed model label; retain actual instrument identity and frame timestamps separately.

[Reviewed upstream implementation](#source-activity).

Additional context: [Model label in the reviewed CSV writer](#source-csv-header).

Scope is Analysis: readers, writers and waveform objects handle saved data. They are not the instrument I/O path used to acquire the waveform.

## Reviewed maintenance

April 2026 maintenance corrects swapped horizontal and vertical unit fields in MAT waveforms. September work stops fixed-width strings at their first NUL and repairs parallel I/O error propagation, with regression coverage. The distinct file-format and failure-handling corrections establish continued maintenance beyond the initial library release. [Axis-unit correction](#source-maintenance-earlier) · [String and I/O corrections](#source-activity).

## November 28, 2026 implementation review

The exported TSSReader enumerates ZIP archive members and reads contained waveforms through the existing file reader. Tests compare archive reading with a separately extracted waveform. TSS is retained saved-data coverage, not a claim that it was introduced in November. This independent offline path differs from tm_devices' live curve query. November 10 changes structured binary-data size calculation, packing and summation to use class-level annotations, alongside the revised Python and NumPy compatibility matrix. This executable compatibility work advances the meaningful checkpoint beyond September; the reviewed project metadata specifies Python >=3.11,<3.16. No instrument or upstream suite was independently exercised. [TSS reader](#source-tss-reader) · [TSS tests](#source-tss-tests) · [Live curve query](#source-related-tm-devices) · [Compatibility integration](#source-compatibility-20261110) · [Retained serialization](#source-compatibility-retained) · [Python requirements](#source-python-requirements).
