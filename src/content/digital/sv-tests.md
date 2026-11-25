---
name: sv-tests
description: SystemVerilog language-feature test suite with runners for multiple parsers, simulators and synthesis tools. Small source cases and executable integration examples expose compatibility differences through generated reports; passing selected tests does not certify complete language support or production-design correctness.
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited for correcting the executable packed tagged-union formatting test, including its expected binary value and assertion syntax. The canonical suite retains this correction."
  sources: ["development-implementation-20261018", "development-retained-20261018"]
  reviewedAt: "2026-11-12"
access: Public tests and runner infrastructure; tool installations and third-party integration dependencies are configured separately.
addedAt: '2026-10-18'
reviewedAt: "2026-11-25"
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/chipsalliance/sv-tests
  purpose: code
- id: readme
  title: Project workflow and operating boundaries at the captured revision
  url: https://github.com/chipsalliance/sv-tests/blob/3b80a0fa421d111652832f16a85137fc658d213b/README.md
- id: activity
  title: 'Merge pull request #8656 from wsnyder/sequence_asserts'
  url: https://github.com/chipsalliance/sv-tests/commit/c527acc461be115da8aa1a50f9756942c4a8b366
- id: implementation-1
  title: 'Released implementation: tools/runners/Verilator.py'
  url: https://github.com/chipsalliance/sv-tests/blob/3b80a0fa421d111652832f16a85137fc658d213b/tools/runners/Verilator.py
- id: implementation-2
  title: 'Released implementation: tests/chapter-7/arrays/associative/assignment.sv'
  url: https://github.com/chipsalliance/sv-tests/blob/3b80a0fa421d111652832f16a85137fc658d213b/tests/chapter-7/arrays/associative/assignment.sv
- id: development-implementation-20261018
  title: "Claude-credited packed tagged-union regression correction"
  url: https://github.com/chipsalliance/sv-tests/commit/b469a315998d8475a301d6ac7100bfae607acec2
- id: development-retained-20261018
  title: "Retained packed tagged-union binary oracle"
  url: https://github.com/chipsalliance/sv-tests/blob/3e4e9e6744e8d747a492adc171444f054fa882a2/tests/chapter-7/unions/tagged/packed.sv
- id: website
  title: Official project website and documentation
  url: https://chipsalliance.github.io/sv-tests-results/
  purpose: official
- id: generator-maintenance
  title: "November 16 per-test path generator metadata correction"
  url: "https://github.com/chipsalliance/sv-tests/commit/34094d96a610e42719b3ce1250de921689f13466"
- id: generator-retained
  title: "Retained per-test extra-tags handling"
  url: "https://github.com/chipsalliance/sv-tests/blob/9558c8c251fdd158a7e26f9c871a7a70f5f50a36/generators/path_generator"
---

### Implementation and boundaries

The language cases and tool runners implement Verification of tool behavior, with independent value alongside the tools being tested. The selected sequence-assertion update changes technical test coverage. Automated tool-submodule bumps remain in raw counts but are not the meaningful-freshness basis. This is not an explicit AI benchmark, so no AI prefix is assigned. [Project workflow](#source-readme) · [Implementation](#source-implementation-1).

### Reviewed activity

The earlier meaningful checkpoint was `c527acc461be115da8aa1a50f9756942c4a8b366` (2026-07-02 UTC). November 16 supersedes it in the saved first-parent capture. Latest activity and twelve UTC monthly buckets are recorded separately; the current month is partial. [Meaningful change](#source-activity).

### Development provenance

Claude is credited for correcting the executable packed tagged-union formatting test, including its expected binary value and assertion syntax. The canonical suite retains this correction. This supports AI-assisted development. [AI-credited executable implementation](#source-development-implementation-20261018) · [Retained executable code at the reviewed canonical head](#source-development-retained-20261018).

### November test maintenance

The November 16 integration separates global metadata from per-test `extra_tags` in the path generator and corrects the affected generated-test configuration, including p774. This is executable test-infrastructure maintenance rather than a new simulator feature. Later dependency/submodule updates remain raw activity. No generated case, runner or cross-tool comparison was independently executed. [Integration](#source-generator-maintenance) · [Retained generator](#source-generator-retained).
