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
reviewedAt: "2026-11-12"
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
  - id: "activity-refresh"
    title: "Correct example field names for SystemRDL compatibility"
    url: "https://github.com/SystemRDL/PeakRDL/commit/613d16d4a1768f70b41056bc6141f8a02cb193f8"
  - id: review-20261112-compatibility
    title: Python 3.13 regression-test matrix and test-tool maintenance
    url: https://github.com/SystemRDL/PeakRDL/commit/82b9e022447d63b7aacbeefbe5217eb8c0ea10ea
  - id: review-20261112-retained
    title: Retained built-distribution regression workflow
    url: https://github.com/SystemRDL/PeakRDL/blob/80e9bacf87b75fc54a9f811956e973c11589228a/.github/workflows/build.yml
---

### Implementation context

PeakRDL uses SystemRDL compilation/elaboration as the shared model for register-block, UVM, C-header, HTML and IP-XACT exporters. The CLI links inputs and discovers separately packaged plugins; IP-XACT import maps data into SystemRDL semantics. Exporter capabilities and unsupported constructs retain their own boundaries. [Input processing](#source-input); [package dependencies](#source-packages); [exporter implementation](#source-exporters).

This SystemRDL-centered architecture differs from RgGen's varied authoring formats and field/protocol/writer customization. The tools overlap in register automation while offering distinct model and extension choices. Optional community plugins are additional packages, not universal root capabilities. [Project overview](#source-documentation); [community extensions](#source-community).

### Release and activity boundary

Rechecked October 18, 2026 at `dc4f779cc97d07519d475ff392a2b26f6a8373f2`. The September 1, 2026 head adds community-plugin documentation. The November 10, 2025 technical correction renames enable/reset to en/rst in the working SystemRDL style-guide examples to avoid language-version compatibility problems. This source-example correctness fix qualifies as meaningful technical maintenance within the October 18, 2025 cutoff; it is not a new generator feature. The October 3 version-only commit and unrelated community listings are not the freshness basis. [Current project source](#source-readme); [meaningful activity](#source-activity-refresh).

Root **v1.5.0** was published October 3, 2025 with argument-file expansion and `this_dir` support. Root history alone drives its activity cells; component repositories are not aggregated. [Release](#source-release); [earlier implementation](#source-activity).

### Scope and development provenance

Design covers generated CSR RTL; Verification covers UVM register models. Synthesizable output alone does not establish Synthesis. The reviewed model transformations are conventional. Root documentation and reachable history do not establish qualifying AI-assisted implementation, and no attribution is borrowed from community plugins; no development label is assigned. [Reviewed guide](#source-readme).


### November 12, 2026 compatibility review

The November 16, 2025 first-parent maintenance commit extends the built-distribution regression matrix to Python 3.13. The retained workflow installs both PeakRDL distributions and executes the pytest suite. This compatibility-validation improvement, rather than later community listings or cosmetic documentation edits, is the meaningful-activity checkpoint. No generator feature, new release or independently reproduced test result is claimed. Canonical main, the older distribution-rework branch and root releases showed no later qualifying implementation; component histories are not aggregated. This checkpoint meets the current rolling-year rule but expires after November 16, 2026 unless further meaningful activity is established. [Compatibility change](#source-review-20261112-compatibility) · [Retained regression workflow](#source-review-20261112-retained).
