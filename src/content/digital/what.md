---
name: "WHAT"
aliases: []
description: "Browser HDL debugger linking SystemVerilog hierarchy and source-level driver/load navigation with interactive FST waveform analysis. Users can follow signals between source and waveforms, inspect values at the current cursor and save the resulting debug session."
scope:
  verification:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The maintainer reports using AI to implement the application’s main code, including its architecture, interface and functional logic. Building the HDL and waveform viewer was an explicit AI-programming experiment."
  sources: ["readme"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical WHAT repository"
    url: "https://github.com/rain91508-cmd/what"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/rain91508-cmd/what/blob/e176ca3e0b981031ca2e47da368d8c84df21f4ab/README.md"
  - id: "implementation"
    title: "Reviewed implementation: server/src/handlers/wave_handler.rs"
    url: "https://github.com/rain91508-cmd/what/blob/e176ca3e0b981031ca2e47da368d8c84df21f4ab/server/src/handlers/wave_handler.rs"
  - id: "activity"
    title: "Fix waveform ghost, avoid flicker on cursor-only clicks, reset signal panel page on module switch"
    url: "https://github.com/rain91508-cmd/what/commit/6c0348fb8ac87ea384023ef8237fe4b4f0b2a99f"
---


### Implementation context

The author explicitly credits AI with the principal architecture and implementation; this is development evidence rather than a claim about an agent runtime. [Reviewed source](#source-readme).

### Release boundary

Browser debug functionality is implemented; AI authorship does not establish independent correctness or a runtime design agent. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Source navigation and FST waveform interaction are the central debug product. The extraction backend enables inspection rather than RTL design generation. [Reviewed source](#source-readme).

HDL/waveform inspection is conventional Verification. The author credits AI with the principal architecture and implementation, justifying AI-built provenance without a runtime AI stage. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-BUILT**. The maintainer explicitly attributes the main code, architecture, UI and functional logic to AI generation as the project’s creation method. The account covers the application as a whole. [Maintainer creation account](#source-readme).
