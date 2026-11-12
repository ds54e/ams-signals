---
name: "WHAT"
aliases: []
description: "Browser HDL debugger linking SystemVerilog hierarchy and source-level driver/load navigation with interactive FST waveform analysis. Users can follow signals between source and waveforms, inspect values at the current cursor and save the resulting debug session."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer credits AI-assisted development of the HDL and waveform application, including its interface and functional logic."
  sources: ["readme"]
  reviewedAt: "2026-11-12"
access: "Public browser frontend, Rust server and Surelog-based HDL extraction backend. Source navigation uses generated KDB data and waveform inspection uses existing FST artifacts."
addedAt: "2026-09-05"
reviewedAt: "2026-10-18"
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

The author credits AI-assisted implementation of the application interface and functional logic; this is development evidence rather than a claim about an agent runtime. [Reviewed source](#source-readme).

### Release boundary

Browser debug functionality is implemented; AI authorship does not establish independent correctness or a runtime design agent. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

Source navigation and FST waveform interaction are the central debug product. The extraction backend enables inspection rather than RTL design generation. [Reviewed source](#source-readme).

HDL/waveform inspection is conventional Verification. The author credits AI-assisted implementation of the application interface and functional logic, independently of runtime AI. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-ASSISTED**. The maintainer credits AI-assisted implementation of the application interface and functional logic. [Maintainer creation account](#source-readme).

### Current-source review

Reviewed 2026-10-01. Reopened the maintainer creation account and waveform handler at the unchanged canonical head. Source/waveform navigation and stored sessions remain conventional debugging operations; the maintainer’s implementation account supports AI-assisted provenance without implying runtime AI or source-code generation. [Maintainer account](#source-readme); [Waveform handler](#source-implementation).
