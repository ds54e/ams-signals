---
name: "GPSDO-PYNQ-Z2"
aliases: ["DDMTD", "Digital dual-mixer time difference"]
description: "Open-hardware front end for comparing thirteen 10 MHz frequency references and twelve 1 PPS inputs using digital dual-mixer time difference (DDMTD). KiCad fabrication data, FPGA timestamp capture, board configuration, bring-up self-tests and stability-analysis scripts form a measurement workflow. Revision A has reported bench measurements; revision B remains untested."
scope:
  design: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus is co-credited for revisions to the board generator that protect terminals during routing and add channel probe access, and for subsequent helper-clock routing corrections. The revised generator and board are retained."
  sources: [probe-routing, helper-routing, generator]
  reviewedAt: "2026-11-25"
access: "Hardware CERN-OHL-P-2.0; software MIT, with separately licensed library material. Requires a compatible fabricated front end, PYNQ-Z2, Vivado and separately obtained board support files."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical published hardware, gateware and driver"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2"
    purpose: code
  - id: activity
    title: "November 18 integration of the formerly private board development history"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/commit/74f04c2cb8b5b72eba90d5733d1012852a911ae7"
  - id: probe-routing
    title: "Imported October channel probe-access and terminal-protection implementation"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/commit/c8f7122e470de2f7e0af3af3437210d50214e800"
  - id: helper-routing
    title: "Imported October helper-clock routing correction"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/commit/4036f362a55c2fefc86319ff5930567d652602b5"
  - id: generator
    title: "Retained PCB generator"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/pcb/build_pcb.py"
  - id: board
    title: "Retained revision B fabrication layout"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/GPSDO-PYNQ-Z2.kicad_pcb"
  - id: driver
    title: "Timestamp consistency, phase conversion and unwrapping implementation"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/gateware/driver/dmtd.py"
  - id: driver-tests
    title: "Host-side timestamp and phase arithmetic regression cases"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/gateware/driver/test_driver.py"
  - id: rtl
    title: "FPGA beat and PPS timestamp capture"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/gateware/rtl/dmtd_capture.v"
  - id: floor
    title: "Reported revision A stability floor, measurement bandwidth and comparison limits"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/analysis/floor_compare/README.md"
  - id: floor-plot
    title: "Retained stability-floor plotting and table generation"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/analysis/floor_compare/floor_plot.py"
  - id: overview
    title: "Revision-specific hardware status and measurement boundaries"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/README.md"
  - id: license
    title: "Hardware, software and third-party licensing"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/LICENSE"
  - id: bringup
    title: "Retained board configuration and physical input self-test workflow"
    url: "https://github.com/gallicchio/GPSDO-PYNQ-Z2/blob/e9a8cf672b9b81e043ad0ebc21af506e4cf04257/gateware/board/bringup.py"
---

## Scope and limits

The board samples 10 MHz references with a common offset helper clock, producing low-frequency beats whose relative timing is measured by the FPGA. The driver converts helper-clock timestamp differences to wrapped phase and uses PPS observations for coarse cycle resolution under documented assumptions. This adds a multi-channel comparative frequency-reference fixture distinct from TICC's interval-counter endpoint and AllanTools' general numerical analysis. [Board](#source-board) · [Capture](#source-rtl) · [Driver](#source-driver) · [Driver tests](#source-driver-tests).

The nominal input-referred quantization step is 12.34 ps. The author reports 5.4 ps RMS for a single beat-edge difference and 0.18 ps TDEV at one second for a same-buffer revision A null measurement; these are different metrics, not a 0.18 ps instantaneous resolution or an integrated RF jitter specification. The reported Allan-deviation comparison uses 50 Hz measurement bandwidth. Cross-buffer measurements performed worse, and the GPSDO comparison curves were obtained on another instrument. Revision B changes the helper distribution and is explicitly untested. No physical measurement or generated board was independently reproduced. [Measurement floor](#source-floor) · [Plot implementation](#source-floor-plot) · [Revision status](#source-overview).

## Reviewed maintenance and provenance

The standalone repository published the design and imported its earlier September–November development history on November 18. The imported October changes show concrete follow-through from bench revision A to revised routing and channel access, including Claude-credited generator changes retained in the source. The current first-parent chain contains six November commits; imported side-history commits are not added to the monthly counts. The substantive public integration is November 18, not the earlier private commit dates or subsequent photo edits. [Import](#source-activity) · [Probe routing](#source-probe-routing) · [Helper routing](#source-helper-routing) · [Retained generator](#source-generator). [License](#source-license).

## November 28, 2026 implementation review

Control is supported by the bring-up script's Si5351 clock configuration, reference-input detection and programming retries, not by a claim that the front end disciplines every connected oscillator. Test is grounded in the executable instrument bring-up procedure: the driver checks core identity, helper-clock frequency and cycle slips, expected beat channels and PPS edge counts, with separate pass, fail and not-testable outcomes. The CLI returns nonzero for reported failures. Missing PPS observations, chatter and some unconnected channels can be skipped, so zero failures does not establish full coverage or calibrated timing accuracy. Mock-register regressions exercise these distinctions. [Bring-up](#source-bringup) · [Self-test](#source-driver) · [Driver tests](#source-driver-tests).
