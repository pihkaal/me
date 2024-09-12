import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { manifest } from "./build/manifestPlugin";

const config = defineConfig({
  plugins: [react(), manifest(), tsconfigPaths()],
});

export default config;
