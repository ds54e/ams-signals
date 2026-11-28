---
name: "ams-skills"
aliases: ["sar-adc-skills","AMS IC design skills"]
summary: "Domain-specific agent skills with behavioral models, Spectre testbenches and result analyzers."
description: "Agent skills for architecture selection, sizing and electrical verification across ten analog and mixed-signal circuit domains. Includes Verilog-A models, reusable Spectre X/RF testbenches and Python PSF analyzers for ADCs, DACs, PLLs, oscillators, SerDes, amplifiers, regulators, references and supervisors."
scope:
  design: { ai: true }
  simulation: { ai: true }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus 5.5 is co-credited on the November 27 implementation adding switched-capacitor OTA testbenches and extending the Monte Carlo analyzer to pool multiple batches. The executable analyzer remains at the reviewed main head."
  sources: ["activity","mc-analyzer"]
  reviewedAt: "2026-11-28"
access: "Public skill, model, testbench and Python analyzer source; execution requires the appropriate licensed Spectre engine and DUT/model includes. Bundled generic models are not foundry signoff models."
notice: "Author-reported smoke checks are not independently reproduced; the supplied decks are templates, not proof of production signoff."
addedAt: "2026-11-28"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical AMS skills repository"
    url: "https://github.com/Arcadia-1/ams-skills"
    purpose: code
  - id: readme
    title: "Ten-domain skill taxonomy and bundled assets"
    url: "https://github.com/Arcadia-1/ams-skills/blob/2c0fb0cd1f504db87b41c70dbc5d32f025065499/README.md"
  - id: activity
    title: "November 27 OTA decks, Monte Carlo batching and operating-region audit"
    url: "https://github.com/Arcadia-1/ams-skills/commit/2c0fb0cd1f504db87b41c70dbc5d32f025065499"
  - id: pll-skill
    title: "PLL architecture, sizing, noise budgeting and verification workflow"
    url: "https://github.com/Arcadia-1/ams-skills/blob/2c0fb0cd1f504db87b41c70dbc5d32f025065499/skills/pll/SKILL.md"
  - id: oscillator-skill
    title: "Pierce XO and RC oscillator design and verification workflow"
    url: "https://github.com/Arcadia-1/ams-skills/blob/2c0fb0cd1f504db87b41c70dbc5d32f025065499/skills/oscillator/SKILL.md"
  - id: xo-deck
    title: "Full-Q BVD autonomous PSS and PNOISE deck"
    url: "https://github.com/Arcadia-1/ams-skills/blob/2c0fb0cd1f504db87b41c70dbc5d32f025065499/skills/oscillator/assets/tb/xo/tb_xo_pss_pnoise.scs"
  - id: oscillator-integration
    title: "November 24 oscillator skill integration"
    url: "https://github.com/Arcadia-1/ams-skills/commit/496da9394cc736bf5f4f9bac1b16a1696a402935"
  - id: ota-deck
    title: "Switched-capacitor closed-loop OTA testbench"
    url: "https://github.com/Arcadia-1/ams-skills/blob/2c0fb0cd1f504db87b41c70dbc5d32f025065499/skills/opamp-ota/assets/tb/fully_diff/tb_fd_ota_sc_closed_loop.scs"
  - id: mc-analyzer
    title: "Retained executable batched Monte Carlo analysis"
    url: "https://github.com/Arcadia-1/ams-skills/blob/2c0fb0cd1f504db87b41c70dbc5d32f025065499/common/tb/analyze_mc.py"
  - id: related-ngspice
    title: "Related ngspice/PTM circuit skill collection"
    url: "https://github.com/Arcadia-1/analog-circuit-skills/blob/cf1066edb0dc8a7eb78914ecf29b081261e91421/README.md"
---

### Implementation and selection

Formerly sar-adc-skills, the repository provides separately installable circuit-domain skills with Verilog-A models, replaceable DUT and model includes, testbench decks and PSF analyzers. It is distinct from gmoverid-skill's device-characterization/sizing workflow and from virtuoso-bridge-lite's EDA transport. The PLL skill specifies architecture and loop/noise-budget choices and staged electrical checks; the oscillator skill adds Pierce XO and RC oscillator workflows. The PSS/PNOISE deck retains the unscaled BVD resonator. [Overview](#source-readme) · [PLL](#source-pll-skill) · [Oscillator](#source-oscillator-skill) · [XO deck](#source-xo-deck).

### Scope and technical follow-through

The released agent instructions choose architectures, sizing and verification phases and guide circuit-specific analysis selection, supporting AI Design and AI Simulation; Spectre and Python analysis remain conventional. The November 24 oscillator integration extends the earlier skill collection, followed on November 27 by new OTA stability, settling and noise decks and executable Monte Carlo pooling. These are substantive public implementations rather than only prompt templates. The credited Monte Carlo implementation remains at the reviewed head. [Oscillator integration](#source-oscillator-integration) · [OTA deck](#source-ota-deck) · [Monte Carlo analyzer](#source-mc-analyzer) · [Activity](#source-activity).

The separate ngspice/PTM collection offers related single-block experiments and does not inherit these Spectre capabilities or activity. [Related collection](#source-related-ngspice). No Spectre or foundry signoff campaign was independently executed.
