---
name: "Crucible"
aliases: []
description: "Rust virtual-instrument runtime that serves SCPI devices described in YAML over TCP sockets or VXI-11, allowing test software to exercise network sessions without instruments. It preserves device state across connections; the reviewed runtime supports text responses and omits binary waveforms, timing models and inter-instrument coupling."
scope:
  test: { ai: false }
access: "Apache-2.0; no physical instrument required. VXI-11 discovery requires permission to bind UDP port 111."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official Crucible user manual"
    url: "https://anlaco.github.io/Crucible/"
    purpose: official
  - id: code
    title: "Canonical virtual-instrument runtime"
    url: "https://github.com/anlaco/Crucible"
    purpose: code
  - id: activity
    title: "Correct VXI-11 device dispatch, partial reads and portmapper setup"
    url: "https://github.com/anlaco/Crucible/commit/ebbf9f29605286fe2d7fb5547b8a71772b37b603"
  - id: prior-vxi11
    title: "Initial VXI-11 and ONC RPC portmapper implementation"
    url: "https://github.com/anlaco/Crucible/commit/27a2907eb270bf49dbfa898f6e9e2aee6109ee39"
  - id: startup
    title: "Bench and single-profile execution entry points"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/docs/manual/en/03-first-start.md"
  - id: connection
    title: "Client connections, resource strings and VXI-11 host requirements"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/docs/manual/en/04-connecting.md"
  - id: tcp-server
    title: "Production TCP listener and shared device-state dispatch"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/crates/crucible/src/lib.rs"
  - id: vxi11-core
    title: "VXI-11 named-device links, read/write and pending-response handling"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/crates/crucible-vxi11/src/core.rs"
  - id: portmapper
    title: "UDP ONC RPC portmapper implementation and socket tests"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/crates/crucible-vxi11/src/portmap.rs"
  - id: tcp-tests
    title: "Real-socket SCPI and reconnection regressions"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/crates/crucible/tests/smoke_scpi.rs"
  - id: vxi11-tests
    title: "Real-socket RPC dispatch, separate links and short-read regressions"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/crates/crucible/tests/smoke_vxi11.rs"
  - id: limitations
    title: "Implemented protocol, response and timing boundaries"
    url: "https://github.com/anlaco/Crucible/blob/bb110c8c669e98cf93876f6b87def24f30b0c4f6/docs/manual/en/11-limitations.md"
  - id: pyvisa-sim
    title: "Related PyVISA simulation-backend approach"
    url: "https://github.com/pyvisa/pyvisa-sim"
---

## Selection and scope

Crucible provides network endpoints for developing instrument drivers and bench sequences without attached instruments. It loads a bench or device profile, accepts SCPI requests and retains simulated device state across connections. The reusable workflow is exercising a client's actual socket or VXI-11 communication path against controlled responses. Test Automation follows that virtual-instrument fixture, rather than physical Control or Acquisition. [Startup](#source-startup) · [TCP runtime](#source-tcp-server) · [VXI-11 runtime](#source-vxi11-core).

This adds a different integration boundary from the retained PyVISA-sim backend. PyVISA-sim substitutes the Python VISA backend; Crucible instead listens on network protocols that compatible clients can address through their existing transport implementation. Driver addresses/resource strings and profile commands still need configuration. The manual shows PyVISA connections but labels NI MAX and LabVIEW instructions unverified, so this entry does not claim universal client compatibility. [Connection guide](#source-connection) · [Related backend](#source-pyvisa-sim).

The published tests start the production TCP or VXI-11 server on real local sockets. They check SCPI state and reconnection, named-device routing, isolation between links, rejection of unknown device names, partial reads and clearing unread replies. Portmapper tests exercise UDP request/reply behavior separately. These are inspectable regression assets; they were not executed during this catalog review. [TCP tests](#source-tcp-tests) · [VXI-11 tests](#source-vxi11-tests) · [Portmapper](#source-portmapper).

## Use and limits

The reviewed CLI supports SCPI over TCP sockets and VXI-11. The manual excludes binary blocks, waveforms, screenshots, delayed operations and simulated timeouts, and its instruments do not exchange simulated signals. Broader README descriptions of coupled benches or other protocols do not establish those capabilities in this runtime. Use it for the text-command and connection behavior represented by a profile, with separate validation for actual instruments and timing-sensitive or waveform-transfer paths. [Current limitations](#source-limitations).

VXI-11 discovery needs a portmapper on UDP 111 and the necessary host permission. The manual describes different loopback-address arrangements on Linux and Windows. [Connection requirements](#source-connection) · [Portmapper implementation](#source-portmapper).

## Reviewed maintenance

The September 2026 VXI-11 implementation is followed by a correction that routes each link to the requested device, distinguishes partial-response completion flags and clears pending data correctly. The integration includes real-socket regressions for those failures. The subsequent documentation commits are not the meaningful-activity checkpoint. [Initial implementation](#source-prior-vxi11) · [Reviewed correction](#source-activity).
