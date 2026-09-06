# AMS Signals visual system

AMS Signals is a text-first technical research index and editorial site. Equivalent information shares typography, spacing, separators and contextual-link treatment. Reading, listing and explorer surfaces retain distinct functional widths; all four index lists share one listing measure. The warm background, green accent and light/dark semantic palette remain; ordinary rows are flat. Accent identifies links and selection. Filled category labels identify Event kinds and catalog Scope; they do not represent quality or ranking.

## Ownership and cascade

- `src/styles/foundation.css`: semantic colors, intentional system/Japanese font fallbacks, type/spacing/layout tokens, reset, site shell, focus and reduced-motion rules.
- `src/styles/index.css`: shared `.index-*` title, summary, date, metadata/count, link, category-label and row primitives. Used by Articles, Events and both catalogs.
- `src/styles/filters.css`: native input/select styling and the rule-free utility toolbar used by Catalog, Events and Timeline.
- `src/styles/event-explorer.css`: company picker/popover, shared Timeline glyphs, geometry/inspector and Events-specific row structure.
- `src/styles/articles.css`: long-form prose, citations and related-content structure. Article bodies are not styled as index summaries.
- `src/styles/global.css`: ordered imports of the modules above, followed by factual record/entity document context. `BaseLayout.astro` loads this entry point.
- `src/styles/catalog.css`: the single authoritative Catalog presentation, loaded by `CatalogIndex.astro`. Domain pages independently load and validate their own collections, sort projects and prepare Scope/activity views. The component renders the prepared data and enhances Search/Scope with `src/scripts/catalog-filter.ts`; it does not own research or domain schemas.

Do not create a second domain stylesheet or tune equivalent index text with unrelated literal sizes. Component extraction is useful for the identical catalog markup; shared CSS primitives are sufficient for the semantically different Article and Event rows. No frontend framework, webfont service or runtime data fetching is introduced.

## Typography and rhythm

| Information | Size / weight | Line height |
| --- | --- | --- |
| Index title | 17px / 700 | 1.35 |
| Index summary / project description / Event fact | 15px / 400, muted | 1.65 |
| Control text | 14px | native control line box, at least 40px high |
| Contextual links and metadata | 13px / 400 | 1.45 |
| Event / Scope category labels | 10px / 600 | 1.4 |
| Dates | 12px / 400 | 1.45 |
| Long-form Article prose | 17px / 400 | 1.85 |

Index rows have **22px top / 24px bottom** padding and subtle one-pixel separators between rows; the first visible row has no top rule, including after filtering. Title-to-summary gap is **9px**. Dates use a shared monospace stack and tabular numerals. Scope is a vertical stack of filled, fit-content category labels with **3px** gaps. Its presence-only schema and review decisions are described in [CATALOG_SCOPE_REVIEW.md](CATALOG_SCOPE_REVIEW.md). Quick links remain directly beside plain-text project names at **13px**, with natural baseline-aligned wrapping.

The font stack starts with `system-ui`, platform UI fonts and local Japanese fallbacks. There is no unloaded Inter declaration and no remote font download. Japanese titles have zero tracking and strict line breaking; Latin index titles use only −0.005em tracking. Short titles/summaries use `text-wrap: pretty` as progressive enhancement. Article prose retains comfortable size on mobile and is never converted into an index summary.

## Functional measures

| Token | Maximum | Use |
| --- | --- | --- |
| `--layout-reading` | 800px | Article body / factual reading pages |
| `--layout-listing` | 920px | Articles, Events, Analog and Digital indexes |
| `--layout-explorer` | 1360px | Site shell / Timeline explorer |

At full desktop width, the dated listing grid is **108px + 22px gap + 790px copy**. The catalog grid is **150px metadata rail + 16px gap + 754px project body**. All four listing surfaces have identical outer edges. Catalog descriptions can wrap to two or three lines without reducing their shared 15px size. The visible Project / Scope / Activity header row is removed; list structure and alignment supply the hierarchy.

At 760px and below catalogs put the project body first and its compact metadata rail immediately after it; date, ticks and labels retain their internal order. Article/Event dates stack at 760px and below. Neither index needs horizontal scrolling. The Timeline retains its own locally scrolling visualization. Navigation remains Timeline | Events | Analog | Digital | Articles, normally 15px; at 360px and below it uses 14px with 5px gaps so all five links fit at 320px.

## Activity and utility surfaces

Every project retains its **12-month reviewed public activity band**, latest month **left**, oldest **right**. The visual cells are **5px wide × 10px high**, with **2px** gaps and a natural **82px** band. The rail starts with a normal-weight date including its actual year (`Sep 5, 2026`), **4px** of separation before the ticks and **10px** before Scope labels. No month total is visible; the accessible band label retains that contextual count. Empty cells use a discernible outline; active cells have one fixed filled appearance. Contrast is tested for both text and cell boundaries in light and dark modes; forced colors retains filled/open distinctions.

Repository-backed rows preserve genuine monthly counts and canonical provenance, including Surfer's GitLab history. Point events such as ATLAS and ngspice mark their reviewed paper/release month without fabricated commits. Counts, dates, eligibility, sorting, source metadata and newest-first accessible/hover labels are unchanged.

Catalog, Events and Timeline filters use whitespace, with **no toolbar border-block rules**, enclosing card or shadow. Native controls remain **44px** high with **14px** text. The first Catalog/Event row supplies **22px** padding below the controls; Timeline has **20px** below the toolbar before the visualization. Other row separators remain subtle. The company picker stays raised on desktop and in-flow on mobile.

