---
name: "Lab Instrument Control"
aliases: ["lab-instrument-control", "BINDER MK53 thermal characterization"]
description: "Python instrument drivers and pytest procedures coordinating a BINDER MK53 climate chamber, bench power supply and digital multimeter for controlled-temperature DUT voltage tests. A separate LCR-meter driver exposes impedance measurements, correction settings and list sweeps; the thermal procedure tests a configured temperature, not an automatic multi-temperature characterization campaign."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Sonnet is co-credited for implementing the Keysight E4980A LCR-meter driver and extending the electrical/thermal test workflow. The driver remains in the reviewed repository."
  sources: [june, lcr]
  reviewedAt: "2026-11-25"
access: "Public Python source; no repository-wide reuse license was found. The separate BINDER driver repository states MIT. Requires compatible chamber, serial adapter and bench instruments with the appropriate VISA backend."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical lab instrument and thermal test implementation"
    url: "https://github.com/daskals/lab-instrument-control"
    purpose: code
  - id: activity
    title: "September 23 communication and driver correctness fixes with offline tests"
    url: "https://github.com/daskals/lab-instrument-control/commit/4c05492e63b7438cba7dc5143fa8216d05ede64a"
  - id: june
    title: "June 24 LCR driver implementation and thermal test extension"
    url: "https://github.com/daskals/lab-instrument-control/commit/f2f6d5ea18bf2290758a9444b671c54f6cdb890b"
  - id: chamber
    title: "Retained Modbus chamber control and stability wait"
    url: "https://github.com/daskals/lab-instrument-control/blob/601a287e3c1fa6d1022b01bf8a6030a6f377479a/Python_Drivers/mk53_driver.py"
  - id: fixtures
    title: "Retained pytest instrument and chamber-conditioning fixtures"
    url: "https://github.com/daskals/lab-instrument-control/blob/601a287e3c1fa6d1022b01bf8a6030a6f377479a/conftest.py"
  - id: thermal-test
    title: "Retained DUT voltage and temperature test procedure"
    url: "https://github.com/daskals/lab-instrument-control/blob/601a287e3c1fa6d1022b01bf8a6030a6f377479a/tests/test_thermal_voltage.py"
  - id: lcr
    title: "Retained LCR meter driver and correction operations"
    url: "https://github.com/daskals/lab-instrument-control/blob/601a287e3c1fa6d1022b01bf8a6030a6f377479a/Python_Drivers/e4980a_driver.py"
  - id: offline-tests
    title: "Retained offline chamber communication and limit tests"
    url: "https://github.com/daskals/lab-instrument-control/blob/601a287e3c1fa6d1022b01bf8a6030a6f377479a/unit_tests/test_mk53_driver.py"
  - id: companion
    title: "Related standalone BINDER driver and its license"
    url: "https://github.com/daskals/binder-mk53-rs422-control"
  - id: related-espec
    title: "Related ESPEC SH241 chamber scheduling implementation"
    url: "https://github.com/vincesum/ESPEC-Temperature-Control-UI/blob/40881a974b48864b75e464d72452c1a3f6a51a73/src/ESPEC.py"
  - id: related-espec-cycling
    title: "Related chamber cycling and monitoring implementation"
    url: "https://github.com/vincesum/ESPEC-Temperature-Control-UI/commit/2adb1b1244c9e01dc84137051c3f9f21fa8782d2"
  - id: related-espec-serial
    title: "Related serial transport and device detection"
    url: "https://github.com/vincesum/ESPEC-Temperature-Control-UI/blob/40881a974b48864b75e464d72452c1a3f6a51a73/src/UART.py"
  - id: related-espec-release
    title: "Related ESPEC UI v1.1 release"
    url: "https://github.com/vincesum/ESPEC-Temperature-Control-UI/releases/tag/v1.1"
  - id: mirror-policy
    title: "Maintainer declaration and one-way lab organization mirroring"
    url: "https://github.com/daskals/lab-instrument-control/commit/601a287e3c1fa6d1022b01bf8a6030a6f377479a"
  - id: organization-mirror
    title: "Lab organization copy of the canonical project"
    url: "https://github.com/Microwave-Antenna-Engineering-Group-HWU/lab-instrument-control"
---

## Scope and limits

This project adds a specific multi-instrument temperature-conditioning test workflow beyond generic VISA or pytest integration. The chamber driver handles Modbus communication and checks a temperature stability interval; session fixtures configure and power the DUT and check supply and output voltage at a configured temperature. The LCR driver independently exposes measurements and instrument correction settings. A chamber readback does not establish DUT junction temperature or the accuracy of the physical measurement setup. The existing test does not perform multi-temperature frequency calibration, and a separate setup script intentionally leaves instruments running. Hardware interlocks and test-state cleanup must be evaluated for the actual fixture. [Chamber driver](#source-chamber) · [Fixtures](#source-fixtures) · [Test procedure](#source-thermal-test) · [LCR driver](#source-lcr).

## Reviewed maintenance and provenance

June 24 adds the LCR driver and extends the powered DUT test with attributed Claude development. September 23 corrects DMM limit-status interpretation and restoration of triggering settings, power-supply regulation-mode handling, and chamber communication, setpoint checks and retries, with offline tests. The following mirror automation commit is raw activity only. The standalone chamber repository shares the driver lineage and is linked rather than listed as another independent workflow. Its MIT license does not establish a license for the whole lab repository. No physical instrument tests or offline regression were independently run. [June implementation](#source-june) · [September repairs](#source-activity) · [Offline tests](#source-offline-tests) · [Companion](#source-companion).

## Reviewed implementation and retention, November 25, 2026

A separate ESPEC Temperature Control UI project provides SH241 serial control, temperature monitoring, soak scheduling and two-temperature cycling. The March cycling implementation and April connection corrections demonstrate real follow-through, but the reviewed public history has no further technical change after April 27, no other branch or PR, and v1.1 was published April 29. The narrow chamber-only workflow has limited additional discovery value alongside this broader temperature-conditioned DUT measurement entry, so it is retained as a related implementation rather than an independent catalog row. It does not acquire DUT electrical characteristics or establish qualification verdicts. The ESPEC code, license status, device support and activity are separate from Lab Instrument Control; the two projects do not depend on one another. No repository-wide reuse license was established for the ESPEC code. [Chamber control](#source-related-espec) · [Cycling](#source-related-espec-cycling) · [Serial interface](#source-related-espec-serial) · [Release](#source-related-espec-release).

Source inspection only; no physical test, regression or instrument run was independently reproduced.

## November 28, 2026 implementation review

The latest master commit documents the maintainer's repository as the issue and contribution destination and configures a one-way push to the lab organization copy. Both reviewed default heads are the same commit. Keep only the maintainer repository as the canonical implementation; the mirror is not another project or independent activity record. The September driver repairs remain the meaningful checkpoint. [Mirror policy](#source-mirror-policy) · [Organization copy](#source-organization-mirror).
