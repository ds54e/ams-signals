---
name: "fasterhenry"
aliases: []
description: "Rust PEEC extractor for frequency-dependent resistance and inductance of three-dimensional conductors. It discretizes conductors into filaments and supports dense and matrix-free solves for structures such as interconnects and coils; geometry, current ports and mesh choices determine what the extracted impedance represents."
scope: {"layout": {"ai": false}, "aiDevelopment": "assisted"}
access: "MIT-licensed Rust implementation with a CLI for supported FastHenry input decks."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
summary: "Extracts frequency-dependent resistance and inductance from three-dimensional conductor models."
developmentEvidence: {"summary": "Claude is co-credited on graded contact-region refinement for plane meshing. The reviewed Rust implementation retains local mesh grading and executable mesh checks.", "sources": ["credited", "retained"], "reviewedAt": "2026-11-24"}
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/2AMLogic/fasterhenry"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/2AMLogic/fasterhenry/commit/195b265274abd2f89fd4d51415377d1143b7f660"
  - id: release
    title: "Published v0.1.1"
    url: "https://github.com/2AMLogic/fasterhenry/releases/tag/v0.1.1"
  - id: validation
    title: "Upstream validation fixtures and limits"
    url: "https://github.com/2AMLogic/fasterhenry/blob/195b265274abd2f89fd4d51415377d1143b7f660/docs/validation.md"
  - id: credited
    title: "Credited graded contact-region implementation"
    url: "https://github.com/2AMLogic/fasterhenry/commit/ab6abec29983efe9b2fb93d301250e488184c03b"
  - id: retained
    title: "Retained graded contact-region meshing and tests"
    url: "https://github.com/2AMLogic/fasterhenry/blob/195b265274abd2f89fd4d51415377d1143b7f660/fasterhenry/src/plane.rs"
---

### Scope, maintenance and provenance

The primary artifact is extracted interconnect R/L and impedance. It is Layout for extraction, distinct from FasterCap's electrostatic capacitance outputs and EMerge's general full-wave solves. It is not a complete extraction deck or validated foundry signoff. Upstream documents comparisons against closed forms and reference solvers; the catalog review did not reproduce them. [Validation](#source-validation).

September added graded plane meshing around landings and November revised iterative/current solve code and tests. Many intervening documentation updates do not establish continuity by themselves. Treat the tagged package and current default branch separately. [Contact refinement](#source-credited) · [Current solve](#source-activity) · [Release](#source-release).

Claude is co-credited on the graded contact-region plane mesher. The refined mesh generation and tests remain in the reviewed Rust source. [Credited change](#source-credited) · [Retained source](#source-retained).