Catalog controls are a **300px Search**, **150px Scope select** followed immediately by a **13px normal-weight result count**, with **12px** gaps. Search expands to a full row below 600px; Scope and count remain compact below it. Search matches only public name, description and rendered Scope labels, with Unicode/case/whitespace normalization. Stage filtering uses stage presence independently of AI prefixes, and combines with Search using AND. The form is hidden until JavaScript enhancement; all content remains available without JavaScript. No URL state, storage, fetches, hidden tags or EventExplorer dependencies are added.

All filter toolbars read left to right: **controls → count/status → legend**, with natural wrapping and no auto margin pushing status to the far edge. `.index-count` is shared by projects, events and articles: 13px, muted, normal weight and tabular numerals. Articles shows the actual authored collection count above its list, without adding controls or a first-row rule.

Events and Scope use the shared `.category-label` primitive in `index.css`: system sans **10px/600**, **1.4 line height**, **0.025em tracking**, **3px radius**, and **3px × 5px padding**. Both badge families render uppercase through that primitive. Events retains **Technical blue / Organizational rust**; Scope retains its stage-specific palette. CSS casing leaves authored labels and case-insensitive search unchanged. Neither surface overrides the shared typography or badge geometry. The light/dark semantic colors remain unchanged; contrasting foreground and readable text preserve category recognition. Timeline legends stay lighter and use category shapes.

## Scope category palette

Stage presence is the category; AI prefixes inherit the same class/color. Fills are restrained relatives of the Event blue/rust palette, with compact uppercase text; the Event colors themselves stay unchanged. Simulation/Verification uses a clearer blue separated from Design’s green/teal, while AI-built uses a muted rose-red provenance color unrelated to error/alert styling. Each label has its own background, with **white foreground in light mode** and **#14231f in dark mode**. All text/fill pairs exceed 4.5:1 contrast. Scope is recognizable from its text even without color; forced colors uses CanvasText/Canvas with a system-color outline. These styles are confined to the shared catalog stylesheet and do not alter Event or Timeline semantic colors.

| Category | Light fill | Dark fill |
| --- | --- | --- |
| Design / AI Design | #4d7066 | #91aaa1 |
| Simulation / AI Simulation; Verification / AI Verification | #44799b | #90b4cd |
| Synthesis / AI Synthesis | #807047 | #b4a27b |
| Layout / AI Layout | #89675d | #b89b8f |
| AI-built | #976368 | #c59c9f |

Activity retains its existing neutral/accent colors and binary fill. Category colors never encode its age or commit volume.

## Timeline glyphs and hit targets

All global, company and person Timeline marks use the same `.timeline-mark > .timeline-glyph` primitive. The visible glyph is **8×8px**: Technical circle, Organizational **2px-radius** square. An **18×18px transparent button** supplies the interaction area. `TIMELINE_HIT_SIZE` owns that value for context placement, Matrix bundle packing and the rendered CSS variable, preventing target overlap from being hidden behind a smaller packing rectangle.

Selection uses the same **2px surface gap / 4px outer accent ring** on the glyph; hover scales only the glyph to **1.15×**. Keyboard focus remains visible on the larger button. Sticky labels continue to occlude scrolling marks. Forced colors retain category shapes and a system-color selection ring. Existing chronological projection, grouping, filtering, factual content and inspector behavior are unchanged.

## Review and verification

Visual review covers `/`, `/events/`, `/analog/`, `/digital/` and `/articles/` at **1440×900, 1280×800, 1024×768, 390×844 and 320×568**, plus dark mode, Japanese Article prose and the open company picker. Baseline, first-pass and refinement screenshots are local review artifacts, not a checked-in screenshot archive.

Side-by-side Catalog/Events review unified badge typography and dimensions in `.category-label`, including uppercase presentation, with only semantic colors differing. The **16px rail-to-body gap** tightens the row while **10px strip-to-Scope spacing** gives the two metadata types breathing room. Existing **5×10px ticks** remain balanced against the shared 20px badge height. Light/dark screenshots confirm that the clearer blue separates from green and the muted red distinguishes AI-built without an alert treatment. The shared `activityDateLabel` formatter always includes the event’s year; the component owns this formatting rather than duplicating it in domain data preparation. The **150px** rail keeps even AI Verification readable and leaves the project body wider than the preceding three-column layout. A first **20px Timeline hit target** expanded Apple's dense global row to three visual rows; refining it to **18px** retains a two-row cluster while keeping the same 8px glyph and a larger click target. Search/Scope/count controls fit at 320px without squeezing description text. The filled Event badges restore immediate category recognition, while toolbar rules and Catalog column-heading chrome are absent.

`tests/smoke/visual-system.spec.ts` checks computed badge parity with Events, distinct green/blue/red Scope colors, hierarchy, color contrast, shared listing edges, Japanese spacing/prose, navigation, toolbar controls and narrow vertical newest-left cells. `tests/smoke/timeline-visual.spec.ts` checks matching global/company/person glyph and hit geometry, category colors/shapes, selection, keyboard/forced colors and filled Event badges. The catalog suites check filtering/count/empty/no-JS behavior in addition to every authored Scope, source, project order and monthly signal, no-JS/keyboard behavior, forced colors and responsive geometry. Existing release tests retain Timeline/Events interaction, Articles, entity pages, noindex and export coverage. Run `npm run check` and the full Chromium `npm run test:smoke` before publishing; use the same suite against production after the established manual Pages deployment.
