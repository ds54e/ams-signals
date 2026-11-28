---
name: "gmoverid-skill"
summary: "Agent-usable device characterization and gm/ID sizing tools."
description: "Combines AI agent skills with Python tools for gm/ID transistor sizing and characterization. The agent selects topology and sizing trade-offs, then visually checks characterization plots for physical or extraction problems; conventional lookup tables and ngspice scripts supply device data, sizing quantities and SKY130 PVT/Monte Carlo results."
scope:
  design:
    ai: true
  simulation:
    ai: true
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited on the November 21 executable Spectre-style source conversion extension; the current main retains the new PWL, transient random/noise and behavioral-source branches."
  sources: [converter-update, converter-retained]
  reviewedAt: "2026-11-25"
access: "Python, ngspice and the selected transistor models; SKY130 examples require the local PDK. The installed reasoning and visual-validation skills additionally require a compatible model host."
addedAt: "2026-09-05"
reviewedAt: "2026-11-25"
sources:
  - id: "code"
    title: "Public project implementation"
    url: "https://github.com/Arcadia-1/gmoverid-skill"
    purpose: "code"
  - id: "readme-md"
    title: "Tool packages and examples"
    url: "https://github.com/Arcadia-1/gmoverid-skill/blob/8feb841f3684898d7aa44225b62e16263a501e3c/README.md"
  - id: "gmoverid-assets-design-gmoverid-py"
    title: "gm/ID lookup and transistor-sizing API"
    url: "https://github.com/Arcadia-1/gmoverid-skill/blob/8feb841f3684898d7aa44225b62e16263a501e3c/gmoverid/assets/design_gmoverid.py"
  - id: "sky130-pdk-assets-run-sky130-five-transistor-ota-pvt-mc-py"
    title: "OTA corner and Monte Carlo execution"
    url: "https://github.com/Arcadia-1/gmoverid-skill/blob/8feb841f3684898d7aa44225b62e16263a501e3c/sky130-pdk/assets/run_sky130_five_transistor_ota_pvt_mc.py"
  - id: "runtime-skill"
    title: "Agent sizing decisions and LLM characterization-result assessment"
    url: "https://github.com/Arcadia-1/gmoverid-skill/blob/8feb841f3684898d7aa44225b62e16263a501e3c/gmoverid/SKILL.md"
  - id: "meaningful-implementation"
    title: "Reviewed substantive implementation or technical maintenance"
    url: "https://github.com/Arcadia-1/gmoverid-skill/commit/8feb841f3684898d7aa44225b62e16263a501e3c"
  - id: converter-update
    title: "November 21 executable Spectre-style source conversion extension"
    url: "https://github.com/Arcadia-1/gmoverid-skill/commit/e9d829823eae6eac7a16613c2b78a9cfd38889d7"
  - id: converter-retained
    title: "Retained SKY130 Spectre-style to ngspice source converter"
    url: "https://github.com/Arcadia-1/gmoverid-skill/blob/30ab431485ed9045d9df8a12bda545e163b6b1d8/sky130-pdk/assets/scs_sky130_to_ngspice_sky130.py"
---

### Implemented workflow and scope

The repository ships agent instructions alongside executable characterization, sizing and simulation scripts. `GmIdTable` caches simulated device sweeps and computes widths or operating points from gm/ID, current, transit-frequency or intrinsic-gain targets. SKY130 examples run corner and Monte Carlo jobs and write measurements. [Packages](#source-readme-md) · [Sizing API](#source-gmoverid-assets-design-gmoverid-py) · [Sweep runner](#source-sky130-pdk-assets-run-sky130-five-transistor-ota-pvt-mc-py)

Simulation covers device characterization; Design covers lookup-based sizing and operating-point selection, without an autonomous multi-objective optimizer. The Python tools do not host a model themselves; the installed reasoning skill requires a separate model host. Ngspice use alone does not imply EDA-session control. Results depend on the selected models; PTM examples and foundry PDK simulations are distinct environments.

The installed skill directs a model to select topology, channel length and gm/ID from specifications and trade-offs, supporting AI Design. Its separate characterization self-validation explicitly requires LLM visual physics assessment and diagnosis of suspicious extraction/convergence behavior, supporting AI Simulation. [Runtime skill](#source-runtime-skill)

The Python lookup API, sweeps, PVT and Monte Carlo execution remain conventional. The tags concern the released model-hosted workflow, not a learned ngspice solver or every direct API call. [Backing API](#source-readme-md)

### November source review

The November 21 main implementation extends the SKY130 Spectre-style to ngspice converter with PWL, TRRANDOM, TRNOISE and supported bsource forms. This establishes renewed technical maintenance after July, not general Spectre compatibility or equivalence of stochastic processes in the two simulators. The credited change and retained executable code establish AI-ASSISTED development independently of the existing model-hosted sizing and diagnosis operations. The retained conversion code was inspected; simulator execution and numerical comparison were not reproduced. The November 28 targeted capture includes the implementation commit and the subsequent documentation-only change; only the implementation establishes meaningful activity. [Credited change](#source-converter-update) · [Retained converter](#source-converter-retained).
