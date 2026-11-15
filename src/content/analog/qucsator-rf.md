---
name: "QucsatorRF"
aliases: ["Qucsator-RF"]
summary: "Independent command-line RF/microwave circuit simulation kernel used by Qucs-S."
description: "Command-line RF and microwave circuit simulator that reads netlists and produces Qucs datasets, with the companion QucsconvRF format converter. It provides the numerical engine used by the separate Qucs-S GUI; recent development fixes S-parameter characteristic export and optional ADMS builds beyond release 1.0.7."
scope:
  simulation:
    ai: false
access: "GPL version 2 license text with GPL-2.0-or-later source headers. Usually packaged with Qucs-S, but independently buildable as qucsator_rf/qucsconv_rf. Source builds require CMake, Flex, Bison, Gperf and Dos2unix; ADMS is optional and disabled by default. Reviewed develop fixes are later than standalone release 1.0.7."
addedAt: "2026-11-15"
reviewedAt: "2026-11-15"
sources:
  - id: "code"
    title: "Canonical QucsatorRF simulation-kernel repository"
    url: "https://github.com/ra3xdh/qucsator_rf"
    purpose: "code"
  - id: "readme"
    title: "Independent CLI engine, Qucs-S GUI relationship and build requirements"
    url: "https://github.com/ra3xdh/qucsator_rf/blob/f3d1ffd291e4300d52808f542d9d631b945901aa/README.md"
  - id: "qucs-s"
    title: "Separate Qucs-S GUI repository"
    url: "https://github.com/ra3xdh/qucs_s"
  - id: "activity"
    title: "October 20 integrated sequential ADMS generation fix"
    url: "https://github.com/ra3xdh/qucsator_rf/commit/e1fcb7df4784226f7aba8c6c592d85e597673674"
  - id: "adms-build"
    title: "Retained optional Verilog-A build dependency ordering"
    url: "https://github.com/ra3xdh/qucsator_rf/blob/f3d1ffd291e4300d52808f542d9d631b945901aa/src/components/verilog/CMakeLists.txt"
  - id: "adms-review"
    title: "Merged ADMS PR with race explanation, regeneration cost and reported checks"
    url: "https://github.com/ra3xdh/qucsator_rf/pull/46"
  - id: "characteristics-fix"
    title: "October 20 saveCVs lifetime correction and RLCG regression netlist"
    url: "https://github.com/ra3xdh/qucsator_rf/commit/971b1677b8893b63b62623d17f598048f97ce7d4"
  - id: "windows-fix"
    title: "August 27 integrated Windows open-name lookup correction"
    url: "https://github.com/ra3xdh/qucsator_rf/commit/951bfedf5210654fc82309c2054bef922e4dcaac"
  - id: "solver"
    title: "Retained S-parameter solver and GPL-2.0-or-later header"
    url: "https://github.com/ra3xdh/qucsator_rf/blob/f3d1ffd291e4300d52808f542d9d631b945901aa/src/spsolver.cpp"
  - id: "release"
    title: "Standalone QucsatorRF 1.0.7, July 22, 2025"
    url: "https://github.com/ra3xdh/qucsator_rf/releases/tag/1.0.7"
  - id: "license"
    title: "GNU General Public License version 2 text"
    url: "https://github.com/ra3xdh/qucsator_rf/blob/f3d1ffd291e4300d52808f542d9d631b945901aa/COPYING"
---

### Independent engine and selection

QucsatorRF takes netlists and executes circuit analysis; QucsconvRF converts data formats. Qucs-S is a separate schematic/analysis GUI and recommends or packages this kernel, alongside other engines. Their canonical repositories, implementation responsibilities and activity histories differ, so this engine entry does not duplicate the existing Qucs-S frontend entry. Packaging together is not independent activity evidence for both; this record uses only qucsator_rf's actual default develop branch. [Engine relationship](#source-readme) · [Separate GUI](#source-qucs-s) · [Numerical implementation](#source-solver)

Low-frequency maintenance is substantive: the August 27 Windows fix qualifies the RF open component to avoid a libc name collision. On October 20, saveCVs export replaces a dangling temporary-string pointer with an owned string and adds an RLCG S-parameter regression netlist. A separate integrated ADMS fix serializes code generation to prevent shared temporary-file corruption in parallel builds. Together they establish meaningful current maintenance despite the old standalone release. [Windows integration](#source-windows-fix) · [Correctness and regression](#source-characteristics-fix) · [Meaningful ADMS integration](#source-activity)

The meaningful checkpoint is the October 20 ADMS merge, not the later same-day Mac CI attempt. The retained build file implements the dependency chain. The PR reports before/after Ninja and Make checks and explains that editing one Verilog-A file also regenerates later modules; these upstream results were not independently rerun. [Retained code](#source-adms-build) · [PR and trade-off](#source-adms-review)

### Release, scope and access

Standalone release 1.0.7 dates to July 22, 2025. Reviewed develop is eight reachable commits ahead, including side-branch commits; those are not eight first-parent activity events. The recent Windows, saveCVs and ADMS fixes are development-branch capabilities, not claims about that standalone release. Qucs-S package contents may differ and need version-specific checking. [Release](#source-release) · [Current engine](#source-readme) · [Integrated changes](#source-activity)

Simulation is conventional numerical circuit evaluation. The engine provides neither schematic editing nor physical layout generation, so the GUI's Design coverage is not transferred here. Reviewed history and implementation do not establish learned inference or a qualifying attributed AI implementation; no runtime AI prefix or development badge is assigned. [Engine source](#source-solver) · [Project role](#source-readme)

The repository ships GPL version 2 text; the inspected solver header permits version 2 or later. The CLI is independently buildable and uses the standard C++ runtime; build-time parser/code-generation tools and optional ADMS are separate requirements. ADMS is disabled by default, so its build fix does not imply arbitrary Verilog-A model support or a new runtime AI path. [License text](#source-license) · [Source grant](#source-solver) · [Build requirements](#source-readme) · [Optional ADMS path](#source-adms-build)
