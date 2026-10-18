---
name: AMBU-CovAgent
description: LLM-driven functional-coverage closure loop for SystemVerilog designs tested with cocotb and Verilator. It selects uncovered bins, generates directed tests and reruns simulation with coverage and scoreboard checks; supplied FIFO, UART and bus-bridge examples bound the demonstrated workflow rather than proving universal closure.
scope:
  verification:
    ai: true
access: Public Python agent and RTL/testbench examples; requires Verilator, cocotb and model access for directed-test generation.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/KrishnaKumarVedantam/AMBU-CovAgent
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/KrishnaKumarVedantam/AMBU-CovAgent/blob/2a9041dd488e1890daa072cae1577c6e8f9a5892/README.md
- id: activity
  title: 'v2.10.3.2-production: reactive monitor + CDC fix + orphan-check verified across all 3 designs (FIFO, UART, AHB2APB) at 100% coverage'
  url: https://github.com/KrishnaKumarVedantam/AMBU-CovAgent/commit/fe8dfd87829c2a6a2f015acc236796afaf59bed4
- id: implementation-1
  title: 'Released implementation: agent/agent.py'
  url: https://github.com/KrishnaKumarVedantam/AMBU-CovAgent/blob/2a9041dd488e1890daa072cae1577c6e8f9a5892/agent/agent.py
- id: implementation-2
  title: 'Released implementation: framework/scoreboard_base.py'
  url: https://github.com/KrishnaKumarVedantam/AMBU-CovAgent/blob/2a9041dd488e1890daa072cae1577c6e8f9a5892/framework/scoreboard_base.py
---

### Implementation and boundaries

Target selection and directed cocotb test generation place AI in Verification, not DUT Design. The selected reactive-monitor/CDC implementation fixes scoreboard behavior across supplied designs. Reported coverage is specific to those bins and runs; independent integrity verification of all generated tests remains a stated roadmap boundary, and no closure or data-integrity result was reproduced. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `fe8dfd87829c2a6a2f015acc236796afaf59bed4` (2026-08-06 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
