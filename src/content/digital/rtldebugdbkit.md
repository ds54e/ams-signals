---
name: "RTLDebugDBKit"
aliases: []
description: "Elaborates SystemVerilog into an instance-level SQLite database for static RTL debug. Its schema links hierarchy, connections, source statements, control conditions and dependencies, with explicit analysis gaps and mapping precision for downstream queries; it records design structure rather than simulation values."
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
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Canonical RTLDebugDBKit repository"
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
    title: "Separate RTLTracer database consumer and schema compatibility"
    url: "https://github.com/neveltyc/RTLTracer/blob/2f5d4c905fd54dd8d6bd12f0024fa924b7695679/README.md"
  - id: "review-20261124-schema"
    title: "Current extractor schema, public views and analysis boundaries"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/3b62e10cf0cbefb11fbef9845a31997270a8bd65/README.md"
  - id: "review-20261124-extractor"
    title: "Current SystemVerilog-to-database extraction entry point"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/3b62e10cf0cbefb11fbef9845a31997270a8bd65/src/main.cpp"
  - id: "development-audit-attribution"
    title: "Maintainer PR with explicit Claude Code attribution and implementation scope"
    url: "https://github.com/neveltyc/RTLDebugDBKit/pull/30"
  - id: "development-audit-implementation"
    title: "Reviewed AI-attributed implementation"
    url: "https://github.com/neveltyc/RTLDebugDBKit/commit/5562c841b72ba1a9e0ed93a399914582eb6a0d6f"
  - id: "development-audit-retained"
    title: "Retained implementation at the reviewed repository head"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/0feb1ff87d53cfe831679cf4e63c16bf5a24a2bd/src/extract/StatementWalker.h"
  - id: november-extraction-fix
    title: "November 16 extraction and SQL view corrections"
    url: "https://github.com/neveltyc/RTLDebugDBKit/commit/3b62e10cf0cbefb11fbef9845a31997270a8bd65"
  - id: extraction-regression
    title: "Retained database extraction and consistency tests"
    url: "https://github.com/neveltyc/RTLDebugDBKit/blob/3b62e10cf0cbefb11fbef9845a31997270a8bd65/scripts/verify-designdb.py"
---

### Implementation and scope

Slang elaboration exports instance-level hierarchy, connections, source statements, control conditions and static dependencies into SQLite. The extractor and its public schema are the independently useful operation retained here: consumers can query stable views and inspect recorded analysis gaps without embedding a SystemVerilog frontend. These are conventional Verification/debug operations; the database is a structural record, not generated RTL or a runtime waveform store. [Current schema](#source-review-20261124-schema) · [Extractor](#source-review-20261124-extractor).

RTLTracer is a separately installed downstream CLI for drivers, loads and bit-level path queries over this database. Its query operations and repository history are not attributed to RTLDebugDBKit; matching schema versions are required. [Companion consumer](#source-rtltracer).

### Reviewed activity and limits

The September 29 implementation correctly treats -v inputs as library files, preserves source-definition precedence and reports duplicate source definitions. VCS-compatible parsing and single-compilation-unit support improve acceptance of existing RTL without changing the schema's static semantics. Database analysis can be complete, partial or hierarchy-only; successful export alone does not remove recorded analysis gaps. Only RTLDebugDBKit history supplies activity for this entry. [Reviewed change](#source-activity); [reviewed loading implementation](#source-implementation).

### Development provenance

The PR explicitly identifies Claude Code and its inspected implementation adds a normalized branching context, per-arm labels, statement/reference linkage and loop-index handling across schema and extraction. This supports AI-assisted development of these retained modules, with attribution grounded in the PR and actual integrated diff rather than its branch name. [Attribution](#source-development-audit-attribution) · [Implementation](#source-development-audit-implementation) · [Retained code](#source-development-audit-retained)

### Reviewed implementation update, November 25, 2026

November 16 corrects static extraction and view edge cases across calls, ports and packages. The implementation distinguishes call outputs from reads in assertion/wait conditions, records system-call writes and excludes a spurious self-connection from view mapping. Construct fixtures and database checks accompany the changes. The database remains a static structural representation, not a complete behavioral model or waveform store. [Correction](#source-november-extraction-fix) · [Checks](#source-extraction-regression).

The reviewed meaningful checkpoint within the existing capture is 2026-11-16 UTC. The source and retained tests were inspected, not independently executed.
