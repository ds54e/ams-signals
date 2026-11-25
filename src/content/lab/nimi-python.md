---
name: "nimi-python"
aliases: ["NI Modular Instrument Python APIs","NI-Digital","NI-DCPower","NI-TClk"]
description: "Generated Python interfaces to NI modular instrument drivers, including digital pattern instruments, DC power, DMMs, oscilloscopes, RF instruments and timing synchronization. NI-Digital exposes pin maps, timeset edges, pattern bursts, capture waveforms and per-pin parametric measurement operations through native driver sessions."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Copilot is co-credited for extending the session context-manager code generator to accept multiple context-manager definitions. The reviewed tree retains the metadata normalization and generator helper."
  sources: ["activity","context-generator","context-metadata"]
  reviewedAt: "2026-11-25"
access: "MIT source license; requires the corresponding NI native instrument drivers and compatible devices for physical measurements. Driver simulation does not implement a transistor-level DUT or validate instrument accuracy."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/ni/nimi-python"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/ni/nimi-python/commit/2f19618c21dc34e70a39a4b186ee664e3c8d8cad"
  - id: earlier
    title: "July native-session error description correction"
    url: "https://github.com/ni/nimi-python/commit/6511f8025f072f7f7021953888b916bbdc31aa2a"
  - id: digital-session
    title: "Retained digital pattern and PPMU session API"
    url: "https://github.com/ni/nimi-python/blob/56d2479f12043923eb29201a1d6dd975264f2aa8/generated/nidigital/nidigital/session.py"
  - id: context-generator
    title: "Retained context-manager code generation helper"
    url: "https://github.com/ni/nimi-python/blob/56d2479f12043923eb29201a1d6dd975264f2aa8/build/helper/codegen_helper.py"
  - id: context-metadata
    title: "Retained metadata normalization for context managers"
    url: "https://github.com/ni/nimi-python/blob/56d2479f12043923eb29201a1d6dd975264f2aa8/build/helper/metadata_filters.py"
  - id: scope-filter-example
    title: "November 20 NI-SCOPE filtering and FFT measurement example"
    url: "https://github.com/ni/nimi-python/commit/423df7f2e4014e38f6d1c9160b538a71fb5f3f7a"
  - id: scope-filter-retained
    title: "Retained acquisition and array-measurement example"
    url: "https://github.com/ni/nimi-python/blob/56d2479f12043923eb29201a1d6dd975264f2aa8/src/niscope/examples/niscope_digital_filtering.py"
---

## Scope and limits

This repository generates modular instrument bindings rather than the pin/site-aware TestStand-oriented abstraction supplied by the separate NI Semiconductor Test Library. The generated digital session supports pin-map loading, configurable timeset edges, pattern bursts, capture-waveform retrieval and PPMU source/measure operations. It is a usable instrument-control and acquisition interface for Python workflows; it does not implement an independent ATE test-flow runner or an electrical model of the tester. [Digital session](#source-digital-session).

The native NI drivers remain a separate requirement even when using supported simulated sessions. A simulated driver call is not evidence of physical pin behavior, comparator accuracy, load response or device-model fidelity.

## Reviewed maintenance

July 2026 corrects session error-description handling across generated modular-instrument drivers, avoiding mismatched queued errors. November extends the generator for multiple session context managers and adds tests. Copilot is co-credited for this implementation, and the reviewed source retains the generator and metadata helpers. This is evidence of development assistance, not runtime AI control. [Session correction](#source-earlier) · [Credited implementation](#source-activity) · [Retained generator](#source-context-generator) · [Retained metadata](#source-context-metadata).

## Reviewed implementation and retention, November 25, 2026

November 20 adds a runnable NI-SCOPE example configuring FIR or IIR processing, acquiring a filtered waveform and retrieving FFT amplitude measurements through the native driver. The example configures measurement units, filter parameters and per-acquisition processing. This is a reusable acquisition and measurement demonstration using existing NI-SCOPE operations, not an independent Python signal-processing engine or proof of instrument accuracy. [Example integration](#source-scope-filter-example) · [Retained example](#source-scope-filter-retained).

The selected meaningful checkpoint in the saved capture is 2026-11-20 UTC. Source inspection only; no physical test, regression or instrument run was independently reproduced.
