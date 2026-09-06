# AMS Signals visual system

AMS Signals is a text-first technical research index and editorial site. Equivalent information shares typography, spacing, separators and contextual-link treatment. Reading, listing and explorer surfaces retain distinct functional widths; all four index lists share one listing measure. The warm background, green accent and light/dark semantic palette remain; ordinary rows are flat. Accent identifies links and selection. Filled category labels identify Event kinds and catalog Scope; they do not represent quality or ranking.

## Ownership and cascade

- `src/styles/foundation.css`: the authoritative categorical palette and semantic aliases, other semantic colors, intentional system/Japanese font fallbacks, type/spacing/layout tokens, reset, site shell, focus and reduced-motion rules.
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

At full desktop width, the dated listing grid is **108px + 22px gap + 790px copy**. The catalog grid is **122px metadata rail + 12px gap + 786px project body**. All four listing surfaces have identical outer edges. Catalog descriptions usually use two useful sentences and can wrap naturally without reducing their shared 15px size. The narrower rail moves the body 32px left and gives it a measure close to the 790px Article/Event copy column. The visible Project / Scope / Activity header row is removed; list structure and alignment supply the hierarchy.

At 760px and below catalogs put the project body first and its compact metadata rail immediately after it; date, ticks and labels retain their internal order. Article/Event dates stack at 760px and below. Neither index needs horizontal scrolling. The Timeline retains its own locally scrolling visualization. Navigation remains Timeline | Events | Analog | Digital | Articles, normally 15px; at 360px and below it uses 14px with 5px gaps so all five links fit at 320px.

## Activity and utility surfaces

Every project retains its **12-month reviewed public activity band**, oldest month **left**, newest/current **right**. The visual cells are **5px wide × 10px high**, with **2px** gaps and a natural **82px** band. The rail starts with a normal-weight date including its actual year (`SEP 5, 2026`), **4px** of separation before the ticks and **10px** before Scope labels. No month total is visible; the accessible band label retains that contextual count. Empty cells use a discernible outline; active cells have one fixed filled appearance. Contrast is tested for both text and cell boundaries in light and dark modes; forced colors retains filled/open distinctions.

Repository-backed rows preserve genuine monthly counts and canonical provenance, including Surfer's GitLab history. Point events such as ATLAS and ngspice mark their reviewed paper/release month without fabricated commits. Counts, dates, eligibility, sorting and source metadata are unchanged. DOM cells, hover text, hidden month descriptions and `data-month` follow chronological month order; the accessible window label explicitly says “oldest to newest”.

Catalog, Events and Timeline filters use whitespace, with **no toolbar border-block rules**, enclosing card or shadow. Native controls remain **44px** high with **14px** text. The first Catalog/Event row supplies **22px** padding below the controls; Timeline has **20px** below the toolbar before the visualization. Other row separators remain subtle. The company picker stays raised on desktop and in-flow on mobile.

Catalog controls are a **300px Search**, **150px Scope select** followed immediately by a **13px normal-weight result count**, with **12px** gaps. Search expands to a full row below 600px; Scope and count remain compact below it. Search matches only public name, description and rendered Scope labels, with Unicode/case/whitespace normalization. Stage filtering uses stage presence independently of AI prefixes, and combines with Search using AND. The form is hidden until JavaScript enhancement; all content remains available without JavaScript. No URL state, storage, fetches, hidden tags or EventExplorer dependencies are added.

All filter toolbars read left to right: **controls → count/status → legend**, with natural wrapping and no auto margin pushing status to the far edge. `.index-count` is shared by projects, events and articles: 13px, muted, normal weight and tabular numerals. Articles shows the actual authored collection count above its list, without adding controls or a first-row rule.

Events and Scope use the shared `.category-label` primitive in `index.css`: system sans **10px/600**, **1.4 line height**, **0.025em tracking**, **3px radius**, and **3px × 5px padding**. Both badge families render uppercase through that primitive, which also owns the foreground, fill and forced-colors treatment. Page-specific classes only set `--category-fill` to the appropriate shared token. CSS casing leaves authored labels and case-insensitive search unchanged. Neither surface overrides the shared typography or badge geometry. Timeline legends stay lighter and use category shapes.

## Shared categorical palette

`foundation.css` defines one restrained set of five hue families for Catalog, Events and Timeline. `--technical` aliases `--category-blue`; `--organizational` aliases `--category-rust`. Events badges, Timeline glyphs and legends therefore use exactly the same blue as Simulation/Verification and the same rust as Layout. Catalog and Event styles contain no separate palette literals or dark-mode color overrides. This shares presentation only: Catalog Scope and Golden Event kinds remain independent information models.

AI prefixes inherit their stage's color. All five fills move toward neutral while retaining green/teal, medium blue, mustard, copper and crimson identities. AI-built stays a distinct muted red and does not use the danger token. Opacity remains **1**. Blue and rust do not increase relative luminance over the previous Event colors in either theme.

`--category-ink` supplies **#ffffff in light mode** and **#14231f in dark mode** to every category label. Dark fills are deliberately selected together to preserve hue identity at restrained chroma. The following WCAG contrast ratios use sRGB relative luminance; every label pair exceeds 4.5:1 for small text.

