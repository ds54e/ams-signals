import { strictCatalogContract } from '../strict-catalog-contract.ts';
import { scopeStageIds } from './catalog.ts';
export { catalogSlug } from '../strict-catalog-contract.ts';

export const { schema: digitalSchema, activitySchema, validateCatalog, validateActivity } =
  strictCatalogContract('Digital', scopeStageIds);
