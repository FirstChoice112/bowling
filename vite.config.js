import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    //ilent: true,
    reporters: ["default", "verbose"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "lcov", "json-summary"],
      include: ["src/**/*", "src/**/*.jsx"],
      exclude: ["src/main.jsx"],
    },
  },
});
