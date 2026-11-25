---
name: "LibreCAL"
aliases: ["electronic calibration ECal VNA standards"]
description: "Open four-port electronic VNA calibration module with KiCad manufacturing files, firmware, USB/SCPI control and factory-coefficient measurement scripts. Its switched standards require device-specific measured coefficients and thermal stabilization; bundled VNA adapters collect and check calibration data, while the factory workflow can replace stored coefficients."
scope:
  design: { ai: false }
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "GPL-3.0 repository license; bundled third-party components retain their own terms. Hardware fabrication and a suitable calibrated VNA are separate requirements."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical calibration-module source"
    url: "https://github.com/jankae/LibreCAL"
    purpose: code
  - id: activity
    title: "Integrated macOS build compatibility repair"
    url: "https://github.com/jankae/LibreCAL/commit/5ff26b504aeb43de66641013e3f3642fbd9f86b7"
  - id: earlier-coefficients
    title: "Earlier coefficient-export newline correction"
    url: "https://github.com/jankae/LibreCAL/commit/58ff0bb9d1d5ab3b6cfa6b6ccff38d0bcedb5ced"
  - id: overview
    title: "Calibration operation and individual coefficient requirements"
    url: "https://github.com/jankae/LibreCAL/blob/5ff26b504aeb43de66641013e3f3642fbd9f86b7/README.md"
  - id: hardware
    title: "KiCad, BOM, Gerber and assembly outputs"
    url: "https://github.com/jankae/LibreCAL/tree/5ff26b504aeb43de66641013e3f3642fbd9f86b7/Hardware"
  - id: scpi
    title: "Switch, temperature and coefficient command interface"
    url: "https://github.com/jankae/LibreCAL/blob/5ff26b504aeb43de66641013e3f3642fbd9f86b7/Documentation/SCPI_API.tex"
  - id: factory-workflow
    title: "Factory coefficient acquisition, limit checks and writes"
    url: "https://github.com/jankae/LibreCAL/blob/5ff26b504aeb43de66641013e3f3642fbd9f86b7/Software/Scripts/FactoryCoefficients/createFactoryCoefficients.py"
  - id: vna-adapter
    title: "SNA5000A sweep configuration and S-parameter acquisition adapter"
    url: "https://github.com/jankae/LibreCAL/blob/5ff26b504aeb43de66641013e3f3642fbd9f86b7/Software/Scripts/FactoryCoefficients/VNA_Example_SNA5000A/VNA.py"
  - id: license
    title: "Repository license"
    url: "https://github.com/jankae/LibreCAL/blob/5ff26b504aeb43de66641013e3f3642fbd9f86b7/LICENSE"
  - id: release
    title: "LibreCAL v0.3.0 release published in June 2025"
    url: "https://github.com/jankae/LibreCAL/releases/tag/v0.3.0"
---

## Scope and limits

Board is supported by editable KiCad schematics and PCB files plus BOM, Gerber and placement outputs. Control covers selecting open, short, load and through states and accessing temperature and coefficient commands. Each unit needs its own measured standard coefficients; assembling the public design alone does not produce a characterized calibration kit. Changing the temperature target can invalidate the coefficients. [Hardware](#source-hardware) · [Operating requirements](#source-overview) · [SCPI interface](#source-scpi).

Acquisition is supported by the bundled factory-characterization workflow and concrete VNA adapters, not by a receiver inside the calibration module. The script waits for thermal stabilization, guides physical port reconnections, switches standards, triggers fresh VNA sweeps and retrieves complex S-parameters. Its configurable magnitude, phase and delay limits and repeatable measurement sequence support Test. The operator must configure a compatible calibrated VNA and the adapter's frequency range and connections. [Factory workflow](#source-factory-workflow) · [VNA adapter](#source-vna-adapter).

The factory workflow explicitly enables writes, deletes existing factory coefficients and writes replacements. It is a manufacturing/characterization procedure, not a read-only accuracy check for an already calibrated unit. Optional limit checking does not establish traceability or a published uncertainty budget. [Factory workflow](#source-factory-workflow) · [Coefficient protection](#source-scpi).

LibreCAL is independently usable calibration hardware with its own firmware and characterization scripts, so it has a separate entry from the LibreVNA analyzer. It concerns VNA reference planes and S-parameter calibration; it does not measure phase noise or jitter. [Overview](#source-overview).

## Selection and activity

July 2025 coefficient-export compatibility work is followed by the integrated October 2026 macOS build repair, including dependency setup and replacement of unavailable version-extraction commands. These are concrete maintenance changes across separate periods. They support current implementation availability, not a new hardware accuracy claim. [Coefficient fix](#source-earlier-coefficients) · [Build repair](#source-activity).

Maintenance is intermittent. The v0.3.0 release was published in June 2025 and predates the reviewed October 2026 build repair; selecting an older release does not provide that source change. [Tagged release](#source-release) · [Build repair](#source-activity).
