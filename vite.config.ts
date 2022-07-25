import { join } from "path";

import { defineConfig } from "vite";

import pkg from "./package.json";

const external = [...Object.keys(pkg.peerDependencies)];

export default defineConfig({
  build: {
    lib: {
      entry: join(__dirname, "src/index.js"),
      fileName: "icss-utils",
      formats: ["es", "cjs"],
      name: "icss-utils",
    },
    outDir: "lib",
    rollupOptions: {
      external,
    },
    sourcemap: true,
    target: "node14",
  },
});
