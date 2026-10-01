---
name: "SymbiYosys"
aliases: ["sby"]
description: "Driver for Yosys-based formal verification flows, orchestrating bounded checks, inductive proofs and cover analysis. Task configurations select engines and solvers, while the driver manages their execution and collects proof status or counterexample traces for inspection."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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


### Implementation context

SymbiYosys reads task configurations, prepares formal models with Yosys and manages selected solver/engine processes for bounded checks, proofs and cover tasks. Results, logs and witness traces come from those configured engines; assertion-language support and licensing depend on the selected tool distribution. [Project overview](#source-readme); [proof driver](#source-implementation).

### Release boundary

Reviewed October 1, 2026 at `b1a1e98cba941ec8433f8dc27f416cd7bb7f14be`. The August 4 head is cleanup. The retained July 7 first-parent merge implements rIC3 support in the BTOR engine and repairs witness handling and subprocess-result checks. Later documentation and formatting do not replace that implementation evidence. [Current project source](#source-readme); [meaningful activity](#source-activity).

### Scope classification

Bounded checks, proofs and cover tasks are the user-facing operations. Synthesis-tool preparation is an implementation dependency of the proof driver. [Reviewed source](#source-readme).

Formal engine orchestration and proof/cover execution are conventional Verification. The preparation passes do not create an AI or independent synthesis stage. [AI/stage evidence](#source-readme).
