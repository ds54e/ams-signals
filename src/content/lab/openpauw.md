---
name: "OpenPauw"
aliases: ["Van der Pauw"]
description: "Four-terminal sheet-resistance measurement system with a KiCad analog switching board, RP2040 firmware and Python control of a Keithley 2450 SourceMeter. Automates contact permutations, voltage acquisition, approximate Van der Pauw resistance calculation and reference-sample calibration and verification reports."
scope:
  design: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "GPL-3.0 public board, firmware and Python source; physical measurements require the switching board, supported SMU and suitable contacted samples."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical OpenPauw implementation"
    url: "https://github.com/nanosystemslab/OpenPauw"
    purpose: code
  - id: readme
    title: "Measurement architecture and hardware requirements"
    url: "https://github.com/nanosystemslab/OpenPauw/blob/563906aa9345e9c15f73874f94a6aa72f52834f5/README.md"
  - id: activity
    title: "August 7 SMU migration and calibration workflow implementation"
    url: "https://github.com/nanosystemslab/OpenPauw/commit/178a8378f8fb783db921fa65c41693dd89dda9d4"
  - id: board
    title: "Retained KiCad switching board design"
    url: "https://github.com/nanosystemslab/OpenPauw/blob/563906aa9345e9c15f73874f94a6aa72f52834f5/cad/OpenPauw.kicad_pcb"
  - id: firmware
    title: "Switch routing and disable-before-change logic"
    url: "https://github.com/nanosystemslab/OpenPauw/blob/563906aa9345e9c15f73874f94a6aa72f52834f5/firmware/src/max328_router.cpp"
  - id: measurement
    title: "Four-wire SMU acquisition and measurement procedure"
    url: "https://github.com/nanosystemslab/OpenPauw/blob/563906aa9345e9c15f73874f94a6aa72f52834f5/software/src/openpauw/measurement.py"
  - id: analysis
    title: "Sheet resistance and resistivity calculation, including approximation boundary"
    url: "https://github.com/nanosystemslab/OpenPauw/blob/563906aa9345e9c15f73874f94a6aa72f52834f5/software/src/openpauw/vdp.py"
  - id: calibration
    title: "Repeatability, accuracy, reciprocity, readback and linearity checks"
    url: "https://github.com/nanosystemslab/OpenPauw/blob/563906aa9345e9c15f73874f94a6aa72f52834f5/software/src/openpauw/calibration.py"
  - id: tests
    title: "Retained measurement orchestration tests"
    url: "https://github.com/nanosystemslab/OpenPauw/blob/563906aa9345e9c15f73874f94a6aa72f52834f5/software/tests/test_measurement.py"
---

### Scope and selection

The KiCad board and RP2040 firmware provide a reusable physical switching fixture. The host program configures a Keithley 2450 for four-wire measurement, commands the contact permutations, captures voltages and computes sheet resistance and optional resistivity. The calibration procedure evaluates a known reference sample and reports accuracy, repeatability, reciprocity, source-current readback and optional current linearity. This is a materials/process characterization workflow distinct from general-purpose instrument wrappers. [Board](#source-board) · [Firmware](#source-firmware) · [Measurement](#source-measurement) · [Calibration](#source-calibration).

The August migration replaces the bench supply and DMM pair with a single SMU and adds executable calibration and GUI operations after earlier board and firmware work. Later operator documentation is retained in raw activity without advancing the implementation checkpoint. [Implementation](#source-activity) · [Tests](#source-tests).

The sheet-resistance routine uses the symmetric Van der Pauw approximation, valid when the two measured resistance directions are similar; it does not numerically solve the general unequal-resistance equation. The calibration thresholds are implemented checks, not certified instrument accuracy or independent hardware validation. Physical calibration, contact geometry and sample assumptions remain relevant. [Analysis](#source-analysis) · [Calibration](#source-calibration).
