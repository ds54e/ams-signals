---
name: "naja-scope"
aliases: []
description: "MCP server for bounded RTL and gate-netlist hierarchy, connectivity, logic-cone and source queries, with optional schematic viewing and beta VHDL loading. Its runnable CVA6 benchmark evaluates AI agents answering post-elaboration verification questions with structural tools versus source search; the server itself returns deterministic design facts."
scope:
  verification:
    ai: true
access: "Apache-2.0 public source and PyPI package; requires Python and najaeda, with optional MCP clients for agent use."
addedAt: "2026-09-18"
reviewedAt: "2026-10-05"
sources:
  - id: "code"
    title: "Canonical naja-scope repository"
    url: "https://github.com/keplertech/naja-scope"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/keplertech/naja-scope/blob/56bd431bb0c426a8627bfaeec19ef5e8846a6106/README.md"
  - id: "activity"
    title: "Integrate optional browser schematic with synchronized design access"
    url: "https://github.com/keplertech/naja-scope/commit/f9cbf1a0cf74ebffb2ef2860f75f3cb447c7380f"
  - id: "benchmark"
    title: "CVA6 post-elaboration agent comparison methodology"
    url: "https://github.com/keplertech/naja-scope/blob/56bd431bb0c426a8627bfaeec19ef5e8846a6106/benchmarks/README.md"
  - id: "benchmark-runner"
    title: "Implemented paired agent-comparison runner"
    url: "https://github.com/keplertech/naja-scope/blob/56bd431bb0c426a8627bfaeec19ef5e8846a6106/benchmarks/run_comparison.py"
  - id: "benchmark-tasks"
    title: "Pinned CVA6 question bank and answer checks"
    url: "https://github.com/keplertech/naja-scope/blob/56bd431bb0c426a8627bfaeec19ef5e8846a6106/benchmarks/cva6-cv32.json"
---

### Structural-query boundary

The server loads an elaborated design and exposes hierarchy, drivers/loads, source ranges, logic cones and retained design intent. Gate-level use needs Liberty data; VHDL support is a restricted beta subset, and intent recovery remains SystemVerilog-only. Optional naja-schematic integration shares the loaded design and adds browser focus, selection and annotations; it does not edit RTL or perform physical layout. [Reviewed capabilities](#source-readme); [schematic implementation](#source-activity).

### AI benchmark classification

AI Verification identifies the released benchmark's evaluated model: Claude Code or Codex answers 17 pinned CVA6 post-elaboration structural, connectivity and interpretation questions. The runner pairs the same model across source-search and MCP-tool arms, records configuration and traces, and implements deterministic checks plus explicit review/invalid outcomes. This is a concrete stage-specific evaluation, not merely a dataset or a generic MCP claim. The server's ordinary queries remain deterministic. [Methodology](#source-benchmark); [runner](#source-benchmark-runner); [task contract](#source-benchmark-tasks).

The headline single-model result is historical and preliminary, not output from the newer repeatable runner or a general RTL accuracy claim. The published bank is deliberately a post-elaboration challenge set. Running it needs a pinned CVA6 checkout, najaeda and provider CLIs/model access; catalog review did not reproduce model runs. [Evaluation limits](#source-benchmark).

### Scope and access limits

Inspection, tracing and the benchmark serve Verification. Viewing/annotating an existing design is not DUT generation or synthesis. The optional Python escape hatch permits arbitrary unsandboxed server-side code, is disabled by default and does not independently establish a design-editing feature. HTTP access has no built-in authentication and requires trusted deployment. [Project limits](#source-readme).

### Canonical repository review

Reviewed 2026-10-05. The repository moved from najaeda to keplertech with the same verified GitHub repository identity. Code and pinned sources use the canonical owner; documentation migration does not replace the prior meaningful implementation checkpoint or change stage/provenance classification. [Canonical implementation](#source-code); [retained implementation checkpoint](#source-activity).
