---
name: "PyUCIS"
aliases: []
description: "Python UCIS library for importing, merging and analyzing hardware verification coverage. CLI/TUI tools connect coverage reports, regression comparisons, test history and testplan closure; SQLite and NCDB storage support richer metadata, and the 0.2.2 release updates coverage-group option merging. Format conversions have preservation limits."
scope:
  verification:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "The maintainer describes using AI to extend the pre-existing PyUCIS library. A Copilot-attributed implementation adds substantial test-history storage/query, testplan analysis, reports and CLI/TUI integration retained in the current code and released package."
  sources: ["maintainer", "implementation", "history-code"]
  reviewedAt: "2026-10-01"
access: "Public Python package; supported coverage exports or compatible UCIS interfaces are required, and format-specific preservation limits apply."
addedAt: "2026-09-07"
reviewedAt: "2026-11-24"
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
    title: "PyPI 0.2.2, published November 5, 2026"
    url: "https://pypi.org/project/pyucis/0.2.2/"
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
    title: "Public package-release authority switch, reviewed October 1, 2026"
    url: "https://dvkit.org/.well-known/release-authority.json"
  - id: "agent-skill"
    title: "Packaged agent skill: command and data-model reference"
    url: "https://github.com/fvutils/pyucis/blob/11c39fd03a983fa602eb8967b3640a0fcc532458/src/ucis/share/SKILL.md"
---

### Implementation context

PyUCIS imports supported coverage data, merges UCIS models and provides reports, CLI/TUI analysis, regression comparisons, test history and testplan closure. SQLite and NCDB retain richer data than restricted interchange/export formats. This adds longitudinal coverage/testplan analysis alongside simulators, stimulus frameworks and read-only evidence summaries. [Reviewed feature and format matrix](#source-readme); [retained implementation](#source-history-code).

Conversion is format-specific. Recognized unsupported constructs produce warnings, with `--strict` promoting these to errors. XML/YAML and reporting exports do not preserve every feature; UCIS support does not establish direct, lossless access to every proprietary simulator coverage database. [Conversion implementation](#source-conversion); [format matrix](#source-readme).

### Release and authority boundary

The reviewed PyPI 0.2.2 release was published November 5, 2026. The canonical Git revision `e57f3816e3903577c7b6fb95157acd0737f9fe73` includes coverage-group option handling during merge and associated SQLite and XML updates. The PyPI wheel digest was verified and the two merge files, XML writer and version file matched the canonical Git tree byte for byte; this does not establish lossless interchange. [PyPI distribution](#source-release).

The project's Git host, GitHub mirror, and documentation publication are distinct from package release authority. No stable primary-host repository ID was established for this capture, so the activity record uses the verified PyPI release date rather than borrowing mirror activity counts. [Hosting policy](#source-hosting) · [Publishing workflow](#source-publishing) · [Release switch](#source-release-authority).

### Scope and development provenance

Verification covers implemented coverage and testplan analysis. The packaged skill is a command/data-model reference, with deterministic query examples rather than a substantive model-hosted decision procedure. The separate tutorial supplies example prompts and desired analysis outcomes; it does not establish a released agent control loop or an explicit evaluated AI benchmark. Generic MCP/CLI access and an agent-readable reference alone therefore do not justify the internal AI flag for Verification. [Packaged skill](#source-agent-skill); [agent workflow tutorial](#source-agent-example).

Rechecked 2026-10-01: AI-ASSISTED is supported by the maintainer's account and the substantial Copilot-attributed history storage/query, testplan, report and CLI/TUI implementation. These code paths remain integrated; current NCDB code retains the attributed history-query, per-test statistics, binary serialization and testplan integration. The earlier release comparison established matching sampled implementation files in the wheel. The attribution concerns these retained extensions, not unrelated library code. [Maintainer account](#source-maintainer); [implementation diff](#source-implementation); [current integration](#source-history-code).
