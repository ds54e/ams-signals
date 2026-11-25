---
name: "Stabilizer"
aliases: ["Sinara Stabilizer", "QUARTIQ Stabilizer"]
description: "Rust firmware and host tools for Sinara Stabilizer ADC/DAC hardware, including configurable filters, lock-in detection and phase/frequency feedback with optional Pounder RF hardware. MQTT settings, UDP sample streaming and executable loopback tests support bench control and verification; suitable hardware and wiring are required."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  test: { ai: false }
access: "Apache-2.0 firmware and host tools; Sinara Stabilizer hardware is required and RF applications can require Pounder."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official Stabilizer documentation"
    url: "https://quartiq.de/stabilizer"
    purpose: official
  - id: code
    title: "Canonical firmware and host tools"
    url: "https://github.com/quartiq/stabilizer"
    purpose: code
  - id: activity
    title: "Correct the second channel's RF power measurement"
    url: "https://github.com/quartiq/stabilizer/commit/12183c8ac5e25c92e5ac468877d65d438e066a0b"
  - id: fls-iteration
    title: "Phase/frequency processing and streaming implementation update"
    url: "https://github.com/quartiq/stabilizer/commit/e72de4d97cf1f6ba47cf94a91387d010f454db55"
  - id: overview
    title: "Firmware applications and separate hardware repositories"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/book/src/overview.md"
  - id: setup
    title: "Firmware build, programming and bench setup"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/book/src/setup.md"
  - id: usage
    title: "Settings, telemetry and best-effort UDP streaming"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/book/src/usage.md"
  - id: lockin
    title: "Implemented lock-in application and ADC/DAC stream"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/src/bin/lockin.rs"
  - id: fls
    title: "Implemented phase/frequency measurement and feedback application"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/src/bin/fls.rs"
  - id: hitl-setup
    title: "Hardware-in-the-loop setup and private hosted fixture boundary"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/hitl/README.md"
  - id: hitl-entry
    title: "Executable loopback and stream test sequence"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/hitl/run.sh"
  - id: loopback
    title: "Physical ADC/DAC loopback settings, telemetry and tolerance checks"
    url: "https://github.com/quartiq/stabilizer/blob/5d7a40dc960a01bd93f0bbd6a86850f5f6265e45/hitl/loopback.py"
  - id: maintenance-earlier
    title: "February 2026 MPLL firmware and host-stream integration"
    url: "https://github.com/quartiq/stabilizer/commit/df06d66544ae617c03d90da5d92b6afeae887cce"
  - id: firmware-release
    title: "Stabilizer v0.11.0 firmware release published in December 2024"
    url: "https://github.com/quartiq/stabilizer/releases/tag/v0.11.0"
---

## Selection and scope

Stabilizer supplies an embedded measurement and feedback implementation, beyond a collection of DSP algorithms or a generic instrument transport. The supplied applications configure real ADC/DAC paths, digital filters, lock-in demodulation and phase/frequency feedback. The FLS application uses the Pounder RF frontend for phase measurement and controlled RF output. This adds a configurable bench servo to the timing-card discipline and host-side spectral-analysis workflows already cataloged. [Application overview](#source-overview) · [Lock-in implementation](#source-lockin) · [Phase/frequency implementation](#source-fls).

Control follows configurable processing and output paths, and Acquisition follows hardware samples and telemetry streamed to the host. Calculations used only by the embedded feedback loop belong to Control; they do not alone establish a separate user-facing Analysis operation. Board designs are maintained separately and do not supply Design scope to this firmware listing. [Settings and streams](#source-usage) · [Hardware separation](#source-overview).

Test follows the public hardware-in-the-loop scripts. The loopback procedure sets gains and PID parameters, reads ADC telemetry and checks the measured value against a tolerance at several setpoints. The shell entry also invokes a stream test. These are executable physical checks rather than ordinary software unit tests. [Test entry](#source-hitl-entry) · [Loopback procedure](#source-loopback).

## Use and limits

Choose and build the required firmware application, program the supported Sinara hardware and configure its USB/network/MQTT settings. The loopback test requires the documented ADC-to-DAC wiring and no mezzanine. QUARTIQ's hosted fixture is accessed through a private repository; published scripts do not grant access or independently verify that fixture's results. [Setup](#source-setup) · [HITL boundary](#source-hitl-setup).

UDP streams and MQTT telemetry use best-effort delivery. Application timing figures and RF measurements require suitable hardware, clocks, calibration and wiring; this source review does not validate a phase-noise floor, closed-loop stability or measurement accuracy. [Streaming limits](#source-usage) · [Application implementation](#source-fls).

## Reviewed maintenance

The February 2026 integration adds MPLL processing and its host stream format. March work updates the phase/frequency application, followed in April by a correction that reads the second channel's RF power from its own input. These are successive default-branch firmware and measurement changes. [MPLL integration](#source-maintenance-earlier) · [Phase/frequency iteration](#source-fls-iteration) · [Measurement fix](#source-activity).

The reviewed default branch has no later implementation change after April 2026. Its maintenance is intermittent, and the v0.11.0 firmware release from December 2024 predates these changes. Build the required reviewed revision when using the newer applications or fixes. [Firmware release](#source-firmware-release) · [Reviewed setup](#source-setup).
