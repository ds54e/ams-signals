import * as contract from '../src/lib/digital/schema.ts';
import { refreshStrictCatalog } from './refresh-strict-catalog-activity.mjs';

await refreshStrictCatalog({ ...contract, domain: 'digital' });
