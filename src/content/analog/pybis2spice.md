---
name: "pybis2spice"
aliases: ["IBIS to SPICE"]
summary: "Converts selected IBIS buffer models into executable SPICE subcircuit files."
description: "Python tool converting supported IBIS buffer data into generic, LTspice or ngspice subcircuits. The current implementation uses I-V tables, edge waveforms or ramp data and package parasitics, with corner selection and programmatic or GUI export; it does not extract IBIS data from transistor-level circuits."
scope:
  simulation: { ai: false }
access: "MIT-licensed public source; requires valid supported IBIS inputs and a compatible simulator. The reviewed v1.3.0 distribution is a release candidate."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical successor implementation"
    url: "https://github.com/Jamanaman/pybis2spice"
    purpose: code
  - id: activity
    title: "August 19 v1.3.0 release-candidate integration"
    url: "https://github.com/Jamanaman/pybis2spice/commit/b75d0264c1f4ce33cd632efcaf18e2fe7c1737eb"
  - id: migration
    title: "Predecessor maintenance notice"
    url: "https://github.com/kamratia1/pybis2spice"
  - id: builder
    title: "Retained programmatic model export dispatch"
    url: "https://github.com/Jamanaman/pybis2spice/blob/47cd54c9f0bb32e9c53778e5de3c5ff0413c6ab9/src/pybis2spice/circuit_builder.py"
  - id: subcircuit
    title: "Retained simulator-specific subcircuit and waveform generation"
    url: "https://github.com/Jamanaman/pybis2spice/blob/47cd54c9f0bb32e9c53778e5de3c5ff0413c6ab9/src/pybis2spice/subcircuit.py"
  - id: followup
    title: "August 21 executable distribution build correction"
    url: "https://github.com/Jamanaman/pybis2spice/commit/d1f2a29b5f1d2066b02b30e6721cf64fc34fcb5a"
  - id: build
    title: "Retained platform-specific GUI build"
    url: "https://github.com/Jamanaman/pybis2spice/blob/47cd54c9f0bb32e9c53778e5de3c5ff0413c6ab9/gui/build.py"
  - id: tests
    title: "Retained model-data and switching-coefficient tests"
    url: "https://github.com/Jamanaman/pybis2spice/blob/47cd54c9f0bb32e9c53778e5de3c5ff0413c6ab9/test/data_model_test.py"
---

## Scope and limits

This workflow emits SPICE circuit models rather than reading compiled AMI interfaces or solving a complete channel. It complements PyIBIS-AMI's model inspection and KairoQ's IBIS termination path. The executable dispatch supports input and selected output/I/O types, including separate generic, LTspice and ngspice output functions. Differential model construction remains commented out in the reviewed builder; do not assume direct differential LVDS model support, IBIS-AMI, or complete IBIS compliance. Conversion depends on the supplied table/fixture data and simulator syntax, not an independent characterization of the original silicon. [Builder](#source-builder) · [Subcircuit implementation](#source-subcircuit) · [Model tests](#source-tests).

## Reviewed maintenance

The established 2021–2022 project has moved from kamratia1 to Jamanaman rather than becoming a second listing. The August 19, 2026 release-candidate integration adds ngspice-oriented output generation and refactors the data model and public generation interface, with model-data tests. Subsequent distribution fixes include the August 21 GUI build correction, retained in the canonical tree. Public follow-through after reactivation is limited to August so far; this is a restarted maintained implementation, not a claim of continuous development throughout the earlier gap. No generated subcircuit or numerical agreement was independently tested. [Predecessor](#source-migration) · [Integration](#source-activity) · [Build correction](#source-followup) · [Retained build](#source-build).
