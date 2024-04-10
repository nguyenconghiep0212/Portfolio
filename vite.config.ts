import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPLugin from "vite-plugin-eslint";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base:'/interactive-map/',
  server: {
    port: 4001,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "/@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue(), eslintPLugin()],
});
