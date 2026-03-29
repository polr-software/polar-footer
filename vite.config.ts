import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig, type Plugin } from "vite";

const BRAND_ASSETS_MODULE_ID = "virtual:polr-brand-assets";
const RESOLVED_BRAND_ASSETS_MODULE_ID = `\0${BRAND_ASSETS_MODULE_ID}`;

function readSvgMarkup(filePath: string): string {
  return readFileSync(filePath, "utf8")
    .replace(/<\?xml[\s\S]*?\?>\s*/g, "")
    .replace(/<!--[\s\S]*?-->\s*/g, "")
    .trim();
}

function polrBrandAssetsPlugin(): Plugin {
  const assetDirectory = resolve(__dirname, "public");
  const assets = {
    LIGHT_VARIANT_WORDMARK_SVG: resolve(assetDirectory, "Polrczarne.svg"),
    BLACK_VARIANT_WORDMARK_SVG: resolve(assetDirectory, "Polrbiale.svg"),
  } as const;

  return {
    name: "polr-brand-assets",
    resolveId(source) {
      if (source === BRAND_ASSETS_MODULE_ID) {
        return RESOLVED_BRAND_ASSETS_MODULE_ID;
      }

      return null;
    },
    load(id) {
      if (id !== RESOLVED_BRAND_ASSETS_MODULE_ID) {
        return null;
      }

      Object.values(assets).forEach((assetPath) => {
        this.addWatchFile(assetPath);
      });

      return Object.entries(assets)
        .map(
          ([exportName, assetPath]) =>
            `export const ${exportName} = ${JSON.stringify(readSvgMarkup(assetPath))};`,
        )
        .join("\n");
    },
  };
}

export default defineConfig({
  plugins: [polrBrandAssetsPlugin()],
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
