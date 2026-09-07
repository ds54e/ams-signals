---
name: "PyUCIS"
aliases: []
description: "Python UCIS library for importing, merging and analyzing hardware verification coverage. CLI/TUI tools connect coverage reports, regression comparisons, test history and testplan closure; SQLite and NCDB storage support richer metadata, while format conversions have preservation limits."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer describes using AI to extend the pre-existing PyUCIS library. A Copilot-attributed implementation adds substantial test-history storage/query, testplan analysis, reports and CLI/TUI integration retained in the current code and released package."
  sources: ["maintainer", "implementation", "history-code"]
  reviewedAt: "2026-09-07"
access: "Public Python package; supported coverage exports or compatible UCIS interfaces are required, and format-specific preservation limits apply."
addedAt: "2026-09-07"
reviewedAt: "2026-09-07"
sources:
  - id: "documentation"
    title: "Current official PyUCIS documentation"
    url: "https://dvkit.org/fvutils/pyucis/"
    purpose: "official"
  - id: "code"
    title: "Maintainer-declared Git host; web view currently redirects to the GitHub mirror"
    url: "https://git.dvkit.org/fvutils/pyucis"
    purpose: "code"
  - id: "readme"
    title: "Reviewed README and format matrix on the GitHub mirror"
    url: "https://github.com/fvutils/pyucis/blob/11c39fd03a983fa602eb8967b3640a0fcc532458/README.md"
  - id: "release"
    title: "PyPI 0.2.0.22787133465, published March 7, 2026"
    url: "https://pypi.org/project/pyucis/0.2.0.22787133465/"
  - id: "github-release"
    title: "Older GitHub release v0.1.5, October 21, 2025"
    url: "https://github.com/fvutils/pyucis/releases/tag/v0.1.5"
  - id: "maintainer"
    title: "Matthew Ballance on AI-assisted PyUCIS enhancement, February 15, 2026"
    url: "https://bitsbytesgates.com/blog/better-coverage-analysis-with-ai/"
  - id: "implementation"
    title: "Copilot-attributed history, testplan, report and CLI/TUI implementation on the mirror"
    url: "https://github.com/fvutils/pyucis/commit/d396b872a6caa4633234a82f42dd9bf91b54b314"
  - id: "merge"
    title: "Implementation merged March 7, 2026, observed on the mirror"
    url: "https://github.com/fvutils/pyucis/commit/a47708a4ce0d991ee0b8696d1653dedd7f86d327"
  - id: "history-code"
    title: "Retained NCDB history and testplan integration on the reviewed mirror"
    url: "https://github.com/fvutils/pyucis/blob/11c39fd03a983fa602eb8967b3640a0fcc532458/src/ucis/ncdb/ncdb_ucis.py"
  - id: "conversion"
    title: "Format-specific conversion and strict-mode dispatch on the reviewed mirror"
    url: "https://github.com/fvutils/pyucis/blob/11c39fd03a983fa602eb8967b3640a0fcc532458/src/ucis/cmd/cmd_convert.py"
  - id: "agent-example"
    title: "External-agent coverage-analysis example on the reviewed mirror"
    url: "https://github.com/fvutils/pyucis/blob/11c39fd03a983fa602eb8967b3640a0fcc532458/examples/ai_assisted_workflow/README.md"
  - id: "hosting"
    title: "Maintainer's repository, mirror and documentation publication policy"
    url: "https://github.com/fvutils/pyucis/blob/11c39fd03a983fa602eb8967b3640a0fcc532458/.forgejo/workflows/docs.yml"
  - id: "publishing"
    title: "Tag- and authority-gated PyPI publishing workflow"
    url: "https://github.com/fvutils/pyucis/blob/11c39fd03a983fa602eb8967b3640a0fcc532458/.github/workflows/ci.yml"
  - id: "release-authority"
    title: "Public package-release authority switch, reviewed September 7, 2026"
    url: "https://dvkit.org/.well-known/release-authority.json"
---

### Implementation context

PyUCIS imports supported coverage data, merges UCIS models and provides reports, CLI/TUI analysis, regression comparisons, test history and testplan closure. SQLite and NCDB retain richer data than restricted interchange/export formats. This adds longitudinal coverage/testplan analysis alongside simulators, stimulus frameworks and read-only evidence summaries. [Reviewed feature and format matrix](#source-readme); [retained implementation](#source-history-code).

Conversion is format-specific. Recognized unsupported constructs produce warnings, with `--strict` promoting these to errors. XML/YAML and reporting exports do not preserve every feature; UCIS support does not establish direct, lossless access to every proprietary simulator coverage database. [Conversion implementation](#source-conversion); [format matrix](#source-readme).

### Release and authority boundary

The latest reviewed PyPI distribution is 0.2.0.22787133465 from March 7, 2026; GitHub Releases still shows v0.1.5 from October 21, 2025. The March implementation is merged and present in that wheel. August 31 changes concern hosting/publishing rather than new coverage algorithms. [PyPI distribution](#source-release); [older GitHub channel](#source-github-release); [implementation merge](#source-merge).

The maintainer's workflow declares the Git host and GitHub mirror relationship, with documentation published on dvkit.org. Direct Git advertises `master` at the same head as the mirror, but the repository web view redirects and the host API does not provide a repository ID. Package release authority is separately verified as GitHub through the public switch and tag-gated publishing workflow. [Hosting policy](#source-hosting); [publishing workflow](#source-publishing); [release switch](#source-release-authority).

The activity record therefore uses the supported March 7 release point. It does not fabricate a host ID or borrow mirror monthly counts; inactive months mean no reviewed public signal. [Verified release](#source-release).

### Scope and development provenance

Verification covers implemented coverage and testplan analysis. Documented agent scenarios supply prompts and deterministic commands to outside agents; the reviewed code does not implement its own model-driven coverage-analysis operation. MCP/Skills/CLI access alone does not justify an AI Verification prefix. [Agent workflow example](#source-agent-example).

AI-ASSISTED is supported by the maintainer's account and the substantial Copilot-attributed history storage/query, testplan, report and CLI/TUI implementation. These code paths remain integrated; sampled current implementation files match the released wheel. The evidence concerns a significant extension to an older library and does not characterize whole-project or defining-core creation, so AI-BUILT is not assigned. [Maintainer account](#source-maintainer); [implementation diff](#source-implementation); [current integration](#source-history-code).
