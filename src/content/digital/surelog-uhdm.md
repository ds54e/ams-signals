---
name: "Surelog + UHDM"
aliases: []
description: "SystemVerilog preprocessing, parsing and elaboration stack that exports UHDM design models. Serialized models and VPI access let downstream synthesis, simulation, lint and formal tools consume a shared representation without implementing their own complete SystemVerilog frontend."
scope:
  design:
    ai: false
  aiDevelopment: assisted
developmentEvidence:
  summary: "Integrated September changes explicitly credit Claude Code across a frontend-correctness campaign: preprocessing, instance parameter resolution and multidimensional default-pattern expansion. The attribution concerns these improvements to the existing Surelog/UHDM stack."
  sources: ["development-preprocessor", "development-parameters", "development-arrays"]
  reviewedAt: "2026-10-01"
access: "Public source implementation; tool and environment requirements are documented by the project."
addedAt: "2026-09-05"
reviewedAt: "2026-11-15"
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
  - id: "review-20261011-1"
    title: "Reviewed implementation integration"
    url: "https://github.com/chipsalliance/Surelog/commit/6db44ea2048c8ab9c702e389c2897f7e2318ccc5"
  - id: "activity-review-20261115"
    title: "Preserve signed implicit-type subroutine port ranges"
    url: "https://github.com/chipsalliance/Surelog/commit/00bdd1d1925ac7565f422be77c07e5667c99aae8"
  - id: "implementation-review-20261115"
    title: "Retained subroutine-port and case-pattern compilation"
    url: "https://github.com/chipsalliance/Surelog/blob/00bdd1d1925ac7565f422be77c07e5667c99aae8/src/DesignCompile/CompileStmt.cpp"
  - id: "tests-review-20261115"
    title: "Signed packed-range and scalar subroutine-port regression input"
    url: "https://github.com/chipsalliance/Surelog/blob/00bdd1d1925ac7565f422be77c07e5667c99aae8/tests/TfPortSignedImplicit/dut.sv"
  - id: "test-config-review-20261115"
    title: "Regression requests AST and elaborated UHDM output"
    url: "https://github.com/chipsalliance/Surelog/blob/00bdd1d1925ac7565f422be77c07e5667c99aae8/tests/TfPortSignedImplicit/TfPortSignedImplicit.sl"
  - id: "patterns-review-20261115"
    title: "Integrated tagged-union and guarded-pattern representation"
    url: "https://github.com/chipsalliance/Surelog/commit/67a4dc5b6de903fd8b65ae47ef7dcc4d61699de5"
  - id: "pattern-tests-review-20261115"
    title: "Tagged-union matches, guards and pattern-variable regression input"
    url: "https://github.com/chipsalliance/Surelog/blob/00bdd1d1925ac7565f422be77c07e5667c99aae8/tests/TaggedUnionMatches/dut.sv"
  - id: "release-review-20261115"
    title: "Published Surelog v1.87 release"
    url: "https://github.com/chipsalliance/Surelog/releases/tag/v1.87"
---

### Implementation and scope

Preprocessing, parsing, elaboration, serialized UHDM models and public design-model APIs supply conventional Design infrastructure. Separate synthesis, simulation and formal consumers do not make those complete downstream operations part of this frontend. Only Surelog history supplies monthly activity; UHDM counts are not added. [Frontend uses and APIs](#source-readme); [UHDM project](#source-uhdm).

### Reviewed activity

The September 29 change preserves packed dimensions when evaluating anonymous logic/bit/reg types through $bits, with scalar, typedef and multidimensional regression cases. This corrects elaborated widths rather than only updating a dependency or documentation. [Reviewed change](#source-activity-refresh); [current expression implementation](#source-implementation).

### Development provenance review

Reviewed 2026-10-01: **AI-ASSISTED**. A cross-cutting September frontend-correctness campaign explicitly credits Claude Code in integrated implementation changes. Reviewed diffs modify preprocessing grammar and macro/include handling, preserve instance-specific complex parameter overrides, and recursively expand multidimensional parameter defaults with corresponding UHDM integration and regression fixtures. These paths remain present in the reviewed head. These retained executable corrections support AI-assisted development, independently of runtime AI. [Preprocessing changes](#source-development-preprocessor); [parameter resolution](#source-development-parameters); [array-default implementation](#source-development-arrays).

Reported Caliptra, CVA6 and regression outcomes are upstream evidence, not catalog-reproduced experiments. The badge concerns the attributable implementation contribution; it does not assert that every recent change or upstream UHDM feature was AI-written.

### Current implementation and operating boundaries

The reviewed elaboration changes resolve cross-file $unit constants, packed widths on grouped typed ports and non-ANSI function initializers. Matching cases establish targeted frontend corrections, not complete SystemVerilog compatibility. [Reviewed implementation integration](#source-review-20261011-1)

The review preserves existing Scope and development-provenance classifications. Source and regression evidence was inspected; external EDA/model/conformance experiments were not rerun.

### Current development and release boundary

The November 14 default-branch repair preserves the packed range and signedness of non-ANSI subroutine ports such as `input signed [7:0] a`, and represents `input signed b` as a signed scalar. Previously, the leading signing keyword bypassed typespec construction. The matching input and checked-in expected UHDM output cover the two declarations; the regression configuration requests parsing, AST output and UHDM elaboration, rather than downstream simulation. This retained repair is the meaningful first-parent checkpoint at `00bdd1d1925ac7565f422be77c07e5667c99aae8`. [Integrated repair and expected output](#source-activity-review-20261115) · [Retained implementation](#source-implementation-review-20261115) · [Regression input](#source-tests-review-20261115) · [Test configuration](#source-test-config-review-20261115).

The November 13 integration also represents tagged unions, wildcard/named patterns and guarded matches in UHDM, retaining conditional branches and case-pattern items that were previously dropped. Its fixture covers conditional, if and case matches with `&&&` guards and pattern variables. This is frontend representation work for consumers, not evidence that Surelog itself simulates or synthesizes these constructs. [Integrated representation changes](#source-patterns-review-20261115) · [Retained regression input](#source-pattern-tests-review-20261115).

The latest published release reviewed is v1.87 from August 24; these November master changes are not attributed to it. Conventional Design and the existing AI-ASSISTED provenance are retained, without attributing these new changes to AI or adding UHDM repository counts. Source, expected outputs and release metadata were inspected without executing upstream code or reproducing conformance results. [Published release](#source-release-review-20261115).
