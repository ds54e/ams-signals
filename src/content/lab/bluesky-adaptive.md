---
name: "bluesky-adaptive"
aliases: ["Bluesky experiment optimization", "adaptive scans"]
description: "Adaptive experiment execution and optimization for Bluesky. Implements acquisition plans, optimizer suggestion and outcome exchange, scan-order tracking and failure-aware iterative workflows; optional Ax Bayesian optimization selects parameters from measured outcomes. Experimental Queue Server evaluation helpers connect queued plans to run documents and user-supplied scores."
scope:
  control: { ai: true }
  acquisition: { ai: true }
  test: { ai: true }
  aiDevelopment: assisted
developmentEvidence:
  summary: "The November outcome-validation, failed-trial registration and stopping-step correction carries an explicit Claude Opus assistance credit. Its executable acquisition/evaluation path and failure regression remain integrated."
  sources: [outcome-fix, plans, tests]
  reviewedAt: "2026-11-25"
access: "BSD-3-Clause; requires Bluesky, a compatible optimizer and evaluator, and appropriate device bindings for live measurement."
addedAt: "2026-11-25"
reviewedAt: "2026-11-28"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/bluesky/bluesky-adaptive"
    purpose: code
  - id: activity
    title: "November 23 nonblocking evaluation and interruption regression"
    url: "https://github.com/bluesky/bluesky-adaptive/commit/13bbd18e2d614fcc5e6bb1d59749075167cea2de"
  - id: outcome-fix
    title: "November outcome-validation and failed-trial correction with AI credit"
    url: "https://github.com/bluesky/bluesky-adaptive/commit/701ef98ace75b209b1a71cfb319c08f1e94b9381"
  - id: plans
    title: "Retained scan, optimization loop and outcome validation"
    url: "https://github.com/bluesky/bluesky-adaptive/blob/7889ba7812f36b4786699b6dc60af681c58ea2c0/src/bluesky_adaptive/plans.py"
  - id: ax
    title: "Retained Ax Bayesian optimization adapter"
    url: "https://github.com/bluesky/bluesky-adaptive/blob/7889ba7812f36b4786699b6dc60af681c58ea2c0/src/bluesky_adaptive/ax/optimizer.py"
  - id: tests
    title: "Retained outcome and failure registration tests"
    url: "https://github.com/bluesky/bluesky-adaptive/blob/7889ba7812f36b4786699b6dc60af681c58ea2c0/src/bluesky_adaptive/tests/test_plans.py"
  - id: bluesky
    title: "Underlying instrument-independent RunEngine"
    url: "https://github.com/bluesky/bluesky"
  - id: queue-evaluation-integration
    title: "November 25 per-run and QueueItemRuns evaluation integration"
    url: "https://github.com/bluesky/bluesky-adaptive/commit/710488999f53bbe551284d823e25f07de07ecaf3"
  - id: queue-evaluation
    title: "Retained experimental queue item to run resolution"
    url: "https://github.com/bluesky/bluesky-adaptive/blob/710488999f53bbe551284d823e25f07de07ecaf3/src/bluesky_adaptive/evaluation/queueserver.py"
  - id: document-buffer
    title: "Retained suggestion ID and acquisition event association"
    url: "https://github.com/bluesky/bluesky-adaptive/blob/710488999f53bbe551284d823e25f07de07ecaf3/src/bluesky_adaptive/evaluation/documents.py"
  - id: queue-evaluation-tests
    title: "Queue resolution, interruption and event-evaluation regressions"
    url: "https://github.com/bluesky/bluesky-adaptive/blob/710488999f53bbe551284d823e25f07de07ecaf3/src/bluesky_adaptive/tests/evaluation/test_queueserver.py"
---

## Scope and limits

The default acquisition plan converts suggestions into actuator settings and sensor scans and records suggestion identifiers in actual acquisition order. The optimization plan then evaluates results, validates their association with suggestions, feeds outcomes back to the optimizer and checks stopping criteria. Ax supplies one implemented Bayesian optimization path; the workflow also supports other optimizers. The selected points can drive devices and measurements through Bluesky, while instrument drivers and user-defined outcome evaluation remain separate. This differs from the underlying RunEngine's generic plan execution and from gpCAM's standalone surrogate and measurement recommendation API. [Plans](#source-plans) · [Ax optimizer](#source-ax) · [RunEngine](#source-bluesky).

## Reviewed maintenance and provenance

November 14 fixes outcome validation, failure registration and recording of the step meeting a stopping condition, including regression cases. November 23 moves blocking evaluations into a worker thread so RunEngine can remain responsive, with interruption tests; an already-started callback may continue after abort. The AI assistance credit attaches to the earlier retained executable correction. These are concrete maintenance changes to an existing optimization workflow, not a claim of safe cancellation of physical operations. No physical measurement or upstream test execution was independently performed. [Outcome correction](#source-outcome-fix) · [Regression tests](#source-tests) · [Threaded evaluation change](#source-activity).

## November 28, 2026 implementation review

The November 25 source integrates experimental Queue Server evaluation helpers beyond the saved activity capture. QueueItemRuns maps queue-item IDs to the first run matching a supplied filter and resolves its UID after the stop document arrives; the timeout starts only after the item finishes, not while queued or running. A document buffer associates primary events with recorded suggestion IDs and rejects mismatched counts. The implementation explicitly warns that an operator stop may produce a success exit status, so readers must separately verify data completeness. This extends the executable experiment and result-feedback workflow rather than introducing an independent learned measurement-analysis algorithm. The activity snapshot remains at its previously captured revision until a targeted recapture. [Integration](#source-queue-evaluation-integration) · [Queue resolution](#source-queue-evaluation) · [Document buffer](#source-document-buffer) · [Tests](#source-queue-evaluation-tests).
