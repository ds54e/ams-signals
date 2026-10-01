import { defineConfig } from 'astro/config';
import { resolveSiteDeployment } from './src/lib/site-deployment.mjs';

// The public deployment target comes from SITE / BASE_URL, falling back to the
// current production target. Invalid explicit values fail the build with an
// explanation instead of silently reverting to the defaults.
const deployment = resolveSiteDeployment(process.env);

export default defineConfig({
  output: 'static',
  site: deployment.origin,
  base: deployment.basePath,
});
