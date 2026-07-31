/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint2";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const BACKEND = env.VITE_BACKEND_URL;

  return {
    plugins: [react(), eslint()],
    base: './',
    server: {
      host: true,
      proxy: {
        '/api': { target: BACKEND, changeOrigin: true, secure: false },
        '/Public': { target: BACKEND, changeOrigin: true, secure: false },
      },
    },
  };
});
