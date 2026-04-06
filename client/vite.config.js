import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2023", // O 'esnext' si quieres lo último de lo último
  },
  plugins: [react()],
});
