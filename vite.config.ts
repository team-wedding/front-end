import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), sentryVitePlugin({
    org: "woogyeol",
    project: "woogyeol"
  })],

  base: '/',

  build: {
    sourcemap: true
  }
});