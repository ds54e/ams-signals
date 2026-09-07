---
name: "uhdm2rtlil"
aliases: []
description: "SystemVerilog synthesis frontend that imports elaborated Surelog/UHDM designs into Yosys RTLIL. Surelog handles preprocessing and elaboration before translation, allowing Yosys optimization and technology-mapping passes to operate on the imported circuit."
scope:
  synthesis:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The maintainer documents Claude implementing and refining the C++ UHDM-to-RTLIL frontend using UHDM dumps and RTLIL comparisons. The initial implementation and continued handler development support a major role in the translation core."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-09-07"
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
  - id: "development-1"
    title: "Current maintainer development account"
    url: "https://github.com/alainmarcel/uhdm2rtlil/blob/e612fa3e962a50a7c66db135b680101e195d95b4/README.md"
  - id: "development-2"
    title: "Initial implementation"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/0088173202e17de056690375880593dff157681a"
---


### Implementation context

The README describes Claude-driven implementation of C++ translation handlers. The inspected core translation changes corroborate that implementation work. [Reviewed source](#source-readme).

### Release boundary

Campaign results concern the exercised designs and constructs. The frontend is not itself a replacement for the verification engines. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

UHDM-to-RTLIL lowering explicitly enables Yosys synthesis. Equivalence/co-simulation campaigns test the frontend itself and do not add a user-facing Verification stage. The intermediate representation does not warrant a second Design mark by itself. [Reviewed source](#source-readme).

UHDM-to-RTLIL compilation and translation-validation campaigns execute conventionally. The author documents Claude-driven core translation-handler development, justifying AI-built without turning synthesis into AI Synthesis. [AI/stage evidence](#source-readme).

### Development provenance review

Reviewed 2026-09-07: **AI-BUILT**. The initial vibe-coding implementation and maintainer’s iterative Claude handler-development account concern the actual C++ translation core. The approach spans the defining frontend, not merely generated input RTL. [Current maintainer development account](#source-development-1); [Initial implementation](#source-development-2).
