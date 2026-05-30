/**
 * Playwright config for the 59 reference test specs in test-cases/examples/.
 *
 * These are the curriculum "gold standard" tests — fully annotated, role-aware
 * locators, no test.skip. They run against the same practice-app webServer as
 * the lesson stubs (playwright.config.ts), but are kept in a separate config
 * so the two suites can be run and reported independently.
 *
 * Run locally:   cd practice-app && pnpm exec playwright test --config playwright.config.reference.ts
 * CI:            uses the "reference-tests" job in .github/workflows/ci.yml
 */

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "../test-cases/examples",
  fullyParallel: false,
  retries: process.env.CI ? 2 : 0,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4181",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm exec vite --host 127.0.0.1 --port 4181",
    url: "http://127.0.0.1:4181",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
