---
name: "PyVISA-py"
aliases: []
description: "Pure-Python backend for the PyVISA instrument API. It implements supported serial, USB, GPIB and TCP/IP operations without a vendor VISA library, subject to the interface drivers and protocol features available on the host."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on an mDNS discovery repair that prevents one transport failure from stopping discovery on other interfaces."
  sources: [ai-change, development-retained]
  reviewedAt: "2026-11-24"
access: "MIT; optional adapters depend on the selected transport."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://pyvisa-py.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/pyvisa/pyvisa-py"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/pyvisa/pyvisa-py/commit/fa7320dc6b81d2b8dd7c6c9734908cae33641b83"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/pyvisa/pyvisa-py/commit/cf9ca4cb735c410ea8a3c3c47193a419f35fc3af"
  - id: pyvisa-api
    title: "Related portable PyVISA instrument API"
    url: "https://github.com/pyvisa/pyvisa"
  - id: development-retained
    title: "Retained mDNS discovery recovery"
    url: "https://github.com/pyvisa/pyvisa-py/blob/7895f43d2524ebcafaf74c1e2b529dc6f09bc13f/pyvisa_py/tcpip.py"
---

## Scope and limits

Reviewed HiSLIP changes concern device clear and stale responses. Async I/O, overlapped HiSLIP and other operations have documented limits; 0.9.0 in the reviewed changelog is unreleased.

[Reviewed upstream implementation](#source-activity).

This entry covers the separately installable Python transport implementation. PyVISA supplies the public API and may instead use a vendor backend; PyVISA-sim serves virtual instruments for driver regressions. Their separate operational roles do not make them independent evidence of hardware correctness. [PyVISA API](#source-pyvisa-api).
