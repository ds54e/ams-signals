---
name: "OptimalDesign.jl"
aliases: ["Bayesian optimal experimental design", "parameter estimation", "expected information gain"]
description: "Julia library for designing measurements of parameters in user-supplied nonlinear models. Supports batch and adaptive designs using Fisher-information criteria and expected information gain, particle-based posterior updates, and an experiment loop that calls a supplied observation function and logs results."
scope:
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Sonnet is co-credited for the executable Gaussian-mixture posterior resampling strategy with BIC model selection and diagnostics. The strategy remains in the current source."
  sources: [activity, resampling]
  reviewedAt: "2026-11-25"
access: "MIT; requires Julia, a differentiable or otherwise compatible user-supplied model, appropriate prior and noise assumptions, and a measurement callback for live acquisition."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/waudbylab/OptimalDesign.jl"
    purpose: code
  - id: activity
    title: "May 22 Claude-credited GMM resampling implementation"
    url: "https://github.com/waudbylab/OptimalDesign.jl/commit/47790a39f86db935d1499914c4ff7132e5f590fa"
  - id: earlier
    title: "March adaptive batch allocation correction"
    url: "https://github.com/waudbylab/OptimalDesign.jl/commit/f7d6d936e26ee9c4e33b7cd76949f0e99809f69e"
  - id: eig
    title: "May expected-information-gain implementation and tests"
    url: "https://github.com/waudbylab/OptimalDesign.jl/commit/f97cc233a90f54907d452016ba46f75607c494a1"
  - id: loop
    title: "Retained adaptive design, observation and posterior-update loop"
    url: "https://github.com/waudbylab/OptimalDesign.jl/blob/453c6f4b3b0f546b43492b11f649f13eef24c62b/src/experiment.jl"
  - id: resampling
    title: "Retained GMM posterior resampling implementation"
    url: "https://github.com/waudbylab/OptimalDesign.jl/blob/453c6f4b3b0f546b43492b11f649f13eef24c62b/src/posteriors/gmm.jl"
  - id: example
    title: "Simulated periodic-model design comparison"
    url: "https://github.com/waudbylab/OptimalDesign.jl/blob/453c6f4b3b0f546b43492b11f649f13eef24c62b/examples/9_cos_eig_vs_dopt.jl"
  - id: parameter-selection-example
    title: "Damped-cosine D and Ds optimal design comparison"
    url: "https://github.com/waudbylab/OptimalDesign.jl/blob/453c6f4b3b0f546b43492b11f649f13eef24c62b/examples/11_cos_selection_criteria.jl"
  - id: related-gpcam-optimizer
    title: "Related learned GP surrogate and objective-callback optimizer"
    url: "https://github.com/lbl-camera/gpCAM/blob/94d23263f65e2012d32b402183fc352526ac6159/gpcam/gp_optimizer_base.py"
---

## Scope and limits

The primary outcome is a design for estimating parameters of a specified model and an updated parameter posterior, rather than a response-surface optimum from a learned Gaussian process. The adaptive runner chooses measurements, invokes a user-supplied acquire callback, updates the posterior and records observations and diagnostics. This supports a repeatable experimental workflow, but not a standalone instrument driver or validated physical calibration. Fisher-information and information-gain criteria operate on the specified model and noise assumptions; Gaussian-mixture fitting is an internal numerical posterior-resampling method rather than a separate model-driven hardware or diagnostic capability. The periodic-model example uses synthetic observations and compares designs in a problem with frequency ambiguity, not measured oscillator data. [Experiment loop](#source-loop) · [Information gain](#source-eig) · [Example](#source-example).

## Reviewed maintenance and provenance

March corrects allocation in adaptive batch mode. May adds an expected-information-gain criterion, examples and tests, followed by pluggable Gaussian-mixture resampling with BIC-guided component selection and diagnostics. The latter has an explicit Claude credit and is retained at the reviewed head. These changes follow an initial usable design package in March; the most recent implementation checkpoint is May 22, with later example/documentation maintenance. No upstream tests or physical measurement were independently run. [March correction](#source-earlier) · [Information-gain change](#source-eig) · [Resampling change](#source-activity).

## November 28, 2026 implementation review

The retained May example compares D-optimal and parameter-subset Ds-optimal designs for a damped cosine with amplitude, angular frequency and decay-rate parameters. It checks design optimality and evaluates synthetic noisy observations using the supplied model. This is a parameter-estimation experiment, unlike gpCAM's learned response surrogate and general black-box objective optimization. A numerical posterior over parameters of a user-supplied physical model does not imply a learned response model, autonomous agent or physical instrument integration. The May example illustrates existing criteria rather than advancing the reviewed core implementation checkpoint. [Selection example](#source-parameter-selection-example) · [Related GP optimizer](#source-related-gpcam-optimizer).
