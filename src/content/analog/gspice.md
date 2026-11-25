---
name: "GSPICE"
aliases: ["GSpice"]
summary: "Experimental circuit solver with runtime DAE derivative and charge-conservation auditing."
description: "Experimental C++ SPICE-like simulator for operating-point, transient, AC and other limited analyses, with finite-difference audits of device residual Jacobians and charge conservation. Native device coverage and RF analyses remain experimental; current Apache builds do not provide a general external compiled-model loader."
scope:
  simulation: { ai: false }
access: "Apache-2.0 public source. CMake, a C++17 compiler and OpenMP are documented prerequisites; SuiteSparse/KLU is optional for development builds and required by the Windows release preset."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/hegdeshreesha/GSPICE"
    purpose: code
  - id: activity
    title: "August 29 source initialization and AC phase correction integration"
    url: "https://github.com/hegdeshreesha/GSPICE/commit/ae2dfcba271ccda22be6272ec0a40cb4105629bf"
  - id: earlier
    title: "June 15 correctness diagnostics implementation"
    url: "https://github.com/hegdeshreesha/GSPICE/commit/28f8c457b64710d7a34d29eefac875108ee81fca"
  - id: audit
    title: "Retained DAE residual and Jacobian audit implementation"
    url: "https://github.com/hegdeshreesha/GSPICE/blob/ae2dfcba271ccda22be6272ec0a40cb4105629bf/include/dae_audit.hpp"
  - id: execution
    title: "Retained audit dispatch and experimental analysis execution"
    url: "https://github.com/hegdeshreesha/GSPICE/blob/ae2dfcba271ccda22be6272ec0a40cb4105629bf/src/core/main.cpp"
  - id: audit-deck
    title: "Executable runtime audit fixture"
    url: "https://github.com/hegdeshreesha/GSPICE/blob/ae2dfcba271ccda22be6272ec0a40cb4105629bf/tests/decks/dae_audit.sp"
  - id: model-test
    title: "Native BSIM4 charge and charge-Jacobian regression source"
    url: "https://github.com/hegdeshreesha/GSPICE/blob/ae2dfcba271ccda22be6272ec0a40cb4105629bf/tests/bsim4_model_dae_test.cpp"
  - id: limitations
    title: "Academic beta limitations"
    url: "https://github.com/hegdeshreesha/GSPICE/blob/ae2dfcba271ccda22be6272ec0a40cb4105629bf/docs/LIMITATIONS.md"
  - id: overview
    title: "Reviewed build, analysis and licensing boundaries"
    url: "https://github.com/hegdeshreesha/GSPICE/blob/ae2dfcba271ccda22be6272ec0a40cb4105629bf/README.md"
---

## Scope and limits

The project provides a standalone circuit solver rather than a model-verification harness for arbitrary simulators. Its distinctive audit path finite-differences F and Q residuals against supplied device Jacobians at an operating point, checks terminal-charge and charge-Jacobian balance, and reports checked and skipped devices separately. Only devices admitted as audit-safe participate. The included native BSIM4 fixture checks charge and derivative sums at a selected bias; it does not establish a qualified BSIM4 implementation or acceptance of arbitrary PDK model cards. [Audit implementation](#source-audit) · [Runtime dispatch](#source-execution) · [Audit deck](#source-audit-deck) · [Model fixture](#source-model-test).

The current README disables external compiled-model plugins. The limitations document describes periodic analysis as unvalidated; the retained source nevertheless includes experimental PSS execution and a PNOISE branch evaluating small-signal noise using the stored periodic state. This branch is not evidence of a general time-periodic sideband-noise or autonomous oscillator phase-noise solver. The documented Monte Carlo path varies an independent source in operating-point analysis, not arbitrary correlated process and mismatch parameters. [Overview](#source-overview) · [Execution source](#source-execution) · [Limitations](#source-limitations).

## Reviewed maintenance

June 15 adds correctness diagnostics after the April initial release. August 29 integrates source-initialization and AC source-phase changes with a regression deck. This is substantive follow-through, not independent numerical qualification. The academic beta claims neither foundry qualification nor general simulator equivalence. No build, audit, regression, or numerical comparison was executed for this review. [June change](#source-earlier) · [August integration](#source-activity).
