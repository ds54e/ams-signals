---
name: "tm_devices"
aliases: ["tm devices"]
description: "Python drivers and command APIs for supported Tektronix and Keithley instruments, built on PyVISA. It manages connections and exposes device-specific operations for oscilloscopes, generators, supplies, meters and source-measure units."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Cursor is co-credited for Python compatibility changes, including the retained wrapper that runs pylint with one worker on Python 3.15. This credit is separate from the AWG frequency calculation repair."
  sources: [ai-change, development-retained]
  reviewedAt: "2026-11-24"
access: "Apache-2.0; reviewed source requires Python >=3.11.5,<3.16. Supported models require a compatible VISA backend and instrument firmware."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://tm-devices.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/tektronix/tm_devices"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/tektronix/tm_devices/commit/730214258a49eca4eb213ee70d2b43a19de70aae"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/tektronix/tm_devices/commit/61af41a2c49560c6363c5d32d63aafa30189517e"
  - id: development-retained
    title: "Retained Python 3.15 pylint execution wrapper"
    url: "https://github.com/tektronix/tm_devices/blob/eb4969cd15795999b9184e679b1b65d847ac8e01/scripts/run_pylint.py"
  - id: maintenance-earlier
    title: "August 2026 power-supply slew-rate command correction"
    url: "https://github.com/tektronix/tm_devices/commit/9c1a643956784452a99b08c773fa6101150c4ca3"
  - id: live-curve
    title: "Retained live scope curve query and CSV example"
    url: "https://github.com/tektronix/tm_devices/blob/eb4969cd15795999b9184e679b1b65d847ac8e01/examples/scopes/tekscope/basic_curve_query.py"
  - id: related-tss-reader
    title: "Separate saved waveform archive reader"
    url: "https://github.com/tektronix/tm_data_types/blob/7a0bfc4d4fd23cfff0b70296431f6d2252a3dce1/src/tm_data_types/files_and_formats/tss/tss_reader.py"
  - id: compatibility-logging
    title: "Retained exception-note implementation"
    url: "https://github.com/tektronix/tm_devices/blob/eb4969cd15795999b9184e679b1b65d847ac8e01/src/tm_devices/helpers/logging.py"
  - id: python-requirements
    title: "Retained Python compatibility range"
    url: "https://github.com/tektronix/tm_devices/blob/eb4969cd15795999b9184e679b1b65d847ac8e01/pyproject.toml"
---

## Scope and limits

The AWG calculation fix in v3.8.0 distinguishes waveform record length from samples per cycle and enforces hardware limits. A software frequency-setting check is not output jitter characterization.

[Reviewed upstream implementation](#source-activity).

## Reviewed maintenance

August 2026 work corrects the power-supply `source.slewrate.v` command tree and regenerates the affected APIs. September work fixes predefined AWG clock frequency calculations using two samples per cycle and applies the AWG70K family's clock-output ceiling, with regression tests. These are separate device-control corrections across successive maintenance periods. [Supply command correction](#source-maintenance-earlier) · [AWG correction](#source-activity).

## November 28, 2026 implementation review

The live curve query exercises model-specific instrument acquisition and CSV saving through the device API. It is separate from the tm_data_types saved-file and TSS reader; routine CSV persistence does not add Analysis here. November 17 expands the Python test/support matrix to 3.15, drops support below 3.11.5, removes the obsolete exception-note fallback and updates the corresponding logging regression. The retained code and compatibility metadata support advancing the meaningful checkpoint, without inferring new instrument capabilities. [Live query](#source-live-curve) · [Offline reader](#source-related-tss-reader) · [Compatibility integration](#source-ai-change) · [Retained logging](#source-compatibility-logging) · [Python requirements](#source-python-requirements).
