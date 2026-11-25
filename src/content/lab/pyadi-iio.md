---
name: "pyadi-iio"
aliases: ["ADI Python IIO","Analog Devices evaluation board control"]
description: "Python interfaces for Analog Devices hardware with IIO drivers, including RF transceivers, ADCs, DACs and clock or synthesizer devices. Device-specific classes expose settings and buffered measurements over supported IIO connections; hardware capabilities and driver versions determine available operations."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "ADI source license restricts use to connections to or operation on Analog Devices components; requires compatible hardware and IIO support."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://analogdevicesinc.github.io/pyadi-iio/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/analogdevicesinc/pyadi-iio"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/analogdevicesinc/pyadi-iio/commit/9a0ec238de6824adfd2c3ae69e3df1e49e6d1972"
  - id: calibration
    title: "August CN0540 ADC offset calibration routine"
    url: "https://github.com/analogdevicesinc/pyadi-iio/commit/b0aed5621c25623d1679858c788eaf9089239584"
  - id: dds
    title: "October DDS tone-selection change"
    url: "https://github.com/analogdevicesinc/pyadi-iio/commit/2610a0222b66da33a307fe1dc5a743d3d011c240"
  - id: clock-device
    title: "HMC7044 clock-device settings and phase controls"
    url: "https://github.com/analogdevicesinc/pyadi-iio/blob/4870d1f43c195e8483ac11a47cb8e51a3a1fafff/adi/hmc7044.py"
  - id: synthesizer
    title: "ADF4377 synthesizer control implementation"
    url: "https://github.com/analogdevicesinc/pyadi-iio/blob/4870d1f43c195e8483ac11a47cb8e51a3a1fafff/adi/adf4377.py"
  - id: license
    title: "Source reuse and device-use restrictions"
    url: "https://github.com/analogdevicesinc/pyadi-iio/blob/4870d1f43c195e8483ac11a47cb8e51a3a1fafff/LICENSE"
  - id: overview
    title: "Device-specific Python API and libiio dependency"
    url: "https://github.com/analogdevicesinc/pyadi-iio/blob/4870d1f43c195e8483ac11a47cb8e51a3a1fafff/README.md"
---

## Scope and limits

The library adds part-specific operations to the generic libiio context and buffer interface. The HMC7044 class exposes channel frequency and phase settings and SYSREF-related controls; the ADF4377 class exposes synthesizer frequency and output settings. These are device controls, not independently measured output frequency, phase or jitter. Buffered readout is supported by the converter and transceiver interfaces. [Clock-device code](#source-clock-device) · [Synthesizer code](#source-synthesizer) · [IIO interface](#source-overview).

The ADI license limits software use to ADI components. Confirm compatible IIO drivers and bindings for the chosen board and library revision; this entry is not a generic open-source replacement for the hardware or a calibrated instrument. [License](#source-license).

## Reviewed maintenance

August 2026 restores the CN0540 offset calibration sequence. October adds exclusive/nonexclusive DDS tone configuration and AD9088 device support, including an emulation mapping. These are distinct device-specific implementation changes, not just updates to the common IIO transport. No separate Test Automation scope is inferred from the internal calibration or repository regression fixtures. [Calibration sequence](#source-calibration) · [DDS change](#source-dds) · [AD9088 integration](#source-activity).
