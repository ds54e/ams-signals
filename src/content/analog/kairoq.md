---
name: "KairoQ"
aliases: ["PCB fabrication analysis"]
summary: "Board electrical and thermal analysis from PCB fabrication exports."
description: "C++ and Python board-analysis tools importing IPC-2581, ODB++, Gerber and drill data into a common geometry model. It computes DC drop, thermal fields, PDN impedance, channel S-parameters and time-domain waveforms with selected IBIS buffer behavior; separate Elmer and openEMS exports provide external solver workflows."
scope:
  simulation: { ai: false }
access: "GPL-3.0 source; requires a supported fabrication export, stackup and appropriate material, load and port models. External reference solves require Elmer or openEMS."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/hanzamzamy/kairoq"
    purpose: code
  - id: activity
    title: "October 18 loop-refinement memory guard and regression"
    url: "https://github.com/hanzamzamy/kairoq/commit/e4088247b89053fd6820340119725ef9b7a5845c"
  - id: earlier
    title: "October 11 IPC-D-356 alias handling correction"
    url: "https://github.com/hanzamzamy/kairoq/commit/bc915084185131ea7fbaf9ac2bba61168da85ab4"
  - id: stackup
    title: "October 18 stackup override for multiple fabrication inputs"
    url: "https://github.com/hanzamzamy/kairoq/commit/0076badcdc827aed0c34462a23e54901ab3427a0"
  - id: retained
    title: "Retained geometry-based PEEC loop solver"
    url: "https://github.com/hanzamzamy/kairoq/blob/e4088247b89053fd6820340119725ef9b7a5845c/src/core/src/emi_loop.cpp"
  - id: waveforms
    title: "Retained channel and IBIS termination time-domain implementation"
    url: "https://github.com/hanzamzamy/kairoq/blob/e4088247b89053fd6820340119725ef9b7a5845c/src/core/src/timedomain.cpp"
  - id: limits
    title: "Documented time-domain and IBIS keyword boundaries"
    url: "https://github.com/hanzamzamy/kairoq/blob/e4088247b89053fd6820340119725ef9b7a5845c/docs/solvers/timedomain.md"
  - id: tests
    title: "Retained channel and IBIS regression cases"
    url: "https://github.com/hanzamzamy/kairoq/blob/e4088247b89053fd6820340119725ef9b7a5845c/tests/python/test_timedomain.py"
---

## Scope and limits

The distinct workflow starts with manufacturing exchange formats rather than relying on native KiCad editing or a hand-authored RF network. It combines board analysis with channel convolution, Newton solves for nonlinear IBIS terminations and external reference-model export. The native reduced-order models are not equivalent to a universal full-wave or 3D multiphysics solver. The IBIS path reads selected behavior keywords rather than generating a characterized driver model or executing IBIS-AMI. Its frequency-band and time-window assumptions constrain transient predictions. This complements KiPI's detailed board power-tree workflow and the separate PCB EM Lab field-solver integration. [Loop implementation](#source-retained) · [Channel implementation](#source-waveforms) · [Model boundaries](#source-limits) · [Regression cases](#source-tests).

## Reviewed maintenance

After the October 11 executable release, the project corrected IPC-D-356 net aliases and later added consistent stackup overrides for IPC-2581 and ODB++ input, including copper-layer validation. The October 18 change stops loop refinement before a configured memory limit and adds executable regression coverage. These changes address distinct post-publication problems. The public history is short and no later substantive default-branch change was observed; neither numerical accuracy nor hardware correlation was independently reproduced. [Alias correction](#source-earlier) · [Stackup correction](#source-stackup) · [Memory guard](#source-activity).
