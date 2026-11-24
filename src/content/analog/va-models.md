---
name: "VA-Models"
aliases: []
description: "Verilog-A compact-device models and example decks for supported ngspice and Xyce workflows. Compiler support and reuse terms vary by model, including CC BY-NC 4.0 on the reviewed BSIM4 source; example curves do not establish foundry qualification."
scope: {"simulation": {"ai": false}}
access: "Public model sources; individual licenses and compiler/simulator support vary. The reviewed BSIM4 source carries CC BY-NC 4.0 terms."
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
  - id: bsim4-license
    title: "BSIM4 source-specific license notice"
    url: "https://github.com/dwarning/VA-Models/blob/f04299a330591a591f309f4be1e208f83883ba2a/code/bsim4/vacode/bsim4.va"
---

### Scope and maintenance

This is executable model code plus example/build material, not the OpenVAF compiler or the host simulator. The source describes supported OpenVAF/OSDI plus ngspice and ADMS plus Xyce paths by model. Access and reuse terms belong to each model; a portable formulation is not a measured PDK card. [Compatibility and notices](#source-guide).

February corrected a JUNCAP parameter; September changed VBIC limiting; November restored the BSIM-CMG v110 polarity convention and adjusted its example card. These are default-branch work after the older tagged distribution. No model accuracy or convergence result was independently reproduced. [February change](#source-earlier) · [September change](#source-limiting) · [November change](#source-activity) · [Tagged distribution](#source-release).

The BSIM4 source at the reviewed revision explicitly carries an Attribution-NonCommercial 4.0 notice. Do not generalize that restriction to every model, or describe the entire collection as uniformly open source. [BSIM4 notice](#source-bsim4-license).
