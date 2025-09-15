import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: GitHub Actions will set BASE_PATH for us.
// For local dev, this stays undefined and base falls back to "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH ?? "/", // e.g. "/namastedev-practice/"
});
