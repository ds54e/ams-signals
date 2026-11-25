---
name: "Project Kimchi"
aliases: ["Wafer-probe runs", "IGZO transistor characterization"]
description: "Python wafer-probe measurement workflow for oxide-semiconductor transistors and gain cells using a Cascade S200 prober and Keysight B1500A or Keithley 4200A-SCS. Includes device-map planning, drift-corrected stepping, Id-Vg measurements, bias-stress and recovery sequences, retention measurements, and analysis of saved curves and placement logs."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
  aiDevelopment: assisted
developmentEvidence:
  summary: "Claude Opus is co-credited for the web application pipeline implementing probe-plan preview and run initiation. The change was integrated in pull request 3 and the pipeline remains in the reviewed source."
  sources: [credited, web-integration, pipeline]
  reviewedAt: "2026-11-25"
access: "Public Python source; no explicit repository-wide reuse license was identified in the reviewed tree. Live runs require the lab's compatible probe station, instrument configuration and drivers; fake-instrument dry runs are separate."
addedAt: "2026-11-25"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public measurement implementation"
    url: "https://github.com/kjstanford/project_kimchi"
    purpose: code
  - id: activity
    title: "November 21 integrated chuck placement analysis and regression tests"
    url: "https://github.com/kjstanford/project_kimchi/commit/85c9adfa60a4597441d0582f9bf179d6af41c377"
  - id: stress-integration
    title: "October integrated PMU stress-staircase and gain-cell tests"
    url: "https://github.com/kjstanford/project_kimchi/commit/d91d94e81fa412ce6c71a30053244596b71f65eb"
  - id: credited
    title: "Claude-credited web application pipeline implementation"
    url: "https://github.com/kjstanford/project_kimchi/commit/b10bdd6c0dc304253b919599c09b88213f02a03e"
  - id: web-integration
    title: "November integrated web application"
    url: "https://github.com/kjstanford/project_kimchi/commit/0d1a40cc316284ea3afd862781071f59e1a53cbb"
  - id: pipeline
    title: "Retained preview and run API implementation"
    url: "https://github.com/kjstanford/project_kimchi/blob/85c9adfa60a4597441d0582f9bf179d6af41c377/src/app/pipeline.py"
  - id: prober
    title: "Retained chuck motion and drift correction"
    url: "https://github.com/kjstanford/project_kimchi/blob/85c9adfa60a4597441d0582f9bf179d6af41c377/src/measure/instruments/prober.py"
  - id: stress
    title: "Retained measure-stress-measure staircase and threshold extraction"
    url: "https://github.com/kjstanford/project_kimchi/blob/85c9adfa60a4597441d0582f9bf179d6af41c377/src/measure/stress_stair.py"
  - id: runner
    title: "Retained device map execution and resume checks"
    url: "https://github.com/kjstanford/project_kimchi/blob/85c9adfa60a4597441d0582f9bf179d6af41c377/src/measure/run_map.py"
  - id: stats
    title: "Retained logged chuck-drift statistics"
    url: "https://github.com/kjstanford/project_kimchi/blob/85c9adfa60a4597441d0582f9bf179d6af41c377/src/measure/live_stats.py"
---

## Scope and limits

The project integrates a device map and a prober's motion with concrete electrical characterization procedures. Its distinct role beside general prober and analyzer drivers is a reusable experiment runner with resume handling, bias-stress and zero-bias recovery, and threshold-voltage extraction from successive staircase reads. The prober implementation uses measured chuck positions to apply optional drift corrections and enforce configured movement limits. Separate analysis reads saved logs and measurement curves. These are instrument-specific research procedures, not a general multi-site production ATE implementation. Fake instruments and dry runs do not establish safe physical probing or measurement accuracy. [Experiment runner](#source-runner) · [Stress sequence](#source-stress) · [Prober driver](#source-prober) · [Log analysis](#source-stats).

## Reviewed maintenance and provenance

October 22 integrates PMU stress-staircase and gain-cell measurement code. November 3 integrates the planning and run web application with a Claude-credited executable pipeline. November 21 adds drift-statistics reporting and a synthetic log regression comparing accumulated movement error with corrected logged position. This is substantive follow-through after the initial measurement-code release, without assuming physical accuracy from the tests. [October integration](#source-stress-integration) · [Credited web change](#source-credited) · [November integration](#source-activity).
