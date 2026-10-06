# Timeline and Events contract

This document owns the current viewer behavior. [Product Context](../PROJECT_CONTEXT.md) owns the research and factual boundaries; [the visual system](VISUAL_SYSTEM.md) owns typography, palette and hit-target dimensions. These views consume the Golden corpus, not the independent catalogs.

## Surfaces

Timeline is the global progressive-time Activity Matrix: a pattern-discovery overview of recurring public activity and trajectories. It interleaves Companies and People in one temporal field. They remain distinct factual entity types; shared placement neither merges them nor implies causation.

Events is the complete chronological textual record, with stable Event permalinks and representative evidence. The Evidence Inspector supports direct examination from Timeline. Company and Person detail pages retain their segmented, chronologically packed context Timelines rather than inheriting global Matrix geometry.

## Stable row order and discovery

The global Matrix uses one deterministic full-corpus recent-public-record ordering: latest three years, then latest five years, then latest record and lifetime count. Company/Person labels use restrained, distinct treatments without giving either entity type an ordering advantage. Filtering may hide marks and empty rows but does not reorder survivors or derive new geometry from the filtered subset.

Ordinary browsing shows entities linked to at least two full-corpus Golden Events. This is a density rule for minimal trajectories, not a quality, confidence, importance, maturity or capability judgment. A nonempty Search or narrowed Company filter reveals matching singleton entities in their immutable full-corpus order. Their evidence always remains in Events, Company/Person/Event pages and the factual export, subject to the existing explicit export exclusions.

## Time projection and bundles

Global Matrix time runs newest-left through a full-corpus projection anchored to the latest indexed Event year. The latest three corpus years retain continuous calendar placement within deterministic widths derived from complete-corpus row density. Earlier Events occupy deterministic period buckets sized for readable labels and bundles.

Recent Events can bundle by fixed temporal proximity; all earlier Events for one entity in a period form one period bundle. Each member retains its Technical/Organizational shape, exact placement timestamp and direct interaction. Widths, bundles, collision slots and row order are not recomputed from filtered results. Individual factual dates remain available through the Inspector and Events.

Vertical packing reuses the first available rows, reserving each bundle's complete hit-target rectangle. The cell gap spaces members inside a bundle; it is not an extra collision margin between separate bundles. Touching or separated rectangles can share rows, while any horizontal overlap requires disjoint row ranges.

Projection, chronological packing, bundle membership and visual collision handling are presentation mechanics. They create no new Golden entity or export field and never rewrite an Event's timing. Context Company/Person Timelines remain a separate geometry contract.

## Filters and state

Timeline always shows the combined Company + Person Matrix and both Technical and Organizational kinds. It exposes Search and Company filter only; mark shape communicates kind. Do not restore an entity-type selector or a hidden kind filter to the global overview.

Events exposes Search and Signal type for complete factual reading. Search includes Company names and canonical predecessor names; there is no Company picker on this surface. Unsupported `companies` parameters, including `companies=none`, are removed on Events and from links targeting Events. They must never silently narrow its records. Shared navigation state must not carry controls that the destination does not support. Normalize supported URL aliases and preserve company predecessor search, one-record handling of shared Events and inspector selection. Catalog Search/Scope remains entirely independent.

## Terminology

An **Event** is one factual indexed occurrence. **Signal type** is its coarse Technical or Organizational classification. **Evidence** means the supporting public sources; one **source** is a supporting item with availability metadata. An **Entity** is a Company or Person. **Record** refers naturally to the complete factual corpus, not a competing name for each clickable Event.

Golden `kind: technical` covers principally technical and standards milestones; `organizational` covers principally organization, business and workforce milestones. This is a source-signal distinction, not a technology taxonomy or score. Optional `affiliationChange` metadata is independent of `kind`.

## Interaction and narrow screens

Desktop is the reference experience. Keep the horizontal spatial Timeline and Evidence Inspector; Events owns textual chronological reading. Narrow viewports may scroll the visualization locally, without a separate mobile-only chronology or a demand for full feature parity. Avoid broken rendering and inaccessible evidence.

Individual and bundled marks remain directly selectable with keyboard focus, meaningful kind shape and the shared hit geometry. Sticky labels occlude scrolling marks without clearing selection. Timeline Company filter popovers must actually own overlapping pixels rather than merely declaring a larger z-index. Changes preserve plain factual detail pages and explicit source availability.

## Implementation and verification

`src/components/EventExplorer.astro` owns the viewer surface; `src/lib/activityMatrix.ts` owns global Matrix geometry; `src/styles/event-explorer.css` owns explorer layout. Use [test ownership](TESTING.md#where-a-new-browser-assertion-belongs) for the affected behavior. Deterministic projection/order/bundle logic belongs in Node contracts; browser tests verify serialization wiring, interaction, layout, accessibility and state transitions. Derive mutable corpus expectations from source inputs.
