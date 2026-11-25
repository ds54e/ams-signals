---
name: "gpCAM"
aliases: ["Gaussian process autonomous measurement", "Bayesian optimization", "adaptive sampling"]
description: "Python Gaussian-process modeling and adaptive experiment-design library. Updates a surrogate from observations, evaluates posterior uncertainty and acquisition criteria, and recommends sequential or batch measurement points over bounds or candidate sets, including pending points and optional measurement costs."
scope:
  analysis: { ai: true }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus is co-credited for the noisy expected improvement correction that conditions candidate predictions on sampled reference values, and its joint-posterior regression. The conditional calculation and test remain in the reviewed source."
  sources: [nei-fix, surrogate, tests]
  reviewedAt: "2026-11-25"
access: "GPL-3.0-or-later; requires compatible Python dependencies including fvGP, user-defined measurement inputs and a separate instrument or simulator integration."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/lbl-camera/gpCAM"
    purpose: code
  - id: activity
    title: "November 25 greedy batch ask and pending-point implementation"
    url: "https://github.com/lbl-camera/gpCAM/commit/5ce31f276c36d8ef8d9b6079704e04e001fd848b"
  - id: earlier
    title: "October single-task and multi-task optimizer integration"
    url: "https://github.com/lbl-camera/gpCAM/commit/a21385aeca5cfd701da40e549679250524f10257"
  - id: nei-fix
    title: "Claude-credited noisy expected improvement correction and regression"
    url: "https://github.com/lbl-camera/gpCAM/commit/2b4db255a72a392344bbec6bf53d4bbee531fb5d"
  - id: optimizer
    title: "Retained observation and next-point selection API"
    url: "https://github.com/lbl-camera/gpCAM/blob/94d23263f65e2012d32b402183fc352526ac6159/gpcam/gp_optimizer_base.py"
  - id: surrogate
    title: "Retained acquisition functions and batch selection"
    url: "https://github.com/lbl-camera/gpCAM/blob/94d23263f65e2012d32b402183fc352526ac6159/gpcam/surrogate_model.py"
  - id: tests
    title: "Retained conditional NEI and batch-selection regressions"
    url: "https://github.com/lbl-camera/gpCAM/blob/94d23263f65e2012d32b402183fc352526ac6159/tests/test_gpCAM.py"
  - id: experiment-skill
    title: "Experiment-design skill and measurement-loop guidance"
    url: "https://github.com/lbl-camera/gpCAM/blob/94d23263f65e2012d32b402183fc352526ac6159/gpcam/skills/experiment-designer/SKILL.md"
---

## Scope and limits

The reusable ask/tell workflow fits a learned surrogate to measured observations, evaluates posterior uncertainty and selects next measurement candidates. Candidate sets can represent discrete settings; cost and noise functions require appropriate user definitions. This is a distinct experimental decision and analysis operation, rather than a general-purpose circuit sizing optimizer or an instrument transport. The current optimizer API does not itself execute physical acquisitions or supply a qualified test recipe; the experiment-design skill guides construction of a user-specific measurement loop. A candidate recommendation, posterior credible interval or optimizer convergence is not a guaranteed pass boundary or instrument accuracy. [Optimizer](#source-optimizer) · [Acquisition functions](#source-surrogate) · [Experiment-design skill](#source-experiment-skill).

## Reviewed maintenance and provenance

October 28 unifies single-task and multi-task GP optimization. November 23 corrects noisy expected improvement by accounting for candidate-reference posterior correlation, with a joint Monte Carlo comparison test and explicit Claude credit. November 25 changes multi-point selection to a greedy batch by default, accepts pending points and retains distinct modes for set-valued and independent selection. The reviewed head retains these operations and regression tests. No upstream numerical suite or bench experiment was independently executed. [October change](#source-earlier) · [NEI correction](#source-nei-fix) · [Batch change](#source-activity) · [Retained tests](#source-tests).
