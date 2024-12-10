import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    silent: true,
    reporters: ["default", "verbose"],
  },
});
