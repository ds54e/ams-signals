# AMS Signals — Product Context

This document captures the durable product intent behind AMS Signals. It exists so future Codex sessions can make local design and research decisions without access to the original design discussions.

`AGENTS.md` defines operational rules. `RESEARCH_*.md` files may define temporary research briefs. This file explains why the project is shaped the way it is.

## Why this exists

The intended users are engineers, verification leads, architects, and technical managers who want to understand what other semiconductor companies appear to be doing in RNM and AMS/mixed-signal verification.

The useful outcome is not a company score or a definitive claim about private internal practice. The useful outcome is that a reader can inspect public facts, notice patterns over time, compare companies or people, and form or revise their own technical strategy.

Typical user questions include:

- What has this company publicly revealed over time?
- What changed recently?
- Are similar signals appearing at several companies?
- Which people or expertise moved between organizations?
- When did a modeling or verification practice first become publicly visible?
- Which important areas remain publicly unclear?
- What should I investigate next before drawing a conclusion?

## Timeline first

Time is the primary organizing dimension.

RNM/AMS adoption is rarely a binary state. Public signals can evolve from behavioral modeling to RNM, digital/UVM integration, full-chip use, model validation, automation, organization changes, or other practices.

For that reason, the product should help users see trajectories rather than assign static maturity scores.

Company timelines and People timelines are especially important. The global view may place Company and People activity in one temporal field to support comparison, but shared placement must not imply causation between organizational and individual trajectories.

## Facts first, interpretation downstream

The core public viewer is factual.

A Golden event should state what a public source actually establishes, with its date and source link.

The site should not tell users that a company is "advanced", "leading", "mature", or moving in a strategic direction. Those are interpretations for readers or downstream tools to form from the factual record.

AMS Signals itself is the evidence layer and does not publish a static editorial interpretation layer. Stable Event records and the generated factual export let a reader or user-selected tool inspect the evidence and reach different conclusions.

The goal is not "trust our conclusion". The goal is "inspect the public record and draw your own conclusion".

## Research should still reason aggressively

Fact-only publication does not mean fact-only research.

During research, form hypotheses, follow people, compare organizations, inspect missing areas, and ask what would need to be true if a hypothesis were correct. Use those ideas to choose the next search.

Actively look for evidence that narrows, contradicts, or breaks an attractive narrative.

Inference is an engine for discovery and may also be useful in downstream interpretation. It is not Golden content.

## Search instead of taxonomy

Do not build a permanent technology-tag taxonomy unless a concrete future need proves it necessary.

Terms such as RNM, SV-RNM, DMS, model validation, schematic correlation, formal equivalence, PLL, UVM, EEnet, and similar concepts overlap and change wording across companies and time.

A fixed taxonomy would create ongoing maintenance work and would encode the site's assumptions into the data.

Instead, keep Golden event text descriptive and make search act as a temporary lens over the timeline. A user should be able to search for a phrase such as `model validation`, `PLL`, `EEnet`, or `AI` and compare the matching factual events over time.

## Bounded growth is a product requirement

This project should become more useful when researched repeatedly without becoming proportionally harder to maintain.

The durable asset is a compact Golden timeline, not an exhaustive evidence archive.

Research may inspect many sources, but only meaningful milestones should survive. Duplicate jobs, reposts, regional variants, and weak corroboration should normally be compressed into an existing event or discarded.

The public page should act as the checkpoint for the next research pass. Future research should start by reading the existing Golden timeline and asking what changed or remains unresolved, rather than rebuilding the research history from scratch.

Avoid accumulating raw research logs merely because they might be useful someday.

## Sources are deliberately lightweight

For v1, a source record is intentionally lightweight: URL, check date, short factual summary, and optional availability/archive metadata.

The project is not intended to become a WARC/PDF/screenshot archive.

If a URL later disappears, the factual event can remain if it was responsibly verified when added; source availability can be shown explicitly. Stronger replacement or archive links may be added when convenient.

## One machine-readable factual export

The site generates one deterministic `/export.json` endpoint directly from the validated Company, People, and Golden Event collections. It exists so readers can use their own tools to query the factual corpus without creating another hand-maintained dataset.

The export contains source records and stable Event URLs, but no generated summaries, inference, scores, or build-time timestamp.

## People are technical signals, not an employee directory

People timelines are valuable because public technical expertise and affiliation changes can reveal useful historical context and generate new research leads.

Only add people whose own public technical activity or movement materially improves understanding of the RNM/AMS timeline.

Never infer causation from a person's move to a later company event. Never relabel older work using a person's current employer. Affiliation at the time of an event matters.

## Internships can be unusually informative

Student and internship postings should not be treated as low-value by default.

They can expose named projects, experimental tooling, internal team names, research directions, automation, and future-facing methodology that experienced-hire postings may not reveal.

