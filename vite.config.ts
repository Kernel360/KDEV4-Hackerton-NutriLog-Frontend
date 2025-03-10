import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "@svgr/rollup";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr(), tailwindcss()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    port: 3000,
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
});
