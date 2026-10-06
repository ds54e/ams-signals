# Visual system

AMS Signals is a text-first technical research index. Equivalent information shares typography, spacing, separators and contextual links; reading, listing and explorer surfaces retain distinct functional widths. Use a warm off-white background, blue links, pastel category fills and a light/dark semantic palette. Flat rows and restrained categories communicate information, not quality or ranking.

## Ownership

| File under `src/styles/` | Responsibility |
| --- | --- |
| `foundation.css` | Semantic colors, category tokens/aliases, system/Japanese font fallbacks, type/spacing/layout tokens, reset, shell, focus and reduced motion |
| `index.css` | Shared index titles, summaries, dates, metadata/counts, links, category labels and rows |
| `filters.css` | Native controls and rule-free utility toolbars |
| `event-explorer.css` | Company picker, Timeline glyphs, geometry/inspector and Events row structure |
| `global.css` | Ordered global imports plus factual/entity document context; loaded by BaseLayout |
| `catalog.css` | One catalog presentation loaded by CatalogIndex; no second domain stylesheet |

CSS owns implemented values. Keep this contract aligned when values deliberately change, without cloning literals into unrelated components. Shared catalog markup uses `CatalogIndex.astro`; catalogs and factual Event pages use shared primitives while retaining their own semantics. No remote webfonts, frontend framework or runtime data fetching is introduced for styling.

## Typography and rhythm

| Information | Size / weight | Line height |
| --- | --- | --- |
| Index title | 17px / 650 | 1.45 |
| Summary, project description, Event fact | 15px / 400, muted | 1.65 |
| Controls | 13px | native control box |
| Context links and metadata | 13px / 400 | 1.45 |
| Event / Scope category labels | 11px / 500 | 1.4 |
| Dates | 12px / 400 | 1.45 |

Rows use 20px top / 22px bottom padding and subtle one-pixel separators. The first visible row has no top rule, including after filtering. Title-to-summary gap is 8px. Context links sit directly beside plain-text catalog names, with baseline-aligned wrapping and 16px gaps. Scope is a vertical stack of fit-content labels with 4px gaps.

Fonts start with Segoe UI, Helvetica Neue and Arial, followed by local Japanese fallbacks. Index titles use zero tracking. `text-wrap: pretty` is progressive enhancement.

Dates share `formatDate` in `src/lib/date-format.ts` and `.index-date`: title-case abbreviated English month, unpadded day, the date's actual year, zero tracking, system-sans tabular numerals and muted color. Preserve Event month/year precision and ranges rather than manufacturing an exact day.

## Measures and responsive layout

| Token | Maximum | Surface |
| --- | --- | --- |
| `--layout-reading` | 800px | Factual reading pages |
| `--layout-listing` | 1040px | Events, Analog and Digital indexes |
| `--layout-explorer` | 1200px | Shell and Timeline explorer |

At full listing width, dated rows use 138px date + 24px gap + 878px copy; catalogs use 150px metadata rail + 24px gap + 866px body. Their outer edges align. No visible Project/Scope/Activity header row. At or below 760px, catalog content comes first with its compact rail immediately below; dates stack on Event indexes. These indexes must not require horizontal page scrolling. Timeline retains local visualization scrolling.

Navigation is Timeline | Events | Analog | Digital, normally 15px; at or below 520px it uses 13px, with 5px gaps below 360px. Catalog descriptions keep their 15px size rather than shrinking to fit.

## Activity and toolbars

The rail order is date, activity band, Scope. Twelve cells run oldest-left to newest/current-right in DOM, hover text, hidden descriptions and data attributes. Cells are 6px by 8px with 2px gaps, giving a 94px band. Leave 6px below the date and 10px between band and Scope. No visible month total; contextual counts remain accessible. Empty cells have a pale neutral fill; active cells use one fixed blue appearance with at least 3:1 contrast against the page. Hover text and accessible month descriptions preserve the data; forced colors use outlined empty and filled active cells. Counts do not encode visible strength, age or quality.

