import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/_functions.scss" as functions;
          @use "@/styles/_mixins.scss" as mixins;
          @use "@/styles/_tokens.scss" as variables;
        `,
      },
    },
  },
});
