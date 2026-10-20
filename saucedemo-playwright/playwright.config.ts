import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  timeout: 20000,
  expect: { timeout: 10000 },
  outputDir: './artifacts/test-results',
  reporter: [
    ['html', { outputFolder: 'artifacts/html-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    headless: true,
    browserName: 'chromium',
    actionTimeout: 10000,
    navigationTimeout: 10000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
