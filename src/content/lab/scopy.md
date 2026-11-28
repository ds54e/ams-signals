---
name: "Scopy"
aliases: ["ADALM2000 M2K"]
description: "Desktop instrument suite for supported Analog Devices hardware, with acquisition, waveform inspection and device control. An optional MCP server exposes operations of a running Scopy instance; ADALM2000 functionality uses libm2k rather than an independent measurement backend."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
access: "GPL-3.0 family application; plugin and instrument requirements vary."
addedAt: "2026-11-24"
reviewedAt: "2026-11-28"
sources:
  - id: website
    title: "Project documentation"
    url: "https://analogdevicesinc.github.io/scopy/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/analogdevicesinc/scopy"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/analogdevicesinc/scopy/commit/b26aeea11227f3a3f301d960fbe9b70aed7dce7e"
  - id: libm2k
    title: "libm2k instrument API"
    url: "https://github.com/analogdevicesinc/libm2k"
  - id: review-20261128-activity
    title: "November 27 MCP 2.x compatibility and package workflow"
    url: "https://github.com/analogdevicesinc/scopy/commit/0727ff34bd01d008d05ee9b38052362555842a1f"
  - id: review-20261128-server
    title: "Retained MCP server implementation"
    url: "https://github.com/analogdevicesinc/scopy/blob/0727ff34bd01d008d05ee9b38052362555842a1f/tools/scopy-mcp-server/scopy_mcp_server/server.py"
  - id: review-20261128-package
    title: "Pinned SDK and package requirements"
    url: "https://github.com/analogdevicesinc/scopy/blob/0727ff34bd01d008d05ee9b38052362555842a1f/tools/scopy-mcp-server/pyproject.toml"
---

## Scope and limits

Scopy and the [libm2k API](#source-libm2k) serve different users but share an instrument stack. Disconnected and output-off-confirmed are distinct states.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

## November 28, 2026 source review

November 27 ports the existing server from FastMCP to MCPServer for MCP SDK 2.x and adds package build/publishing workflow and Windows dependencies. A running compatible Scopy instance and explicit server enablement remain necessary. The source declares server version 2.3.0; that does not by itself verify package publication. The adapter does not establish model-driven measurement or alter device calibration. The conventional scopes remain unchanged. [Integration](#source-review-20261128-activity) · [Server](#source-review-20261128-server) · [Package](#source-review-20261128-package).
