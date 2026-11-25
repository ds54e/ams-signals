---
name: "Open Lab Automation"
aliases: ["OLA"]
description: "Desktop measurement application for automated power and electrical bench experiments using supported instruments. Project-defined efficiency sweeps can capture oscilloscope waveforms on selected measurement conditions, reopen run recordings and estimate relative time shifts between captures using a shared signal."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for conditional multi-oscilloscope waveform capture and post-run alignment. The merged project retains the cross-correlation alignment implementation."
  sources: ["development-code","development-integration","development-retained"]
  reviewedAt: "2026-11-25"
access: "GPL-3.0; requires compatible instruments and interfaces for physical measurements."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/mede-erik/Open-Lab-Automation"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/3bde6534b97bb6ff1d00d1a584b7350b939c1357"
  - id: earlier
    title: "August oscilloscope trigger configuration implementation"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/d0e9973ca0cada74bcd2bb6b504fc885f4288fb4"
  - id: development-code
    title: "Credited conditional capture and post-run waveform alignment"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/59c7d30a7b11a25b3ba791ead9df24a12252e241"
  - id: development-integration
    title: "Canonical integration of waveform measurement and viewer changes"
    url: "https://github.com/mede-erik/Open-Lab-Automation/commit/ceb5b294d85ebae61773a30bec50b2da14e7895c"
  - id: development-retained
    title: "Retained post-run cross-correlation waveform alignment"
    url: "https://github.com/mede-erik/Open-Lab-Automation/blob/3bde6534b97bb6ff1d00d1a584b7350b939c1357/ola/wave_align.py"
---

## Scope and limits

The application implements a bench workflow for power-conversion efficiency measurements and related oscilloscope captures rather than only supplying generic instrument drivers. Control configures instrument settings, Acquisition retrieves waveforms and measurement values, Test Automation executes project-defined sweeps and capture conditions, and Analysis reopens recorded runs and calculates relative time offsets. [Canonical integration](#source-development-integration).

The alignment routine estimates a relative shift using cross-correlation of a named signal shared by two captures and rejects poor matches. Its output is not hardware trigger synchronization, calibrated skew or independent timebase correction; a common signal can have ambiguous correlation peaks. The original waveform files are preserved. [Alignment implementation](#source-development-retained).

## Reviewed maintenance

August 2026 adds library-driven oscilloscope trigger configuration. November adds conditional multi-scope acquisition and recorded-waveform alignment, with the credited change merged in the canonical project; a subsequent correction supports binary serial framing and saved VNA calibration selection. This follows an established power measurement workflow. [August change](#source-earlier) · [Credited waveform change](#source-development-code) · [Integrated waveform workflow](#source-development-integration) · [Binary serial and calibration correction](#source-activity).
