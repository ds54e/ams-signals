---
name: "processbehavior"
aliases: ["Process Behavior Analysis","statistical process control"]
description: "Python library for analyzing recorded process measurements with time-ordered and subgroup control charts, signal-rule detection, variance analysis and process capability. It supports studies with time and factor structure, distinguishes potential and current capability, and provides chart tables and reports."
scope:
  analysis: { ai: false }
access: "Apache-2.0; requires appropriately ordered and grouped measurement data and independently specified engineering limits."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/cnicholas/processbehavior"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/cnicholas/processbehavior/commit/85bb0dbaaf1f5f543f40cd8b0369d29bbd4112a0"
  - id: subgroups
    title: "October subgroup count and chart-table correctness integration"
    url: "https://github.com/cnicholas/processbehavior/commit/f325f76cc69b49e9ff8ed165c75dfcac1ced256f"
  - id: signals
    title: "Retained control-chart signal detection implementation"
    url: "https://github.com/cnicholas/processbehavior/blob/d28e8d15fcabc3485f7c47e0e983b6dffe0d2f17/processbehavior/signals/detectors.py"
  - id: capability
    title: "Retained capability and window-specific variation estimation"
    url: "https://github.com/cnicholas/processbehavior/blob/d28e8d15fcabc3485f7c47e0e983b6dffe0d2f17/processbehavior/capability.py"
---

## Scope and limits

The library analyzes recorded measurements using time and subgroup structure rather than only pooled distributions. A lab or production-test pipeline can supply ordered data and factors such as site or lot for appropriate studies. The capability implementation distinguishes overall and residual-based variation estimators, with separate reporting of window-specific variation. It is not an STDF parser, a semiconductor-specific disposition system or a substitute for a measurement system study. Control limits are not specification limits, and capability indices do not establish stable processes or yield without appropriate statistical assumptions. [Signal detection](#source-signals) · [Capability implementation](#source-capability).

## Reviewed maintenance

October 2026 corrects subgroup labels and counts in Xbar/S tables so the displayed count corresponds to the aggregation used for limits. November corrects signal-rule definitions and adds regressions for points beyond the limits and rule lengths. The revised detector remains in the reviewed tree. These are technical changes after an existing analysis implementation rather than documentation-only updates. [Subgroup correction](#source-subgroups) · [Rule correction](#source-activity).
