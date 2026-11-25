---
name: "Tiled"
aliases: ["Bluesky Tiled", "scientific measurement data service"]
description: "Scientific-data service and Python client for querying recorded arrays, tables and measurement metadata and subscribing to live data updates. Supports remote partial reads, data-format adapters and cataloged storage, with explicit handling of retries for record creation and table append operations."
scope:
  acquisition: { ai: false }
  analysis: { ai: false }
access: "BSD-3-Clause; requires a configured data service, supported data adapters, storage and any applicable authentication. Instrument connections and data producers are separate."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical scientific-data service implementation"
    url: "https://github.com/bluesky/tiled"
    purpose: code
  - id: activity
    title: "November 23 Arrow and Feather table registration and structure inference"
    url: "https://github.com/bluesky/tiled/commit/c6301e2dcdcefde365e767094527e3f4f8965d21"
  - id: retry-fix
    title: "October 13 duplicate-safe create and append retry correction"
    url: "https://github.com/bluesky/tiled/commit/19cebf480c520a8d381329a69dd6c52161f796d8"
  - id: arrow
    title: "Retained Arrow file adapter and selective table reads"
    url: "https://github.com/bluesky/tiled/blob/0732d02df6fb3dd4f193181d0e4f28bd495cfef6/tiled/adapters/arrow.py"
  - id: stream
    title: "Retained client subscription to live data updates"
    url: "https://github.com/bluesky/tiled/blob/0732d02df6fb3dd4f193181d0e4f28bd495cfef6/tiled/client/stream.py"
  - id: append
    title: "Retained non-idempotent append retry handling"
    url: "https://github.com/bluesky/tiled/blob/0732d02df6fb3dd4f193181d0e4f28bd495cfef6/tiled/client/dataframe.py"
  - id: tests
    title: "Retained Arrow adapter and registration regressions"
    url: "https://github.com/bluesky/tiled/blob/0732d02df6fb3dd4f193181d0e4f28bd495cfef6/tests/adapters/test_arrow.py"
---

## Scope and limits

The catalog and adapters expose structured scientific data and metadata, including selective access to already recorded data. The client also implements subscription to live data updates. This supplies a distinct data-access layer for measurement systems rather than a separate instrument driver or the Bluesky RunEngine's experiment orchestration. A data producer, metadata schema and storage policy must be configured. The service does not establish acquisition completeness, timebase calibration, data retention or a qualified measurement verdict. [Arrow adapter](#source-arrow) · [Live subscription](#source-stream).

## Reviewed maintenance

October 13 changes create and append retry behavior after lost responses could cause duplicate or partially written Bluesky records. Appends with uncertain server outcomes are surfaced rather than silently repeated. November 23 integrates structure inference for existing Arrow IPC and Feather v2 files without loading all row data, with registration regressions. These are concrete correctness improvements to a deployed scientific data workflow. The reviewed implementation does not claim exactly-once writes or support for every Arrow format; no server, acquisition or upstream test suite was independently run. [Retry correction](#source-retry-fix) · [Retained append path](#source-append) · [Arrow integration](#source-activity) · [Tests](#source-tests).
