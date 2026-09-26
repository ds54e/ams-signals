# Golden factual corpus

These instructions apply to `events/`, `companies/` and `people/`, and to research or code that produces their factual views/export. Catalog activity/update JSON in this directory follows its domain contract instead.

- For milestone selection and source handling, use [Product Context](../../PROJECT_CONTEXT.md#bounded-growth-is-a-product-requirement), including its research, lightweight-source and People/Company sections. Start research from the existing timeline; company-specific briefs are optional task context.
- For factual/editorial separation, unsupported company conclusions, scores or technology classifications, follow [the factual-layer policy](../../PROJECT_CONTEXT.md#separate-factual-and-editorial-layers) and [search instead of taxonomy](../../PROJECT_CONTEXT.md#search-instead-of-taxonomy).
- Keep each Event to a dated, publicly observable occurrence, its participants and supporting sources. Preserve source modality: a company **posted a role**, a company-authored paper **reports**, or a patent **describes**. A job description alone does not establish deployed practice.
- Never infer methodology transfer from employer changes, acquisitions or standards participation alone. Do not treat someone merely sharing a job posting as an Event participant.
- Use [the coarse signal-type semantics](../../PROJECT_CONTEXT.md#what-the-ui-should-optimize-for) when choosing `kind`; enum values and record shape belong to [the schema](../content.config.ts).
- Update an existing milestone when another source only strengthens the same fact. Reposts, location variants and repeated hiring signals do not each justify an Event. Duplicate-check warnings require editorial judgment about merging or clustering.
- Stop when the timeline can be responsibly reassessed; do not attempt exhaustive web coverage or retain scratch collections, downloaded pages, search logs or speculative notes.
