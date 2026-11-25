---
name: "Qibocal"
aliases: ["Qibo calibration", "qubit calibration"]
description: "Python calibration and characterization framework for quantum hardware using Qibolab for pulse-based measurements, including resonator spectroscopy, readout classification and two-dimensional frequency/amplitude punchout sweeps. Numerical analysis extracts fitted parameters and discrimination settings, with separate calibration-update operations and structured parameter storage."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "Apache-2.0; physical experiments require a compatible Qibolab platform, instrument drivers and hardware. The supplied mock platforms and fitted models are not hardware calibration evidence."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public calibration implementation"
    url: "https://github.com/qiboteam/qibocal"
    purpose: code
  - id: activity
    title: "November 17 rectangular probe, sweep range and punchout update integration"
    url: "https://github.com/qiboteam/qibocal/commit/7f1d85c5127ba470b6a1259167c3463e26ed35d2"
  - id: earlier
    title: "July separate qubit spectroscopy model and fitting implementation"
    url: "https://github.com/qiboteam/qibocal/commit/75115c6553fa516edf67609e82be9157e78e8a7e"
  - id: spectroscopy
    title: "Retained sweep acquisition, resonance fitting and calibration update"
    url: "https://github.com/qiboteam/qibocal/blob/06764d4c1d097f35832fc23be4d819b933441570/src/qibocal/protocols/resonator_spectroscopies/resonator_spectroscopy.py"
  - id: punchout
    title: "Retained frequency-amplitude acquisition and successful-fit update"
    url: "https://github.com/qiboteam/qibocal/blob/06764d4c1d097f35832fc23be4d819b933441570/src/qibocal/protocols/resonator_spectroscopies/resonator_punchout.py"
  - id: calibration
    title: "Retained typed calibration model and JSON persistence"
    url: "https://github.com/qiboteam/qibocal/blob/06764d4c1d097f35832fc23be4d819b933441570/src/qibocal/calibration/calibration.py"
  - id: classifier
    title: "Retained single-shot classification protocol"
    url: "https://github.com/qiboteam/qibocal/blob/06764d4c1d097f35832fc23be4d819b933441570/src/qibocal/protocols/classification/classification.py"
  - id: qibolab
    title: "Related pulse execution and instrument platform"
    url: "https://github.com/qiboteam/qibolab"
---

## Scope and limits

A spectroscopy protocol specifies pulse parameters and a frequency range, executes acquisition through the Qibolab platform, fits the recorded response using a selected Lorentzian or S21 model, and exposes a separate update operation. The punchout protocol sweeps frequency and probe amplitude and can update calibration values following a successful fit. The calibration model distinguishes bare and dressed resonator frequencies, readout settings and other quantum-device parameters and persists structured data. Single-shot classification also estimates discrimination parameters from measured IQ data. These operations are conventional numerical fitting and threshold-based calibration in the reviewed default workflows, not a claim of LLM-driven calibration. [Spectroscopy](#source-spectroscopy) · [Punchout](#source-punchout) · [Calibration model](#source-calibration) · [Classification](#source-classifier).

The implemented measurement and analysis protocols are specific to quantum hardware. Their separation of acquisition, extraction and update is a reusable engineering pattern, but their physical models and pulse choices do not directly calibrate other RF devices. A successful fit flag does not establish metrological traceability or device fitness. Qibolab supplies the underlying hardware execution; its separate development history is not counted here. [Instrument platform](#source-qibolab).

## Reviewed maintenance

July 8 separates qubit spectroscopy fitting and data types from resonator spectroscopy. November 17 introduces explicit rectangular probes and range specifications for punchout experiments, including a separately stored starting amplitude rather than indiscriminately replacing other measurements. The current implementation retains the separate acquisition, fit and update paths. No physical calibration, instrument execution or upstream tests were independently reproduced. [July integration](#source-earlier) · [November integration](#source-activity).
