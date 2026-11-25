---
name: Veri-Sure
description: Multi-agent RTL generation and repair framework sharing a structured design contract across architecture, debugging and formal-check agents. Temporal traces and dependency slices narrow edits, while model-authored assertions and reference models feed conventional simulation and proof tools; benchmark results remain author-reported.
scope:
  design:
    ai: true
  verification:
    ai: true
access: Public Python agents and benchmark tooling; compatible model endpoints, simulation and formal tools are required.
addedAt: '2026-10-18'
reviewedAt: "2026-11-25"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/xyjoey/Veri-Sure
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/xyjoey/Veri-Sure/blob/aab5bed60f04157a4be8581b53f9e913287ba328/README.md
- id: activity
  title: support Anthropic and Gemini style endpoints, switch to .env configuration
  url: https://github.com/xyjoey/Veri-Sure/commit/aab5bed60f04157a4be8581b53f9e913287ba328
- id: implementation-1
  title: 'Released implementation: eda_agent/architect_agent.py'
  url: https://github.com/xyjoey/Veri-Sure/blob/aab5bed60f04157a4be8581b53f9e913287ba328/eda_agent/architect_agent.py
- id: implementation-2
  title: 'Released implementation: eda_agent/asserter_agent.py'
  url: https://github.com/xyjoey/Veri-Sure/blob/aab5bed60f04157a4be8581b53f9e913287ba328/eda_agent/asserter_agent.py
- id: implementation-3
  title: 'Released implementation: eda_agent/top_agent.py'
  url: https://github.com/xyjoey/Veri-Sure/blob/aab5bed60f04157a4be8581b53f9e913287ba328/eda_agent/top_agent.py
- id: initial-implementation
  title: "January 22 public benchmark runner implementation"
  url: "https://github.com/xyjoey/Veri-Sure/blob/0558d776d120a4cbadf63b49c5228e4171999af1/benchmarks/run_verilog_eval_v2.py"
- id: cvdp-adapter-integration
  title: "October 15 CVDP adapter and runner integration"
  url: "https://github.com/xyjoey/Veri-Sure/commit/b0b01ba38109e4b5db19011d80130c0fbeef4591"
- id: cvdp-runner
  title: "Retained independent Veri-Sure CVDP execution path"
  url: "https://github.com/xyjoey/Veri-Sure/blob/6e92285a08f8010bb9461613f1c9752e80f60eb2/benchmarks/run_cvdp.py"
---

### Implementation and boundaries

Architect and repair agents generate DUT RTL. The Asserter separately creates verification properties, supporting AI Verification even though the underlying proof engine is conventional. Temporal slicing constrains the repair workflow rather than establishing general correctness. The selected provider/configuration update changes runnable endpoint handling. No numerical paper results or broad industrial validation were reproduced. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `aab5bed60f04157a4be8581b53f9e913287ba328` (2026-10-15 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Reviewed implementation and retention, November 25, 2026

January 22 publishes an executable VerilogEval-based benchmark runner. October 15 adds an adapter and runner for supported open-tool CVDP tasks, alongside RTL generation and repair changes; a separate same-day provider update extends the runnable model interface. This demonstrates a substantive second development period despite sparse history. The multi-agent design and assertion/repair workflow remains an independent engineering choice, not a second listing of the CVDP dataset. Its adaptation and reported results are not attributed to canonical CVDP. The later October 26 link edit does not change the meaningful checkpoint. [January implementation](#source-initial-implementation) · [October integration](#source-cvdp-adapter-integration) · [Retained runner](#source-cvdp-runner).

Source inspection only; no EDA or model experiment was independently reproduced.
