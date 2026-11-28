---
name: "Enzan RTL Simulator"
aliases: ["Enzan"]
description: "Event-driven SystemVerilog and VHDL RTL simulator with slang-based SystemVerilog analysis, scalar real-port connections, VPI/cocotb, a fixed-delay SVA subset and graphical waveform debugging. User-defined nettypes, classes, UVM and DPI remain unsupported."
scope:
  verification: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is explicitly credited on the November 9 executable cocotb Makefile correction that separates waveform flags from caller-supplied SIM_ARGS. The current Makefile retains that path."
  sources: ["credited-code", "retained-code"]
  reviewedAt: "2026-11-28"
access: "GPL-3.0-or-later source; Linux native build or distribution packages, with separate simulator dependencies for the respective language frontends."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator"
    purpose: code
  - id: readme
    title: "Project overview and operating boundaries"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/blob/ab59b19be2138d7ad02457ad09d886b933805f57/README.md"
  - id: activity
    title: "Reviewed meaningful implementation checkpoint"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/commit/ea6eea14e886a51a707dab2aaac63855fcc91947"
  - id: support
    title: "Current language support and explicit gaps"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/blob/ab59b19be2138d7ad02457ad09d886b933805f57/docs/language-support.md"
  - id: libraries
    title: "Earlier mixed-language library and cocotb integration"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/commit/a0cdd13d2cd7f531d28d1a819e4d61561748db6e"
  - id: real-ports
    title: "Retained scalar real-port regression"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/blob/ab59b19be2138d7ad02457ad09d886b933805f57/tests/golden/sv/real_ports.sv"
  - id: mixed-real
    title: "Retained real-valued mixed-language regression"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/blob/ab59b19be2138d7ad02457ad09d886b933805f57/tests/golden/mixed/real_ports.sv"
  - id: boundary
    title: "Retained elaboration boundary implementation"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/blob/ab59b19be2138d7ad02457ad09d886b933805f57/src/elab/Boundary.cpp"
  - id: credited-code
    title: "Claude-credited executable waveform-option correction"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/commit/971ab4a964f0d595f4c149a95d95ed88aeef42fb"
  - id: retained-code
    title: "Retained cocotb waveform option and launch arguments"
    url: "https://github.com/kenobi314159/Enzan-RTL-Simulator/blob/ab59b19be2138d7ad02457ad09d886b933805f57/tools/cocotb/Makefile.enzan"
---

## Implementation and selection

Enzan provides an event-driven RTL execution workflow with CLI, waveform output and interactive GUI. November 18 integrates mixed-language libraries and cocotb library workflows; November 20 adds scalar real ports, real math and net/transition delay handling with executable regressions. The scalar real-port test passes values through a wrapper to a procedural output and the mixed-language test exercises a real-valued signal crossing a language boundary. These are distinct implemented simulation operations, not just language parsing. [Library integration](#source-libraries) · [Current implementation](#source-activity) · [SV real-port regression](#source-real-ports) · [Mixed-language regression](#source-mixed-real).

## Limits

The current language-support document and retained tests supersede the older README table's statement that real ports are unsupported. Real aggregates at ports, user-defined nettypes, classes, UVM, constrained randomization, covergroups, DPI and several SVA constructs remain unsupported. Scalar real connectivity is not an electrical solver or full RNM support. The VPI path is the subset used by cocotb. The tests were inspected but not independently executed. [Support contract](#source-support) · [Boundary implementation](#source-boundary).

The README discloses agent-assisted development. The specifically credited cocotb waveform-flag correction changes executable build logic and is retained in the canonical head, supporting AI-ASSISTED development rather than runtime AI. [Credited change](#source-credited-code) · [Retained Makefile](#source-retained-code).
