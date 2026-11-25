---
name: "OpenSIPI"
aliases: ["Open SI PI"]
summary: "Table-driven automation of SI/PI extraction and Touchstone reporting."
description: "Python workflow for table-driven PCB signal- and power-integrity extraction, generating tool scripts, launching simulations and producing Touchstone or DC-resistance reports. PDN and low-speed IO use Cadence PowerSI, high-speed IO uses Clarity, and resistance extraction uses PowerDC; the public code is orchestration rather than a replacement solver."
scope:
  simulation: { ai: false }
access: "Apache-2.0 automation source; extraction requires separately licensed Cadence Sigrity solvers. Local reporting may require wkhtmltopdf."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/rivosinc/opensipi"
    purpose: code
  - id: activity
    title: "August 1 report conversion hardening and regression integration"
    url: "https://github.com/rivosinc/opensipi/commit/3fcfe815f7fcf49ea82e358591b9c570e65f6c32"
  - id: earlier
    title: "May 1 nearby-ground-node port construction integration"
    url: "https://github.com/rivosinc/opensipi/commit/1f8f31f5704b2d85799c1c141b15bbb03d1ea8d0"
  - id: workflow
    title: "Retained integrated extraction and report entry points"
    url: "https://github.com/rivosinc/opensipi/blob/3fcfe815f7fcf49ea82e358591b9c570e65f6c32/opensipi/integrated_flows.py"
  - id: port
    title: "Retained Sigrity model and port-script generation"
    url: "https://github.com/rivosinc/opensipi/blob/3fcfe815f7fcf49ea82e358591b9c570e65f6c32/opensipi/sigrity_tools.py"
  - id: report
    title: "Retained platform orchestration and report converter"
    url: "https://github.com/rivosinc/opensipi/blob/3fcfe815f7fcf49ea82e358591b9c570e65f6c32/opensipi/sipi_infra.py"
  - id: tests
    title: "Retained integrated workflow order and failure propagation tests"
    url: "https://github.com/rivosinc/opensipi/blob/3fcfe815f7fcf49ea82e358591b9c570e65f6c32/tests/test_integrated_flows.py"
---

## Scope and limits

The public workflow implements a reproducible extraction setup and report pipeline around commercial field solvers. It takes tabular ports, extraction settings and design inputs through script generation, solver dispatch and processing of extracted results; the mock-based tests cover stage ordering and failure propagation. The local workflow has interactive setup pauses. Neither layout editing nor an independent electromagnetic solver is claimed. This is a distinct extraction-orchestration choice alongside open-source field solvers and numerical network libraries. [Workflow](#source-workflow) · [Port generation](#source-port) · [Platform](#source-report) · [Tests](#source-tests).

## Reviewed maintenance

May 2026 integrates component-relative nearby-ground-node selection into PDN port-script generation, after the established extraction workflow. August integrates new tests and corrects report conversion to invoke the executable directly with local file access and JavaScript disabled. The August report fix is retained in the platform implementation. This supports continuing technical maintenance but does not establish recent commercial solver accuracy or compatibility with every installation. No extraction or licensed EDA run was independently reproduced. [Port change](#source-earlier) · [Report correction](#source-activity) · [Retained converter](#source-report).
