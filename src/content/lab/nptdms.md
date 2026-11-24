---
name: "npTDMS"
aliases: []
description: "Reads and writes LabVIEW TDMS measurement data with NumPy. Lazy reads, channel metadata, DAQmx scaling and raw timestamps make recorded bench data accessible to Python, including selective reads from larger recordings."
scope:
  analysis: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the byte-range extraction implementation and its tests."
  sources: [activity]
  reviewedAt: "2026-11-24"
access: "LGPL-3.0-only; reader coverage is specific to TDMS measurement files."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://nptdms.readthedocs.io/en/stable/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/adamreeve/npTDMS"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/adamreeve/npTDMS/commit/36a3b7f73c49a4c346c084bc257c576cecfffa83"
  - id: sigmf-python
    title: "Related reader and validator for stored RF/IQ recordings"
    url: "https://github.com/sigmf/sigmf-python"
---

## Scope and limits

Version 1.14.0 supports byte-range extraction. Channel ranges alone do not contain all higher-level properties; preserve file and group metadata where required for units or scale. Timestamp representation is not instrument timing accuracy.

[Reviewed upstream implementation](#source-activity).

Scope is Analysis: TDMS decoding, scaling and partial reads operate on saved records. Streaming a file from disk is distinct from instrument acquisition.

For stored RF/IQ data using Signal Metadata Format, use the separate SigMF Python library. It is not an alternate TDMS decoder. [SigMF implementation](#source-sigmf-python).
