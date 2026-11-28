---
name: "Testomatic Runner"
aliases: ["Testomatic PCB test jig runner"]
description: "Python runner for executable PCB manufacturing test suites. It loads JSON or packaged ZIP definitions, invokes fixture I/O and firmware-programming steps, applies measurement limits, reports step verdicts and supports abort-on-failure behavior for compatible Testomatic test modules."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "MIT runner source; requires compatible Testomatic fixture hardware, testomatic-io and any selected external programming tools."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/SuperHouse/testomatic-runner"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/SuperHouse/testomatic-runner/commit/e98731d58c82d919d52e6fd01672ace5bbc122e2"
  - id: earlier
    title: "September executable firmware-upload steps"
    url: "https://github.com/SuperHouse/testomatic-runner/commit/740ce0a5551045055e1f86e833f9b5f6b881e165"
  - id: runner
    title: "Retained step dispatch and verdict handling"
    url: "https://github.com/SuperHouse/testomatic-runner/blob/a45170a754cc2a04f9071649acfc11b1911abbf9/testomatic/runner.py"
  - id: fixture
    title: "Related Testomatic physical fixture design"
    url: "https://github.com/SuperHouse/Testomatic"
  - id: related-fixate-switching
    title: "Fixate virtual multiplexer and relay-matrix implementation"
    url: "https://github.com/PyFixate/Fixate/blob/657713fd5e7b0c416ad8c3293a4e8e1e3114823f/src/fixate/_switching.py"
---

## Scope and limits

Testomatic Runner executes packaged PCB test definitions on compatible fixture modules. It dispatches steps, propagates failures, supports abort-on-failure and provides a per-run report. Unlike a generic instrument API, it provides a concrete manufacturing test execution workflow. The fixture PCB and chassis are maintained in the related Testomatic project, and their history is not counted as runner activity. This is a PCB functional-test system, not a semiconductor ATE implementation; supported measurements and programming paths depend on the configured hardware. [Runner](#source-runner) · [Fixture project](#source-fixture).

## Reviewed maintenance

After extraction into its separate repository in August 2026, September adds executable firmware-upload steps in place of stubs. November replaces the LED spectral-reading stub that always passed with sensor acquisition, per-channel limit checking and tests for failures and interface errors. The change remains in the current runner source and provides concrete evidence of follow-through after the initial release. [Firmware steps](#source-earlier) · [Sensor verdict implementation](#source-activity).

## Selection boundary

The runner dispatches parsed suite steps and records their outcomes using the Testomatic execution context. Fixate separately exposes a reusable signal-to-pin switching abstraction for fixture programs. The packaged-suite execution path remains independently useful; it does not imply that Testomatic implements the Fixate routing model. [Runner](#source-runner) · [Fixate switching](#source-related-fixate-switching).
