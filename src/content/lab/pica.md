---
name: "PICA"
aliases: ["Python Instrument Control and Automation"]
description: "Python measurement suite for electrical transport and device characterization with supported source meters, LCR meters and temperature controllers. Ready-to-run measurement modules coordinate I-V, capacitance and dielectric sweeps, temperature conditions and recorded results rather than requiring every procedure to be written from scratch."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "MIT; requires compatible instruments, VISA or other device interfaces and appropriate measurement fixtures."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://prathameshnium.github.io/PICA-Python-Instrument-Control-and-Automation/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/prathameshnium/PICA-Python-Instrument-Control-and-Automation"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/prathameshnium/PICA-Python-Instrument-Control-and-Automation/commit/407927d55574a1c4e2c24533b68b1116b34795e1"
  - id: cv-correction
    title: "October capacitance-voltage sweep correctness and tests"
    url: "https://github.com/prathameshnium/PICA-Python-Instrument-Control-and-Automation/commit/4d50be875c9a44161777b4d496486ac851ae4ff0"
  - id: time-scan
    title: "Retained continuous dielectric acquisition implementation"
    url: "https://github.com/prathameshnium/PICA-Python-Instrument-Control-and-Automation/blob/f03a3c1d64c6c52c862b74fae6d78028db8a784c/pica/keysight/Time_Scan_Dielectric_E4980A_GUI.py"
  - id: development-disclosure
    title: "Maintainer disclosure of AI development assistance"
    url: "https://github.com/prathameshnium/PICA-Python-Instrument-Control-and-Automation/blob/f03a3c1d64c6c52c862b74fae6d78028db8a784c/CONTRIBUTING.md#use-of-generative-ai"
---

## Scope and limits

PICA supplies concrete electrical and temperature-dependent measurement procedures beyond a general-purpose instrument-driver collection. The reviewed dielectric time scan repeatedly sets frequency, settles, triggers, reads instrument responses and records each point. Its timestamp is taken after readback, not at an independently verified hardware acquisition instant. Temperature data for that particular module are supplied separately. [Time-scan implementation](#source-time-scan).

## Reviewed maintenance

October 2026 corrects skipped small C-V bias steps, adds millivolt-grid validation and tests the resulting instrument writes with a fake device. November introduces a continuous E4980A dielectric scan and corresponding recorded data. These are source-level changes; reviewed main-branch operations are not necessarily in the latest packaged release. [C-V correction](#source-cv-correction) · [Time-scan addition](#source-activity).

The maintainer documents use of Gemini and Claude Code for code and tests, but the reviewed disclosure does not identify a specific retained implementation change attributable to either tool. No development badge is assigned on that evidence alone. [Development disclosure](#source-development-disclosure).
