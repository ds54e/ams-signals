---
name: "labgrid"
aliases: []
description: "Python abstractions for controlling local and remote embedded test boards, connecting power switches, serial ports and loaders to drivers. A coordinator manages acquisition and reservation of shared fixtures, while pytest can drive repeatable hardware tests."
scope:
  control: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the Sunxi USB loader driver and its accompanying test code."
  sources: [ai-change]
  reviewedAt: "2026-11-24"
access: "LGPL-2.1-or-later; requires drivers and access to configured fixtures."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://labgrid.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/labgrid-project/labgrid"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/labgrid-project/labgrid/commit/9412cc8ab0a82958815fa312e196f3eead2a2b92"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/labgrid-project/labgrid/commit/d399a5857f53db9d6a229a630fb62619c4917317"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/labgrid-project/labgrid/commit/5f6de3485b2581db2fb390298edcf50bc7c4ace0"
---

## Scope and limits

The reviewed stale-setting rejection follows v26.0.1. Fixture coordination is distinct from test verdicts, while resource ownership alone is not verification of physical state.

[Reviewed upstream implementation](#source-implementation).
