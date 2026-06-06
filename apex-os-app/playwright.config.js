import { defineConfig } from '@playwright/test';

const port = process.env.PLAYWRIGHT_PORT || '5173';
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  webServer: {
    command: `npm run dev -- --host 127.0.0.1 --port ${port} --strictPort`,
    url: baseURL,
    reuseExistingServer: true,
  },
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 's25-ultra-local',
      use: {
        viewport: { width: 412, height: 915 },
        deviceScaleFactor: 3.5,
        isMobile: true,
        hasTouch: true,
        defaultBrowserType: 'chromium',
      },
    },
  ],
});
