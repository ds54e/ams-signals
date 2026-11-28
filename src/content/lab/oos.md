---
name: "OOS"
aliases: ["Rigol DHO800 DHO900 open operating system"]
description: "Experimental replacement oscilloscope software for Rigol DHO800/DHO900 instruments, with Linux and a Rust scope application for acquisition, triggering, waveform analysis and remote control. It includes eye and jitter analysis and saved waveform references; measurements are not calibrated to any standard."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for separating hardware trigger settings from demo presets and adding executable setting-interaction regressions. The reviewed tree retains these regressions."
  sources: ["development-code","development-retained"]
  reviewedAt: "2026-11-25"
access: "GPL-2.0-or-later; third-party components retain their terms. Experimental, uncalibrated software requires compatible scope hardware and existing vendor calibration/FPGA resources."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/dekajoule/oos"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/dekajoule/oos/commit/6c82c64f5a6ecf68004193b0c97e1c4c91fc1f79"
  - id: overview
    title: "Reviewed hardware status, features and experimental-use disclaimer"
    url: "https://github.com/dekajoule/oos/blob/fdf8833594292d121eba3ff032c13aaec203e6ca/README.md"
  - id: development-code
    title: "Credited trigger-setting independence correction and tests"
    url: "https://github.com/dekajoule/oos/commit/22a8925d9c8dcb6ac36b19205679402ad932dcc2"
  - id: development-retained
    title: "Retained executable trigger-setting interaction regressions"
    url: "https://github.com/dekajoule/oos/blob/fdf8833594292d121eba3ff032c13aaec203e6ca/ui/src/ui/interplay_tests.rs"
  - id: waveform-reference
    title: "Integrated saved-waveform reference workflow"
    url: "https://github.com/dekajoule/oos/commit/2d6664fd43ef03c7baa184fbcff75f72b0ba1723"
  - id: deep-record-fix
    title: "November 27 acquisition record-preservation correction"
    url: "https://github.com/dekajoule/oos/commit/7fac4ad18f3edd05b0546d7577de38002615b5c9"
  - id: deep-record-retained
    title: "Retained acquisition stop and replay planning"
    url: "https://github.com/dekajoule/oos/blob/4564adfb8bf51fb288f390448f72c1113806fc87/ui/src/board/dho/hw/plan.rs"
  - id: deep-record-evidence
    title: "Reported instrument checks and record-retention limits"
    url: "https://github.com/dekajoule/oos/blob/4564adfb8bf51fb288f390448f72c1113806fc87/docs/fork/stop-exact.md"
  - id: release-023
    title: "November 27 v0.2.3 release"
    url: "https://github.com/dekajoule/oos/releases/tag/v0.2.3"
  - id: related-openscilab
    title: "Separate external instrument and measurement-flow application"
    url: "https://github.com/dekajoule/openSciLab/blob/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec/README.md"
---

## Scope and limits

OOS replaces instrument-side software rather than operating a stock instrument through a host application. Its implemented waveform, trigger and remote-control paths support Control and Acquisition. Saved waveform reference processing and eye/jitter algorithms support Analysis; an MCP interface alone is not evidence of model-driven analysis or control. It is not a source of new oscilloscope board manufacturing files. [Overview](#source-overview) · [Saved waveform references](#source-waveform-reference).

The reviewed README explicitly warns that measurements are not calibrated to a standard and that changing the instrument software can damage hardware or lose data. It reports specific hardware trials and unverified features separately. Do not interpret the analysis algorithms or regression tests as calibrated jitter or phase-noise results, or use the software for safety, compliance or commercial measurements. [Hardware status and disclaimer](#source-overview).

## Reviewed maintenance

The November 14 correction separates real hardware settings from trigger demonstration presets and adds interaction regressions following a reported issue. November 23 bounds clock recovery and TIE trend processing after a reported on-unit memory failure, with regression code. These are corrections following the early releases and external feedback, not just initial features or commit volume. The entire reviewed public repository history is from November 2026, so sustained maintenance over longer periods remains unestablished. [Trigger correction](#source-development-code) · [Retained regressions](#source-development-retained) · [Clock recovery correction](#source-activity).

## November 28, 2026 implementation review

The November 27 acquisition correction disables advance arming when a live view reads only part of the stored record, and gives an in-progress deep capture additional completion time on STOP. The retained code avoids overwriting the record needed for later zoomed views. The maintainer reports that the DHO924S test recovered whole records at 10 M, 50 M and 125 M samples in twelve of twelve runs; those are reported observations, not independently verified timing or accuracy. This work follows earlier user-reported problems and is released as v0.2.3. The reviewed source is newer than the captured activity snapshot; its raw counts and checkpoint require a separate recapture. OOS and openSciLab remain separate instrument-side and host-side workflows. [Correction](#source-deep-record-fix) · [Retained code](#source-deep-record-retained) · [Reported tests](#source-deep-record-evidence) · [Release](#source-release-023) · [Related host application](#source-related-openscilab).
