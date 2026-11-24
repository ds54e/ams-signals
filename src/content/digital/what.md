---
name: "WHAT"
aliases: []
description: "Browser HDL debugger linking a Surelog-derived SystemVerilog knowledge database with existing FST waveforms. It supports driver/load navigation, cursor-linked source values and saved sessions; users generate a matching KDB before inspection, while database extraction, waveform production and interactive viewing remain separate operations."
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
reviewedAt: "2026-11-24"
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
  - id: driver-extraction
    title: "Surelog/UHDM-based driver-edge extraction"
    url: https://github.com/rain91508-cmd/what/blob/e176ca3e0b981031ca2e47da368d8c84df21f4ab/interpreter/src/driver_analyzer.cpp
  - id: release-entry
    title: "Packaged interpreter/server and source-navigation corrections"
    url: https://github.com/rain91508-cmd/what/releases/tag/v1.1.1
---

### Implemented workflow and selection

The user first generates a KDB from the design with the Surelog-based interpreter, then serves that database and matching FST artifacts to the browser. The interface links hierarchy, source-level driver/load navigation and values at the waveform cursor, with saved sessions. This integrated interactive workflow has independent discovery value alongside waveform-only viewers and query-oriented debug servers. [Setup and operation](#source-readme) · [Driver extraction](#source-driver-extraction) · [Waveform handlers](#source-implementation).

Published packages provide interpreter/server entry points for the documented platforms. The v1.1.1 release includes source-navigation, KDB loading and waveform-UI fixes. Earlier March/April implementation and July maintenance were checked when reviewing retention; a quiet latest period alone is not evidence that the usable viewer is abandoned. [Packaged release and fixes](#source-release-entry) · [Reviewed correction](#source-activity).

### Classification and review boundary

Source/database navigation and recorded-waveform inspection support conventional Verification. The extractor prepares read-only debug information rather than authoring the DUT or simulating it. The maintainer credits AI-assisted implementation of the application interface and functional logic; that provenance does not establish runtime AI or independently verified correctness. [Maintainer account](#source-readme) · [Reviewed implementation](#source-implementation).

This review inspected the public code, release entry points and canonical branch history; it did not rerun the viewer or simulate a design.
