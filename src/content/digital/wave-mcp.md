---
name: "wave-mcp"
aliases: []
description: "RTL debug server and CLI for waveform queries, hierarchy and driver inspection, approximate value/X tracing and pass/fail comparisons, with a browser viewer. FST is read directly; VCD/FSDB need conversion, FSDB needs vendor reader libraries, and structural answers depend on reported elaboration coverage."
scope:
  verification:
    ai: false
access: "Public Python source with pyslang and pylibfst. VCD conversion uses GTKWave vcd2fst; the optional FSDB converter needs a compatible Linux FsdbReader runtime."
addedAt: "2026-09-05"
reviewedAt: "2026-11-24"
sources:
  - id: "code"
    title: "Canonical wave-mcp repository"
    url: "https://github.com/Tencent/wave-mcp"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/README.md"
  - id: "implementation"
    title: "Reviewed implementation: wave_mcp/netlist/trace_engine.py"
    url: "https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/wave_mcp/netlist/trace_engine.py"
  - id: "activity"
    title: "fix(deploy): resolve install paths to absolute and verify launcher at install time"
    url: "https://github.com/Tencent/wave-mcp/commit/cbd367ada0da49ca9cd5ef34dd201f751cfb5ea5"
  - id: "activity-refresh"
    title: "Latest reviewed meaningful implementation update"
    url: "https://github.com/Tencent/wave-mcp/commit/06a0b98be46da9b3f81119c3f97d8833be71b401"
  - id: website
    title: Official package page
    url: https://pypi.org/project/wave-mcp/
    purpose: official
  - id: review-20261103-implementation
    title: "Bit/part-select handling across waveform and tracing tools"
    url: https://github.com/Tencent/wave-mcp/commit/bb0bfe60d1d68d47e9612e7016f840e4e9696f29
  - id: review-20261103-time
    title: "Exact FST timestamp conversion and tests"
    url: https://github.com/Tencent/wave-mcp/commit/0b8c5fff11c9b4bf1e668787322ec41d08dd9d91
  - id: fsdb-runtime
    title: "FSDB converter build and required reader runtime"
    url: https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/deploy/build_fsdb2fst.sh
  - id: session-coverage
    title: "Session mode, elaboration health and definition coverage"
    url: https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/wave_mcp/session.py
  - id: netlist-coverage
    title: "Partial elaboration and recovered-module boundaries"
    url: https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/wave_mcp/netlist/slang_netlist.py
---

### Implemented workflow and selection

The independent value is the combination of pyslang elaboration, source-level drivers and recorded waveform values. Static sessions inspect hierarchy and connectivity before a waveform is available; full sessions add value queries, comparisons and viewer synchronization. These are conventional Verification operations over existing artifacts. The MCP/CLI interface does not itself implement a model-driven diagnostic workflow or execute simulation. [Workflow](#source-readme) · [Tracing implementation](#source-implementation).

### Access and interpretation boundaries

FST reads use pylibfst, VCD preparation invokes vcd2fst, and FSDB conversion requires a compatible FsdbReader runtime. The converter build resolves local `libnffr.so` / `libnsys.so`; absence of a license checkout does not make these vendor dependencies part of the open implementation. [Converter dependencies](#source-fsdb-runtime).

Recovered modules can remain available after elaboration errors. The session exposes `netlist_health` and definition coverage, so a usable waveform session does not establish complete structural coverage. The trace engine explicitly treats value-informed active-driver and backward-trace decisions as best-effort temporal analysis; inspect the source context before assigning causality. [Elaboration](#source-netlist-coverage) · [Session coverage](#source-session-coverage) · [Trace boundary](#source-implementation).

### Reviewed maintenance

Bit/part-select support and exact FST timestamp conversion are concrete correctness work supporting retention. Their implementation evidence is separate from the existing activity capture. This review inspected current code and documentation; the project's production/query-accuracy claims were not independently reproduced. [Bit/part selects](#source-review-20261103-implementation) · [Timestamp correction](#source-review-20261103-time).
