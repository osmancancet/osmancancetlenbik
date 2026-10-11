import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT || 3100);

export default defineConfig({
  testDir: "tests",
  testMatch: /.*\.spec\.ts/,
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: process.env.E2E_BASE_URL || `http://localhost:${PORT}`, trace: "retain-on-failure" },
  projects: [
    { name: "masaustu", use: { ...devices["Desktop Chrome"] } },
    { name: "telefon", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : { command: `npm run build && npm start -- -p ${PORT}`, port: PORT, reuseExistingServer: true, timeout: 300_000 },
});
