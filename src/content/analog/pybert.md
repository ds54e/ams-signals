---
name: "PyBERT"
aliases: []
summary: "Serial-link eye, jitter and BER estimation using channel and Tx/Rx models."
description: "Serial-link simulation and analysis tool that combines channel models with transmitter and receiver behavior, including supported IBIS-AMI models. It estimates eye, jitter and BER and can optimize transmitter/receiver equalizer settings. These are modeled results, not measured BER or oscillator phase noise."
scope: {"design": {"ai": false}, "simulation": {"ai": false}, "aiDevelopment": "assisted"}
developmentEvidence:
  summary: "Claude is co-credited on extending equalizer optimization to IBIS-AMI transmitter and receiver models. The reviewed code retains AMI parameter tuning in its optimization thread."
  sources: [development-code, development-retained]
  reviewedAt: "2026-11-24"
access: "Public Python implementation; model availability and compatible binary interfaces limit supported IBIS-AMI runs."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/capn-freako/PyBERT"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/capn-freako/PyBERT/commit/0e2d85f54a67f21f4711e60fc171afe583874e46"
  - id: website
    title: "Maintainer documentation"
    url: "https://pybert.readthedocs.io/"
    purpose: official
  - id: release
    title: "PyBERT v11.2.0"
    url: "https://github.com/capn-freako/PyBERT/releases/tag/v11.2.0"
  - id: frequency
    title: "FFT frequency-axis fix"
    url: "https://github.com/capn-freako/PyBERT/pull/244"
  - id: earlier
    title: "PyBERT v11.1.0"
    url: "https://github.com/capn-freako/PyBERT/releases/tag/v11.1.0"
  - id: development-code
    title: Credited implementation
    url: https://github.com/capn-freako/PyBERT/commit/45f73dc4a76cf751f178c6bf363dc953d5756d6c
  - id: development-retained
    title: Retained executable implementation
    url: https://github.com/capn-freako/PyBERT/blob/fc4a55725539af59fcc2e0c418a9e67969d8e0cb/src/pybert/threads/optimization.py
---

### Scope and evidence

This entry covers the end-to-end link evaluator rather than model loading or validation alone, which PyIBIS-AMI serves independently. Reviewed 11.2.0 includes an impulse-duration unit correction and corrected FFT frequency sampling. Simulation covers link evaluation; Design covers the independently invoked equalizer search, which proposes Tx/Rx settings rather than only evaluating supplied settings. These operations are conventional; generic MCP access does not make them runtime AI. Source review does not establish correlation against a measured link. [Earlier release](#source-earlier) · [11.2.0](#source-release) · [Duration](#source-activity) · [Frequency axis](#source-frequency).

### Development provenance

Claude is co-credited on extending equalizer optimization to IBIS-AMI transmitter and receiver models. The reviewed code retains AMI parameter tuning in its optimization thread. [Credited change](#source-development-code) · [Retained implementation](#source-development-retained).
