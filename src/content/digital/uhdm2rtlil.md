---
name: "uhdm2rtlil"
aliases: []
roles: ["eda-tool"]
primary: "frontend-synthesis"
ai: "ai-built"
description: "Surelog/UHDM-to-RTLIL frontend importing SystemVerilog designs into Yosys, with equivalence and RTL co-simulation campaigns checking the translation."
keywords: ["UHDM", "RTLIL", "Yosys", "SystemVerilog"]
areas:
  frontend-synthesis: core
  formal-verification: supporting
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

### Scope

The implementation imports UHDM expressions, processes, modules and memory into RTLIL. Equivalence and co-simulation are supporting frontend validation. [Project documentation](#source-readme).

### Classification

The README describes Claude-driven implementation of C++ translation handlers. Core translation changes corroborate AI-built rather than a documentation-only use. [Reviewed source](#source-readme).

### Release boundary

Campaign results concern the exercised designs and constructs. The frontend is not itself a replacement for the verification engines. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
