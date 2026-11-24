---
name: "OpenHTF"
aliases: ["Open Hardware Test Framework"]
description: "Python framework for hardware test stations and production test sequences. It organizes test phases, instrument plugs, measurement validation and run records, so test authors can distinguish failures, missing measurements and incomplete runs."
scope:
  test: { ai: false }
access: "Apache-2.0."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical project source"
    url: "https://github.com/google/openhtf"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/google/openhtf/commit/916885e625130e2b0e2fe7b81b1b96ec3f11c973"
---

## Scope and limits

Use explicit missing-measurement and incomplete-run handling. Phase outcomes do not establish the physical validity of a fixture.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.
