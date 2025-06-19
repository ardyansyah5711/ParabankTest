import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 30000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'html-report' }]
  ],
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    baseURL: 'https://parabank.parasoft.com/parabank/'
  }
});