---
name: "RTLDebugDBKit + RTLTracer"
aliases: []
description: "Elaborates SystemVerilog into an instance-level SQLite dependency database for static RTL debug. The companion RTLTracer follows signals, drivers, fan-in, fan-out and bit-level paths through that data; stored relations describe design structure rather than runtime waveform values."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer's Claude Code-attributed PR implements branch-context extraction, static branch verdicts and loop iteration metadata across the extractor and SQL schema. Current statement-walker code retains this branch-context machinery."
  sources: ["development-audit-attribution", "development-audit-implementation", "development-audit-retained"]
  reviewedAt: "2026-10-12"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
sources:
  - id: "code"
    title: "Canonical RTLDebugDBKit + RTLTracer repository"
    url: "https://github.com/neveltyc/RTLDebugDBKit"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/7c5d46d4bd15ceee3f9073cbb3568a09d1100cfa/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/main.cpp"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/7c5d46d4bd15ceee3f9073cbb3568a09d1100cfa/src/main.cpp"
  - id: "activity"
    title: "Correct VCS library loading and report duplicate source definitions"
    url: "https://github.com/neveltyc/RTLDebugDBKit/commit/7c5d46d4bd15ceee3f9073cbb3568a09d1100cfa"
  - id: "rtltracer"
    title: "RTLTracer database consumer"
    url: "https://github.com/neveltyc/RTLTracer"
  - id: "development-audit-attribution"
    title: "Maintainer PR with explicit Claude Code attribution and implementation scope"
    url: "https://github.com/neveltyc/RTLDebugDBKit/pull/30"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/neveltyc/RTLDebugDBKit/commit/5562c841b72ba1a9e0ed93a399914582eb6a0d6f"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/0feb1ff87d53cfe831679cf4e63c16bf5a24a2bd/src/extract/StatementWalker.h"
---

### Implementation and scope

Slang elaboration exports instance-level hierarchy, connections, source statements, control conditions and static dependencies into SQLite. RTLTracer is a separate downstream query consumer. These are conventional Verification/debug operations; the database is a read-only structural record, not generated RTL or a runtime waveform store. [Reviewed schema and overview](#source-readme); [consumer](#source-rtltracer).

### Reviewed activity and limits

The September 29 implementation correctly treats -v inputs as library files, preserves source-definition precedence and reports duplicate source definitions. VCS-compatible parsing and single-compilation-unit support improve acceptance of existing RTL without changing the schema's static semantics. Database analysis can be complete, partial or hierarchy-only; successful export alone does not remove recorded analysis gaps. Only RTLDebugDBKit history supplies activity for this combined entry. [Reviewed change](#source-activity); [current loading implementation](#source-implementation).

### Development provenance

The PR explicitly identifies Claude Code and its inspected implementation adds a normalized branching context, per-arm labels, statement/reference linkage and loop-index handling across schema and extraction. This supports substantial-subsystem implementation provenance, with attribution grounded in the PR and actual integrated diff rather than its branch name. [Attribution](#source-development-audit-attribution) · [Implementation](#source-development-audit-implementation) · [Retained code](#source-development-audit-retained)
