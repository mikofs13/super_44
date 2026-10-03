import { defineConfig } from '@playwright/test';
const baseURL = 'http://127.0.0.1:' + (process.env.SUPER44_PORT || '3000');
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  workers: 1,
  use: {
    baseURL,
    channel: 'msedge',
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'no-preference',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: { command: 'node scripts/serve.mjs', url: baseURL, reuseExistingServer: true },
});
