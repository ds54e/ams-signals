# Visual system

AMS Signals is a text-first technical research index and editorial site. Equivalent information shares typography, spacing, separators and contextual links; reading, listing and explorer surfaces retain distinct functional widths. Use the warm background, green accent and light/dark semantic palette. Flat rows and restrained categories communicate information, not quality or ranking.

## Ownership

| File under `src/styles/` | Responsibility |
| --- | --- |
| `foundation.css` | Semantic colors, category tokens/aliases, system/Japanese font fallbacks, type/spacing/layout tokens, reset, shell, focus and reduced motion |
| `index.css` | Shared index titles, summaries, dates, metadata/counts, links, category labels and rows |
| `filters.css` | Native controls and rule-free utility toolbars |
| `event-explorer.css` | Company picker, Timeline glyphs, geometry/inspector and Events row structure |
| `articles.css` | Long-form prose, citations and related content |
| `global.css` | Ordered global imports plus factual/entity document context; loaded by BaseLayout |
| `catalog.css` | One catalog presentation loaded by CatalogIndex; no second domain stylesheet |

CSS owns implemented values. Keep this contract aligned when values deliberately change, without cloning literals into unrelated components. Shared catalog markup uses `CatalogIndex.astro`; differing Article/Event semantics need shared primitives, not forced component unification. No remote webfonts, frontend framework or runtime data fetching is introduced for styling.

## Typography and rhythm

| Information | Size / weight | Line height |
| --- | --- | --- |
| Index title | 17px / 700 | 1.35 |
| Summary, project description, Event fact | 15px / 400, muted | 1.65 |
| Controls | 14px | native control box |
| Context links and metadata | 13px / 400 | 1.45 |
| Event / Scope category labels | 10px / 600 | 1.4 |
| Dates | 12px / 400 | 1.45 |
| Article prose above 760px | 17px / 400 | 1.85 |
| Article prose at or below 760px | 16px / 400 | 1.72 |

Rows use 22px top / 24px bottom padding and subtle one-pixel separators. The first visible row has no top rule, including after filtering. Title-to-summary gap is 9px. Context links sit directly beside plain-text catalog names, with baseline-aligned wrapping and 12px gaps. Scope is a vertical stack of fit-content labels with 3px gaps.

Fonts start with `system-ui`, platform UI fonts and local Japanese fallbacks, not an unloaded Inter declaration. Japanese titles use zero tracking and strict line breaking; Latin index titles use -0.005em tracking. `text-wrap: pretty` is progressive enhancement. Article prose is not an index summary.

Article paragraph margins are 1.15em on desktop and 1.02em (16.32px) at or below 760px. Mobile h2 is 1.32rem and h3 is 1.16rem; lists and blockquotes inherit the body rhythm. Preserve header/index typography and existing heading margins. Code and tables scroll locally; images remain responsive.

Dates share `formatDate` in `src/lib/date-format.ts` and `.index-date`: uppercase abbreviated English month, unpadded day, the date's actual year, zero tracking, monospace tabular numerals and muted color. Preserve Event month/year precision and ranges rather than manufacturing an exact day.

## Measures and responsive layout

| Token | Maximum | Surface |
| --- | --- | --- |
| `--layout-reading` | 800px | Articles and factual reading pages |
| `--layout-listing` | 920px | Articles, Events, Analog and Digital indexes |
| `--layout-explorer` | 1360px | Shell and Timeline explorer |

At full listing width, dated rows use 108px date + 22px gap + 790px copy; catalogs use 122px metadata rail + 12px gap + 786px body. Their outer edges align. No visible Project/Scope/Activity header row. At or below 760px, catalog content comes first with its compact rail immediately below; dates stack on Article/Event indexes. These indexes must not require horizontal page scrolling. Timeline retains local visualization scrolling.

Navigation is Timeline | Events | Analog | Digital, normally 15px; at or below 360px it uses 14px with 5px gaps. Catalog descriptions keep their 15px size rather than shrinking to fit.

## Activity and toolbars

The rail order is date, activity band, Scope. Twelve cells run oldest-left to newest/current-right in DOM, hover text, hidden descriptions and data attributes. Cells are 5px by 10px with 2px gaps, giving an 82px band. Leave 4px below the date and 10px between band and Scope. No visible month total; contextual counts remain accessible. Empty cells have a discernible outline; active cells use one fixed appearance. Counts do not encode visible strength, age or quality.

