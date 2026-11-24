---
name: "VA-Models"
aliases: []
description: "Collection of Verilog-A compact-device implementations and example decks for supported ngspice and Xyce workflows. Model revisions, compiler paths and simulator support differ by device; example curves do not qualify a model for a particular foundry process or supply a calibrated model card."
scope: {"simulation": {"ai": false}}
access: "Public model sources; individual model licenses, compilers, and simulator compatibility vary."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
summary: "Portable Verilog-A compact-model implementations and simulator examples."
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/dwarning/VA-Models"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/dwarning/VA-Models/commit/f04299a330591a591f309f4be1e208f83883ba2a"
  - id: guide
    title: "Reviewed simulator compatibility matrix and model notices"
    url: "https://github.com/dwarning/VA-Models/blob/f04299a330591a591f309f4be1e208f83883ba2a/README.md"
  - id: earlier
    title: "JUNCAP instance temperature parameter correction"
    url: "https://github.com/dwarning/VA-Models/commit/ba3d04319aae2806962848bb712fd90501488d80"
  - id: limiting
    title: "VBIC conditional limiting change"
    url: "https://github.com/dwarning/VA-Models/commit/6099b4e12e6f66ff530f59b8d01fb909094be85a"
  - id: release
    title: "Earlier tagged model distribution v2.2"
    url: "https://github.com/dwarning/VA-Models/releases/tag/v2.2"
---

### Scope and maintenance

This is executable model code plus example/build material, not the OpenVAF compiler or the host simulator. The source describes supported OpenVAF/OSDI plus ngspice and ADMS plus Xyce paths by model. Access and reuse terms belong to each model; a portable formulation is not a measured PDK card. [Compatibility and notices](#source-guide).

February corrected a JUNCAP parameter; September changed VBIC limiting; November restored the BSIM-CMG v110 polarity convention and adjusted its example card. These are default-branch work after the older tagged distribution. No model accuracy or convergence result was independently reproduced. [February change](#source-earlier) · [September change](#source-limiting) · [November change](#source-activity) · [Tagged distribution](#source-release).
