---
name: "stat-sim"
aliases: ["hot-spot","hotspot"]
summary: "Generates variability-aware behavioral models and screens interconnect electromigration from extracted geometry and simulated currents."
description: "Mixed-signal behavioral-model generation and interconnect electromigration screening. Its hot-spot flow instruments distributed SPEF parasitics, evaluates average, RMS and peak segment currents with SPICE and reports current-limit violations using geometry and PDK rules; the bundled SKY130 limits are estimates, not foundry signoff data."
scope: {"simulation":{"ai":false},"layout":{"ai":false},"aiDevelopment":"assisted"}
developmentEvidence: {"summary":"Claude Opus 4.8 is co-credited for implementing the hot-spot SPEF instrumentation and current-density checks. The retained hotspot.py includes the credited screening path.","sources":["em-integration","hotspot"],"reviewedAt":"2026-11-25"}
access: "Public source under PolyForm Noncommercial 1.0.0 for the reviewed core; commercial use requires separate terms. The EM flow uses extracted geometry and current limits; live simulation uses bfit drivers and ngspice or Xyce, with an optional Verilog-A path."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/kev-cam/stat-sim"
    purpose: code
  - id: activity
    title: "November 25 integration of RF behavioral frontend and timing changes"
    url: "https://github.com/kev-cam/stat-sim/commit/d6545dd08ba045c135174f2daa65c17946a96878"
  - id: em-integration
    title: "July 11 credited implementation of SPEF electromigration screening"
    url: "https://github.com/kev-cam/stat-sim/commit/fb6e95252e16e5ec43a1367d47236253e4c51e7f"
  - id: lef-integration
    title: "July 11 PDK LEF current-limit import and provenance correction"
    url: "https://github.com/kev-cam/stat-sim/commit/79356ad6b62787cae3ce85f0ded81430bc57e6ab"
  - id: hotspot
    title: "Retained electromigration screening and current reduction"
    url: "https://github.com/kev-cam/stat-sim/blob/59230dd7cb02d7f85d9eb1eef984dedf8c24e2b0/hotspot.py"
  - id: extract
    title: "Distributed SPEF and geometry extraction with KLayout"
    url: "https://github.com/kev-cam/stat-sim/blob/59230dd7cb02d7f85d9eb1eef984dedf8c24e2b0/klayout2spef.py"
  - id: wire
    title: "Optional Verilog-A segment monitor"
    url: "https://github.com/kev-cam/stat-sim/blob/59230dd7cb02d7f85d9eb1eef984dedf8c24e2b0/models/statsim_em_wire.vams"
  - id: model
    title: "Variability-aware Verilog-AMS model generation"
    url: "https://github.com/kev-cam/stat-sim/blob/59230dd7cb02d7f85d9eb1eef984dedf8c24e2b0/genmodel.py"
  - id: rf
    title: "Retained RF behavioral frontend"
    url: "https://github.com/kev-cam/stat-sim/blob/59230dd7cb02d7f85d9eb1eef984dedf8c24e2b0/rf/cc2652r/btle_phy_radio.vhd"
  - id: license
    title: "Noncommercial core license"
    url: "https://github.com/kev-cam/stat-sim/blob/59230dd7cb02d7f85d9eb1eef984dedf8c24e2b0/LICENSE"
  - id: commercial
    title: "Separate commercial licensing terms"
    url: "https://github.com/kev-cam/stat-sim/blob/59230dd7cb02d7f85d9eb1eef984dedf8c24e2b0/COMMERCIAL.md"
---

## Scope and limits

This Analog entry covers independently usable electrical-model generation, extracted interconnect analysis and current-density screening, rather than treating the entire project's CDC verification workflow as an analog design tool. The generator emits Verilog-AMS metastability models from cell characterization inputs, with example defaults that are not independently calibrated. The hot-spot operation instruments distributed SPEF wires, reduces transient segment currents to average, RMS and peak values, and compares each against layer- and geometry-dependent limits. The KLayout extraction path emits distributed RC and geometry metadata, supporting Layout. Unlike the retained Vyges EM-IR power-grid solver, hot-spot can use circuit-simulator waveforms and instrument signal or supply segments. [Model generator](#source-model) · [Current screening](#source-hotspot) · [Extraction](#source-extract) · [Inline monitor](#source-wire).

The built-in SKY130 limits are estimates. PDK tech LEF current limits or user-supplied rules can replace them; unspecified current types are not screened. Screening and relative lifetime derating are not an independently validated coupled electromigration/thermal/stress lifetime solver or foundry signoff. The reviewed core carries a noncommercial source license and separate commercial terms, not an OSI open-source license. [LEF change](#source-lef-integration) · [License](#source-license) · [Commercial terms](#source-commercial).

## Reviewed maintenance and provenance

July 11 added EM instrumentation, geometry extraction and then LEF rule import. November 25 integrated a BLE baseband RF behavioral frontend and radio timing correction, confirming later project-level engineering work; this is not evidence of a November EM-specific update. November 25's later documentation commit is the raw activity head. The July EM patch credits Claude Opus 4.8 and includes executable screening code retained in hotspot.py. No simulator runs or extracted-layout results were independently reproduced. [Credited implementation](#source-em-integration) · [Retained code](#source-hotspot) · [November integration](#source-activity) · [RF model](#source-rf).