Apple's public `Aeon` material is a current example and is covered in the temporary Apple research brief.

## What the UI should optimize for

The viewer should optimize for discovery and verification rather than dashboard scoring.

Important interactions include:

- time-based company comparison;
- time-based people views;
- simple text search as a lens over the timeline;
- event details with source links;
- stable event permalinks usable by readers and downstream tools;
- a dedicated chronological Events view for reading matching factual records.

A reader should be able to notice a pattern, inspect the underlying evidence, and then form or request an interpretation outside the Golden record.

Desktop is the reference experience. Mobile and narrow-screen usability are best-effort and must not constrain the desktop information architecture. In particular, keep the horizontal Timeline and its Evidence Inspector focused on temporal exploration rather than maintaining a separate mobile-only chronology there; the Events view owns chronological textual reading. Narrow viewports may scroll horizontally when the Timeline needs its desktop spatial structure, and should avoid obviously broken rendering without requiring feature parity.

The visual style should feel like a modern technical research publication/tool: clear hierarchy, restrained styling, generous spacing, and readable timelines. Avoid decorative dashboards and metric cards that imply precision the source material cannot support.

The global Timeline is a progressive-time Activity Matrix for recurring public signals, trajectories, recent activity patterns, and the overall landscape. It always interleaves Company and Person rows with the same deterministic, full-corpus recent-public-record ordering (latest three years, then latest five years, then latest record and lifetime count); Company and Person labels use restrained, distinct text treatments without giving either type an ordering advantage. Company and Person remain distinct factual entity types even though the global UI does not expose a selector between them. Filtering may hide marks and empty rows but never reorders the surviving entities.

Normal global Timeline browsing shows entities linked to at least two full-corpus Golden Events so the Matrix emphasizes minimal trajectories rather than filling the surface with isolated marks. This is only a visualization-density rule, not a quality, confidence, importance, maturity, or capability judgment. A non-empty Search or narrowed Company filter reveals matching singleton entities in their immutable full-corpus order. Singleton evidence always remains available through Events, the complete factual record, as well as Company, Person, and Event pages and `/export.json`.

Global Activity Matrix time runs newest-left through a progressive, full-corpus projection derived from the latest indexed Event year. The latest three corpus years use one equal continuous calendar scale; earlier Events occupy successively broader deterministic periods so recent activity patterns remain readable while older evidence supplies trajectory context. Recent Events may bundle by fixed temporal proximity, while all earlier Events for one entity in the same period form one period bundle. Each member retains its individual Technical or Organizational shape, exact placement timestamp, and direct interaction. Underlying Event timing remains factual and unchanged, exact dates remain available through the Evidence Inspector and Events view, and the projection is never recomputed from filtered results. Progressive placement and bundling are presentation-only; they create no new Golden entity or export field. Company and Person detail pages retain the existing segmented, chronologically packed Timeline geometry.

The two global surfaces keep deliberately different filter models. Timeline is an activity-pattern overview: it always shows the combined Company + Person Matrix and both Technical and Organizational Event kinds, communicates kind through mark shape, and limits controls to Search and Company filter. Events is the complete factual record and offers Search, Signal type, and Company filter so readers may inspect only Technical or Organizational Events when useful. Removing the global entity-type selector does not merge Company and Person data concepts.

Public UI terminology should keep the layers distinct. An Event is one factual indexed occurrence. Signal type is its coarse Technical or Organizational classification. Evidence is the set of public sources supporting an Event, while source refers to one supporting item and its availability. Entity means a Company or Person. Record refers naturally to the complete factual corpus rather than to one clickable Event.

Golden Event `kind` is intentionally coarse. `technical` covers principally technical and standards milestones; `organizational` covers principally organizational, business, and workforce milestones. This is a source-signal distinction, not a technology taxonomy, maturity model, or scoring system. Optional `affiliationChange` metadata remains independent from `kind`.

## Long-term engineering philosophy

Prefer boring, portable technology.

The long-lived asset should remain readable if the web framework is replaced years later.

Current choices intentionally favor:

- JSON Golden events;
- a deterministic generated JSON export;
- Astro static generation;
- plain CSS;
- small client-side JavaScript/TypeScript;
- Git history;
- no database/backend unless later requirements clearly justify one.

Framework code is replaceable. The factual timeline is the asset.

## v1 direction

The initial deep reference company is Apple because public material is rich enough to stress the research model, timeline model, People leads, internships/named projects, source lifecycle, and factual-versus-inferential boundary.

After Apple is strong, SiTime and Skyworks are natural next comparisons because they provide different levels and types of public visibility.

The repository is private during construction. Public deployment can be enabled later. SEO, RSS, analytics, authentication, and preview deployment are not v1 priorities.
