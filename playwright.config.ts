import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    viewport: { width: 1440, height: 900 },
    headless: true,
    actionTimeout: 10000,
    trace: 'off',
    launchOptions: {
      args: [
        '--max-active-webgl-contexts=64',
        '--enable-webgl',
        '--disable-gpu-process-crash-limit',
      ],
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
});
