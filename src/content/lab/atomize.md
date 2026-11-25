---
name: "Atomize"
aliases: ["atomize-py"]
description: "Python instrument-control and experiment scripting platform with reusable drivers for frequency counters, temperature controllers, microwave instruments, AWGs and digitizers. Implemented pulsed-measurement procedures coordinate stimulation, acquisition and saved results; hardware-dependent synchronization and argument-checking test mode have separate limits."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Fable is co-credited for the Spectrum M4I clock-register relock guard, clock-output control and widened reference-clock configuration; the digitizer retains the guarded setup implementation."
  sources: [clock-guard, digitizer]
  reviewedAt: "2026-11-25"
access: "MIT public Python source. Requires the selected instruments and compatible drivers; GPIB, Spectrum cards, pulse programmers and optional station packages have separate dependencies."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/Anatoly1010/Atomize"
    purpose: code
  - id: activity
    title: "November 24 ITC503 GPIB temperature-controller implementation"
    url: "https://github.com/Anatoly1010/Atomize/commit/37a638bafc8bf4a03246c81b986fd80d0225b5d7"
  - id: clock-guard
    title: "July 8 clock configuration and PLL-relock guard implementation"
    url: "https://github.com/Anatoly1010/Atomize/commit/308d52d508600e514af7b7e4b66ec668872b07ee"
  - id: digitizer
    title: "Retained guarded reference-clock setup and waveform acquisition"
    url: "https://github.com/Anatoly1010/Atomize/blob/37a638bafc8bf4a03246c81b986fd80d0225b5d7/atomize/device_modules/Spectrum_M4I_4450_X8.py"
  - id: counter
    title: "Retained frequency-counter driver"
    url: "https://github.com/Anatoly1010/Atomize/blob/37a638bafc8bf4a03246c81b986fd80d0225b5d7/atomize/device_modules/Agilent_53131a.py"
  - id: temperature
    title: "Retained temperature-controller communication and setpoint API"
    url: "https://github.com/Anatoly1010/Atomize/blob/37a638bafc8bf4a03246c81b986fd80d0225b5d7/atomize/device_modules/ITC_503.py"
  - id: procedure
    title: "Executable AWG and digitizer pulse-scan procedure"
    url: "https://github.com/Anatoly1010/Atomize/blob/37a638bafc8bf4a03246c81b986fd80d0225b5d7/atomize/script_examples/pulse_epr/awg/digitizer/01_t2_digitizer_baseline_two_experiments_test.py"
  - id: protocol-tests
    title: "Offline temperature-controller command and response tests"
    url: "https://github.com/Anatoly1010/Atomize/blob/37a638bafc8bf4a03246c81b986fd80d0225b5d7/tests/test_lakeshore_335.py"
  - id: overview
    title: "Instrument, station and test-mode boundaries"
    url: "https://github.com/Anatoly1010/Atomize/blob/37a638bafc8bf4a03246c81b986fd80d0225b5d7/readme.md"
  - id: website
    title: "Project documentation"
    url: "https://anatoly1010.github.io/atomize_docs/"
    purpose: official
---

## Scope and limits

The distinct workflow combines microwave and pulsed measurement instruments under Python scripts with reusable acquisition and timing controls. The reviewed pulse-scan example configures a pulse programmer, AWG and digitizer, shifts stimulus timing, acquires phase-cycled traces and saves the results with experiment metadata. This supports Test beyond generic transport and driver APIs. The frequency-counter and temperature-controller modules are separate control/acquisition endpoints, not a demonstrated automated oscillator temperature-sweep recipe. The station and optional treatment tools have separate repositories and are not counted as independent capabilities of the core. [Procedure](#source-procedure) · [Counter](#source-counter) · [Temperature](#source-temperature) · [Overview](#source-overview).

## Reviewed maintenance and provenance

July 8 introduces guarded Spectrum M4I clock-register writes to avoid unnecessary PLL relocks, AWG clock output and wider digitizer reference-clock settings; the retained digitizer checks existing register values. The maintainer reports that repeated PLL relocks had caused sporadic relative phase shifts. This is a specific synchronization mitigation, not a guarantee of deterministic phase or specified timing accuracy. November 24 adds GPIB transport support to ITC503; separate offline tests cover Lakeshore temperature-controller commands and parsing. Built-in argument-checking test mode and fake transport tests are not hardware qualification. The attributed July change supports AI-assisted development. No instruments or example procedures were independently run. [Clock change](#source-clock-guard) · [Digitizer](#source-digitizer) · [November change](#source-activity) · [Protocol tests](#source-protocol-tests).
