import { resolve } from "node:path";

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        react: resolve(__dirname, "src/react.ts"),
      },
      formats: ["es", "cjs"],
    },
    minify: "oxc",
    rollupOptions: {
      external: ["react"],
    },
  },
});
