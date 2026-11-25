---
name: "MSL Equipment"
aliases: ["msl-equipment", "Measurement Standards Laboratory equipment"]
description: "Python equipment register and instrument interface toolkit for testing and calibration laboratories. Associates equipment identities with connection configurations and calibration records, including report dates, reference intervals, equations and tables; provides instrument resources and a recalibration web interface."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "MIT repository license; install from source as documented at the reviewed head. Instrument resources require compatible equipment and, where applicable, separately installed vendor SDKs."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public equipment toolkit"
    url: "https://github.com/MSLNZ/msl-equipment"
    purpose: code
  - id: activity
    title: "November 4 HighFinesse instrument resource and examples"
    url: "https://github.com/MSLNZ/msl-equipment/commit/1b7c9fc4dfd2a26a92470d5ab494fae14b97034b"
  - id: date-fix
    title: "April calibration start and stop reference-date correction"
    url: "https://github.com/MSLNZ/msl-equipment/commit/a9441fcca754d828ac2a062d56c5ee0938e39935"
  - id: schema
    title: "Retained equipment, reports, calibration equations and connections"
    url: "https://github.com/MSLNZ/msl-equipment/blob/b8dc71d13a068d151aa26278244ae957ea173f55/src/msl/equipment/schema.py"
  - id: configuration
    title: "Retained equipment configuration and register access"
    url: "https://github.com/MSLNZ/msl-equipment/blob/b8dc71d13a068d151aa26278244ae957ea173f55/src/msl/equipment/config.py"
  - id: instrument
    title: "Retained HighFinesse wavelength-meter resource"
    url: "https://github.com/MSLNZ/msl-equipment/blob/b8dc71d13a068d151aa26278244ae957ea173f55/packages/resources/src/msl/equipment_resources/high_finesse/wlm.py"
  - id: recalibrations
    title: "Retained recalibration table and export interface"
    url: "https://github.com/MSLNZ/msl-equipment/blob/b8dc71d13a068d151aa26278244ae957ea173f55/packages/webapp/src/msl/equipment_webapp/pages/recalibrations.py"
---

## Scope and limits

The equipment register separates an instrument's identity and connection details from calibration reports, measurement conditions and recalibration intervals. Reports can hold equations, numerical tables, serialized data and file references; configuration and resource objects support physical instrument access. The recalibration interface reads and exports due-date information. This combines instrument connectivity with calibration-record interpretation rather than only adding another VISA transport. It complements Suncal's measurement-model uncertainty calculations and QCoDeS' measurement execution and dataset recording. [Equipment schema](#source-schema) · [Configuration](#source-configuration) · [Recalibrations](#source-recalibrations).

The HighFinesse resource targets optical wavelength-meter and laser-spectrum-analyzer hardware with a vendor SDK. This does not establish RF oscillator calibration capability or metrological traceability without a suitable measurement procedure, valid standards and calibration records. No instrument or calibration result was independently verified. [Instrument resource](#source-instrument).

## Reviewed maintenance

April 8 corrects the calibration reference-date selection in XML serialization and latest-report processing. November 4 adds HighFinesse instrument resources and measurement examples. Both the calibration-data model and the new resource remain at the reviewed head. November documentation and dependency changes are not used as meaningful implementation evidence. [Reference-date correction](#source-date-fix) · [Resource integration](#source-activity).
