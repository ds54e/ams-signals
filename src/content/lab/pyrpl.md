---
name: "PyRPL"
aliases: ["Python Red Pitaya Lockbox"]
description: "Python-controlled Red Pitaya FPGA instruments for spectrum and transfer-function measurement, IQ demodulation, and feedback control. Baseband acquisition supports a two-channel cross-spectrum, and programmable PID and IIR modules support frequency-control experiments; measurement bandwidth and noise limits depend on the hardware and selected configuration."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "Public source; repository LICENSE is MIT, while some retained source headers state GPL-3.0-or-later. Requires compatible Red Pitaya hardware; review per-file terms before reuse."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/pyrpl-fpga/pyrpl"
    purpose: code
  - id: activity
    title: "November 6 spectrum, network analyzer and scope improvements"
    url: "https://github.com/pyrpl-fpga/pyrpl/commit/19ba082a10d42c901ade5f47d6e65281d1c2eb94"
  - id: iir-fix
    title: "September 12 IIR coefficient calculation correction"
    url: "https://github.com/pyrpl-fpga/pyrpl/commit/94954a88c7c97713f63aff1a617d817ddafe6420"
  - id: spectrum
    title: "Retained spectrum, cross-spectrum and noise-bandwidth calculations"
    url: "https://github.com/pyrpl-fpga/pyrpl/blob/68e700ee39f2f1b442f295fc60dc360cd771d7b6/pyrpl/software_modules/spectrum_analyzer.py"
  - id: network
    title: "Retained IQ-based transfer-function acquisition"
    url: "https://github.com/pyrpl-fpga/pyrpl/blob/68e700ee39f2f1b442f295fc60dc360cd771d7b6/pyrpl/software_modules/network_analyzer.py"
  - id: iir-tests
    title: "Retained coefficient and fixed-point regression tests"
    url: "https://github.com/pyrpl-fpga/pyrpl/blob/68e700ee39f2f1b442f295fc60dc360cd771d7b6/pyrpl/test/test_iir_theory.py"
  - id: spectrum-tests
    title: "Retained spectrum and cross-spectrum measurement regression source"
    url: "https://github.com/pyrpl-fpga/pyrpl/blob/68e700ee39f2f1b442f295fc60dc360cd771d7b6/pyrpl/test/test_spectrum_analyzer.py"
  - id: license
    title: "Repository license text"
    url: "https://github.com/pyrpl-fpga/pyrpl/blob/68e700ee39f2f1b442f295fc60dc360cd771d7b6/LICENSE"
---

## Scope and limits

The instrument modules control FPGA acquisition and signal processing, with a baseband cross-spectrum calculated from two acquired traces and a separate IQ-centered spectrum path. The network analyzer measures a configured transfer function; the IIR and PID modules provide programmable feedback. These are distinct from the general Red Pitaya software stack: PyRPL supplies a user-facing DSP instrument and feedback workflow. The cross-spectrum is not by itself a calibrated cross-correlation phase-noise measurement system, and the code does not establish a noise floor or oscillator jitter accuracy. Spectrum processing embedded in live acquisition is not counted as a separate offline analysis stage. [Spectrum](#source-spectrum) · [Transfer function](#source-network).

## Reviewed maintenance

September corrects IIR coefficient calculations and retains numerical and fixed-point tests. November integrates scope, spectrum and network-analyzer improvements including spectrum widget regressions. The later version update supplies the raw latest date; the integrated feature and test changes are the substantive checkpoint. The root license states MIT but the reviewed spectrum and IIR source headers retain GPL language, so the listing does not infer uniform permissive licensing. No FPGA bitstream, hardware measurement or regression was independently run. [Coefficient correction](#source-iir-fix) · [IIR tests](#source-iir-tests) · [November integration](#source-activity) · [Spectrum tests](#source-spectrum-tests) · [Repository license](#source-license).
