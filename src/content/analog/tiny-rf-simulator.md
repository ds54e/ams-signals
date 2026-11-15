---
name: "Tiny RF Simulator"
summary: "Modular RF-chain simulation with spectra, receiver requirements and model-based cascade budgets."
description: "Interactive RF signal-chain simulator for cascaded amplifiers, filters, mixers and ADCs, with spectra, gain, noise and receiver checks. Its RF budget evaluates per-mode SNR and out-of-band suppression from component models; SNR requires an input level and noise bandwidth, and the measured Requirements view does not yet supply SNR."
scope:
  design:
    ai: false
  simulation:
    ai: false
  aiDevelopment: "assisted"
developmentEvidence:
  summary: "A merged commit credits Claude Code for coherent combination of duplicate-frequency tones. The shared phasor-summing helper and its power-meter use remain in the reviewed master branch."
  sources: ["credited-code", "retained-code", "meter-code"]
  reviewedAt: "2026-11-15"
access: "Apache-2.0 source and desktop releases. Source builds use C++20/CMake, OpenGL, Dear ImGui/ImPlot, GLFW and other separately licensed dependencies. SNR budget verdicts depend on component models, a configured input level and noise bandwidth; they are not measured SNR verification."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "code"
    title: "Canonical Tiny RF Simulator repository"
    url: "https://github.com/striderZA/Tiny-RF-Simulator"
    purpose: "code"
  - id: "readme"
    title: "Reviewed RF-chain simulator and agent interface overview"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/blob/eb01d80220ef840a51a6820a842b257db74ca3db/README.md"
  - id: "activity"
    title: "November 12 integrated SNR limits and budget calculation"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/commit/3167a43baa63277d937f67dc4c63842e248980ee"
  - id: "snr-limits"
    title: "Merged SNR PR and budget-only measurement boundary"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/pull/376"
  - id: "budget-code"
    title: "Retained kTB, cumulative noise figure and SNR calculation"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/blob/eb01d80220ef840a51a6820a842b257db74ca3db/app/src/rf_budget_cascade.cpp"
  - id: "oob-change"
    title: "Separate integrated out-of-band suppression feature and tests"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/commit/80959d1a4eb0a7caf24480b877d42da75812df2f"
  - id: "credited-code"
    title: "Claude Code credited duplicate-tone correctness implementation"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/commit/0a3dca3f1323a50a5479292368900d75f33c412b"
  - id: "retained-code"
    title: "Retained coherentToneWatts phasor implementation"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/blob/eb01d80220ef840a51a6820a842b257db74ca3db/common/spectrum.h"
  - id: "meter-code"
    title: "Current power-meter use of coherentToneWatts"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/blob/eb01d80220ef840a51a6820a842b257db74ca3db/power_meter/src/power_meter_engine.cpp"
  - id: "agent-skill"
    title: "MCP operation workflow and conventional model-prediction boundary"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/blob/eb01d80220ef840a51a6820a842b257db74ca3db/.agents/skills/using-rf-sim-mcp/SKILL.md"
  - id: "release"
    title: "Tiny RF Simulator v0.31.1, November 12, 2026"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/releases/tag/v0.31.1"
  - id: "build"
    title: "C++20 build requirements and third-party dependencies"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/blob/eb01d80220ef840a51a6820a842b257db74ca3db/CMakeLists.txt"
  - id: "license"
    title: "Apache License 2.0"
    url: "https://github.com/striderZA/Tiny-RF-Simulator/blob/eb01d80220ef840a51a6820a842b257db74ca3db/LICENSE"
---

### Implementation and selection

The canonical repository implements modular RF-chain editing and electrical signal/noise evaluation, rather than only illustrative spectra. It is distinct from the catalog's RF libraries and field solvers. Separate integrated changes add out-of-band suppression checks and SNR limits with persistence, validation and executable regression coverage. The October coherent-tone correction is another substantive correctness change. These support ongoing implementation and maintenance rather than a one-off release. [Overview](#source-readme) · [Out-of-band feature](#source-oob-change) · [SNR integration](#source-activity) · [Tone correction](#source-credited-code)

The meaningful first-parent checkpoint is the November 12 SNR merge. The later raw tip is release preparation; reviewed master is identical to v0.31.1. SNR is computed as input level minus thermal noise at the configured bandwidth minus cumulative noise figure. Gain cancels; missing input level produces an incomplete result. The measured Requirements view has no SNR series, so a configured SNR limit leaves that view's overall result incomplete. Upstream test reports were reviewed but not rerun. [Merged PR and boundary](#source-snr-limits) · [Retained calculation](#source-budget-code) · [Release](#source-release)

### Scope, provenance and limits

Design covers chain construction and parameter configuration; Simulation covers spectra, electrical measurements and budget calculations. Model-based here means conventional component equations, not learned inference. The MCP skill describes state-safe tool use and how to verify a budget prediction; it supplies API workflow rather than a substantive model-driven RF-design policy. Neither the bridge nor the word prediction establishes AI Simulation or AI Design. [Calculation](#source-budget-code) · [Agent workflow](#source-agent-skill)

The October 22 integrated commit directly credits Claude Code, including the Anthropic noreply identity, for executable duplicate-tone corrections and tests. It adds coherent RMS phasor summation and cancellation handling, shared by the analyzer and meter. The helper and meter call remain in current master. This supports AI-assisted development for that contribution; ambiguous generic agent names are not needed as evidence. [Attributed diff](#source-credited-code) · [Retained helper](#source-retained-code) · [Current caller](#source-meter-code)

The project is Apache-2.0; dependencies retain separate terms. Source builds need C++20, CMake, OpenGL and GUI/DSP libraries. RF budgets are component-model predictions, not electromagnetic extraction, transistor-level signoff or measured receiver verification. Noise bandwidth is a requirement field rather than analyzer RBW, and SNR requires a specified input level. [License](#source-license) · [Build inputs](#source-build) · [SNR constraints](#source-snr-limits)
