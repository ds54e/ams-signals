---
name: TraceWeave
description: "Simulation-debugging MCP server combining logs, waveform queries, source connectivity and bounded temporal checks over recorded runs. Its deterministic tools explain supported SVA and replay logged assertion failures against captured waveforms, preserving incomplete or unsupported outcomes; external assistants interpret the evidence, and replay does not establish a general property proof."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for implementing worker-thread offload and cooperative cancellation for waveform tools. The canonical project retains the server dispatch, cancellation and query checkpoints."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: '2026-10-18'
access: Public Python source; FST and Source Graph use optional native dependencies. FSDB requires the vendor reader SDK/runtime, and NPI/KDB operations require the corresponding EDA runtime and site license.
addedAt: '2026-10-18'
reviewedAt: "2026-11-24"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/gokeshenzhen/TraceWeave
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/gokeshenzhen/TraceWeave/blob/4a85798519eb0b8e8ccbdfb5dfddc679b14f1a0e/README.md
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
- id: property-semantics
  title: Recorded-property explanation, replay and evidence boundaries
  url: https://github.com/gokeshenzhen/TraceWeave/blob/4a85798519eb0b8e8ccbdfb5dfddc679b14f1a0e/docs/architecture.md#property-explanations
- id: property-replay
  title: Bounded waveform execution of property plans
  url: https://github.com/gokeshenzhen/TraceWeave/blob/4a85798519eb0b8e8ccbdfb5dfddc679b14f1a0e/src/property_check.py
- id: property-regression
  title: Replay tests for failure, pending and missing-evidence outcomes
  url: https://github.com/gokeshenzhen/TraceWeave/blob/4a85798519eb0b8e8ccbdfb5dfddc679b14f1a0e/tests/test_property_check.py
---

### Implemented workflow and selection

TraceWeave combines simulation-log evidence with source/connectivity analysis and waveform queries. Its distinct workflow includes failure-anchored property explanation/replay and bounded temporal/handshake checks, rather than only displaying traces or exposing a waveform reader. Available structural backends include Source Graph, optional Verdi NPI and basic static analysis; their dependency and query-coverage boundaries differ. [Workflow and installation](#source-readme).

### Recorded-property boundary

`explain_property` statically interprets supported SVA through the optional Slang frontend. `verify_window` property mode samples recorded values around a supplied failure and distinguishes `failure_reproduced`, `not_reproduced`, `insufficient_evidence` and `unsupported`. Pending attempts, incomplete history and reader limits remain evidence gaps. A local replay result neither proves the property over all behaviors nor establishes the root cause by itself. The tools are deterministic; the external assistant supplies model-driven interpretation. [Semantics](#source-property-semantics) · [Replay implementation](#source-property-replay) · [Regression cases](#source-property-regression).

FSDB needs the vendor reader SDK/runtime, while NPI/KDB additionally depends on the relevant EDA runtime and license. Source Graph provides a separate optional semantic frontend; it does not inherit NPI coverage. This review inspected public source and tests without running EDA or independently reproducing benchmark claims. [Access boundaries](#source-readme).

### Reviewed activity and development provenance

The existing meaningful checkpoint and activity capture remain separately recorded. Claude is credited for the retained worker-thread offload and cooperative-cancellation implementation, supporting AI-assisted development of that contribution. This provenance does not attribute every later analysis feature to AI. [Meaningful checkpoint](#source-activity) · [Credited implementation](#source-development-implementation-20261018) · [Retained cancellation code](#source-development-retained-20261018).
