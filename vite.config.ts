import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
      assets: "/src/assets",
      api: "/src/api",
      components: "/src/components",
      constants: "/src/constants",
      context: "/src/context",
      router: "/src/router",
      types: "/src/types",
      views: "/src/views",
    },
  },
});
