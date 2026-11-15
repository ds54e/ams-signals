---
name: "KLayout"
aliases: []
summary: "Views, edits and verifies IC layouts with programmable geometry and PCells."
description: "Layout editor and verification platform for custom integrated circuits, with GDS/OASIS support. Python/Ruby scripts and parameterized cells automate geometry construction, while programmable DRC/LVS checks use technology-specific rules to examine layout and connectivity."
scope:
  layout:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "GLM 5.3 is credited on a merged global-net cluster repair that redirects every absorbed entry before deletion. The corrected C++ implementation remains in the canonical project."
  sources: ["development-fix", "development-retained"]
  reviewedAt: '2026-10-18'
access: "Public implementation and binary packages; technology-specific verification uses supplied rule decks."
addedAt: "2026-09-05"
reviewedAt: "2026-11-15"
sources:
  - id: "site"
    title: "Official project documentation"
    url: "https://www.klayout.de/intro.html"
    purpose: "official"
  - id: "code"
    title: "Canonical public source repository"
    url: "https://github.com/KLayout/klayout"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed default-branch revision"
    url: "https://github.com/KLayout/klayout/blob/e71272c3b178105bd2a2f25af54673a7af7ed60d/README.md"
  - id: "activity"
    title: "PEX triangulation correctness fix and regression test, September 25, 2026"
    url: "https://github.com/KLayout/klayout/commit/5fa733e1680212e4ceda532ca5fa6ea707c654de"
  - id: "activity-current"
    title: "Acute-angle polygon-sizing tolerance correction"
    url: "https://github.com/KLayout/klayout/commit/0460c3e253393063c76c163b18d87f1ad7c47fb5"
  - id: "development-fix"
    title: "GLM-credited global-net iterator repair"
    url: "https://github.com/KLayout/klayout/commit/abc4717f6090ccbb9d566f097a2e646fa6e01505"
  - id: "development-retained"
    title: "Retained global-net cluster implementation"
    url: "https://github.com/KLayout/klayout/blob/748fc5c2de8b894a02608824fc59467c405fcfd3/src/db/db/dbHierNetworkProcessor.cc"
  - id: "review-20261022-lvs"
    title: "Current MOS-device combining correctness fix"
    url: "https://github.com/KLayout/klayout/commit/7eb9a25b42242a97e61300ad3a1486e10937abf5"
  - id: "activity-review-20261115"
    title: "Merged Emscripten memory-sampling build fix"
    url: "https://github.com/KLayout/klayout/commit/573d74859a60454d78309a148dedc8cfbff484ae"
  - id: "implementation-review-20261115"
    title: "Retained Emscripten memory-sampling branch"
    url: "https://github.com/KLayout/klayout/blob/53911acd6dfaa113c188d11d20b2ae290aa60a6b/src/tl/tl/tlTimer.cc"
  - id: "release-review-20261115"
    title: "Published stable KLayout 0.30.13"
    url: "https://github.com/KLayout/klayout/releases/tag/v0.30.13"
  - id: "tests-review-20261115"
    title: "Reviewed utility-library test project"
    url: "https://github.com/KLayout/klayout/blob/53911acd6dfaa113c188d11d20b2ae290aa60a6b/src/tl/unit_tests/unit_tests.pro"
---

### Scope

Reads and edits layout geometry and hierarchy, generates parameterized cells and executes scripting-based checks. These are Layout operations; scripting and external library/technology interfaces enable those layout operations. [Official feature overview](#source-site) and [implementation](#source-readme).

### Release boundary

A programmable DRC/LVS platform does not itself establish signoff for any process. The September 25 merge fixes a PEX triangulation failure by scaling an edge-selection tolerance with geometric distance and adds a regression case. It is distinct from the August 26 PCell editor update. [Reviewed implementation update](#source-activity).

### Scope classification

Layout editing, PCells and physical checks are central. Scripting and file interfaces enable those same layout operations rather than a separate circuit-design stage. [Reviewed source](#source-readme).

Layout editing, PCells and verification scripts are conventional layout operations. Scripting automation alone is not runtime AI. [AI/stage evidence](#source-readme).

### Current activity review

Reviewed 2026-10-05. Polygon-sizing tolerance is scaled to the relevant edge length, with acute-angle regression coverage. This is geometry correctness work within conventional Layout. [Reviewed change](#source-activity-current).

### Development provenance

GLM 5.3 is credited on a merged global-net cluster repair that redirects every absorbed entry before deletion. The corrected C++ implementation remains in the canonical project. [GLM-credited global-net iterator repair](#source-development-fix) · [Retained global-net cluster implementation](#source-development-retained).

### Review of exposed operations and limits, October 22, 2026

DRC/LVS and process-dependent connectivity checks are established capabilities, not new stages. The October 18 reviewed merge repairs MOS-device combination and includes regression changes; this is correctness maintenance rather than evidence of foundry qualification. [Current correctness change](#source-review-20261022-lvs).

This was a static source and documentation review. External EDA, numerical-accuracy and model/API experiments were not rerun. The development-provenance classification is retained.

### Current development and release boundary

The November 14 default-branch merge adds an Emscripten branch to the memory sampler, returning zero where resident-set querying is unavailable. This is build compatibility maintenance within the existing Layout tool, with no new layout or AI capability. The subsequent dependency bump is counted as repository history but is not the meaningful checkpoint. [Merged fix](#source-activity-review-20261115) · [Retained implementation](#source-implementation-review-20261115).

The published stable release is 0.30.13, whose tag points to the saved pre-suffix head; this repair follows that release. The patch adds no regression test, and the utility-library test project has no dedicated Timer suite. Source and test configuration were inspected without building or executing upstream tests. [Stable release](#source-release-review-20261115) · [Test project](#source-tests-review-20261115).
