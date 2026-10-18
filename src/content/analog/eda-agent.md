---
name: EDA Agent
summary: Retrieval-grounded agent that writes and executes Python against a live Virtuoso session to construct schematics and configure simulation tasks.
description: Retrieval-grounded agent that writes and executes Python against a live Virtuoso session to construct schematics and configure simulation tasks. API documentation, scanned design knowledge and prior error resolutions guide code generation and recovery; users supply the licensed EDA environment, bridge, PDK and model service.
scope:
  design:
    ai: true
  simulation:
    ai: true
access: Public Python agent; configured Virtuoso, virtuoso-bridge-lite, PDK and model access are required.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/HrishikeshGawasIIITH/EDA_Agent
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/HrishikeshGawasIIITH/EDA_Agent/blob/50a1b67a9caa3ff74cf1f5572226498523ce73a1/README.md
- id: activity
  title: some bug fixes in tb creation
  url: https://github.com/HrishikeshGawasIIITH/EDA_Agent/commit/9f72d5ebc1cd48cefb03ff5b2673b7adec30515d
- id: implementation-1
  title: 'Released implementation: eda_agent/agent.py'
  url: https://github.com/HrishikeshGawasIIITH/EDA_Agent/blob/50a1b67a9caa3ff74cf1f5572226498523ce73a1/eda_agent/agent.py
---

### Implementation and boundaries

The model generates circuit construction and testbench/analysis setup, receives execution results and can issue follow-up code. This supports AI Design and AI Simulation, rather than merely attributing AI to a generic bridge. Injected layout helpers alone do not establish a reviewed physical-design workflow. The selected commit fixes testbench creation; reported benchmark measurements were not reproduced. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `9f72d5ebc1cd48cefb03ff5b2673b7adec30515d` (2026-06-13 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
