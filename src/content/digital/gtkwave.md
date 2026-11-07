---
{
  "name": "GTKWave",
  "aliases": [],
  "description": "GTK-based waveform viewer for Verilog VCD/EVCD and FST traces, with signal search, saved sessions and value translation for digital debug. Current master is GTKWave 4 pre-alpha; its format and build support must be distinguished from the separately maintained 3.3 LTS line.",
  "scope": {
    "verification": {
      "ai": false
    }
  },
  "access": "GPL-2.0-or-later public source; current master uses Meson and documented GTK dependencies. Platform packages and 3.3 LTS builds may expose different features and legacy formats.",
  "addedAt": "2026-11-07",
  "reviewedAt": "2026-11-07",
  "sources": [
    {
      "id": "code",
      "title": "Canonical GTKWave repository",
      "url": "https://github.com/gtkwave/gtkwave",
      "purpose": "code"
    },
    {
      "id": "website",
      "title": "Official GTKWave documentation",
      "url": "https://gtkwave.github.io/gtkwave/",
      "purpose": "official"
    },
    {
      "id": "readme",
      "title": "Reviewed master formats and build entry point",
      "url": "https://github.com/gtkwave/gtkwave/blob/e40ba7937336824f12f7db870ea36f6f090dd90d/README.md"
    },
    {
      "id": "activity",
      "title": "Reduce minimum window width and move time-range settings into a dialog",
      "url": "https://github.com/gtkwave/gtkwave/commit/e40ba7937336824f12f7db870ea36f6f090dd90d"
    },
    {
      "id": "zoom-fix",
      "title": "Correct initial zoom-fit allocation ordering",
      "url": "https://github.com/gtkwave/gtkwave/commit/8c2107b8bf860f0a6c2a055e32d8ed1d3a7fcc57"
    },
    {
      "id": "zoom-retained",
      "title": "Retained waveform-view allocation correction",
      "url": "https://github.com/gtkwave/gtkwave/blob/e40ba7937336824f12f7db870ea36f6f090dd90d/src/gw-wave-view.c"
    },
    {
      "id": "formats",
      "title": "Reviewed format documentation and GTKWave 4 deprecation boundary",
      "url": "https://github.com/gtkwave/gtkwave/blob/e40ba7937336824f12f7db870ea36f6f090dd90d/docs/intro/formats.md"
    },
    {
      "id": "lts-boundary",
      "title": "Official SourceForge LTS and future-development boundary",
      "url": "https://gtkwave.sourceforge.net/"
    },
    {
      "id": "build-license",
      "title": "Master pre-alpha version, Meson build and GPL-2.0-or-later declaration",
      "url": "https://github.com/gtkwave/gtkwave/blob/e40ba7937336824f12f7db870ea36f6f090dd90d/meson.build"
    }
  ]
}
---

### Implementation and scope

Waveform inspection, signal search, saved sessions and value translation support conventional Verification/debug. GTKWave consumes traces produced by other tools; it does not itself simulate RTL or prove properties. Supported Verilog VCD/EVCD and FST workflows qualify independently of its additional GHW support. [Reviewed master README](#source-readme) · [Format documentation](#source-formats).

### Selection and reviewed activity

Select for sustained substantive waveform-debug development and maintenance. November 3 master changes reduce the minimum window width and correct initial zoom-fit allocation ordering, with retained waveform-view code showing the size update before the GTK parent allocation callback. Canonical master first-parent history supplies this entry's activity; LTS history is not added to its counts. [Window/time-range change](#source-activity) · [Zoom repair](#source-zoom-fix) · [Retained implementation](#source-zoom-retained).

### Branch, license and format boundaries

The reviewed master identifies itself as 4.0.0-prealpha and uses Meson with documented GTK dependencies under GPL-2.0-or-later. SourceForge separately hosts 3.3 LTS and directs future development to GitHub. The format documentation mixes legacy support and planned GTKWave 4 deprecations; this entry does not promise all LXT/LXT2/VZT or vendor-format paths as current-master stable capabilities. Package, platform and branch differences require checking before use. No upstream viewer build or trace-format experiment was run. [Build/version/license](#source-build-license) · [Official LTS boundary](#source-lts-boundary) · [Format boundary](#source-formats).

### Development provenance

Conventional viewer behavior does not imply any AI runtime role. No software-development badge is inferred from general tooling or author style without direct attribution of retained executable code. [Reviewed master change](#source-activity).
