import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
      "@shared": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../shared"),
      "@assets": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../attached_assets"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});