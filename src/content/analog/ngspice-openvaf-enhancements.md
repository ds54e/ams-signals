---
name: "Ngspice + OpenVAF Enhancements"
aliases: []
summary: "Extends SPICE simulation and Verilog-A compilation with circuit optimization, including Gaussian-process Bayesian search."
description: "Extends ngspice simulation and OpenVAF Verilog-A compilation with circuit-parameter optimization. A Gaussian-process surrogate guides Bayesian search alongside conventional optimizers, while SPICE evaluates each candidate; these Claude-assisted enhancements belong to the combined development tree rather than automatically to either upstream project."
scope:
  design:
    ai: true
  simulation:
    ai: false
  aiDevelopment: built
developmentEvidence:
  summary: "The owner describes this repository as a Claude Code effort to enhance ngspice and OpenVAF. Its defining work includes compiler lowering and OSDI simulator callbacks; the attribution concerns these enhancements."
  sources: ["development-1", "development-2"]
  reviewedAt: "2026-09-07"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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

Reviewed 2026-09-07: **AI-BUILT**. The owner explicitly defines this project as a Claude Code enhancement effort; the documented campaign and inspected compiler lowering/OSDI callback changes substantiate its defining contribution. Attribution applies to the enhancements, not the upstream codebases. [Owner’s development account](#source-development-1); [Compiler and simulator implementation](#source-development-2).
