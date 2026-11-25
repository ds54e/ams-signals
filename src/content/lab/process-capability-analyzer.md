---
name: "Process Capability Analyzer"
aliases: ["DailyDana process-capability-analyzer", "Gage R&R", "Type-1 gauge study"]
description: "Python and Streamlit application for measurement-system analysis, statistical process control and capability reporting. Implements crossed Gage R&R with ANOVA and Average and Range methods, Type-1 reference measurements, and downloadable reports with calculation details."
scope:
  analysis: { ai: false }
access: "Apache-2.0; requires suitable recorded measurements, balanced crossed studies for the Gage R&R methods, and justified reference values and tolerances."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/DailyDana/process-capability-analyzer"
    purpose: code
  - id: activity
    title: "November explicit calculation derivations, report integration and regression tests"
    url: "https://github.com/DailyDana/process-capability-analyzer/commit/dd0435b403d3db179e5a61c6c22952a412e6884f"
  - id: type-one
    title: "October integrated Type-1 study and measurement-system reports"
    url: "https://github.com/DailyDana/process-capability-analyzer/commit/7e2c24d7c5ffc900f4d5f1324b572aa9b14ae2b0"
  - id: anova
    title: "Retained crossed-study ANOVA and variance components"
    url: "https://github.com/DailyDana/process-capability-analyzer/blob/b71d69e126454484aba5a1ed89125449e94a26a1/app/msa/anova.py"
  - id: reference-tests
    title: "Retained Gage R&R comparison against published examples"
    url: "https://github.com/DailyDana/process-capability-analyzer/blob/b71d69e126454484aba5a1ed89125449e94a26a1/tests/test_msa_published.py"
---

## Scope and limits

The application processes saved measurements and exposes crossed-study variance components, interaction pooling, study variation, tolerance-relative quantities and a Type-1 reference study with Cg, Cgk, bias testing and confidence intervals. Its separate calculation display recomputes reported quantities from displayed inputs; the November change adds regression comparisons of derivations and calculated outputs. Unlike DaSPi's reusable statistical models, the distinct entry point is an application for inspectable reports and reference-dataset comparisons, not a general-purpose modeling API. It does not control test hardware or establish instrument accuracy, and its crossed design is not a general nested or mixed-effects study. The source tests were inspected, not independently run. [ANOVA](#source-anova) · [Reference tests](#source-reference-tests) · [Type-1 integration](#source-type-one).

## Reviewed maintenance

The October Type-1 integration follows the September initial application and October crossed Gage R&R implementation; it adds a new measurement-study workflow and reports. November adds explicit arithmetic derivations and attaches them to reports, including tests that compare the displayed derivations with the analysis outputs. This establishes follow-through across separate implementation periods. [October integration](#source-type-one) · [November change](#source-activity).
