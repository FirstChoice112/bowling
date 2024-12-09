import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite-konfiguration för tester
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Gör Jest globala funktioner tillgängliga
    environment: "jsdom", // Använd jsdom som testmiljö (för React)
    setupFiles: "./src/setupTests.js", // Väg till din setupTests.js-fil
    coverage: {
      reporter: ["text", "lcov"], // Ställ in vilken typ av testtäckningsrapport du vill ha
    },
  },
});
