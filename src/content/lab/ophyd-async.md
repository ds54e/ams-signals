---
name: "ophyd-async"
aliases: []
description: "Asynchronous Python device and signal abstractions for experimental control, including supported EPICS and Tango backends. Set, readback, status and mock devices let measurement plans coordinate operations without embedding each control protocol."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on abstract-class validation and the regression covering unsupported Tango command reads."
  sources: [activity]
  reviewedAt: "2026-11-24"
access: "BSD-3-Clause; compatible control-system services and device drivers are separate."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://blueskyproject.io/ophyd-async/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/bluesky/ophyd-async"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/bluesky/ophyd-async/commit/e9ddd98799f619c8c5fb0a0cb8a1c4d9aeff7dee"
---

## Scope and limits

Changes after v0.21.5 tighten abstract method validation and distinguish unsupported Tango reads. A readback timeout is not evidence that a background set or physical operation stopped.

[Reviewed upstream implementation](#source-activity).
