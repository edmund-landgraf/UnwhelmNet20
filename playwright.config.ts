import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://127.0.0.1:5192",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5192",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
});
