---
name: "PyMeasure"
aliases: []
description: "Python tools for instrument control, acquisition and repeatable laboratory procedures. Drivers and adapters support measurements while the experiment framework queues procedures and records results; its GUI also reopens saved experiment files and plots their recorded data."
scope:
  control: { ai: false }
  acquisition: { ai: false }
  analysis: { ai: false }
  test: { ai: false }
access: "MIT; usable interfaces depend on installed adapters and instruments."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: website
    title: "Project documentation"
    url: "https://pymeasure.readthedocs.io/en/latest/"
    purpose: official
  - id: code
    title: "Canonical project source"
    url: "https://github.com/pymeasure/pymeasure"
    purpose: code
  - id: activity
    title: "Reviewed implementation or test change"
    url: "https://github.com/pymeasure/pymeasure/commit/02dba75b377b76dbdabb154b86423e61f8f3cfbe"
  - id: saved-experiments
    title: "Loading saved experiment results into the plotting GUI"
    url: "https://github.com/pymeasure/pymeasure/blob/02da8edb7d7a22d3662911f842dfe4c433631b4c/pymeasure/display/windows/managed_window.py"
  - id: instro-publisher
    title: "Optional Instro integration for publishing PyMeasure instrument traffic"
    url: "https://github.com/nominal-io/instro/blob/6fa91f45f5d178ab0013d9146143603e9df0a505/packages/instro-pymeasure/instro/pymeasure/wrapper.py"
---

## Scope and limits

Host-side scheduling does not replace hardware trigger alignment, settling checks or an instrument-defined aperture.

The [implementation checkpoint](#source-activity) records a substantive upstream change. Repository activity does not establish hardware accuracy or an independent system validation.

Analysis follows `open_experiment`: it reads saved Results, recreates experiment curves and updates their data inside the application. It is separate from live plotting and from launching an external file viewer. [Saved experiment workflow](#source-saved-experiments).

## Related workflow

Instro can wrap PyMeasure instruments and publish property reads and writes through its own publishers. The wrapper provides a distinct measurement/command publishing operation, but the wrapped driver remains the PyMeasure implementation. Instro's provenance, activity and driver coverage are separate from this entry. [Publishing integration](#source-instro-publisher).