| Foundation token | Meaning, including AI-prefixed stages | Light fill | Text contrast | Dark fill | Text contrast |
| --- | --- | --- | --- | --- | --- |
| `--category-green` | Design | #4f7065 | 5.47:1 | #95b0a3 | 6.99:1 |
| `--category-blue` | Simulation, Verification, Technical Events/Timeline | #4b6d89 | 5.46:1 | #8fa9be | 6.66:1 |
| `--category-gold` | Synthesis | #787043 | 5.00:1 | #b4ac7e | 7.09:1 |
| `--category-rust` | Layout, Organizational Events/Timeline | #886454 | 5.25:1 | #b69682 | 5.95:1 |
| `--category-red` | AI-built development provenance | #8d5967 | 5.59:1 | #bb959f | 6.13:1 |

Labels remain recognizable from text without color. The shared rule in `index.css` uses CanvasText/Canvas and a system-color outline in forced colors. Timeline preserves its Technical circle and Organizational rounded square, including forced colors. Blue/rust glyphs exceed **4.76:1** against the normal background and surface in light mode and **6.31:1** in dark mode; geometry and selection treatment are unchanged.

Activity retains its existing neutral/accent colors and binary fill. Category colors never encode its age or commit volume.

## Timeline glyphs and hit targets

All global, company and person Timeline marks use the same `.timeline-mark > .timeline-glyph` primitive. The visible glyph is **8×8px**: Technical circle, Organizational **2px-radius** square. An **18×18px transparent button** supplies the interaction area. `TIMELINE_HIT_SIZE` owns that value for context placement, Matrix bundle packing and the rendered CSS variable, preventing target overlap from being hidden behind a smaller packing rectangle.

Selection uses the same **2px surface gap / 4px outer accent ring** on the glyph; hover scales only the glyph to **1.15×**. Keyboard focus remains visible on the larger button. Sticky labels continue to occlude scrolling marks. Forced colors retain category shapes and a system-color selection ring. Existing chronological projection, grouping, filtering, factual content and inspector behavior are unchanged.

## Review and verification

Visual review covers `/`, `/events/`, `/analog/`, `/digital/` and `/articles/` at **1440×900, 1280×800, 1024×768, 390×844 and 320×568**, plus dark mode, Japanese Article prose and the open company picker. Baseline, first-pass and refinement screenshots are local review artifacts, not a checked-in screenshot archive.

Side-by-side Catalog/Events review retains the shared uppercase badge primitive. The **122px rail / 12px body gap** removes unused horizontal space while **10px strip-to-Scope spacing** keeps activity and classification distinct. Long labels such as AI Verification fit inside the rail without changing 10px badge text. Existing **5×10px ticks** remain balanced against the 20px badge height. Light/dark review compares the whole palette on broad-flow projects such as CoreSmith and PANDA, with AI-built examples alongside conventional stages.

All 68 project descriptions were reread with their existing primary evidence; 33 Analog and 33 Digital descriptions gained useful workflow, artifact or capability-boundary context. G-DiffPS and Masala-CHAI stayed concise and unchanged. A refinement after initial screenshots shortened the Ngspice/OpenVAF and iverilog-uvm copy and made uhdm2rtlil's added context about the synthesis path. Longer descriptions retain the shared text size and row rhythm; the shorter 768px-high desktop viewport may show three complete rows and part of the fourth. No Scope, source or activity data changed.

Catalog and Events share `formatDate` in `src/lib/date-format.ts`; `.index-date` owns uppercase month rendering as well as **12px/400** monospace tabular numerals, zero tracking, **1.45** line height and muted color. Exact dates read **MMM D, YYYY** (`SEP 5, 2026`), retaining the activity date's year and an unpadded day. Event month/year precision and ranges remain intact. Catalog dates have no separate typography or casing override. Search/Scope/count controls still fit at 320px without squeezing descriptions. The previously refined **18px Timeline hit target** retains Apple's two-row cluster with the same 8px glyph. Event badge typography/geometry, Articles count and all left-grouped toolbars remain unchanged.

The subsequent shared-palette cleanup changes colors and their ownership only. Whole-palette screenshots compare CoreSmith's Design/Synthesis/Verification/Layout labels with Analog rows that include Simulation and AI-built, alongside Events containing both kinds. Light and dark review checks quieter badges, green/blue and gold/rust separation, distinctly red AI-built, and readable Timeline marks. Project/event titles remain the primary reading entry points. All authored data, descriptions, activity snapshots, layout, typography and filtering are unchanged in this cleanup.

`tests/smoke/category-palette.spec.ts` checks root token parity across both catalogs, Events and global/company/person Timelines in light/dark modes, exact semantic mapping, label/glyph contrast, opacity and shapes. It then changes the foundation tokens in the browser and verifies that every consumer follows, catching independent hard-coded fills. It also checks identical readable forced-colors labels. `tests/smoke/visual-system.spec.ts` checks computed badge typography/geometry parity with Events, five separated Scope hue families and identical cross-domain colors, hierarchy, color contrast, shared listing edges, Japanese spacing/prose, navigation, toolbar controls and narrow vertical chronological activity cells. `tests/smoke/timeline-visual.spec.ts` checks matching global/company/person glyph and hit geometry, category colors/shapes, selection, keyboard/forced colors and filled Event badges. The catalog suites check all twelve explicit month identities in DOM and physical left-to-right order, including matching raw counts, point signals, hover text and hidden descriptions. They also check uppercase unpadded dates, every authored Scope/source/project order, filtering/count/empty/no-JS behavior, keyboard access, forced colors and responsive geometry. Existing release tests retain Timeline/Events interaction, Articles, entity pages, noindex and export coverage. Run `npm run check` and the full Chromium `npm run test:smoke` before publishing; use the same suite against production after the established manual Pages deployment.
