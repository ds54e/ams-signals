---
name: "Calibra Fácil"
aliases: ["CalibraFacil", "calibration laboratory", "GUM uncertainty engine"]
description: "Calibration-laboratory application with an inspectable TypeScript numerical engine for measurement models, Type A and B uncertainties, correlations, uncertainty budgets and coverage factors. Supports calibration records, review and certificate workflows, and draft measurement-method templates."
scope:
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable is co-credited for correcting the numerical sensitivity fallback to use input uncertainty with a relative-step floor and adding regression cases. The implementation and tests remain in the reviewed math engine."
  sources: [activity, measurement-model, regressions]
  reviewedAt: "2026-11-25"
access: "MIT repository license; self-hosted application and reusable TypeScript math engine. The laboratory must independently validate its methods and results; the supplied frequency-indication template is explicitly draft."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical calibration application and numerical engine"
    url: "https://github.com/CalibraFacil/calibrafacil"
    purpose: code
  - id: activity
    title: "November 12 math-engine 0.6.0 corrections and AI credit"
    url: "https://github.com/CalibraFacil/calibrafacil/commit/e451727b87efb024a5dfe217ec782d2f843a2e98"
  - id: earlier
    title: "November 11 math-engine 0.5.0 numerical review and regression changes"
    url: "https://github.com/CalibraFacil/calibrafacil/commit/0ab08040760aa793d236727a4fdb06f64dc08d0a"
  - id: measurement-model
    title: "Retained measurement model, correlation and numerical sensitivity calculations"
    url: "https://github.com/CalibraFacil/calibrafacil/blob/e17bc56b2ea090498658cf7c4ea14c587a39b477/packages/math-engine/src/gum/measurement.ts"
  - id: regressions
    title: "Retained math-engine review regression tests"
    url: "https://github.com/CalibraFacil/calibrafacil/blob/e17bc56b2ea090498658cf7c4ea14c587a39b477/packages/math-engine/src/audit/math-engine-review-0.6.0.spec.ts"
  - id: frequency-template
    title: "Draft rotational-speed indication calibration method"
    url: "https://github.com/CalibraFacil/calibrafacil/blob/e17bc56b2ea090498658cf7c4ea14c587a39b477/packages/method-templates/src/templates/frequency-indication.ts"
  - id: overview
    title: "Project workflow and validation limitations"
    url: "https://github.com/CalibraFacil/calibrafacil/blob/e17bc56b2ea090498658cf7c4ea14c587a39b477/README.md"
---

## Scope and limits

The measurement-model engine evaluates formulas with specified standard uncertainties and pairwise correlation or covariance information. It produces combined and expanded uncertainty and budget entries; the application connects numerical results to calibration records and review workflows. This is an independently inspectable analysis and record workflow distinct from a general uncertain-number arithmetic library or a standalone GUM calculator. It does not implement a frequency counter or an RF reference calibration procedure. The frequency-indication template is specifically for tachometer rotational-speed indication and is marked draft pending metrologist review, not a validated electronic frequency-standard method. [Measurement model](#source-measurement-model) · [Draft method](#source-frequency-template) · [Application overview](#source-overview).

## Reviewed maintenance and provenance

The repository history includes development before the reviewed October 2026 public repository creation. The first-parent committer timestamps describe retained history, not necessarily historical public availability. November 11 revises Student-t, beta-function, derivative and rounding calculations with independent-reference regression inputs. November 12 revises the numerical sensitivity step and guards against loss of numerical resolution for very small input uncertainty. The latter carries explicit Claude Fable credit and the code and regression remain at the reviewed head. These are concrete corrections to usable numerical code; the tests and dossiers are not independent accreditation or approval. No upstream tests or calibration were independently executed. [November 11 review](#source-earlier) · [November 12 correction](#source-activity) · [Regression tests](#source-regressions).
