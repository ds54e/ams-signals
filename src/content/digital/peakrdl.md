---
name: "PeakRDL"
aliases: []
description: "SystemRDL-centered toolchain compiling register descriptions into SystemVerilog CSR blocks, UVM RAL models, C headers and HTML documentation. A shared elaborated register model connects independently packaged exporters and IP-XACT import/export through a Python CLI, with custom plugins extending the supported outputs."
scope:
  design:
    ai: false
  verification:
    ai: false
access: "Public Python CLI and exporter packages; individual exporters and community plugins have their own installation and support boundaries."
addedAt: "2026-09-07"
reviewedAt: "2026-09-07"
sources:
  - id: "documentation"
    title: "Official PeakRDL introduction and supported outputs"
    url: "https://peakrdl.readthedocs.io/en/latest/index.html"
    purpose: "official"
  - id: "code"
    title: "Canonical PeakRDL root repository"
    url: "https://github.com/SystemRDL/PeakRDL"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed main revision"
    url: "https://github.com/SystemRDL/PeakRDL/blob/dc4f779cc97d07519d475ff392a2b26f6a8373f2/README.md"
  - id: "input"
    title: "SystemRDL elaboration and IP-XACT input mapping"
    url: "https://peakrdl.readthedocs.io/en/latest/processing-input.html"
  - id: "packages"
    title: "Independent exporter package dependencies"
    url: "https://github.com/SystemRDL/PeakRDL/blob/dc4f779cc97d07519d475ff392a2b26f6a8373f2/peakrdl/pyproject.toml"
  - id: "exporters"
    title: "Exporter discovery and plugin implementation"
    url: "https://github.com/SystemRDL/PeakRDL/blob/dc4f779cc97d07519d475ff392a2b26f6a8373f2/peakrdl-cli/src/peakrdl/plugins/exporter.py"
  - id: "community"
    title: "Official listing of optional community plugins"
    url: "https://peakrdl.readthedocs.io/en/latest/community.html"
  - id: "release"
    title: "Root PeakRDL v1.5.0, October 3, 2025"
    url: "https://github.com/SystemRDL/PeakRDL/releases/tag/v1.5.0"
  - id: "activity"
    title: "Argument-file-relative path expansion and tests, September 28, 2025"
    url: "https://github.com/SystemRDL/PeakRDL/commit/d6acd17fc95d647001b9de0817e2041d406f37b5"
---

### Implementation context

PeakRDL uses SystemRDL compilation/elaboration as the shared model for register-block, UVM, C-header, HTML and IP-XACT exporters. The CLI links inputs and discovers separately packaged plugins; IP-XACT import maps data into SystemRDL semantics. Exporter capabilities and unsupported constructs retain their own boundaries. [Input processing](#source-input); [package dependencies](#source-packages); [exporter implementation](#source-exporters).

This SystemRDL-centered architecture differs from RgGen's varied authoring formats and field/protocol/writer customization. The tools overlap in register automation while offering distinct model and extension choices. Optional community plugins are additional packages, not universal root capabilities. [Project overview](#source-documentation); [community extensions](#source-community).

### Release and activity boundary

Root v1.5.0 was published October 3, 2025. The meaningful September 28 implementation adds the argument-file-relative `this_dir` token with nested/file handling regressions. The reviewed September 1, 2026 head only adds community-plugin documentation. [Release](#source-release); [meaningful implementation](#source-activity).

Activity buckets contain the root repository's first-parent commits alone. Independently released components such as PeakRDL-regblock do not refresh the root's meaningful date or contribute invented aggregate counts. The September 2025 implementation still satisfies this review's inclusive September 7, 2025 cutoff. [Root repository](#source-code); [component packages](#source-packages).

### Scope and development provenance

Design covers generated CSR RTL; Verification covers UVM register models. Synthesizable output alone does not establish Synthesis. The reviewed model transformations are conventional. Root documentation and reachable history do not establish qualifying AI-assisted implementation, and no attribution is borrowed from community plugins; no development label is assigned. [Reviewed guide](#source-readme).
