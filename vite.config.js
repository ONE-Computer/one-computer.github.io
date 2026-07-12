import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));
const htmlPages = [
  "index.html",
  "agents/index.html",
  "security/index.html",
  "architecture/index.html",
  "open-source/index.html",
  "getting-started/index.html",
  "openvtc/index.html",
];

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: htmlPages.map((page) => `${root}${page}`),
    },
  },
});
