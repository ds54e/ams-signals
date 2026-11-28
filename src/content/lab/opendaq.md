---
name: "openDAQ"
description: "SDK for discovering and configuring compatible DAQ devices, receiving timestamped signal streams and building processing graphs in C++ or Python. Native configuration/streaming modules and bundled WAV replay/FFT blocks cover acquisition and recorded-signal analysis; physical access depends on a compatible device module and its driver, transport and synchronization capabilities."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is co-credited for correcting mDNS discovery shutdown order so a service thread stops before its root device is released. The retained instance and discovery-server implementations preserve that change."
  sources: [development, instance, discovery]
  reviewedAt: "2026-11-24"
access: "Apache-2.0 SDK. Physical measurements require a compatible device module, DAQ hardware and any separately licensed drivers; bundled reference devices can generate synthetic signals. WAV replay uses the optional audio module and a working miniaudio playback backend."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: official
    title: "openDAQ project"
    url: "https://opendaq.com/"
    purpose: official
  - id: code
    title: "Canonical openDAQ SDK implementation"
    url: "https://github.com/openDAQ/openDAQ"
    purpose: code
  - id: readme
    title: "SDK purpose, native dependencies and device integration"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/README.md"
  - id: control
    title: "Remote property configuration implementation"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/shared/libraries/config_protocol/include/config_protocol/config_client_property_object_impl.h"
  - id: streaming
    title: "Native signal subscription and packet transport"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/modules/native_streaming_client_module/src/native_streaming_impl.cpp"
  - id: native-client
    title: "Device discovery and timestamped acquisition example"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/examples/applications/cpp/quick_start/quick_start_native.cpp"
  - id: wav-reader
    title: "Recorded WAV signal reader implementation"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/examples/modules/audio_device_module/src/wav_reader_fb_impl.cpp"
  - id: fft
    title: "Deterministic FFT function block"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/examples/modules/ref_fb_module/modules/ref_fb_module/src/fft_fb_impl.cpp"
  - id: license
    title: "SDK license"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/LICENSE"
  - id: activity
    title: "Configuration concurrency and streaming-device lifetime fixes"
    url: "https://github.com/openDAQ/openDAQ/commit/1e78a058d84823a8b363b3f5fafc0a6528ecc345"
  - id: earlier-maintenance
    title: "Correct cached scaled data when packets are reused"
    url: "https://github.com/openDAQ/openDAQ/commit/a773b6f693788da69b6f98764cd4490106322e9c"
  - id: development
    title: "Claude-credited discovery shutdown correction"
    url: "https://github.com/openDAQ/openDAQ/commit/10a0455c7d41b625e59e13a44cd952c23a502eaa"
  - id: instance
    title: "Retained discovery shutdown before root-device release"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/core/opendaq/opendaq/src/instance_impl.cpp"
  - id: discovery
    title: "Retained mDNS service-thread stop"
    url: "https://github.com/openDAQ/openDAQ/blob/1fa4ad074e21a6532893d4c843139c74c01e2916/core/opendaq/modulemanager/src/mdns_discovery_server_impl.cpp"
  - id: review-20261128-activity
    title: "November 24 native streaming-client packet processing improvements"
    url: "https://github.com/openDAQ/openDAQ/commit/909627dde7ac91e1485d6a3f65abee404efedd13"
  - id: review-20261128-stream
    title: "Retained native streaming packet queue interface"
    url: "https://github.com/openDAQ/openDAQ/blob/0da5c6d3109381f11288c4c7e926009b6d5f8141/modules/native_streaming_client_module/include/native_streaming_client_module/native_streaming_impl.h"
  - id: review-20261128-stream-tests
    title: "Native streaming protocol regression source"
    url: "https://github.com/openDAQ/openDAQ/blob/0da5c6d3109381f11288c4c7e926009b6d5f8141/shared/libraries/native_streaming_protocol/tests/test_streaming_protocol.cpp"
---

### Scope and operating boundaries

The SDK implements remote property changes and native signal subscriptions, with sample readers preserving domain ticks and timestamps. This establishes Control and Acquisition independently of its synthetic reference devices. It supplies a shared device and signal model rather than another VISA transport backend. Hardware support depends on the loaded device modules; timestamps and software alignment do not establish synchronized or calibrated hardware performance. [Configuration](#source-control); [Streaming](#source-streaming); [Native client](#source-native-client).

The optional audio module reads recorded WAV samples into typed signal packets, and the bundled FFT block processes signal packets through a deterministic transform. Those separately usable file-reading and processing operations establish Analysis. The WAV reader initializes a miniaudio playback device, so this path is not a backend-free batch file parser. A custom function-block API or a streaming loop alone is not counted as Test. [WAV reader](#source-wav-reader); [FFT implementation](#source-fft).

### Selection and development provenance

Separate substantive changes correct packet-cache reuse in July 2026 and configuration deadlocks, event handling and streaming-device lifetime in November 2026. These are retained implementation and regression-test changes, not activity inferred from dependency updates. No physical DAQ or synchronization experiment was reproduced for this review. [Earlier maintenance](#source-earlier-maintenance); [Current maintenance](#source-activity).

The September discovery-shutdown commit explicitly co-credits Claude, changes executable lifetime management and is an ancestor of the reviewed default branch. The current instance destructor clears the discovery servers' root-device references before releasing the device, and the mDNS implementation stops its service thread in that path. This establishes AI-ASSISTED development for that repair; the reviewed runtime operations remain conventional. [Attributed repair](#source-development); [Retained instance logic](#source-instance); [Retained service stop](#source-discovery).

### November 28, 2026 source review

The November 24 native-streaming integration collects packets on the transport thread and transfers bursts to the processing thread, resolving each signal once per burst and forwarding packets in arrival order. It also introduces shared ownership for external packet memory. This is an implemented acquisition-path efficiency improvement, not independently measured throughput, losslessness or timing accuracy. The later November 25 commits remain in the raw activity capture; the reviewed streaming implementation is the meaningful checkpoint. Existing Scope and development attribution are unchanged. [Integration](#source-review-20261128-activity) · [Queue interface](#source-review-20261128-stream) · [Protocol tests](#source-review-20261128-stream-tests).
