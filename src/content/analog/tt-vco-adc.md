---
name: "tt-vco-adc"
aliases: ["Tiny Tapeout VCO ADC","VCO delta-sigma ADC"]
summary: "SKY130 pseudo-differential second-order closed-loop VCO delta-sigma ADC reference design."
description: "SKY130 Tiny Tapeout reference design for a pseudo-differential second-order closed-loop VCO delta-sigma ADC. Includes behavioral models, transistor netlists, parametric Magic layout generation, DRC/LVS and extracted-netlist transient benches with digital decoding and reported pre-silicon results."
scope:
  design: { ai: false }
  simulation: { ai: false }
  layout: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is co-credited on the November 22 implementation revising the full-transistor transient bench and layout. The current transient runner retains selective waveform saving and the 0.5 ns signoff timestep."
  sources: ["s13","transient"]
  reviewedAt: "2026-11-28"
access: "Public design and simulation sources; requires SKY130A, ngspice, Magic and Netgen for the documented electrical and physical workflow."
notice: "The reported V2 DRC, LVS and post-layout simulation results are author-reported pre-silicon evidence, not silicon measurements or independent signoff."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical Tiny Tapeout project"
    url: "https://github.com/Arcadia-1/tt-vco-adc"
    purpose: code
  - id: readme
    title: "Reference design and workflow map"
    url: "https://github.com/Arcadia-1/tt-vco-adc/blob/69998f2aaabf1f16d9d853119a80cfc1e8912636/README.md"
  - id: activity
    title: "November 28 V2 implementation and verification"
    url: "https://github.com/Arcadia-1/tt-vco-adc/commit/69998f2aaabf1f16d9d853119a80cfc1e8912636"
  - id: s13
    title: "November 22 initial full-transistor and compact-DAC implementation"
    url: "https://github.com/Arcadia-1/tt-vco-adc/commit/5f44ea884541b0a1889b6c72f0127c02dda783ac"
  - id: behavioral
    title: "Second-order behavioral loop model"
    url: "https://github.com/Arcadia-1/tt-vco-adc/blob/69998f2aaabf1f16d9d853119a80cfc1e8912636/model/so_model.py"
  - id: transient
    title: "Schematic and PEX transient runner and decoding"
    url: "https://github.com/Arcadia-1/tt-vco-adc/blob/69998f2aaabf1f16d9d853119a80cfc1e8912636/sim/so_tran.py"
  - id: layout
    title: "Parameterized Magic layout generation"
    url: "https://github.com/Arcadia-1/tt-vco-adc/blob/69998f2aaabf1f16d9d853119a80cfc1e8912636/layout/gen_layout.py"
  - id: verification
    title: "V2 design and author-reported verification record"
    url: "https://github.com/Arcadia-1/tt-vco-adc/blob/69998f2aaabf1f16d9d853119a80cfc1e8912636/VERIFICATION.md"
  - id: lvs
    title: "Reported LVS output"
    url: "https://github.com/Arcadia-1/tt-vco-adc/blob/69998f2aaabf1f16d9d853119a80cfc1e8912636/verify/reports/lvs_report.txt"
---

### Implementation and selection

Each pseudo-differential half combines an OTA-C integrator, seven-stage current-starved ring VCO, sampled phase-word XOR and resistor DAC feedback. The Python model exposes excess loop delay, DAC mismatch and jitter assumptions; the transient runner supports schematic and extracted netlists and off-chip digital decoding. The layout generator produces Magic commands and LVS reference artifacts. This process-specific block is a reusable mixed-signal reference design and verification workflow, not a generic ADC generator. [Overview](#source-readme) · [Behavioral model](#source-behavioral) · [Transient runner](#source-transient) · [Layout](#source-layout).

### Follow-through and limits

The November 22 S13 implementation and November 28 V2 revision show concrete technical follow-through after the first usable design: V2 changes the OTA, adds an active clamp and isolates the feedback path from output loading. The V2 report states 0 Magic DRC errors, matching LVS, 16/16 Tiny Tapeout prechecks and 69.0–70.6 dB SNDR over six reported flat transistor-level C-only PEX cases at 10 MHz sampling and a 50 kHz analysis bandwidth. These results have not been independently reproduced, do not establish extracted resistance coverage or fabricated-silicon performance, and should not be generalized beyond the stated test conditions. [S13](#source-s13) · [V2](#source-activity) · [Verification](#source-verification) · [LVS](#source-lvs).

The short project-specific public history is a limitation; the second implementation campaign addresses specific observed circuit and verification problems rather than merely updating documentation. The raw repository history includes inherited Tiny Tapeout template commits from before the ADC project, which are not evidence of ADC development. Design, Simulation and Layout cover conventional executable operations. The separately credited November 22 changes support AI-assisted development; no implemented runtime model operation is established. The chip-test scripts do not justify a second Lab listing without a distinct maintained physical-measurement workflow.
