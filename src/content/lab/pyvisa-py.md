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
  sources: [ai-change]
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
---

## Scope and limits

Reviewed HiSLIP changes concern device clear and stale responses. Async I/O, overlapped HiSLIP and other operations have documented limits; 0.9.0 in the reviewed changelog is unreleased.

[Reviewed upstream implementation](#source-activity).
