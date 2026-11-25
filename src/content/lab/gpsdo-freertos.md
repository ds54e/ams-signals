---
name: "GPSDO_FreeRTOS"
aliases: ["STM32 GPSDO", "OCXO holdover", "oscillator aging compensation"]
description: "STM32/FreeRTOS firmware for disciplining a 10 MHz OCXO against GNSS PPS, with frequency acquisition, configurable feedback algorithms and control-voltage calibration. Its holdover implementation estimates aging and environmental terms from locked control-code observations and compares predicted steering with a frozen-code baseline."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "The initial frequency-processing source credits Claude (Anthropic) and implements ring-buffer frequency averages and measurement snapshots. The corresponding measurement-processing implementation remains in the current firmware, with additional AI assistants credited in its source header."
  sources: [initial, frequency]
  reviewedAt: "2026-11-25"
access: "Public firmware source; no explicit repository-wide license was identified in the reviewed tree. Requires compatible STM32, oscillator, GNSS receiver and configured measurement and steering hardware."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public firmware and project documentation"
    url: "https://github.com/jmnlabs/GPSDO_FreeRTOS"
    purpose: code
  - id: activity
    title: "November 24 v1.10 integration of the learned holdover model"
    url: "https://github.com/jmnlabs/GPSDO_FreeRTOS/commit/d2908aad8da8e01fdecf6e76456076ff96bc7e6b"
  - id: initial
    title: "June initial Claude-credited frequency processing implementation"
    url: "https://github.com/jmnlabs/GPSDO_FreeRTOS/commit/60f0adf5bb007936fe594ca1f8b0bec1a6945362"
  - id: frequency
    title: "Retained PPS frequency measurement and averaging implementation"
    url: "https://github.com/jmnlabs/GPSDO_FreeRTOS/blob/d2908aad8da8e01fdecf6e76456076ff96bc7e6b/GPSDO_FreeRTOS/gpsdo_freq.cpp"
  - id: holdover
    title: "Retained weighted regression and virtual holdover comparison"
    url: "https://github.com/jmnlabs/GPSDO_FreeRTOS/blob/d2908aad8da8e01fdecf6e76456076ff96bc7e6b/GPSDO_FreeRTOS/gpsdo_holdmodel_core.cpp"
---

## Scope and limits

Frequency acquisition processes PPS capture events and maintains moving frequency averages. The autonomous steering workflow is distinct from the multi-reference measurement front end of GPSDO-PYNQ-Z2 and from the timing-card daemon oscillatord: it is an embedded OCXO controller with a board-specific calibration and holdover estimator. The code does not establish a PCB fabrication workflow or a general production trim tool. [Frequency acquisition](#source-frequency) · [Project overview](#source-code).

The holdover core fits an exponentially weighted linear model of the oscillator control code against elapsed time, lagged pressure and a second lagged input (temperature or oven current). It integrates the error of virtual holdovers against subsequent locked codes at 2, 6, 12 and 24 hours; the default steering mode uses the model only after its virtual comparisons outperform the frozen-code baseline. The maintainer reports a replay of a 95-hour log yielding 0.87 microseconds RMS versus 2.09 microseconds for frozen code at 24 hours. These are board-specific replay estimates, not independently reproduced physical GNSS-outage measurements, intrinsic oscillator aging specifications or an RF jitter result. The coefficients depend on the oscillator, sensors, control gain and environmental excitation. [Holdover implementation](#source-holdover) · [Reported replay](#source-code).

## Reviewed maintenance and provenance

The June initial upload contains executable Claude-credited PPS frequency processing, ring-buffer averaging and measurement snapshots; the current file retains these operations. The November release adds the independent holdover regression core and embedded integration after several public firmware releases. The maintainer declares a feature freeze from v1.10 with subsequent bug fixes and measurement-driven tuning planned; that declaration is not evidence of future activity. The numerical estimator is conventional weighted least squares, not runtime AI. [Initial implementation](#source-initial) · [Retained frequency code](#source-frequency) · [November integration](#source-activity).
