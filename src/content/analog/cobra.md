---
name: "COBRA"
aliases: []
summary: "Surrogate-driven RF circuit optimization with circuit simulation and fixed-EM retuning."
description: "RFIC circuit optimizer that consumes learned ORCA component models, patches a circuit netlist and evaluates simulated responses against design goals. The reviewed source also supports retuning with fixed full-wave models; feasible surrogate inputs, simulator success and comparison with an independent reference remain separate checks."
scope: {"design": {"ai": true}, "simulation": {"ai": true}}
access: "Public Python implementation; circuit runs need Xyce or compatible VACASK setup and the relevant component models."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/DI-PASSIONATE/COBRA"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/DI-PASSIONATE/COBRA/commit/2b24532f2666b9c5a6030521c4997f8c93b9235a"
  - id: website
    title: "Maintainer documentation"
    url: "https://di-passionate.github.io/COBRA/"
    purpose: official
  - id: release
    title: "COBRA v3.2.0"
    url: "https://github.com/DI-PASSIONATE/COBRA/releases/tag/v3.2.0"
  - id: retune
    title: "Integrated circuit retuning with fixed EM models"
    url: "https://github.com/DI-PASSIONATE/COBRA/pull/75"
  - id: earlier
    title: "Earlier optimizer starting-point implementation"
    url: "https://github.com/DI-PASSIONATE/COBRA/pull/69"
  - id: dc-pin-override
    title: "Reviewed VACASK DC-pin override implementation"
    url: "https://github.com/DI-PASSIONATE/COBRA/blob/2b24532f2666b9c5a6030521c4997f8c93b9235a/src/cobra/spice_sim/vector_fit.py"
  - id: review-20261124-linked
    title: "Integrated cross-type optimizer parameter links"
    url: "https://github.com/DI-PASSIONATE/COBRA/commit/2e951bf8f275c1d3b2c8b75736946effe0f511b4"
  - id: review-20261124-nan
    title: "Integrated NaN goal failure and noise-factor boundary corrections"
    url: "https://github.com/DI-PASSIONATE/COBRA/commit/2a7744992e23dc88afa6eb0223bb1e855ad14200"
  - id: review-20261124-timeout
    title: "Integrated simulation time limit and regression cases"
    url: "https://github.com/DI-PASSIONATE/COBRA/commit/afc2eee39f075c175e5949cbc825229cd0ccc828"
  - id: review-20261125-optimizer
    title: "Retained shared linked-parameter sampling"
    url: "https://github.com/DI-PASSIONATE/COBRA/blob/94a9fa1e86d7c847588e3dd7700268ff2d6b2282/src/cobra/optimizers/optuna_optimizer.py"
  - id: review-20261125-goal
    title: "Retained failed-goal scoring"
    url: "https://github.com/DI-PASSIONATE/COBRA/blob/94a9fa1e86d7c847588e3dd7700268ff2d6b2282/src/cobra/optimizers/design_goal.py"
  - id: review-20261125-run
    title: "Retained simulator timeout execution"
    url: "https://github.com/DI-PASSIONATE/COBRA/blob/94a9fa1e86d7c847588e3dd7700268ff2d6b2282/src/cobra/spice_sim/run_command.py"
---

### Scope and evidence

The optimization loop consumes learned S-parameters as numerical predictions that materially drive response evaluation and design trials. The circuit solver, vector fitting and fixed-EM retuning are numerical operations; the learned path does not make those engines model-driven. Unlike ORCA, COBRA optimizes a circuit from supplied component models rather than generating or training those models from geometry scans. No Layout label or development attribution is borrowed.

The reviewed source includes retuning and a DC-pin override with tests after v3.2.0. Neither the objective nor an upstream EM rerun establishes fabricated-circuit or out-of-domain accuracy. [Earlier optimizer work](#source-earlier) · [Version](#source-release) · [Retuning](#source-retune) · [DC-pin integration](#source-activity).

The reviewed VACASK vector-fitting path enables `force_dc_pin` by default. When an input includes a 0 Hz point, it can reinstate a DC pin that snp2le skipped because of a below-band passivity excursion; the subsequent singular-operating-point check still applies. Check the final model's passivity and low-frequency behavior when interpreting its DC resistance. [DC-pin override](#source-dc-pin-override).

### November 25 source review

November 24 integrates linked parameters spanning model inputs and netlist variables, with regressions for both master directions and Optuna/gradient optimizers. The retained Optuna path resolves masters across both parameter lists and samples shared trial variables once. Another integration treats NaN goal values as failed rather than accepting a partially undefined sweep, and rejects nonpositive noise factors when converting to dB. The simulator runner also adds a configurable timeout for Xyce and VACASK, including process cleanup and mocked-executable regression tests. The default timeout is zero (unlimited). These are concrete improvements to design-space execution and failure handling, not new oscillator PNOISE support. They were reviewed in default-branch code after the earlier DC-pin review; no optimizer, EDA run or regression was independently executed. [Cross-type links](#source-review-20261124-linked) · [Goal correction](#source-review-20261124-nan) · [Timeout](#source-review-20261124-timeout) · [Optimizer](#source-review-20261125-optimizer) · [Goal scoring](#source-review-20261125-goal) · [Runner](#source-review-20261125-run).
