---
name: "pqwave"
aliases: ["pqwave waveform viewer", "Monte Carlo correlation analysis"]
summary: "Analog simulation waveform analysis with Monte Carlo statistics and correlated parameter generation."
description: "Scriptable analog simulation waveform viewer and analysis toolkit for raw outputs from several SPICE simulators. Its Monte Carlo workbench computes yield, worst cases and parameter sensitivity, and generates correlated Gaussian model-parameter samples or ngspice control scripts from supplied nominal values and covariance assumptions."
scope:
  simulation: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus is co-credited for the implemented correlation-analysis module and its tests. The retained code parses model parameters, performs Cholesky-based sampling, and exports parameter sets."
  sources: [correlation-change, correlation, correlation-tests]
  reviewedAt: "2026-11-25"
access: "MIT-licensed Python source; NumPy and SciPy are required for statistical analysis and PyQt6 for the GUI. Input simulator outputs and model data must be supplied separately."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/niuniuaba/pqwave"
    purpose: code
  - id: activity
    title: "November 21 window registry startup repair and regression"
    url: "https://github.com/niuniuaba/pqwave/commit/a5d204596b495a81f1202357a66588c127e3f37d"
  - id: correlation-change
    title: "May 22 co-credited model-parameter correlation implementation"
    url: "https://github.com/niuniuaba/pqwave/commit/3627a45ced3f0b1267d25fb0db9c1721af045a83"
  - id: correlation
    title: "Retained correlation sampling and simulator-specific export"
    url: "https://github.com/niuniuaba/pqwave/blob/f7b7e1cb3f74d31be232360733361a6d396a3d8b/pqwave/analysis/correlation.py"
  - id: correlation-tests
    title: "Retained model parsing, deterministic sampling and export tests"
    url: "https://github.com/niuniuaba/pqwave/blob/f7b7e1cb3f74d31be232360733361a6d396a3d8b/pqwave/tests/test_correlation.py"
  - id: multi-run
    title: "Retained yield and sensitivity analysis"
    url: "https://github.com/niuniuaba/pqwave/blob/f7b7e1cb3f74d31be232360733361a6d396a3d8b/pqwave/analysis/multi_run.py"
  - id: session-api
    title: "Scriptable Monte Carlo session operations"
    url: "https://github.com/niuniuaba/pqwave/blob/f7b7e1cb3f74d31be232360733361a6d396a3d8b/pqwave/session/api.py"
  - id: maintenance
    title: "September API and test-suite repairs"
    url: "https://github.com/niuniuaba/pqwave/commit/04393a9ed5e557ce10023f85efe3fe4112c89200"
  - id: registry-test
    title: "Retained startup registry regression"
    url: "https://github.com/niuniuaba/pqwave/blob/f7b7e1cb3f74d31be232360733361a6d396a3d8b/pqwave/tests/test_window_registry.py"
---

## Scope and limits

The additional discovery value beyond general analog waveform viewers is an executable statistical workflow spanning pre-simulation correlated parameter generation and post-simulation analysis. The Qt-free correlation module extracts supported model parameter values, factors a user-supplied positive-definite correlation matrix with Cholesky decomposition, generates seeded Gaussian samples scaled by nominal values and standard deviations, and exports CSV/TSV, parameter snippets or ngspice control scripts. The multi-run analysis computes empirical yield and ranks association by Spearman correlation. This is not a physical process model, an inferred foundry covariance matrix, a hierarchical mismatch engine or a causal sensitivity estimate. The sampled values are not guaranteed to satisfy model-specific physical bounds. [Correlation implementation](#source-correlation) · [Tests](#source-correlation-tests) · [Multi-run calculations](#source-multi-run) · [Session API](#source-session-api).

The primary operation analyzes analog simulation outputs and prepares statistical experiments, so this listing stays in Analog despite mixed-signal waveform support. The reviewed numerical workflow is conventional; software-development attribution is recorded separately from the runtime stage. Optional natural-language command interfaces do not establish a model-driven statistical estimator.

## Reviewed maintenance and provenance

May adds the correlation engine and tests with explicit Claude co-credit, retained in the current source. September repairs API behavior and test infrastructure; November 21 corrects a PyQt6 singleton initialization crash and retains regression tests. These changes establish technical follow-through after the initial public release. No statistical campaign, GUI run, or generated simulator-control script was independently executed. [Credited integration](#source-correlation-change) · [September maintenance](#source-maintenance) · [November maintenance](#source-activity) · [Startup regression](#source-registry-test).
