---
name: "gmoverid-skill"
summary: "Agent-usable device characterization and gm/ID sizing tools."
description: "Agent skills and Python tools for gm/ID transistor sizing and characterization. The agent selects topology and sizing trade-offs, then visually checks characterization plots for physical or extraction problems; conventional lookup tables and ngspice scripts supply device data, sizing quantities and SKY130 PVT/Monte Carlo results."
scope:
  design:
    ai: true
  simulation:
    ai: true
access: "Python, ngspice and the selected transistor models; SKY130 examples require the local PDK. The installed reasoning and visual-validation skills additionally require a compatible model host."
addedAt: "2026-09-05"
reviewedAt: "2026-10-01"
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
---

### Scope

The repository ships agent instructions alongside executable characterization, sizing and simulation scripts. `GmIdTable` caches simulated device sweeps and computes widths or operating points from gm/ID, current, transit-frequency or intrinsic-gain targets. SKY130 examples run corner and Monte Carlo jobs and write measurements. [Packages](#source-readme-md) · [Sizing API](#source-gmoverid-assets-design-gmoverid-py) · [Sweep runner](#source-sky130-pdk-assets-run-sky130-five-transistor-ota-pvt-mc-py)

### Classification

Simulation covers device characterization; Design covers lookup-based sizing and operating-point selection, without an autonomous multi-objective optimizer. The Python tools do not host a model themselves; the installed reasoning skill requires a separate model host. Ngspice use alone does not imply EDA-session control. Results depend on the selected models; PTM examples and foundry PDK simulations are distinct environments.

### Scope classification

The installed skill directs a model to select topology, channel length and gm/ID from specifications and trade-offs, supporting AI Design. Its separate characterization self-validation explicitly requires LLM visual physics assessment and diagnosis of suspicious extraction/convergence behavior, supporting AI Simulation. [Runtime skill](#source-runtime-skill)

The Python lookup API, sweeps, PVT and Monte Carlo execution remain conventional. The tags concern the released model-hosted workflow, not a learned ngspice solver or every direct API call. [Backing API](#source-readme-md)
