---
name: "Zurich Instruments Toolkit"
aliases: ["zhinst-toolkit","LabOne toolkit"]
description: "Python high-level driver for Zurich Instruments hardware through the LabOne API. Device and module interfaces expose node configuration, streaming and data acquisition, sweeper operations and supported instrument-specific controls including lock-in and waveform-generator workflows."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "MIT; requires compatible Zurich Instruments hardware and LabOne software with its separate native API. The reviewed README requires LabOne 25.04 or later."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/zhinst/zhinst-toolkit"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/zhinst/zhinst-toolkit/commit/f6ead8b7c41a680a2b1ba885ff8737a37a2f666b"
  - id: streaming
    title: "January data streaming module integration"
    url: "https://github.com/zhinst/zhinst-toolkit/commit/58606bcebd3677f795bb62c2d6eaff44d68822ff"
  - id: daq-fix
    title: "April empty acquisition data correction and regression"
    url: "https://github.com/zhinst/zhinst-toolkit/commit/88357f9feecf688e99b2dc0d4ffdc7e0e3dfe3c1"
  - id: daq
    title: "Retained acquisition data processing"
    url: "https://github.com/zhinst/zhinst-toolkit/blob/48162020bb99b1d5bd3a442de124cf97d7037b69/src/zhinst/toolkit/driver/modules/daq_module.py"
  - id: nodes
    title: "Retained node lookup implementation"
    url: "https://github.com/zhinst/zhinst-toolkit/blob/48162020bb99b1d5bd3a442de124cf97d7037b69/src/zhinst/toolkit/nodetree/nodetree.py"
---

## Scope and limits

This device-specific high-level interface adds LabOne node trees and instrument modules rather than only a generic transport or SCPI wrapper. The acquisition module retrieves and formats returned data, while instrument settings and node access implement Control. The reviewed package depends on the native LabOne stack. Formatting acquired data does not establish separate recorded-data Analysis, and device sweeper configuration is not a general test runner. Instrument-specific bandwidth, timebase, synchronization and calibration must be established separately. [DAQ implementation](#source-daq) · [Node lookup](#source-nodes).

## Reviewed maintenance

January 2026 introduces the data streaming module. April corrects the DAQ read path for empty returned nodes and adds a regression. November optimizes exact node lookup to avoid pattern matching across the full node tree, with exact-path and wildcard regression cases. Both the empty-data guard and direct lookup implementation remain in the reviewed revision. [Streaming integration](#source-streaming) · [Empty data regression](#source-daq-fix) · [Lookup correction](#source-activity).
