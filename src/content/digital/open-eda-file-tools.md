---
name: "open-eda-file-tools"
description: "Inspects and compares generated ASIC design files with Rust-backed readers and Python and CLI interfaces. Liberty support includes timing arcs, lookup tables and CCS data; the suite also provides targeted inspection of LEF/DEF, SDC and SPEF/DSPF."
scope:
  verification:
    ai: false
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Sonnet is co-credited for correcting DEF cache input handling, including rejection of a second COMPONENTS section after NETS."
  sources: [development-code, development-retained]
  reviewedAt: "2026-11-23"
access: "Public source; current installation builds the Rust extension locally and requires Python 3.14 or newer. The Tcl-based SDC tool needs Tcl 8.6 or newer."
addedAt: "2026-11-23"
reviewedAt: "2026-11-23"
sources:
  - id: "code"
    title: "Canonical public implementation"
    url: "https://github.com/smprather/open-eda-file-tools"
    purpose: "code"
  - id: "activity"
    title: "Reviewed substantive implementation on the default branch"
    url: "https://github.com/smprather/open-eda-file-tools/commit/c93723815679e0ff4c83614645a0ac13d020e456"
  - id: "evidence"
    title: "Reviewed reference or implementation example"
    url: "https://github.com/smprather/open-eda-file-tools/blob/1289d2298752e55638dd17b65fe84a93ba9897cb/tests/test_compare.py"
  - id: "development-code"
    title: "Attributed executable implementation"
    url: "https://github.com/smprather/open-eda-file-tools/commit/517372258adbc38edbe9e3d7d9ab6b4a57305b3e"
  - id: "development-retained"
    title: "Retained implementation at the reviewed revision"
    url: "https://github.com/smprather/open-eda-file-tools/blob/1289d2298752e55638dd17b65fe84a93ba9897cb/core/src/def.rs"
---

### Implemented operations and review

The comparison API and tests support cell- and arc-level review rather than library characterization or a replacement STA engine. The physical-data tooling also exposes layout inspection and clock-tree tracing. Initial May parsing work, October comparison repairs and November physical-data support establish sustained use cases. [Implementation](#source-activity) · [Reviewed evidence](#source-evidence).
