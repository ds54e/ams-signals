---
name: "TCADOpt"
aliases: ["TCAD Optimization Engine"]
summary: "Optimizes semiconductor device designs and extracts compact models with identifiability and curve-level checks."
description: "Bayesian optimization engine for TCAD device design and staged compact-model extraction. It fits electrical reference curves through simulator-backed evaluations, checks parameter identifiability and per-curve degradation, and reports trade-offs between current and capacitance fits; the documented BSIM-CMG extraction uses commercial simulators."
scope: {"design":{"ai":true},"simulation":{"ai":false}}
access: "MIT. Python, NumPy and SciPy; optional BoTorch/PyTorch backend. The documented GAA extraction uses Sentaurus reference curves and PrimeSim HSPICE; simulator installations and device inputs are separate."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine"
    purpose: code
  - id: activity
    title: "November 19 integration of v1.2.0 curve checks and trade-off analysis"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/commit/ad6db019492d0caeb56259a78ecbb10369562daa"
  - id: earlier
    title: "September 11 staged compact-model extraction integration"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/commit/9cebcd48a554317cbd552a4ca3ecda923ea5055d"
  - id: optimizer
    title: "Gaussian-process surrogate and candidate acquisition"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/blob/ad6db019492d0caeb56259a78ecbb10369562daa/optimizer/gp.py"
  - id: fit
    title: "Staged compact-model extraction orchestration"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/blob/ad6db019492d0caeb56259a78ecbb10369562daa/tcadopt/l8_orch/run_fit.py"
  - id: identifiability
    title: "Parameter sensitivity and identifiability implementation"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/blob/ad6db019492d0caeb56259a78ecbb10369562daa/tcadopt/l6_verify/identifiability.py"
  - id: guard
    title: "Per-curve degradation guard"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/blob/ad6db019492d0caeb56259a78ecbb10369562daa/tcadopt/l1_spec/guard.py"
  - id: trade
    title: "Shared parameter trade-off scan"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/blob/ad6db019492d0caeb56259a78ecbb10369562daa/tcadopt/l5_opt/price.py"
  - id: spice
    title: "HSPICE execution and electrical sweep parsing"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/blob/ad6db019492d0caeb56259a78ecbb10369562daa/tcadopt/l3_exec/spice_exec.py"
  - id: changelog
    title: "Release history and reported extraction boundaries"
    url: "https://github.com/rskrishna2004/tcad-optimization-engine/blob/ad6db019492d0caeb56259a78ecbb10369562daa/CHANGELOG.md"
---

## Scope and limits

Device design uses a learned Gaussian-process surrogate and acquisition policy to choose TCAD evaluations, supporting Design with AI-backed search. Compact-model extraction runs electrical sweeps, freezes parameters across fitting stages, and measures local parameter identifiability. Its simulator evaluation remains conventional. Unlike Compyct's general simulator-backed fitting interface, this workflow adds staged parameter freezing and model-specific dependency and curve-level checks. [Optimizer](#source-optimizer) · [Extraction](#source-fit) · [Identifiability](#source-identifiability).

The documented GAA BSIM-CMG workflow uses Sentaurus-generated reference curves and PrimeSim HSPICE. It is not independently calibrated against planar silicon. The current guard checks per-curve deterioration and the trade-off scan measures competing objectives when a shared parameter affects both drain current and charge. These tools do not establish global identifiability, parameter transferability or model qualification. [Simulator interface](#source-spice) · [Curve guard](#source-guard) · [Trade-off scan](#source-trade).

## Reviewed maintenance

September 11 integrated staged extraction, curve scoring, HSPICE evaluation and model-card generation. November 19 integrated v1.2.0 with per-curve guards, model dependency analysis and shared-parameter trade-off machinery. The release records a specific GAA extraction and its remaining limitations; no reported fit or simulator run was independently reproduced. No qualifying AI-development attribution was established from the reviewed changes. [September integration](#source-earlier) · [November integration](#source-activity) · [Changelog](#source-changelog).
