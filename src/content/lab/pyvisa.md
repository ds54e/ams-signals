---
name: "PyVISA"
aliases: []
description: "VISA API for instrument discovery, sessions and command or binary-block I/O in Python. It reads structured arrays from compatible equipment through a chosen backend, including vendor VISA libraries or the separately installed PyVISA-py transport implementation."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude is credited on the binary-block datatype size fix and its executable regression tests."
  sources: [ai-change, development-retained]
  reviewedAt: "2026-11-24"
access: "MIT; real instruments require a compatible vendor VISA library or PyVISA-py, with the latter's optional transport dependencies installed as needed."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: website
    title: "Official project website or documentation"
    url: "https://pyvisa.readthedocs.io/"
    purpose: official
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/pyvisa/pyvisa"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/pyvisa/pyvisa/commit/a5b56ab857115e44e59f240f99207b305f77c459"
  - id: ai-change
    title: "Credited executable implementation change"
    url: "https://github.com/pyvisa/pyvisa/commit/843d62a50cac9a23e7585c5135f3fd5eb9470f17"
  - id: python-backend
    title: "Related PyVISA-py transport backend"
    url: "https://github.com/pyvisa/pyvisa-py"
  - id: backend-selection
    title: "ResourceManager backend selection and wrapper loading"
    url: "https://github.com/pyvisa/pyvisa/blob/a5b56ab857115e44e59f240f99207b305f77c459/pyvisa/highlevel.py"
  - id: python-backend-implementation
    title: "Companion PyVISA-py session dispatch"
    url: "https://github.com/pyvisa/pyvisa-py/blob/7895f43d2524ebcafaf74c1e2b529dc6f09bc13f/pyvisa_py/highlevel.py"
  - id: python-backend-requirements
    title: "Companion backend transport dependencies"
    url: "https://github.com/pyvisa/pyvisa-py/blob/7895f43d2524ebcafaf74c1e2b529dc6f09bc13f/README.rst"
  - id: development-retained
    title: "Retained standard-size binary-block conversion"
    url: "https://github.com/pyvisa/pyvisa/blob/a5b56ab857115e44e59f240f99207b305f77c459/pyvisa/util.py"
---

## Scope and limits

The reviewed main-branch change handles an HP block length that includes its termination character. Transport and parser checks do not establish calibration, aperture or measurement accuracy.

[Reviewed upstream implementation](#source-activity).

PyVISA provides the portable session and instrument-I/O API and can use different backends. Installing PyVISA-py and selecting `ResourceManager('@py')` chooses its Python transport implementation through that same API. The backend still needs the relevant host support, such as PyUSB for USB or a GPIB library for GPIB; it is not a guarantee of every VISA operation on every host. [Backend selection](#source-backend-selection) · [Python backend](#source-python-backend) · [Session dispatch](#source-python-backend-implementation) · [Transport dependencies](#source-python-backend-requirements).

The Code link, Scope, development provenance and activity refer to PyVISA. The separately maintained backend is linked as an implementation choice; its credits and repository history are not included here. PyVISA-sim remains a different workflow for virtual instruments and driver regression.
