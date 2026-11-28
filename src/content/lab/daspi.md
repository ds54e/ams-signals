---
name: "DaSPi"
aliases: ["Data Analysis and Statistics in Python", "Gage R&R", "measurement system analysis"]
description: "Python statistical analysis library with measurement-system studies, ANOVA, variance-component estimation, process capability and diagnostic charts. GageStudyModel evaluates reference measurements and uncertainty components; GageRnRModel evaluates part, appraiser or measurement-system variation using structured measurement data."
scope:
  analysis: { ai: false }
access: "BSD-3-Clause; requires appropriately designed studies, suitable reference values and independently justified uncertainty inputs and engineering tolerances."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/j4ggr/DaSPi"
    purpose: code
  - id: activity
    title: "November configurable control-limit estimation and regression updates"
    url: "https://github.com/j4ggr/DaSPi/commit/15dee3991a5d7fe4cdf3ea29028e4aa9a981ee04"
  - id: earlier
    title: "January combined measurement-system and measurement-process uncertainty results"
    url: "https://github.com/j4ggr/DaSPi/commit/9fd8144dc105b113bd606e36a0059ec23fdac95c"
  - id: models
    title: "Retained measurement study and Gage R&R models"
    url: "https://github.com/j4ggr/DaSPi/blob/186cb5ce348fca4f214742cf92c11634415a985e/daspi/anova/model.py"
  - id: tests
    title: "Retained uncertainty and variance-component comparison tests"
    url: "https://github.com/j4ggr/DaSPi/blob/186cb5ce348fca4f214742cf92c11634415a985e/tests/anova_model_test.py"
  - id: related-capability-anova
    title: "Related crossed-study ANOVA reporting application"
    url: "https://github.com/DailyDana/process-capability-analyzer/blob/b71d69e126454484aba5a1ed89125449e94a26a1/app/msa/anova.py"
---

## Scope and limits

The reusable Python models evaluate recorded measurements, including repeated observations of reference parts, calibration and resolution uncertainties, bias, linearity and measurement-process variance components. The tests contain reference comparisons for Gage R&R ANOVA and uncertainty tables. This adds designed measurement-system studies alongside processbehavior's time-ordered process analysis and Suncal's explicit measurement-model propagation. A site or fixture can be represented as a study factor when the experiment design and model support that interpretation; the library is not an ATE driver or an STDF parser. No hardware or statistical qualification was independently performed. [Model implementation](#source-models) · [Comparison tests](#source-tests).

## Reviewed maintenance

January 2026 changes GageRnRModel to return both measurement-system and measurement-process uncertainty components; the combined result is retained at the reviewed head. November exposes configurable control-limit strategy and agreement defaults across estimation and plotting, including corresponding test changes. These are changes to existing usable analysis code rather than documentation-only activity. [January change](#source-earlier) · [November change](#source-activity).

## November 28, 2026 implementation review

GageStudyModel constructs separate calibration, resolution, bias, linearity and repeatability uncertainty components and combines them into measurement-system uncertainty. GageRnRModel separately constructs measurement-process uncertainty using study and application components, including appraiser, interaction, temperature and stability contributions. This is a reusable uncertainty-budget and model API, beyond a report of crossed ANOVA variance components. The related capability application exposes a different, report-oriented entry point and an explicit interaction pooling convention. A site or fixture variation component is not automatically a complete measurement uncertainty budget. [Study and R&R models](#source-models) · [Related ANOVA](#source-related-capability-anova).
