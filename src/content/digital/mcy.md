---
name: "MCY"
aliases: []
description: "Measures how well a self-checking testbench detects meaningful RTL faults using Yosys netlist mutations and formal filtering. Mutated designs run against the testbench, and result views help identify undetected changes that call for stronger checks."
scope:
  verification:
    ai: false
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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


### Implementation context

MCY generates mutations of a synthesized netlist and dispatches user-defined simulation/formal tests, storing per-mutation outcomes in a database. Result tags, source annotations, a GUI and a web dashboard expose which changes a self-checking testbench detects. A mutation score concerns the configured mutation/test campaign rather than proving complete specification coverage. [User workflow](#source-readme); [driver](#source-implementation).

### Release boundary

Reviewed October 1, 2026 at `5a2cad0cbefceb7f23051c08348bd23128fd1046`. The current August 4 head is formatting maintenance. The retained October 15, 2025 merge updates QScintilla and the actual GUI CMake configuration to select Qt6 or fall back to Qt5. It remains within the October 1, 2025 inclusive cutoff; later cleanup and Actions updates do not renew that date. [Current project source](#source-readme); [meaningful activity](#source-activity).

### Scope classification

Mutations and formal filtering measure whether a testbench detects faults. Post-synthesis netlist editing is instrumentation for verification, not a circuit-design or synthesis task for the user. [Reviewed source](#source-readme).

Mutation generation and formal filtering assess testbench quality through conventional Verification. Algorithmic mutation is not model inference. [AI/stage evidence](#source-readme).
