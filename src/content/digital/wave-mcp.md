---
name: "wave-mcp"
aliases: []
description: "RTL debug server and CLI for waveform queries, hierarchy and driver inspection, approximate value/X tracing and pass/fail comparisons, with a browser viewer. FST is read directly; VCD/FSDB need conversion, FSDB needs vendor reader libraries, and structural answers depend on reported elaboration coverage."
scope:
  verification:
    ai: false
access: "Public Python source with pyslang and pylibfst. VCD conversion uses GTKWave vcd2fst; the optional FSDB converter needs a compatible Linux FsdbReader runtime."
addedAt: "2026-09-05"
reviewedAt: "2026-11-28"
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
  - id: long-wave-fix
    title: "November 16 long-waveform clock sampling correction"
    url: "https://github.com/Tencent/wave-mcp/commit/04afe72ca02fdca0301350a8ea218cc54d389c91"
  - id: long-wave-regression
    title: "Retained FST clock sampling regression"
    url: "https://github.com/Tencent/wave-mcp/blob/04afe72ca02fdca0301350a8ea218cc54d389c91/tests/unit/test_clocking.py"
  - id: bus-buffer-fix
    title: "November 20 aggregated bus buffer lifetime correction"
    url: "https://github.com/Tencent/wave-mcp/commit/c1fdbf0a9b3b66c5251b94351943031e3132d97a"
  - id: bus-buffer-retained
    title: "Retained FST point-read implementation"
    url: "https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/wave_mcp/sources/fst_source.py"
  - id: related-traceweave-attribution
    title: "Declared TraceWeave implementation references and design influence"
    url: "https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/docs/THIRD_PARTY.md"
  - id: related-traceweave-workflow
    title: "TraceWeave log and waveform debugging workflow"
    url: "https://github.com/gokeshenzhen/TraceWeave/blob/b4a18c1c50786ec1cc674d9e249c4bf00ec6026e/README.md"
---

### Implemented workflow and selection

The independent value is the combination of pyslang elaboration, source-level drivers and recorded waveform values. Static sessions inspect hierarchy and connectivity before a waveform is available; full sessions add value queries, comparisons and viewer synchronization. These are conventional Verification operations over existing artifacts. The MCP/CLI interface does not itself implement a model-driven diagnostic workflow or execute simulation. [Workflow](#source-readme) · [Tracing implementation](#source-implementation).

### Access and interpretation boundaries

FST reads use pylibfst, VCD preparation invokes vcd2fst, and FSDB conversion requires a compatible FsdbReader runtime. The converter build resolves local `libnffr.so` / `libnsys.so`; absence of a license checkout does not make these vendor dependencies part of the open implementation. [Converter dependencies](#source-fsdb-runtime).

Recovered modules can remain available after elaboration errors. The session exposes `netlist_health` and definition coverage, so a usable waveform session does not establish complete structural coverage. The trace engine explicitly treats value-informed active-driver and backward-trace decisions as best-effort temporal analysis; inspect the source context before assigning causality. [Elaboration](#source-netlist-coverage) · [Session coverage](#source-session-coverage) · [Trace boundary](#source-implementation).

### Reviewed maintenance

Bit/part-select support and exact FST timestamp conversion are concrete correctness work supporting retention. Their implementation evidence is separate from the existing activity capture. This review inspected current code and documentation; the project's production/query-accuracy claims were not independently reproduced. [Bit/part selects](#source-review-20261103-implementation) · [Timestamp correction](#source-review-20261103-time).

### Reviewed implementation update, November 25, 2026

November 16 fixes clock sampling over long histories, including held and sparse values. Generated FST regressions exercise 220,003 clock edges and explicit completeness assertions. November 20 separately fixes the lifetime of the cffi buffer used for aggregated-bus point reads, preventing a native-read lifetime error. That later change lay outside the November 19 capture and is included in the November 28 recapture. [Clock sampling](#source-long-wave-fix) · [Regression](#source-long-wave-regression) · [Buffer correction](#source-bus-buffer-fix) · [Retained implementation](#source-bus-buffer-retained).

At the November 25 review the saved meaningful checkpoint was 2026-11-16 UTC. The source and retained tests were inspected, not independently executed.

### November 28 activity recapture

The canonical first-parent history now includes the November 20 aggregated-bus buffer correction. The local cffi allocation stays alive until the returned native value has been decoded. The meaningful activity checkpoint advances to that commit; no description or scope change is needed. This is a source-inspected correctness repair, not a new numerical accuracy result. [Correction](#source-bus-buffer-fix) · [Retained code](#source-bus-buffer-retained).

### Selection and shared implementation boundary

The third-party notices identify the TraceWeave references in the FSDB-to-FST converter, including time-scale parsing, reader interface/build details and bit-array and time-tag interpretation. The notices separately credit its influence on first-divergence feature priority and describe the wave-mcp converter and comparison implementation boundaries. This is not a wholly independent FSDB reader implementation. Retain wave-mcp for its own pyslang-based static elaboration, FST session queries, pass/fail comparison and browser waveform handoff; TraceWeave supplies a distinct log-centered and failure-replay workflow. Do not attribute either project's complete functionality, compatibility results or history to the other. [Declared attribution](#source-related-traceweave-attribution) · [Related workflow](#source-related-traceweave-workflow).
