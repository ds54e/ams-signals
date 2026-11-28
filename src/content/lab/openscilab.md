---
name: "openSciLab"
aliases: ["PiPiLogicAnalyzer"]
description: "Measurement and control application combining supported instruments, microcontroller-based logic capture, saved-record decoding and executable measurement flows. Visual or Python-authored flows coordinate devices, checks and reports in real time or virtual time using simulated instruments."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "GPL-3.0-or-later source; beta software. Physical operation requires supported instruments or boards and matching firmware."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical implementation"
    url: "https://github.com/dekajoule/openSciLab"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/dekajoule/openSciLab/commit/1b4a4e315752ce0132a97d68ed2211658db41579"
  - id: driver-corrections
    title: "October Rigol capture and communication corrections"
    url: "https://github.com/dekajoule/openSciLab/commit/766dc69e636c78a1f1e5da92a85b3b2425b94f7a"
  - id: overview
    title: "Reviewed lab application, simulation and hardware boundaries"
    url: "https://github.com/dekajoule/openSciLab/blob/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec/README.md"
  - id: flow-example
    title: "Executable simulated capture and file-output flow"
    url: "https://github.com/dekajoule/openSciLab/blob/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec/examples/flows/counter.flow.yaml"
  - id: capture-format
    title: "Saved capture input and export implementation"
    url: "https://github.com/dekajoule/openSciLab/blob/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec/openscilab/core/capture_io.py"
  - id: rf-source-integration
    title: "October 28 canonical HT008 instrument-driver integration"
    url: "https://github.com/dekajoule/openSciLab/commit/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec"
  - id: rf-source-driver
    title: "Retained HT008 generator and instrument settings"
    url: "https://github.com/dekajoule/openSciLab/blob/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec/openscilab/driver/htool/instrument.py"
  - id: rf-source-tests
    title: "Retained HT008 protocol and driver regressions"
    url: "https://github.com/dekajoule/openSciLab/blob/49bf5ad6e3b8e5103138dfae6e62ac1b279991ec/tests/test_htool.py"
  - id: development-branch
    title: "Unmerged November pre-trigger and circuit-simulation development"
    url: "https://github.com/dekajoule/openSciLab/pull/13"
---

## Scope and limits

The application combines real device operations and saved capture processing with reproducible flows. The example runs a simulated counter capture and writes its result to a file. The flow runner and supported device simulators provide an executable lab procedure independent of the logic-analyzer data view. Circuit simulation can supply virtual inputs; this entry describes the Lab workflow rather than assigning a second catalog membership. The project credits its LogicAnalyzer lineage and shared sigrok decoders. [Overview](#source-overview) · [Flow example](#source-flow-example) · [Capture format](#source-capture-format).

The project describes the application as beta and distinguishes its reported hardware trials from untested boards and simulated behavior. Simulated signals and host-side checks do not establish the physical timing, bandwidth or measurement accuracy of a bench.

## Reviewed maintenance

October 9 repairs the Rigol capture completion, trigger, bridge-channel and timeout-resynchronization paths, with simulator tests. October 27 preserves named state-capture clocks in session data and the UI. The retained capture serializer reads and writes the clock name. These changes follow the initial logic-analyzer port and early releases; a longer maintenance record is not yet established. [Driver corrections](#source-driver-corrections) · [Clock metadata](#source-activity).

## November 28, 2026 implementation review

October 28 integrates an HT008 RF-generator driver with serial frequency and discrete output-level settings, acknowledgments and regression tests. This is a substantive Control extension after the October 27 checkpoint. The returned settings describe the last command, not instrument readback; the driver cannot turn the carrier off. This application operates external instruments, unlike OOS's replacement software running on a Rigol scope itself. An open November development branch also contains pre-trigger capture and W65C02 simulation changes, but those are not integrated default-branch features or activity. No hardware operation was independently reproduced. [Driver integration](#source-rf-source-integration) · [Implementation](#source-rf-source-driver) · [Tests](#source-rf-source-tests) · [Development branch](#source-development-branch).
