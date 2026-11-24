import { strictCatalogContract } from '../strict-catalog-contract.ts';
import { scopeStageIds } from './catalog.ts';
export { catalogSlug } from '../strict-catalog-contract.ts';

export const { schema: labSchema, activitySchema, validateCatalog, validateActivity } =
  strictCatalogContract('Lab', scopeStageIds);
