---
name: "MCY"
aliases: []
roles: ["eda-tool"]
ai: "traditional"
description: "Uses Yosys netlist mutations and formal filtering to measure whether a self-checking testbench detects meaningful RTL faults."
flow: {"verification":"core"}
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
sources:
  - id: "code"
    title: "Canonical MCY repository"
    url: "https://github.com/YosysHQ/mcy"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/YosysHQ/mcy/blob/5a2cad0cbefceb7f23051c08348bd23128fd1046/README.md"
  - id: "implementation"
    title: "Reviewed implementation: mcy.py"
    url: "https://github.com/YosysHQ/mcy/blob/5a2cad0cbefceb7f23051c08348bd23128fd1046/mcy.py"
  - id: "activity"
    title: "Merge pull request #46 from YosysHQ/qt6"
    url: "https://github.com/YosysHQ/mcy/commit/8b23eba5f22d86dd6466afe33900b1255afd7678"
  - id: "website"
    title: "Official project documentation"
    url: "https://yosyshq.readthedocs.io/projects/mcy/"
    purpose: "official"
---


### Classification

Tracked as conventional verification tooling, without an AI runtime. [Reviewed source](#source-readme).

### Release boundary

The October 2025 Qt 6 GUI port is substantive technical maintenance and passes the cutoff; later formatting-only commits are not treated as renewed meaningful activity. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Flow scope

Mutations and formal filtering measure whether a testbench detects faults. Post-synthesis netlist editing is instrumentation for verification, not a circuit-design or synthesis task for the user. [Reviewed source](#source-readme).
