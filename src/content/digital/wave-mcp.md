---
name: "wave-mcp"
aliases: []
description: "RTL debug server and CLI exposing waveform values, hierarchy, drivers, X tracing and pass/fail comparisons through pyslang and FST analysis. It can prepare sessions from existing FST or converted VCD/FSDB data and open a synchronized browser viewer; simulation and model-driven diagnostic decisions stay in the external workflow."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-03"
sources:
  - id: "code"
    title: "Canonical wave-mcp repository"
    url: "https://github.com/Tencent/wave-mcp"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/Tencent/wave-mcp/blob/06a0b98be46da9b3f81119c3f97d8833be71b401/README.md"
  - id: "implementation"
    title: "Reviewed implementation: wave_mcp/netlist/trace_engine.py"
    url: "https://github.com/Tencent/wave-mcp/blob/06a0b98be46da9b3f81119c3f97d8833be71b401/wave_mcp/netlist/trace_engine.py"
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
---


### Implementation context

The MCP server exposes implemented waveform and RTL query operations to agents. [Reviewed source](#source-readme).

### Release boundary

The tool reads existing simulation artifacts; it is not a simulator. Reported production and query-accuracy results were not independently reproduced. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

FST queries, connectivity tracing and failure comparisons are debug/verification operations over existing artifacts. Static elaboration does not edit the design. [Reviewed source](#source-readme).

Structured waveform, driver and X-tracing queries serve conventional Verification. The inspected server supplies tools to an external model rather than implementing model-driven debug decisions itself. [AI/stage evidence](#source-readme).

### Current-source review

Reviewed 2026-10-01. Current release adds static-only sessions, source/waveform identity checks, browser views and automatic VCD/FSDB-to-FST preparation. The inspected implementation remains a deterministic analysis toolkit exposed through MCP/CLI, without a packaged substantive model-decision workflow. Verification stays conventional; automatic query preparation or netlist repair is not itself AI. [README](#source-readme); [Trace implementation](#source-implementation).

### Selection and current source review

Release v1.1.1 follows integrated bit/part-select support across waveform queries, analyses, comparisons and tracing, with signedness/range checks and substantial unit/functional regressions. A separate exact-time conversion correction avoids floating-point loss in FST timestamps. This is meaningful technical maintenance of deterministic Verification tools; the generic MCP interface does not establish model-driven diagnostic decisions. The existing description remains adequate and no query-accuracy or production result was independently reproduced. [Implementation and regression evidence](#source-review-20261103-implementation). [Related correction](#source-review-20261103-time).