[Catalog activity semantics](catalog/CONTRACT.md#reviewed-public-activity) distinguish repository counts from point evidence. Their common presentation does not fabricate commits or erase canonical provenance. The accessible window label says oldest to newest.

Controls use whitespace rather than toolbar border rules, cards or shadows. Native controls are 40px high with 13px text. Toolbars leave 22px before the ruled list or visualization. The Timeline Company picker has a thin border and no shadow; it remains above overlapping content on desktop and in-flow on narrow screens. Events has Search and Signal type only.

Catalog Search is about 290px and Scope select 160px; the 12px normal-weight result count follows with 12px gaps. Search takes a full row below 760px. Events and both catalogs align control boxes and the top list rule at the same position. Grid labels eliminate inline baseline spacing; Events lets controls and count share the toolbar flow rather than reserving a separate nested row. All toolbars order controls, count/status, then any legend, wrapping naturally without pushing status to the far edge. `.index-count` is shared, muted and tabular.

## Category labels and palette

`.category-label` owns natural-case system-sans 11px/500, 1.4 line height, zero tracking, square corners and 3px by 7px padding. Catalog and Event labels share geometry and typography. Functional classes map `--category-fill` and `--category-text`; AI-prefixed stages inherit their stage color. Timeline legends remain lighter and retain category shapes.

`foundation.css` owns the five category families; `--technical` aliases blue and `--organizational` aliases rust for labels. Catalog/Event labels use these theme-aware tokens. Timeline glyphs and legends use the fixed blue/rust fills described below. This is visual consistency, not a merger of Golden kinds and catalog Scope.

| Token | Meaning | Light | Dark |
| --- | --- | --- | --- |
| `--category-green` | Design | #226447 | #95b0a3 |
| `--category-blue` | Simulation / Verification / Technical | #4b6d89 | #8fa9be |
| `--category-gold` | Synthesis | #787043 | #b4ac7e |
| `--category-rust` | Layout / Organizational | #886454 | #b69682 |
| `--category-purple` | Development provenance | #766281 | #c5afd3 |

Category text uses its named palette token over a corresponding `--category-*-soft` fill. Light fills are #e3eee8 (green), #e5edf4 (blue), #f8f6e9 (gold) and #f7f0eb (rust); dark fills use the same semantic families with readable contrast. The light gold/rust fills are slightly paler to keep the approved small text readable. Keep small-text contrast at least 4.5:1; compute it against the rendered/composited background, not a transparent element alone. Blue/rust glyphs must remain discernible on page and surface backgrounds. Do not substitute the danger token for provenance.

AI-ASSISTED and AI-BUILT share muted-purple text, a 1px light-purple border and transparent background through `[data-ai-development]`, with opacity 1 and identical typography, padding, height and interaction styling. Text distinguishes the labels. Padding is 2px by 6px to account for the border; both retain the same 21.4px total height as functional labels. A 4px extra top margin creates an 8px gap after functional stages. Enhanced buttons have visible focus and a 3px hit-area extension on each edge.

The inline row-spanning evidence panel uses a restrained purple rule, 13px heading, 14px factual explanation and 13px source links. Evidence remains readable without JavaScript; inactive controls are not exposed. The [catalog contract](catalog/CONTRACT.md#presentation-and-disclosure) owns behavior.

Text and shapes carry meaning without color. Shared forced-color labels use CanvasText/Canvas and a system outline; provenance uses the same system text and outline treatment. Activity preserves binary filled/open distinctions independently from Scope.

## Page starts and Timeline frame

Timeline, Events, Analog and Digital begin with their controls, without a visible section title or descriptive sentence. Their visually hidden H1 and metadata descriptions remain for accessibility and search/indexing. Do not add comparison controls or demo annotations to published pages.

The shell has 40px gutters above 820px and 18px below. Timeline uses a 170px name column and 268px inspector with a 28px gap; the inspector stacks below 1230px. The name column becomes 153px on narrow screens. The axis is a 37px flat surface with “Company / Person” in its left cell. Its right border continues through every entity label and matches other vertical guides: 1px and 60% of the border token. Rows have subtle one-pixel horizontal rules.

## Timeline glyphs and targets

Timeline entity names use the existing Company/Person classification in both the global Matrix and context Timelines. Their light-theme text colors are #242b30 for Companies and #4b6d89 for People; dark themes use the readable text gray and category blue tokens. These colors apply only to graph names and remain stable on hover, with the existing underline, row tint, typography and navigation preserved.

All global/Company/Person marks share `.timeline-mark > .timeline-glyph`. Visible glyphs and legends are 8 by 8px: Technical is a solid #4b6d89 circle, Organizational a solid #886454 square without rounded corners. `event-explorer.css` owns their shared fill tokens, fixed across light/dark themes. Glyphs have no border, outer outline or shadow. An 18 by 18px transparent button is the hit area. `TIMELINE_HIT_SIZE` owns that dimension for context placement, Matrix packing and the CSS variable, so overlapping targets are not hidden behind smaller packing rectangles.

Selection and hover scale only the glyph to 1.15 without adding a ring. Keyboard focus remains visible on the larger target. Sticky labels occlude scrolling marks without clearing selection. Forced colors retain the shapes, matching system fills for glyphs/legends and the same selection scaling. Geometry/filter semantics belong to the [Timeline contract](TIMELINE.md).

## Visual verification

For relevant visual changes inspect the affected surfaces at 1440x900, 1280x800, 1024x768, 390x844 and 320x568, with light/dark themes, keyboard, forced colors, no-JavaScript where applicable and open popovers. Review representative long/multi-link/multi-stage rows. Keep screenshots as task/PR evidence, not a cumulative repository archive.

`category-palette.spec.ts` protects shared token propagation, semantic mapping, contrast and forced colors; `visual-system.spec.ts` protects hierarchy, measures and toolbars; `timeline-visual.spec.ts` protects glyph/hit/selection behavior. Catalog and release suites protect their interactions and data wiring. [Testing](TESTING.md) owns check selection.
