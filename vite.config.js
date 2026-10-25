import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite is the tool that runs our React app (dev server + build).
// The react() plugin lets it understand JSX.
export default defineConfig({
  plugins: [react()],
});
