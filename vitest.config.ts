import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.github/**", "**/e2e/**"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});
