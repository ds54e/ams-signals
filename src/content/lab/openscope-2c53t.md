---
name: "OpenScope 2C53T"
aliases: ["OpenScope-2C53T","FNIRSI 2C53T"]
description: "Replacement firmware for the FNIRSI 2C53T handheld instrument, with hardware FPGA capture, trigger and scope display paths, waveform frequency estimation, FFT and mask testing. Author-reported bench validation covers limited hardware and calibration ranges; the firmware is developmental, not a qualified measurement instrument."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is co-credited on the November 27 integration repairing the FFT-bin frequency estimator freeze. The retained source converts the DC bin to power and host tests exercise flat-input records."
  sources: ["activity","frequency","frequency-tests"]
  reviewedAt: "2026-11-28"
access: "Public GPL-3.0 development firmware for the FNIRSI 2C53T only; physical use requires compatible hardware and preservation of factory calibration."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical OpenScope firmware"
    url: "https://github.com/DavidClawson/OpenScope-2C53T"
    purpose: code
  - id: readme
    title: "Hardware-specific status and calibration boundaries"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/blob/e5fdee06679deaed0de69b648381786263055cce/README.md"
  - id: activity
    title: "November 27 flat-input frequency estimator freeze repair"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/commit/e5fdee06679deaed0de69b648381786263055cce"
  - id: earlier
    title: "October 6 capture policy and FPGA handover instrumentation"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/commit/a8b27d20b3ca968199bfe01423858495f9853933"
  - id: capture
    title: "Retained FPGA communication and acquisition driver"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/blob/e5fdee06679deaed0de69b648381786263055cce/firmware/src/drivers/fpga.c"
  - id: frequency
    title: "Frequency-estimation implementation"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/blob/e5fdee06679deaed0de69b648381786263055cce/firmware/src/ui/scope_freq.c"
  - id: frequency-tests
    title: "Host regression tests including bench-derived records"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/blob/e5fdee06679deaed0de69b648381786263055cce/firmware/tests/test_scope_freq.c"
  - id: fft
    title: "Live capture FFT implementation"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/blob/e5fdee06679deaed0de69b648381786263055cce/firmware/src/dsp/fft_live.c"
  - id: mask
    title: "Waveform mask pass/fail implementation"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/blob/e5fdee06679deaed0de69b648381786263055cce/firmware/src/dsp/mask_pf.c"
  - id: mask-tests
    title: "Host waveform mask tests"
    url: "https://github.com/DavidClawson/OpenScope-2C53T/blob/e5fdee06679deaed0de69b648381786263055cce/firmware/tests/test_mask_pf.c"
---

## Scope and limits

The firmware configures the instrument's FPGA and acquires actual ADC records, rather than wrapping a stock SCPI instrument or only displaying files. Trigger/capture behavior and waveform estimation support Control, Acquisition and Analysis; the mask operation implements a restricted waveform test. The October capture-policy correction followed earlier hardware bring-up. The November frequency-estimator repair addresses a display hang from a non-finite interpolation result on flat inputs; retained host regressions exercise recorded and synthetic inputs. [Acquisition](#source-capture) · [October change](#source-earlier) · [Frequency](#source-frequency) · [Tests](#source-frequency-tests) · [FFT](#source-fft) · [Mask](#source-mask).

The README explicitly limits bench validation, timebase coverage and vertical calibration, and warns that this development firmware should not be relied on for real measurements. The factory calibration must be preserved; the firmware is not intended for other FNIRSI models. No independent hardware or host execution was performed here. [Hardware limits](#source-readme) · [Mask tests](#source-mask-tests). The credited executable correction and tests support AI-ASSISTED development, not runtime model-driven measurement. [Integrated repair](#source-activity).
