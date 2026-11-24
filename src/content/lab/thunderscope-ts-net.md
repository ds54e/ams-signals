---
name: "ThunderScope / TS.NET"
aliases: []
description: "Capture, control and hardware-test stack for the ThunderScope oscilloscope. TS.NET processes ADC streams and triggers, serves data to clients and runs calibration/verification sequences; acquisition performance and valid test results depend on compatible hardware, drivers, calibration and the required test setup."
scope: {"control": {"ai": false}, "acquisition": {"ai": false}, "test": {"ai": false}}
access: "Public TS.NET source; requires supported ThunderScope hardware and compatible firmware/host drivers."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/EEVengers/TS.NET"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/EEVengers/TS.NET/commit/e9bd916631807ce09c91caf15e1916c9579db367"
  - id: website
    title: "ThunderScope official setup guide"
    url: "https://docs.eevengers.com/ThunderScope/latest/Getting-Started.html"
    purpose: official
  - id: release
    title: "TS.NET v0.3.1"
    url: "https://github.com/EEVengers/TS.NET/releases/tag/v0.3.1"
  - id: sequence
    title: "Acquisition sequence number preservation"
    url: "https://github.com/EEVengers/TS.NET/commit/0c83e8875c476e7e50a11d4f5e78da54a74dd222"
  - id: hardware-verification
    title: "Factory verification sequence with physical measurement steps"
    url: "https://github.com/EEVengers/TS.NET/blob/e9bd916631807ce09c91caf15e1916c9579db367/source/TS.NET.Sequences/Sequences/FactoryVerificationSequence.cs"
  - id: test-runner
    title: "Sequence execution, cleanup and result states"
    url: "https://github.com/EEVengers/TS.NET/blob/e9bd916631807ce09c91caf15e1916c9579db367/source/TS.NET.Sequencer/Sequence.cs"
---

### Scope and evidence

This entry follows the TS.NET implementation and links to the associated hardware documentation. It describes ADC-stream and trigger/control behavior, not fabrication files or a distinct saved-waveform analysis application. ngscopeclient is a separate frontend. The reviewed main incorporates user calibration loading after the documented v0.3.1 package; that change is not an independent instrument calibration. [Setup](#source-website) · [Release](#source-release) · [Sequence](#source-sequence) · [Calibration loading](#source-activity).

Test Automation follows the implemented factory verification sequence and its runner. Active steps measure channel-1 response with specified cabling and settings; the runner records per-step results, handles cleanup and resolves Passed, Failed, Error or Cancelled outcomes. Commented channel steps do not establish full four-channel verification coverage. [Verification sequence](#source-hardware-verification) · [Runner](#source-test-runner).
