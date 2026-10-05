---
name: "VUnit"
aliases: ["vunit_hdl"]
description: "Unit-testing framework for VHDL and SystemVerilog, combining Python project configuration with HDL test libraries and simulator-driven execution. It discovers and runs test suites, manages compilation dependencies and reports results, supporting automated regressions while relying on separately installed HDL simulators."
scope:
  verification:
    ai: false
access: "Public MPL-2.0 framework with separately licensed bundled libraries; requires Python and a supported simulator."
addedAt: "2026-10-05"
reviewedAt: "2026-10-05"
sources:
  - id: "site"
    title: "Official VUnit documentation"
    url: "https://vunit.github.io/"
    purpose: "official"
  - id: "code"
    title: "Canonical VUnit implementation"
    url: "https://github.com/VUnit/vunit"
    purpose: "code"
  - id: "readme"
    title: "Reviewed HDL unit-testing role"
    url: "https://github.com/VUnit/vunit/blob/3600e096f40bfa530aa8cd08389815e81206ee88/README.md"
  - id: "implementation"
    title: "Test-suite execution and result reporting"
    url: "https://github.com/VUnit/vunit/blob/3600e096f40bfa530aa8cd08389815e81206ee88/vunit/test/runner.py"
  - id: "license"
    title: "Framework and bundled-library license boundaries"
    url: "https://github.com/VUnit/vunit/blob/3600e096f40bfa530aa8cd08389815e81206ee88/LICENSE.rst"
  - id: "activity"
    title: "TOML package and source-level compilation options"
    url: "https://github.com/VUnit/vunit/commit/145e8c85dc6988ae61c7ad2ed5be29707f05a209"
---

### Implementation and scope

The public Python UI registers HDL sources and configuration, while the runner executes suites and records passed, failed or skipped results. HDL libraries and simulator adapters provide verification support; the framework does not replace the selected simulator. Source compilation is test preparation rather than logic synthesis. [Project role](#source-readme); [runner implementation](#source-implementation).

Verification is conventional automation. No material runtime model decision path or attributable substantial AI-development contribution is established by the inspected implementation and activity evidence. License terms differ for bundled libraries. [Implementation](#source-implementation); [license boundary](#source-license).

### Reviewed public activity

The canonical master branch history was captured in full. The October 3 UTC implementation validates and applies TOML compilation options at package and individual-source levels, with regression tests; the later version bump remains the ordering tip. [Reviewed change](#source-activity).
