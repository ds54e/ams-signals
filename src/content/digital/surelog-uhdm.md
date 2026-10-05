---
name: "Surelog + UHDM"
aliases: []
description: "SystemVerilog preprocessing, parsing and elaboration stack that exports UHDM design models. Serialized models and VPI access let downstream synthesis, simulation, lint and formal tools consume a shared representation without implementing their own complete SystemVerilog frontend."
scope:
  design:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Integrated September changes explicitly credit Claude Code across a substantial frontend-correctness campaign: preprocessing, instance parameter resolution and multidimensional default-pattern expansion. The attribution concerns these improvements to the existing Surelog/UHDM stack."
  sources: ["development-preprocessor", "development-parameters", "development-arrays"]
  reviewedAt: "2026-10-01"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-10-05"
sources:
  - id: "code"
    title: "Canonical Surelog + UHDM repository"
    url: "https://github.com/chipsalliance/Surelog"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed revision"
    url: "https://github.com/chipsalliance/Surelog/blob/932c2c1c7e9ec342f4835cac081b0f00d042dbcc/README.md"
  - id: "implementation"
    title: "Reviewed implementation: src/DesignCompile/CompileExpression.cpp"
    url: "https://github.com/chipsalliance/Surelog/blob/932c2c1c7e9ec342f4835cac081b0f00d042dbcc/src/DesignCompile/CompileExpression.cpp"
  - id: "activity"
    title: "Merge pull request #4165 from alaindargelas/uhdm_enum_const_fold"
    url: "https://github.com/chipsalliance/Surelog/commit/e063fac2eac571f79f643503a256278bd19ae788"
  - id: "uhdm"
    title: "UHDM model and APIs"
    url: "https://github.com/chipsalliance/UHDM"
  - id: "activity-refresh"
    title: "Preserve packed dimensions when evaluating anonymous type widths"
    url: "https://github.com/chipsalliance/Surelog/commit/932c2c1c7e9ec342f4835cac081b0f00d042dbcc"
  - id: "development-preprocessor"
    title: "Claude-attributed macro and include preprocessing implementation"
    url: "https://github.com/chipsalliance/Surelog/commit/30fbc871c42f360554782aed51d42e59b93a0b59"
  - id: "development-parameters"
    title: "Claude-attributed complex parameter-override resolution"
    url: "https://github.com/chipsalliance/Surelog/commit/568d33dcc47317337b8db962cb9c5e66d752827d"
  - id: "development-arrays"
    title: "Claude-attributed multidimensional parameter-default expansion"
    url: "https://github.com/chipsalliance/Surelog/commit/715f89d0677aab5295a25d10c4e34005cae53851"
  - id: "activity-current"
    title: "Local parameter precedence over wildcard imports"
    url: "https://github.com/chipsalliance/Surelog/commit/7c96e2fcf5712e8197cf6a1195f84fda117885cd"
---

### Implementation and scope

Preprocessing, parsing, elaboration, serialized UHDM models and public design-model APIs supply conventional Design infrastructure. Separate synthesis, simulation and formal consumers do not make those complete downstream operations part of this frontend. Only Surelog history supplies monthly activity; UHDM counts are not added. [Frontend uses and APIs](#source-readme); [UHDM project](#source-uhdm).

### Reviewed activity

The September 29 change preserves packed dimensions when evaluating anonymous logic/bit/reg types through $bits, with scalar, typedef and multidimensional regression cases. This corrects elaborated widths rather than only updating a dependency or documentation. [Reviewed change](#source-activity-refresh); [current expression implementation](#source-implementation).

### Development provenance review

Reviewed 2026-10-01: **AI-ASSISTED**. A cross-cutting September frontend-correctness campaign explicitly credits Claude Code in integrated implementation changes. Reviewed diffs modify preprocessing grammar and macro/include handling, preserve instance-specific complex parameter overrides, and recursively expand multidimensional parameter defaults with corresponding UHDM integration and regression fixtures. These paths remain present in the reviewed head. Assessed together, this is a substantial implemented campaign across distinct frontend operations rather than an isolated credited fix. It does not attribute creation of the complete Surelog/UHDM stack to AI or establish runtime AI. [Preprocessing changes](#source-development-preprocessor); [parameter resolution](#source-development-parameters); [array-default implementation](#source-development-arrays).

Reported Caliptra, CVA6 and regression outcomes are upstream evidence, not catalog-reproduced experiments. The badge concerns the attributable implementation contribution; it does not assert that every recent change or upstream UHDM feature was AI-written.

### Current activity review

Reviewed 2026-10-05. Local parameters now supersede wildcard-imported parameters and stale imported UHDM assignments are removed. The reviewed implementation and tests address parameter layout/elaboration correctness, without generalizing reported design outcomes. [Reviewed change](#source-activity-current).
