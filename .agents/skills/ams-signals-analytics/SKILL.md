---
name: ams-signals-analytics
description: Analyze AMS Signals live traffic, referrals, search performance, SEO/discoverability or site growth. Use for analytics questions, not tracking or SEO code changes.
---

# AMS Signals live analytics

Answer readership, visits/pageloads, referrers, popular pages, search queries and growth questions with fresh API data, not saved reports. Fetch only the sources needed for the question.

## Access and boundaries

Credentials and identifiers are available in the local shell:

```bash
source ~/.config/ams-signals/env
```

Do not display, log, commit or copy credential values; avoid shell tracing and credential-bearing command output. Use both services read-only and do not change their configuration. Missing access is a reporting limitation, not permission to reconfigure an account.

This is an instruction-only skill. Temporary curl, Python or jq commands are appropriate; do not add permanent analytics scripts. Check current official API documentation when needed rather than relying on a frozen request recipe.

## Cloudflare Web Analytics

Use `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_SITE_TAG` with the Cloudflare API / GraphQL Analytics API. Query `rumPageloadEventsAdaptiveGroups` or its current Web Analytics equivalent for traffic, pages and available referrer information.

Default to `requestHost == "ams-signals.com"` production traffic. Exclude localhost, 127.0.0.1 and other development hosts unless the user explicitly asks to investigate development traffic. Consult the [official GraphQL documentation](https://developers.cloudflare.com/analytics/graphql-api/) for current fields, filters and limits when necessary.

## Google Search Console

Use `GOOGLE_APPLICATION_CREDENTIALS` and `GSC_SITE_URL` with the Search Console API and the read-only scope `https://www.googleapis.com/auth/webmasters.readonly`. Search Analytics provides queries, pages, clicks, impressions, CTR and average position. Consult the [official Search Analytics documentation](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) when necessary.

## Interpretation

- State the exact date range and timezone used for each source, noting partial or unavailable periods. For trends, normally compare with the immediately preceding period of equal length.
- Keep Cloudflare visits/page loads distinct from Search Console clicks/impressions. Identify the source and metric when comparing results.
- Do not infer a referral source when referrer information is absent. State material sampling, aggregation or freshness limits returned by the APIs.
