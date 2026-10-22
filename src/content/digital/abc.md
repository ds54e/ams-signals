---
name: "ABC"
aliases: []
description: "Logic synthesis and formal-verification system with an independent command shell and reusable algorithms. AIG optimization, technology mapping, equivalence checking and sequential property checking operate on supported logic models; assertion languages and RTL elaboration are normally handled by surrounding frontends."
scope:
  synthesis:
    ai: false
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting Booth-multiplier result widths in executable bit-blasting code. The canonical implementation retains the product-width truncation before result extension."
  sources: [development-code-20261022, development-retained-20261022]
  reviewedAt: '2026-10-22'
access: "Public C/C++ implementation; a supported compiler/build environment and appropriate logic-model inputs are required."
addedAt: "2026-10-22"
reviewedAt: '2026-10-22'
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/berkeley-abc/abc"
    purpose: "code"
  - id: "readme"
    title: "Project overview at the reviewed revision"
    url: "https://github.com/berkeley-abc/abc/blob/fba0adf4ccca0be59ddc6e77a85eb0cc64e04a8b/README.md"
  - id: "implementation-1"
    title: "Reviewed source: src/base/abci/abc.c"
    url: "https://github.com/berkeley-abc/abc/blob/fba0adf4ccca0be59ddc6e77a85eb0cc64e04a8b/src/base/abci/abc.c"
  - id: "activity"
    title: "Reviewed meaningful change: Merge pull request #591 from zxxr1113/sresub-drw-upstream-20261020"
    url: "https://github.com/berkeley-abc/abc/commit/fba0adf4ccca0be59ddc6e77a85eb0cc64e04a8b"
  - id: development-code-20261022
    title: Credited executable development contribution
    url: https://github.com/berkeley-abc/abc/commit/aac431579195bb077258e3bdcc853a84067646b0
  - id: development-retained-20261022
    title: Retained executable contribution at the reviewed head
    url: https://github.com/berkeley-abc/abc/blob/fba0adf4ccca0be59ddc6e77a85eb0cc64e04a8b/src/base/wlc/wlcBlast.c
---

### Implemented operations and boundaries

The independent command system exposes synthesis/mapping and formal operations. Supported logic-model inputs and selected engines determine semantics; ABC is not a direct full-SVA elaborator merely because Yosys uses it.

[Project overview](#source-readme); [Source 1](#source-implementation-1).

### Scope and activity review

The exposed operations support Synthesis, Verification. The reviewed operations are conventional; a CLI, API, MCP interface or software-development assistance alone does not add a runtime AI prefix.

The meaningful checkpoint is 2026-10-21T18:49:03Z (`fba0adf4ccca0be59ddc6e77a85eb0cc64e04a8b`), reviewed independently from later cosmetic or version-only changes. [Implementation activity](#source-activity).

Review was static: public implementation and published tests/documentation were inspected. No external EDA, model/API benchmark, foundry qualification or numerical-accuracy experiment was independently rerun.

### Development provenance

Claude is co-credited for correcting Booth-multiplier result widths in executable bit-blasting code. The canonical implementation retains the product-width truncation before result extension. This supports AI-ASSISTED; it does not establish that AI built most of the project. [Credited change](#source-development-code-20261022) · [Retained implementation](#source-development-retained-20261022).
