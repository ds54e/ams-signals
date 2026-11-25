---
name: "SigMF Python"
aliases: []
description: "Python library for reading, writing and validating Signal Metadata Format recordings and collections. It associates stored samples with capture and annotation metadata and can package recordings for interchange; it does not acquire samples live or establish that the original recording was calibrated."
scope: {"analysis": {"ai": false}}
access: "LGPL-3.0 Python implementation; record files and compatible data types are required."
addedAt: "2026-11-24"
reviewedAt: "2026-11-25"
sources:
  - id: code
    title: "Canonical public implementation"
    url: "https://github.com/sigmf/sigmf-python"
    purpose: code
  - id: activity
    title: "Reviewed substantive implementation checkpoint"
    url: "https://github.com/sigmf/sigmf-python/commit/9cdefc8421c1f133403a691717dbd69c8725a532"
  - id: website
    title: "Official Python implementation documentation"
    url: "https://sigmf.readthedocs.io/en/latest/"
    purpose: official
  - id: spec
    title: "Signal Metadata Format specification"
    url: "https://sigmf.org/"
  - id: source-release
    title: "Source release v1.15.0"
    url: "https://github.com/sigmf/sigmf-python/releases/tag/v1.15.0"
  - id: package
    title: "Reviewed PyPI package 1.14.0"
    url: "https://pypi.org/project/sigmf/1.14.0/"
  - id: earlier
    title: "Capture dataset priority correction"
    url: "https://github.com/sigmf/sigmf-python/commit/241ed97f7e4f9ef46482c18bea3ca5ebc1c7e59c"
  - id: generator-removal
    title: "October 19 removal of the synthetic signal generator from the package"
    url: "https://github.com/sigmf/sigmf-python/commit/87b809f871fa51750fbf25456077d0b17dfa8da0"
  - id: public-api
    title: "Retained public API at the 1.15.0 source revision"
    url: "https://github.com/sigmf/sigmf-python/blob/87b809f871fa51750fbf25456077d0b17dfa8da0/sigmf/__init__.py"
---

### Scope and release boundary

Analysis covers inspecting and converting stored RF/IQ recordings and their metadata. This is neither an SDR driver nor the specification itself, and does not duplicate TDMS or oscilloscope-file readers. [Python API](#source-website) · [Format specification](#source-spec).

March work addressed dataset selection and October work expanded archive handling and regression coverage for non-conforming datasets. Use the matching source or package reference: the v1.15.0 source release and reviewed PyPI 1.14.0 are distinct. [Earlier change](#source-earlier) · [Archive implementation](#source-activity) · [Source release](#source-source-release) · [PyPI](#source-package).

## Reviewed implementation update, November 25, 2026

The final October 19 integration removes SigMFGenerator, its implementation, documentation and tests, explicitly narrowing the project's scope. The retained 1.15.0 module exports recording/collection and conversion APIs rather than the former synthetic generator. Keep the recorded-data Analysis classification; do not infer signal-generation or live acquisition capability from earlier history or the reviewed 1.14.0 package. This is a substantive public-API removal after the same-day archive fixes, not merely a version change, and the meaningful commit SHA is updated without changing its date. [Removal](#source-generator-removal) · [Retained exports](#source-public-api).

Source inspection only; no physical measurement, programming, service migration or upstream regression was independently executed.
