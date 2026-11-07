import { defineConfig, devices } from "@playwright/test";

/**
 * Runs against the static export in dist/, served by a tiny static server.
 * Uses the locally installed Chrome so no browser download is required.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4321",
    channel: "chrome",
    trace: "retain-on-failure",
  },
  projects: [{ name: "desktop", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "node tests/serve-dist.mjs 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
