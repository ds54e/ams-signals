---
name: "Statime"
aliases: ["Rust PTP", "IEEE 1588-2019"]
description: "Rust Precision Time Protocol implementation for ordinary and boundary clocks, with PTP timestamp-based offset and delay measurements and clock steering. Provides a Linux daemon with hardware and software timestamp handling and an STM32 embedded integration example."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "MIT OR Apache-2.0; requires a suitable PTP network, platform clock and timestamping support. Hardware timestamp accuracy and path asymmetry require independent characterization."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical PTP implementation"
    url: "https://github.com/pendulum-project/statime"
    purpose: code
  - id: activity
    title: "November oversized path-trace handling correction"
    url: "https://github.com/pendulum-project/statime/commit/8cbcec2d4155c3969077f6343c53969f40688fd9"
  - id: earlier
    title: "September slave-only port state and dataset regression"
    url: "https://github.com/pendulum-project/statime/commit/c894331f191dc18e88a43a6aa781a2464c147c42"
  - id: regression
    title: "November oversized path-trace regression"
    url: "https://github.com/pendulum-project/statime/commit/fe4d6ab66ceda5b6b8a9b58ad0bbac0b783b8b97"
  - id: measurement
    title: "Retained PTP measurement and timestamp fields"
    url: "https://github.com/pendulum-project/statime/blob/fe8cb88fa4fe5f13241d23a3d26c00f195044c33/statime/src/port/measurement.rs"
  - id: linux
    title: "Retained Linux clock and timestamp conversion implementation"
    url: "https://github.com/pendulum-project/statime/blob/fe8cb88fa4fe5f13241d23a3d26c00f195044c33/statime-linux/src/clock/mod.rs"
  - id: embedded
    title: "Retained STM32 Ethernet timestamp and frequency steering integration"
    url: "https://github.com/pendulum-project/statime/blob/fe8cb88fa4fe5f13241d23a3d26c00f195044c33/statime-stm32/src/ptp_clock.rs"
---

## Scope and limits

Statime implements PTP message and clock-state handling using platform clock abstractions. The measurement structure carries offset, delay, peer delay and event time; the Linux clock implementation supports timestamp conversion and clock stepping and frequency adjustment, while the STM32 example connects the abstraction to Ethernet PTP hardware. This is an interoperable timing-control and timestamp-measurement component, distinct from the GNSS-referenced Time Card hardware and GPSDO firmware already cataloged. It is not an oscilloscope trigger-distribution system, a phase-noise analyzer or evidence of picosecond-level synchronization. [PTP measurements](#source-measurement) · [Linux clock](#source-linux) · [Embedded clock](#source-embedded).

## Reviewed maintenance

September 15 fixes the slave-only port state handling assertion and adds a state/dataset regression. November 20 adds a regression and corrects oversized path-trace handling to avoid a capacity failure. These changes address protocol behavior after the initial releases, not just dependency updates. No protocol conformance campaign or physical timing comparison was independently reproduced. [September change](#source-earlier) · [November regression](#source-regression) · [Retained correction](#source-activity).
