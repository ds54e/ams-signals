---
name: openPCells
summary: Technology-independent parametric layout generator using Lua cells and a C geometry/export engine for analog, RF and mixed-signal ICs.
description: Technology-independent parametric layout generator using Lua cells and a C geometry/export engine for analog, RF and mixed-signal ICs. It generates devices, matched structures and hierarchical circuits into GDSII/OASIS and other formats; technology mappings and process-specific physical verification remain the user's responsibility.
scope:
  layout:
    ai: false
access: Public C/Lua source; requires a C compiler and appropriate technology mappings. Generated geometry is not an independent DRC/LVS or foundry-signoff guarantee.
addedAt: '2026-11-03'
reviewedAt: '2026-11-03'
sources:
- id: code
  title: Canonical public implementation
  url: https://github.com/patrickschulz/openPCells
  purpose: code
- id: readme
  title: Current implementation overview and boundaries
  url: https://github.com/patrickschulz/openPCells/blob/f5e76846949843ee288644ddce07610646262707/README.md
- id: activity
  title: Reviewed substantive first-parent implementation
  url: https://github.com/patrickschulz/openPCells/commit/f5e76846949843ee288644ddce07610646262707
- id: rf
  title: Retained RF MOSFET generator
  url: https://github.com/patrickschulz/openPCells/blob/f5e76846949843ee288644ddce07610646262707/cells/RF/mosfet.lua
- id: mirror
  title: Retained analog current-mirror layout cell
  url: https://github.com/patrickschulz/openPCells/blob/f5e76846949843ee288644ddce07610646262707/cells/analog/currentmirror.lua
- id: test
  title: Full-layout current-mirror regression parameters
  url: https://github.com/patrickschulz/openPCells/blob/f5e76846949843ee288644ddce07610646262707/test/full/pfile_currentmirror_00.lua
---

### Implementation, selection and boundaries

The retained MOSFET/RF generators, analog current-mirror cells and full-layout regression parameters establish concrete Layout. The history contains years of device, geometry/export and test maintenance; October work corrects RF guard-ring parameters, adds guard-ring extension controls and RF regression cases. Low-frequency maintenance is substantive even without a numbered GitHub release. No AI runtime or credited AI implementation was established by this review. Parametric geometry does not independently establish circuit Design or Simulation. [Implementation overview](#source-readme) · [RF generator](#source-rf) · [Analog cell](#source-mirror) · [Regression input](#source-test) · [Reviewed fix](#source-activity).
