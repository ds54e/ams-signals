---
name: sv-tests
description: SystemVerilog language-feature test suite with runners for multiple parsers, simulators and synthesis tools. Small source cases and executable integration examples expose compatibility differences through generated reports; passing selected tests does not certify complete language support or production-design correctness.
scope:
  verification:
    ai: false
access: Public tests and runner infrastructure; tool installations and third-party integration dependencies are configured separately.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/chipsalliance/sv-tests
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/chipsalliance/sv-tests/blob/3b80a0fa421d111652832f16a85137fc658d213b/README.md
- id: activity
  title: 'Merge pull request #8656 from wsnyder/sequence_asserts'
  url: https://github.com/chipsalliance/sv-tests/commit/c527acc461be115da8aa1a50f9756942c4a8b366
- id: implementation-1
  title: 'Released implementation: tools/runners/Verilator.py'
  url: https://github.com/chipsalliance/sv-tests/blob/3b80a0fa421d111652832f16a85137fc658d213b/tools/runners/Verilator.py
- id: implementation-2
  title: 'Released implementation: tests/chapter-7/arrays/associative/assignment.sv'
  url: https://github.com/chipsalliance/sv-tests/blob/3b80a0fa421d111652832f16a85137fc658d213b/tests/chapter-7/arrays/associative/assignment.sv
---

### Implementation and boundaries

The language cases and tool runners implement Verification of tool behavior, with independent value alongside the tools being tested. The selected sequence-assertion update changes technical test coverage. Automated tool-submodule bumps remain in raw counts but are not the meaningful-freshness basis. This is not an explicit AI benchmark, so no AI prefix is assigned. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `c527acc461be115da8aa1a50f9756942c4a8b366` (2026-07-02 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
