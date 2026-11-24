---
name: "Bluesky"
aliases: []
description: "Python toolkit for running reproducible experiments with instrument-independent plans, a RunEngine and event documents. It coordinates scans and checkpoints and emits measured data and metadata to subscribers without requiring one particular instrument or storage system."
scope:
  acquisition: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "The implementation of background thread exception handling and its regressions carries an explicit AI assistance credit."
  sources: [implementation]
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
---

## Scope and limits

The reviewed thread error handling follows v1.16.0. A stopped plan does not necessarily stop a background function, and a successful plan exit does not establish DUT pass.

[Reviewed upstream implementation](#source-implementation).
