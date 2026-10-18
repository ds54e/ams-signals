---
name: sv2v
description: Translates synthesizable SystemVerilog into Verilog for toolchains with narrower language support. Haskell conversion passes lower constructs such as packages, interfaces and structs while retaining explicit unsupported-feature boundaries; translation prepares a design for downstream tools rather than performing logic synthesis or proving equivalence.
scope:
  design:
    ai: false
access: Public Haskell implementation; supported input constructs and downstream tool compatibility follow the project documentation.
addedAt: '2026-10-18'
reviewedAt: '2026-10-18'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/zachjs/sv2v
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/zachjs/sv2v/blob/493a88f930802da68f592c192ec86991eaf95c49/README.md
- id: activity
  title: fix struct member accesses within field select bounds (#330)
  url: https://github.com/zachjs/sv2v/commit/493a88f930802da68f592c192ec86991eaf95c49
- id: implementation-1
  title: 'Released implementation: src/Convert.hs'
  url: https://github.com/zachjs/sv2v/blob/493a88f930802da68f592c192ec86991eaf95c49/src/Convert.hs
- id: implementation-2
  title: 'Released implementation: src/Convert/Struct.hs'
  url: https://github.com/zachjs/sv2v/blob/493a88f930802da68f592c192ec86991eaf95c49/src/Convert/Struct.hs
---

### Implementation and boundaries

Language lowering is a user-facing Design transformation. The selected struct-member/field-bound correction changes conversion semantics and adds paired input/output regression fixtures. Synthesis is left to downstream tools, and conversion alone does not establish Verification. The older release label does not override the substantive August 2026 implementation change. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The meaningful checkpoint is `493a88f930802da68f592c192ec86991eaf95c49` (2026-08-18 UTC), verified in the captured canonical default branch's first-parent history. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).
