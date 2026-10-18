---
name: TraceWeave
description: Simulation-debugging MCP server that relates logs, waveform events and RTL hierarchy/connectivity to trace failure evidence. VCD and optional native waveform backends support signal-history, driver and cross-run queries; external assistants can use those results, while the released analysis tools remain deterministic.
scope:
  verification:
    ai: false
access: Public Python implementation; FSDB/FST and commercial-tool integration require their documented native dependencies.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/gokeshenzhen/TraceWeave
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/gokeshenzhen/TraceWeave/blob/a2654bcba727bc8676dde84d230a3d3871f6defc/README.md
- id: activity
  title: 'perf(fsdb): stream compact clock indexes'
  url: https://github.com/gokeshenzhen/TraceWeave/commit/a2654bcba727bc8676dde84d230a3d3871f6defc
- id: implementation-1
  title: 'Released implementation: src/x_trace.py'
  url: https://github.com/gokeshenzhen/TraceWeave/blob/a2654bcba727bc8676dde84d230a3d3871f6defc/src/x_trace.py
- id: implementation-2
  title: 'Released implementation: src/source_graph_x_trace.py'
  url: https://github.com/gokeshenzhen/TraceWeave/blob/a2654bcba727bc8676dde84d230a3d3871f6defc/src/source_graph_x_trace.py
---

### Implementation and boundaries

X-source tracing and guarded source-graph expansion implement Verification evidence analysis. An MCP client can reason over the results, but the interface alone does not supply a released model decision procedure. The selected change streams compact FSDB clock indexes with tests, rather than promoting an incidental metadata update to meaningful activity. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `a2654bcba727bc8676dde84d230a3d3871f6defc` (2026-10-13 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
