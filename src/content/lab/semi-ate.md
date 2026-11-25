---
name: "Semi-ATE"
aliases: ["Semiconductor Automated Test Equipment"]
description: "Python framework for organizing ASIC tests into test programs and flows, with a Spyder-based project environment, tester and equipment plugins, test execution components and binning/STDF result handling. It separates test definitions from instrument-specific implementation and supports configured production and laboratory test workflows."
scope:
  control: { ai: false }
  test: { ai: false }
access: "GPL-2.0 repository license; requires a compatible Python/Spyder environment and the configured tester, instrument and messaging components."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/Semi-ATE/Semi-ATE"
    purpose: code
  - id: activity
    title: "Reviewed implementation or canonical integration"
    url: "https://github.com/Semi-ATE/Semi-ATE/commit/a906e5ba78101c065877c48bb1bbccf5eb45d453"
  - id: earlier
    title: "January flow-local parameter and result writing changes"
    url: "https://github.com/Semi-ATE/Semi-ATE/commit/a516e207f26cf72948532ff074ff31e1cb5e5048"
  - id: generation
    title: "Retained test and project generator implementation"
    url: "https://github.com/Semi-ATE/Semi-ATE/blob/a906e5ba78101c065877c48bb1bbccf5eb45d453/src/ATE_sammy/ate_sammy/coding/generators.py"
  - id: sequencer
    title: "Retained site-specific test sequencer"
    url: "https://github.com/Semi-ATE/Semi-ATE/blob/a906e5ba78101c065877c48bb1bbccf5eb45d453/src/Apps/test_app/ate_test_app/sequencers/Sequencer.py"
  - id: pylab
    title: "Related instrument and register access library"
    url: "https://github.com/Semi-ATE/PyLab-ML/blob/4ecca841c3a0fdd1400d5452a105c276772ca720/README.md"
---

## Scope and limits

Semi-ATE organizes project definitions, generated test code, site-specific execution and tester or equipment plugins. The test application and binning workflow are distinct from a generic measurement driver library; instrument operations depend on the configured plugins. Result logging is part of test execution and does not alone establish separate offline Analysis. [Generator](#source-generation) · [Sequencer](#source-sequencer).

PyLab-ML is a related instrument library with device classes and register access. Keep this companion linked to the framework without attributing its separate maintenance or instrument support to the framework's repository activity. This workflow does not establish a complete physical ATE emulator, calibrated measurements or a particular tester's multisite performance. [Companion library](#source-pylab).

## Reviewed maintenance

January 2026 changes flow-local input parameters and list-result handling. November corrects lab-control plugin exceptions and Spyder integration after reported problems. These are implementation and compatibility changes following earlier usable test-project and execution workflows. [January change](#source-earlier) · [November correction](#source-activity).
