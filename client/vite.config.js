import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Ensures correct asset paths in production
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000"
    }
  },
  build: {
    outDir: "dist" // Ensure the build output goes to "dist"
  }
});
