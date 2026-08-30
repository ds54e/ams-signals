# AMS Signals v1 — Visualization Review Notes

Temporary companion to `VISUALIZATION_V1.md`. Remove both after the visualization PR is merged.

These notes come from reviewing the current implementation against the real 37-event / 17-company corpus. They identify concrete failure modes to exercise during the v1 UX pass.

## Preserve a stable meaning of time

The timeline is the primary analytical surface. Search and company filters must not silently rescale or reinterpret the time axis.

If a date-range control is added, changing the range must be an explicit user action and the range must be represented in the URL.

Do not auto-zoom the time axis merely because a search or company filter leaves only recent events. A stable axis is valuable for visual comparison unless the user deliberately changes the range.

## Deterministic company lane order

The current implementation derives company lane order from first appearance in the chronological event stream. With many companies this produces an incidental order that can look meaningful.

Use a deterministic neutral ordering for the global view. Alphabetical company name is the preferred v1 default unless real interaction testing demonstrates a clearly better non-inferential ordering.

Do not order by event count, recency, perceived importance, or maturity.

## Company focus must scale to the actual corpus

The global view now has enough active companies that explicit focus/selection is likely necessary.

Test the all-company view first, but implement a clear company multi-select/focus control if the 15 active lanes are noisy.

Requirements:

- all active companies remains a valid state;
- selection is reflected in the URL;
- selection is easy to clear/reset;
- alphabetical ordering is preferred;
- zero-event companies do not consume empty global lanes;
- filtering a shared event by one of its companies must still represent the underlying Event as one factual record.

## Filtering must keep the detail panel consistent

The current detail panel can remain on an Event that has just been hidden by search or filtering.

After any search, company, kind, view, or date-range change:

- never leave a hidden Event presented as the active detail;
- if the active Event becomes hidden, either clear the detail state or select a sensible visible Event explicitly and consistently;
- the selected/highlighted state in the timeline and the detail content must always agree.

## Shared Events are one record, not many events

The UVM-MS standards Event and the SiTime/Renesas acquisition appear on multiple company lanes.

When one representation of a shared Event is selected, highlight every visible mark representing that same Event ID where practical.

The detail view should show all linked companies and make clear that every highlighted mark points to one stable Event permalink.

Do not duplicate the Event data to simplify rendering.

## Show all representative sources in Event detail

The current timeline detail serializes only the first source, even though Golden Events may have up to three representative sources.

The v1 detail experience should expose every representative source for the active Event, including:

- source title;
- short factual source summary where useful;
- availability state;
- original link when currently available;
- archive link when present;
- stable Event permalink.

Do not present an original source marked `unavailable` as though it is a live source. If retaining the dead URL is useful, label it as unavailable; prefer an archive link when one exists.

## Search results must be explainable

Search indexes `headline`, `fact`, source titles, source summaries, and company/person names.

Therefore an Event may match a query only because the term appears in a source summary rather than the visible fact text.

A user should be able to understand why an Event survived the search. Prefer one of these lightweight approaches:

- show the matching source summary in the active detail;
- show a concise match snippet;
- visibly highlight the matched text where straightforward.

Do not add semantic expansion in v1.

Normalize punctuation as well as case/Unicode/whitespace so ordinary queries behave predictably, for example:

- `real number` vs `real-number`;
- `full chip` vs `full-chip`;
- similar punctuation variants.

## People view needs contextual behavior

The current `Timeline` component defaults to the Companies view everywhere. On a Person page this can make the page initially show the linked company lane instead of the person's own timeline.

For v1:

- Person pages should open in an appropriate People-first chronological state;
- Company pages should remain Company-first;
- the global page may default to Companies;
- controls that do not make sense in the current page context should be hidden or simplified rather than shown mechanically.

The current mobile view also does not meaningfully change when the Companies/People view selector changes. Ensure view semantics work consistently on desktop and mobile.

With only one current Person record, the UI should remain useful rather than looking broken or empty, while still being able to scale later.

## Zero-event company pages need an explicit state

Sony Semiconductor Solutions and OMNIVISION currently have company records but no Golden Events.

Their pages should not render an apparently broken empty timeline.

Show a compact factual empty state such as:

- no Golden events are currently indexed;
- last researched date;
- absence of indexed public events does not imply absence of internal RNM/AMS activity.

Do not create filler Events to solve the visual emptiness.

## Mobile filtering must mirror desktop filtering

The mobile chronological list should honor the same active filters as the desktop timeline:

- search;
- company focus;
- kind;
- Companies / People / Both semantics where exposed;
- explicit date range if implemented.

Avoid a situation where desktop says `3 events shown` while mobile still lists unrelated events.

## Event-kind encoding should remain factual and restrained

It is acceptable to use subtle shape/color/label differences for factual Event `kind` values such as hiring, publication, conference, affiliation change, organization, and business.

Do not use mark size, intensity, vertical position, or other visual encodings for inferred importance, evidence strength, company maturity, or momentum.

If a legend is added, keep it small and useful.

## Event date provenance: do not over-engineer yet

The corpus mixes posting dates, publication dates, acquisition dates, and affiliation-start dates reconstructed from public profiles.

For this pass, first use Event kind and clear copy to avoid implying that every date has identical semantics.

Do not add a date-provenance schema field unless actual interaction testing demonstrates a concrete ambiguity that cannot be solved through existing factual wording and kind context.

If such a field becomes necessary, keep it minimal and explain the exact failure it fixes in the PR.

## Required interaction scenarios before PR

Exercise these scenarios against the built site, not only through code inspection:

1. Open the global all-company view with the complete historical range.
2. Select only Apple, SiTime, and Skyworks, then reload/share the resulting URL.
3. Compare Analog Devices and Texas Instruments across historical publications.
4. Search `model validation` and inspect why every remaining Event matched.
5. Search both `real-number` and `real number` and verify predictable behavior.
6. Search `PLL` with all companies, then narrow to Apple / Renesas / SiTime.
7. Select the shared UVM-MS Event from one company lane and verify shared highlighting/detail behavior.
8. Select the SiTime/Renesas acquisition from either lane.
9. Change a filter so the currently selected Event disappears; verify the detail panel is no longer stale.
10. Open the Toshi Kawashima Person page and verify People-first behavior.
11. Open Sony Semiconductor Solutions and OMNIVISION company pages and verify the explicit zero-event state.
12. Repeat search/company filtering on a narrow/mobile viewport and confirm result counts and visible Events match desktop semantics.
13. Open an Event with multiple representative sources and verify all are inspectable.
14. Open an Event with an unavailable original source and verify the UI does not present it as currently live.

## Scope discipline

Fix these issues in the presentation layer whenever possible.

Do not use the visualization pass as an excuse to:

- rewrite Golden facts;
- create a company taxonomy;
- introduce evidence scores;
- add permanent technology tags;
- add semantic search;
- add a backend/database;
- redesign the research workflow.

The objective is a trustworthy, enjoyable viewer over the existing factual corpus.