[Catalog activity semantics](catalog/CONTRACT.md#reviewed-public-activity) distinguish repository counts from point evidence. Their common presentation does not fabricate commits or erase canonical provenance. The accessible window label says oldest to newest.

Controls use whitespace rather than toolbar border rules, cards or shadows. Native controls are 44px high with 14px text. Catalog/Event rows supply 22px below the toolbar; Timeline leaves 20px before the visualization. Company picker is raised on desktop and in-flow on narrow screens.

Catalog Search is about 300px and Scope select 150px; the 13px normal-weight result count follows with 12px gaps. Search takes a full row below 600px. All toolbars order controls, count/status, then any legend, wrapping naturally without pushing status to the far edge. `.index-count` is shared, muted and tabular. Articles shows its derived collection count without adding controls.

## Category labels and palette

`.category-label` owns uppercase system-sans 10px/600, 1.4 line height, 0.025em tracking, 3px radius and 3px by 5px padding. Catalog and Event labels share geometry and typography. Functional classes only map `--category-fill`; AI-prefixed stages inherit their stage color. Timeline legends remain lighter and retain category shapes.

`foundation.css` owns the five category families; `--technical` aliases blue and `--organizational` aliases rust for labels. Catalog/Event labels use these theme-aware tokens. Timeline glyphs and legends use the fixed blue/rust fills described below. This is visual consistency, not a merger of Golden kinds and catalog Scope.

| Token | Meaning | Light | Dark |
| --- | --- | --- | --- |
| `--category-green` | Design | #4f7065 | #95b0a3 |
| `--category-blue` | Simulation / Verification / Technical | #4b6d89 | #8fa9be |
| `--category-gold` | Synthesis | #787043 | #b4ac7e |
| `--category-rust` | Layout / Organizational | #886454 | #b69682 |
| `--category-red` | Development provenance | #8d5967 | #bb959f |

Filled-label `--category-ink` is #ffffff in light mode and #14231f in dark mode. Keep small-text contrast at least 4.5:1; compute it against the rendered/composited background, not a transparent element alone. Blue/rust glyphs must remain discernible on page and surface backgrounds. Do not substitute the danger token for provenance.

AI-ASSISTED and AI-BUILT share muted-red text, thin inset outline and transparent background through `[data-ai-development]`, with opacity 1 and identical typography, padding, height and interaction styling. Text distinguishes the labels. They retain 20px badge geometry within the rail; 5px extra top margin creates an 8px gap after functional stages. Enhanced buttons have visible focus and a 3px hit-area extension on each edge.

The inline row-spanning evidence panel uses a restrained red rule, 13px heading, 14px factual explanation and 13px source links. Evidence remains readable without JavaScript; inactive controls are not exposed. The [catalog contract](catalog/CONTRACT.md#presentation-and-disclosure) owns behavior.

Text and shapes carry meaning without color. Shared forced-color labels use CanvasText/Canvas and a system outline; provenance removes the normal inset shadow through one shared rule. Activity preserves binary filled/open distinctions independently from Scope.

## Timeline glyphs and targets

All global/Company/Person marks share `.timeline-mark > .timeline-glyph`. Visible glyphs and legends are 8 by 8px: Technical is a solid #4b6d89 circle, Organizational a solid #886454 square without rounded corners. `event-explorer.css` owns their shared fill tokens, fixed across light/dark themes. Glyphs have no border, outer outline or shadow. An 18 by 18px transparent button is the hit area. `TIMELINE_HIT_SIZE` owns that dimension for context placement, Matrix packing and the CSS variable, so overlapping targets are not hidden behind smaller packing rectangles.

Selection and hover scale only the glyph to 1.15 without adding a ring. Keyboard focus remains visible on the larger target. Sticky labels occlude scrolling marks without clearing selection. Forced colors retain the shapes, matching system fills for glyphs/legends and the same selection scaling. Geometry/filter semantics belong to the [Timeline contract](TIMELINE.md).

## Review changes, not old screenshots

For relevant visual changes inspect the affected surfaces at 1440x900, 1280x800, 1024x768, 390x844 and 320x568, with light/dark themes, keyboard, forced colors, no-JavaScript where applicable, Japanese Article prose and open popovers. Review representative long/multi-link/multi-stage rows. Keep screenshots as task/PR evidence, not a cumulative repository archive.

`category-palette.spec.ts` protects shared token propagation, semantic mapping, contrast and forced colors; `visual-system.spec.ts` protects hierarchy, measures, Japanese typography and toolbars; `timeline-visual.spec.ts` protects glyph/hit/selection behavior. Catalog and release suites protect their interactions and data wiring. [Testing](TESTING.md) owns check selection. Do not preserve historical screenshot totals, project counts or refinement narratives as current requirements.
