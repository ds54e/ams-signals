---
name: "EQY"
aliases: []
roles: ["eda-tool"]
primary: "formal-verification"
ai: "traditional"
description: "Yosys-based equivalence-checking flow that matches and partitions reference and transformed designs, then proves correspondence with configurable strategies."
keywords: ["equivalence checking", "LEC", "SAT", "Yosys"]
areas:
  formal-verification: core
  frontend-synthesis: supporting
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical EQY repository"
    url: "https://github.com/YosysHQ/eqy"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/YosysHQ/eqy/blob/4a72eb94fc253062464afee4d0018359017bb846/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/eqy.py"
    url: "https://github.com/YosysHQ/eqy/blob/4a72eb94fc253062464afee4d0018359017bb846/src/eqy.py"
  - id: "activity"
    title: "Fix Windows CRLF in summary_targets.list breaking bash while-read (#100)"
    url: "https://github.com/YosysHQ/eqy/commit/4a72eb94fc253062464afee4d0018359017bb846"
  - id: "website"
    title: "Official project documentation"
    url: "https://yosyshq.readthedocs.io/projects/eqy/"
    purpose: "official"
---

### Scope

Design matching, partition generation and proof strategies are the primary operations; Yosys processing supports them. [Project documentation](#source-readme).

### Classification

Tracked as a conventional equivalence checker. No AI runtime or distinctive AI build process is established. [Reviewed source](#source-readme).

### Release boundary

A failed, timed-out or unproven partition is distinct from a successful equivalence proof. [Public update](#source-activity).

[Implementation inspected](#source-implementation).
