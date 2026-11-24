---
name: "Bluesky"
aliases: []
description: "Python toolkit for reproducible experiments using instrument-independent plans, a RunEngine and event documents. It sets device parameters, coordinates scans and checkpoints, and emits measured data and metadata to subscribers; hardware access depends on configured device bindings."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "The implementation of background thread exception handling and its regressions carries an explicit AI assistance credit."
  sources: [implementation, development-retained]
  reviewedAt: "2026-11-24"
access: "BSD-3-Clause; device bindings and data storage are configured separately."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://blueskyproject.io/bluesky/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/bluesky/bluesky"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/bluesky/bluesky/commit/d960763a10645c5117aacd791424f67d68b5f544"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/bluesky/bluesky/commit/46686ce4ae91f7957522bbe291f56ebd6039b5ea"
  - id: run-engine
    title: "RunEngine device set, trigger and read operations"
    url: "https://github.com/bluesky/bluesky/blob/d960763a10645c5117aacd791424f67d68b5f544/src/bluesky/run_engine.py"
  - id: development-retained
    title: "Retained background-thread exception handling"
    url: "https://github.com/bluesky/bluesky/blob/d960763a10645c5117aacd791424f67d68b5f544/src/bluesky/plan_stubs.py"
---

## Scope and limits

The reviewed thread error handling follows v1.16.0. A stopped plan does not necessarily stop a background function, and a successful plan exit does not establish DUT pass.

[Reviewed upstream implementation](#source-implementation).

Control is supported by the RunEngine's implemented `set` and trigger dispatch, including device status and completion handling. Acquisition records device reads, and Test Automation describes the reusable plan and run orchestration. These stages do not inherit every capability of a device binding or subscriber. [RunEngine](#source-run-engine).
