---
name: "SCPI Instrument Control"
aliases: ["SCPI-Instrument-Control"]
description: "Python SCPI instrument library with vendor-dialect handling, waveform acquisition and capture metadata, desktop and web interfaces, FFT and distortion analysis. Optional report analysis lets a configured language model interpret measurements and query computed results; supported settings and physical validation vary by instrument."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: true }
access: "MIT; Python with optional VISA, GUI, gateway and report/LLM dependencies; instrument compatibility and physical validation vary by driver."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical SCPI Instrument Control implementation"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control"
    purpose: code
  - id: readme
    title: "Supported instrument workflow and validation limits"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/blob/f0fd42134c1ef30e5de9bd39b052069316e9e931/README.md"
  - id: activity
    title: "October 4 trigger-source channel warning and regression integration"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/commit/e252a04dd33d57a543f5a65280cadfbaa634a4a5"
  - id: earlier
    title: "July 15 waveform-analysis gateway implementation"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/commit/c47fd9aa1641f3b519d57fc3089e4921f5f4669e"
  - id: trigger
    title: "Retained model-aware trigger configuration"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/blob/f0fd42134c1ef30e5de9bd39b052069316e9e931/scpi_control/trigger.py"
  - id: capture
    title: "Waveform acquisition and metadata"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/blob/f0fd42134c1ef30e5de9bd39b052069316e9e931/scpi_control/waveform.py"
  - id: analysis
    title: "FFT and harmonic-distortion computation"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/blob/f0fd42134c1ef30e5de9bd39b052069316e9e931/scpi_control/analysis.py"
  - id: model-analysis
    title: "Optional LLM report interpretation and tool-backed questions"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/blob/f0fd42134c1ef30e5de9bd39b052069316e9e931/scpi_control/report_generator/llm/analyzer.py"
  - id: tests
    title: "Trigger warning regression tests"
    url: "https://github.com/little-did-I-know/SCPI-Instrument-Control/blob/f0fd42134c1ef30e5de9bd39b052069316e9e931/tests/test_trigger_coercion_warnings.py"
---

## Scope and limits

The library combines instrument identification and dialect handling with waveform acquisition, metadata persistence and analysis of captured data. It offers a reusable capture-to-analysis workflow rather than only a SCPI transport. July adds spectrum/filter/reference operations to the gateway; October adds trigger-source warnings for nonexistent model channels, with retained tests. The later root cleanup does not advance meaningful activity. [Gateway change](#source-earlier) · [Trigger implementation](#source-trigger) · [Tests](#source-tests).

Control and Acquisition are conventional. The optional report analyzer builds measurement context, invokes a configured language model to interpret results and supports tool-backed questions about reports; that specific workflow supports AI Analysis. Numerical FFT and distortion calculations do not rely on the model. [Acquisition](#source-capture) · [Numerical analysis](#source-analysis) · [Optional analyzer](#source-model-analysis).

A successful SCPI write or a warning does not establish the resulting instrument configuration; readback is separate. The README distinguishes physically exercised Siglent paths from vendor-manual and mock coverage for Tektronix and LeCroy. The upstream hardware and tests were not independently exercised. Report interpretation is not a calibrated measurement or independent compliance verdict. [Overview](#source-readme) · [Reviewed activity](#source-activity).
