import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["lcovonly"],
      src: ["./src/**/*"],
    },
    include: ["test/**/*.test.ts"],
  },
});
