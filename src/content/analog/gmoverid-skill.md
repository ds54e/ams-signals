---
name: "gmoverid-skill"
summary: "Agent-usable device characterization and gm/ID sizing tools."
description: "Provides agent-usable gm/ID characterization and transistor-sizing tools, plus ngspice examples and SKY130 corner/Monte Carlo sweeps for device models and small analog circuits."
scope:
  design:
    level: core
    ai: false
  simulation:
    level: core
    ai: false
access: "Python, ngspice and the selected transistor models; SKY130 examples require the local PDK."
addedAt: "2026-09-05"
reviewedAt: "2026-09-05"
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
---

### Scope

The repository ships agent instructions alongside executable characterization, sizing and simulation scripts. `GmIdTable` caches simulated device sweeps and computes widths or operating points from gm/ID, current, transit-frequency or intrinsic-gain targets. SKY130 examples run corner and Monte Carlo jobs and write measurements. [Packages](#source-readme-md) · [Sizing API](#source-gmoverid-assets-design-gmoverid-py) · [Sweep runner](#source-sky130-pdk-assets-run-sky130-five-transistor-ota-pvt-mc-py)

### Classification

Simulation is core. Optimization is supporting for lookup-based device sizing and operating-point selection, not an autonomous multi-objective circuit optimizer. Agent-usable instructions do not make the package an independent reasoning agent, and ngspice use alone does not imply EDA-session control. Results depend on the selected models; PTM examples and foundry PDK simulations are distinct environments.

### Scope classification

The gm/ID API provides sizing quantities such as device width and bias, while ngspice characterization and PVT/Monte Carlo tools provide simulation. These are exposed operations rather than an inferred autonomous optimizer. [Reviewed source](#source-readme-md).

The reviewed APIs perform device lookup, characterization, PVT and Monte Carlo operations. Instructions and tools usable by agents do not themselves establish model inference in Design or Simulation. [AI/stage evidence](#source-readme-md).
