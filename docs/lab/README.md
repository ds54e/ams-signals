# Lab: Board, Test & Measurement

Lab catalogs public technical projects for evaluation boards and fixtures, instrument and DUT control, measurement acquisition and analysis, and test automation. It is independent of the Golden Events corpus. See the [shared catalog contract](../catalog/CONTRACT.md) and [AI-development policy](../AI_DEVELOPMENT.md).

Classify by the primary operation and inputs/outputs. A network or EM field solver remains Analog even if it takes board files; an RTL or on-chip DFT tool remains Digital. A program that controls a DUT, acquires measurements or processes tester records belongs in Lab. A GUI and a separately usable API may each have an entry, but shared engines, parsers and instrument stacks are not independent evidence; record their relationships in notes and sources.

## Scope

| Scope | Meaning |
| --- | --- |
| Board & Fixture (`board`) | Evaluation boards, fixtures, calibration hardware and fabrication/assembly outputs |
| Control (`control`) | Instrument, DUT, power or thermal control |
| Acquisition (`acquisition`) | Capturing measured values, traces or timestamps |
| Analysis (`analysis`) | Waveform, stability, jitter, STDF and wafer-map analysis |
| Test Automation (`test`) | Test plans, resource coordination, verdicts, results and repeatable checks |

Use the [strict Lab schema](../../src/lib/lab/schema.ts). Require at least one functional stage. Each stage records runtime AI separately from evidence-backed AI-ASSISTED development. Keep descriptions concise, in English, and distinguish public source from hardware, calibration, instrument specifications and third-party dependencies. Put limits and references in article notes; do not imply that simulation, source inspection or a synthetic check demonstrates hardware accuracy.

## Active-list eligibility

Review a meaningful public implementation or test change within the preceding calendar year and at least one reviewed signal in the displayed twelve calendar months. Use the canonical implementation, not a mirror or companion repository. For a reviewed maintained fork used as the canonical implementation, bind the refresh allowance to its catalog slug, repository name and exact GitHub ID. Link the origin separately when it explains lineage, without adding its activity to the maintained fork's counts. The manual refresh entrypoint owns the exact exceptions.

Run `npm run validate:lab` for the content and snapshot contract and `npm run refresh:lab-activity` only when explicitly collecting activity. Use the [catalog refresh skill](../../.agents/skills/ams-signals-catalog-refresh/SKILL.md) for new registrations, captures and rollover. A failed new fetch remains marked unfetched without guessed counts; an existing good snapshot is not overwritten on failure. Build and tests work from checked-in records without contacting repository hosts.

The public surface is `/lab/`. Search, functional Scope filters, `#<id>--name` anchors and primary links follow the shared catalog index. No public ranking, status taxonomy, project detail route or JSON export is defined.
