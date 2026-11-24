---
name: "PyMoDAQ"
aliases: []
description: "Python and Qt environment for instrument control, data acquisition and automated experimental scans using detector and actuator plugins. Its dashboard records measurements in HDF5, while an integrated browser reopens saved data for plotting, background subtraction and export."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on array-shape comparison handling and its executable regression tests."
  sources: [implementation, development-retained]
  reviewedAt: "2026-11-24"
access: "MIT; detector and actuator plugins may require separate instrument SDKs."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://www.pymodaq.cnrs.fr/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/PyMoDAQ/PyMoDAQ"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/PyMoDAQ/PyMoDAQ/commit/53a9bb574908b9c3e17578ceebce9e1102a53adc"
  - id: implementation
    title: "Specific implementation reviewed"
    url: "https://github.com/PyMoDAQ/PyMoDAQ/commit/b69fef95ed1db41a853fbdc15c005309eec01ce3"
  - id: hdf5-browser
    title: "Saved HDF5 browsing, plotting and export application"
    url: "https://github.com/PyMoDAQ/PyMoDAQ/blob/2c95157fb9018c96d28fb1cafe979ede4329ee03/packages/pymodaq_gui/src/pymodaq_gui/h5modules/browsing.py"
  - id: development-retained
    title: "Retained array-shape comparison correction"
    url: "https://github.com/PyMoDAQ/PyMoDAQ/blob/2c95157fb9018c96d28fb1cafe979ede4329ee03/packages/pymodaq_data/src/pymodaq_data/data.py"
---

## Scope and limits

The reviewed 5.3 branch changes array-shape comparison to avoid suppressing actuator operations. Software regression behavior does not verify timing or settling in a physical measurement setup.

[Reviewed upstream implementation](#source-implementation).

Analysis is supported by the same-repository H5Browser application: it opens existing files, loads selected nodes with optional background handling, plots them and exports data. This is a saved-data workflow beyond displaying an ongoing acquisition. [HDF5 browser](#source-hdf5-browser).
