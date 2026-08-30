import { defineConfig, devices } from '@playwright/test';

const localBaseUrl = 'http://127.0.0.1:4321/ams-signals/';
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
  workers: process.env.CI ? 1 : undefined,
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
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
