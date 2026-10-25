# Visual system

AMS Signals is a text-first technical research index. Equivalent information shares typography, spacing, separators and contextual links; reading, listing and explorer surfaces retain distinct functional widths. Use a white background, cool light-gray dashboard panels, blue navigation/links and the existing pastel semantic category fills. The interface retains its light palette under either system color-scheme preference. Flat rows and restrained categories communicate information, not quality or ranking.

## Ownership

| File under `src/styles/` | Responsibility |
| --- | --- |
| `foundation.css` | Semantic colors, category tokens/aliases, system/Japanese font fallbacks, type/spacing/layout tokens, reset, shell, focus and reduced motion |
| `index.css` | Shared index titles, summaries, dates, metadata/counts, links, category labels and rows |
| `filters.css` | Native controls and rule-free utility toolbars |
| `event-explorer.css` | Company picker, Timeline glyphs, geometry/inspector and Events row structure |
| `global.css` | Ordered global imports plus factual/entity document context; loaded by BaseLayout |
| `dashboard.css` | Home cards, activity chart and recent project updates |
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
| `--layout-listing` | 1040px | Entity headers |
| `--layout-explorer` | 1200px | Shell, Timeline, Events, Analog and Digital indexes |

Events and both catalogs share a 120px metadata rail and zero column gap above 760px. At the full 1200px listing width this leaves a 1080px body, with 20px text insets on each side and 1040px readable copy. Text insets become 12px at or below 760px and 8px at or below 400px. Their outer edges and Search starting positions align with Timeline.

Only `.index-description` has the #f7f8fa surface: Event facts and catalog descriptions. Titles, Company/Person context links, quick links, metadata and provenance remain on white. The shared class adds 8px top/bottom padding on desktop, 6px at or below 760px, and 4px at or below 400px. Its inert pseudo-element paints 10px beyond each side of the text on desktop, 12px at 401–760px and 8px at 400px or below. Background extent is independent from text alignment; changing it must not rewrap or shift text. Empty descriptions do not paint a surface. Forced colors use Canvas.

`index.css` owns these shared measures and the Description primitive. At or below 760px, catalog content comes first with metadata below; Event dates come before the body. Stacked panes have no external gap: Events retains 8px before its body text and catalogs 13px after the overview as internal spacing. No visible Project/Scope/Activity header row or horizontal page scroll is introduced. Timeline and its fallback rows retain their existing geometry and local visualization scrolling.

Navigation is Home | Timeline | Events | Analog | Digital | GitHub, with compact 13px links, a gray active-page fill and blue active text. Narrow headers put navigation on its own locally scrollable row. Catalog descriptions keep their 15px size rather than shrinking to fit.

## Activity and toolbars

The rail order is date, activity band, Scope. Twelve cells run oldest-left to newest/current-right in DOM, hover text, hidden descriptions and data attributes. Cells are 6px by 8px with 2px gaps, giving a 94px band. Leave 6px below the date and 10px between band and Scope. No visible month total; contextual counts remain accessible. Empty cells have a pale neutral fill; active cells use one fixed blue appearance with at least 3:1 contrast against the page. Hover text and accessible month descriptions preserve the data; forced colors use outlined empty and filled active cells. Counts do not encode visible strength, age or quality.

