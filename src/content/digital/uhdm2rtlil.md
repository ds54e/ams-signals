---
name: "uhdm2rtlil"
aliases: []
description: "SystemVerilog synthesis frontend that translates elaborated Surelog/UHDM designs into Yosys RTLIL. It can invoke Surelog in-process or read an existing UHDM database, then exposes the imported circuit to Yosys optimization and technology mapping; its equivalence and co-simulation suites validate the frontend."
scope:
  synthesis:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The project documents iterative Claude implementation of SystemVerilog-to-RTLIL handlers, with credited executable harness corrections retained in the canonical project. The reviewed evidence does not establish that AI built most of the project."
  sources: ["development-implementation-20261018", "development-retained-20261018", "development-1"]
  reviewedAt: '2026-10-18'
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-18"
sources:
  - id: "code"
    title: "Canonical uhdm2rtlil repository"
    url: "https://github.com/alainmarcel/uhdm2rtlil"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/alainmarcel/uhdm2rtlil/blob/254630189f33a046fe416779b02118d6a6b164d7/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/frontends/uhdm/uhdm2rtlil.cpp"
    url: "https://github.com/alainmarcel/uhdm2rtlil/blob/254630189f33a046fe416779b02118d6a6b164d7/src/frontends/uhdm/uhdm2rtlil.cpp"
  - id: "activity"
    title: "Merge pull request #697 from alainmarcel/nonzero_lsb_range"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/e591c178fc1479931d41be5abf2d046e81320c6b"
  - id: "development-1"
    title: "Maintainer account of AI-assisted frontend implementation"
    url: "https://github.com/alainmarcel/uhdm2rtlil/blob/254630189f33a046fe416779b02118d6a6b164d7/README.md"
  - id: "development-2"
    title: "Initial implementation"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/0088173202e17de056690375880593dff157681a"
  - id: "activity-refresh"
    title: "Correct generated co-simulation configuration wrappers"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/254630189f33a046fe416779b02118d6a6b164d7"
  - id: "activity-current"
    title: "Mixed-array field writes preserve process-owned element temporaries"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/42b1c3b0324c1e676ccb657aecfc7b35ecf9dda8"
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/cae3a36517cae5bc47f0f551fcf158d665e71d49"
  - id: "development-implementation-20261018"
    title: "AI-credited executable implementation"
    url: "https://github.com/alainmarcel/uhdm2rtlil/commit/881f366a4a5671cce25270abc1f87127f016c9f8"
  - id: "development-retained-20261018"
    title: "Retained executable code at the reviewed canonical head"
    url: "https://github.com/alainmarcel/uhdm2rtlil/blob/52374ad92ba012675e3c586ee4d94bc8c06e69da/test/core_sweep.py"
---

### Implementation context

The frontend registers `read_sv` for in-process Surelog elaboration and `read_uhdm` for an existing database. It translates elaborated modules, processes, expressions and other supported constructs into Yosys RTLIL; Yosys then supplies optimization and mapping. The maintainer documents Claude-driven implementation of the translation handlers. Reported comparison campaigns validate exercised constructs and do not establish complete SystemVerilog support. [Usage and development account](#source-readme); [translation implementation](#source-implementation).

### Release boundary

Reviewed October 1, 2026 at `254630189f33a046fe416779b02118d6a6b164d7`. The October 1 head corrects generated co-simulation wrappers, including port-name parsing and duplicate configuration parameters. These are frontend-validation harness repairs; reported sweep results remain author-reported and include explicitly unmeasured or divergent cases. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

### Scope classification

UHDM-to-RTLIL lowering explicitly enables Yosys synthesis. Equivalence/co-simulation campaigns test the frontend itself and do not add a user-facing Verification stage. The intermediate representation does not warrant a second Design mark by itself. [Reviewed source](#source-readme).

UHDM-to-RTLIL compilation and translation-validation campaigns execute conventionally. The author documents Claude-driven core translation-handler development, supporting AI-assisted development without turning synthesis into AI Synthesis. [AI/stage evidence](#source-readme).

### Development provenance review

The earlier reviewed implementation supports **AI-ASSISTED**. The initial vibe-coding implementation and maintainer’s iterative Claude handler-development account concern the actual C++ translation core. The account attributes executable frontend development, but does not establish that AI built most of the project. [Current maintainer development account](#source-development-1); [Initial implementation](#source-development-2).

### Current implementation and operating boundaries

The reviewed lowering path handles unpacked-array function arguments/outputs, function-local loop lifetime and NBA driver cases. The captured head additionally repairs dropped writes to nested struct members in function-local variables, with an equivalence regression. Scope remains phase-specific lowering rather than a language-completeness guarantee. [Reviewed implementation integration](#source-review-20261011-1)

The implementation review preserves functional Scope. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.

The project documents iterative Claude implementation of SystemVerilog-to-RTLIL handlers, with credited executable harness corrections retained in the canonical project. The reviewed evidence does not establish that AI built most of the project. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).
