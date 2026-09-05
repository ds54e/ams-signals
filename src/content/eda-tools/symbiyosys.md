---
name: "SymbiYosys"
aliases: ["sby"]
primary: "formal-verification"
ai: "traditional"
description: "Driver for Yosys-based formal flows orchestrating bounded checks, inductive proofs and cover analysis across supported engines and solvers."
keywords: ["formal", "BMC", "prove/cover", "Yosys"]
areas:
  formal-verification: core
  frontend-synthesis: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical SymbiYosys repository"
    url: "https://github.com/YosysHQ/sby"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/YosysHQ/sby/blob/b1a1e98cba941ec8433f8dc27f416cd7bb7f14be/README.md"
  - id: "implementation"
    title: "Reviewed implementation: sbysrc/sby_mode_prove.py"
    url: "https://github.com/YosysHQ/sby/blob/b1a1e98cba941ec8433f8dc27f416cd7bb7f14be/sbysrc/sby_mode_prove.py"
  - id: "activity"
    title: "Merge pull request #367 from YosysHQ/ric3"
    url: "https://github.com/YosysHQ/sby/commit/6e3dc04d9279da257b29e336edf3b599cccd4907"
  - id: "website"
    title: "Official project documentation"
    url: "https://yosyshq.readthedocs.io/projects/sby/"
    purpose: "official"
---

### Scope

Proof, bounded-check and cover modes invoke Yosys transformations and external engines. Synthesis is supporting preparation for formal tasks. [Project documentation](#source-readme).

### Classification

Tracked as a conventional formal-flow driver, without an AI requirement. [Reviewed source](#source-readme).

### Release boundary

The meaningful date uses the implemented rIC3 engine integration; later formatting and configuration cleanup do not renew it. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
