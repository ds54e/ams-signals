---
name: TraceWeave
description: Simulation-debugging MCP server that relates logs, waveform events and RTL hierarchy/connectivity to trace failure evidence. VCD and optional native waveform backends support signal-history, driver and cross-run queries; external assistants can use those results, while the released analysis tools remain deterministic.
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for implementing worker-thread offload and cooperative cancellation for waveform tools. The canonical project retains the server dispatch, cancellation and query checkpoints."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: Public Python implementation; FSDB/FST and commercial-tool integration require their documented native dependencies.
addedAt: '2026-10-18'
reviewedAt: '2026-10-23'
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
- id: "development-implementation-20261018"
  title: "AI-credited executable implementation"
  url: "https://github.com/gokeshenzhen/TraceWeave/commit/715740b68196e81603f2717e8c0a97cb7aa018c9"
- id: "development-retained-20261018"
  title: "Retained executable code at the reviewed canonical head"
  url: "https://github.com/gokeshenzhen/TraceWeave/blob/a2654bcba727bc8676dde84d230a3d3871f6defc/src/cancellation.py"
- id: website
  title: Official package page
  url: https://pypi.org/project/traceweave-mcp/
  purpose: official
---

### Implementation and boundaries

X-source tracing and guarded source-graph expansion implement Verification evidence analysis. An MCP client can reason over the results, but the interface alone does not supply a released model decision procedure. The selected change streams compact FSDB clock indexes with tests, rather than promoting an incidental metadata update to meaningful activity. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `a2654bcba727bc8676dde84d230a3d3871f6defc` (2026-10-13 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

Claude is credited for implementing worker-thread offload and cooperative cancellation for waveform tools. The canonical project retains the server dispatch, cancellation and query checkpoints. This supports AI-assisted development without establishing that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
