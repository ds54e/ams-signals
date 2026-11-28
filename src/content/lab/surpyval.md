---
name: "SurPyval"
aliases: ["Python reliability and survival analysis"]
description: "Python reliability-analysis library for censored and truncated lifetime data, parametric lifetime distributions, accelerated life tests and degradation modeling. It supports stress-life fitting and extrapolation, failure-threshold models and statistical diagnostics for recorded reliability studies."
scope:
  analysis: { ai: false }
access: "MIT; requires appropriate test or simulated data, justified stress-life assumptions and failure mechanisms. Statistical fits do not qualify a physical device."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/derrynknife/SurPyval"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/derrynknife/SurPyval/commit/6fbca35252d6ec7c1b72f7e557c118dc5a7c6d48"
  - id: earlier
    title: "July accelerated-life exponential parameter correction and tests"
    url: "https://github.com/derrynknife/SurPyval/commit/307900fa6e0af12b7384746887b09790f9b28129"
  - id: alt-model
    title: "Retained stress-life parameter substitution implementation"
    url: "https://github.com/derrynknife/SurPyval/blob/6fbca35252d6ec7c1b72f7e557c118dc5a7c6d48/surpyval/univariate/regression/accelerated_life/accelerated_life.py"
  - id: degradation
    title: "Retained destructive degradation and failure threshold model"
    url: "https://github.com/derrynknife/SurPyval/blob/6fbca35252d6ec7c1b72f7e557c118dc5a7c6d48/surpyval/degradation/destructive.py"
  - id: likelihood
    title: "Retained censored and truncated likelihood implementation"
    url: "https://github.com/derrynknife/SurPyval/blob/6fbca35252d6ec7c1b72f7e557c118dc5a7c6d48/surpyval/bayes/likelihood.py"
  - id: docs-only-integration
    title: "November 27 documentation publishing integration"
    url: "https://github.com/derrynknife/SurPyval/commit/9e38633ff27dfcc379062d9adfb5d246b257fe60"
  - id: reviewed-head-delta
    title: "Changes since the captured implementation checkpoint"
    url: "https://github.com/derrynknife/SurPyval/compare/6fbca35252d6ec7c1b72f7e557c118dc5a7c6d48...9e38633ff27dfcc379062d9adfb5d246b257fe60"
---

## Scope and limits

The library fits life distributions from failure and censoring observations and provides accelerated-life parameter substitution and degradation-to-failure models. These are reusable reliability analysis operations, distinct from process capability indices or measurement-uncertainty propagation. The stress model, failure mechanism, extrapolation range, censoring assumptions and data quality must be justified independently. Synthetic data can exercise an analysis pipeline but cannot establish real semiconductor lifetime, FIT or qualification results. [Accelerated-life model](#source-alt-model) · [Degradation model](#source-degradation).

## Reviewed maintenance

July 2026 corrects the exponential accelerated-life parameter mapping and adds regression tests; the corrected mapping is retained in the reviewed source. November's v0.29 integration refactors the censored and truncated likelihood implementation and adds pointwise likelihood and sampler-gradient support, with reference-comparison tests. The reviewed implementation contains the new likelihood paths. This demonstrates continued numerical-method development after earlier usable releases. [Accelerated-life correction](#source-earlier) · [November integration](#source-activity) · [Retained likelihood](#source-likelihood).

## November 28, 2026 implementation review

The destructive degradation model accepts one destructive measurement per unit, fits a time-dependent location-scale distribution and derives failure probability from its threshold tail, with separate increasing and decreasing degradation directions and support for censored responses. This is distinct from repeated-measurement degradation trajectories. Its lifetime interpretation assumes preserved population ordering over time and a suitable fitted distribution; it does not establish a semiconductor failure mechanism or qualification result. The reviewed November 27 default head differs from the saved November 22 head only in documentation build and publication workflow files. No numerical implementation checkpoint is advanced on that evidence. [Degradation model](#source-degradation) · [Head comparison](#source-reviewed-head-delta).
