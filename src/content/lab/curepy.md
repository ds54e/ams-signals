---
name: "curepy"
aliases: ["CoMet Toolkit curepy", "inverse measurement problems"]
description: "Python library for recovering model parameters from measured observations while propagating measurement, ancillary-parameter and prior uncertainties. Implements optimal estimation with numerical Jacobians and posterior covariance calculations, and MCMC-based retrieval with parameter uncertainty and correlation outputs."
scope:
  analysis: { ai: false }
access: "LGPL-3.0 repository license; requires a suitable user-defined measurement function, justified noise and correlation models, and appropriate priors where used."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical inverse-problem implementation"
    url: "https://github.com/comet-toolkit/curepy"
    purpose: code
  - id: activity
    title: "May 15 correlation and whitening implementation corrections"
    url: "https://github.com/comet-toolkit/curepy/commit/0dcf00d208fbadec5b0dd3b9726597ea25137ae1"
  - id: earlier
    title: "April 13 MCMC selected-dimension correlation correction"
    url: "https://github.com/comet-toolkit/curepy/commit/b07a0d46ae907bd3a3e38f8efc96c24963c82f33"
  - id: oe
    title: "Retained optimal estimation and measurand covariance calculation"
    url: "https://github.com/comet-toolkit/curepy/blob/0dcf00d208fbadec5b0dd3b9726597ea25137ae1/curepy/retrieval_methods/optimal_estimation.py"
  - id: mcmc
    title: "Retained MCMC retrieval and posterior correlation estimation"
    url: "https://github.com/comet-toolkit/curepy/blob/0dcf00d208fbadec5b0dd3b9726597ea25137ae1/curepy/retrieval_methods/mcmc.py"
  - id: measurement
    title: "Retained correlated measurement inputs and whitening"
    url: "https://github.com/comet-toolkit/curepy/blob/0dcf00d208fbadec5b0dd3b9726597ea25137ae1/curepy/container/measurement.py"
  - id: examples
    title: "Executable synthetic quadratic inverse-problem example"
    url: "https://github.com/comet-toolkit/curepy/blob/0dcf00d208fbadec5b0dd3b9726597ea25137ae1/examples/simple_quadratic_OE_example.py"
---

## Scope and limits

The inverse workflow accepts recorded observations, a forward measurement function and uncertain inputs, then estimates unknown model parameters and their uncertainty. Optimal estimation uses local sensitivity and covariance calculations; the MCMC path estimates uncertainty and correlations from samples. This differs from Suncal's forward uncertainty propagation and OptimalDesign.jl's selection of experimental conditions. The synthetic examples establish usable entry points rather than measured device performance. Inverse identifiability, model discrepancy, covariance conditioning and sampling convergence remain application-specific. [Optimal estimation](#source-oe) · [MCMC](#source-mcmc) · [Example](#source-examples).

## Reviewed maintenance

April 13 corrects the correlation calculation when retrieving results along selected dimensions. May 15 integrates revised correlation handling and whitening in the measurement and retrieval paths. Both operations are retained in the reviewed source. The displayed history includes earlier development from before the current repository creation; no later substantive change than May 15 was observed on the default branch. No numerical or physical result was independently reproduced. [April correction](#source-earlier) · [May integration](#source-activity) · [Retained measurement handling](#source-measurement).
