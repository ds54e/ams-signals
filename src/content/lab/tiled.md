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
  - id: migration-integration
    title: "November 23 catalog and authentication database migration corrections"
    url: "https://github.com/bluesky/tiled/commit/013583bbebe2ce0e21869b3e41e34283bdeb87ad"
  - id: migration-regressions
    title: "Retained database schema and migration round-trip tests"
    url: "https://github.com/bluesky/tiled/blob/0732d02df6fb3dd4f193181d0e4f28bd495cfef6/tests/test_migrations.py"
  - id: auth-scope-fix
    title: "November 24 configurable authorization scope correction"
    url: "https://github.com/bluesky/tiled/commit/438da00f2fb42c75db7b93dff4b11d5a800d840b"
  - id: auth-scope-retained
    title: "Retained authorization scope selection"
    url: "https://github.com/bluesky/tiled/blob/0732d02df6fb3dd4f193181d0e4f28bd495cfef6/tiled/server/authentication.py"
---

## Scope and limits

The catalog and adapters expose structured scientific data and metadata, including selective access to already recorded data. The client also implements subscription to live data updates. This supplies a distinct data-access layer for measurement systems rather than a separate instrument driver or the Bluesky RunEngine's experiment orchestration. A data producer, metadata schema and storage policy must be configured. The service does not establish acquisition completeness, timebase calibration, data retention or a qualified measurement verdict. [Arrow adapter](#source-arrow) · [Live subscription](#source-stream).

## Reviewed maintenance

October 13 changes create and append retry behavior after lost responses could cause duplicate or partially written Bluesky records. Appends with uncertain server outcomes are surfaced rather than silently repeated. November 23 integrates structure inference for existing Arrow IPC and Feather v2 files without loading all row data, with registration regressions. These are concrete correctness improvements to a deployed scientific data workflow. The reviewed implementation does not claim exactly-once writes or support for every Arrow format; no server, acquisition or upstream test suite was independently run. [Retry correction](#source-retry-fix) · [Retained append path](#source-append) · [Arrow integration](#source-activity) · [Tests](#source-tests).

## Reviewed implementation update, November 25, 2026

November 23 integrates catalog and authentication database schema reconciliation and tests that downgrade and re-upgrade supported revisions, compare schemas with ORM definitions and exercise SQLite and PostgreSQL paths. The tests cover supported migration ranges rather than arbitrary older databases. November 24 removes the unconditional offline_access authorization scope, leaving openid and authenticator-configured extra scopes. These are data-service compatibility and maintenance changes, not evidence that recorded measurements survive every migration or that authentication is independently secure. Back up data and validate the configured migration path before using a new version. The November 24 commit is the selected meaningful checkpoint; the subsequent release-candidate version change is raw activity. [Migration integration](#source-migration-integration) · [Migration tests](#source-migration-regressions) · [Authorization change](#source-auth-scope-fix) · [Retained path](#source-auth-scope-retained).

Source inspection only; no physical measurement, programming, service migration or upstream regression was independently executed.
