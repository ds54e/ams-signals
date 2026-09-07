---
name: "scikit-rf"
aliases: ["skrf"]
summary: "Processes RF network data and builds rational equivalent models for circuit simulation."
description: "Python toolkit for measured or simulated N-port RF networks, including S-parameter operations, calibration and transmission-line models. Vector fitting turns sampled frequency responses into rational models, with SPICE subcircuit export for fitted S-parameters, connecting RF characterization to circuit simulation."
scope:
  simulation:
    ai: false
access: "Public Python package and documentation; network data, measurement hardware and external circuit simulators are separate inputs or tools."
addedAt: "2026-09-07"
reviewedAt: "2026-09-07"
sources:
  - id: "documentation"
    title: "Official scikit-rf documentation"
    url: "https://scikit-rf.readthedocs.io/en/latest/"
    purpose: "official"
  - id: "code"
    title: "Canonical scikit-rf repository"
    url: "https://github.com/scikit-rf/scikit-rf"
    purpose: "code"
  - id: "readme"
    title: "README at the reviewed master revision"
    url: "https://github.com/scikit-rf/scikit-rf/blob/93b1c9dd14e72d45edac4538a0b495338e64d616/README.md"
  - id: "fitting"
    title: "Vector fitting and equivalent circuit limitations"
    url: "https://scikit-rf.readthedocs.io/en/latest/tutorials/VectorFitting.html"
  - id: "spice-export"
    title: "Fitted S-parameter SPICE subcircuit API"
    url: "https://scikit-rf.readthedocs.io/en/latest/api/generated/skrf.vectorFitting.VectorFitting.write_spice_subcircuit_s.html"
  - id: "implementation"
    title: "Reviewed vector-fitting and S-parameter export implementation"
    url: "https://github.com/scikit-rf/scikit-rf/blob/93b1c9dd14e72d45edac4538a0b495338e64d616/skrf/vectorFitting.py"
  - id: "release"
    title: "scikit-rf v2.1.0, August 13, 2026"
    url: "https://github.com/scikit-rf/scikit-rf/releases/tag/v2.1.0"
  - id: "activity"
    title: "Preserve the scattering definition through innerconnect, September 3, 2026"
    url: "https://github.com/scikit-rf/scikit-rf/commit/93b1c9dd14e72d45edac4538a0b495338e64d616"
  - id: "assistance-fix"
    title: "Bounded Claude-attributed MDIF parser correction"
    url: "https://github.com/scikit-rf/scikit-rf/commit/701ea5aa9899a0e9301d5c1a509bb3eafdf3da2c"
  - id: "assistance-plot"
    title: "Bounded Claude-attributed plotting addition over existing error calculations"
    url: "https://github.com/scikit-rf/scikit-rf/commit/13bb7b08721c3bc0476e1778ba5edf8e9a0b200b"
---

### Implementation context

RF network objects handle measured/simulated multiport data, parameter conversions, interconnections, calibration and transmission-line models. These operations connect RF characterization and equivalent circuit modeling to electrical evaluation, adding a role beyond general scientific Python or a SPICE engine. [Documentation](#source-documentation); [reviewed implementation](#source-implementation).

Vector fitting accepts sampled S, Y and Z responses, but implemented equivalent-circuit export targets fitted S-parameters. Y/Z equivalent-circuit export is not implemented. Rational frequency-response models do not establish universal conversion or replacement of nonlinear/time-varying circuits. [Fitting scope](#source-fitting); [SPICE export API](#source-spice-export).

### Release boundary

Stable v2.1.0 was released August 13, 2026, with Touchstone 2.1, port-name and transmission-line improvements. Reviewed master includes the later September 3 `innerconnect` correction: preserving the input scattering definition before conversion, with a regression checking the returned data against an independent network reference. [Release](#source-release); [meaningful activity](#source-activity).

### Scope and development provenance

Simulation covers network/electrical evaluation and RF model preparation. These numerical fitting and analysis operations do not establish runtime AI or an additional custom-IC Design stage.

The bounded provenance review inspected credited parser/array fixes, plotting, tests and diagnostic edits. The plotting addition wraps existing error calculations; the parser correction repairs continuation lines. These do not establish substantial AI implementation of a modeling subsystem or campaign, so no development label is assigned. This does not assert an absence of assistant use. [Parser change](#source-assistance-fix); [plotting change](#source-assistance-plot).
