import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const config = defineConfig({
  plugins: [react()],
});

export default config;
