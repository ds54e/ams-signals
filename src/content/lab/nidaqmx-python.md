---
name: "NI-DAQmx Python"
aliases: [nidaqmx, nidaqmx-python]
description: "Official Python interface for configuring NI DAQ channels, hardware clocks and triggers, generating outputs and acquiring buffered analog, digital and counter data. It supports local NI-DAQmx and optional gRPC access; synchronized tasks, waveform reads and logging require compatible NI hardware and separately installed driver components."
scope:
  control: { ai: false }
  acquisition: { ai: false }
access: "MIT Python wrapper. The separately distributed NI-DAQmx driver and supported hardware are required for physical measurements; simulated devices are also supported. Optional remote access requires the gRPC components and an appropriate server."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: official
    title: "Official NI-DAQmx Python documentation"
    url: "https://nidaqmx-python.readthedocs.io/en/stable/"
    purpose: official
  - id: code
    title: "Canonical NI-DAQmx Python implementation"
    url: "https://github.com/ni/nidaqmx-python"
    purpose: code
  - id: readme
    title: "Driver requirements, task model and logging boundaries"
    url: "https://github.com/ni/nidaqmx-python/blob/ca7ff414aeb98eda788f2bae2b53fdda816cd82a/README.rst"
  - id: task
    title: "Task read, write, waveform and lifecycle implementation"
    url: "https://github.com/ni/nidaqmx-python/blob/ca7ff414aeb98eda788f2bae2b53fdda816cd82a/src/handwritten/task/_task.py"
  - id: timing
    title: "Sample-clock and reference-clock configuration"
    url: "https://github.com/ni/nidaqmx-python/blob/ca7ff414aeb98eda788f2bae2b53fdda816cd82a/generated/nidaqmx/task/_timing.py"
  - id: synchronization
    title: "Analog input and output with a shared start trigger"
    url: "https://github.com/ni/nidaqmx-python/blob/ca7ff414aeb98eda788f2bae2b53fdda816cd82a/examples/synchronization/multi_function/ai_ao_sync.py"
  - id: shared-clock
    title: "Analog-input and counter acquisition sharing the sample clock"
    url: "https://github.com/ni/nidaqmx-python/blob/ca7ff414aeb98eda788f2bae2b53fdda816cd82a/examples/synchronization/multi_function/cont_ai_ci_tdms_sync.py"
  - id: license
    title: "Python-wrapper license"
    url: "https://github.com/ni/nidaqmx-python/blob/ca7ff414aeb98eda788f2bae2b53fdda816cd82a/LICENSE"
  - id: activity
    title: "Repair package-version lookup in frozen Python executables"
    url: "https://github.com/ni/nidaqmx-python/commit/77a0ed807ecec28a7d224428b0650154765f249a"
  - id: earlier-maintenance
    title: "Release waveform support and update executable acquisition examples"
    url: "https://github.com/ni/nidaqmx-python/commit/41498b0327a4cfaa7640e83894369c756f50a1b6"
  - id: recorded-data
    title: "Separate npTDMS implementation for saved-record processing"
    url: "https://github.com/adamreeve/npTDMS"
---

### Scope and operating boundaries

Task operations reach the NI-DAQmx interpreter for channel reads, waveform transfers, output writes and lifecycle control. The timing API configures device sample and reference clocks; the examples implement a shared AI/AO start trigger and an AI sample clock routed to a counter task. These are Control and Acquisition operations. Their availability and actual timing depend on the device, terminal routes and installed driver version. The examples were inspected, not executed on NI hardware. [Task implementation](#source-task); [Timing](#source-timing); [Start trigger](#source-synchronization); [Shared sample clock](#source-shared-clock).

This entry supplies a hardware-specific DAQ task API, separately from VISA instrument messaging. The shared-clock example assumes one synchronized device and explains the extra routing needed across devices. Its TDMS persistence uses npTDMS, which has its own saved-record Analysis listing. Routine task loops and package tests do not establish a separate Test Automation workflow here. [Dependencies and logging](#source-readme); [Shared-clock example](#source-shared-clock); [npTDMS](#source-recorded-data).

### Selection

The reviewed history includes released waveform support and executable acquisition-example updates in December 2025, followed by a concrete frozen-executable import repair and regression test in November 2026. The activity checkpoint uses that repair rather than later package and workflow updates. The open Python wrapper does not include the separately installed NI-DAQmx driver. [Earlier implementation](#source-earlier-maintenance); [Current maintenance](#source-activity); [License](#source-license).
