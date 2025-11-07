import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // deixa expect, it, describe globais
    environment: "jsdom", // necessário para simular o browser
    setupFiles: "./setupTests.ts",
  },
});
