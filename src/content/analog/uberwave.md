---
name: "uberWAVE"
aliases: []
summary: "Visualizes large analog simulation datasets with decimation and hierarchical signal caches."
description: "Open-source waveform viewer for inspecting large ngspice analog simulation datasets, with RAW/UwRaw loading, multi-pane plots and cursor measurements. Its WP5 alpha adds Spectre PSF/PSFXL import and uses native memory-mapped access, min/max decimation and hierarchical caching; mixed-signal acceptance and automated rise/fall measurements remain pending."
scope:
  simulation:
    ai: false
access: "Public C++20 source with a GPLv2 license file and separate third-party terms. WP5 Alpha 1 provides Windows x64 and browser bundles; Linux builds from source."
addedAt: "2026-10-26"
reviewedAt: "2026-10-26"
sources:
  - id: "site"
    title: "Official NLnet project introduction"
    url: "https://nlnet.nl/project/uberWAVE/"
    purpose: "official"
  - id: "code"
    title: "Canonical uberWAVE GitLab repository"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave"
    purpose: "code"
  - id: "release"
    title: "WP5 Alpha 1 evaluation release, October 22, 2026"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/releases/wp5-alpha1"
  - id: "wp4-release"
    title: "WP4 technology demonstrator v1.1"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/tags/wp4-v1.1"
  - id: "readme"
    title: "WP5 alpha features and development roadmap"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/blob/53480275199affda8d86dba6a60110dc37bb3b5a/README.md"
  - id: "building"
    title: "Released Windows, Linux and browser build requirements"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/blob/53480275199affda8d86dba6a60110dc37bb3b5a/Docs/Building.md"
  - id: "engine"
    title: "Released reader, decimation, cache and import implementation"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/tree/53480275199affda8d86dba6a60110dc37bb3b5a/wp3-data-engine/src"
  - id: "session"
    title: "Released viewer file detection and multi-analysis session implementation"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/tree/53480275199affda8d86dba6a60110dc37bb3b5a/wp5-viewer/session"
  - id: "psf-tests"
    title: "Released ASCII, binary and PSF-XL regression fixtures and checks"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/tree/53480275199affda8d86dba6a60110dc37bb3b5a/wp3-data-engine/tools/psf_tests"
  - id: "wp4-report"
    title: "WP4 formats, progressive conversion preview and prototype limits"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/blob/c75a89c8fae0eecdf18a3b31c4f2b55af56b1ae2/Docs/WP4_Report.md"
  - id: "license"
    title: "License text shipped with WP5 Alpha 1"
    url: "https://gitlab.symbioticeda.com/Juan_25/uberwave/-/blob/53480275199affda8d86dba6a60110dc37bb3b5a/LICENSE"
---

### Analog / Mixed-Signal Waveform Visualization

The viewer inspects simulator results rather than executing a circuit solver. Multi-pane plots, shared axes, A/B cursors and per-pane measurements support electrical-result inspection, giving conventional Simulation coverage. Analog and mixed-signal design is the stated audience; the latest release still lists mixed-signal acceptance as pending. [Official introduction](#source-site) · [Released features and limits](#source-release).

### Released implementation

The reviewed WP5 Alpha 1 tag resolves to `53480275199affda8d86dba6a60110dc37bb3b5a`. NGspice ASCII and binary RAW and the internal UwRaw format are implemented. WP5 additionally resolves Spectre result directories and imports ASCII/binary PSF and PSF-XL through the data engine into UwRaw-backed sessions. The regression code exercises concrete Spectre and PSF-XL fixtures; this is not a claim of universal Spectre-format compatibility. No VCD or FST reader was established by this review. [Viewer dispatch and sessions](#source-session) · [Parsers and converters](#source-engine) · [Format checks](#source-psf-tests).

`RawBinaryReader` selects Windows `CreateFileMappingW`/`MapViewOfFile` or POSIX `mmap`, falling back to a buffered file reader; ASCII RAW first builds a point-offset index. `Decimator` retains ordered first/minimum/maximum/last samples in viewport-sized buckets. `SignalCache` builds a bounded hierarchical min/max pyramid per selected signal in a background thread, and `SignalQueryEngine` selects cached levels or direct decimation. These are implemented mechanisms, not only the architecture plan. Browser builds use bounded reads rather than native memory mapping. Performance figures in the upstream materials were not independently reproduced. [Released engine](#source-engine) · [Platform boundary](#source-building).

Progressive preview displays partial data while an existing file is converted. It does not by itself establish automatic updates while a simulator is writing new results; live simulation viewing was not verified. [WP4 conversion preview](#source-wp4-report) · [WP5 sessions](#source-session).

### Release and access boundary

The latest published release at review is WP5 Alpha 1, dated October 22, 2026. It follows the September WP5 preview and the July 17 WP4 v1.1 Windows demonstrator, which superseded the broken WP4 v1.0 build. The alpha supplies Windows 10/11 x64 and WebAssembly bundles and Linux source-build instructions. Upstream reports Ubuntu verification; current Windows instructions use MinGW, with MSVC unvalidated. Browser operation requires WebGL2 and cross-origin isolation, and large Spectre-folder browser memory use is not yet validated. Docking/custom layouts, mixed-signal acceptance, automated rise/fall and waveform-frequency measurements, and the demo/user review remain pending. [Latest release](#source-release) · [Earlier demonstrator](#source-wp4-release) · [Build guide](#source-building).

The repository ships GNU GPL version 2 license text and separately documents third-party terms. This review inspected source and release metadata without executing the viewer, its tests or its bundled binaries. The activity strip uses the October 22 evaluation release as one reviewed public signal, not synthetic monthly commit history or the catalog addition date. [License file](#source-license) · [Project status](#source-readme) · [Dated release](#source-release).