[Catalog activity semantics](catalog/CONTRACT.md#reviewed-public-activity) distinguish repository counts from point evidence. Their common presentation does not fabricate commits or erase canonical provenance. The accessible window label says oldest to newest.

Home uses light-gray rounded panels in equal two-column grids with matching 16px center gutters. The top grid stacks at or below 1020px and the project grid at or below 980px. Activity Trend uses three straight connected lines (blue Events, green Analog, orange Digital), 2.5px wide, over matching gradient areas fading from 13% opacity at the plot top to transparent at the shared 242px baseline. Each series scales independently to its own largest real count in the displayed twelve months at 100%, 218px above the baseline; an all-zero series stays at 0%. The vertical axis labels 0%, 25%, 50%, 75% and 100%; the horizontal axis shows abbreviated month names without years. Percentages express within-series trends. There are no markers, hover titles, tooltips, interaction or animation. There is no visible annotation below the graph; hidden HTML explains normalization and the partial current month, and the accessible monthly table retains raw counts with full month/year labels. On narrow screens the chart scrolls locally. Four Recent Signals use decorative 20px inline SVGs with a 1.6px line width matching the project icons, inside their existing holders: Lucide 0.456.0 flask-conical for Technical and a simplified two-building outline with doorway for Organizational (matching the approved preview), selected only by kind. Accessible text retains the kind meaning. Recently updated project cards retain full descriptions. In forced colors, lines, grid and percentage labels use readable system colors, Analog and Digital lines gain distinct dash patterns, and gradient areas disappear. The existing accessible monthly count table becomes visible so every series remains identifiable without color.

Controls use whitespace rather than toolbar border rules, cards or shadows. Native controls are 40px high with 13px text. Toolbars leave 22px before the ruled list or visualization. The Timeline Company picker has a thin border and no shadow; it remains above overlapping content on desktop and in-flow on narrow screens. Events has Search and Signal type only.

Catalog Search is about 328px and Scope select 160px; the 12px normal-weight result count follows with 12px gaps. Search takes a full row below 760px. Events and both catalogs align control boxes and the top list rule at the same position. Grid labels eliminate inline baseline spacing; Events lets controls and count share the toolbar flow rather than reserving a separate nested row. All toolbars order controls, count/status, then any legend, wrapping naturally without pushing status to the far edge. `.index-count` is shared, muted and tabular.

## Category labels and palette

`.category-label` owns natural-case system-sans 11px/500, 1.4 line height, zero tracking, square corners and 3px by 7px padding. Catalog and Event labels share geometry and typography. Functional classes map `--category-fill` and `--category-text`; AI-prefixed stages inherit their stage color. Timeline legends remain lighter and retain category shapes.

`foundation.css` owns the five category families; `--technical` aliases blue and `--organizational` aliases rust for labels. Catalog/Event labels use these shared tokens. Timeline glyphs and legends use the shared fixed fills described below. This is visual consistency, not a merger of Golden kinds and catalog Scope.

| Token | Meaning | Color |
| --- | --- | --- |
| `--category-green` | Design | #226447 |
| `--category-blue` | Simulation / Verification / Technical | #4b6d89 |
| `--category-gold` | Synthesis | #787043 |
| `--category-rust` | Layout / Organizational | #886454 |
| `--category-purple` | Development provenance | #766281 |

Category text uses its named palette token over a corresponding `--category-*-soft` fill. Light fills are #e3eee8 (green), #e5edf4 (blue), #f8f6e9 (gold) and #f7f0eb (rust). The light gold/rust fills are slightly paler to keep the approved small text readable. Keep small-text contrast at least 4.5:1; compute it against the rendered/composited background, not a transparent element alone. Timeline glyphs must remain discernible on page, stripe and hover backgrounds, with at least 3:1 contrast. Amber is a mark fill, not a small-text label color; category label text retains the original readable blue/rust tokens. Do not substitute the danger token for provenance.

AI-ASSISTED and AI-BUILT share muted-purple text, a 1px light-purple border and transparent background through `[data-ai-development]`, with opacity 1 and identical typography, padding, height and interaction styling. Text distinguishes the labels. Padding is 2px by 6px to account for the border; both retain the same 21.4px total height as functional labels. A 4px extra top margin creates an 8px gap after functional stages. Enhanced buttons have visible focus and a 3px hit-area extension on each edge.

The inline row-spanning evidence panel uses a restrained purple rule, 13px heading, 14px factual explanation and 13px source links. Evidence remains readable without JavaScript; inactive controls are not exposed. The [catalog contract](catalog/CONTRACT.md#presentation-and-disclosure) owns behavior.

Text and shapes carry meaning without color. Shared forced-color labels use CanvasText/Canvas and a system outline; provenance uses the same system text and outline treatment. Activity preserves binary filled/open distinctions independently from Scope.

## Page starts and Timeline frame

Timeline, Events, Analog and Digital begin with their controls, without a visible section title or descriptive sentence. Their visually hidden H1 and metadata descriptions remain for accessibility and search/indexing. Do not add comparison controls or demo annotations to published pages.

The shell has 40px gutters above 820px and 18px below. The root keeps vertical scrollbar space present so short pages and filtered empty results retain the same header, navigation, container and Search alignment as long pages when classic scrollbars are used. Timeline uses a 170px name column and 268px inspector with a 28px gap; the inspector stacks below 1230px. The name column becomes 153px on narrow screens. The top axis is a 37px flat surface with “Company / Person” in its left cell. Timeline headings, including embedded Company/Person axes, use Home’s #f5f6f8 panel fill. The global Matrix heading row, including its opaque sticky label, retains readable year labels on that same fill. The newest Matrix period uses #f1f3f5, #4b6180 text and weight 650. Its right border continues through every entity label and matches other vertical guides: 1px #edf0f4. Timeline frames and inspectors use #edf0f4; horizontal row rules use #e8edf2, and embedded lane center lines and Matrix guides use #edf0f4. Shared-Event notes use neutral #eef0f2. Timeline frames and the #f5f6f8 inspector retain 15px corners. All Timeline rows alternate opaque white and #f9fafb; hover uses #eef3f8 on either stripe. Stripes are recalculated within each group after filtering. Sticky labels inherit the same opaque row background so horizontally scrolling marks cannot show through. The outer Matrix keeps its existing sticky heading and inner scroll region without overflow clipping; inner corners are 14px.

## Timeline glyphs and targets

Timeline entity names use the existing Company/Person classification in both the global Matrix and context Timelines. Their text colors are #242b30 for Companies and #187565 for People. These colors apply only to graph names and remain stable on hover, with the existing underline, row tint, typography and navigation preserved.

All global/Company/Person marks share `.timeline-mark > .timeline-glyph`. Visible glyphs and legends are 9 by 9px: Technical is a solid circle and Organizational a solid square without rounded corners. Global and embedded Company/Person Timeline glyphs and legends use the approved muted blue #6089ad and warm amber #b17a44, retaining at least 3:1 contrast on row and hover surfaces. `event-explorer.css` owns the shared Timeline palette and confines neutral border/note overrides to `.timeline-workspace`; foundation tokens and Home presentation remain unchanged. Timeline filter hover uses #6a8aa9, and keyboard focus uses #4b6d89 with the existing 2px outline. The palette is fixed across system color-scheme preferences. Unselected glyphs have no border, outer outline or shadow. An 18 by 18px transparent button is the hit area. `TIMELINE_HIT_SIZE` owns that dimension for context placement, Matrix packing and the CSS variable, so overlapping targets are not hidden behind smaller packing rectangles.

Selection keeps the 9px glyph unchanged and adds a 2px surface-colored gap plus a 2px outer ring, using `--timeline-selection-outline` (#3c65a4). The 17px outer extent fits inside the existing 18px hit target. All visible marks for the selected Event share this treatment. Unselected hover scales only the glyph to 1.15 (10.35px); selected hover retains the ring and original size. Keyboard focus remains independently visible on the larger target. Sticky labels occlude scrolling marks without clearing selection. Forced colors retain the shapes and system fills, using a 2px CanvasText outline with a 2px offset in place of theme-colored shadows. Geometry/filter semantics belong to the [Timeline contract](TIMELINE.md).

## Visual verification

For relevant visual changes inspect the affected surfaces at 1440x900, 1280x800, 1024x768, 390x844 and 320x568, under both system color-scheme preferences, with keyboard, forced colors, no-JavaScript where applicable and open popovers. Review representative long/multi-link/multi-stage rows. Keep screenshots as task/PR evidence, not a cumulative repository archive.

`category-palette.spec.ts` protects shared token propagation, semantic mapping, contrast and forced colors; `visual-system.spec.ts` protects hierarchy, measures and toolbars; `timeline-visual.spec.ts` protects glyph/hit/selection behavior. Catalog and release suites protect their interactions and data wiring. [Testing](TESTING.md) owns check selection.
