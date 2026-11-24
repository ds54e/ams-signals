---
name: "oscillatord"
aliases: []
description: "GNSS oscillator discipline and monitoring daemon for supported timing-card configurations. It uses phase-error observations and hardware-specific control to steer compatible oscillators, with monitoring-only operation for some devices and separate dependencies for GNSS and clock access."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "GPL-2.0; needs compatible GNSS, PHC and oscillator hardware."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/leoleovich/oscillatord"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/leoleovich/oscillatord/commit/ac5afa15acf34dd120ccbc845db53f9b9b91b265"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/leoleovich/oscillatord/commit/4ccb73027266eb01029b8b5c4690267546e2c367"
  - id: lineage
    title: "Original Orolia oscillator daemon"
    url: "https://github.com/Orolia2s/oscillatord"
  - id: release
    title: "Maintained fork v3.10.5"
    url: "https://github.com/leoleovich/oscillatord/releases/tag/v3.10.5"
---

## Scope and limits

This entry tracks the maintained fork, not an assertion that the origin is discontinued. The reviewed RAWX implementation checks frame length and separates unknown signal IDs. Not a general oscillator design tool and not all advertised receivers were tested on hardware.

[Reviewed upstream implementation](#source-implementation).

Additional context: [Original Orolia oscillator daemon](#source-lineage); [Maintained fork v3.10.5](#source-release).
