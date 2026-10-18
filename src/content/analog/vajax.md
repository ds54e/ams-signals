---
name: VAJAX
summary: JAX-based analog simulator that compiles Verilog-A device models through an OpenVAF-derived path and evaluates circuit equations on CPU or GPU.
description: JAX-based analog simulator that compiles Verilog-A device models through an OpenVAF-derived path and evaluates circuit equations on CPU or GPU. Public analysis code includes DC, transient and frequency-domain workflows; model coverage, backend setup and numerical behavior remain implementation-specific rather than universal SPICE compatibility.
scope:
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Code co-development credits accompany the SCCP optimizer and its production integration. The retained MIR pass propagates constants, tracks executable edges and removes dead blocks before JAX model code generation."
  sources: ["development-sccp-implementation", "activity", "development-sccp-retained"]
  reviewedAt: "2026-10-18"
access: Public Python/Rust source; JAX, OpenVAF integration and any selected GPU runtime must be configured separately.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/ChipFlow/vajax
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/ChipFlow/vajax/blob/2dfc4072cc8a00bef4e5773619dbda3e9a413220/README.md
- id: activity
  title: 'feat: SCCP constant propagation eliminates 73% of PSP103 dead blocks'
  url: https://github.com/ChipFlow/vajax/commit/5ae5deefa600e037ba8891d2e033b425cdddcd3b
- id: implementation-1
  title: 'Released implementation: vajax/analysis/engine.py'
  url: https://github.com/ChipFlow/vajax/blob/2dfc4072cc8a00bef4e5773619dbda3e9a413220/vajax/analysis/engine.py
- id: implementation-2
  title: 'Released implementation: vajax/analysis/dc_operating_point.py'
  url: https://github.com/ChipFlow/vajax/blob/2dfc4072cc8a00bef4e5773619dbda3e9a413220/vajax/analysis/dc_operating_point.py
- id: "development-sccp-implementation"
  title: "Claude Code co-developed SCCP implementation"
  url: https://github.com/ChipFlow/vajax/commit/87d2f855f10050bc4c9c38c9cf8fc73c3bdc8318
- id: "development-sccp-retained"
  title: "Retained MIR constant-propagation implementation"
  url: https://github.com/ChipFlow/vajax/blob/2dfc4072cc8a00bef4e5773619dbda3e9a413220/openvaf_jax/mir/constprop.py
---

### Implementation and boundaries

The circuit engine implements electrical analyses using compiled model evaluations and numerical solvers. JAX/GPU acceleration is not runtime AI. The selected constant-propagation implementation changes production model code generation; performance percentages in its commit title are author claims, not reproduced catalog results. VACASK is a component dependency, and its history is not aggregated into this project. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `5ae5deefa600e037ba8891d2e033b425cdddcd3b` (2026-03-30 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

The original Claude Code co-developed SCCP implementation adds a constant lattice, executable-edge tracking, worklist propagation and PHI filtering, integrated with MIR code generation. Current constant propagation and production code generation retain this optimizer; attribution covers the subsystem rather than the whole simulator or its dependencies. [Attributed implementation](#source-development-sccp-implementation) · [Retained optimizer](#source-development-sccp-retained) · [Production integration](#source-activity).
