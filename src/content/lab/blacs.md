---
name: "BLACS"
aliases: []
description: "Experiment control and shot queue for the labscript suite. It loads compiled HDF5 shots, coordinates compatible hardware workers for timed execution and permits manual device control between runs; supported devices, synchronization and sample recording depend on the configured hardware and drivers."
scope: {"control": {"ai": false}, "test": {"ai": false}, "aiDevelopment": "assisted"}
developmentEvidence:
  summary: "Claude is co-credited for the idle-state restoration after a completed shot. The canonical queue manager retains the status update at the end of shot processing."
  sources: [credited, retained]
  reviewedAt: "2026-11-24"
access: "Public Python application; requires a configured labscript suite installation and compatible hardware workers."
addedAt: "2026-11-24"
reviewedAt: "2026-11-24"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/labscript-suite/blacs"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/labscript-suite/blacs/commit/44e1a6101dc39b3131f8b653cf969c69a8658c66"
  - id: website
    title: "Official shot management guide"
    url: "https://docs.labscriptsuite.org/projects/blacs/en/stable/shot-management/"
    purpose: official
  - id: compiler
    title: "Related labscript experiment compiler"
    url: "https://github.com/labscript-suite/labscript"
  - id: queue
    title: "Queue and abort behavior change"
    url: "https://github.com/labscript-suite/blacs/commit/9b543b070b99c5f185f616e9d6365ac0ac7a2f24"
  - id: earlier
    title: "Post-run handling repair"
    url: "https://github.com/labscript-suite/blacs/commit/e5757c7825da528739dc9dc06dc55ac5b1943f8f"
  - id: credited
    title: "Credited queue-status restoration implementation"
    url: https://github.com/labscript-suite/blacs/commit/e272b6536ef2d6fa8c2cc8e583b818614d37807b
  - id: retained
    title: "Retained queue manager implementation"
    url: https://github.com/labscript-suite/blacs/blob/e7bfb89d8fab3c491c3d83b2da2397d53046d604/blacs/experiment_queue.py#L790-L794
---

### Scope and evidence

BLACS is the execution GUI and coordinator, not the experiment compiler, a generic driver SDK or independent post-processing. Control covers device programming and manual operations; Test Automation covers the shot queue, abort behavior and run coordination. Device-specific sampling does not by itself give the coordinator a separate Acquisition scope. This entry records BLACS activity only; labscript is linked as the companion compiler. [Shot management](#source-website) · [Compiler](#source-compiler).

June post-run handling and October queue/abort and status corrections are substantive changes across different periods. The source review does not establish deployed timing accuracy on a particular device set. [June handling](#source-earlier) · [Queue correction](#source-queue) · [Run status](#source-activity).

Claude is co-credited for the queue state restoration that landed in the reviewed October change. This is development provenance, not AI-based experiment sequencing. [Credited diff](#source-credited) · [Retained queue manager](#source-retained).
