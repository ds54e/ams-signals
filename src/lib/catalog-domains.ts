export const catalogDomains = ['analog', 'digital', 'lab'] as const;
export type CatalogDomain = typeof catalogDomains[number];
