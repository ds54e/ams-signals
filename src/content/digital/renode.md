---
name: "Renode"
aliases: []
description: "Emulates embedded processors and peripherals for firmware development and virtual board tests. Automated scenarios, external control and supported HDL co-simulation interfaces let firmware exercise modeled devices before equivalent hardware is available."
scope:
  verification: { ai: false }
access: "MIT; bundled components and external models can have separate terms."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://renode.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/renode/renode"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/renode/renode/commit/30c54ee00d13d1263d167a3bf6fda8602292b3d5"
  - id: release
    title: "Public v1.17.1"
    url: "https://github.com/renode/renode/releases/tag/v1.17.1"
---

## Scope and limits

The reviewed v1.17.1 external-control code can opt into selected host-clock overrides. The replacement does not virtualize all host waits and does not model clock IC jitter or analog board behavior.

[Reviewed upstream implementation](#source-activity).

Additional context: [Public v1.17.1](#source-release).
