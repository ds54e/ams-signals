---
name: TraceWeave
description: "Simulation-debugging MCP server combining logs, waveform queries, source connectivity and bounded temporal checks over recorded runs. Explains supported SVA, replays logged failures with explicit evidence gaps, and optionally exports grouped Verdi waveform views. External assistants interpret the evidence; replay does not establish a general property proof."
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
reviewedAt: "2026-11-28"
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
- id: review-20261128-activity
  title: "November 25 decisive-evidence highlighting"
  url: "https://github.com/gokeshenzhen/TraceWeave/commit/182493760e4557d17229f7bcc9306ebd50d661de"
- id: review-20261128-rc
  title: "Retained Verdi RC generation"
  url: "https://github.com/gokeshenzhen/TraceWeave/blob/b4a18c1c50786ec1cc674d9e249c4bf00ec6026e/src/verdi_rc.py"
- id: review-20261128-export
  title: "Retained optional FSDB issue-view exporter"
  url: "https://github.com/gokeshenzhen/TraceWeave/blob/b4a18c1c50786ec1cc674d9e249c4bf00ec6026e/scripts/export_verdi_rc.py"
- id: review-20261128-rc-tests
  title: "Retained exact path, slice and evidence-role tests"
  url: "https://github.com/gokeshenzhen/TraceWeave/blob/b4a18c1c50786ec1cc674d9e249c4bf00ec6026e/tests/test_verdi_rc.py"
- id: related-wave-mcp-attribution
  title: "wave-mcp account of FSDB converter references and design influence"
  url: "https://github.com/Tencent/wave-mcp/blob/c1fdbf0a9b3b66c5251b94351943031e3132d97a/docs/THIRD_PARTY.md"
---

### Implemented workflow and selection

TraceWeave combines simulation-log evidence with source/connectivity analysis and waveform queries. Its distinct workflow includes failure-anchored property explanation/replay and bounded temporal/handshake checks, rather than only displaying traces or exposing a waveform reader. Available structural backends include Source Graph, optional Verdi NPI and basic static analysis; their dependency and query-coverage boundaries differ. [Workflow and installation](#source-readme).

### Recorded-property boundary

`explain_property` statically interprets supported SVA through the optional Slang frontend. `verify_window` property mode samples recorded values around a supplied failure and distinguishes `failure_reproduced`, `not_reproduced`, `insufficient_evidence` and `unsupported`. Pending attempts, incomplete history and reader limits remain evidence gaps. A local replay result neither proves the property over all behaviors nor establishes the root cause by itself. The tools are deterministic; the external assistant supplies model-driven interpretation. [Semantics](#source-property-semantics) · [Replay implementation](#source-property-replay) · [Regression cases](#source-property-regression).

FSDB needs the vendor reader SDK/runtime, while NPI/KDB additionally depends on the relevant EDA runtime and license. Source Graph provides a separate optional semantic frontend; it does not inherit NPI coverage. This review inspected public source and tests without running EDA or independently reproducing benchmark claims. [Access boundaries](#source-readme).

### Reviewed activity and development provenance

The existing meaningful checkpoint and activity capture remain separately recorded. Claude is credited for the retained worker-thread offload and cooperative-cancellation implementation, supporting AI-assisted development of that contribution. This provenance does not attribute every later analysis feature to AI. [Meaningful checkpoint](#source-activity) · [Credited implementation](#source-development-implementation-20261018) · [Retained cancellation code](#source-development-retained-20261018).

### November 28 source review and selection boundary

The November 25 implementation renders Verdi RC files using confirmed failure times, exact FSDB declaration paths and validated packed slices. Source-edit groups and explicitly designated evidence receive distinguishable display roles. The optional exporter validates recorded waveform identities; regressions cover path, slice and role handling. It prepares a reviewable waveform view, not proof that an edit repairs a design. Verdi/FSDB access remains dependent on the site runtime. No commercial viewer or regression was independently run. [Highlight integration](#source-review-20261128-activity) · [RC generation](#source-review-20261128-rc) · [Exporter](#source-review-20261128-export) · [Tests](#source-review-20261128-rc-tests).

Retain TraceWeave separately from wave-mcp because its log-anchored failure replay and issue-view handoff are distinct operations. The latter's third-party notice credits TraceWeave for specific FSDB converter implementation references and first-divergence feature prioritization; shared lineage is not independent validation of the related paths and does not combine the two repositories' histories. [Recorded-property contract](#source-property-semantics) · [Attribution](#source-related-wave-mcp-attribution).
