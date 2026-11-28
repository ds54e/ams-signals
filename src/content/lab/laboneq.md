---
name: "LabOne Q"
aliases: ["Zurich Instruments LabOne Q", "LabOne Q Automation"]
description: "Pulse experiment programming, compilation and execution framework for Zurich Instruments hardware, with acquired result assembly and numerical fitting utilities. The Automation framework models experiments as dependency graphs, executes configurable layers and nodes, tracks outcomes, and supports parameter persistence and reruns of dependent nodes."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "Apache-2.0 public source; instrument execution requires a compatible Zurich Instruments setup and LabOne software. Device capabilities and measurement accuracy depend on the installed hardware and calibration."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/zhinst/laboneq"
    purpose: code
  - id: activity
    title: "November 6 release with acquired result chunk handling correction"
    url: "https://github.com/zhinst/laboneq/commit/92ea1d61a1cea92fb8d874ebd061e126ed9b4ed0"
  - id: automation-release
    title: "April automation graph, layer and parameter handling integration"
    url: "https://github.com/zhinst/laboneq/commit/81014a6e8fe8fd4eb14ab599eb814131608a66d2"
  - id: automation
    title: "Retained dependency graph execution and parameter persistence"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/automation/automation.py"
  - id: layers
    title: "Retained per-node layer execution and outcome handling"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/automation/layer.py"
  - id: run-experiment
    title: "Retained workflow experiment execution task"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/workflow/tasks/run_experiment.py"
  - id: result-builder
    title: "Retained acquired-data result assembly"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/controller/results.py"
  - id: fitting
    title: "Retained numerical analysis and fitting utilities"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/analysis/fitting.py"
  - id: beta-implementation
    title: "November 20 integration of LabOne Q 27.1.0 beta 1"
    url: "https://github.com/zhinst/laboneq/commit/289b184d24d183cc08c7c2127ab1a823c568981c"
  - id: beta-release-notes
    title: "Retained 27.1.0b1 release notes"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/CHANGELOG.md"
  - id: round-robin
    title: "Retained client-queue round-robin worker"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/controller/round_robin_worker.py"
  - id: near-time
    title: "Retained near-time callback error handling"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/controller/near_time_runner.py"
  - id: raw-results
    title: "Retained raw sampling-rate metadata and execution error fields"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/src/python/laboneq/data/experiment_results/__init__.py"
  - id: emulated-rabi
    title: "Emulated heterogeneous-control Rabi tune-up example"
    url: "https://github.com/zhinst/laboneq/blob/289b184d24d183cc08c7c2127ab1a823c568981c/examples/09_heterogeneous_control_system/00_bayesian_rabi_tuneup_emulation.ipynb"
---

## Scope and limits

LabOne Q programs timed pulses and acquisitions for compatible devices, runs experiments and assembles acquired data into result shapes. Its separate Automation implementation constructs layer and node graphs with directed dependencies, records failures, supports custom execution and decision logic, and can deactivate descendants after failure or traverse a selected node's descendants in topological order for reruns. Parameters can be loaded and saved to files. This is an implemented graph-based workflow distinct from the lower-level node and instrument module controls in zhinst-toolkit. The graph and numerical fitting utilities are not evidence of autonomous LLM decision-making. [Workflow execution](#source-run-experiment) · [Result assembly](#source-result-builder) · [Fitting utilities](#source-fitting) · [Automation graph](#source-automation) · [Layer execution](#source-layers).

The workflow can encode calibration dependencies; it does not guarantee that a particular user's dependency model, pass criteria or validity policy is correct. No claim is made that time-validity metadata automatically schedules recalibration. Hardware timing, synchronization and measurement accuracy require separate validation.

## Reviewed maintenance

The April 29 release revises graph and layer execution, grouped node keys and parameter management. The November 6 release corrects acquired result handling for a handle without a chunked axis or a single-chunk result; the branch remains in the reviewed result builder. The November 20 beta adds substantive controller and acquisition-result changes, as described below; these are source-level beta capabilities rather than stable-release claims. No hardware execution, compiled timing or upstream test results were independently reproduced. [April automation change](#source-automation-release) · [November result correction](#source-activity).

## November 28, 2026 implementation review

The November 20 source integration of 27.1.0b1 implements per-client round-robin experiment queues while still executing one experiment at a time. It records errors from some individual near-time steps and retains other results, while errors before instrument submission can still stop the run. Raw acquired results now expose sampling-rate metadata. These substantive changes advance the reviewed implementation checkpoint; they do not establish physical concurrency, timing or acquisition accuracy. The new Bayesian Rabi tune-up notebook emulates the instrument and coprocessor: its placeholder estimator selects a predetermined amplitude sequence independently of measured values and never applies waveform updates in emulation. It demonstrates the streaming interface rather than an implemented Bayesian calibration algorithm; the existing conventional Scope attributes are unchanged. [Beta source](#source-beta-implementation) · [Release notes](#source-beta-release-notes) · [Queue worker](#source-round-robin) · [Callback errors](#source-near-time) · [Results](#source-raw-results) · [Emulated example](#source-emulated-rabi).
