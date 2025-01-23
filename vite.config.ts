import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mdx from '@mdx-js/rollup';

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: "@mdx-js/react",
      })
    },
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  optimizeDeps: {
    include: ['@mdx-js/react'],
  },
});
