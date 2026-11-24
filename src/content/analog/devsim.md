---
name: "DEVSIM"
aliases: ["DEVSIM TCAD"]
summary: "Solves semiconductor device equations on finite-volume meshes for electrical characterization."
description: "Finite-volume semiconductor device simulator for Python-controlled DC, small-signal AC and transient studies. User-defined physical equations and one- to three-dimensional meshes support device-characteristic and compact-model reference work, with geometry, material parameters, boundary conditions and calibration supplied by the user."
scope:
  simulation:
    ai: false
access: "Public Apache-2.0 simulator and examples; platform packages depend on compatible numerical libraries, and third-party files retain their own terms. Device structures, material parameters and calibration data are separate inputs."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official DEVSIM website and documentation"
    url: "https://devsim.org/"
    purpose: official
  - id: code
    title: "Canonical public DEVSIM implementation"
    url: "https://github.com/devsim/devsim"
    purpose: code
  - id: overview
    title: "Reviewed capabilities, platform requirements and licensing"
    url: "https://github.com/devsim/devsim/blob/438ccb280aec7308522cc0e4b01de3c3033bd78b/README.md"
  - id: transport
    title: "Implemented Poisson, continuity and drift-diffusion model helpers"
    url: "https://github.com/devsim/devsim/blob/438ccb280aec7308522cc0e4b01de3c3033bd78b/lib/devsim/python_packages/simple_physics.py"
  - id: ac-example
    title: "Executable diode bias sweep and small-signal capacitance extraction"
    url: "https://github.com/devsim/devsim/blob/438ccb280aec7308522cc0e4b01de3c3033bd78b/examples/diode/ssac_diode.py"
  - id: transient-example
    title: "Executable transient diode and circuit-node example"
    url: "https://github.com/devsim/devsim/blob/438ccb280aec7308522cc0e4b01de3c3033bd78b/examples/diode/tran_diode.py"
  - id: activity
    title: "Free-threaded Python integration and guarded API dispatch"
    url: "https://github.com/devsim/devsim/commit/3ea0d5a483f0f1d9381c08ef19a24b581cf43fa2"
  - id: earlier-geometry
    title: "Correct outward surface normals for device boundaries"
    url: "https://github.com/devsim/devsim/commit/2edac899e7e39f55e689e7d0f5f7d98c9dba51b9"
  - id: earlier-solver
    title: "Preserve the UMFPACK solver after simulator reset"
    url: "https://github.com/devsim/devsim/commit/5064a7e6cae7c5c2978b364f1d67b3b00c87100b"
---

### Implemented operation and scope

DEVSIM exposes numerical semiconductor-device simulation through Python. The reviewed helpers construct electrostatic potential and electron/hole continuity equations, including current and recombination models. The diode examples connect device contacts to circuit elements, solve bias points, extract small-signal capacitance and advance a transient solution. This fills a device-physics reference role alongside compact-model fitting and SPICE regression. Mesh generation supports that simulation and does not establish custom-IC Layout; the reviewed workflow does not expose automatic circuit topology or sizing recommendations. [Transport equations](#source-transport) · [AC example](#source-ac-example) · [Transient example](#source-transient-example).

Geometry, doping, transport assumptions and contact conditions determine the device being simulated. An open PDK compact-model card does not by itself provide a calibrated TCAD structure. The source review establishes implemented operations, not agreement with a particular fabricated process or independently reproduced numerical accuracy. [Capabilities and requirements](#source-overview).

### Selection and current development

Separate maintenance periods include the August correction of outward surface normals, the October UMFPACK reset repair and the November Python API changes. The November checkpoint includes actual free-threaded module initialization and a recursive-mutex guard that rejects concurrent API calls; its initial formatting subject does not describe the whole diff. These changes were inspected on the current default-branch first-parent history. No claim of concurrent independent device solves is made. [Geometry correction](#source-earlier-geometry) · [Solver reset](#source-earlier-solver) · [Reviewed checkpoint](#source-activity).

Runtime operation uses numerical device equations. No qualifying AI implementation credit was established in the reviewed project history and current sources, so no development-provenance label is inferred. [Canonical source](#source-code).
