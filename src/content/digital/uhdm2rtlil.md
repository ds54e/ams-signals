---
name: "uhdm2rtlil"
aliases: []
description: "Surelog/UHDM-to-RTLIL frontend importing SystemVerilog designs into Yosys, with equivalence and RTL co-simulation campaigns checking the translation."
flow: {"synthesis":"core","verification":"supporting"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical uhdm2rtlil repository"
    url: "https://github.com/alainmarcel/uhdm2rtlil"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/alainmarcel/uhdm2rtlil/blob/e591c178fc1479931d41be5abf2d046e81320c6b/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/frontends/uhdm/uhdm2rtlil.cpp"
    url: "https://github.com/alainmarcel/uhdm2rtlil/blob/e591c178fc1479931d41be5abf2d046e81320c6b/src/frontends/uhdm/uhdm2rtlil.cpp"
  - id: "activity"
    title: "Merge pull request #697 from alainmarcel/nonzero_lsb_range"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/e591c178fc1479931d41be5abf2d046e81320c6b"
---


### Implementation context

The README describes Claude-driven implementation of C++ translation handlers. The inspected core translation changes corroborate that implementation work. [Reviewed source](#source-readme).

### Release boundary

Campaign results concern the exercised designs and constructs. The frontend is not itself a replacement for the verification engines. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

UHDM-to-RTLIL lowering explicitly enables Yosys synthesis. Released equivalence/co-simulation campaigns support translation validation; they are not a standalone proof engine. The intermediate representation does not warrant a second Design mark by itself. [Reviewed source](#source-readme).
