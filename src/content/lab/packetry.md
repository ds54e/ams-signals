---
name: "Packetry"
aliases: []
description: "Rust application for capturing USB 2.0 traffic with Cynthion and inspecting saved PCAP/PCAPNG recordings as packets, transactions and descriptors. It includes supported VBUS power control and an executable Cynthion self-test; live capture requires compatible analyzer hardware and firmware."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "BSD-3-Clause application; live acquisition and hardware self-tests require a supported Cynthion setup."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official Packetry documentation"
    url: "https://packetry.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical Rust application"
    url: "https://github.com/greatscottgadgets/packetry"
    purpose: code
  - id: activity
    title: "Adapt capture-file implementation to upstream pcap-file APIs"
    url: "https://github.com/greatscottgadgets/packetry/commit/75eb7a7fd833b51449b3acf6a3c3379606b06580"
  - id: index-fix
    title: "Fix incomplete final capture-index segment iteration"
    url: "https://github.com/greatscottgadgets/packetry/commit/ff0ba5f4c2671fc431d836169ab215902cfa87e1"
  - id: quick-start
    title: "Installation and live Cynthion or saved-file entry points"
    url: "https://github.com/greatscottgadgets/packetry/blob/f63dc4a893e9f33649372229d36c8297e6c004d5/docs/source/quick_start.rst"
  - id: capture-control
    title: "Cynthion capture, speed selection and VBUS control backend"
    url: "https://github.com/greatscottgadgets/packetry/blob/f63dc4a893e9f33649372229d36c8297e6c004d5/src/backend/cynthion.rs"
  - id: file-io
    title: "PCAP and PCAPNG loaders and savers"
    url: "https://github.com/greatscottgadgets/packetry/blob/f63dc4a893e9f33649372229d36c8297e6c004d5/src/file.rs"
  - id: decoder
    title: "USB transaction and endpoint decoding"
    url: "https://github.com/greatscottgadgets/packetry/blob/f63dc4a893e9f33649372229d36c8297e6c004d5/src/decoder.rs"
  - id: interface
    title: "Packet, transaction, device and descriptor views"
    url: "https://github.com/greatscottgadgets/packetry/blob/f63dc4a893e9f33649372229d36c8297e6c004d5/docs/source/user_interface.rst"
  - id: test-entry
    title: "Executable Cynthion test and save-capture options"
    url: "https://github.com/greatscottgadgets/packetry/blob/f63dc4a893e9f33649372229d36c8297e6c004d5/src/main.rs"
  - id: hardware-test
    title: "Physical USB capture, byte comparison and SOF timing checks"
    url: "https://github.com/greatscottgadgets/packetry/blob/f63dc4a893e9f33649372229d36c8297e6c004d5/src/testing.rs"
---

## Selection and scope

Packetry adds USB protocol debugging between a host and peripheral using Cynthion, with a Rust capture backend and transaction-oriented frontend. It can help inspect evaluation-board enumeration, control requests and data transfers. Its independent saved-capture loader also permits analysis without attached hardware, rather than only exporting a live trace. [Getting started](#source-quick-start) · [Capture files](#source-file-io) · [Decoder](#source-decoder).

Control follows analyzer configuration and supported VBUS power switching. Acquisition follows the physical USB stream, and Analysis follows saved-file decoding and packet, transaction and device views. These operations complement the general board interfaces in Glasgow; neither project's hardware or history is attributed to the other. [Capture/control backend](#source-capture-control) · [Views](#source-interface).

Test Automation follows the exposed `--test-cynthion` path. It enables the analyzer's test device, captures traffic at low/full/high speeds with explicit and automatic speed selection, compares captured payload bytes with received bytes and checks SOF timing/counts where applicable. Failures produce a nonzero exit, and an option saves the captures. [CLI entry](#source-test-entry) · [Hardware test](#source-hardware-test).

## Use and limits

Live acquisition and self-tests require compatible Cynthion hardware, firmware and connections. Existing capture files can be opened without the analyzer. The USB 2.0 protocol view concerns decoded digital traffic; it does not provide analog eye, phase-noise or electrical-compliance measurements. Descriptor details can require observing device enumeration, so capture setup matters. [Setup](#source-quick-start) · [Enumeration and views](#source-interface).

The source and regression review establishes implemented operations, not measured capture accuracy or completion of the hardware self-test on an available bench.

## Reviewed maintenance

The July 2026 fix handles a capture-index segment that has a base value but no width entry and adds a regression reproducing it. The August integration ports PCAP/PCAPNG code to upstream pcap-file APIs; this is implementation compatibility work, beyond a manifest-only version bump. Later CI and dependency changes are not used as the meaningful-activity checkpoint. [Index correctness fix](#source-index-fix) · [Reviewed capture-file compatibility](#source-activity).
