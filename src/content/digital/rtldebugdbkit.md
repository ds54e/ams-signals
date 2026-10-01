---
name: "RTLDebugDBKit + RTLTracer"
aliases: []
description: "Elaborates SystemVerilog into an instance-level SQLite dependency database for static RTL debug. The companion RTLTracer follows signals, drivers, fan-in, fan-out and bit-level paths through that data; stored relations describe design structure rather than runtime waveform values."
scope:
  verification:
    ai: false
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
---

### Implementation and scope

Slang elaboration exports instance-level hierarchy, connections, source statements, control conditions and static dependencies into SQLite. RTLTracer is a separate downstream query consumer. These are conventional Verification/debug operations; the database is a read-only structural record, not generated RTL or a runtime waveform store. [Reviewed schema and overview](#source-readme); [consumer](#source-rtltracer).

### Reviewed activity and limits

The September 29 implementation correctly treats -v inputs as library files, preserves source-definition precedence and reports duplicate source definitions. VCS-compatible parsing and single-compilation-unit support improve acceptance of existing RTL without changing the schema's static semantics. Database analysis can be complete, partial or hierarchy-only; successful export alone does not remove recorded analysis gaps. Only RTLDebugDBKit history supplies activity for this combined entry. [Reviewed change](#source-activity); [current loading implementation](#source-implementation).
