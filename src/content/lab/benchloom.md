---
name: "Benchloom"
aliases: []
description: "Desktop and CLI lab automation for supported power supplies, loads, scopes and other instruments. Visual test graphs compile to Lua and execute through the same engine as scripts, with instrument readback, waveform capture, limit checks and per-run CSV and HTML reports."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "AGPL-3.0-or-later Python source; supported devices, communication transports and hardware-test status vary by driver."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical Benchloom implementation"
    url: "https://github.com/criscrafter/benchloom"
    purpose: code
  - id: readme
    title: "Project maturity and implemented automation workflow"
    url: "https://github.com/criscrafter/benchloom/blob/c06716087f54d39a499e8c433eb32e9634762487/README.md"
  - id: activity
    title: "November 17 model-specific driver ranges and HP supply integration"
    url: "https://github.com/criscrafter/benchloom/commit/cfc19eb0dd4ca6a088e0d70f5fcb2d76b11bc5f8"
  - id: engine
    title: "Lua engine, measurement checks and waveform persistence"
    url: "https://github.com/criscrafter/benchloom/blob/c06716087f54d39a499e8c433eb32e9634762487/src/benchloom/engine.py"
  - id: graph
    title: "Visual graph compiler to Lua"
    url: "https://github.com/criscrafter/benchloom/blob/c06716087f54d39a499e8c433eb32e9634762487/src/benchloom/graph.py"
  - id: driver
    title: "HP 663xA physical driver and simulator"
    url: "https://github.com/criscrafter/benchloom/blob/c06716087f54d39a499e8c433eb32e9634762487/src/benchloom/plugins/hp/hp6634a.py"
  - id: tests
    title: "Executable test runner and driver-coverage tests"
    url: "https://github.com/criscrafter/benchloom/blob/c06716087f54d39a499e8c433eb32e9634762487/tests/test_engine.py"
---

### Scope and selection

Benchloom provides user-authored visual control-flow/data-flow graphs and Lua test procedures. The graph compiler emits Lua for the same execution engine used by scripts; drivers expose instrument commands, and the runner saves measured values, scope traces and pass/fail checks. This is a distinct workflow from Python-only measurement frameworks and fixed single-purpose bench GUIs. The November 17 driver integration adds model-specific limits and shared implementations for several HP supply variants after the first engine and release. [Graph compiler](#source-graph) · [Execution engine](#source-engine) · [Driver](#source-driver) · [Activity](#source-activity).

### Limits

The project is young; support depends on specific instruments and transports. Driver metadata and tests distinguish hardware-tested, partly tested and untested devices. Simulated device checks and software shutdown behavior do not guarantee bench accuracy or replace hardware protection. Stored waveforms and automated checks do not by themselves establish a general measured-data analysis workbench. [Overview](#source-readme) · [Tests](#source-tests).
