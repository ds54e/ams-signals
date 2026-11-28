---
name: wavepeek
description: "Stateless CLI for hierarchy, signal, Boolean-condition and protocol-event queries on a single RTL waveform dump, with a bundled agent skill. VCD/FST are supported directly; optional FSDB/SHM readers require local vendor libraries. The tool does not compare separate dumps or establish protocol compliance."
scope:
  verification:
    ai: true
access: Public source and binaries; optional proprietary-format support requires Linux x86_64 and local Verdi/Xcelium reader libraries.
addedAt: '2026-11-16'
reviewedAt: "2026-11-28"
sources:
- id: "official"
  title: "Official project website"
  url: "https://kleverhq.github.io/wavepeek/"
  purpose: "official"
- id: code
  title: Canonical public implementation
  url: https://github.com/kleverhq/wavepeek
  purpose: code
- id: readme
  title: Reviewed workflow and access boundaries
  url: https://github.com/kleverhq/wavepeek/blob/a4451a222e2971404cce574d89fcfb991b160521/README.md
- id: activity
  title: Reviewed first-parent integration of substantive implementation
  url: https://github.com/kleverhq/wavepeek/commit/c5db17bb852bae9dd2a44563512268a100253e90
- id: implementation
  title: Reviewed implementation and validation change
  url: https://github.com/kleverhq/wavepeek/commit/2bc7a5fe711b7e43ec093ee8a511481867ddc623
- id: retained
  title: Current implementation at review
  url: https://github.com/kleverhq/wavepeek/blob/a4451a222e2971404cce574d89fcfb991b160521/skills/wavepeek/SKILL.md
- id: skill-bundle
  title: Packaged executable skill distribution
  url: https://github.com/kleverhq/wavepeek/blob/a4451a222e2971404cce574d89fcfb991b160521/src/skill.rs
- id: review-20261128-activity
  title: "November 26 multidimensional selector correction"
  url: "https://github.com/kleverhq/wavepeek/commit/e55d1f417117344ef2171deba3c40beba23cd358"
- id: review-20261128-selection
  title: "Retained multidimensional path spelling"
  url: "https://github.com/kleverhq/wavepeek/blob/c77432cf201d10d45983a0ce4554c92507f5d2db/src/waveform/selection.rs"
- id: review-20261128-path-tests
  title: "Retained path-selection regressions"
  url: "https://github.com/kleverhq/wavepeek/blob/c77432cf201d10d45983a0ce4554c92507f5d2db/tests/path_style_cli.rs"
- id: review-20261128-readme
  title: "Current command and reader boundaries"
  url: "https://github.com/kleverhq/wavepeek/blob/c77432cf201d10d45983a0ce4554c92507f5d2db/README.md"
- id: review-20261128-skill
  title: "Current bundled query workflow"
  url: "https://github.com/kleverhq/wavepeek/blob/c77432cf201d10d45983a0ce4554c92507f5d2db/skills/wavepeek/SKILL.md"
- id: review-20261128-format-tests
  title: "November 27 cross-format smoke and verification changes"
  url: "https://github.com/kleverhq/wavepeek/commit/3d087c5c6b2bb0eb482934e9ee3cae7d2843c691"
- id: related-waveq
  title: "Indexed query and comparison alternative"
  url: "https://github.com/IshaanDugar/waveq/blob/eeb88e9045244e4816d18b0aa3d4ca1688baf0a1/README.md"
- id: related-wavetools
  title: "File extraction and comparison alternative"
  url: "https://github.com/hudson-trading/wavetools/blob/ebbd304b6c62bc7390a3f8d06c0b699e0e8dcbfb/README.md"
---

### Implementation and selection

The distributed skill specifies substantive debug choices and evidence interpretation connected to implemented commands, supporting AI Verification; the CLI itself is deterministic. Point-query correctness and cross-format regression tests establish activity. [Workflow](#source-readme) · [Implementation change](#source-implementation) · [Retained code](#source-retained).

### Review boundary

Canonical default-branch history was checked, including first-parent integration of the reviewed implementation. Activity capture is separate from this substantive review. Code and tests were inspected; upstream EDA runs, benchmark results and numerical accuracy were not independently reproduced. [Integration](#source-activity).

The source embeds the skill bundle into the binary and exposes its materialization, rather than relying on an external prompt example. [Distribution implementation](#source-skill-bundle).

### November 28 source review and selection boundary

November 26 preserves multiple unpacked-array indices in waveform hierarchy paths, distinguishing indexed components from quoted literal names. It pins an updated ondas implementation and changes the selector spelling and CLI regressions. November 27 adds cross-format smoke and benchmark input-identity checks; the optional proprietary readers still require the corresponding SDK/runtime and private-profile checks. These are source-inspected changes, not independently reproduced compatibility or performance results. [Path fix](#source-review-20261128-activity) · [Retained code](#source-review-20261128-selection) · [Path tests](#source-review-20261128-path-tests) · [Format checks](#source-review-20261128-format-tests).

Retain the listing for stateless single-dump queries and packaged evidence-driven sampling and AMBA event-extraction workflows. WaveQ instead persists a selective SQLite index and supports bounded offline property checks and cross-run queries; wavetools provides file transformation and waveform comparison. Neither the existence of those projects nor shared waveform formats removes the independent value of this direct query workflow. The agent skill and native-reader constraints remain explicit; no comparison service or full protocol checker is claimed. [Current commands](#source-review-20261128-readme) · [Skill](#source-review-20261128-skill) · [WaveQ](#source-related-waveq) · [wavetools](#source-related-wavetools).
