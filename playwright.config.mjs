import { defineConfig, devices } from '@playwright/test';
import { resolveSiteDeployment } from './src/lib/site-deployment.mjs';

// The local preview serves the same base path as the configured deployment
// (default /ams-signals/, override with BASE_URL for a root deployment).
const deployment = resolveSiteDeployment(process.env);
const localBaseUrl = `http://127.0.0.1:4321${deployment.baseUrl}`;
const requestedBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = requestedBaseUrl
  ? `${requestedBaseUrl.replace(/\/+$/, '')}/`
  : localBaseUrl;

export default defineConfig({
  testDir: './tests/smoke',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: false,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'line' : 'list',
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: requestedBaseUrl
    ? undefined
    : {
        command: 'node tools/preview-server.mjs',
        url: localBaseUrl,
        // Never reuse a server that happens to occupy the port: it may serve an
        // older build, which would silently validate stale output.
        reuseExistingServer: false,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
