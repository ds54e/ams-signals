# AMS Signals visual system

AMS Signals is a text-first technical research index and editorial site. Equivalent information shares typography, spacing, separators and contextual-link treatment. Different page functions retain different outer widths. The warm background, green accent and light/dark semantic palette remain; ordinary rows are flat. Accent identifies links, selection and Scope, not decorative badges.

## Ownership and cascade

- `src/styles/foundation.css`: semantic colors, intentional system/Japanese font fallbacks, type/spacing/layout tokens, reset, site shell, focus and reduced-motion rules.
- `src/styles/index.css`: shared `.index-*` title, summary, date, metadata, link and row primitives. Used by Articles, Events and both catalogs.
- `src/styles/event-explorer.css`: filter controls/popover, Timeline geometry/inspector and Events-specific row structure.
- `src/styles/articles.css`: long-form prose, citations and related-content structure. Article bodies are not styled as index summaries.
- `src/styles/global.css`: ordered imports of the four modules above, followed by factual record/entity document context. `BaseLayout.astro` loads this entry point.
- `src/styles/catalog.css`: the single authoritative Catalog presentation, loaded by `CatalogIndex.astro`. Domain pages independently load and validate their own collections, sort projects and prepare Scope/activity views. The component renders the prepared data; it does not own research or domain schemas.

Do not create a second domain stylesheet or tune equivalent index text with unrelated literal sizes. Component extraction is useful for the identical catalog markup; shared CSS primitives are sufficient for the semantically different Article and Event rows. No frontend framework, webfont service or runtime data fetching is introduced.

## Typography and rhythm

| Information | Size / weight | Line height |
| --- | --- | --- |
| Index title | 17px / 700 | 1.35 |
| Index summary / project description / Event fact | 15px / 400, muted | 1.65 |
| Control text | 14px | native control line box, at least 40px high |
| Contextual links, metadata, Scope | 13px / 400 | 1.45; Scope 1.4 |
| Dates, column labels, activity month summary | 12px; dates and month summary 400 | 1.45 |
| Long-form Article prose | 17px / 400 | 1.85 |

Index rows have **22px top / 24px bottom** padding and a subtle one-pixel rule. Title-to-summary gap is **9px**. Dates use a shared monospace stack and tabular numerals. Scope stays vertically stacked with **3px** gaps and **9px** filled/open CSS circles; its semantics do not change. Quick links remain directly beside plain-text project names at **13px**, with natural baseline-aligned wrapping.

The font stack starts with `system-ui`, platform UI fonts and local Japanese fallbacks. There is no unloaded Inter declaration and no remote font download. Japanese titles have zero tracking and strict line breaking; Latin index titles use only −0.005em tracking. Short titles/summaries use `text-wrap: pretty` as progressive enhancement. Article prose retains comfortable size on mobile and is never converted into an index summary.

## Functional measures

| Token | Maximum | Use |
| --- | --- | --- |
| `--layout-reading` | 800px | Article body / factual reading pages |
| `--layout-listing` | 920px | Articles and Events indexes |
| `--layout-catalog` | 1120px | Project / Scope / Activity |
| `--layout-explorer` | 1360px | Site shell / Timeline explorer |

At full desktop width, the dated listing grid is **108px + 22px gap + 790px copy**. The catalog grid is **794px Project + 170px Scope + 112px Activity**, with **22px gaps**. Their primary text measures are therefore similar without forcing their outer containers to match.

Catalog columns stack in Project → Scope → Activity order at 900px and below. Article/Event dates stack at 760px and below. Neither index needs horizontal scrolling. The Timeline retains its own locally scrolling visualization. Navigation remains Timeline | Events | Analog | Digital | Articles, normally 15px; at 360px and below it uses 14px with 5px gaps so all five links fit at 320px.

## Activity and utility surfaces

Every project retains its **12-month reviewed public activity band**, latest month **left**, oldest **right**. The visual cells are **7px wide × 5px high**, with **2px** gaps and a natural **106px** band. Activity is a quiet three-line group: normal-weight date, band, `N/12 months`. Empty cells use a discernible outline; active cells have one fixed filled appearance. Contrast is tested for both text and cell boundaries in light and dark modes; forced colors retains filled/open distinctions.

Repository-backed rows preserve genuine monthly counts and canonical provenance, including Surfer's GitLab history. Point events such as ATLAS and ngspice mark their reviewed paper/release month without fabricated commits. Counts, dates, eligibility, sorting, source metadata and newest-first accessible/hover labels are unchanged.

Events filters form a flat utility toolbar with rules, no enclosing rounded card or shadow, and 44px controls with 14px text. The first result row supplies its closing rule, avoiding two adjacent separators. The company picker keeps a raised popover on desktop and an in-flow panel on mobile. Timeline visualization/inspector surfaces remain legitimate bounded interactive areas. Event signal types remain factual text; their list treatment no longer resembles colored badges.

## Review and verification

Visual review covers `/`, `/events/`, `/analog/`, `/digital/` and `/articles/` at **1440×900, 1280×800, 1024×768, 390×844 and 320×568**, plus dark mode, Japanese Article prose and the open company picker. Baseline, first-pass and refinement screenshots are local review artifacts, not a checked-in screenshot archive.

Screenshot review led to removing the duplicate rule under Events controls, aligning the Activity line box with its 12px date, strengthening empty-cell outlines, and tightening only the smallest navigation layout. The shared copy measure and calmer Catalog row rhythm were retained. Catalog descriptions are secondary, Article/Event summaries are larger than before, and Activity is no longer a tall barcode.

`tests/smoke/visual-system.spec.ts` checks computed hierarchy, color contrast, functional widths, Japanese spacing/prose, navigation, toolbar controls and low-profile newest-left cells. The existing catalog suites still check every authored Scope, source, project order and monthly signal, no-JS/keyboard behavior, forced colors and responsive geometry. Existing release tests retain Timeline/Events interaction, Articles, entity pages, noindex and export coverage. Run `npm run check` and the full Chromium `npm run test:smoke` before publishing; use the same suite against production after the established manual Pages deployment.
