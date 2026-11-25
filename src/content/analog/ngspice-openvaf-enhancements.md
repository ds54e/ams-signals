---
name: "Ngspice + OpenVAF Enhancements"
aliases: []
summary: "Extends SPICE and Verilog-A with circuit optimization, correlated Monte Carlo and high-sigma failure-probability analysis."
description: "Extends ngspice and OpenVAF with Gaussian-process Bayesian circuit optimization, correlated Monte Carlo and high-sigma failure-probability estimation. Scaled-sigma importance sampling and worst-case-distance analysis supplement conventional SPICE evaluation; these enhancements belong to the combined development tree, not automatically to either upstream project."
scope:
  design:
    ai: true
  simulation:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "A Claude-credited commit implements compiler discipline-attribute handling and OSDI callbacks retained in this tree."
  sources: ["development-1", "development-2", "development-20261124-retained"]
  reviewedAt: '2026-11-24'
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: '2026-11-25'
sources:
  - id: "code"
    title: "Canonical Ngspice + OpenVAF Enhancements repository"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/1f70cb3788cabdd8ba2d694b2318c92b6e9727a9/README.md"
  - id: "implementation"
    title: "Reviewed implementation: docs/handbook/README.md"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/05fa8a439e7b84a26f45320dceb8dea2391ae2a1/docs/handbook/README.md"
  - id: "activity"
    title: "fix: a system function or random draw in a parameter default or range is refused, not crashed on (compiler hunt F1)"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/commit/2fbf9870a30a84a524dc55aeadafb3613c11e305"
  - id: "website"
    title: "Official project documentation"
    url: "https://javanoviceprogrammer.github.io/Ngspice_OpenVAF_Enhancements/"
    purpose: "official"
  - id: "development-1"
    title: "Owner’s development account"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/54202d0f1d510934f34c05ea14333513859a6bc6/README.md"
  - id: "development-2"
    title: "Compiler and simulator implementation"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/commit/c0f6e5c29e396d87a34780939d67f8110b562679"
  - id: "activity-refresh"
    title: "Trust-region optimization and persistent deck-parameter optimum, September 30, 2026"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/commit/1f70cb3788cabdd8ba2d694b2318c92b6e9727a9"
  - id: "optimizer"
    title: "Implemented parameter optimizer and Gaussian-process search"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/1f70cb3788cabdd8ba2d694b2318c92b6e9727a9/ngspice-46/src/frontend/com_optimize.c"
  - id: "bayesian-search"
    title: "Bayesian optimizer mechanism, checks and limitations"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/1f70cb3788cabdd8ba2d694b2318c92b6e9727a9/enhancements_doc/Enhancement-765.md"
  - id: "activity-current"
    title: "Verilog-A diagnostics and numeric-cast corrections"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/commit/14ab4f3be7ba4dc5987164bd78ab0a9e929f32cd"
  - id: development-20261124-retained
    title: "Credited executable contribution retained at the current head"
    url: https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/9309c753edf70b37da77211274d1151e6ca2cd11/OpenVAF-master-20260610/openvaf/hir_def/src/item_tree/lower.rs
  - id: statistical-implementation
    title: "Retained Monte Carlo, scaled-sigma and worst-case-distance implementation"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/9309c753edf70b37da77211274d1151e6ca2cd11/ngspice-46/src/frontend/com_sweep.c"
  - id: statistical-audit
    title: "September 4 statistical command correctness audit and reported fixes"
    url: "https://github.com/javaNoviceProgrammer/Ngspice_OpenVAF_Enhancements/blob/9309c753edf70b37da77211274d1151e6ca2cd11/docs/bug_hunts/2026-09-04_monte-carlo-commands.md"
---

### Scope

The repository carries simulator and Verilog-A compiler source plus a built-in parameter optimizer. SPICE execution and compiler-to-simulator OSDI integration serve Simulation; fitting instance, model and netlist parameters against measured objectives serves Design. [Project documentation](#source-readme); [optimizer implementation](#source-optimizer).

### Classification

The author explicitly presents the development effort as Claude-assisted; core compiler fixes also carry Claude co-authorship. [Reviewed source](#source-readme).

### Release boundary

These enhancements belong to this combined development tree and are not automatically upstream ngspice/OpenVAF features. Automated binary publishing is excluded from the meaningful-activity decision. [Public update](#source-activity).

[Implementation inspected](#source-implementation).

### Scope classification

The implemented `optimize -method bayes` path fits a Matérn Gaussian-process surrogate to evaluated costs and uses expected improvement to select the next circuit-parameter candidate. This model-driven sizing loop supports AI Design independently of development provenance. Conventional local and population optimizers are also available. [Implementation](#source-optimizer); [method and limitations](#source-bayesian-search).

SPICE still executes the requested electrical analyses for candidates; the surrogate guides optimization rather than supplying a separate electrical-analysis engine, so Simulation remains conventional. Compiler internals alone do not establish circuit-design generation. [Implementation](#source-optimizer).

The September 30 update adds a bounded trust-region optimizer and preserves the optimized netlist parameter across a subsequent reset on large-deck fast paths. Its regression results are author-reported, not independently reproduced here. Automated binary publication is not the meaningful activity signal. [Reviewed update](#source-activity-refresh).

### Development provenance review

**AI-ASSISTED** applies to the credited compiler lowering and OSDI callback enhancements retained in this combined tree. The attribution concerns these enhancements, not the inherited simulator/compiler codebases. [Owner’s development account](#source-development-1); [Compiler and simulator implementation](#source-development-2).

### Current activity review

Reviewed 2026-10-05. The reviewed diagnostics/numeric-cast change updates the Verilog-A casting macro implementation. Activity and development attribution remain specific to the enhancement fork, not upstream ngspice or OpenVAF. [Reviewed change](#source-activity-current).

The owner identifies Claude Code use, and a Claude-credited commit implements compiler discipline-attribute handling and OSDI callbacks retained in this tree. These credited contributions support AI-assisted development. [Owner’s development account](#source-development-1) · [Compiler and simulator implementation](#source-development-2).

Current-head review confirms that the credited discipline-attribute evaluation remains in the canonical compiler. This compiler contribution is software-development provenance, separate from runtime circuit-optimization classification. [Retained implementation](#source-development-20261124-retained).

### Statistical simulation review

The retained frontend implements ordinary Monte Carlo, scaled-sigma importance sampling in `highsigma` with likelihood-ratio weighting, and `wcd` with a first-order reliability approximation and optional mean-shift importance sampling near the design point. The commands use supported statistical parameters and execute SPICE for sampled points. The September 4 audit records corrections for unresolved expressions, model-declared statistical dimensions in WCD and seed reporting. A nonlinear or multimodal failure boundary can limit a local first-order reliability approximation; neither algorithm validates the underlying process distributions or foundry yield. The reported analytical and regression checks were not rerun here. These conventional statistical operations retain Simulation without an AI flag. This review adds evidence at the already captured head and does not recapture activity or change the existing meaningful checkpoint. [Retained statistical commands](#source-statistical-implementation) · [Correctness audit](#source-statistical-audit).
